import './index.scss';
import getTpl from './tpl';

import { replaceTpl, getElChildren, debounce } from '@/utils/tools';

export default (props = {}) => {

	let oBackTop;

	const	{
		slot = '',
		onBacktop = (el) => {},
		showHeight = 300,
		duration = 1500,
		width,
		height,
	} = props;

  function bindEvent() {
  	if (!oBackTop) {
  		return;
  	}
  	window.addEventListener('scroll', debounce(onPageScroll), false);
  	oBackTop.addEventListener('click', debounce(setBackTop), false);
  }

  function onPageScroll() {
  	const scrollTop = document.documentElement.scrollTop;

  	if (scrollTop >= showHeight) {
  		oBackTop.classList.add('active');
  	} else {
  		oBackTop.classList.remove('active');
  	}
  }

  function setBackTop() {
  	let timer = null;

  	const scrollTop = document.documentElement.scrollTop,
  				speed = (scrollTop / duration) * 10;

  	timer = setInterval(() => {
  		const scrollTop = document.documentElement.scrollTop;
  		if (scrollTop <= 0) {
  			clearInterval(timer);
  			timer = null;
  			onBacktop(oBackTop);
  		} else {
  			document.documentElement.scrollTop -= speed;
  		}
  	}, 1);
  }

	return {
		name: 'BackTop',
		create() {
			const oWrap = document.createElement('div');
			oWrap.innerHTML = replaceTpl(getTpl(), props);

			oBackTop = getElChildren(oWrap)[0];

			if (width) {
				oBackTop.style.width = width + 'px';
			}
			if (height) {
				oBackTop.style.height = height + 'px';
			}

			setTimeout(() => {
				bindEvent();
			}, 100);
			return oBackTop;
		},
	};
}
