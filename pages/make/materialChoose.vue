<!-- 原材料选择界面 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				原材料修改
			</block>
			<block slot="right">
				<button class="cu-btn lg round text-white font-content-simkai" style="background-color: rgba(255,255,255,0);" @tap="resetSearchFilter">重置</button>
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
				<view class="text-center flex">
					<input @change="searchFilterChange" class="radius margin font-content-simhei" placeholder="材料编号" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="code"/>
					<input @change="searchFilterChange" class="radius margin font-content-simhei" placeholder="品种名称" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="materialType"/>
					<picker class="font-content-simhei" mode="date" @change="dateChange" style="width: 60%;">
						<input class="radius margin font-content-simhei" placeholder="进场时间" style="max-width: 100%; border-bottom: grey solid 1px;" v-model="enterDate" disabled="true"/>
					</picker>
				</view>
			</view>
		</view>
		
		<you-scroll :style="'height: calc(100vh - ' + (frontBarHeight + CustomBar) + 'rpx)'" ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<!-- 原材料 -->
			<view class="cu-list menu">
				<view 
					class="cu-item margin-bottom-sm margin-top-sm margin-left-sm radius" 
					:class="
						(modalName=='move-box-'+ index?'move-cur':'') + 
						(productShowType != 'slide'? ' margin-right-sm': ' ')
					"
					v-for="(item, index) in souceList"
					:key="index"
					:id="item.id" 
					@longpress="longpress(item.id, item.materialType, item.code, item.specs, 'longpress')"
					@touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
					style="padding-left: 2rpx; padding-right: 2rpx; background-color: #f2f2f2;"
					:style="choosedSouceIds.indexOf(item.id) !== -1? 'border: blue solid 2px;': ''"
				>
					<view class="content margin-top margin-bottom">
						<view class="text-black margin-bottom-sm font-title-simhei">
							品种:
							<text class="font-content-simsun">{{item.materialType}}</text>
						</view>
						<view class="text-black margin-top-sm font-title-simhei">
							编号:
							<text class="font-content-simsun">{{item.code}}</text>
						</view>
					</view>
					<view class="text-blue font-title-simkai-nocolor" 
					    v-if="choosedSouceIds.indexOf(item.id) !== -1"
						style="position: absolute;z-index: 99;font-size: 2em;opacity: 0.5;transform:rotate(-45deg);top: calc(50% - 0.75em); left: calc(50% - 2em);"
					>已选择</view>
					
					<view class="action margin-top margin-bottom">
						<view class="text-black text-right margin-bottom-sm font-title-simhei" style="line-height: 1.75em;">
							规格:
							<text class="font-content-simsun">{{item.specs}}</text>
						</view>
						<view class="text-black text-right margin-top-sm font-title-simhei" style="line-height: 1.75em;">
							时间:
							<text class="font-content-simsun">{{item.enterDate}}</text>
						</view>
					</view>
					
					<view 
						v-if="productShowType == 'button'"
						class="action margin-top margin-bottom margin-left margin-right"
						@tap="longpress(item.id, item.materialType, item.code, item.specs)"
					>
						<button class="cu-btn shadow round font-title-simkai-nocolor" :class="choosedSouceIds.indexOf(item.id) !== -1? 'bg-red': 'bg-blue'">{{choosedSouceIds.indexOf(item.id) !== -1? '删除': '添加'}}</button>
					</view>
					
					<view v-if="productShowType == 'slide'" class="move">
						<view class="bg-blue" @tap="addMaterial(item.id, item.materialType, item.code, item.specs)">添加</view>
						<view class="bg-red" @tap="removeMaterial(item.id)">删除</view>
					</view>
				</view>
			</view>
		</you-scroll>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import ProductRequest from "@/pages/components/network/request/product";
	import MaterialRequest from "@/pages/components/network/request/material";
	import youScroll from '@/you-scroll/components/you-scroll';
	
	export default {
		components: {
			pdBaseInfo,
			youScroll
		},
		data() {
			return {
				'pullup': {
					'text': '正在努力加载中......',
					'show': false,
				},
				pdBaseInfoData: {},
				title: '',
				'modalName': null,
				'listTouchStart': 0,
				'listTouchDirection': null,
				'choosedSouceIds': [],                                      // 选中的原材料id
				'choosedSouceList': [],                                     // 选中的原材料列表
				'souceList': [],                                            // 原材料列表
				'code': '',                                                 // 编码
				'materialType': '',                                         // 品种名称
				'enterDate': '',                                            // 进场日期
				'productRequest': new ProductRequest(),                     // 产品网络请求对象
				'materialRequest': new MaterialRequest(),                   // 原材料网络请求对象
				'productId': null,
				'page': 1,
				'pageLimit': 20,
				'total': 99999,
				'frontBarHeight': 400,
			}
		},
		methods: {
			stopFlushUp: function() {
				this.pullup.text = '正在努力加载中......';
				this.pullup.show = false;
			},
			resetSearchFilter: function(e) {
				this.code = '';
				this.materialType = '';
				this.enterDate = '';
				this.flushData();
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
			onPullDown: function(done) { // 下拉刷新
				this.flushData(done, 'down');
			},
			onScroll: function(e) { // 监听滚动
			},
			onLoadMore: function(e) { // 加载更多
				this.flushData(this.stopFlushUp, 'up');
			},
			/**
			 * @description 刷新数据
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 * @param {Object} flushType 刷新类型
			 */
			flushData: function(stopFlushCallback, flushType) {
				if (flushType === 'up') {
					if (this.total > (this.page * this.limit)) {
						this.page ++;
						this.pullup.text = '正在努力加载中......';
						this.pullup.show = true;
					}
					else {
						this.pullup.text = '没有更多的数据了';
						this.pullup.show = true;
						return;
					}
				}
				else {
					this.souceList.splice(0, this.souceList.length);
					this.page = 1;
					this.total = 99999;
				}
				this.loadSourceData(stopFlushCallback);
				this.loadChoosedSource();
			},
			/**
			 * @description 加载原材料信息
			 * @param {Function} stopFlushCallback 停止的回调
			 */
			loadSourceData: function(stopFlushCallback) {
				this.productRequest.selectMaterial(
					this.code, this.materialType, this.enterDate, this.page, this.pageLimit, data => {
						if (stopFlushCallback) {
							stopFlushCallback();
						}
						
						if (data != null) {
							this.souceList = data.records;
							this.total = data.total;
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
			dateChange: function(e) {
				this.enterDate = e.detail.value
				this.searchFilterChange();
			},
			searchFilterChange: function(e) {
				this.loadSourceData();
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
		onLoad: function(option){
			this.productId = (option.productId? option.productId: this.productId);
			if (this.productId) {
				this.flushData();
			}
			else {
				uni.navigateBack({
					
				});
			}
		},
		mounted: function(){
			uni.getStorage({
				key: 'pdBaseInfoData',
				success: data => {
					let pdBaseInfoData = JSON.parse(data.data);
					Object.keys(pdBaseInfoData).forEach(key => {
						this.$set(this.pdBaseInfoData, key, pdBaseInfoData[key]);
					});
					this.calcFlowHeight();
				}
			})
		}
	}
</script>

<style>

</style>
