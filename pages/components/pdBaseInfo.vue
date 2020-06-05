<template>
	<view class="bg-white padding-sm">
		<view class="grid text-center col-4">
			<view class="col-title text-left font-title-simhei" style="color: gray;">管节号</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.code}}</view>
			<view class="col-title text-left font-title-simhei" style="color: gray;">产品类型</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.categoryName}}</view>
			
			<view class="col-title text-left font-title-simhei" style="color: gray;">制造单位</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.deptName}}</view>
			<view class="col-title text-left font-title-simhei" style="color: gray;">工程名称</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.projectName}}</view>
			
			<view class="col-title text-left font-title-simhei" style="color: gray;">产品规格</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.specs}}</view>
			<view class="col-title text-left font-title-simhei" style="color: gray;">牌号</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.brandNum}}</view>
			
			<view class="col-title text-left font-title-simhei" style="color: gray;">制作标准</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.standard}}</view>
			<view class="col-title text-left font-title-simhei" style="color: gray;">生产日期</view>
			<view class="col-content text-left text-black font-content-simsun">{{itemData == null? '': itemData.createDate}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pdBaseInfo',
		props: {
			itemData: {
				required: true,
				default: null
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.col-title, .col-content {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
	.col-title {
		width: 20% !important;
		word-wrap:break-word;
		word-break:normal; 
	}
	
	.col-content {
		width: 30% !important;
		word-wrap:break-word;
		word-break:normal; 
	}
</style>
