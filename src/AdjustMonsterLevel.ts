import {abilityFields, defenseFields, Levels, savesFields, Setting, Statistics} from "./Keys";
import {BaseActor,} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs";
import {
    localize
} from "./Utils";
import {Adjustment, AdjustmentCategory} from "./Adjustments";
import {mergeDescription, mergeIndexedAdjustment, mergeSimpleAdjustment, mergeStrikeDamage} from "./AdjustmentMerge";
import {
    getActorFieldAdjustment,
    getItemAdjustment,
    getResistWeakAdjustment,
    getTextAdjustments
} from "./AdjustmentCreation";

export const arrayLikePattern = /\[(\d+)]/

export class TargetData {
    public actor: BaseActor
    public level: string
}

export class AdjustMonsterLevel extends FormApplication {
    data: TargetData = {
        actor: <BaseActor>this.object,
        level: "-1"
    }

    DataToModify : AdjustmentCategory[] = []

    static get defaultOptions() {
        return mergeObject( super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            resizable: true,
            template: `modules/pf2e-adjust-monster-level/forms/adjustMonsterLevelForm.html`,
            id: "adjustMonsterLevelForm",
            title: "Adjust Level Form",
            height: 833,
            width: 400
        } );
    }

    protected async _updateObject(event: Event, formData?: object) {
        if( formData && formData[Statistics.level] != this.data.level ) {
            let previousLevel = (this.data.actor as any).system.details.level.value
            this.data.level = formData[Statistics.level]

            let batchedDocuments : any[] = []
            let actorBatch = { targetDocument: this.data.actor,
                data: {
                    ["name"]: formData[Statistics.name] ? formData[Statistics.name] : this.data.actor.name,
                    ["system.details.level.value"]: parseInt( this.data.level )
                }}
            batchedDocuments.push( actorBatch )

            for( const category of this.DataToModify ){
                for( const adjustment of category.adjustments ) {
                    // Skip if the checkbox for this adjustment was unchecked on the form
                    if( !formData['adjustments.'+ adjustment.id] )
                        continue

                    let batch = batchedDocuments.find( b => b.targetDocument == adjustment.targetDocument )
                    if( !batch ){
                        batch = { targetDocument: adjustment.targetDocument, data: {} }
                        batchedDocuments.push( batch )
                    }

                    // If something has an array index it requires special treatment
                    let match = adjustment.targetAttribute.match( arrayLikePattern )
                    if( match ) {
                        mergeIndexedAdjustment( this.data.level, batch, adjustment, match[0] )
                    }
                    // Strike damage must be handled as an ensemble and requires special logic
                    else if( adjustment.statistic == Statistics.strikeDamage ) {
                        mergeStrikeDamage( this.data.level, batch, adjustment, this.data.level > previousLevel )
                    }
                    // Description may have multiple adjustments and require special logic
                    else if( adjustment.statistic == Statistics.description ) {
                        mergeDescription( this.data.level, batch, adjustment, this.data.level > previousLevel )
                    }
                    else {
                        mergeSimpleAdjustment( this.data.level, batch, adjustment )
                    }
                }
            }

            let testMode = game['settings'].get( Setting.namespace, Setting.testMode )
            if( testMode ) {
                console.log(`----- Data deltas for adjusting monster ${this.data.actor.name} ${(this.data.actor as any).system.details.level.value}->${this.data.level} -----`)
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
                await this.data.actor.update( this.updateHitPoints() )
            }
        }
    }

    updateHitPoints() {
        let hitPoints = (this.data.actor as any).system.attributes.hp.max
        return { "system.attributes.hp.value": hitPoints }
    }

    // @ts-ignore
    getData() {
        this.data.level = this.data.actor['system'].details.level.value.toString()

        const current = {
            [Statistics.name]: this.data.actor['name'],
            [Statistics.level]: this.data.level
        }

        this.pushActorCategory( "Defenses", defenseFields )
        this.pushActorCategory( "AbilityModifiers", abilityFields )
        this.pushActorCategory( "PerceptionAndSaves", savesFields )

        let anyActor = this.data.actor as any
        if( anyActor.system.attributes.weaknesses.length > 0 ) {
            let category = new AdjustmentCategory( localize("PF2EADJUSTMONSTERLEVEL.categoryWeaknesses") )
            for( let i=0; i<anyActor.system.attributes.weaknesses.length; i++ ) {
                const resist = anyActor.system.attributes.weaknesses[i]
                let data = getResistWeakAdjustment( this.data, resist, `system.attributes.weaknesses[${i}].value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        if( anyActor.system.attributes.resistances.length > 0 ) {
            let category = new AdjustmentCategory( localize("PF2EADJUSTMONSTERLEVEL.categoryResistances") )
            for( let i=0; i<anyActor.system.attributes.resistances.length; i++ ) {
                const resist = anyActor.system.attributes.resistances[i]
                let data = getResistWeakAdjustment( this.data, resist, `system.attributes.resistances[${i}].value` )
                category.adjustments.push( data )
            }
            this.DataToModify.push( category )
        }

        let skills = new AdjustmentCategory( localize("PF2EADJUSTMONSTERLEVEL.categorySkills") )
        this.DataToModify.push( skills )
        for (const [, item] of this.data.actor.items.entries()) {
            // skills
            if( item.type == 'lore' && item.name != null ){
                let stat = ('PF2EADJUSTMONSTERLEVEL.' + item.name.toLowerCase()) as Statistics
                let data = getItemAdjustment( this.data, stat, item, 'system.mod.value' )
                if( data )
                    skills.adjustments.push( data )
            }
            // spellcasting
            else if( item.type == 'spellcastingEntry' && item.name != null ) {
                let data = getItemAdjustment( this.data, Statistics.spellcasting, item, 'system.spelldc.value' )
                if( data ) {
                    // duplicate and use for spell dc as well, since the relative proficiency is always the same
                    let dcData = new Adjustment({
                        targetDocument: data.targetDocument,
                        targetAttribute: 'system.spelldc.dc',
                        statistic: Statistics.spellDC,
                        normalizedValue: data.normalizedValue,
                        displayValue: data.displayValue,
                        metadata: JSON.parse( JSON.stringify( data.metadata ) )
                    })
                    let category = new AdjustmentCategory( item.name )
                    category.adjustments.push( data )
                    category.adjustments.push( dcData )
                    this.DataToModify.push( category )
                }
            }
            // melee is all strikes including ranged
            else if( item.type == 'melee' && item.name != null ) {
                let bonusData = getItemAdjustment( this.data, Statistics.strikeBonus, item, 'system.bonus.value' )
                let damageData = getItemAdjustment( this.data, Statistics.strikeDamage, item, 'system.damageRolls' )
                let category = new AdjustmentCategory( item.name + " Strike" )
                if( bonusData )
                    category.adjustments.push( bonusData )
                if( damageData )
                    category.adjustments.push( damageData )
                if( category.adjustments.length > 0 )
                    this.DataToModify.push( category )
            }
            else if( item.type == 'action' && item.name != null ) {
                let adjustments = getTextAdjustments( this.data.level, item, 'system.description.value' )
                if( adjustments.length > 0 ){
                    let category = new AdjustmentCategory( item.name )
                    category.adjustments = adjustments
                    this.DataToModify.push( category )
                }
            }
            // todo: spells? heightening innate spells for instance.
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
        let category = new AdjustmentCategory( localize(`PF2EADJUSTMONSTERLEVEL.category${name}`) )
        for( const [field, attrPath] of Object.entries( fields ) ) {
            let data = getActorFieldAdjustment( this.data, field as Statistics, attrPath )
            if( data )
                category.adjustments.push( data )
        }
        this.DataToModify.push( category )
    }
}