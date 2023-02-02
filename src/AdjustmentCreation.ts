import {AbilityModifiers, AllowDice, Dice, Statistics} from "./Keys";
import {inlineAllowDice, inlineDamageLabel, statisticValues} from "./Values";
import {getChildField, getDamageRollValues, getNormalizedValue} from "./Utils";
import {Adjustment} from "./Adjustments";
import {TargetData} from "./AdjustMonsterLevel";
import {InlineRoll} from "./InlineData/InlineRoll";
import {InlineRollComponentMetadata, InlineRollMetadata} from "./Metadata/InlineRollMetadata";
import {BaseMetadata} from "./Metadata/BaseMetadata";
import {DamageRollMetadata} from "./Metadata/DamageRollMetadata";
import {InlineCheckMetadata} from "./Metadata/InlineCheckMetadata";
import {InlineCheck} from "./InlineData/InlineCheck";
import {RuleMetadata} from "./Metadata/RuleMetadata";

export const areaTemplatePattern = /@Template/

export function getActorFieldAdjustment( targetData: TargetData, stat: Statistics, fieldPath: string ): Adjustment | null {
    const values = statisticValues[stat][targetData.level]
    let current = getChildField( targetData.actor, fieldPath )
    let metaData: BaseMetadata = new BaseMetadata()

    let normalized = getNormalizedValue( current, values, -20 )
    if( normalized.value > -9999 ) {
        const dumpStat = current < 1 && AbilityModifiers.includes( stat )
        if( normalized.flag ){
            metaData.outOfRange = true
        }
        if( dumpStat ) {
            metaData.dumpStat = true
        }
        return new Adjustment({
            targetDocument: targetData.actor,
            targetAttribute: fieldPath,
            normalizedValue: normalized.value,
            displayValue: normalized.display,
            statistic: stat,
            apply: !dumpStat,
            metadata: metaData,
        })
    }

    return null
}

export function getResistWeakAdjustment( targetData: TargetData, item: any, targetAttribute: string ): Adjustment {
    const values = statisticValues[Statistics.resistWeak][targetData.level]
    let current = item.value
    let metaData: BaseMetadata = {}

    let normalized = getNormalizedValue( current, values, 1 )
    if( normalized.flag ){
        metaData.outOfRange = true
    }
    return new Adjustment({
        targetDocument: targetData.actor,
        targetAttribute: targetAttribute,
        statistic: Statistics.resistWeak,
        normalizedValue: normalized.value,
        displayValue: normalized.display,
        displayName: item.type,
        metadata: metaData
    })
}

