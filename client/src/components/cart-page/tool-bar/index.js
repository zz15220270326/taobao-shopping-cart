import './index.scss';
import getTpl from './tpl';

import { replaceTpl } from '@/utils/tools';
import Toast from '@/components/common/toast';

export default (props = {}) => {
  const state = {
    cartData: [...props.cartData],
    oContainer: null,
  };

  function bindEvent(el) {
    const oCheckedAll = el.getElementsByClassName('J_CheckAll')[0],
          oPurchaseBtn = el.getElementsByClassName('J_PurchaseBtn')[0];

    oCheckedAll.addEventListener('click', onCheckAllBtnClick, false);
    // TODO
    oPurchaseBtn.addEventListener('click', () => {
      Toast({
        message: '开发者很懒, 还没有动手,\n敬请期待...',
        type: 'warning',
        duration: 2500,
        forbidClick: true,
      });
    }, false);
    // instance.checkedAllData(oCheckedAll.checked);
  }

  function onCheckAllBtnClick(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          oText = tar.parentNode.getElementsByTagName('span')[0],
          { onCheckedAll = () => {} } = props,
          isCheckedAll = !!tar.checked;

    oText.textContent = isCheckedAll ? '取消全选' : '点击全选';
    Toast({
      message: isCheckedAll ? '已全选' : '已取消',
      type: isCheckedAll ? 'success' : 'error',
      duration: 1500,
      forbidClick: true,
    });
    instance.checkedAllData(isCheckedAll);
    onCheckedAll(isCheckedAll);
  }

  const instance = {
    name: 'CartToolBar',
    create() {
      const oContainer = document.createElement('div');
      oContainer.className = 'tool-bar J_ToolBar';
      
      const isCheckedAll = state.cartData.every(item => !!item.checked),
            checkedAll = isCheckedAll ? 'checked' : '',
            checkedAllText = isCheckedAll ? '取消全选' : '点击全选',
            innerHTML = replaceTpl(getTpl(), { checkedAll, checkedAllText });

      oContainer.innerHTML = innerHTML;

      state.oContainer = oContainer;

      setTimeout(() => {
        bindEvent(oContainer);
      }, 300);

      return oContainer;
    },
    checkedAllData(isCheckedAll) {
      state.cartData.forEach(item => {
        item.checked = isCheckedAll;
      });
    }
  };

  return instance;
}
