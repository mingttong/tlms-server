/* tslint:disable */
declare namespace ThinkModel {

    interface Model {
        new(modelName?: string, config?: object): Model;
        /**
         * get or set db
         */
        db(db?: any): any;
        /**
         * get or set all store models
         */
        models: object;
        /**
         * get table prefix
         */
        readonly tablePrefix: string;
        /**
         * get table name, with table prefix
         */
        readonly tableName: string;
        /**
         * get primary key
         */
        readonly pk: string;
        /**
         * get last sql
         */
        readonly lastSql: string;
        /**
         * get model instance
         */
        model(name: string): Model;
        /**
         * set cache options
         */
        cache(key?: string, config?: object): Model;
        /**
         * set limit options
         */
        limit(offset?: Array<string | number> | number | string, length?: number | string): Model;
        /**
         * set page options
         */
        page(page?: Array<string | number> | number | string, listRows?: string | number): Model;
        /**
         * set where options
         * @return {} []
         */
        where(where?: string | object): Model;
        /**
         * set field options
         */
        field(field?: string, reverse?: boolean): Model;
        /**
         * set field reverse
         */
        fieldReverse(field?: string): Model;
        /**
         * set table name
         */
        table(table?: string, hasPrefix?: boolean): Model;
        /**
         * union options
         */
        union(union?: string, all?: boolean): Model;
        /**
         * join
         */
        join(join?: string | Array<string> | object): Model;
        /**
         * set order options
         */
        order(value: string): Model;
        /**
         * set table alias
         */
        alias(value: string): Model;
        /**
         * set having options
         */
        having(value: string): Model;
        /**
         * set group options
         */
        group(value: string): Model;
        /**
         * set lock options
         */
        lock(value: string): Model;
        /**
         * set auto options
         */
        auto(value: string): Model;
        /**
         * set distinct options
         */
        distinct(data: any): Model;
        /**
         * set explain
         */
        explain(explain: string): Model;

        /**
         * parse options, reset this.options to {}
         * @param {Object} options
         */
        parseOptions(options: any): Promise<any>;
        /**
         * add data
         */
        add(data: object, options?: object, replace?: boolean): Promise<string>;

        /**
         * add data when not exist
         * @return {}            []
         */
        thenAdd(data: object, where?: object | string): Promise<object>;

        /**
         * update data when exist, otherwise add data
         * @return {id}
         */
        thenUpdate(data: object, where?: object | string): Promise<object>;

        /**
         * add multi data
         */
        addMany(data: Array<object>, options?: object, replace?: boolean): Promise<Array<string>>;

        /**
         * delete data
         */
        delete(options?: object): Promise<number>;

        /**
         * update data
         */
        update(data: object, options?: object): Promise<number>;

        /**
         * update all data
         */
        updateMany(dataList: Array<object>, options?: object): Promise<any>;
        /**
         * find data
         */
        find(options?: object): Promise<any>;
        /**
         * select
         */
        select(options?: object): Promise<any>;
        /**
         * select add
         */
        selectAdd(options?: object): Promise<any>;
        /**
         * count select
         */
        countSelect(options?: object, pageFlag?: boolean): Promise<object>;
        /**
         * get field data
         * if num is ture mean get one value
         */
        getField(field: string, num?: boolean | number): Promise<object>;
        /**
         * increment field data
         */
        increment(field: string, step?: number): Promise<any>;

        /**
         * decrement field data
         * @return {} []
         */
        decrement(field: string, step?: number): Promise<any>;

        /**
         * get count
         */
        count(field: string): Promise<number>;
        /**
         * get sum
         */
        sum(field: string): Promise<number>;
        /**
         * get min value
         */
        min(field: string): Promise<number>;
        /**
         * get max valud
         */
        max(field: string): Promise<number>;
        /**
         * get value average
         */
        avg(field: string): Promise<number>;
        /**
         * query
         */
        query(sqlOptions: object): Promise<any>;
        /**
         * execute sql
         */
        execute(sqlOptions: object): Promise<any>;
        /**
         * parse sql
         */
        parseSql(sqlOptions: object, ...args: Array<any>): object;

        /**
         * false means disable all, true means enable all
         */
        setRelation(value: boolean): Model;
        /**
         * set relation
         */
        setRelation(name: string, value?: boolean): Model;
        /**
         * start transaction
         */
        startTrans(): Promise<any>;
        /**
         * commit transcation
         */
        commit(): Promise<any>;
        /**
         * rollback transaction
         */
        rollback(): Promise<any>;
        /**
         * transaction exec functions
         * @param  {Function} fn [async exec function]
         */
        transaction(fn: () => Promise<any>): Promise<any>;

        /**
         * add by z
         */
        /**
         * find by id
         */
        findById(id: number): Promise<any>;

        findOneByParam(condition: string | object, field: string): Promise<any>;

        findByParam(condition: string | object, order: string): Promise<any>;

        /**
         * add new row
         */
        insert(data: object): Promise<any>;

        /**
         * @desc add rows
         * @author zhouwunan
         * @param {Array<any>} datas
         * @param {object} condition
         * @returns {Promise<any>}
         * @memberof Model
         */
        insertMany(datas: Array<any>, condition?: object): Promise<any>;

        /**
         * add row by condition
         */
        thenInsert(data: any | Array<any>, condition: string | object): Promise<any>;

        /**
         * update rows
         */
        updateRows(data: object, condition?: string | object): Promise<any>;

        /**
         * getList by condition
         * max size 100
         * default size 100
         */
        getList(condition?: string | object, size?: number): Promise<any>;

        /**
         * getPageList by condition
         * default page 1
         * default size 10
         */
        getPageList(config: any): Promise<any>;

        /**
         * delete by id
         */
        delById(id: number): Promise<any>;

        /**
         * delete rows by condition
         */
        delRows(condition: string | object): Promise<any>;

        /**
         * count by condition
         */
        total(condition?: string | object, field?: string): Promise<any>;
    }

    interface ModelThinkExtend {
        Model: Model;
    }

    interface ModelExtend {
        model(name: string, config?: any, module?: string): ThinkModel.Model;
    }

}

declare module 'thinkjs' {
    interface Think extends ThinkModel.ModelExtend, ThinkModel.ModelThinkExtend { }
    interface Controller extends ThinkModel.ModelExtend { }
    interface Context extends ThinkModel.ModelExtend { }
    interface Service extends ThinkModel.ModelExtend { }
}

export = ThinkModel;
