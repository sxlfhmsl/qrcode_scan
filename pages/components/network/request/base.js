import RequestType from "@/pages/components/network/request/type";

/**
 * @description 基础请求类
 */
class BaseRequest {
	constructor() {
	    this.baseUrl = 'http://192.168.1.120:8180/cmpApi/';
	};
	
	/**
	 * @description 基础get请求
	 * @param {Object} extendUrl 额外地址
	 * @param {Object} requestType 请求的类型
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 */
	baseGet(extendUrl, requestType, params, callbackFunc) {
		return this.baseAjax(extendUrl, requestType, 'GET', 'json', params, callbackFunc, {});
	};
	
	/**
	 * @description 基础post请求
	 * @param {Object} extendUrl 额外地址
	 * @param {Object} requestType 请求的类型
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 */
	basePost(extendUrl, requestType, params, callbackFunc) {
		return this.baseAjax(extendUrl, requestType, 'POST', 'json', params, callbackFunc, {});
	};
	
	/**
	 * @description 基本的ajax请求
	 * @param {Object} extendUrl 额外地址
	 * @param {Object} requestType 请求的类型
	 * @param {Object} method 请求方式 POST GET
	 * @param {Object} dataType 返回数据类型
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 * @param {Object} header 请求头
	 */
	baseAjax(extendUrl, requestType, method, dataType, params, callbackFunc, header) {
		if (requestType & RequestType.NEED_TOKEN != 0) {
			let token = uni.getStorageSync('token');               // 获取token
			if (token == undefined || token == null) {
				// 请直接跳转至登录界面
			}
			else {
				header['Authorization'] = token;
			}
		}
		
		uni.request({
			url: this.baseUrl + extendUrl,
			header: header,
			method: method,
			dataType: dataType,
			data: params,
			timeout: 10000,
			complete: (result) => {
				if (result.statusCode == 200) {
					if (result.data.code == 700) {
						// token验证失败，需跳转到登录界面
					}
					else {
						callbackFunc(result);
					}
				}
				else {
					// 请求异常
					uni.showToast({
						title: '请求异常-----请检查网络',
					});
				}
			}
		});
	};
};

export default BaseRequest;