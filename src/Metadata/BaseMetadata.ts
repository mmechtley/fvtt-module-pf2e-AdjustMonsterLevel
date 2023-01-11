export class BaseMetadata {
    public outOfRange?: boolean
    public dumpStat?: boolean

    public constructor( init?:Partial<{}> ) {
        Object.assign( this, init )
    }
}