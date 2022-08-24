import './index.scss';
import getTpl from './tpl';

import { replaceTpl } from '@/utils/tools';

export default (props = {}) => {

	return {
		name: 'DetailImg',
		create(options = {}) { // { src, title, dataId }
			const oContainer = document.createElement('div');
			oContainer.className = 'detail-img-wrap J_DetailImgWrap';
			oContainer.innerHTML = replaceTpl(
				getTpl(),
				options
			);
			return oContainer;
		}
	};
}
