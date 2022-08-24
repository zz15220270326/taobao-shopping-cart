import './index.scss';

import Toast from './toast.class';
import { TOAST_TYPES, oToastClassName } from './configs';

let instance = null,
    isMulti = false,
    timer = null;

function create(options = {}) {
  if (!isMulti && instance) {
    if (document.getElementsByClassName('oToastClassName')[0]) {
      return;
    } else {
      instance = null;
    }
  }
  const {
    message = 'Toast',
    icon = '',
    forbidClick = false,
    type = 'default',
    duration = 1500,
  } = options;

  instance = new Toast({
    message,
    icon,
    forbidClick,
    type,
  });

  timer = setTimeout(() => {
    instance.destory();
    clearTimeout(timer);
    timer = null;
  }, duration);

  return instance;
}
/**
 * 开启创建多个Toast
 */
function allowMultiple() {
  isMulti = true;
}
/**
 * 销毁Toast实例
 */
function destory() {
  instance.destory();
  instance = null;
}

TOAST_TYPES.forEach(type => {
  create[type] = (message = `${ type } message`) => create({
    message,
    type
  });
});

create.allowMultiple = allowMultiple;
create.destory = destory;

export default create;
