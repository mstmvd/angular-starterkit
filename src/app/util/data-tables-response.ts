import {Pagination} from './pagination';

export class DataTablesResponse<T> {
    data: Pagination<T>;
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}
