/**
 * 移除自身元素
 * @param {HTMLElement} el
 */
export function removeEl(el) {
  if (el.remove) {
    el.remove();
  } else {
    var _el = el.parentNode.removeChild(el);
    _el = null;
  }
}

/**
 * 元素淡入
 * @param {HTMLElement} el
 * @param {number} durationTime
 */
export function fadeIn(el, durationTime) {
  if (!el) {
    return;
  }
  var t = null,
      totalTime = durationTime || 300,
      speed = 3 / totalTime;
  el.style.opacity = '0';
  t = setInterval(function () {
    var opacity = Number(el.style.opacity);
    if (opacity >= 1) {
      el.style.opacity = '';
      clearInterval(t);
      t = null;
    } else {
      el.style.opacity = Number(opacity) + speed;
    }
  }, 1);
}

/**
 * 元素淡出
 * @param {HTMLElement} el
 * @param {number} durationTime
 */
export function fadeOut(el, durationTime, callback) {
  if (!el) {
    return;
  }
  var t = null,
      totalTime = durationTime || 300,
      speed = 3 / totalTime;
  el.style.opacity = '1';
  t = setInterval(function () {
    var opacity = Number(el.style.opacity);
    if (opacity <= 0) {
      el.style.opacity = '';
      clearInterval(t);
      t = null;
      typeof callback === 'function' && callback();
    } else {
      el.style.opacity = Number(opacity) - speed;
    }
  }, 1);
}
