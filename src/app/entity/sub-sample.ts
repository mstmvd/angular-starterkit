import {JsonObject, JsonProperty} from 'json2typescript';
import {AbstractEntity} from './abstract-entity';

@JsonObject
export class SubSample extends AbstractEntity {

    @JsonProperty('title', String)
    title: string = undefined;

    @JsonProperty('description', String)
    description: string = undefined;

    init() {
    }
}
