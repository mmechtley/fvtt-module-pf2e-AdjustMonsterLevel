import {RollComponentData} from "../InlineData/InlineRoll";
import {InlineMacroMetadata} from "./InlineMacroMetadata";

export class InlineRollComponentMetadata {
    public rollData: RollComponentData
    public totalFraction: number
    public flatFraction: number
}

export class InlineRollMetadata extends InlineMacroMetadata {
    public hasTrailingLabel: boolean
    public components: InlineRollComponentMetadata[] = []
}