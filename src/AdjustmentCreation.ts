import {Statistics} from "./Keys";
import {statisticValues} from "./Values";
import {getChildField, getDamageRollValues, getNormalizedValue} from "./Utils";
import {Adjustment} from "./Adjustments";
import {TargetData} from "./AdjustMonsterLevel";
import {InlineRoll} from "./InlineData/InlineRoll";
import {InlineRollComponentMetadata, InlineRollMetadata} from "./Metadata/InlineRollMetadata";
import {BaseMetadata} from "./Metadata/BaseMetadata";
import {DamageRollMetadata} from "./Metadata/DamageRollMetadata";
import {InlineCheckMetadata} from "./Metadata/InlineCheckMetadata";

// note no capturing groups, the whole thing is the roll, including tooltip if it has it
export const rollPattern = /\[{2}\/r(?:.(?!\[{2}))*]{2}(?:\{[^}]*})?/g
export const savePattern = /@Check\[type:\w+\|dc:(\d+)[|:\w]*]/g
export const areaTemplatePattern = /@Template/

export function getActorFieldAdjustment( targetData: TargetData, stat: Statistics, fieldPath: string ) {
    const values = statisticValues[stat][targetData.level]
    let current = getChildField( targetData.actor, fieldPath )
    let metaData: BaseMetadata = {}

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.value > -9999 ) {
        if( normalized.flag ){
            metaData.outOfRange = true
        }
        return new Adjustment({
            targetDocument: targetData.actor,
            targetAttribute: fieldPath,
            normalizedValue: normalized.value,
            displayValue: normalized.display,
            statistic: stat,
            metadata: metaData
        })
    }

    return null
}

export function getResistWeakAdjustment( targetData: TargetData, item: any, targetAttribute: string ) {
    const values = statisticValues[Statistics.resistWeak][targetData.level]
    let current = item.value
    let metaData: BaseMetadata = {}

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.flag ){
        metaData.outOfRange = true
    }
    let data = new Adjustment({
        targetDocument: targetData.actor,
        targetAttribute: targetAttribute,
        statistic: Statistics.resistWeak,
        normalizedValue: normalized.value,
        displayValue: normalized.display,
        displayName: item.type,
        metadata: metaData
    })
    return data
}

export function getItemAdjustment( targetData: TargetData, stat: Statistics, item: any, targetAttribute: string ) {
    const values = statisticValues[stat][targetData.level]
    let metaData: BaseMetadata
    let current = 0
    // simple fields
    if( item.type == 'lore' // skills
        || item.type == "spellcastingEntry"  // spellcasting
        || ( item.type == "melee" && stat == Statistics.strikeBonus ) // strike attack bonus
    ) {
        metaData = new BaseMetadata()
        current = getChildField( item, targetAttribute )
    }
    // strike damage needs to be considered as a whole with all rolls contributing
    else if( item.type == "melee" && stat == Statistics.strikeDamage ) {
        let dmgMetadata = new DamageRollMetadata()
        metaData = dmgMetadata
        // sum up all the damage
        let total = 0
        // This is extremely heuristic, no guarantees
        // todo: there may be other things where we want to keep the die size, cover those as they come up
        dmgMetadata.isItemRoll = (targetData.actor as any).inventory.find( i => i.name.includes( item.name ) ) != null
        for( let [id, roll] of Object.entries( item.system.damageRolls ) ) {
            let rollValues = getDamageRollValues( (roll as any).damage )
            total += rollValues.total
            dmgMetadata.components[id] = {
                totalFraction: rollValues.total,
                flatFraction: rollValues.flatFraction,
                dieSize: rollValues.dieSize,
            }
        }

        current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
        for( const [, rollData] of dmgMetadata.components ) {
            rollData.totalFraction /= total
        }
    }
    else {
        return null
    }

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.value > -9999 ) {
        if( normalized.flag ) {
            metaData.outOfRange = true
        }
        return new Adjustment({
            targetDocument: item,
            targetAttribute: targetAttribute,
            statistic: stat,
            normalizedValue: normalized.value,
            displayValue: normalized.display,
            metadata: metaData
        })
    }

    return null
}

export function getTextAdjustments( currentLevel: string, item: any, targetAttribute: string ) {
    let adjustments: Adjustment[] = []
    let text = getChildField( item, targetAttribute )
    let saves = text.matchAll( savePattern )
    let rolls = text.matchAll( rollPattern )

    for( const roll of rolls ) {
        // skip check-like things, these are only for damage
        if( roll[0].includes( 'd20') ) {
            continue
        }

        const inlineRoll = InlineRoll.parse( roll[0] )

        // Skip rolls where there is no damage type, as these are usually bonuses and i don't know how they should scale
        if( inlineRoll.rolls.filter( r => r.damageType.length > 0 ).length == 0 ) {
            continue
        }

        let componentMetaData: InlineRollComponentMetadata[] = []

        // todo: this is prolly insufficient because sneak-attack like things should not be using either strike or area damage tables
        let statisticTable = text.match( areaTemplatePattern ) ? Statistics.areaDamage : Statistics.strikeDamage
        let damageValues = statisticValues[statisticTable][currentLevel]

        // sum up all the damage for this roll
        let total = 0
        for( const rollData of inlineRoll.rolls ) {
            let rollValues = getDamageRollValues( rollData.toSimpleString() )
            total += rollValues.total
            componentMetaData.push({
                rollData: rollData,
                totalFraction: rollValues.total,
                flatFraction: rollValues.flatFraction,
            })
        }

        let current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
        for( const meta of componentMetaData ) {
            meta.totalFraction /= total
        }

        let normalized = getNormalizedValue( current, damageValues, 1 )

        if( normalized.value > -9999 ) {
            let metaData: InlineRollMetadata = {
                replaceText: roll[0],
                statisticTable: statisticTable,
                components: componentMetaData,
                hasTrailingLabel: inlineRoll.hasTrailingLabel
            }
            if( normalized.flag ) {
                metaData.outOfRange = true
            }

            let display = inlineRoll.toReadableString()

            let data = new Adjustment({
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: Statistics.description,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                displayName: `Text: Roll ${display}`,
                metadata: metaData
            })
            adjustments.push( data )
        }
    }

    const dcValues = statisticValues[Statistics.spellDC][currentLevel]
    for( const saveCheck of saves ) {
        let currentDC = parseInt( saveCheck[1] )
        let normalized = getNormalizedValue( currentDC, dcValues, 1 )
        if( normalized.value > -9999 ) {
            let metaData: InlineCheckMetadata = {
                replaceText: saveCheck[0],
                replaceValues: [saveCheck[1]],
                statisticTable: Statistics.spellDC
            }
            if( normalized.flag ){
                metaData.outOfRange = true
            }
            let data = new Adjustment({
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: Statistics.description,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                displayName: `Text: Save DC ${saveCheck[1]}`,
                metadata: metaData
            })
            adjustments.push( data )
        }
    }

    return adjustments
}