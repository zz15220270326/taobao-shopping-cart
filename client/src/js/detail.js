import '../css/detail.scss';
import './common.js';

// import components
import Header from '@/components/common/header';
import BackIcon from '@/components/common/back-icon';

import DetailImg from '@/components/detail-page/detail-img';
import DetailNav from '@/components/detail-page/detail-nav';
import ToolBar from '@/components/detail-page/tool-bar';
// import model
// import tools
import { getSearchParams, degitNum } from '@/utils/tools';

;((doc) => {
	const searchParams = getSearchParams(location.search),
  
        oContainer = doc.getElementsByClassName('J_Container')[0],
	      oHeader = Header({}),
        oBackIcon = BackIcon({}),
	      oDetailImg = DetailImg({}),
        oDetailNav = DetailNav({}),
        oToolBar = ToolBar({ searchParams });

  const init = () => {
  	const searchParamsLen = Object.keys(searchParams).length;
  	// console.log(oToolBar, searchParams);
  	if (!searchParamsLen) {
  		location.href = './';
  		return;
  	}

    render(oContainer, searchParams);

    // Toast.success('success Toast');
    // Toast.info('info Toast');
    // Toast.error('error Toast');
  }

  function render(el, searchParams) {
  	const { title, img_src: src } = searchParams;
    const oDetailNavEl = oDetailNav.create({
      ...searchParams,
      price: degitNum(searchParams.price || 0),
      prePrice: degitNum(searchParams.prePrice || 0),
    });
    const oFrag = doc.createDocumentFragment();

  	oFrag.appendChild(oHeader.create('商品详情'));
  	oFrag.appendChild(oBackIcon.create());
    oFrag.appendChild(oDetailImg.create({ title, src }));
    oFrag.appendChild(oDetailNavEl);
    oFrag.insertBefore(doc.createElement('br'), oDetailNavEl);

    oFrag.appendChild(oToolBar.create());

    el.appendChild(oFrag);
  }

  init();
})(document);