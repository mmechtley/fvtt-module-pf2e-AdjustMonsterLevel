import {Adjustment} from "./Adjustments";
import {statisticValues} from "./Values";
import {getChildField, getClosestDieRoll, getNumericValue} from "./Utils";
import {AllowDice, Dice, Statistics} from "./Keys";

export function mergeSimpleAdjustment( newLevel: string, batch: any, adjustment: Adjustment ) {
    let values = statisticValues[adjustment.statistic][newLevel]
    let partial = {
        [adjustment.targetAttribute]: getNumericValue( adjustment.normalizedValue, values )
    }
    batch.data = mergeObject( batch.data, partial )
}

export function mergeIndexedAdjustment( newLevel: string, batch: any, adjustment: Adjustment, indexStr: string ) {
    let values = statisticValues[adjustment.statistic][newLevel]
    let indexStart = adjustment.targetAttribute.indexOf( indexStr )
    let objAttr = adjustment.targetAttribute.substring( indexStart + indexStr.length + 1 ) // +1 for trailing dot
    adjustment.targetAttribute = adjustment.targetAttribute.substring( 0, indexStart )
    let index = parseInt( indexStr.substring( 1, indexStr.length - 1 ) )

    // This ensures we don't stomp a previous adjustment if we are modifying multiple elements
    let copiedArray = getChildField( batch.data, adjustment.targetAttribute )
    if( !copiedArray ) {
        let originalArray = getChildField( adjustment.targetDocument, adjustment.targetAttribute )
        copiedArray = JSON.parse( JSON.stringify( originalArray ) )
    }

    copiedArray[index][objAttr] = getNumericValue( adjustment.normalizedValue, values )

    let partial = {
        [adjustment.targetAttribute]: copiedArray
    }
    batch.data = mergeObject( batch.data, partial )
}

export function mergeStrikeDamage( newLevel: string, batch:any, adjustment: Adjustment, levelIncreased: boolean ) {
    let values = statisticValues[adjustment.statistic][newLevel]
    let totalDamage = getNumericValue( adjustment.normalizedValue, values )

    let partial = {}

    let rolls = getChildField( adjustment.targetDocument, adjustment.targetAttribute )

    for( let [id, roll] of Object.entries( rolls ) ) {
        let oldRoll: string = (roll as any).damage
        let rollMeta = adjustment.metaData[id]
        let rollDamage = rollMeta.totalFraction * totalDamage
        let newRoll = ''

        // do dice first since we can adjust the flat portion easier to match the target value
        if( rollMeta.flatFraction < 1 ) {
            let allowDice = levelIncreased ? AllowDice.above : AllowDice.below
            if( adjustment.metaData.isItemRoll )
                allowDice = AllowDice.sameOnly
            let dice = getClosestDieRoll( rollDamage, rollMeta.flatFraction, rollMeta.dieSize as Dice, allowDice )
            newRoll = dice.roll
            rollDamage -= dice.damage
        }

        if( rollMeta.flatFraction > 0 && rollMeta.flatFraction < 1 ) {
            newRoll = newRoll + '+'
        }

        if( rollMeta.flatFraction > 0 ) {
            // whatever remains
            let flatDamage = Math.floor( rollDamage )
            newRoll += `${flatDamage}`
        }

        partial[`${adjustment.targetAttribute}.${id}.damage`] = newRoll
        // console.log(`${oldRoll} -> ${newRoll}`)
    }
    batch.data = mergeObject( batch.data, partial )
}

export function mergeDescription( newLevel: string, batch: any, adjustment: Adjustment ) {
    let values = statisticValues[adjustment.metaData.statisticTable][newLevel]
    // DC-like adjustments
    let originalText: string = ''
    let replacementText: string = ''
    if( adjustment.metaData.statisticTable == Statistics.spellDC ) {
        let newDC = getNumericValue( adjustment.normalizedValue, values )
        originalText = adjustment.metaData.replaceText
        replacementText = adjustment.metaData.replaceText.replace( adjustment.metaData.replaceValues[0], newDC.toString() )
    }
    // damage roll-like adjustments
    else {
        let newDamage = getNumericValue( adjustment.normalizedValue, values )
        let newRoll = getClosestDieRoll( newDamage, 0, adjustment.metaData.dieSize as Dice, AllowDice.sameOnly )
        originalText = adjustment.metaData.replaceText
        replacementText = adjustment.metaData.replaceText.replace( adjustment.metaData.replaceValues[0], newRoll.roll )
    }

    if( originalText !== '' && replacementText !== '' ) {
        // This ensures we don't stomp a previous adjustment if we are adjusting multiple text entries
        let copiedText = getChildField( batch.data, adjustment.targetAttribute )
        if( !copiedText ) {
            copiedText = getChildField( adjustment.targetDocument, adjustment.targetAttribute )
        }

        copiedText = copiedText.replace( originalText, replacementText )

        let partial = {
            [adjustment.targetAttribute]: copiedText
        }
        batch.data = mergeObject( batch.data, partial )
    }
}