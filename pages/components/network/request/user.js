import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

class UserRequest extends BaseRequest {
	constructor() {
		super();
		// 登录请求
	    this.loginUrl = new Url('user/login', RequestType.NORMAL);
	};
	
	/**
	 * @description 登录
	 * @param {Object} username 用户名
	 * @param {Object} password 密码
	 * @param {Object} successCallback 执行成功的回调
	 */
	login(username, password, successCallback) {
		this.loginUrl.urlParams = {'username': username, 'password': password};
		this.basePost(
			this.loginUrl,
			{},
			(result) => {
				if (result.data.code == 200) {
					uni.setStorage({
						key: 'token',
						data: 'Bearer ' + result.data.data.token
					});
					successCallback(result.data.data);
				}
				else {
					uni.showToast({
						title: result.data.message
					});
				}
			}
		);
	};
};

export default UserRequest;