<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-punch" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<view style="height: 300rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo :itemData="pdBaseInfoData"></pdBaseInfo>
			</view>
		</view>
		
		<scroll-view>
			<standardEditTable @itemChange="itemChange" :workers="workers" :picInt="item.picInt" :title="item.title" :itemData="item.itemData" v-for="(item, index) in tableList" :key="index"></standardEditTable>
			<view class="text-center">
				<button class="font-title-simkai-nocolor cu-btn bg-blue round lg shadow margin" @tap="closePages">关闭</button>
				<button class="font-title-simkai-nocolor cu-btn bg-blue round lg shadow margin" @tap="saveInstall">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import ProductRequest from "@/pages/components/network/request/product";
	
	import standardEditTable from "@/pages/components/standardEditTable"
	
	export default {
		components: {
			pdBaseInfo,
			standardEditTable
		},
		name: 'installMain',
		data() {
			return {
				'title': '',                                                // 标题
				'productRequest': new ProductRequest(),                     // 产品网络请求对象
				'productId': null,                                          // 产品id
				'rawProductData': null,                                     // 产品数据
				'pdBaseInfoData': {},                                       // 基础信息绑定数据对象
				'mode': [{
					'id': 'itkModeWelding',
					'title': '安装焊接作业',
					'idPrefix': 'itkWelding',
					'itemTitles': {'Date':'焊接作业时间', 'Content': '作业环境温度', 'User': '作业人员', 'Att': '焊接作业照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'itk',
					'type': 'installTaskInfo',
					'picInt': 11
				}, {
					'id': 'itkModeAnti',
					'title': '安装防腐作业',
					'idPrefix': 'itkAnti',
					'itemTitles': {'Date':'防腐作业时间', 'Content': '防腐作业内容', 'User': '作业人员', 'Att': '防腐过程照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'itk',
					'type': 'installTaskInfo',
					'picInt': 12
				}, {
					'id': 'itkModeTask',
					'title': '安装作业信息',
					'idPrefix': 'itkTask',
					'itemTitles': {'Date':'加工作业时间', 'Content': '加工作业内容', 'User': '作业人员', 'Att': '加工过程照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'itk',
					'type': 'installTaskInfo',
					'picInt': 13
				},     {
					'id': 'ickModeInstall',
					'title': '安装检验信息',
					'idPrefix': 'ickInstall',
					'itemTitles': {'Date':'安装检验时间', 'Content': '安装检验结论', 'User': '检验人员', 'Att': '安装检验照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 14
				}, {
					'id': 'ickManageWelding',
					'title': '焊接旁站监理',
					'idPrefix': 'ickManageWelding',
					'itemTitles': {'Date':'焊接旁站时间', 'Content': '焊接旁站结论', 'User': '监理工程师', 'Att': '焊接旁站照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 15
				}, {
					'id': 'ickManageAnti',
					'title': '防腐旁站监理',
					'idPrefix': 'ickManageAnti',
					'itemTitles': {'Date':'防腐旁站时间', 'Content': '防腐旁站结论', 'User': '监理工程师', 'Att': '防腐旁站照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 16
				}, {
					'id': 'ickThirdWelding',
					'title': '三方焊接检测',
					'idPrefix': 'ickThirdWelding',
					'itemTitles': {'Date':'三方焊接检测时间', 'Content': '三方焊接检测结论', 'User': '检验人员', 'Att': '三方焊接检测照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 17
				}, {
					'id': 'ickThirdAnti',
					'title': '三方防腐检测',
					'idPrefix': 'ickThirdAnti',
					'itemTitles': {'Date':'三方防腐检测时间', 'Content': '三方防腐检测结论', 'User': '检验人员', 'Att': '三方防腐检测照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 18
				}, {
					'id': 'ickModeOwner',
					'title': '业主代表',
					'idPrefix': 'ickOwner',
					'itemTitles': {'Date':'业主检测时间', 'Content': '业主检测结论', 'User': '业主代表', 'Att': '业主检测照片'},
					// titlePrefix: '焊接作业',
					'checkPrefix': 'ick',
					'type': 'installCheckInfo',
					'picInt': 19
				}],
				'tableList': [],
				'workers': [],
				'installCommitObject': {},                                    // 提交对象
			}
		},
		methods: {
			/**
			 * @description 关闭页面
			 * @param {Object} e 事件对象
			 */
			closePages: function(e) {
				uni.navigateBack({
					
				});
			},
			/**
			 * @description 保存结果
			 * @param {Object} e 事件对象
			 */
			saveInstall: function(e) {
				if (this.productId !== null) {
					this.productRequest.install(this.rawProductData.productInstall.id, this.productId, this.rawProductData.productInstall.place, this.installCommitObject, result => {
						uni.setStorageSync('flushPage', true);
						uni.showToast({
							title: '安装信息保存成功'
						});
					});
				}
			},
			/**
			 * @description 加载产品信息
			 */
			loadProductInfo: function() {
				this.productRequest.detailById(this.productId, data => {
					this.rawProductData = data;
					// 计算制作数据显示
					this.calcInstallData();
					if (data !== null) {
						this.title = data.product.name;
						this.pdBaseInfoData = data.product;
					}
				});
			},
			/**
			 * @description 计算产品数据
			 */
			calcInstallData: function() {
				this.tableList = [];
				if (this.rawProductData.productCategory !== null && this.rawProductData.productCategory !== undefined) {
					if (this.rawProductData.productInstall !== null && this.rawProductData.productInstall !== undefined) {
						this.mode.forEach(item => {
							if (this.rawProductData.productCategory[item.id] != 0 && this.rawProductData.productCategory[item.type] != 0) {
								// 生成行数据
								let itemData = [];
								if (this.rawProductData.productCategory[item.checkPrefix + 'Date'] != 0) {  // 时间
									itemData.push({
										'id': item.idPrefix + 'Date',
										'title': item.itemTitles.Date,
										'value': this.rawProductData.productInstall[item.idPrefix + 'Date'],
										'type': 'date'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'Content'] != 0) {  // 内容
									itemData.push({
										'id': item.idPrefix + 'Content',
										'title': item.itemTitles.Content,
										'value': this.rawProductData.productInstall[item.idPrefix + 'Content'],
										'type': 'text'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'User'] != 0) {  // 人员
									itemData.push({
										'id': item.idPrefix + 'WorkerId',
										'title': item.itemTitles.User,
										'value': this.rawProductData.productInstall[item.idPrefix + 'WorkerId'],
										'type': 'worker'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'Att'] != 0) {  // 图片
									itemData.push({
										'id': item.idPrefix + 'Att',
										'title': item.itemTitles.Att,
										'value': this.rawProductData.productInstall[item.idPrefix + 'Att'],
										'type': 'image'
									});
								}
								this.tableList.push({
									'itemData': itemData,
									'title':  item.title,
									'picInt': item.picInt
								});
							}
						});
					}
				}
			},
			itemChange: function(params) {
				this.installCommitObject[params.id] = params.value;
			}
		},
		onLoad: function(option) {
			this.productId = (option.productId? option.productId: this.productId);
			this.loadProductInfo();
		},
		mounted:function(){
			// 获取工作者
			this.productRequest.selectWorker(data => {
				this.workers = data;
			});
		}
	}
</script>

<style>

</style>
