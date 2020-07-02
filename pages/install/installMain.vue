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
		
		<view :style="'height: ' + frontBarHeight + 'rpx;'">
			<view 
				ref="frontBar" id="frontBar"
				style="
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
				'mode': [
				// 	{
				// 	'special': true,
				// 	'id': null,
				// 	'title': '收货信息',
				// 	'idPrefix': null,
				// 	'itemTitles': [{
				// 		'id': 'recevieDate',
				// 		'title': '收货时间',
				// 		'type': 'text',
				// 	}, {
				// 		'id': 'deptName',
				// 		'title': '收货人',
				// 		'type': 'text',
				// 	}, {
				// 		'id': 'place',
				// 		'title': '实际使用部位',
				// 		'type': 'text',
				// 	}, ],
				// 	'checkPrefix': 'isu',
				// 	'type': 'installTaskInfo',
				// }, 
				{
					'id': 'itkConstructionUnit',
					'title': '施工单位',
					'idPrefix': 'ic',
					'itemTitles': [{
						'id': ['u', 'Date'],
						'title': '作业时间',
						'type': 'date',
					}, {
						'id': ['u', 'WorkerIds'],
						'title': '作业人员',
						'type': 'workerList',
					}, {
						'id': ['cu', 'WorkerIds'],
						'title': '检验人员',
						'type': 'workerList',
					}, {
						'id': ['u', 'Content'],
						'title': '检验结论',
						'type': 'text',
					}, {
						'id': ['u', 'Att'],
						'title': '检验报告',
						'type': 'imageList',
					}, ],
					'checkPrefix': 'icu',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkSupervisionUnit',
					'title': '监理单位',
					'idPrefix': 'isu',
					'itemTitles': [{
						'id': ['', 'Date'],
						'title': '监理时间',
						'type': 'date',
					}, {
						'id': ['', 'WorkerIds'],
						'title': '监理人员',
						'type': 'workerList',
					}, {
						'id': ['', 'Content'],
						'title': '监理结论',
						'type': 'text',
					}, ],
					'checkPrefix': 'isu',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkThirdCheck',
					'title': '第三方检测',
					'idPrefix': 'itc',
					'itemTitles': [{
						'id': ['', 'Date'],
						'title': '检测时间',
						'type': 'date',
					}, {
						'id': ['', 'WorkerIds'],
						'title': '检测人员',
						'type': 'workerList',
					}, {
						'id': ['', 'Device'],
						'title': '检测设备',
						'type': 'text',
					}, {
						'id': ['', 'Content'],
						'title': '检测结论',
						'type': 'text',
					}, ],
					'checkPrefix': 'itc',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkOwner',
					'title': '业主代表',
					'idPrefix': 'io',
					'itemTitles': [{
						'id': ['', 'WorkerIds'],
						'title': '业主代表',
						'type': 'workerList',
					}, ],
					'checkPrefix': 'io',
					'type': 'installTaskInfo',
				}, ],
				'tableList': [],
				'workers': [],
				'installCommitObject': {},                                    // 提交对象
				'frontBarHeight': 400,
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
						this.title = data.product.code;
						this.pdBaseInfoData = data.product;
						this.calcFlowHeight();
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
							let data = this.rawProductData;
							if (item.special || (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0)) {
								// 生成数据
								let itemData = [];
								item.itemTitles.forEach(childTitle => {
									// 生成key
									let childTitleKey = 
										childTitle.id[0] + 
										(childTitle.id[0] == ''? item.idPrefix.toLowerCase(): item.idPrefix) + 
										childTitle.id[1];
									let childTitleData = data.productMade[childTitleKey];
									switch(childTitle.type) {
										case "workerList":
										case "imageList":
										childTitleData = childTitleData? childTitleData.split(","): [];
										break;
									}
									childTitleData = {'id': childTitleKey, 'title': childTitle.title, 'value': childTitleData, 'type': childTitle.type};
									itemData.push(childTitleData);
								});
								this.tableList.push({
									'itemData': itemData,
									'title':  item.title,
									'picInt': 123,
								});
							}
						});
					}
				}
			},
			itemChange: function(params) {
				this.installCommitObject[params.id] = params.value;
			},
			/**
			 * @description 计算tabBar高度
			 */
			calcFlowHeight: function() {//tabBarEle
				this.$nextTick(() => {
					setTimeout(() => {
						let frontBar = uni.createSelectorQuery().select("#frontBar");
						frontBar.boundingClientRect((data) => {
							if (data && data.height) {
								this.frontBarHeight = data.height * 2;
							}
						}).exec();
					}, 200);
				})
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
