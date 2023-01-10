import {BaseMetadata} from "./BaseMetadata";
import {AllowDice, Dice} from "../Keys";

export class DamageRollComponentMetadata {
    public totalFraction: number
    public flatFraction: number
    public dieSize: Dice
}

export class DamageRollMetadata extends BaseMetadata {
    public allowDice: AllowDice
    public components: Map<string, DamageRollComponentMetadata>

    constructor() {
        super();
        this.components = new Map<string, DamageRollComponentMetadata>()
    }
}