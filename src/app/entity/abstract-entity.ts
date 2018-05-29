import {JsonProperty} from 'json2typescript';

export abstract class AbstractEntity {

    @JsonProperty('id', Number)
    public id: number = undefined;

    abstract init();
}
