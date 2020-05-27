/**
 * @description 请求地址,此下有统一之拦截
 */
class Url {
	constructor(url, type) {
	    this._url = url;
		this._type = type;
		this._urlParams = {};
	};
	
	static get baseUrl() {
		return 'http://192.168.1.120:8180/cmpApi/';
	};
	
	get url() {
		let paramList = [];
		Object.keys(this._urlParams).forEach(param => {
			paramList.push(param + '=' + this._urlParams[param]);
		});
		return Url.baseUrl + this._url + (paramList.length > 0? ('?' + paramList.join('&')): '');
	};
	
	get type() {
		return this._type;
	};
	
	set urlParams(params) {
		this._urlParams = params;
	};
};

export default Url;