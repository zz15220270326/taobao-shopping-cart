import HTTP from '@/utils/http';
import { INDEX_APIS } from '@/utils/configs';

const { GET_LIST_DATA } = INDEX_APIS;

export default class IndexModel extends HTTP {

  /**
   * 获取列表数据
   */
	async getListData(params = {}) {
		const res = await this.ajax({
			params,
			method: 'GET',
			url: GET_LIST_DATA,
		});

		console.log(res);

		return res;
	}

}
