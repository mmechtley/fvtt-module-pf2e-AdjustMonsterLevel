import {Adjustment} from "./Adjustments";
import {statisticValues} from "./Values";
import {getChildField, getClosestDieRoll, getNumericValue} from "./Utils";
import {AllowDice, Dice} from "./Keys";
import {DamageRollMetadata} from "./Metadata/DamageRollMetadata";
import {InlineMacroMetadata} from "./Metadata/InlineMacroMetadata";
import {InlineRollMetadata} from "./Metadata/InlineRollMetadata";
import {InlineRoll, RollComponentData} from "./InlineData/InlineRoll";
import {InlineCheckMetadata} from "./Metadata/InlineCheckMetadata";

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
    const metadata = adjustment.metadata as DamageRollMetadata
    let values = statisticValues[adjustment.statistic][newLevel]
    let totalDamage = getNumericValue( adjustment.normalizedValue, values )

    let partial = {}

    let rolls = getChildField( adjustment.targetDocument, adjustment.targetAttribute )

    for( let [id, roll] of Object.entries( rolls ) ) {
        let rollMeta = metadata.components.get( id )
        if( !rollMeta ) {
            continue
        }
        let rollDamage = rollMeta.totalFraction * totalDamage
        let newRoll = ''

        // do dice first since we can adjust the flat portion easier to match the target value
        if( rollMeta.flatFraction < 1 ) {
            let allowDice = levelIncreased ? AllowDice.above : AllowDice.below
            if( metadata.allowDice != AllowDice.any )
                allowDice = metadata.allowDice
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
    }
    batch.data = mergeObject( batch.data, partial )
}

export function mergeDescription( newLevel: string, batch: any, adjustment: Adjustment, levelIncreased: boolean ) {
    const metadata = adjustment.metadata as InlineMacroMetadata
    const values = statisticValues[metadata.statisticTable][newLevel]
    // DC-like adjustments
    let originalText: string = ''
    let replacementText: string = ''
    if( metadata.macroType == 'InlineCheck' ) {
        const checkMetadata = metadata as InlineCheckMetadata
        let inlineCheck = checkMetadata.originalCheck.clone()
        inlineCheck.dc = getNumericValue( adjustment.normalizedValue, values )
        originalText = metadata.replaceText
        replacementText = inlineCheck.toInlineString()
    }
    // damage roll-like adjustments
    else if( metadata.macroType == 'InlineRoll' ) {
        const rollMetadata = metadata as InlineRollMetadata
        let totalDamage = getNumericValue( adjustment.normalizedValue, values )

        let inlineRoll = new InlineRoll()
        inlineRoll.hasTrailingLabel = rollMetadata.hasTrailingLabel
        inlineRoll.blind = rollMetadata.blind

        for( const component of rollMetadata.components ) {
            let rollDamage = component.totalFraction * totalDamage
            let newComponent = new RollComponentData()
            newComponent.damageType = component.rollData.damageType

            // do dice first since we can adjust the flat portion easier to match the target value
            if( component.flatFraction < 1 ) {
                let allowDice = levelIncreased ? AllowDice.above : AllowDice.below
                if( rollMetadata.allowDice != AllowDice.any )
                    allowDice = rollMetadata.allowDice
                let dice = getClosestDieRoll( rollDamage, component.flatFraction, component.rollData.dieSize, allowDice )
                newComponent.dieSize = dice.dieSize
                newComponent.numDice = dice.numDice
                rollDamage -= dice.damage
            }

            if( component.flatFraction > 0 ) {
                // whatever remains
                newComponent.flatModifier = Math.floor( rollDamage )
            }

            inlineRoll.rolls.push( newComponent )
        }

        originalText = metadata.replaceText
        replacementText = inlineRoll.toInlineString()
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