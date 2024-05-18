export interface IBaseRepository<T> {
    get(id: any): T;
    getAll(): T[];
    create(id: any, item: T): T;
    update(id: any, item: T): T;
    delete(id: any): T;
}