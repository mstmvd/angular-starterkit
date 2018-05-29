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

    index() {
        const route = this.getRoute() + (this.paginate ? '?paginate' : '');
        return this.http.get<ServerResponse>(route);
    }

    store(entity: Entity) {
        return this.http.post<ServerResponse>(this.getRoute(), entity);
    }

    destroy(entity: Entity) {
        return this.http.delete<ServerResponse>(this.getRoute() + '/' + entity.id);
    }

    update(entity: Entity) {
        entity['_method'] = 'PUT';
        return this.http.post<ServerResponse>(this.getRoute() + '/' + entity.id, entity);
    }
}
