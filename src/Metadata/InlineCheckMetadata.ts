import {InlineMacroMetadata} from "./InlineMacroMetadata";
import {InlineCheck} from "../InlineData/InlineCheck";

export class InlineCheckMetadata extends InlineMacroMetadata {
    public originalCheck: InlineCheck

    get macroType() {
        return 'InlineCheck'
    }
}