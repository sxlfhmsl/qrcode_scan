<template name="worktable">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">
				<!-- 李家岩水库输水管道 -->
				{{this.softwareInfo.defaultTitle}}
			</block>
			<!-- <block slot="right">
				<text class="padding-left-sm">李家岩水库</text>
				<text class="padding-right-sm">输水管道</text>
			</block> -->
		</cu-custom>
		<image 
			src="../../static/background/02.jpg" 
			mode="aspectFill" 
			style="width: 100vw; position: fixed; z-index: 1;" 
			:style="'height: calc(100vh - ' + CustomBar + 'rpx)'"
		></image>
		<view class="text-center text-white font-content-simkai" style="width: 100vw; font-size: 2em; position: fixed; z-index: 99; margin-top: 8vh">李家岩水库输水管道</view>
		<!-- 所有的按钮 -->
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator v-if="item.show" hover-class="none" :url="item.url" class="nav-li text-center" navigateTo :class="'bg-'+item.color"
				 style="height: 20vh"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in models" :key="index">
					<view :class="item.icon" style="font-size: 5em; width: 100%; margin-top: 1.5vh;"></view>
					<view class="nav-title font-title-simkai-nocolor">{{item.title}}</view>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import PermissionRequest from '@/pages/components/network/request/permission';
	export default {
		name: 'worktable',
		data() {
			return {
				models: [{
					show: true,
					perNums: undefined,
					title: '信息查询',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-qrcode',
					url: '/pages/query_info/query_info'
					
				}, {
					show: false,
					perNums: [1],
					title: '制作上传',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-punch',
					url: '/pages/make/make'
				}, {
					show: false,
					perNums: [5],
					title: '安装上传',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-repair',
					url: '/pages/install/install'
				}, {
					show: false,
					perNums: [3, 4],
					title: '发货/收货',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-deliver',
					url: '/pages/send_recv/send_recv'
				}]
			}
		},
		methods: {
			/**
			 * @description 校验模块权限
			 */
			checkModePermission: function() {
				this.models.forEach(model => {
					if (model.perNums !== undefined && model.perNums !== null) {
						model.perNums.forEach(perNum => {
							(new PermissionRequest()).mode(
								perNum,
								(data) => {
									model.show = data;
								}
							);
						});
					}
				});
			}
		},
		mounted:function(){
			this.checkModePermission();
		}
	}
</script>

<style>
	.page {
		margin-top: 20vh;
	}
</style>
