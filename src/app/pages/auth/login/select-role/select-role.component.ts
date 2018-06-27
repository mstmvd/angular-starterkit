import {Component, EventEmitter, Output} from '@angular/core';
import {Role} from '../../../../entity/role';
import {UserService} from '../../../../common/user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-select-role',
    template: `
        <form [formGroup]="form">
            <div class="form-group row">
                <label for="" class="col-sm-3 form-control-label">role</label>
                <div class="col-sm-9">
                    <select id="role" name="role" class="form-control" (change)="roleChange($event)"
                            ([ngModel])="this.userService.user.activeRole">
                        <option [ngValue]="null">select role</option>
                        <option *ngFor="let r of this.roles" [value]="r.name">{{r.display_name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-control row">
                <button class="btn btn-success" [disabled]="this.userService.user.activeRole == null" (click)="selectRole()">login</button>
            </div>
        </form>
    `
})
export class SelectRoleComponent {
    roles: Role[] = [];
    form: FormGroup = new FormGroup({
        role: new FormControl()
    });

    @Output()
    roleChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(protected userService: UserService) {
        this.roles = userService.user ? this.userService.user.roles : [];
    }

    roleChange($event) {
        if (this.userService.user) {
            this.userService.user.activeRole = $event.target.value;
        }
    }

    selectRole() {
        localStorage.setItem('active_role', this.userService.user.activeRole);
        this.roleChanged.emit(this.userService.user.activeRole);
    }
}
