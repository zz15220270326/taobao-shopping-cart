import './index.scss';
import getTpl from './tpl';

import { replaceTpl, deepClone } from '@/utils/tools';

function deepProxy(origin, updateCb) {
  const target = new Proxy(origin, {
    get(tar, k) {
      if (typeof tar[k] === 'object' && tar[k] !== null) {
        return deepProxy(tar[k], updateCb);
      }
      return tar[k];
    },
    set(tar, k, v) {
      const oldCheckItem = deepClone(tar);
      tar[k] = v;
      const newCheckItem = tar;
      typeof updateCb === 'function' && updateCb(newCheckItem, oldCheckItem);
      return true;
    }
  });

  return target;
}

export default (props = {}) => {
  let oContainer = document.createElement('div');
  oContainer.className = 'cart-list J_CartList';
  
  const _cartData = props.cartData;
  const cartData = deepProxy(_cartData, props.onItemCheckedChange);
  const oListItemTpl = getTpl();

  function bindEvent(el) {
    // const oCheckItem = el.getElementsByClassName('item-check')[0];
    
    // oCheckItem.addEventListener('change', onItemChecked, false);
    el.addEventListener('click', onListClick, false);
  }

  function onListClick(ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement;

    if (tar.className.includes('item-check')) {
      onItemChecked(tar);
      return;
    }
  }

  function onItemChecked(el) {
    const dataIndex = el.getAttribute('data-index');

    cartData.find(item => {
      if (item.dataIndex == dataIndex) {
        item.checked = el.checked;
        return true;
      }
    });
    // console.log(cartData);
  }

  return {
    name: 'CartItem',
    create() {
      const totalTpl = cartData.map((item, index) => {
        return replaceTpl(oListItemTpl, {
          ...item,
          index,
          checked: !!item.checked ? 'checked' : '',
          content: item.content || 'content content content content content content',
          price: item.proce || '0.00',
        });
      }).join('\n');

      // console.log(totalTpl);

      oContainer.innerHTML = totalTpl;

      setTimeout(() => {
        bindEvent(oContainer);
      }, 300);

      return oContainer;
    }
  };
}
