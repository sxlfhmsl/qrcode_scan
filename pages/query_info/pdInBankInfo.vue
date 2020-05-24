<template>
	<view>
		<view class="flex margin-top-sm margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 6em; background-color: #dad8d8;">入库时间</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 6em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 6em; background-color: #dad8d8;">负责人</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 6em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 6em; background-color: #dad8d8;">合格证编号</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 6em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 6em; background-color: #dad8d8;">合格证照片</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 6em)"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pdInBankInfo',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
	* {
		font-size: 25rpx !important;
	}
</style>
