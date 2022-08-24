import './index.scss';
import geTpl from './tpl';

export default (props = {}) => {

  function bindEvent(el) {
    el.addEventListener('click', onBackIconClick, false);
  }

  function onBackIconClick() {
    location.href = './';
  }

  return {
    name: 'BackIcon',
    create() {
      const oContainer = document.createElement('div');
      oContainer.className = 'back-icon J_BackIcon';
      oContainer.innerHTML = geTpl();

      setTimeout(() => {
        bindEvent(oContainer);
      }, 200);

      return oContainer;
    },
    
  };
}