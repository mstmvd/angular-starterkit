import {Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractEntity} from '../entity/abstract-entity';

export class AbstractModalComponent<Entity extends AbstractEntity> {

    modalHeader: string;
    @Input()
    entity: Entity;

    constructor(entityType: new () => Entity, private activeModal: NgbActiveModal) {
        this.entity = new entityType();
    }

    closeModal() {
        this.activeModal.dismiss('close button');
    }

    submit() {
        this.activeModal.close(this.entity);
    }
}
