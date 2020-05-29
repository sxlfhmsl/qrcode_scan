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
				<input class="radius margin" placeholder="材料编号" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="code"/>
				<input class="radius margin" placeholder="品种名称" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="materialType"/>
				<input class="radius margin" placeholder="进场时间" style="max-width: 30%; border-bottom: grey solid 1px;" v-model="enterDate" disabled="true"/>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="resetSearchFilter">重置</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="toNextStep">下一步</button>
			</view>
		</scroll-view>
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdMake'">
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
	
	export default {
		components: {
			pdBaseInfo
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
					
				}
			},
			resetSearchFilter: function(e) {
				this.code = '';
				this.materialType = '';
				this.enterDate = '';
				this.loadSourceData();
			},
			/**
			 * @description 加载产品信息
			 */
			loadProductInfo: function() {
				this.productRequest.detailById(this.projectId, data => {
					this.rawProductData = data;
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
				this.materialRequest.list(this.projectId, data => {
					if (data != null) {
						this.choosedSouceList = data;
						this.choosedSouceCodes = [];
						this.choosedSouceList.forEach(item => {
							this.choosedSouceIds.push(item.materialId);
						});
					}
				});
			}
		},
		onLoad: function(option) {
			this.projectId = (option.projectId? option.projectId: this.projectId);
			this.loadProductInfo();
			this.loadSourceData();
			this.loadChoosedSource();
		},
		mounted:function(){
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
