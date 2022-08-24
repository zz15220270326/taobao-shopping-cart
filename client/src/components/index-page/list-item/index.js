import './index.scss';
import getTpl from './tpl.js';
import { replaceTpl, setLazyloadImg } from '@/utils/tools';

export default (props = {}) => {

	const className = 'list-wrapper oListWrapper';

	function getDataTpl(data) {
		return data.reduce((totalTpl, listItem) => {
			const {
				a_href: link,
				img_src: src,
				title,
			} = listItem,
				dataIndex = listItem['a_data-index'];

			const itemTpl = replaceTpl(
				getTpl({ link, src, title, dataIndex }),
				{ link, src, title, dataIndex }
			);

			totalTpl += itemTpl + '\n';

      return totalTpl;
		}, '');
	}

	return {
		name: 'ListItem',
		create(data) {
			var oListWrapper = document.createElement('div');
			oListWrapper.className = className;

			if (!Array.isArray(data)) {
				return oListWrapper;
			}
			const inner = getDataTpl(data);
			oListWrapper.innerHTML = inner;

			setTimeout(() => {
				setLazyloadImg(oListWrapper, 'list-item');
			}, 200);

			return oListWrapper;
		},
		update(data) {
			const oListWrapper = document.getElementsByClassName(className)[0];

			if (!oListWrapper) {
				throw new Error('list-wrapper is not existed now');
			}
			const inner = getDataTpl(data);
			oListWrapper.innerHTML += inner;
		},
	};
}