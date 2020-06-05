<template>
	<view class="bg-white padding-sm">
		<view class="grid text-center col-4">
			<view class="col-title text-left font-title-simhei solid" style="color: gray; background-color: #f2f2f2;">管节号</view>
			<view class="col-content text-left text-black font-content-simsun solid-top solid-bottom solid-right">{{itemData == null? '': itemData.code}}</view>
			<view class="col-title text-left font-title-simhei solid-top solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">产品类型</view>
			<view class="col-content text-left text-black font-content-simsun solid-top solid-bottom solid-right">{{itemData == null? '': itemData.categoryName}}</view>
			
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">制造单位</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.deptName}}</view>
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">工程名称</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.projectName}}</view>
			
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">产品规格</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.specs}}</view>
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">牌号</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.brandNum}}</view>
			
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">制作标准</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.standard}}</view>
			<view class="col-title text-left font-title-simhei solid-left solid-bottom solid-right" style="color: gray; background-color: #f2f2f2;">生产日期</view>
			<view class="col-content text-left text-black font-content-simsun solid-left solid-bottom solid-right">{{itemData == null? '': itemData.createDate}}</view>
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
		padding-left: 10rpx;
		padding-right: 10rpx;
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
