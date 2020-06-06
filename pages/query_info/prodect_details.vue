<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
		</cu-custom>
		
		<view style="height: 80rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				
				<!-- 滚动条 -->
				<scroll-view scroll-x class="bg-white nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
					<view 
						v-if="item.id == 'baseInfo'? true: itemPermession[item.id].show"
						class="cu-item font-title-simhei-nocolor"
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
		
		<!-- 基本信息 -->
		<pdBaseInfo  v-if="itemPermession['pdBaseInfo'].show" v-show="TabPage_tabInfo.TabCur==='baseInfo'" :itemData="viewData.pdBaseInfo"></pdBaseInfo>
		
		
		<!-- 制作流程 -->
		<view v-if="itemPermession.pdSourceInfo.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">原材料信息</view>
		<pdSourceInfo v-if="itemPermession.pdSourceInfo.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" :itemData="viewData.pdSourceInfo"></pdSourceInfo>
		
		<view v-if="itemPermession.pdSourceInfo.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">制作</view>
		<pdMakeFlow v-if="itemPermession.pdMakeFlow.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" :itemData="viewData.pdMakeFlow"></pdMakeFlow>
		
		<view v-if="itemPermession.pdInBankInfo.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">入库</view>
		<pdInBankInfo v-if="itemPermession.pdInBankInfo.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" :itemData="viewData.pdInBankInfo"></pdInBankInfo>
		
		<view v-if="itemPermession.pdSendRecv.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">发货</view>
		<pdSend v-if="itemPermession.pdSendRecv.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" :itemData="viewData.pdSendRecv"></pdSend>
		
		
		<!-- 安装流程 -->
		<view v-if="itemPermession.pdSendRecv.show" v-show="TabPage_tabInfo.TabCur==='pdInstall'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">收货</view>
		<pdRecv v-if="itemPermession.pdSendRecv.show" v-show="TabPage_tabInfo.TabCur==='pdInstall'" :itemData="viewData.pdSendRecv"></pdRecv>
		
		<view v-if="itemPermession.pdSourceInfo.show" v-show="TabPage_tabInfo.TabCur==='pdInstall'" class="text-blue padding margin-left-sm margin-right-sm margin-top font-title-simhei-nocolor" style="background-color: #f2f2f2; margin-top: 66rpx;">安装</view>
		<pdInstall v-if="itemPermession.pdInstall.show" v-show="TabPage_tabInfo.TabCur==='pdInstall'" :itemData="viewData.pdInstall"></pdInstall>
		
	</view>
</template>

