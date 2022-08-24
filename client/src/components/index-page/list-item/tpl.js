export default () => {

  const lazyloadImg = require('@/img/lazyload-img.gif');

	return `
    <div class="list-item" data-index="{{dataIndex}}">
      <a class="item-lk list-item-lk" link="{{link}}" href="javascript:;">
        <img
          src="${ lazyloadImg.default }"
          data-src="{{src}}"
          alt=""
          title="{{title}}"
          class="lk-img list-item-img"
         />
      </a>
      <h3 class="lk-title list-item-title">{{title}}</h3>
    </div>
	`;
}
