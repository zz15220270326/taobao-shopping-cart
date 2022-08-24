export default () => {

	return `
		<div class="content left-content">
      {{slotLeft}}
		</div>
		<div class="content right-content">
       {{slotRight}}
       <button class="btn btn-large btn-round btn-primary into-cart">
         进入购物车
       </button>
       <button
        {{ableCarted}}
        class="btn btn-large btn-info btn-round add-to-cart {{ableCarted}}"
       >
         加入购物车
       </button>
       <button class="btn btn-large btn-warn btn-round to-purchase">
         点击购买
       </button>
		</div>
	`;
}