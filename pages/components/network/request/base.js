import RequestType from "@/pages/components/network/request/type";

/**
 * @description 基础请求类
 */
class BaseRequest {
	constructor() {
	};
	
	S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	
	guid() {
		return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
	};
	
	perGuid() {
		return (this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4()+this.S4());
	};
	
	/**
	 * @description 请求结果统一处理
	 * @param {Object} result 结果
	 * @param {Object} callback 执行回调-----成功
	 */
	baseResultProcess(result, callback) {
		if (result.data.code == 200) {
			callback(result.data.data);
		}
		else {
			callback(null);
			uni.showToast({
				title: result.data.message
			});
		}
	};
	
	/**
	 * @description 基础get请求
	 * @param {Object} url 地址
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 */
	baseGet(url, params, callbackFunc) {
		return this.baseAjax(url, 'GET', 'json', params, callbackFunc, {});
	};
	
	/**
	 * @description 基础post请求
	 * @param {Object} url 地址
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 */
	basePost(url, params, callbackFunc) {
		return this.baseAjax(url, 'POST', 'json', params, callbackFunc, {});
	};
	
	/**
	 * @description 基本的ajax请求
	 * @param {Object} url 地址
	 * @param {Object} method 请求方式 POST GET
	 * @param {Object} dataType 返回数据类型
	 * @param {Object} params 请求的参数
	 * @param {Object} callbackFunc 执行成功的回调
	 * @param {Object} header 请求头
	 */
	baseAjax(url, method, dataType, params, callbackFunc, header) {
		if (url.type & RequestType.NEED_TOKEN != 0) {
			let token = uni.getStorageSync('token');               // 获取token
			if (token == undefined || token == null || token == '') {
				// 请直接跳转至登录界面
				uni.removeStorage({
					key: 'token'
				});
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
			else {
				header['Authorization'] = token;
			}
		}
		
		uni.request({
			url: url.url,
			header: header,
			method: method,
			dataType: dataType,
			data: params,
			timeout: 10000,
			complete: (result) => {
				if (result.statusCode == 200) {
					if (result.data.code == 700) {
						// token验证失败，需跳转到登录界面
						uni.removeStorage({
							key: 'token'
						});
						uni.redirectTo({
							url: '/pages/index/index'
						});
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
	
	/**
	 * @description 文件上传接口
	 * @param {Object} url 路径
	 * @param {Object} filePath 文件
	 * @param {Object} callbackFunc 回调 
	 */
	baseUpload(url, filePath, header, callbackFunc) {
		if (url.type & RequestType.NEED_TOKEN != 0) {
			let token = uni.getStorageSync('token');               // 获取token
			if (token == undefined || token == null || token == '') {
				// 请直接跳转至登录界面
				uni.removeStorage({
					key: 'token'
				});
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
			else {
				header['Authorization'] = token;
			}
		}
		uni.uploadFile({
			url: url.url,
			header: header,
			filePath: filePath,
			name: 'file',
			success: (result) => {
				if (result.statusCode == 200) {
					if (typeof(result.data) == 'string') {
						result.data = JSON.parse(result.data);
					}
					if (result.data.code == 700) {
						// token验证失败，需跳转到登录界面
						uni.removeStorage({
							key: 'token'
						});
						uni.redirectTo({
							url: '/pages/index/index'
						});
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
	}
};

export default BaseRequest;