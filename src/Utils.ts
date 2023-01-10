import {AllowDice, AreaDamageTiers, Dice, Tiers, ResistTiers} from "./Keys";
import {diceValues} from "./Values";

// Generic utils
export function localize( key: string ) {
    return (game as any).i18n.localize( key )
}

export function getChildField( obj: any, fieldPath: string ) {
    let current = obj
    let separated = fieldPath.split( '.' )
    while( separated.length > 0 && current != null )
    {
        current = current[separated[0]]
        separated.splice( 0, 1 )
    }
    return current
}

// reconstructing data from adjustments
export function getClosestDieRoll( totalDamage: number, flatFraction: number, startingDie: Dice, allowDice: AllowDice ) {
    let damage = totalDamage * ( 1 - flatFraction )
    // If we don't have the ability to adjust the total using a flat modifier, use floor to skew damage slightly
    // in the player's favor. Otherwise, round to nearest and we'll use the flat modifier to adjust
    let round = flatFraction == 0 ? Math.floor : Math.round
    let dice = [Dice.d4, Dice.d6, Dice.d8, Dice.d10, Dice.d12]
    const startingDieIndex = dice.indexOf( startingDie )
    if( allowDice == AllowDice.above && startingDieIndex > 0 ) {
        dice.splice( 0, startingDieIndex )
    }
    else if ( allowDice == AllowDice.below && startingDieIndex < dice.length-1 ) {
        dice.splice( dice.indexOf( startingDie ) + 1 )
    }
    else if( allowDice == AllowDice.sameOnly ) {
        dice.splice( 0, dice.length )
    }
    let bestNumDice = Math.max( round( damage / diceValues[startingDie] ), 1 )
    let bestDie = startingDie
    let bestDistance = Math.abs( bestNumDice * diceValues[startingDie] - damage )
    for( const die of dice ) {
        const dieDamage = diceValues[die]
        let numDice = Math.max( round(damage / dieDamage ), 1 )
        let distance = Math.abs(numDice * dieDamage - damage )
        if( distance < bestDistance ) {
            bestNumDice = numDice
            bestDie = die as Dice
            bestDistance = distance
        }
    }
    return {
        roll:`${bestNumDice}${bestDie}`,
        damage:diceValues[bestDie] * bestNumDice,
        numDice: bestNumDice,
        dieSize: bestDie
    }
}

export function getNumericValue( normalized : any, values : any ) {
    let options = [AreaDamageTiers.unlimited, AreaDamageTiers.limited,
        ResistTiers.minimum, ResistTiers.maximum,
        Tiers.terrible, Tiers.low, Tiers.moderate, Tiers.high, Tiers.extreme]

    // remove ones that aren't in values
    options = options.filter( v => v in values )

    for( let i=0; i<options.length-1; i++ )
    {
        if( normalized < i+1 && i != 0 )
            continue

        if( normalized > i+2 && i != options.length-2 )
            continue

        const frac = normalized - ( i+1 )

        let intervalFloor = parseInt( values[options[i]] )
        let intervalCeil = parseInt( values[options[i+1]] )

        return Math.round( frac * ( intervalCeil - intervalFloor ) + intervalFloor )
    }

    return 0
}

// Inferring adjustment values from existing data
export function getNormalizedValue( current: any, values: Iterable<Record<string,string>>, skipIfBelow: number=-9999 ) {
    // ordered from lowest to highest
    let options = [AreaDamageTiers.unlimited, AreaDamageTiers.limited,
        ResistTiers.minimum, ResistTiers.maximum,
        Tiers.terrible, Tiers.low, Tiers.moderate, Tiers.high, Tiers.extreme]

    // remove ones that aren't in values
    options = options.filter( v => v in values )

    // Certain values should be considered 'special' and not scaled, such as Mindless creatures with negative
    // int modifiers, or monsters with 0 in a stat indicating it's basically a dump stat. If we encounter
    // such a value, skip it
    if( skipIfBelow === -9999 ) {
        skipIfBelow = parseInt( values[options[0]] )
    }

    if( current < skipIfBelow ) {
        return { value:-9999, display:"", flag:false }
    }

    for( let i=0; i<options.length-1; i++ ) {
        const intervalFloor = parseInt( values[options[i]] )
        const intervalCeil = parseInt( values[options[i+1]] )

        if( (current >= intervalFloor && current < intervalCeil)
            || (i == 0 && current < intervalFloor)
            || (i == options.length-2 && current >= intervalCeil)) {
            let frac = (current - intervalFloor) / (intervalCeil - intervalFloor)
            frac = Math.round( frac * 10 ) / 10
            let display = localize( options[i] )
            let displayFrac = frac
            if( frac >= 1 ) {
                display = localize( options[i+1] )
                displayFrac -= 1
            }

            if( displayFrac != 0 ) {
                if( displayFrac > 0 )
                    display += '+'
                display += displayFrac.toFixed( 1 )
            }
            return {
                value: frac + i + 1,
                display: display,
                flag: frac < 0 || frac > 1
            }
        }
    }

    return { value: -9999, display: "", flag:false }
}

export function getDamageRollValues( damage: string ) {
    let total = 0
    let flat = 0
    let dieSize = ''
    const plus = damage.indexOf( '+' )
    const d = damage.indexOf( 'd' ) // this index remains valid because we only remove trailing chars below

    // Has a flat damage component after + or is only flat damage (no die)
    if( plus >= 0 || d == -1 ) {
        flat = parseInt( damage.substring( plus+1 ) ) // still works if plus is -1!
        total += flat
        if( plus >= 0 )
            damage = damage.substring( 0, plus )
    }

    // Has dice, with or without a flat component
    if( d >= 0 ) {
        let nDice = damage.substring( 0, d )
        dieSize = damage.substring( d ).trim() // this can't have leading/trailing whitespace cuz it's keying into a dict
        total += parseInt( nDice ) * diceValues[dieSize]
    }

    return {
        total: total,
        dieSize: dieSize as Dice,
        flatFraction: flat / total
    }
}