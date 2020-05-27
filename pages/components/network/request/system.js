import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 系统请求类，用于获取app版本号等
 */
class SystemRequest extends BaseRequest {
	
	constructor() {
	    super();
		this.appCurrentVersionUrl = new Url('appVersion/current', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 获取app版本信息
	 * @param {Function} successCallback 成功执行回调
	 */
	appCurrentVersion(successCallback) {
		this.basePost(
			this.appCurrentVersionUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default SystemRequest;