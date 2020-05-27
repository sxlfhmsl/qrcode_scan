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
		this.selectWorkerUrl = new RequestType('product/selectWorker', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.madeUrl = new RequestType('product/made', RequestType.NORMAL | RequestType.NEED_TOKEN);
		this.madeListUrl = new RequestType('product/madeList', RequestType.NORMAL | RequestType.NEED_TOKEN);
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
	 * @description 获取可选的作业人员或检验人员
	 * @param {Object} successCallback 成功回调
	 */
	selectWorker(successCallback) {
		this.basePost(
			this.selectWorkerUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 制作编辑保存
	 * @param {Object} id 制作id（productMade的对象id）
	 * @param {Object} productId 产品id 
	 * @param {Object} madeParams 制作参数
	 * @param {Object} successCallback 成功回调
	 */
	made(id, productId, madeParams, successCallback) {
		madeParams['id'] = id;
		madeParams['productId'] = productId;
		this.madeUrl.urlParams = madeParams;
		this.basePost(
			this.madeUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
	
	/**
	 * @description 制作流程列表（包含发货列表）
	 * @param {Object} code 产品编号
	 * @param {Object} status 状态 状态:0-待制作；1-制作中；2-已入库；3-已发货；4-已报废
	 * @param {Object} page 当前页数
	 * @param {Object} limit 每页大小
	 * @param {Object} successCallback
	 */
	madeList(code, status, page, limit, successCallback) {
		this.madeListUrl.urlParams = {
			'code': code,
			'status': status,
			'page': page,
			'limit': limit
		};
		this.basePost(
			this.madeListUrl,
			{},
			(result) => {
				this.baseResultProcess(result, successCallback);
			}
		);
	};
};

export default ProductRequest;