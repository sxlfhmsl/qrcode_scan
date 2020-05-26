<template>
	<view class="bg-white padding-sm">
		<view class="grid text-center col-4">
			<view class="margin-bottom-sm col-title">生产单位</view>
			<view class="margin-bottom-sm col-content"></view>
			<view class="margin-bottom-sm col-title">产品名称</view>
			<view class="margin-bottom-sm col-content"></view>
			
			<view class="margin-bottom-sm col-title">产品编号</view>
			<view class="margin-bottom-sm col-content"></view>
			<view class="margin-bottom-sm col-title">产品类型</view>
			<view class="margin-bottom-sm col-content"></view>
			
			<view class="margin-bottom-sm col-title">使用部位</view>
			<view class="margin-bottom-sm col-content"></view>
			<view class="margin-bottom-sm col-title"></view>
			<view class="margin-bottom-sm col-content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pdBaseInfo',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
