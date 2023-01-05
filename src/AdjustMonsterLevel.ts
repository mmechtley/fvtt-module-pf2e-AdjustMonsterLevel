import {
    abilityFields,
    defenseFields,
    Dice,
    Levels,
    Options,
    ResistOptions,
    savesFields, Setting,
    Statistics
} from "./Keys";
import {diceValues, statisticValues} from "./Values";
import {BaseActor,} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs";

export class AdjustmentCategory {
    public displayName : string
    public adjustments : Adjustment[] = []

    constructor( displayName : string ) {
        this.displayName = displayName
    }
}

export class Adjustment {
    public targetDocument : any
    public targetAttribute : string
    public normalizedValue : number
    public statistic : Statistics
    public displayName? : string
    public displayValue: string
    public metaData? : any
}

export class AdjustMonsterLevel extends FormApplication {
    actor = <BaseActor>this.object
    level = "-1"

    DataToModify : AdjustmentCategory[] = []

    arrayLikePattern = /\[(\d+)\]/

    static get defaultOptions() {
        return mergeObject( super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/pf2e-adjust-monster-level/forms/adjustMonsterLevelForm.html`,
            id: "adjustMonsterLevelForm",
            title: "Adjust Level Form",
            height: 833,
            width: 400
        } );
    }

    protected async _updateObject(event: Event, formData?: object) {
        if( formData ) {
            let previousLevel = (this.actor as any).system.details.level.value
            this.level = formData[Statistics.level]

            let batchedDocuments : any[] = []
            let actorBatch = { targetDocument: this.actor,
                data: {
                    ["name"]: formData[Statistics.name] ? formData[Statistics.name] : this.actor.name,
                    ["system.details.level.value"]: parseInt( this.level )
                }}
            batchedDocuments.push( actorBatch )

            for( const category of this.DataToModify ){
                for( const adjustment of category.adjustments ) {

                    // pf2e system documents (actor, item, etc)
                    if( typeof adjustment.targetDocument.update === 'function' ) {
                        let batch = batchedDocuments.find( b => b.targetDocument == adjustment.targetDocument )
                        if( !batch ){
                            batch = { targetDocument: adjustment.targetDocument, data: {} }
                            batchedDocuments.push( batch )
                        }

                        // If something has an array index it requires special treatment
                        let match = adjustment.targetAttribute.match( this.arrayLikePattern )
                        if( match ) {
                            this.mergeIndexedAdjustment( batch, adjustment, match[0] )
                        }
                        // Strike damage must be handled as an ensemble and requires special logic
                        else if( adjustment.statistic == Statistics.strikeDamage ) {
                            this.mergeStrikeDamage( batch, adjustment, this.level > previousLevel )
                        }
                        else {
                            this.mergeSimpleAdjustment( batch, adjustment )
                        }
                    }
                }
            }

            let testMode = game['settings'].get( Setting.namespace, Setting.testMode )
            if( testMode ) {
                console.log(`----- Data deltas for adjusting monster ${this.actor.name} ${(this.actor as any).system.details.level.value}->${this.level} -----`)
                for( const batch of batchedDocuments ) {
                    console.log( `${batch.targetDocument.name}` )
                    console.log( batch.data )
                }
            }
            else {
                for( const batch of batchedDocuments ) {
                    await batch.targetDocument.update( batch.data )
                }

                // this happens last because hp won't update correctly until the actor's max hp has updated
                await this.actor.update( this.updateHitPoints() )
            }
        }
    }

    mergeStrikeDamage( batch:any, adjustment: Adjustment, levelIncreased: boolean ) {
        // todo: handle things where we don't want to change the die size
        let values = statisticValues[adjustment.statistic][this.level]
        let totalDamage = AdjustMonsterLevel.getNumericValue( adjustment.normalizedValue, values )

        let partial = {}

        let rolls = AdjustMonsterLevel.getChildField( adjustment.targetDocument, adjustment.targetAttribute )

        for( let [id, roll] of Object.entries( rolls ) ) {
            let oldRoll: string = (roll as any).damage
            let rollMeta = adjustment.metaData[id]
            let rollDamage = rollMeta.totalFraction * totalDamage
            let newRoll = ''
            if( rollMeta.flatFraction > 0 ) {
                let flatDamage = Math.round( rollDamage * rollMeta.flatFraction )
                newRoll += `+${flatDamage}`
                rollDamage -= flatDamage
            }
            newRoll = AdjustMonsterLevel.getClosestDieRoll( rollDamage, rollMeta.dieSize as Dice, levelIncreased ) + newRoll

            partial[`${adjustment.targetAttribute}.${id}.damage`] = newRoll
            // console.log(`${oldRoll} -> ${newRoll}`)
        }
        batch.data = mergeObject( batch.data, partial )
    }

    mergeSimpleAdjustment( batch: any, adjustment: Adjustment ) {
        let values = statisticValues[adjustment.statistic][this.level]
        let partial = {
            [adjustment.targetAttribute]: AdjustMonsterLevel.getNumericValue( adjustment.normalizedValue, values )
        }
        batch.data = mergeObject( batch.data, partial )
    }

    mergeIndexedAdjustment( batch: any, adjustment: Adjustment, indexStr: string ) {
        let values = statisticValues[adjustment.statistic][this.level]
        let indexStart = adjustment.targetAttribute.indexOf( indexStr )
        let objAttr = adjustment.targetAttribute.substring( indexStart + indexStr.length + 1 ) // +1 for trailing dot
        adjustment.targetAttribute = adjustment.targetAttribute.substring( 0, indexStart )
        let index = parseInt( indexStr.substring( 1, indexStr.length - 1 ) )

        // This ensures we don't stomp a previous adjustment if we are modifying multiple elements
        let copiedArray = AdjustMonsterLevel.getChildField( batch.data, adjustment.targetAttribute )
        if( !copiedArray ) {
            let originalArray = AdjustMonsterLevel.getChildField( adjustment.targetDocument, adjustment.targetAttribute )
            copiedArray = JSON.parse( JSON.stringify( originalArray ) )
        }

        copiedArray[index][objAttr] = AdjustMonsterLevel.getNumericValue( adjustment.normalizedValue, values )

        let partial = {
            [adjustment.targetAttribute]: copiedArray
        }
        batch.data = mergeObject( batch.data, partial )
    }

    static getClosestDieRoll( damage: number, startingDie: Dice, increasing: boolean ) {
        // todo: this should prolly also prefer fewer dice so that like 10d4 isn't picked even if it's a perfect match
        let dice = [Dice.d4, Dice.d6, Dice.d8, Dice.d10, Dice.d12]
        const startingDieIndex = dice.indexOf( startingDie )
        if( increasing && startingDieIndex > 0 ){
            dice.splice(0, startingDieIndex )
        }
        else if ( !increasing && startingDieIndex < dice.length-1 ){
            dice.splice(dice.indexOf( startingDie ) + 1)
        }
        let bestNumDice = Math.round( damage / diceValues[startingDie] )
        let bestDie = startingDie
        let bestDistance = Math.abs( bestNumDice * diceValues[startingDie] - damage )
        for( const die of dice ) {
            const dieDamage = diceValues[die]
            let numDice = Math.round(damage / dieDamage )
            let distance = Math.abs(numDice * dieDamage - damage )
            if( distance < bestDistance ) {
                bestNumDice = numDice
                bestDie = die as Dice
                bestDistance = distance
            }
        }
        return `${bestNumDice}${bestDie}`
    }

    static getNumericValue( normalized : any, values : any ) {
        let options = [ResistOptions.minimum, ResistOptions.maximum, Options.terrible, Options.low, Options.moderate, Options.high, Options.extreme]

        // remove ones that aren't in values
        options = options.filter( v => v in values )

        for( let i=0; i<options.length-1; i++ )
        {
            if( normalized < i+1 && i != 0 )
                continue

            if( normalized > i+2 && i != options.length-1 )
                continue

            const frac = normalized - ( i+1 )

            let intervalFloor = parseInt( values[options[i]] )
            let intervalCeil = parseInt( values[options[i+1]] )

            return Math.round( frac * ( intervalCeil - intervalFloor ) + intervalFloor )
        }

        return 0
    }

    updateHitPoints() {
        let hitPoints = (this.actor as any).system.attributes.hp.max
        return { "system.attributes.hp.value": hitPoints }
    }

    // @ts-ignore
    getData() {
        this.level = this.actor['system'].details.level.value.toString()

        const current = {
            [Statistics.name]: this.actor['name'],
            [Statistics.level]: this.level
        }

        this.pushActorCategory( "Defenses", defenseFields )
        this.pushActorCategory( "AbilityModifiers", abilityFields )
        this.pushActorCategory( "PerceptionAndSaves", savesFields )

        let anyActor = this.actor as any
        if( anyActor.system.attributes.weaknesses.length > 0 ) {
            let category = new AdjustmentCategory( AdjustMonsterLevel.localize("PF2EADJUSTMONSTERLEVEL.categoryWeaknesses") )
            for( let i=0; i<anyActor.system.attributes.weaknesses.length; i++ ) {
                const resist = anyActor.system.attributes.weaknesses[i]
                let data = this.getResistWeakAdjustment( resist, `system.attributes.weaknesses[${i}].value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        if( anyActor.system.attributes.resistances.length > 0 ) {
            let category = new AdjustmentCategory( AdjustMonsterLevel.localize("PF2EADJUSTMONSTERLEVEL.categoryWeaknesses") )
            for( let i=0; i<anyActor.system.attributes.resistances.length; i++ ) {
                const resist = anyActor.system.attributes.resistances[i]
                let data = this.getResistWeakAdjustment( resist, `system.attributes.resistances[${i}].value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        let skills = new AdjustmentCategory( AdjustMonsterLevel.localize("PF2EADJUSTMONSTERLEVEL.categorySkills") )
        this.DataToModify.push( skills )
        for (const [, item] of this.actor.items.entries()) {
            // skills
            if( item.type == 'lore' && item.name != null ){
                let stat = ('PF2EADJUSTMONSTERLEVEL.' + item.name.toLowerCase()) as Statistics
                let data = this.getItemAdjustment( stat, item, 'system.mod.value' )
                if( data )
                    skills.adjustments.push( data )
            }
            // spellcasting
            else if( item.type == 'spellcastingEntry' && item.name != null ) {
                let data = this.getItemAdjustment( Statistics.spellcasting, item, 'system.spelldc.value' )
                if( data ) {
                    // duplicate and use for spell dc as well, since the relative proficiency is always the same
                    let dcData = JSON.parse( JSON.stringify( data ) ) as Adjustment
                    dcData.targetAttribute = 'system.spelldc.dc'
                    let category = new AdjustmentCategory( item.name )
                    category.adjustments.push( data )
                    category.adjustments.push( dcData )
                    this.DataToModify.push( category )
                }
            }
            // melee is all strikes including ranged
            else if( item.type == 'melee' && item.name != null ) {
                let bonusData = this.getItemAdjustment( Statistics.strikeBonus, item, 'system.bonus.value' )
                let damageData = this.getItemAdjustment( Statistics.strikeDamage, item, 'system.damageRolls' )
                let category = new AdjustmentCategory( item.name + " Strike" )
                if( bonusData )
                    category.adjustments.push( bonusData )
                if( damageData )
                    category.adjustments.push( damageData )
                if( category.adjustments.length > 0 )
                    this.DataToModify.push( category )
            }
            // todo: spells? heighten for instance. spell-like abilities like dragon breath?
        }

        Handlebars.registerHelper('json', function( context ) {
            return JSON.stringify( context );
        });

        return {
            Levels: Levels,
            Current: current,
            ToModify: JSON.parse( JSON.stringify( this.DataToModify ) )
        };
    }

    pushActorCategory( name: string, fields: Record<string, string> ){
        let category = new AdjustmentCategory( AdjustMonsterLevel.localize(`PF2EADJUSTMONSTERLEVEL.category${name}`) )
        for( const [field, attrPath] of Object.entries( fields ) ) {
            let data = this.getActorFieldAdjustment( field as Statistics, attrPath )
            if( data )
                category.adjustments.push( data )
        }
        this.DataToModify.push( category )
    }

    getActorFieldAdjustment( stat: Statistics, fieldPath: string ) {
        const values = statisticValues[stat][this.level]
        let current = AdjustMonsterLevel.getChildField( this.actor, fieldPath )

        let normalized = AdjustMonsterLevel.getNormalizedValue( current, values, 1 )
        if( normalized.value > -9999 ) {
            let data : Adjustment = {
                targetDocument: this.actor,
                targetAttribute: fieldPath,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                statistic: stat }
            return data
        }

        return null
    }

    getResistWeakAdjustment( item: any, targetAttribute: string ) {
        const values = statisticValues[Statistics.resistWeak][this.level]
        let current = item.value

        let normalized = AdjustMonsterLevel.getNormalizedValue( current, values, 1 )
        let data : Adjustment = {
            targetDocument: this.actor,
            targetAttribute: targetAttribute,
            statistic: Statistics.resistWeak,
            normalizedValue: normalized.value,
            displayValue: normalized.display,
            displayName: item.type
        }
        return data
    }

    getItemAdjustment( stat: Statistics, item: any, targetAttribute: string ) {
        const values = statisticValues[stat][this.level]
        let metaData: any = null
        let current = 0
        // simple fields
        if( item.type == 'lore' // skills
            || item.type == "spellcastingEntry"  // spellcasting
            || ( item.type == "melee" && stat == Statistics.strikeBonus ) // strike attack bonus
            ) {
            current = AdjustMonsterLevel.getChildField( item, targetAttribute )
        }
        // strike damage needs to be considered as a whole with all rolls contributing
        else if( item.type == "melee" && stat == Statistics.strikeDamage ) {
            // sum up all the damage
            let total = 0
            metaData = {}
            for( let [id, roll] of Object.entries( item.system.damageRolls ) ) {
                let rollValues = AdjustMonsterLevel.getDamageRollValues( (roll as any).damage )
                total += rollValues.total
                metaData[id] = {
                    totalFraction: rollValues.total,
                    flatFraction: rollValues.flatFraction,
                    dieSize: rollValues.dieSize
                }
            }
            // todo: what to do about damage that is very low for the level? ratfolk grenadier hand crossbow
            // todo: what to do about damage intended to scale like a spell? ratfolk grenadier bombs
            current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
            for( const [, rollData] of Object.entries( metaData ) ) {
                (rollData as any).totalFraction = (rollData as any).totalFraction / current
            }
        }
        else {
            return null
        }

        let normalized = AdjustMonsterLevel.getNormalizedValue( current, values, 1 )
        if( normalized.value > -9999 ) {
            let data: Adjustment = {
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: stat,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                metaData: metaData
            }
            return data
        }

        return null
    }

    static localize( key: string ) {
        return (game as any).i18n.localize( key )
    }

    static getNormalizedValue( current: any, values: Iterable<Record<string,string>>, skipIfBelow: number=-9999 ) {
        // ordered from lowest to highest
        let options = [ResistOptions.minimum, ResistOptions.maximum, Options.terrible, Options.low, Options.moderate, Options.high, Options.extreme]

        // remove ones that aren't in values
        options = options.filter( v => v in values )

        // Certain values should be considered 'special' and not scaled, such as Mindless creatures with negative
        // int modifiers, or monsters with 0 in a stat indicating it's basically a dump stat. If we encounter
        // such a value, skip it
        if( skipIfBelow === -9999 ) {
            skipIfBelow = parseInt( values[options[0]] )
        }

        if( current < skipIfBelow ) {
            return { value:-9999, display:"" }
        }

        for( let i=0; i<options.length-1; i++ ) {
            const intervalFloor = parseInt( values[options[i]] )
            const intervalCeil = parseInt( values[options[i+1]] )

            if( (current >= intervalFloor && current < intervalCeil)
                || (i == 0 && current < intervalFloor)
                || (i == options.length-2 && current >= intervalCeil)) {
                let frac = (current - intervalFloor) / (intervalCeil - intervalFloor)
                frac = Math.round( frac * 10 ) / 10
                let display = AdjustMonsterLevel.localize( options[i] )
                if( frac != 0 && frac != 1 ) {
                    if(frac > 0)
                        display += '+'
                    display += frac.toFixed( 1 )
                }
                if( frac < 0 || frac > 1 ) {
                    display += ' ⚠️'
                }
                return {
                    value: frac + i + 1,
                    display: display
                }
            }
        }

        return {value: -9999, display: ""}
    }

    static getDamageRollValues( damage: string ) {
        let total = 0
        let flat = 0
        const plus = damage.indexOf( '+' )
        if( plus >= 0 ) {
            flat = parseInt( damage.substring( plus+1 ) )
            total += flat
            damage = damage.substring( 0, plus )
        }
        damage = damage.trim()
        const d = damage.indexOf( 'd' )
        let dieSize = ''
        if( d >= 0 ) {
            let nDice = damage.substring( 0, d )
            dieSize = damage.substring( d )
            total += parseInt( nDice ) * diceValues[dieSize]
        }
        return {
            total: total,
            dieSize: dieSize,
            flatFraction: flat / total
        }
    }

    static getChildField( obj: any, fieldPath: string ) {
        let current = obj
        let separated = fieldPath.split( '.' )
        while( separated.length > 0 )
        {
            current = current[separated[0]]
            separated.splice( 0, 1 )
        }
        return current
    }
}