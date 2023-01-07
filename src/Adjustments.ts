import {Statistics} from "./Keys";

export class AdjustmentCategory {
    public displayName: string
    public adjustments: Adjustment[] = []

    constructor(displayName: string) {
        this.displayName = displayName
    }
}

export class Adjustment {
    public targetDocument: any
    public targetAttribute: string
    public normalizedValue: number
    public statistic: Statistics
    public displayName?: string
    public displayValue: string
    public metadata?: any = {}
}