<template>
	<view>
		<view class="flex margin-top-sm margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">实际使用部位</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="flex-treble padding-sm col-auto-line text-white soild" style="width: 100%; background-color: #5c9ed6;">安装作业信息</view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">加工作业时间</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom" style="width: calc(50% - 8em)"></view>
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">作业人员</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(50% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">加工作业内容</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">加工过程照片</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="flex-treble padding-sm col-auto-line text-white soild" style="width: 100%; background-color: #5c9ed6;">安装检验信息</view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">安装检验时间</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom" style="width: calc(50% - 8em)"></view>
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">检验人员</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(50% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">安装检验结论</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">安装检验照片</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="flex-treble padding-sm col-auto-line text-white soild" style="width: 100%; background-color: #5c9ed6;">业主代表</view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">业主检测时间</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom" style="width: calc(50% - 8em)"></view>
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">业主代表</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(50% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">业主代表检测结论</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
		
		<view class="flex margin-left-sm margin-right-sm">
			<view class="padding-sm col-auto-line text-white solid-left solid-bottom text-center" style="width: 8em; background-color: #dad8d8;">业主代表检测照片</view>
			<view class="padding-sm col-auto-line text-black bg-white solid-left solid-bottom solid-right" style="width: calc(100% - 8em)"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pdInstall',
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
