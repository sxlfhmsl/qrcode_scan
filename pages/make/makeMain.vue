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
		
		<view style="height: 320rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo :itemData="pdBaseInfoData"></pdBaseInfo>
				<scroll-view scroll-x class="bg-white nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
					<view 
						class="cu-item"
						:class="item.id==TabPage_tabInfo.TabCur?'text-blue cur':''" v-for="(item,index) in TabPage_tabInfo.TabItems"
						:key="index"
						@tap="TabPage_tabSelect"
						:data-id="item.id"
						:scroll-left="TabPage_tabInfo.scrollLeft"
					>
						{{item.title}}
					</view>
				</scroll-view>
			</view>
		</view>
		
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdSource'">
			<view class="text-center flex">
				<input @change="searchFilterChange" class="radius margin" placeholder="材料编号" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="code"/>
				<input @change="searchFilterChange" class="radius margin" placeholder="品种名称" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="materialType"/>
				<picker mode="date" @change="dateChange" style="width: 60%;">
					<input class="radius margin" placeholder="进场时间" style="max-width: 100%; border-bottom: grey solid 1px;" v-model="enterDate" disabled="true"/>
				</picker>
			</view>
			
			<!-- 原材料 -->
			<view class="cu-list menu">
				<view class="cu-item margin-bottom-sm margin-top-sm margin-left-sm radius" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item, index) in souceList" :key="index" :id="item.id" 
					@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
					:style="choosedSouceIds.indexOf(item.id) !== -1? 'border: blue solid 2px;': ''"
				>
					<view class="content margin-top margin-bottom">
						<view class="text-black margin-bottom-sm">
							品种:{{item.materialType}}
						</view>
						<view class="text-black margin-top-sm">
							编号:{{item.code}}
						</view>
					</view>
					<view class="text-blue" 
					    v-if="choosedSouceIds.indexOf(item.id) !== -1"
						style="position: absolute;z-index: 99;font-size: 2em;opacity: 0.5;transform:rotate(-45deg);top: calc(50% - 0.75em); left: calc(50% - 2em);"
					>已选择</view>
					<view class="action margin-top margin-bottom">
						<view class="text-black text-right margin-bottom-sm">
							规格:{{item.specs}}
						</view>
						<view class="text-black text-right margin-top-sm">
							时间:{{item.enterDate}}
						</view>
					</view>
					<view class="move">
						<view class="bg-blue" @tap="addMaterial(item.id, item.materialType, item.code, item.specs)">添加</view>
						<view class="bg-red" @tap="removeMaterial(item.id)">删除</view>
					</view>
				</view>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="resetSearchFilter">重置</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="toNextStep">下一步</button>
			</view>
		</scroll-view>
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdMake'">
			<standardEditTable @itemChange="itemChange" :workers="workers" :picInt="item.picInt" :title="item.title" :itemData="item.itemData" v-for="(item, index) in tableList" :key="index"></standardEditTable>
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="closePages">关闭</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="saveMake">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import TabPage from "@/pages/components/custom-tab-page";
	import ProductRequest from "@/pages/components/network/request/product";
	import MaterialRequest from "@/pages/components/network/request/material";
	
	import standardEditTable from "@/pages/components/standardEditTable"
	
	export default {
		components: {
			pdBaseInfo,
			standardEditTable
		},
		name: 'makeMain',
		extends: TabPage,
		data() {
			return {
				'title': '',                                                // 标题
				'productRequest': new ProductRequest(),                     // 产品网络请求对象
				'materialRequest': new MaterialRequest(),                   // 原材料网络请求对象
				'productId': null,                                          // 产品id
				'rawProductData': null,                                     // 产品数据
				'pdBaseInfoData': {},                                       // 基础信息绑定数据对象
				'choosedSouceIds': [],                                      // 选中的原材料id
				'choosedSouceList': [],                                     // 选中的原材料列表
				'souceList': [],                                            // 原材料列表
				'code': '',                                                 // 编码
				'materialType': '',                                         // 品种名称
				'enterDate': '',                                            // 进场日期
				'modalName': null,
				'listTouchStart': 0,
				'listTouchDirection': null,
				'mode': [{
					id: 'mtkModeWelding',
					title: '焊接作业信息',
					idPrefix: 'mtkWelding',
					'itemTitles': {'Date':'焊接作业时间', 'Content': '作业环境温度', 'User': '作业人员', 'Att': '焊接作业照片'},
					checkPrefix: 'mtk',
					type: 'makeTaskInfo',
					picInt: 3,
				}, {
					id: 'mtkModeAnti',
					title: '防腐作业信息',
					idPrefix: 'mtkAnti',
					'itemTitles': {'Date':'防腐作业时间', 'Content': '防腐作业内容', 'User': '作业人员', 'Att': '防腐作业照片'},
					checkPrefix: 'mtk',
					type: 'makeTaskInfo',
					picInt: 4,
				}, {
					id: 'mtkModeTask',
					title: '加工作业信息',
					idPrefix: 'mtkTask',
					'itemTitles': {'Date':'加工作业时间', 'Content': '加工作业内容', 'User': '作业人员', 'Att': '加工作业照片'},
					checkPrefix: 'mtk',
					type: 'makeTaskInfo',
					picInt: 5,
				}, {
					id: 'mckModeWelding',
					title: '焊缝检验信息',
					idPrefix: 'mckWelding',
					'itemTitles': {'Date':'焊缝检验时间', 'Content': '焊缝检验结论', 'User': '检验人员', 'Att': '焊缝检验照片'},
					checkPrefix: 'mck',
					type: 'makeCheckInfo',
					picInt: 6,
				}, {
					id: 'mckModeProduct',
					title: '成品检验信息',
					idPrefix: 'mckProduct',
					'itemTitles': {'Date':'成品检验时间', 'Content': '成品检验结论', 'User': '检验人员', 'Att': '成品检验照片'},
					checkPrefix: 'mck',
					type: 'makeCheckInfo',
					picInt: 7,
				}, {
					id: 'mckModeSupervision',
					title: '监造检验信息',
					idPrefix: 'mckSupervision',
					'itemTitles': {'Date':'监造检验时间', 'Content': '监造检验结论', 'User': '监理工程师', 'Att': '监造检验照片'},
					checkPrefix: 'mck',
					type: 'makeCheckInfo',
					picInt: 8,
				}],
				'tableList': [],
				'workers': [],
				'makeCommitObject': {},                                    // 提交对象
			}
		},
		methods: {
			/**
			 * @description 跳转到下一步
			 */
			toNextStep: function() {
				this.TabPage_tabInfo.TabCur = 'pdMake';
			},
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
			saveMake: function(e) {
				if (this.productId !== null) {
					this.productRequest.made(this.rawProductData.productMade.id, this.productId, this.makeCommitObject, result => {
						console.log(result)
					});
				}
			},
			resetSearchFilter: function(e) {
				this.code = '';
				this.materialType = '';
				this.enterDate = '';
				this.loadSourceData();
			},
			dateChange: function(e) {
				this.enterDate = e.detail.value
				this.searchFilterChange();
			},
			searchFilterChange: function(e) {
				this.loadSourceData();
			},
			/**
			 * @description 添加原材俩
			 * @param {Object} materialId 原材料id
			 * @param {Object} materialName 原材料名称
			 * @param {Object} materialCode 原材料编码
			 * @param {Object} materialSpecs 原材料规格
			 */
			addMaterial: function(materialId, materialName, materialCode, materialSpecs) {
				this.materialRequest.add(
					this.productId, materialId, materialName, materialCode, materialSpecs, data => {
						this.loadChoosedSource();
					}
				);
			},
			/**
			 * @description 移除原材料
			 * @param {Object} materialId 原材料id
			 */
			removeMaterial: function(materialId) {
				if (this.choosedSouceIds.indexOf(materialId) == -1) {
					return;
				}
				materialId = this.choosedSouceList[this.choosedSouceIds.indexOf(materialId)].id;
				this.materialRequest.del(
					materialId, data => {
						this.loadChoosedSource();
					}
				);
			},
			/**
			 * @description 加载产品信息
			 */
			loadProductInfo: function() {
				this.productRequest.detailById(this.productId, data => {
					this.rawProductData = data;
					// 计算制作数据显示
					this.calcMakeData();
					if (data !== null) {
						this.title = data.product.name;
						this.pdBaseInfoData = data.product;
					}
				});
			},
			/**
			 * @description 加载原材料信息
			 */
			loadSourceData: function() {
				this.productRequest.selectMaterial(
					this.code, this.materialType, this.enterDate, 1, 99999, data => {
						if (data != null) {
							this.souceList = data.records;
						}
				});
			},
			/**
			 * @description 加载已选择原材料
			 */
			loadChoosedSource: function() {
				this.materialRequest.list(this.productId, data => {
					if (data != null) {
						this.choosedSouceList = data;
						this.choosedSouceIds = [];
						this.choosedSouceList.forEach(item => {
							this.choosedSouceIds.push(item.materialId);
						});
					}
				});
			},
			// ListTouch触摸开始
			ListTouchStart: function(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove: function(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd: function(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			/**
			 * @description 计算产品数据
			 */
			calcMakeData: function() {
				this.tableList = [];
				if (this.rawProductData.productCategory !== null && this.rawProductData.productCategory !== undefined) {
					if (this.rawProductData.productMade !== null && this.rawProductData.productMade !== undefined) {
						this.mode.forEach(item => {
							if (this.rawProductData.productCategory[item.id] != 0 && this.rawProductData.productCategory[item.type] != 0) {
								// 生成行数据
								let itemData = [];
								if (this.rawProductData.productCategory[item.checkPrefix + 'Date'] != 0) {  // 时间
									itemData.push({
										'id': item.idPrefix + 'Date',
										'title': item.itemTitles.Date,
										'value': this.rawProductData.productMade[item.idPrefix + 'Date'],
										'type': 'date'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'Content'] != 0) {  // 内容
									itemData.push({
										'id': item.idPrefix + 'Content',
										'title': item.itemTitles.Content,
										'value': this.rawProductData.productMade[item.idPrefix + 'Content'],
										'type': 'text'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'User'] != 0) {  // 人员
									itemData.push({
										'id': item.idPrefix + 'WorkerId',
										'title': item.itemTitles.User,
										'value': this.rawProductData.productMade[item.idPrefix + 'WorkerId'],
										'type': 'worker'
									});
								}
								if (this.rawProductData.productCategory[item.checkPrefix + 'Att'] != 0) {  // 图片
									itemData.push({
										'id': item.idPrefix + 'Att',
										'title': item.itemTitles.Att,
										'value': this.rawProductData.productMade[item.idPrefix + 'Att'],
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
				this.makeCommitObject[params.id] = params.value;
			}
		},
		onLoad: function(option) {
			this.productId = (option.productId? option.productId: this.productId);
			this.loadProductInfo();
			this.loadSourceData();
			this.loadChoosedSource();
		},
		mounted:function(){
			// 获取工作者
			this.productRequest.selectWorker(data => {
				this.workers = data;
			});
			
			this.TabPage_tabInfo.TabItems = [{
				title: '原材料',
				id: 'pdSource'
			}, {
				title: '产品制作',
				id: 'pdMake'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
