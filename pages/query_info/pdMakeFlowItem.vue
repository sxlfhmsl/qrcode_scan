<template>
	<view class="margin">
		<view class="flex">
			<view class="flex-treble padding-sm col-auto-line text-white soild" style="width: 100%; background-color: #6495ED;">焊接作业信息</view>
		</view>
		
		<view class="flex">
			<view class="padding-sm col-auto-line text-white bg-grey solid-left solid-bottom" style="width: 20%">作业时间</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom" style="width: 30%"></view>
			<view class="padding-sm col-auto-line text-white bg-grey solid-left solid-bottom" style="width: 20%">作业人员</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: 30%"></view>
		</view>
		
		<view class="flex">
			<view class="padding-sm col-auto-line text-white bg-grey solid-left solid-bottom" style="width: 20%">作业内容</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: 80%"></view>
		</view>
		
		<view class="flex">
			<view class="padding-sm col-auto-line text-white bg-grey solid-left solid-bottom" style="width: 20%">作业图片</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: 80%"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pdMakeFlowItem',
		data() {
			return {
			}
		},
		props: {
			flowItem: {
				required: true,
			},
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
