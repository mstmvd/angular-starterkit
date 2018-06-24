import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityService} from '../util/abstract-entity.service';
import {User} from '../entity/user';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractEntityService<User> {

    route = '/api/user';

    constructor(http: HttpClient) {
        super(http);
    }
}
