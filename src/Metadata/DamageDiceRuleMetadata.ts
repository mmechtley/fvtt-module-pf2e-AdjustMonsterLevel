import {RuleMetadata} from "./RuleMetadata";
import {AllowDice, Dice, Statistics} from "../Keys";

export class DamageDiceRuleMetadata extends RuleMetadata {
    public dieSize: Dice
    public allowDice: AllowDice
    public statisticTable: Statistics
    public damageTypeLabel: string

    get key(): string {
        return "DamageDice";
    }
}