import {Dice} from "../Keys";
import {localize} from "../Utils";

export class RollComponentData {
    public numDice: number = 0
    public dieSize: Dice
    public flatModifier: number = 0
    public damageType: string = ''
    public chatLabel: string = ''

    public clone() : RollComponentData {
        let component = new RollComponentData()
        component.numDice = this.numDice
        component.dieSize = this.dieSize
        component.flatModifier = this.flatModifier
        component.damageType = this.damageType
        component.chatLabel = this.chatLabel
        return component
    }

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

    public toInlineRollString( simple: string = '' ): string {
        if( simple.length == 0 )
            simple = this.toSimpleString()
        if( this.flatModifier > 0 && this.numDice > 0 ) {
            simple = `(${simple})`
        }

        if( this.damageType.length > 0 ) {
            simple += `[${this.damageType}]`
        }

        if( this.chatLabel.length > 0 ) {
            simple += ` #${this.chatLabel}`
        }

        return simple
    }
}

export class InlineRoll {
    // note no capturing groups, the whole thing is the roll, including tooltip if it has it
    public static readonly pattern = /\[{2}\/b?r(?:.(?!\[{2}))*]{2}(?:\{[^}]*})?/g

    public hasTrailingLabel : boolean = false
    public blind: boolean = false
    public isDamage: boolean = false
    public rolls: RollComponentData[] = []

    public static parse( rollString: string ): InlineRoll {
        let roll = new InlineRoll()
        const label = rollString.match( /](\{[^{}[\]]*})$/ )
        if( label ) {
            roll.hasTrailingLabel = true
            const labelStart = rollString.lastIndexOf('{')
            rollString = rollString.substring( 0, labelStart )
            // untyped damage will generally not use [untyped] but instead just write it in the label
            let damageLabel = localize('PF2EADJUSTMONSTERLEVEL.damageInline')
            if( label[1].includes( damageLabel ) ) {
                roll.isDamage = true
            }
        }
        if( rollString.match( /^\[{2}\/b/ ) ) {
            roll.blind = true
        }
        // begin by removing the [[/r and ]] from the ends
        rollString = rollString.replace(/^\[{2}\/b?r/, '').replace(/]{2}$/, '')
        rollString = rollString.trim()
        // remove surrounding brackets for compound rolls if they are present
        rollString = rollString.replace(/^\{*/, '').replace(/}*$/, '')
        rollString = rollString.trim()

        // todo: are there ever internal commas or can i just use this naive way?
        let rollComponents = rollString.split(',')
        for( let component of rollComponents ) {
            component = component.trim()

            let chatLabel = component.match(/#(.*)/)
            if( chatLabel ) {
                component = component.replace( chatLabel[0], '' )
                component = component.trim()
            }
            let type = component.match( /\[(\w+)]$/ )
            if( type ) {
                component = component.replace( type[0], '' )
                roll.isDamage = true
            }
            component = component.trim()
            component = component.replace(/^\(/, '').replace(/\)$/, '')
            // now remove all spaces, internal or otherwise
            component = component.replace(/\s+/g, '')

            let plus = component.indexOf('+')
            let d = component.indexOf('d')

            let rollData = new RollComponentData()
            rollData.damageType = type ? type[1] : ''
            rollData.chatLabel = chatLabel ? chatLabel[1] : ''

            if( d >= 1 ) {
                rollData.numDice = parseInt( component.substring( 0, d ) )
                rollData.dieSize = component.substring( d, plus > d ? plus : undefined ) as Dice
                component = plus > d ? component.substring( plus + 1 ) : ''
            }

            // anything left is flat damage, either trimmed after plus or there were no dice to start with
            rollData.flatModifier = parseInt( component )
            if( !Number.isFinite( rollData.flatModifier ) ) {
                rollData.flatModifier = 0
            }
            roll.rolls.push( rollData )
        }

        return roll
    }

    public clone(): InlineRoll {
        let roll = new InlineRoll()
        roll.isDamage = this.isDamage
        roll.blind = this.blind
        roll.hasTrailingLabel = this.hasTrailingLabel
        for ( const component of this.rolls ) {
            roll.rolls.push( component.clone() )
        }
        return roll
    }

    // todo: this and the label on the next one should support non-damage labels
    public toReadableString() : string {
        let label = ''
        for( let i = 0; i < this.rolls.length; i++ ) {
            const roll = this.rolls[i];
            let simple = roll.toSimpleString()

            if( i > 0 ) {
                label += ' plus '
            }

            label += simple
            if( this.isDamage ) {
                label += ' '
                label += roll.damageType.length > 0 ? roll.damageType : localize( 'PF2EADJUSTMONSTERLEVEL.damageInline' )
            }
        }

        return label
    }

    public toInlineRollString() : string {
        let output = ''
        let label = ''
        for( let i = 0; i < this.rolls.length; i++ ) {
            const roll = this.rolls[i];
            let simple = roll.toSimpleString()
            let withType = roll.toInlineRollString( simple )

            if( i > 0 ) {
                output += ','
                label += ' ' + localize( 'PF2EADJUSTMONSTERLEVEL.plusInline' ) + ' '
            }

            label += simple
            if( roll.damageType.length > 0 ) {
                label += ' ' + roll.damageType
            }
            if( this.isDamage ) {
                label += ' ' + localize( 'PF2EADJUSTMONSTERLEVEL.damageInline' )
            }

            output += withType
        }

        if( this.rolls.length > 1 ) {
            output = `{${output}}`
        }

        output = `[[/${this.blind ? 'b': ''}r ${output}]]`

        if( this.hasTrailingLabel ){
            output += `{${label}}`
        }

        return output
    }
}