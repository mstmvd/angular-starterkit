import {Component, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractModalComponent} from '../../../util/abstract-modal-component';
import {SubSample} from '../../../entity/sub-sample';

@Component({
    selector: 'app-sample-modal',
    template: `
        <div class="modal-header">
            <span>{{ modalHeader }}</span>
            <button class="close" aria-label="Close" (click)="closeModal()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <ng-container *ngIf="entity">
                <form class="form-horizontal">
                    <div class="form-group row">
                        <label for="title" class="col-sm-3 form-control-label">title</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="title" name="title" placeholder="title" [(ngModel)]="entity.title">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-sm-3 form-control-label">description</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="description" name="description" placeholder="description"
                                   [(ngModel)]="entity.description">
                        </div>
                    </div>
                </form>
            </ng-container>
        </div>
        <div class="modal-footer">
            <button class="btn btn-md btn-primary" (click)="submit()">Save changes</button>
        </div>
    `,
})
@Output()

export class SubSampleModalComponent extends AbstractModalComponent<SubSample> {
    constructor(activeModal: NgbActiveModal) {
        super(SubSample, activeModal);
    }
}
