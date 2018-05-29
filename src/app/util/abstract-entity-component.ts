import {Pagination} from './pagination';
import {DataTablesResponse} from './data-tables-response';
import {AbstractEntityService} from './abstract-entity-service';
import {AbstractEntity} from '../entity/abstract-entity';
import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {Helper} from './helper';
import {Subject} from 'rxjs';
import {AbstractModalComponent} from './abstract-modal-component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {DataTableDirective} from 'angular-datatables';
import {Const} from './const';
import {Sample} from '../entity/sample';
import {SampleModalComponent} from '../dashboard/sample/sample.modal.component';
import {SubSample} from '../entity/sub-sample';
import {SubSampleModalComponent} from '../dashboard/sample/sub-sample/sub-sample.modal.component';

export abstract class AbstractEntityComponent<Entity extends AbstractEntity> implements OnInit, OnDestroy {
    @ViewChild(AbstractModalComponent)

    public dtOptions: DataTables.Settings = {};
    entities: Entity[] = [];
    dataTableResponse: DataTablesResponse<Entity> = null;
    service: AbstractEntityService<Entity>;
    http: HttpClient;
    entityType: any;
    activeSelector: string;
    modalComponent;
    paginate = false;
    sub: any;
    dtTrigger: Subject<any> = new Subject();
    transSub: any;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    protected constructor(entityType: new () => Entity,
                          service: AbstractEntityService<Entity>,
                          http: HttpClient,
                          protected modalService: NgbModal,
                          private toasterService: ToasterService,
                          private activeRoute: ActivatedRoute,
                          private translate: TranslateService) {
        this.service = service;
        this.http = http;
        this.entityType = entityType;
        this.sub = this.activeRoute.params.subscribe(params => {
            this.service.routeParams = params;
        });
        this.paginate = this.service.paginate;
    }

    dtRender(): void {
        if (this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.dtTrigger.next();
        }
    }

    ngOnInit() {
        switch (this.entityType) {
            case Sample:
                this.modalComponent = SampleModalComponent;
                break;
            case SubSample:
                this.modalComponent = SubSampleModalComponent;
                break;
        }
        this.index();
        const me = this;
        this.transSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            me.index();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.transSub.unsubscribe();
    }

    index() {
        this.dtOptions = {
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/' + Const.dtLangFile[this.translate.currentLang] + '.json'
            }
        };
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
            this.service.index().subscribe((res) => {
                this.entities = Helper.convertToEntities(res.data, this.entityType);
                this.dtOptions = {
                    pagingType: 'full_numbers',
                    pageLength: Pagination.DEFAULT_PER_PAGE
                };
                this.dtRender();
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
        const activeModal = this.modalService.open(this.modalComponent, {size: 'lg'});
        activeModal.componentInstance.modalHeader = 'Edit Modal';
        activeModal.componentInstance.entity = entity;
        activeModal.result.then((result) => {
                this.service.update(result).subscribe((response) => {
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
        const activeModal = this.modalService.open(this.modalComponent, {size: 'lg', container: this.activeSelector});
        activeModal.componentInstance.modalHeader = 'Store Modal';
        activeModal.result.then((result) => {
            if (!result) {
                return;
            }
            this.service.store(result).subscribe((response) => {
                    this.entities.push(result);
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

}
