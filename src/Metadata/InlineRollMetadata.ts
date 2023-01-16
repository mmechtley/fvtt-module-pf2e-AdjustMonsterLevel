import {InlineRoll, RollComponentData} from "../InlineData/InlineRoll";
import {InlineMacroMetadata} from "./InlineMacroMetadata";
import {AllowDice} from "../Keys";

export class InlineRollComponentMetadata {
    public rollData: RollComponentData
    public totalFraction: number
    public flatFraction: number
}

export class InlineRollMetadata extends InlineMacroMetadata {
    public originalRoll: InlineRoll
    public allowDice: AllowDice
    public components: InlineRollComponentMetadata[]
    public damageTypeLabel: string

    get macroType() {
        return 'InlineRoll'
    }
}