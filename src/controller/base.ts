import { think } from 'thinkjs';
import * as _ from 'lodash';
import { Model } from '../extend/model';

export default class extends think.Controller {
    /**
     * 返回json格式
     * @param status
     *      0: 未登录
     *      1: 成功
     *      else: 失败
     * @param msg
     * @param data
     */
    json(status: number, msg: string = '', data: any = null) {
        super.json({status, msg, data});
    }

    jsonp(status: number, msg: string = '', data: any = null) {
        super.jsonp({status, msg, data});
    }

    params(name?: string, value?: any): any {
        return Object.assign({}, super.query(), super.post());
    }

    async detailAction() {
        try {
            const { id } = this.params();
            if (id) {
                const modelName: string = this.getCurrentModel();

                const detail = await this.model(modelName).findById(id);
                return this.json(1, '', detail);
            }
        } catch (e) {

        }

        return this.json(2, '查询失败');
    }

    async listAction() {
        try {
            const { page, pageSize } = this.params();
            const modelName: string = this.getCurrentModel();
            const { fields } = require(`../model/${modelName}`);
            const condition: object = _.pick(this.params(), fields);

            // 选择is_deleted: 0的数据
            const list: any[] = await this.model(modelName).getPageList({
                condition: { ...condition, is_deleted: 0 },
                page,
                pageSize,
            });
            return this.json(1, '', list);
        } catch (e) {
            console.log(e);
        }

        return this.json(2, '查询失败');
    }

    async saveAction() {
        let errMsg = '保存失败';
        try {
            let { id } = this.params();
            id = +id;

            const modelName: string = this.getCurrentModel();

            const { fields } = require(`../model/${modelName}`);
            const data: object = _.pick(this.params(), fields);

            const model: Model = this.model(modelName);
            if (id) {
                const res: number = await model.updateRows(data, { id });
                if (res === 0) {
                    return this.json(2, '保存失败,数据不存在');
                }
            } else {
                await model.insert(data);
            }

            return this.json(1, '保存成功');
        } catch (err) {
            errMsg = err.message;
        }

        return this.json(2, errMsg);
    }

    async infoAction() {
        let errMsg = '';

        try {
            const { id } = this.params();

            if (!id) {
                return this.json(2, '未指定id');
            }
            const modelName: string = this.getCurrentModel();
            const data = await this.model(modelName).findById(id);

            if (!data) {
                throw new Error(`获取${modelName}失败`);
            }

            if (modelName === 'database') {
                delete data.password;
            }

            return this.json(1, '', data);
        } catch (err) {
            errMsg = err.message;
            console.log(err);
        }

        return this.json(2, errMsg);
    }

    /**
     * @description 删除接口，每个删除动作都会从这里进入并分发，此处会记录用户操作
     * 还是操作记录应该加载前面几层处理？？？
     */
    async deleteAction() {
        let errMsg = '删除失败';
        try {
            let { id } = this.params();

            const modelName: string = this.getCurrentModel();

            // 不真的删除，而是将is_deleted标记为1
            const res: number = await this.model(modelName).delById(id);
            if (res === 0) {
                return this.json(2, '删除失败，数据不存在');
            }

            return this.json(1, '删除成功');
        } catch (err) {
            errMsg = err.message;
        }

        return this.json(2, errMsg);
    }

    getCurrentModel(): string {
        const pathItem = this.ctx.path.split('/');
        return pathItem[pathItem.length - 2];
    }

    __before() {
        this.header("Access-Control-Allow-Origin", "*");
        this.header("Access-Control-Allow-Methods", "GET,POST");
        this.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
    }

    __call() {
        console.log(this.ctx.path);
        this.json(404, '方法不存在');
    }
}
