import {JsonObject, JsonProperty} from 'json2typescript';
import {Grid} from '../util/grid.component';

@JsonObject
export abstract class AbstractEntity {

    @JsonProperty('id', Number)
    public id: number = undefined;

    @Grid({
        actions: [
            {type: 'update'},
            {type: 'destroy'}
        ]
    })
    actions = true;

    abstract init();

    toString(): string {
        return String(this.id);
    }
}
