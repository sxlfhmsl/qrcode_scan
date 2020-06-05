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
		this.attUploadUrl = new Url('att/upload', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.attListUrl = new Url('att/list', RequestType.NORMAL | RequestType.NEED_TOKEN);
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
	
	/**
	 * @description 上传图片
	 * @param {Object} type 类型
	 * @param {Object} filePath 文件路径
	 * @param {Object} successCallback 成功回调
	 */
	attUpload(type, filePath, successCallback) {
		this.attUploadUrl.pathParams = [type];
		this.baseUpload(
			this.attUploadUrl,
			filePath,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 获取历史图片
	 * @param {Object} type 类型
	 * @param {Object} successCallback 执行成功回调
	 */
	attList(type, successCallback) {
		this.attListUrl.pathParams = [type];
		this.basePost(
			this.attListUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default SystemRequest;