export interface IBaseRepository<T> {
    get(id: any): Promise<T>;
    getAll(): Promise<T[]>;
    create(id: any, item: T): T;
    update(id: any, item: T): T;
    delete(id: any): T;
}