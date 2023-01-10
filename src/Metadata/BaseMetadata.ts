export class BaseMetadata {
    public outOfRange?: boolean

    public constructor( init?:Partial<{}> ) {
        Object.assign( this, init )
    }
}