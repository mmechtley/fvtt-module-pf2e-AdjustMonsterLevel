import {BaseMetadata} from "./BaseMetadata";

export abstract class RuleMetadata extends BaseMetadata {
    public abstract get key() : string
}