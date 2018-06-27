import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityService} from '../util/abstract-entity.service';
import {User} from '../entity/user';
import {of as observableOf} from 'rxjs/observable/of';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractEntityService<User> {

    route = '/api/user';

    user: User;

    constructor(http: HttpClient) {
        super(http);
    }

    getRole() {
        return observableOf(this.user.activeRole ? this.user.activeRole : 'guest');
    }
}
