import {Statistics} from "./Keys";
import {v4} from 'uuid'

export class AdjustmentCategory {
    public displayName: string
    public adjustments: Adjustment[] = []

    constructor(displayName: string) {
        this.displayName = displayName
    }
}

export class Adjustment {
    public id: string
    public targetDocument: any
    public targetAttribute: string
    public normalizedValue: number
    public statistic: Statistics
    public displayName?: string
    public displayValue: string
    public metadata?: any = {}

    public constructor( init?:Partial<Adjustment> ) {
        Object.assign( this, init )
        this.id = v4()
    }
}