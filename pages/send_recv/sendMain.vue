<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-deliver" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<view style="height: 210rpx;">
			<view style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<pdBaseInfo :itemData="pdBaseInfoData"></pdBaseInfo>
			</view>
		</view>
		
		<scroll-view>
			<view class="flex margin-left-sm margin-right-sm margin-top-sm solid-left solid-bottom solid-top">
				<view 
					class="padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					*发货时间:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<picker mode="date" :value="sendData.date" @change="dateChange($event)" style="height: 100%; width: 100%;">
						<input class="text-right" v-model="sendData.date" disabled="true" style="height: 100%; width: 100%;"/>
					</picker>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					*客户单位:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					发货地址:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<input v-model="sendData.sendAddr" style="height: 100%; width: 100%;"/>
				</view>
			</view>
			
			<view class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top">
				<view 
					class="padding-sm col-auto-line text-white text-center solid-right bg-gradual-blue" 
					style="flex: auto; width: 25%;"
				>
					收货地址:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<input v-model="sendData.recvAddr" style="height: 100%; width: 100%;"/>
				</view>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin" @tap="closePages">关闭</button>
				<button class="cu-btn bg-blue round lg shadow margin" @tap="saveRecv">保存</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import ProductRequest from "@/pages/components/network/request/product";
	
	export default {
		components: {
			pdBaseInfo
		},
		data() {
			return {
				'productId': null,
				'productRequest': new ProductRequest(),                     // 产品网络请求对象
				'rawProductData': null,                                     // 原始数据
				'pdBaseInfoData': {},                                       // 基础页面显示数据
				'title': '',                                                // 标题
				'sendData': {                                               // 发货数据
					'date': '',                                             // 日期
					'unit': {                                               // 客户单位
						'id': null,
						'name': ''
					},
					'sendAddr': '',                                         // 发货地址
					'recvAddr': '',                                         // 收货地址
				}
			}
		},
		methods: {
			/**
			 * @description 加载产品信息
			 */
			loadProductInfo: function() {
				this.productRequest.detailById(this.productId, data => {
					this.rawProductData = data;
					if (data !== null) {
						this.title = data.product.name;
						this.pdBaseInfoData = data.product;
					}
				});
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
			 * @description 收货
			 * @param {Object} e 事件
			 */
			saveRecv: function(e) {
				if (this.productId !== null) {
					if (this.sendData.date == '') {
						uni.showToast({
							title: '请输入发货日期'
						});
						return;
					}
					else if (this.sendData.unit.id == null) {
						uni.showToast({
							title: '请输入单位'
						});
						return;
					}
					else {
						this.productRequest.delivery(this.productId, 
							this.sendData.date, undefined, this.sendData.unit.id, 
							this.sendData.unit.name, this.sendData.sendAddr, 
							this.sendData.recvAddr, result => {
								uni.showToast({
									title: '发货完成'
								});
								uni.navigateBack({
									
								});
						});
					}
				}
			},
			dateChange: function(e) {
				this.sendData.date = e.detail.value;
			}
		},
		onLoad: function(option) {
			this.productId = (option.productId? option.productId: this.productId);
			this.loadProductInfo();
		},
	}
</script>

<style>
	* {
		font-size: 25rpx;
	}
</style>
