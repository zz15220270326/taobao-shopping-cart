import {
  TOAST_TYPES,
  oMaskClassName,
  oToastClassName,
} from './configs';
import { removeEl, fadeIn, fadeOut } from './utils';

class Toast {
  /** @type {string} 提示信息 */
  message;
  /** @type {string} 提示图标 */
  icon;
  /** @type {boolean} 是否阻止点击 */
  forbidClick;
  /** @type { string } Toast的类型 */
  type;
  /** @type {HTMLElement} toast提示元素 */
  oToast;
  /** @type {number} 动画事件 */
  animationTime = 300;
  /** @type {HTMLElement|null} toast元素遮罩 */
  oMask;

  constructor(options = {}) {
    this.message = options.message || 'Toast';
    this.icon = options.icon || '';
    this.forbidClick = options.forbidClick || false;
    this.type = TOAST_TYPES.includes(options.type) ? options.type : 'info';

    this.render();
  }
  render() {
    const oFrag = document.createDocumentFragment();
    if (this.forbidClick) {
      this.createMask(oFrag);
    }
    this.createToast(oFrag);
    document.body.appendChild(oFrag);

    fadeIn(this.oToast, this.animationTime);
  }
  createMask(oFrag) {
    if (!!document.getElementsByClassName(oMaskClassName).length) {
      return;
    }

    const oMask = document.createElement('div');
    oMask.className = oMaskClassName;

    this.oMask = oMask;
    oFrag.appendChild(oMask);
  }
  createToast(oFrag) {
    const { message, icon, type } = this,
          oToast = document.createElement('div');

    oToast.className = oToastClassName;
    oToast.innerHTML = `
      <!-- render-icon-fragment -->
      ${
        !!icon
        ?
        `<i class="iconfont icon-${ icon }"></i>`
        :
        ''
      }
      <!-- render-type-icon -->
      ${
        !type || type === 'info' || !!icon
        ?
        ''
        :
        `<i class="iconfont icon-${ type }"></i>`
      }
      <!-- render-message-tip -->
      <p class="inner-message">${ message }</p>
    `;
    this.oToast = oToast;
    oFrag.appendChild(oToast);
  }
  destory() {
    fadeOut(this.oToast, this.animationTime, () => {
      removeEl(this.oToast);
      this.oMask && removeEl(this.oMask);
    });
  }
}

export default Toast;
