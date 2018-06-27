import {JsonObject, JsonProperty} from 'json2typescript';
import {AbstractEntity} from './abstract-entity';

@JsonObject
export class Role extends AbstractEntity {
    @JsonProperty('name', String)
    name: string = undefined;

    @JsonProperty('display_name', String)
    display_name: string = undefined;

    @JsonProperty('description', String)
    description: string = undefined;

    init() {
    }
}
