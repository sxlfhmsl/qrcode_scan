import BaseRequest from "@/pages/components/network/request/base";
import RequestType from "@/pages/components/network/request/type";
import Url from "@/pages/components/network/request/url";

/**
 * @description 原材料请求类
 */
class MaterialRequest extends BaseRequest {
	
	constructor() {
	    super();
		
		this.listUrl = new Url('productMaterial/list', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.addUrl = new Url('productMaterial/add', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.delUrl = new Url('productMaterial/delete', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.getMaterialUrl = new Url('productMaterial/getMaterial', RequestType.NORMAL | RequestType.NEED_TOKEN);
	};
	
	/**
	 * @description 获取已选的原材料列表
	 * @param {Object} productId 产品id
	 * @param {Object} successCallback 成功回调
	 */
	list(productId, successCallback) {
		this.listUrl.urlParams = {'productId': productId};
		this.basePost(
			this.listUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 添加产品原材料
	 * @param {Object} productId 产品id
	 * @param {Object} materialId 原材料id
	 * @param {Object} materialName 原材料名
	 * @param {Object} materialCode 材料编号
	 * @param {Object} materialSpecs 材料规格
	 * @param {Object} successCallback 成功回调
	 */
	add(productId, materialId, materialName, materialCode, materialSpecs, successCallback) {
		this.addUrl.urlParams = {
			'productId': productId,
			'materialId': materialId,
			'materialName': materialName,
			'materialCode': materialCode,
			'materialSpecs': materialSpecs
		};
		this.basePost(
			this.addUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 删除产品原材料
	 * @param {Object} productMaterialId 从已选产品材料的id获取
	 * @param {Object} successCallback 成功回调
	 */
	del(productMaterialId, successCallback) {
		this.delUrl.urlParams = {'productMaterialId': productMaterialId};
		this.basePost(
			this.delUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 获取原材料
	 * @param {Object} materialId
	 * @param {Object} successCallback
	 */
	getMaterial(materialId, successCallback) {
		this.getMaterialUrl.urlParams = {'materialId': materialId};
		this.basePost(
			this.getMaterialUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default MaterialRequest;