export function getItemAdjustment( targetData: TargetData, stat: Statistics, item: any, targetAttribute: string ): Adjustment | null {
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
        const hasCorrespondingItem = (targetData.actor as any).inventory.find( i => i.name.includes( item.name ) ) != null
        dmgMetadata.allowDice = hasCorrespondingItem ? AllowDice.sameOnly : AllowDice.any
        for( let [id, roll] of Object.entries( item.system.damageRolls ) ) {
            let rollValues = getDamageRollValues( (roll as any).damage )
            total += rollValues.total
            dmgMetadata.components.set( id, {
                totalFraction: rollValues.total,
                flatFraction: rollValues.flatFraction,
                dieSize: rollValues.dieSize,
            } )
        }

        current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
        for( const [id, rollData] of dmgMetadata.components ) {
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



export function getTextAdjustments( currentLevel: string, item: any, targetAttribute: string ) : Adjustment[] {
    let adjustments: Adjustment[] = []
    const text = getChildField( item, targetAttribute );
    const checks = text.matchAll( InlineCheck.pattern );
    const rolls = text.matchAll( InlineRoll.pattern );
    const hasAreaTemplate = text.match( areaTemplatePattern );

    for( const roll of rolls ) {
        // skip check-like things entirely
        if( roll[0].includes( 'd20') ) {
            continue
        }

        const inlineRoll = InlineRoll.parse( roll[0] )

        // Skip rolls where there is no damage type or "damage" is not in the text, as these are usually things like
        // breath weapon recharge and should not be scaled
        if( !inlineRoll.isDamage ) {
            continue
        }

        let componentMetadata: InlineRollComponentMetadata[] = []

        // todo: if a number seems sus, create the adjustment but default it to off?
        // todo: some text blocks may be very long with multiple rolls and the template doesn't apply to them all. try to be smart?
        let statisticTable = hasAreaTemplate ? Statistics.areaDamage : Statistics.strikeDamage

        // todo: VERY heuristic. additional damage is *usually* just dice (no flat bonus) OR only flat bonus (vampire
        //  drink blood etc) from what i've seen
        if( statisticTable == Statistics.strikeDamage
            && inlineRoll.rolls.length == 1
            && ( inlineRoll.rolls[0].flatModifier == 0
                || inlineRoll.rolls[0].numDice == 0 )
        ) {
            statisticTable = Statistics.additionalDamage
        }
        let damageValues = statisticValues[statisticTable][currentLevel]

        // sum up all the damage for this roll
        let total = 0
        for( const rollData of inlineRoll.rolls ) {
            let rollValues = getDamageRollValues( rollData.toSimpleString() )
            total += rollValues.total
            componentMetadata.push({
                rollData: rollData,
                totalFraction: rollValues.total,
                flatFraction: rollValues.flatFraction,
            })
        }

        let current = Math.ceil( total ) // odd numbers of dice results in a half that should be rounded up to match the gmg numbers
        for( const meta of componentMetadata ) {
            meta.totalFraction /= total
        }

        let normalized = getNormalizedValue( current, damageValues, 1 )

        if( normalized.value > -9999 ) {
            let metaData = new InlineRollMetadata({
                replaceText: roll[0],
                statisticTable: statisticTable,
                components: componentMetadata,
                originalRoll: inlineRoll,
                allowDice: inlineAllowDice[statisticTable],
                damageTypeLabel: inlineDamageLabel[statisticTable]
            })
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
    for( const check of checks ) {
        const inlineCheck = InlineCheck.parse( check[0] )
        // Some DCs reference variables on the actor, such as class DCs etc. Ignore those, and only modify numeric DCs
        if( Number.isFinite( inlineCheck.dc ) ){
            let normalized = getNormalizedValue( inlineCheck.dc, dcValues, 1 )
            if( normalized.value > -9999 ) {
                let metaData = new InlineCheckMetadata({
                    replaceText: check[0],
                    originalCheck: inlineCheck,
                    statisticTable: Statistics.spellDC
                })
                if( normalized.flag ){
                    metaData.outOfRange = true
                }
                let data = new Adjustment({
                    targetDocument: item,
                    targetAttribute: targetAttribute,
                    statistic: Statistics.description,
                    normalizedValue: normalized.value,
                    displayValue: normalized.display,
                    displayName: `Text: Check ${inlineCheck.toReadableString()}`,
                    metadata: metaData
                })
                adjustments.push( data )
            }
        }
    }

    return adjustments
}

export function getRuleAdjustments( currentLevel: string, item: any ) : Adjustment[] {
    let adjustments: Adjustment[] = []
    const rules = getChildField( item, 'system.rules' )

    for( let i=0; i<rules.length; i++ ) {
        const rule = rules[i]
        // This one is pretty simple as it maps well to the Additional Damage table (because I made that from Sneak Attack to begin with)
        // todo: should this default to off?
        if( rule.key == 'DamageDice' ) {
            let damageValues = statisticValues[Statistics.additionalDamage][currentLevel]
            let roll = `${rule.diceNumber}${rule.dieSize}`
            let damage = getDamageRollValues( roll )
            let normalized = getNormalizedValue( damage.total, damageValues, 1 )
            if( normalized.value > -9999 ) {
                let metaData = new RuleMetadata({
                    key: rule.key,
                    dieSize: rule.dieSize as Dice,
                    statisticTable: Statistics.additionalDamage,
                    damageTypeLabel: inlineDamageLabel[Statistics.additionalDamage]
                })
                if( normalized.flag ) {
                    metaData.outOfRange = true
                }

                let data = new Adjustment({
                    targetDocument: item,
                    targetAttribute: `system.rules[${i}].diceNumber`,
                    statistic: Statistics.rule,
                    normalizedValue: normalized.value,
                    displayValue: normalized.display,
                    displayName: `Rule: DamageDice numDice ${rule.diceNumber}`,
                    metadata: metaData
                })
                adjustments.push( data )
            }
        }
    }

    return adjustments
}