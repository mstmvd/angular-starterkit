import {HttpClient} from '@angular/common/http';
import {AbstractEntity} from '../entity/abstract-entity';
import {ServerResponse} from '../entity/server-response';

export abstract class AbstractEntityService<Entity extends AbstractEntity> {

    route: string;
    routeParams = {};
    paginate = false;

    protected constructor(protected http: HttpClient) {
    }

    getRoute() {
        const me = this;
        let route = this.route;
        if (Object.keys(this.routeParams).length > 0) {
            Object.keys(this.routeParams).forEach(function (i) {
                route = route.replace('{' + i + '}', me.routeParams[i]);
            });
        }
        return route;
    }

    index(params?) {
        let route = this.getRoute();
        const parts = [];
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(function (v) {
                parts.push(v + '=' + params[v]);
            });
        }
        if (this.paginate) {
            parts.push('paginate');
        }
        if (parts.length > 0) {
            parts.join('&');
            route += '?' + parts;
        }
        return this.http.get<ServerResponse>(route);
    }

    show(id) {
        return this.http.get<ServerResponse>(this.getRoute() + '/' + id);
    }

    store(entity: Entity) {
        const me = this;
        const formData: FormData = new FormData();
        Object.keys(entity).forEach(function (value, index, array) {
            if (entity[value] !== null && entity[value] !== undefined) {
                me.append(entity, value, formData);
            }
        });
        return this.http.post<ServerResponse>(this.getRoute(), formData);
    }

    destroy(entity: Entity) {
        return this.http.delete<ServerResponse>(this.getRoute() + '/' + entity.id);
    }

    update(entity: Entity) {
        const me = this;
        entity['_method'] = 'PUT';
        const formData: FormData = new FormData();
        Object.keys(entity).forEach(function (value, index, array) {
            if (entity[value] !== null && entity[value] !== undefined) {
                me.append(entity, value, formData);
            }
        });
        return this.http.post<ServerResponse>(this.getRoute() + '/' + entity.id, formData);
    }

    private append(entity: Entity, value, formData: FormData) {
        if (entity[value] instanceof File || typeof entity[value] !== 'object') {
            formData.append(value, entity[value]);
        } else {
            formData.append(value, JSON.stringify(entity[value]));
        }
    }
}
