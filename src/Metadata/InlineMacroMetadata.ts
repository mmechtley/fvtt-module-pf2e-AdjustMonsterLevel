import {Statistics} from "../Keys";
import {BaseMetadata} from "./BaseMetadata";

export class InlineMacroMetadata extends BaseMetadata {
    public replaceText: string
    public statisticTable: Statistics
}