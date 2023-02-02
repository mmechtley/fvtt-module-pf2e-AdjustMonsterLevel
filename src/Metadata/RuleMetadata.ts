import {BaseMetadata} from "./BaseMetadata";
import {Dice, Statistics} from "../Keys";

export class RuleMetadata extends BaseMetadata {
    public key: string
    public dieSize: Dice
    public statisticTable: Statistics
    public damageTypeLabel: string
}