<script>
	import TabPage from '@/pages/components/custom-tab-page';
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import pdInBankInfo from '@/pages/query_info/pdInBankInfo';
	import pdInstall from '@/pages/query_info/pdInstall';
	import pdMakeFlow from '@/pages/query_info/pdMakeFlow';
	import pdSourceInfo from '@/pages/query_info/pdSourceInfo';
	
	import pdSendRecv from '@/pages/query_info/pdSendRecv';
	import pdSend from '@/pages/query_info/pdSend';
	import pdRecv from '@/pages/query_info/pdRecv';
	
	// 网络请求类
	import ProductRequest from '@/pages/components/network/request/product';
	import PermissionRequest from '@/pages/components/network/request/permission';
	
	export default {
		extends: TabPage,
		components: {
			pdBaseInfo,
			pdInBankInfo,
			pdInstall,
			pdMakeFlow,
			pdSendRecv,
			pdSourceInfo,
			pdSend,
			pdRecv
		},
		data() {
			return {
				title: '',                                              // 标题
				itemType: 'id',                                         // 产品数据加载类型
				itemCode: '',                                           // 产品加载标识
				itemPermession: {                                       // 前端权限
					'pdBaseInfo': {
						show: true,
						perNums: null,
					},
					'pdInBankInfo': {
						show: true,
						perNums: [2],
					},
					'pdInstall': {
						show: true,
						perNums: [5],
					},
					'pdMakeFlow': {
						show: true,
						perNums: [1],
					},
					'pdSendRecv': {
						show: true,
						perNums: [3, 4],
					},
					'pdSourceInfo': {
						show: true,
						perNums: null,
					},
				},
				productData: null,                                      // 产品查询数据
				viewData: {                                             // 视图绑定的数据
					'pdBaseInfo': null,
					'pdInBankInfo': null,
					'pdInstall': null,
					'pdMakeFlow': null,
					'pdSendRecv': null,
					'pdSourceInfo': null,
				},
				permissionRequest: new PermissionRequest(),             // 网络请求类-----权限
				productRequest: new ProductRequest(),                   // 网络请求类-----产品信息
			}
		},
		methods: {
			/**
			 * @description 检查权限
			 * @param {Object} itemId id
			 */
			checkItemPermission: function(itemId) {
				// Object.keys(this.itemPermession).forEach(key => {
				// 	if (this.itemPermession[key].perNums != null && this.itemPermession[key].perNums != undefined) {
				// 		this.itemPermession[key].perNums.forEach(num => {
				// 			this.permissionRequest.data(num, itemId, (data) => {
				// 				this.itemPermession[key].show = data;
				// 			});
				// 		});
				// 	}
				// });
			},
			/**
			 * @description 通过id加载数据
			 * @param {Object} itemId id
			 */
			loadById: function(itemId) {
				this.productRequest.detailById(itemId, (data) => {
					if (data == null) {
						uni.navigateBack({
							
						});
					}
					else {
						this.saveRawData(data);
					}
				});
				this.checkItemPermission(itemId);
			},
			/**
			 * @description 通过code加载数据
			 * @param {Object} ItemCode 编码
			 */
			loadByCode: function(ItemCode) {
				this.productRequest.productByCode(ItemCode, (data) => {
					if (data == null) {
						uni.navigateBack({
							
						});
					}
					else {
						this.saveRawData(data);
						this.checkItemPermission(data.product.id);
					}
				});
			},
			/**
			 * @description 保留原始数据
			 * @param {Object} data 数据
			 */
			saveRawData: function(data) {
				this.productData = data;
				this.title = this.productData.product.name;
				this.viewData.pdBaseInfo = this.productData.product;
				this.viewData.pdSourceInfo = (this.productData.materialList? this.productData.materialList: []);
				this.viewData.pdMakeFlow = {'productCategory': this.productData.productCategory, 'productMade': this.productData.productMade};
				this.viewData.pdInBankInfo = (this.productData.productStorage? this.productData.productStorage: null);
				this.viewData.pdSendRecv = (this.productData.productDelivery? this.productData.productDelivery: null);
				if (this.viewData.pdSendRecv) {
					this.$set(this.viewData.pdSendRecv, 'place', this.productData.productInstall.place);
				}
				this.viewData.pdInstall = {'productCategory': this.productData.productCategory, 'productInstall': this.productData.productInstall};
			}
		},
		onLoad:function(option){
			this.itemType = (option.itemType? option.itemType: this.itemType);
			this.itemCode = (option.itemCode? option.itemCode: this.itemCode);
			
			if (this.itemType == 'id') {
				this.loadById(this.itemCode);
			}
			else if (this.itemType == 'code') {
				this.loadByCode(this.itemCode);
			}
		},
		mounted:function(){
			// this.TabPage_tabInfo.TabItems = [{
			// 	title: '原材料信息',
			// 	id: 'pdSourceInfo'
			// }, {
			// 	title: '制作流程',
			// 	id: 'pdMakeFlow'
			// }, {
			// 	title: '入库信息',
			// 	id: 'pdInBankInfo'
			// }, {
			// 	title: '发货/收货',
			// 	id: 'pdSendRecv'
			// }, {
			// 	title: '产品安装',
			// 	id: 'pdInstall'
			// }];
			
			this.TabPage_tabInfo.TabItems = [{
				title: '基本信息',
				id: 'baseInfo'
			}, {
				title: '制作流程',
				id: 'pdMakeFlow'
			}, {
				title: '安装流程',
				id: 'pdInstall'
			}];
			
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
