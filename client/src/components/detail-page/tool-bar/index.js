import './index.scss';
import getTpl from './tpl';

import {
	replaceTpl,
	storageManage
} from '@/utils/tools';
import { STORAGE_CART_KEY } from '@/utils/configs';
import Toast from '@/components/common/toast';

export default (props = {}) => {
	const tpl = getTpl();

	const [getStorageCart, setStorageCart] = storageManage(STORAGE_CART_KEY),
				{ searchParams = {} } = props,
				cartData = getStorageCart(),
				{ dataIndex } = searchParams,
				hasCrtData = cartData.some(item => item.dataIndex == dataIndex);

  function bindEvent(el) {
		el.addEventListener('click', onBtnClick, false);
	}

	function onBtnClick(ev) {
		const e = ev || window.Event,
		      tar = e.target || e.srcElement;
		
		if (tar.className.includes('add-to-cart')) {
			updateCartData();
			updateCartView(tar);
			return;
		}
		if (tar.className.includes('into-cart')) {
			location.href = './cart.html';
		}
	}

	function updateCartData() {
		if (!cartData?.length) {
			setStorageCart([]);
		}
		if (!hasCrtData) {
			cartData.push({
				...searchParams,
				count: 1,
			});
			setStorageCart(cartData);
			Toast({
				message: '添加成功!',
				type: 'success',
				duration: 2000,
			});
		}
	}

	function updateCartView(el) {
		if (!el.className.includes('add-to-cart')) {
			return;
		}
		el.classList.add('disabled');
	}

	return {
		name: 'ToolBar',
		create(opts = {}) {
			const oContainer = document.createElement('div');
			oContainer.className = 'tool-bar J_ToolBar';
			console.log(hasCrtData);
			oContainer.innerHTML = replaceTpl(tpl, {
				...opts,
				ableCarted: hasCrtData ? 'disabled' : '',
			});

			setTimeout(() => {
				bindEvent(oContainer);
			}, 200);
			return oContainer;
		}
	};
}