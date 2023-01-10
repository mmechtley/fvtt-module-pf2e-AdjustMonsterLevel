import {Statistics} from "../Keys";
import {BaseMetadata} from "./BaseMetadata";

export abstract class InlineMacroMetadata extends BaseMetadata {
    // The original text we are replacing
    public replaceText: string
    public statisticTable: Statistics

    public abstract get macroType() : string
}