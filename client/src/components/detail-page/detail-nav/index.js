import './index.scss';
import getTpl from './tpl';

import { replaceTpl } from '@/utils/tools';

export default (props = {}) => {
  return {
  	name: 'DetailNav',
  	create(opts = {}) {
  		const oContainer = document.createElement('div');
  		oContainer.className = 'detail-nav J_DetailNav';
  		oContainer.innerHTML = replaceTpl(
        getTpl(),
        Object.assign({}, props, opts)
  		);
  		return oContainer;
  	}
  };
}
