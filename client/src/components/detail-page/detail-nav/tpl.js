export default () => {

	return `
	  <div class="info upper-info">
	    <h3 class="discount-name">{{discountName}}</h3>
	    <div class="price-info">
        <h2 class="price current">
          {{price}}
          <span class="pre-info">
            价格<label class="price pre">{{prePrice}}</label>起
          </span>
        </h2>
	    </div>
	    <div class="coupon-info">
	      <p class="coupon">
          {{coupon}}
	      </p>
	      <span class="take-coupon">
	        领劵
					<i class="icon fa fa-arrow-right">
						👉
					</i>
	      </span>
	    </div>
	  </div>
	  <div class="info lower-info">
	    <h3>{{title}}</h3>
	  </div>
	`;
}