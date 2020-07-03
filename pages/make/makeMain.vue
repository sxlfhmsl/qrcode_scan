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
			<view ref="frontBar" id="frontBar" style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo :itemData="pdBaseInfoData"></pdBaseInfo>
				<scroll-view scroll-x class="bg-gradual-blue nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
					<view
						ref="tabBarEle" id="tabBarEle"
						class="cu-item font-title-simhei-nocolor"
						:class="item.id==TabPage_tabInfo.TabCur?'text-black cur':''" v-for="(item,index) in TabPage_tabInfo.TabItems"
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
			<!-- <view class="text-center flex"> -->
				<!-- <input @change="searchFilterChange" class="radius margin font-content-simhei" placeholder="材料编号" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="code"/> -->
				<!-- <input @change="searchFilterChange" class="radius margin font-content-simhei" placeholder="品种名称" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="materialType"/> -->
				<!-- <picker class="font-content-simhei" mode="date" @change="dateChange" style="width: 60%;"> -->
					<!-- <input class="radius margin font-content-simhei" placeholder="进场时间" style="max-width: 100%; border-bottom: grey solid 1px;" v-model="enterDate" disabled="true"/> -->
				<!-- </picker> -->
			<!-- </view> -->
			
			<!-- 原材料 -->
			<view class="cu-list menu">
				<view 
					class="cu-item margin-bottom-sm margin-top-sm margin-left-sm radius" 
					:class="
						(modalName=='move-box-'+ index?'move-cur':'') + 
						(productShowType != 'slide'? ' margin-right-sm': ' ')
					"
					v-for="(item, index) in choosedSouceList"
					:key="index"
					:id="item.id" 
					@longpress="removeMaterial(item.id)"
					@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
					style="padding-left: 2rpx; padding-right: 2rpx; background-color: #f2f2f2;"
				>
					<view class="content margin-left margin-top margin-bottom">
						<view class="text-black margin-bottom-sm font-title-simhei">
							名称:
							<text class="font-content-simsun">{{item.materialName}}</text>
						</view>
						<view class="text-black margin-top-sm font-title-simhei">
							编号:
							<text class="font-content-simsun">{{item.materialCode}}</text>
						</view>
					</view>
					<!-- <view class="text-blue font-title-simkai-nocolor" -->
					    <!-- v-if="choosedSouceIds.indexOf(item.id) !== -1" -->
						<!-- style="position: absolute;z-index: 99;font-size: 2em;opacity: 0.5;transform:rotate(-45deg);top: calc(50% - 0.75em); left: calc(50% - 2em);" -->
					<!-- >已选择</view> -->
					
					<view class="action margin-top margin-bottom">
						<view class="text-black text-right margin-bottom-sm font-title-simhei" style="line-height: 1.75em;">
							规格:
							<text class="font-content-simsun">{{item.materialSpecs}}</text>
						</view>
						<view class="text-black text-right margin-top-sm font-title-simhei" style="line-height: 1.75em;">
							<text class="text-white" style="color: #f2f2f2;">asshole</text>
						</view>
					</view>
					
					<view 
						v-if="productShowType == 'button'"
						class="action margin-top margin-bottom margin-left margin-right"
					>
						<button 
							class="cu-btn shadow round font-title-simkai-nocolor bg-red"
							@tap="removeMaterial(item.id)"
						>删除</button>
						<!-- <button class="cu-btn shadow round font-title-simkai-nocolor" :class="choosedSouceIds.indexOf(item.id) !== -1? 'bg-red': 'bg-blue'">{{choosedSouceIds.indexOf(item.id) !== -1? '删除': '添加'}}</button> -->
					</view>
					
					<view v-if="productShowType == 'slide'" class="move">
						<!-- <view class="bg-blue" @tap="addMaterial(item.id, item.materialType, item.code, item.specs)">添加</view> -->
						<view class="bg-red" @tap="removeMaterial(item.id)">删除</view>
					</view>
				</view>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="editMaterial">修改</button>
				<!-- <button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="resetSearchFilter">重置</button> -->
				<button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="toNextStep">下一步</button>
			</view>
		</scroll-view>
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdMake'">
			<standardEditTable @itemChange="itemChange" :workers="workers" :picInt="item.picInt" :title="item.title" :itemData="item.itemData" v-for="(item, index) in tableList" :key="index"></standardEditTable>
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="closePages">关闭</button>
				<button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="saveMake">保存</button>
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
				'mode': {},
				'modePccp': [{
					'id': 'mtkHydrostatic',
					'title': '水压检测信息',
					'idPrefix': 'Hydr',
					'itemTitles': [{
						'id': ['mck', 'Date'],
						'title': '水压作业时间',
						'type': 'date',
					}, {
						'id': ['mtk', 'WorkerIds'],
						'title': '水压作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '水压检测人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '水压检测结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '水压检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkSteamCuring',
					'title': '蒸汽检测信息',
					'idPrefix': 'Sc',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '蒸汽作业时间',
						'type': 'date',
					},  {
						'id': ['mtk', 'WorkerIds'],
						'title': '蒸汽作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '蒸汽检测人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '蒸汽检测结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '蒸汽检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkWrappingWire',
					'title': '缠丝信息',
					'idPrefix': 'Ww',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '缠丝作业时间',
						'type': 'date',
					}, {
						'id': ['mtk', 'WorkerIds'],
						'title': '缠丝作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '缠丝检验人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '缠丝检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '缠丝检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkRollEjection',
					'title': '辊射',
					'idPrefix': 'Re',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '辊射作业时间',
						'type': 'date',
					}, {
						'id': ['mtk', 'WorkerIds'],
						'title': '辊射作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '辊射检验人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '辊射检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '辊射检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}],
				'modeSteelPipe': [{
					'id': 'mtkWelding',
					'title': '焊接信息',
					'idPrefix': 'Welding',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '焊接作业时间',
						'type': 'date',
					}, {
						'id': ['mtk', 'WorkerIds'],
						'title': '焊接作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '焊缝检验人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '焊缝检验结论',
						'type': 'text',
					}, {
						'id': ['', 'AttOne'],
						'title': '焊缝外观检测报告',
						'type': 'imageList',
					}, {
						'id': ['', 'AttTwo'],
						'title': '焊缝探伤检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}, ],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkAnti',
					'title': '防腐信息',
					'idPrefix': 'Anti',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '防腐作业时间',
						'type': 'date',
					}, {
						'id': ['mtk', 'WorkerIds'],
						'title': '防腐作业人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'WorkerIds'],
						'title': '防腐检验人员',
						'type': 'workerList',
					}, {
						'id': ['mck', 'Content'],
						'title': '防腐检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '防腐检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerIds'],
						'title': '监造人员',
						'type': 'workerList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					},],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}],
				'tableList': [],
				'workers': [],
				'makeCommitObject': {},                                    // 提交对象
				'frontBarHeight': 500,
			}
		},
		onShow: function () {
			this.loadChoosedSource();
		},
		methods: {
			/**
			 * @description 编辑原材料
			 */
			editMaterial: function() {
				uni.navigateTo({
					url: '/pages/make/materialChoose?productId=' + this.productId + "&categoryId=" + this.pdBaseInfoData.categoryId
				});
			},
			/**
			 * @description 长按添加或者删除
			 * @param {Object} id 原材料id
			 * @param {Object} materialType 原材料materialType
			 * @param {Object} code 原材料code
			 * @param {Object} specs 原材料specs
			 */
			longpress: function(id, materialType, code, specs, pressType) {
				if (pressType == 'longpress' && this.productShowType != 'longpress') {
					return;
				}
				
				if (this.productShowType == 'longpress' || this.productShowType == 'button') {
					if (this.choosedSouceIds.indexOf(id) !== -1) {
						this.removeMaterial(id);
					}
					else {
						this.addMaterial(id, materialType, code, specs);
					}
				}
			},
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
						uni.setStorageSync('flushPage', true);
						uni.showToast({
							title: '制作信息保存成功'
						});
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
						this.title = data.product.code;
						this.pdBaseInfoData = data.product;
						this.loadSourceData();
						this.loadChoosedSource();
						uni.setStorage({
							key: 'pdBaseInfoData',
							data: JSON.stringify(this.pdBaseInfoData)
						});
					}
				});
			},
			/**
			 * @description 加载原材料信息
			 */
			loadSourceData: function() {
				this.productRequest.selectMaterial(
					this.code, this.materialType, this.enterDate, this.pdBaseInfoData.categoryId, 1, 99999, data => {
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
				if (this.productShowType == 'slide') {
					this.listTouchStart = e.touches[0].pageX;
				}
			},
			// ListTouch计算方向
			ListTouchMove: function(e) {
				if (this.productShowType == 'slide') {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
				}
			},
			// ListTouch计算滚动
			ListTouchEnd: function(e) {
				if (this.productShowType == 'slide') {
					if (this.listTouchDirection == 'left') {
						this.modalName = e.currentTarget.dataset.target;
					} else {
						this.modalName = null;
					}
					this.listTouchDirection = null;
				}
			},
			/**
			 * @description 计算产品数据
			 */
			calcMakeData: function() {
				this.tableList = [];
				if (this.rawProductData.productCategory !== null && this.rawProductData.productCategory !== undefined) {
					if (this.rawProductData.productMade !== null && this.rawProductData.productMade !== undefined) {
						this.mode[this.rawProductData.productCategory.name].forEach(item => {
							let data = this.rawProductData;
							if (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0) {
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
				this.makeCommitObject[params.id] = params.value;
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
			this.mode['PCCP'] = this.modePccp;
			this.mode['钢管'] = this.modeSteelPipe;
			
			// 获取工作者
			let workersBuf = uni.getStorageSync('workers');
			// console.log(workersBuf);
			if (workersBuf) {
				this.workers = JSON.parse(workersBuf);
			}
			else {
				this.productRequest.selectWorker(data => {
					this.workers = data;
					uni.setStorage({
						key: 'workers',
						data: JSON.stringify(data),
					});
				});
			}
			
			this.productId = (option.productId? option.productId: this.productId);
			this.loadProductInfo();
		},
		mounted:function(){
			this.mode['PCCP'] = this.modePccp;
			this.mode['钢管'] = this.modeSteelPipe;
			
			this.TabPage_tabInfo.TabItems = [{
				title: '原材料',
				id: 'pdSource'
			}, {
				title: '产品制作',
				id: 'pdMake'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
			
			this.calcFlowHeight();
		}
	}
</script>

<style>

</style>
