import '../css/index.scss';
import './common.js';

// import components
import Header from '@/components/common/header';
import BackTop from '@/components/common/back-top';
import ListItem from '@/components/index-page/list-item';
// import model
import IndexModel from '@/models/index';
// import utils
import { setLazyloadImg, throttle, debounce, transToString } from '@/utils/tools';

((doc) => {
	const oContainer = doc.getElementsByClassName('J_Container')[0],
				oHeader = Header({}),
				oBackTop = BackTop({
					slot: '回顶'
				}),
				oListItems = ListItem({});

  const indexModel = new IndexModel();

  const state = {
  	page: 1,
  	pageSize: 10,
  	total: 0,
  	list: [],
  };

	const init = async () => {
		setTimeout(() => {
			window.scroll(0, 0);
		}, 100);
		await render(oContainer);
		bindEvent();
	}

	async function render(el) {

		el.appendChild(oHeader.create('商品列表页'));
		el.appendChild(oBackTop.create());

		const { page, pageSize: page_size } = state,
		      result = await indexModel.getListData({ page, page_size }),
		      { data } = result,
					oListItemsEl = oListItems.create(data);
		el.appendChild(oListItemsEl);
		setState(result);
	}

	function setState({ data, page = 1, page_size: pageSize = 10, total = 0 }) {
		// console.log(data);

		Object.assign(state, {
			list: [
        ...state.list,
        ...data
			],
			page,
			pageSize,
			total
		});

		// console.log(state);
	}

	function bindEvent() {
		window.addEventListener('scroll', throttle(onListScroll), false);
		window.addEventListener('scroll', debounce(onListLoad), false);
		oContainer.addEventListener('click', debounce(onPageClick), false);
	}

	function onListScroll(ev) {
		/**
		 * 1. watch & lazyload imgs
		 * 2. pull-refresh
		 */
		const e = ev || window.event,
					tar = e.target || e.srcElement,
					oListItemsEl = doc.getElementsByClassName('oListWrapper')[0];

		setLazyloadImg(oListItemsEl, 'list-item');
	}

	function onListLoad() {
		const scrollHeight = doc.documentElement.scrollHeight,
					scrollTop = doc.documentElement.scrollTop,
					pageHeight = doc.documentElement.clientHeight;

		if (scrollTop + pageHeight + 30 >= scrollHeight) {
			updateListData();
		}
	}
	async function updateListData() {
		const { page, pageSize, total } = state;

		if (page * pageSize >= total) return;
		const params = {
			page: page + 1,
			pageSize,
		},
		      result = await indexModel.getListData(params),
		      { data } = result;

		oListItems.update(data);
		setState(result);
	}

	function onPageClick(ev) {
		const e = ev || window.event,
					tar = e.target || e.srcElement,
					className = tar.className;

		if (className.includes('list-item')) {
			onListItemClick(tar);
		}
	}

	function onListItemClick(el) {
		const oListItem = findTargetElement(el, 'list-item'),
					dataIndex = oListItem.dataset.index,
					oDataItem = state.list.find(item => String(item['a_data-index']) === dataIndex);

    if (oDataItem) {
    	const { title, img_src, a_href } = oDataItem,
    				search = encodeURI(transToString({
			    		dataIndex,
							title,
							img_src,
							a_href
			    	}));
			location.href = `/detail.html?${ search }`;
    }
	}

	function findTargetElement(origin, className) {
		if (origin.className === className) {
			return origin;
		}

		let el = origin.parentNode;

		while (el.className !== className && el.parentNode) {
			el = el.parentNode;
		}

		return el;
	}

	init();
})(document);
