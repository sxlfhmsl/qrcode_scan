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
					*收货时间:
				</view>
				
				<view
					class="padding-sm col-auto-line bg-white solid-right"
					style="flex: auto; width: 75%; background-color: white"
				>
					<picker mode="date" @change="dateChange($event)" :value="recvDate" style="height: 100%; width: 100%;">
						<input class="text-right" v-model="recvDate" disabled="true" style="height: 100%; width: 100%;"/>
					</picker>
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
				'recvDate': '',
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
					if (this.recvDate != null && this.recvDate != '') {
						this.productRequest.receive(this.productId, this.recvDate, result => {
							uni.showToast({
								title: '收货成功'
							});
							uni.setStorageSync('flushPage', true);
							uni.navigateBack({
								
							});
						});
					}
					else {
						uni.showToast({
							title: '请输入收货日期'
						});
					}
				}
			},
			dateChange: function(e) {
				this.recvDate = e.detail.value;
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
