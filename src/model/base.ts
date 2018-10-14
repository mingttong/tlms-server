import { think } from 'thinkjs';

const maxSize = 100;

export default class extends think.Model {
    constructor(...args: Array<any>) {
        super(...args);
    }

    /**
     * add by z
     */
    /**
     * find by id
     */
    async findById(id: number): Promise<any> {
        const data = await this.where({ id }).find();
        return think.isEmpty(data) ? null : data;
    }

    findOneByParam(condition: string | object, field: string): Promise<any> {
        return  this.where(condition).field(field).find();
    }

    async findByParam(condition: string | object, order: string = 'id desc'): Promise<any> {
        return  this.where(condition).order(order).select();
    }

    /**
     * add new row
     */
    insert(data: any): Promise<any> {
        return this.add(data);
    }

    insertMany(datas: Array<any>, condition?: object): Promise<any> {
        return Promise.all(datas.map((data) => this.insert(Object.assign(data, condition))));
    }

    /**
     * add row by condition: string | object
     */
    thenInsert(data: any, condition: string | object): Promise<any> {
        return this.thenAdd(data, condition);
    }

    /**
     * update rows
     * @desc condition填写更新的条件
     */
    updateRows(data: any | Array<any>, condition?: string | object): Promise<any> {
        if (Array.isArray(data)) {
            return this.where(condition).updateMany(data);
        } else {
            return this.where(condition).update(data);
        }
    }

    /**
     * getList by condition: string | object
     * max size 100
     * default size 100
     */
    getList(condition: string | object, size = 100, order: string = 'id desc'): Promise<any> {
        size = size > maxSize ? maxSize : size;
        return this.where(condition).order(order).limit(size).select();
    }

    /**
     * getPageList by condition: string | object
     * default page 1
     * default size 10
     */
    getPageList(config: any): Promise<any> {
        const {
            condition,
            page = 1,
            order = 'id desc',
            field,
        } = config;
        let { size } = config;
        size = size > maxSize ? maxSize : size;
        return this.where(condition).field(field).order(order).page(page, size).countSelect();
    }

    /**
     * delete by id
     */
    delById(id: number): Promise<any> {
        return this.delete({ id });
    }

    /**
     * delete rows by condition: string | object
     */
    delRows(condition: string | object): Promise<any> {
        return this.where(condition).delete();
    }

    /**
     * count by condition: string | object
     */
    total(condition: string | object, field: string = '*'): Promise<any> {
        return this.where(condition).count(field);
    }
}