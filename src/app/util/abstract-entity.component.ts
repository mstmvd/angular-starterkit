import {Pagination} from './pagination';
import {DataTablesResponse} from './data-tables-response';
import {AbstractEntityService} from './abstract-entity.service';
import {AbstractEntity} from '../entity/abstract-entity';
import {OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Helper} from './helper';
import {Subject} from 'rxjs';
import {DynamicModalFormComponent} from './dynamic-form/dynamic-modal-form.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

export abstract class AbstractEntityComponent<Entity extends AbstractEntity> implements OnInit, OnDestroy {
    public dtOptions: DataTables.Settings = {};
    entities: Entity[] = [];
    dataTableResponse: DataTablesResponse<Entity> = null;
    http: HttpClient;
    public entityType: any;
    activeSelector: string;
    modalFormComponent = DynamicModalFormComponent;
    paginate = false;
    sub: any;
    dtTrigger: Subject<any> = new Subject();
    transSub: any;
    title: string;
    indexParams: {} = {};
    protected hideButtonNew = false;

    protected constructor(entityType: new () => Entity,
                          protected service: AbstractEntityService<Entity>,
                          http: HttpClient,
                          protected modalService: NgbModal,
                          private toasterService: ToasterService,
                          private activeRoute: ActivatedRoute,
                          private translate: TranslateService) {
        this.http = http;
        this.entityType = entityType;
        this.sub = this.activeRoute.params.subscribe(params => {
            this.service.routeParams = params;
        });
        this.paginate = this.service.paginate;
    }


    ngOnInit() {
        this.index(this.indexParams);
        const me = this;
        this.transSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            me.index(this.indexParams);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.transSub.unsubscribe();
    }

    index(params?) {
        const that = this;
        if (this.paginate) {
            this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: that.dataTableResponse != null ? that.dataTableResponse.data.per_page : Pagination.DEFAULT_PER_PAGE,
                serverSide: true,
                processing: true,
                ajax: (dataTablesParameters: any, callback) => {
                    const page = (dataTablesParameters.start) / dataTablesParameters.length + 1;
                    that.http
                        .get<DataTablesResponse<Entity>>(
                            that.service.getRoute() + '?page=' + page, {}
                        ).subscribe(resp => {
                        this.entities = Helper.convertToEntities(resp.data.data, this.entityType);
                        that.dataTableResponse = resp;
                        callback({
                            recordsTotal: resp.data.total,
                            recordsFiltered: resp.data.total,
                            data: []
                        });
                    });
                }
            };
        } else {
            this.service.index(params).subscribe((res) => {
                this.entities = Helper.convertToEntities(res.data, this.entityType);
            });
        }
    }

    destroy(entity: Entity) {
        if (confirm('are you sure?')) {
            const me = this;
            this.service.destroy(entity).subscribe((response) => {
                const fs = [];
                me.entities.forEach(function (e: Entity) {
                    if (e.id !== entity.id) {
                        fs.push(e);
                    }
                });
                me.entities = fs;
                Helper.showToast(me.toasterService, 'success', '', response.message);
            }, (error) => {
                Helper.showToast(me.toasterService, 'error', '', error.message);
            });
        }
    }

    update(entity: Entity) {
        const me = this;
        const activeModal = this.modalService.open(this.modalFormComponent, {size: 'lg'});
        this.translate.get('button.update').subscribe((res) => activeModal.componentInstance.modalHeader = res);
        activeModal.componentInstance.entity = entity;
        activeModal.result.then((result) => {
                if (!result) {
                    return;
                }
                const entityRes = new this.entityType();
                Object.keys(entityRes).forEach(value => entityRes[value] = entity[value]);
                result.forEach(control => {
                    entityRes[control.key] = control.value;
                });
                this.service.update(entityRes).subscribe((response) => {
                        Object.keys(entityRes).forEach(value => {
                            entity[value] = entityRes[value];
                        });
                        Helper.showToast(me.toasterService, 'success', '', response.message);
                    },
                    (error) => {
                        const errors = error.error.errors;
                        Object.keys(errors).forEach(function (v) {
                            let message = '<ul>';
                            errors[v].forEach(function (text) {
                                message += '<li>' + text + '</li>';
                            });
                            message += '</ul>';
                            Helper.showToast(me.toasterService, 'error', v, message);
                        });
                    });
            },
            (reson) => {
                // console.log(reson);
            });
    }

    store() {
        const me = this;
        const activeModal = this.modalService.open(this.modalFormComponent, {size: 'lg', container: this.activeSelector});
        this.translate.get('button.new').subscribe((res) => activeModal.componentInstance.modalHeader = res);
        activeModal.componentInstance.entity = new this.entityType();
        activeModal.result.then((result) => {
            if (!result) {
                return;
            }
            const entity = new this.entityType();
            result.forEach(control => {
                entity[control.key] = control.value;
            });
            this.service.store(entity).subscribe((response) => {
                    // this.entities.push(entity);
                    this.index();
                    Helper.showToast(me.toasterService, 'success', '', response.message);
                },
                (error) => {
                    const errors = error.error.errors;
                    Object.keys(errors).forEach(function (v) {
                        let message = '<ul>';
                        errors[v].forEach(function (text) {
                            message += '<li>' + text + '</li>';
                        });
                        message += '</ul>';
                        Helper.showToast(me.toasterService, 'error', v, message);
                    });
                });
        }, (reason) => {
            console.log(reason);
        });

    }

    doAction(event) {
        this[event.name](event.value);
    }

}
