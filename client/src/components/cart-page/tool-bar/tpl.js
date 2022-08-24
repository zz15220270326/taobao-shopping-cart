export default () => {

  return `
    <div class="left-content">
      <input class="checkall-btn J_CheckAll" type="checkbox" {{checkedAll}} />
      <span>{{checkedAllText}}</span>
    </div>
    <div class="right-content">
      <button class="J_PurchaseBtn btn btn-info btn-large">去结算</button>
    </div>
  `;
}