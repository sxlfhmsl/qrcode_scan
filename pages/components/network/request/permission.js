import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 权限请求类
 */
class PermissionRequest extends BaseRequest {
	
	constructor() {
	    super();
		this.modeUrl = new Url('permission/mode', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.dataUrl = new Url('permission/data', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 验证是否拥有模块{type}的权限（1-制作;2-入库; 3-发货;4-收货;5-安装）
	 * @param {Int} type 权限类型
	 * @param {Function} successCallback 成功执行回调
	 */
	mode(type, successCallback) {
		this.modeUrl.urlParams = {'type': type};
		this.basePost(
			this.modeUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 验证对某一产品productId的某一模块type是否有权限
	 * @param {Int} type 模块 1-制作;2-入库; 3-发货;4-收货;5-安装;6-查看人员信息
	 * @param {Int} productId 产品
	 * @param {Function} successCallback 成功执行回调
	 */
	data(type, productId, successCallback) {
		this.dataUrl.urlParams = {'type': type, 'productId': productId};
		this.basePost(
			this.dataUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default PermissionRequest;