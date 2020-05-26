import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 权限请求类
 */
class PermissionRequest extends BaseRequest {
	
	constructor() {
	    super();
		this.modeExtendUrl = new Url('permission/mode', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 验证是否拥有{type}的权限（1-制作;2-入库; 3-发货;4-收货;5-安装）
	 * @param {Int} type 权限类型
	 * @param {Function} successCallback 成功执行回调
	 */
	mode(type, successCallback) {
		this.basePost(
			this.modeExtendUrl.url + '?type=' + type,
			this.modeExtendUrl.type,
			{},
			(result) => {
				if (result.data.code == 200) {
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

export default PermissionRequest;