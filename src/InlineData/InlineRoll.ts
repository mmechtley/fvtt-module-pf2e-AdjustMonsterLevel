import {Dice} from "../Keys";

export class RollComponentData {
    public numDice: number = 0
    public dieSize: Dice
    public flatModifier: number = 0
    public damageType: string = ''

    public toSimpleString(): string {
        let partial = ''

        if( this.dieSize && this.numDice > 0 ) {
            partial = this.numDice.toString() + this.dieSize
        }

        if( partial.length > 0 && this.flatModifier > 0 ) {
            partial += '+'
        }

        if( this.flatModifier > 0 ) {
            partial += this.flatModifier.toString()
        }
        return partial
    }

    public toStringWithType( simple: string = '' ): string {
        if( simple.length == 0 )
            simple = this.toSimpleString()
        if( this.flatModifier > 0 && this.numDice > 0 ) {
            simple = `(${simple})`
        }

        if( this.damageType.length > 0 ) {
            simple += `[${this.damageType}]`
        }
        return simple
    }

}

export class InlineRoll {
    // note no capturing groups, the whole thing is the roll, including tooltip if it has it
    // todo: support blind rolls too
    public static readonly pattern = /\[{2}\/r(?:.(?!\[{2}))*]{2}(?:\{[^}]*})?/g

    public hasTrailingLabel : boolean
    public rolls: RollComponentData[] = []

    public static parse( rollString: string ): InlineRoll {
        let roll = new InlineRoll()
        const label = rollString.match(/](\{.*})$/)
        if( label ) {
            roll.hasTrailingLabel = true
            const labelStart = rollString.lastIndexOf('{')
            rollString = rollString.substring( 0, labelStart )
        }
        // begin by removing the [[/r and ]] from the ends
        rollString = rollString.replace(/^\[{2}\/r/, '').replace(/]{2}$/, '')
        rollString = rollString.trim()
        // remove surrounding brackets for compound rolls if they are present
        rollString = rollString.replace(/^\{*/, '').replace(/}*$/, '')
        rollString = rollString.trim()
        // todo: are there ever internal commas or can i just use this naive way?
        let rollComponents = rollString.split(',')
        for( let component of rollComponents ) {
            component = component.trim()
            let type = component.match( /\[(\w+)]$/ )
            if( type ) {
                component = component.replace( type[0], '' )
            }
            component = component.trim()
            component = component.replace(/^\(/, '').replace(/\)$/, '')
            // now remove all spaces, internal or otherwise
            component = component.replace(/\s+/g, '')

            let plus = component.indexOf('+')
            let d = component.indexOf('d')

            let rollData = new RollComponentData()
            rollData.damageType = type ? type[1] : ''

            if( d >= 1 ) {
                rollData.numDice = parseInt( component.substring( 0, d ) )
                rollData.dieSize = component.substring( d, plus > d ? plus : undefined ) as Dice
                component = plus > d ? component.substring( plus + 1 ) : ''
            }

            // anything left is flat damage, either trimmed after plus or there were no dice to start with
            rollData.flatModifier = parseInt( component )
            roll.rolls.push( rollData )
        }

        return roll
    }

    public toReadableString() : string {
        let label = ''
        for( let i = 0; i < this.rolls.length; i++ ) {
            const roll = this.rolls[i];
            let simple = roll.toSimpleString()

            if( i > 0 ) {
                label += ' plus '
            }

            label += `${simple} ${roll.damageType.length > 0 ? roll.damageType : 'damage'}`
        }

        return label
    }

    public toInlineString() : string {
        let output = ''
        let label = ''
        for( let i = 0; i < this.rolls.length; i++ ) {
            const roll = this.rolls[i];
            let simple = roll.toSimpleString()
            let withType = roll.toStringWithType( simple )

            if( i > 0 ) {
                output += ','
                label += ' plus '
            }

            label += `${simple} ${roll.damageType}${roll.damageType.length > 0 ? ' ' : ''}damage`

            output += withType
        }

        if( this.rolls.length > 1 ) {
            output = `{${output}}`
        }

        output = `[[/r ${output}]]`

        if( this.hasTrailingLabel ){
            output += `{${label}}`
        }

        return output
    }
}