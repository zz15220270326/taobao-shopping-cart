import '../css/cart.scss';
import './common.js';

// import components
import Header from '@/components/common/header';
import BackIcon from '@/components/common/back-icon';

import CartList from '@/components/cart-page/cart-list';
import ToolBar from '@/components/cart-page/tool-bar';

// import utils
import {
	replaceTpl,
	storageManage
} from '@/utils/tools';
import { STORAGE_CART_KEY } from '@/utils/configs';

;((doc) => {
  const [getCartData, setCartData] = storageManage(STORAGE_CART_KEY);
  const state = {
    cartData: [],
  };

  const oContainer = doc.getElementsByClassName('J_Container')[0],
  
        oHeader = Header({}),
        oBackIcon = BackIcon({});

  const setState = (newState, callback = () => {}) => {
    const prevState = { ...state };
    if (Object.prototype.toString.call(newState) === '[object Object]') {
      Object.assign(state, newState);
    }
    callback(state, prevState);
  }

	const init = () => {
    initData();
    render(oContainer);
  }

  function initData() {
    const cartData = getCartData();
    setState({
      cartData: cartData.map(item => {
        return {
          ...item,
          checked: false,
        };
      })
    },
      (state, oldState) => {
        // console.log(state);
      }
    );
  }

  function render(el) {
    const oContainer = doc.createElement('div');
    oContainer.className = 'cart-page-inner J_CartPageInner';

    let oCListInstance,
        oToolBarInstance;

    const oCartList = CartList({
      cartData: state.cartData,
      onItemCheckedChange: (newValueItem) => onItemCheckedChange(newValueItem, oToolBarInstance),
    }),
          oToolBar = ToolBar({
            cartData: state.cartData,
            onCheckedAll: (isCheckedAll) => {
              setState({
                cartData: state.cartData.map(item => {
                  return {
                    ...item,
                    checked: isCheckedAll,
                  };
                })
              }, (newState) => {
                // console.log(newState);
              });
              const oCheckedItems = oCListInstance.getElementsByClassName('item-check');

              [...oCheckedItems].forEach(el => {
                el.checked = isCheckedAll;
              });

              setCartData(state.cartData);
            }
          });

    oCListInstance = oCartList.create();
    oToolBarInstance = oToolBar.create();

    oContainer.appendChild(oHeader.create('我的购物车'));
    oContainer.appendChild(oBackIcon.create());
    oContainer.appendChild(oCListInstance);
    oContainer.appendChild(oToolBarInstance);

    el.appendChild(oContainer);
  }

  function onItemCheckedChange(newValueItem, oToolBarInstance) {
    const oCheckAll = oToolBarInstance.getElementsByClassName('checkall-btn')[0];

    setState({
      cartData: state.cartData.map(item => {
        if (newValueItem.dataIndex === item.dataIndex) {
          return newValueItem;
        }
        return item;
      })
    }, (newState) => {
      console.log(newState);
    });
    setCartData(state.cartData);
    oCheckAll.checked = state.cartData.every(item => !!item.checked);
  }
	
  init();
})(document);