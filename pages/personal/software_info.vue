<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				关于软件
			</block>
		</cu-custom>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-title text-blue"></text>
					<text class="text-grey">名称</text>
					<text class="text-grey custom-text-right">{{this.softwareInfo.defaultTitle}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-people text-blue"></text>
					<text class="text-grey">版权所属</text>
					<text class="text-grey custom-text-right">{{this.softwareInfo.owner}}</text>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-blue"></text>
					<text class="text-grey">版本号</text>
					<text class="text-grey custom-text-right">{{this.softwareInfo.version}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.custom-text-right {
		position: absolute;
		right: 60rpx;
	}
</style>
