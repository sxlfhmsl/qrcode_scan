import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";

class UserRequest extends BaseRequest {
	constructor() {
		super();
		// 登录请求
	    this.loginExtendUrl = {url: 'user/login', type: RequestType.NORMAL};
	};
	
	/**
	 * @description 登录
	 * @param {Object} username 用户名
	 * @param {Object} password 密码
	 * @param {Object} successCallback 执行成功的回调
	 */
	login(username, password, successCallback) {
		this.basePost(
			this.loginExtendUrl.url + '?username=' + username + '&password=' + password,
			this.loginExtendUrl.type,
			{},
			(result) => {
				if (result.data.code == 200) {
					uni.setStorage({
						key: 'token',
						data: 'Bearer ' + result.data.data.token
					});
					successCallback(result.data.data);
				}
			}
		);
	};
};

export default UserRequest;