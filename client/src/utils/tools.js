function replaceTpl(tpl, data) {
	return tpl.replace(/\{\{(.*?)\}\}/g, function (node, key) {
		return (
			[undefined, null].includes(data[key.trim()])
			?
			''
			:
			data[key.trim()]
		);
	});
}

function transToString(object, prefix) {
	var str = prefix || '';

	for (var k in object) {
		str += k + '=' + object[k] + '&';
	}

	return str.replace(/&$/, '');
}

function setLazyloadImg(el, className) {
	const oListItems = Array.from(el.getElementsByClassName(className), (oItem) => {
		const clientHeight = document.documentElement.clientHeight,
					srcollTop = document.documentElement.scrollTop,
					elOffsetTop = oItem.offsetTop;

		if (clientHeight + srcollTop >= elOffsetTop) {
			const oImg = oItem.getElementsByTagName('img')[0],
						dataSrc = oImg.getAttribute('data-src');

			if (dataSrc) {
				oImg.setAttribute('src', dataSrc);
				oImg.removeAttribute('data-src');
			}
		}

		return oItem;
	});
}

function throttle(fn, duration) {
	var timer = null,
			startTime = new Date().getTime();

	duration = duration || 300;

	return function () {
		var ctx = this,
				args = arguments,
				endTime = new Date().getTime();

		clearTimeout(timer);

		if (endTime - startTime > duration) {
			fn.apply(ctx, args);
			startTime = new Date().getTime();
		} else {
			timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
			}, endTime - startTime);
		}
	}
}

function debounce(fn, delay) {
	var timer = null;

	delay = delay || 300;

	return function () {
		var ctx = this,
		    args = arguments;

		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function () {
			fn.apply(ctx, args);
			clearTimeout(timer);
			timer = null;
		}, delay);
	}
}

function getElChildren(el) {
	var children = [],
			childNodes = el.childNodes,
			childNodesLen = childNodes.length,
			item;

	for (var i = 0; i < childNodesLen; i++) {
		item = childNodes[i];
		if (item.nodeType === 1) {
			children.push(item);
		}
	}

	return children;
}

function getSearchParams(search) {
	if (typeof search !== 'string') {
		throw new Error('"search is required !"');
	}	const searchStr = decodeURI(search),
					matchReg = /[^\?\&]([A-z]+)\=([^&]+)/g, // '?a=1&b=2&c=3'
					searchParams = Object.create(null),
					matchList = searchStr.match(matchReg) || [];

	const entries = matchList.forEach(str => {
		const [key, value] = str.split('=');
		
		searchParams[key] = value;
	});

	return searchParams;
}

function degitNum(num) {
	var count = Number(num),
			degit = arguments[1] || 2;

  return count.toFixed(degit);
}

function storageManage(key, opts = {}) {
	if (!key) {
		throw new Error('key is required in storageManage module!');
	}
  const _key = `__${ key }__`,
				{
          initialValue = [],
				} = opts;

  function getStorage() {
		const jsonStr = localStorage.getItem(_key);
		return jsonStr ? JSON.parse(jsonStr) : initialValue;
	}
	function setStorage(newValue) {
		const jsonStr = JSON.stringify(newValue);
		localStorage.setItem(_key, jsonStr);
	}
	function initStorage() {
		setStorage(initialValue);
	}

	return [
		getStorage,
		setStorage,
		initStorage,
	];
}

function deepClone(origin, target) {
	var target = target || {};

	for (var k in origin) {
		if (origin.hasOwnProperty(k)) {
			if (typeof origin[k] === 'object' && origin[k] !== null) {
        target[k] = new origin[k].constructor();
				deepClone(origin[k], target[k]);
			} else {
				target[k] = origin[k];
			}
		}
	}

	return target;
}

export {
	replaceTpl,
	transToString,
	setLazyloadImg,

	throttle,
	debounce,
	getElChildren,

	getSearchParams,
	degitNum,

	storageManage,

	deepClone
};
