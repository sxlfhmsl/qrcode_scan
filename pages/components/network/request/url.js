/**
 * @description 请求地址,此下有统一之拦截
 */
class Url {
	constructor(url, type, pathParams) {
	    this._url = url;
		this._type = type;
		this._pathParams = pathParams;
		this._urlParams = {};
	};
	
	static get baseUrl() {// 47.108.78.92
		return 'http://47.108.70.55:8180/cmpApi/';
	};
	
	static get resBaseUrl() {// 47.108.78.92
		return 'http://47.108.70.55:8180';
	};
	
	get url() {
		let paramList = [];
		Object.keys(this._urlParams).forEach(param => {
			if (this._urlParams[param] !== undefined && this._urlParams[param] !== null) {
				paramList.push(param + '=' + this._urlParams[param]);
			}
		});
		return Url.baseUrl + this._url 
			+ (
				this._pathParams !== undefined && this._pathParams !== null && this._pathParams.length > 0? 
				('/' + this._pathParams.join('/')): 
				''
			)
			+ (paramList.length > 0? ('?' + paramList.join('&')): '');
	};
	
	get type() {
		return this._type;
	};
	
	set urlParams(params) {
		this._urlParams = params;
	};
	
	set pathParams(params) {
		this._pathParams = params;
	}
};

export default Url;