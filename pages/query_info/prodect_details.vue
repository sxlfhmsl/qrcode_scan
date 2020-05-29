<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
		</cu-custom>
		
		<view style="height: 300rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo  v-if="itemPermession['pdBaseInfo'].show" :itemData="viewData.pdBaseInfo"></pdBaseInfo>
				
				<!-- 滚动条 -->
				<scroll-view scroll-x class="bg-white nav solid-top solid-bottom" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
					<view 
						v-if="itemPermession[item.id].show"
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
		
		<pdInBankInfo v-if="itemPermession.pdInBankInfo.show" v-show="TabPage_tabInfo.TabCur==='pdInBankInfo'" :itemData="viewData.pdInBankInfo"></pdInBankInfo>
		<pdInstall v-if="itemPermession.pdInstall.show" v-show="TabPage_tabInfo.TabCur==='pdInstall'" :itemData="viewData.pdInstall"></pdInstall>
		<pdMakeFlow v-if="itemPermession.pdMakeFlow.show" v-show="TabPage_tabInfo.TabCur==='pdMakeFlow'" :itemData="viewData.pdMakeFlow"></pdMakeFlow>
		<pdSendRecv v-if="itemPermession.pdSendRecv.show" v-show="TabPage_tabInfo.TabCur==='pdSendRecv'" :itemData="viewData.pdSendRecv"></pdSendRecv>
		<pdSourceInfo v-if="itemPermession.pdSourceInfo.show" v-show="TabPage_tabInfo.TabCur==='pdSourceInfo'" :itemData="viewData.pdSourceInfo"></pdSourceInfo>
		
		<!-- 留白 -->
		<view style="height: 20rpx; width: 100%;"></view>
	</view>
</template>

<script>
	import TabPage from '@/pages/components/custom-tab-page';
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import pdInBankInfo from '@/pages/query_info/pdInBankInfo';
	import pdInstall from '@/pages/query_info/pdInstall';
	import pdMakeFlow from '@/pages/query_info/pdMakeFlow';
	import pdSendRecv from '@/pages/query_info/pdSendRecv';
	import pdSourceInfo from '@/pages/query_info/pdSourceInfo';
	
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
			pdSourceInfo
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
						show: false,
						perNums: [2],
					},
					'pdInstall': {
						show: false,
						perNums: [5],
					},
					'pdMakeFlow': {
						show: false,
						perNums: [1],
					},
					'pdSendRecv': {
						show: false,
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
				Object.keys(this.itemPermession).forEach(key => {
					if (this.itemPermession[key].perNums != null && this.itemPermession[key].perNums != undefined) {
						this.itemPermession[key].perNums.forEach(num => {
							this.permissionRequest.data(num, itemId, (data) => {
								this.itemPermession[key].show = data;
							});
						});
					}
				});
			},
			/**
			 * @description 通过id加载数据
			 * @param {Object} itemId id
			 */
			loadById: function(itemId) {
				this.productRequest.detailById(itemId, (data) => {
					this.saveRawData(data);
				});
				this.checkItemPermission(itemId);
			},
			/**
			 * @description 通过code加载数据
			 * @param {Object} ItemCode 编码
			 */
			loadByCode: function(ItemCode) {
				this.productRequest.productByCode(ItemCode, (data) => {
					this.saveRawData(data);
					this.checkItemPermission(data.product.id);
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
			this.TabPage_tabInfo.TabItems = [{
				title: '原材料信息',
				id: 'pdSourceInfo'
			}, {
				title: '制作流程',
				id: 'pdMakeFlow'
			}, {
				title: '入库信息',
				id: 'pdInBankInfo'
			}, {
				title: '发货/收货',
				id: 'pdSendRecv'
			}, {
				title: '产品安装',
				id: 'pdInstall'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
