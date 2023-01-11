import {InlineRoll, RollComponentData} from "../InlineData/InlineRoll";
import {InlineMacroMetadata} from "./InlineMacroMetadata";
import {AllowDice} from "../Keys";

export class InlineRollComponentMetadata {
    public rollData: RollComponentData
    public totalFraction: number
    public flatFraction: number
}

export class InlineRollMetadata extends InlineMacroMetadata {
    public hasTrailingLabel: boolean
    public blind: boolean
    public allowDice: AllowDice
    public components: InlineRollComponentMetadata[]

    get macroType() {
        return 'InlineRoll'
    }
}