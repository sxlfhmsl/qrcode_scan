import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 产品请求类
 */
class ProductRequest extends BaseRequest {
	
	constructor() {
	    super();
		this.detailByIdUrl = new RequestType('product/detailById', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.productByCodeUrl = new RequestType('product/productByCode', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.selectMaterialUrl = new RequestType('product/selectMaterial', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.productMaterialListUrl = new RequestType('productMaterial/list', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 根据产品id获取详情（扫码所得的id或者产品id查询）
	 * @param {Object} id 产品id
	 * @param {Object} successCallback 成功执行回调
	 */
	detailById(id, successCallback) {
		this.detailByIdUrl.urlParams = {'id': id};
		this.basePost(
			this.detailByIdUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 根据产品编号获取产品信息
	 * @param {Object} code 产品编号
	 * @param {Object} successCallback 成功执行回调
	 */
	productByCode(code, successCallback) {
		this.productByCodeUrl.urlParams = {'code': code};
		this.basePost(
			this.productByCodeUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 获取可选原材料列表
	 * @param {Object} code 材料编号
	 * @param {Object} materialType 材料类型
	 * @param {Object} enterDate 进厂日期
	 * @param {Object} page 当前页数
	 * @param {Object} limit 每页大小
	 * @param {Function} successCallback 成功回调
	 */
	selectMaterial(code, materialType, enterDate, page, limit, successCallback) {
		this.selectMaterialUrl.urlParams = {
			'code': code,
			'materialType': materialType,
			'enterDate': enterDate,
			'page': page,
			'limit': limit,
		};
		this.basePost(
			this.selectMaterialUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 获取已选的原材料列表
	 * @param {Object} productId 产品id
	 * @param {Object} successCallback 成功回调
	 */
	productMaterialList(productId, successCallback) {
		this.productMaterialListUrl.urlParams = {'productId': productId};
		this.basePost(
			this.productMaterialListUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default ProductRequest;