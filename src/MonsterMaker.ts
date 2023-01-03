import {abilityFields, defenseFields, Levels, Options, ResistOptions, savesFields, Skills, Statistics} from "./Keys";
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
}

export class MonsterMaker extends FormApplication {
    actor = <BaseActor>this.object
    level = "-1"

    DataToModify : AdjustmentCategory[] = []

    indexPattern = /\.(\d+)\./

    static get defaultOptions() {
        return mergeObject( super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/pf2e-monster-maker/forms/monsterMakerForm.html`,
            id: "monsterMakerForm",
            title: "Adjust Level Form",
            height: 833,
            width: 400
        } );
    }

    protected async _updateObject(event: Event, formData?: object) {
        if(formData) {
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
                    let values = statisticValues[adjustment.statistic][this.level]
                    // pf2e system documents (actor, item, etc)
                    if( typeof adjustment.targetDocument.update === 'function' ) {
                        let batch = batchedDocuments.find( b => b.targetDocument == adjustment.targetDocument )
                        if( !batch ){
                            batch = { targetDocument: adjustment.targetDocument, data: {} }
                            batchedDocuments.push( batch )
                        }

                        // todo: strike damage needs to be scaled as an ensemble, i have disabled the adjustments in getData

                        let replacementValue : any
                        let match = adjustment.targetAttribute.match( this.indexPattern )
                        if( match ) {
                            let index = adjustment.targetAttribute.indexOf( match[1] )
                            let objAttr = adjustment.targetAttribute.substring( index + match[1].length + 1 )
                            // todo: this doesn't assign to the array correctly, it replaces with an object with children .0 .1 etc.
                            // todo: how do you update array elements using actor.update?
                            adjustment.targetAttribute = adjustment.targetAttribute.substring( 0, index + match[1].length )
                            console.log(adjustment.targetAttribute)
                            let targetObject = MonsterMaker.getChildField( adjustment.targetDocument, adjustment.targetAttribute )
                            console.log(targetObject)
                            let copied = JSON.parse( JSON.stringify(
                                targetObject
                            ) )
                            mergeObject( copied, { [objAttr]: MonsterMaker.getNumericValue( adjustment.normalizedValue, values ) } )
                            console.log( copied )
                            replacementValue = copied
                        }
                        else {
                            replacementValue = MonsterMaker.getNumericValue( adjustment.normalizedValue, values )
                        }

                        let data = {
                            [adjustment.targetAttribute]: replacementValue
                        }
                        batch.data = mergeObject( batch.data, data )

                    }
                }
            }

            for( const batch of batchedDocuments ) {
                await batch.targetDocument.update( batch.data )
            }

            // this happens last because hp won't update correctly until the actor's max hp has updated
            await this.actor.update( this.applyHitPoints() )
        }
    }

    static getNumericValue( slider : any, values : any ) {
        const options = [ResistOptions.minimum, ResistOptions.maximum, Options.terrible, Options.low, Options.moderate, Options.high, Options.extreme]

        let interval = 1
        for( let i=0; i<options.length-1; i++ )
        {
            // Skip initial or terminal options that this stat type does not have
            if( !( options[i] in values ) || !( options[i+1] in values ) )
                continue

            if( slider < interval || slider > interval+1 ) {
                interval++
                continue
            }

            const frac = slider - interval

            let intervalFloor = parseInt( values[options[i]] )
            let intervalCeil = parseInt( values[options[i+1]] )

            return Math.round( frac * ( intervalCeil - intervalFloor ) + intervalFloor )
        }

        return 0
    }

    applyHitPoints() {
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
        this.pushActorCategory( "Ability Modifiers", abilityFields )
        this.pushActorCategory( "Perception and Saves", savesFields )

        let anyActor = this.actor as any
        if( anyActor.system.traits.dv.length > 0 ) {
            let category = new AdjustmentCategory( "Weaknesses" )
            for( let i=0; i<anyActor.system.traits.dv.length; i++ ) {
                const resist = anyActor.system.traits.dv[i]
                let data = this.getResistWeakAdjustment( resist, `system.traits.dv.${i}.value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        if( anyActor.system.traits.dr.length > 0 ) {
            let category = new AdjustmentCategory( "Resistances" )
            for( let i=0; i<anyActor.system.traits.dr.length; i++ ) {
                const resist = anyActor.system.traits.dr[i]
                let data = this.getResistWeakAdjustment( resist, `system.traits.dr.${i}.value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        let skills = new AdjustmentCategory( "Skills" )
        this.DataToModify.push( skills )
        for (const [id, item] of this.actor.items.entries()) {
            // skills
            if( item.type == 'lore' && item.name != null ){
                let stat = ('PF2EMONSTERMAKER.' + item.name.toLowerCase()) as Statistics
                let data = this.getItemAdjustment( stat, item, 'system.mod.value' )
                if( data )
                    skills.adjustments.push( data )
            }
            // spellcasting
            else if( item.type == 'spellcastingEntry' && item.name != null ) {
                let data = this.getItemAdjustment( Statistics.spellcasting, item, 'system.spelldc.value' )
                // todo: also spelldc.dc
                if( data ) {
                    let category = new AdjustmentCategory( item.name )
                    category.adjustments.push( data )
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
        let category = new AdjustmentCategory( name )
        for( const [field, attrPath] of Object.entries( fields ) ) {
            let data = this.getActorFieldAdjustment( field as Statistics, attrPath )
            if( data )
                category.adjustments.push( data )
        }
        this.DataToModify.push( category )
    }

    getActorFieldAdjustment( stat: Statistics, fieldPath: string ) {
        const values = statisticValues[stat][this.level]
        let current = MonsterMaker.getChildField( this.actor, fieldPath )

        let normalized = MonsterMaker.getNormalizedValue(current, values)
        if( normalized.value > 0 ) {
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

        let normalized = MonsterMaker.getNormalizedValue( current, values )
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
        let current = 0
        // simple fields
        if( item.type == 'lore' // skills
            || item.type == "spellcastingEntry"  // spellcasting
            || ( item.type == "melee" && stat == Statistics.strikeBonus ) // strike attack bonus
            ) {
            current = MonsterMaker.getChildField( item, targetAttribute )
        }
        // strike damage needs to be considered as a whole with all rolls contributing
        else if( item.type == "melee" && stat == Statistics.strikeDamage && false ) {
            // sum up all the damage
            let total = 0
            for( let [id, roll] of Object.entries( item.system.damageRolls ) ) {
                let damage : string = (roll as any).damage
                const plus = damage.indexOf( '+' )
                if( plus >= 0 ) {
                    let flat = damage.substring( plus+1 )
                    total += parseInt( flat )
                    damage = damage.substring( 0, plus )
                }
                damage = damage.trim()
                const d = damage.indexOf( 'd' )
                if( d >= 0 ) {
                    let nDice = damage.substring( 0, d )
                    let dieSize = damage.substring( d )
                    total += parseInt( nDice ) * diceValues[dieSize]
                }
            }
            // todo: what to do about damage that is very low for the leve? ratfolk grenadier hand crossbow
            // todo: what to do about damage intended to scale like a spell? ratfolk grenadier bombs
            current = Math.ceil( total ) // odd numbers of dice results in a half damage that should be rounded up to match the gmg numbers

        }
        else {
            return null
        }

        let normalized = MonsterMaker.getNormalizedValue( current, values )
        if( normalized.value > 0 ) {
            let data: Adjustment = {
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: stat,
                normalizedValue: normalized.value,
                displayValue: normalized.display
            }
            return data
        }

        return null
    }

    static getNormalizedValue(current : any, values : any ){
        const options = [ResistOptions.minimum, ResistOptions.maximum, Options.terrible, Options.low, Options.moderate, Options.high, Options.extreme]

        let interval = 1
        for( let i=0; i<options.length-1; i++ )
        {
            // Skip initial or terminal options that this stat type does not have
            if( !( options[i] in values ) || !( options[i+1] in values ) )
                continue

            const intervalFloor = parseInt( values[options[i]] )
            const intervalCeil = parseInt( values[options[i+1]] )

            // Certain values should be considered 'special' and not scaled, such as Mindless creatures with negative
            // int modifiers, or monsters with 0 in a stat indicating it's basically a dump stat. If we encounter
            // such a value, skip it
            // todo: this needs to be configurable by the caller
            if( current < intervalFloor && interval == 1 )
                return { value:0, display:"" }

            if( current >= intervalFloor && current < intervalCeil )
            {
                let frac = (current - intervalFloor) / (intervalCeil - intervalFloor)
                frac = Math.round(frac * 10) / 10
                return {
                    value: frac + interval,
                    display: game['i18n'].localize( options[i] ) + (frac > 0 ? `+${frac}` : "")
                }
            }

            if( current == intervalCeil )
            {
                return {
                    value: interval + 1,
                    display: game['i18n'].localize( options[i+1] )
                }
            }

            interval++
        }

        return {value: 0, display: ""}
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