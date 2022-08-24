export default () => (
  `
    <div class="cart-item J_CartItem">
      <input
        data-index="{{dataIndex}}"
        class="item-check {{checked}}"
        type="checkbox"
        {{checked}}
      />
      <div class="img-container">
        <img src="{{img_src}}" alt="{{title}}" />
      </div>
      <div class="main-info">
        <h3 class="main-title">{{title}}</h3>
        <p class="main-contnet">
          {{content}}
          <span class="price-info">{{price}}</span>
        </p>
      </div>
    </div>
  `
);