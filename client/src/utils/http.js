import { BASE_URL } from './configs';
import { transToString } from './tools';

const doAjax = Symbol('doAjax');

class HTTP {
	constructor(options = {}) {
		this.options = Object.assign({
			baseURL: BASE_URL,
			timeout: 5000,
			dataType: 'JSON',
			async: true,
		}, options);
	}

	[doAjax](options) {
		const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft-XMLHTTP'),

					opts = options || {},

					baseURL = opts.baseURL || this.options.baseURL,
					timeout = opts.timeout || this.options.timeout,
					dataType = opts.dataType || this.options.dataType,
					async = opts.hasOwnProperty('async') ? opts.async : this.options.async,

					url = opts.url || '',
					method = (opts.method || opts.type || 'GET').toUpperCase(),
					params = opts.params || {},
					data = opts.data || {},
					success = opts.success || function (data) {},
					fail = opts.fail || function (err, xhr) {},
					complete = opts.complete || function (xhr) {};

    const totalURL = baseURL + url + transToString(params, '?');

    let timer;

    xhr.onreadystatechange = function () {
    	try {
    		if (xhr.readyState === 4) {
	    		if (xhr.status === 200) {
	          switch (dataType) {
	          	case 'JSON':
	          		success(JSON.parse(xhr.responseText));
	          		break;
	          	case 'TEXT':
	          	  success(xhr.responseText);
	          		break;
	          	case 'XML':
	          		success(xhr.responseXML);
	          		break;
	          }
	    		} else {
	    			fail(xhr.response, xhr);
	    		}
	    		clearTimeout(timer);
					timer = null;
					complete(xhr);
	    	}
    	} catch (e) {
    		throw new Error(e);
    	}
    }

		xhr.open(method, totalURL, async);

		if (['PUT', 'POST'].includes(method)) {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(transToString(data));
		} else {
			xhr.send();
		}
		timer = setTimeout(() => {
			xhr.abort && xhr.abort();
			clearTimeout(timer);
			timer = null;
			throw new Error(`request is timeout over than ${ timeout }ms`);
		}, timeout);
	}

	ajax(options = {}) {
		return new Promise((resolve, reject) => {
			this[doAjax]({
				...options,
				success: function (data) {
					resolve(data);
				},
				fail: function (err) {
					reject(err);
				}
			})
		});
	}

	get(url, params, success) {
		return this[doAjax]({
			url,
			params,
			success,
			method: 'GET'
		});
	}

	post(url, data, success) {
		return this[doAjax]({
			url,
			params,
			success,
			method: 'POST'
		});
	}
}

export default HTTP;
