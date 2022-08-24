import './index.scss';
import getTpl from './tpl';
import { replaceTpl } from '@/utils/tools';

export default (props) => {

	const tpl = getTpl();

	return {
		name: 'Header',
		create(title) {
			const oHeader = document.createElement('div');
			oHeader.className = 'header J_Header';
			oHeader.innerHTML = replaceTpl(tpl, { title });
			return oHeader;
		}
	};
}