import {localize} from "../Utils";

export class InlineCheck {
    public static pattern = /@Check\[[^\]]*](?:\{[^}]*})?/g

    // Formatting and parameter definitions:
    // https://github.com/foundryvtt/pf2e/wiki/Style-Guide#inline-check-buttons
    public type: string = ''
    public dc: string | number = ''
    public basic: boolean = false
    public adjustment: string = ''
    public immutable: boolean = false
    public name: string = ''
    public traits: string = ''
    public overrideTraits: boolean = false
    public trailingLabel : string = ''

    public static parse( checkString: string ): InlineCheck {
        let check = new InlineCheck()
        const tooltip = checkString.match( /](\{[^{}[\]]*})$/ )
        if( tooltip ) {
            const labelStart = checkString.lastIndexOf('{')
            check.trailingLabel = checkString.substring( labelStart+1, checkString.length-1 )
            checkString = checkString.substring( 0, labelStart )
        }

        // Trim "@Check[" and "]" from ends
        checkString = checkString.substring( 7, checkString.length-1 ).trim()
        const checkParams = checkString.split('|')
        for( const checkParam of checkParams ) {
            const firstColon = checkParam.indexOf( ':' )
            const paramName = checkParam.substring( 0, firstColon )
            const paramValue = checkParam.substring( firstColon+1 )
            if( paramName == 'type' ) {
                check.type = paramValue
            }
            else if( paramName == 'dc' ) {
                // parse numeric DC values, or leave it alone if it's a resolvable reference like @actor.attributes.classDC.value
                if( paramValue.match( /\d+/ ) )
                    check.dc = parseInt( paramValue )
                else
                    check.dc = paramValue
            }
            else if( paramName == 'basic' ) {
                check.basic = true
            }
            else if( paramName == 'adjustment' ) {
                check.adjustment = paramValue
            }
            else if( paramName == 'immutable' ) {
                check.immutable = true
            }
            else if( paramName == 'name' ) {
                check.name = paramValue
            }
            else if( paramName == 'traits' ) {
                check.traits = paramValue
            }
            else if( paramName == 'overrideTraits' ) {
                check.overrideTraits = true
            }
        }

        return check
    }

    public clone(): InlineCheck {
        let check = new InlineCheck()
        check.type = this.type
        check.dc = this.dc
        check.basic = this.basic
        check.adjustment = this.adjustment
        check.immutable = this.immutable
        check.name = this.name
        check.traits = this.traits
        check.overrideTraits = this.overrideTraits
        check.trailingLabel = this.trailingLabel
        return check
    }

    public toReadableString() : string {
        return `DC ${Number.isFinite(this.dc) ? this.dc : "(calculated)"} ${localize('PF2EADJUSTMONSTERLEVEL.'+this.type)}`
    }

    public toInlineString() : string {
        let components: string[] = []
        if( this.type.length > 0 ) {
            components.push( `type:${this.type}` )
        }
        // assume always present, implicitly toString's if it's numeric
        components.push(`dc:${this.dc}`)
        if( this.basic ) {
            components.push( "basic:true" )
        }
        if( this.adjustment.length > 0 ) {
            components.push( `adjustment:${this.adjustment}` )
        }
        if( this.immutable ) {
            components.push( "immutable:true" )
        }
        if( this.name.length > 0 ) {
            components.push( `name:${this.name}` )
        }
        if( this.traits.length > 0 ) {
            components.push( `traits:${this.traits}` )
        }
        if( this.overrideTraits ) {
            components.push( "overrideTraits:true" )
        }
        let output = '@Check[' + components.join('|') + ']'
        if( this.trailingLabel ) {
            // the style guide claims only lore need this so we'll just reproduce what is there
            output += `{${this.trailingLabel}}`

        }
        return output
    }
}