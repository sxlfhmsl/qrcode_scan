<template name="worktable">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">
				{{this.softwareInfo.defaultTitle}}
			</block>
		</cu-custom>
		
		<!-- 所有的按钮 -->
		<scroll-view scroll-y class="page">
			<view class="nav-list">
				<navigator v-if="item.show" hover-class="none" :url="item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in models" :key="index">
					<view class="nav-title" style="font-size: 1em; margin-right: 2em;">{{item.title}}</view>
					<view class="nav-name" style="margin-bottom: 0rpx;">{{item.childCount}}</view>
					<text :class="item.icon"></text>
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
					perNum: undefined,
					title: '信息查询',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-qrcode',
					url: '/pages/query_info/query_info'
					
				}, {
					show: false,
					perNum: 1,
					title: '制作上传',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-punch',
					url: '/pages/make/make'
				}, {
					show: false,
					perNum: 5,
					title: '安装上传',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-repair',
					url: '/pages/install/install'
				}, {
					show: false,
					perNum: 3,
					title: '发货',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-deliver',
					url: '/pages/send/send'
				}, {
					show: false,
					perNum: 4,
					title: '收货',
					childCount: '1',
					color: 'blue',
					icon: 'cuIcon-goods',
					url: '/pages/recv/recv'
				}]
			}
		},
		methods: {
			/**
			 * @description 校验模块权限
			 */
			checkModePermission: function() {
				this.models.forEach(model => {
					if (model.perNum !== undefined && model.perNum !== null) {
						(new PermissionRequest()).mode(
							model.perNum,
							(data) => {
								model.show = data;
							}
						);
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
		margin-top: 30vh;
	}
</style>
