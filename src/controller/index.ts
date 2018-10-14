import Base from './base';

export default class extends Base {
    async indexAction() {
        await this.session('username', 'anan');
        await this.session('usergroup', '222');

        const username = await this.session('username');
        const usergroup = await this.session('usergroup');

        return this.json(1, username, usergroup);
    }
}
