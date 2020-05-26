import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 产品请求类
 */
class ProductRequest extends BaseRequest {
	
	constructor() {
	    super();
		this.detailByIdExtendUrl = new RequestType('product/detailById', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 根据产品id获取详情（扫码所得的id或者产品id查询）
	 * @param {Object} id 产品id
	 * @param {Object} successCallback 成功执行回调
	 */
	detailById(id, successCallback) {
		this.basePost(
			this.detailByIdExtendUrl.url + '?id=' + id,
			this.detailByIdExtendUrl.type,
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

export default ProductRequest;