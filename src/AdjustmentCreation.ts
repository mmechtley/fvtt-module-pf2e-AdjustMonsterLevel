import {Statistics} from "./Keys";
import {statisticValues} from "./Values";
import {getChildField, getDamageRollValues, getNormalizedValue} from "./Utils";
import {Adjustment} from "./Adjustments";
import {TargetData} from "./AdjustMonsterLevel";
export const damageRollPattern = /\[\[\/r\s*(\d+d\d+)\[\s*(\w+)\s*]\s*]]/g
export const rollPattern = /\[{2}\/r(?:.(?!\[{2}))*]{2}/g  // note no capturing groups
export const savePattern = /@Check\[type:\w+\|dc:(\d+)[|:\w]*]/g
export const areaTemplatePattern = /@Template/

export function getActorFieldAdjustment( targetData: TargetData, stat: Statistics, fieldPath: string ) {
    const values = statisticValues[stat][targetData.level]
    let current = getChildField( targetData.actor, fieldPath )
    let metaData: any = {}

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.value > -9999 ) {
        if( normalized.flag ){
            metaData.outOfRange = true
        }
        let data : Adjustment = {
            targetDocument: targetData.actor,
            targetAttribute: fieldPath,
            normalizedValue: normalized.value,
            displayValue: normalized.display,
            statistic: stat,
            metaData: metaData
        }
        return data
    }

    return null
}

export function getResistWeakAdjustment( targetData: TargetData, item: any, targetAttribute: string ) {
    const values = statisticValues[Statistics.resistWeak][targetData.level]
    let current = item.value
    let metaData: any = {}

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.flag ){
        metaData.outOfRange = true
    }
    let data : Adjustment = {
        targetDocument: targetData.actor,
        targetAttribute: targetAttribute,
        statistic: Statistics.resistWeak,
        normalizedValue: normalized.value,
        displayValue: normalized.display,
        displayName: item.type,
        metaData: metaData
    }
    return data
}

export function getItemAdjustment( targetData: TargetData, stat: Statistics, item: any, targetAttribute: string ) {
    const values = statisticValues[stat][targetData.level]
    let metaData: any = {}
    let current = 0
    // simple fields
    if( item.type == 'lore' // skills
        || item.type == "spellcastingEntry"  // spellcasting
        || ( item.type == "melee" && stat == Statistics.strikeBonus ) // strike attack bonus
    ) {
        current = getChildField( item, targetAttribute )
    }
    // strike damage needs to be considered as a whole with all rolls contributing
    else if( item.type == "melee" && stat == Statistics.strikeDamage ) {
        // sum up all the damage
        let total = 0
        // This is extremely heuristic, no guarantees
        // todo: there may be other things where we want to keep the die size, cover those as they come up
        metaData.isItemRoll = (targetData.actor as any).inventory.find( i => i.name.includes( item.name ) ) != null
        for( let [id, roll] of Object.entries( item.system.damageRolls ) ) {
            let rollValues = getDamageRollValues( (roll as any).damage )
            total += rollValues.total
            metaData[id] = {
                totalFraction: rollValues.total,
                flatFraction: rollValues.flatFraction,
                dieSize: rollValues.dieSize,
            }
        }

        current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
        for( const [, rollData] of Object.entries( metaData ) ) {
            if( (rollData as any).hasOwnProperty('totalFraction') ) {
                (rollData as any).totalFraction = (rollData as any).totalFraction / total
            }
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

export function getTextAdjustments( currentLevel: string, item: any, targetAttribute: string ) {
    let adjustments: Adjustment[] = []
    let text = getChildField( item, targetAttribute )
    let damageRolls = text.matchAll( damageRollPattern )
    let saves = text.matchAll( savePattern )
    // todo: maybe try to use the existing parser for rolls? convert to roll object, do math, create new roll object, toString it or whatever
    let rolls = text.matchAll( rollPattern )
    for (const roll of rolls) {
        if( !roll[0].includes('d20') ) {
            // let hmm = new DamageRoll(roll[1])
            // console.log(hmm)
            // console.log(roll[1])
        }
    }
    // todo: these prolly need their own special damage array or something
    for( const damageRoll of damageRolls ) {
        // todo: should we filter by damage type? physical scales weirdly sometimes
        const roll = damageRoll[1]
        const type = damageRoll[2]

        // todo: should look at the text for an area and infer whether it's area damage or strike-like single target
        // todo: this is prolly insufficient because sneak-attack like things should not be using the strike table
        let statisticTable = text.match( areaTemplatePattern ) ? Statistics.areaDamage : Statistics.strikeDamage
        let damageValues = statisticValues[statisticTable][currentLevel]

        let rollStats = getDamageRollValues( roll )
        let normalized = getNormalizedValue( rollStats.total, damageValues, 1 )
        if( normalized.value > -9999 ) {
            let metaData: any = {
                replaceText: damageRoll[0],
                replaceValues: [roll],
                statisticTable: statisticTable,
                dieSize: rollStats.dieSize
            }
            if( normalized.flag ) {
                metaData.outOfRange = true
            }

            let data: Adjustment = {
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: Statistics.description,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                displayName: `Text: Roll ${roll} ${type}`,
                metaData: metaData
            }
            adjustments.push( data )
        }
    }

    const dcValues = statisticValues[Statistics.spellDC][currentLevel]
    for( const saveCheck of saves ) {
        let currentDC = parseInt( saveCheck[1] )
        let normalized = getNormalizedValue( currentDC, dcValues, 1 )
        if( normalized.value > -9999 ) {
            let metaData: any = {
                replaceText: saveCheck[0],
                replaceValues: [saveCheck[1]],
                statisticTable: Statistics.spellDC
            }
            if( normalized.flag ){
                metaData.outOfRange = true
            }
            let data: Adjustment = {
                targetDocument: item,
                targetAttribute: targetAttribute,
                statistic: Statistics.description,
                normalizedValue: normalized.value,
                displayValue: normalized.display,
                displayName: `Text: Save DC ${saveCheck[1]}`,
                metaData: metaData
            }
            adjustments.push( data )
        }
    }

    return adjustments
}