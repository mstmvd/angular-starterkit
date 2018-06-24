import {JsonObject, JsonProperty} from 'json2typescript';
import {AbstractEntity} from './abstract-entity';

@JsonObject
export class User extends AbstractEntity {

    @JsonProperty('name', String)
    name: string = undefined;

    @JsonProperty('family', String)
    family: string = undefined;

    @JsonProperty('email', String)
    email: string = undefined;

    @JsonProperty('mobile', String)
    mobile: string = undefined;

    init() {
    }

    toString() {
        return this.name + ' ' + this.family;
    }
}
