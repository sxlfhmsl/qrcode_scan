<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				安装上传
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-repair" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<!-- 滚动条 -->
		<view style="height: 100rpx;">
			<scroll-view scroll-x class="bg-white nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft" style="
				position: fixed;
				width: 100%;
				z-index: 1024;
			" :style="'top:' + CustomBar + 'px'">
				<view
					class="cu-item"
					:class="item.id==TabPage_tabInfo.TabCur?'text-blue cur':''" v-for="(item,index) in TabPage_tabInfo.TabItems"
					:key="index"
					@tap="TabPage_tabSelect"
					:data-id="item.id"
					:scroll-left="TabPage_tabInfo.scrollLeft"
				>
					{{item.title}}
				</view>
			</scroll-view>
		</view>
		
		<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<projectList 
				v-show="TabPage_tabInfo.TabCur === 'willInstall'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.willInstall"
				:btnExtends="btnExtends"
				@productTap="productTap"
			></projectList>
			
			<projectList 
				v-show="TabPage_tabInfo.TabCur === 'installing'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.installing"
				:btnExtends="btnExtends"
				@productTap="productTap"
			></projectList>
		</you-scroll>
	</view>
</template>

<script>
	import TabPage from '@/pages/components/custom-tab-page';
	import projectList from '@/pages/components/projectList';
	import youScroll from '@/you-scroll/components/you-scroll';
	import ProductRequest from '@/pages/components/network/request/product';
	
	export default {
		extends: TabPage,
		components: {
			projectList,
			youScroll
		},
		data() {
			return {
				'pageInfo': {
					'willInstall': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
					'installing': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					}
				},
				'projectItems': {
					'willInstall': [],
					'installing': []
				},
				productRequest: new ProductRequest(),
				btnExtends: [{
					'type': 'install',
					'color': 'red',
					'title': '安装'
				}]
			}
		},
		methods: {
			onPullDown: function(done) { // 下拉刷新
				this.flushData(done, 'down');
			},
			onScroll: function(e) { // 监听滚动
			},
			onLoadMore: function(e) { // 加载更多
				this.flushData(undefined, 'up');
			},
			/**
			 * @description 子组件回传项目点击事件
			 * @param {Object} params 参数 结构{'btnType': btnType, 'productId': productId}
			 */
			productTap: function(params) {
				if (params.btnType === 'install') {
					uni.navigateTo({
						url: '/pages/install/installMain?productId=' + params.productId
					})
				}
			},
			/**
			 * @description 刷新数据
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 * @param {Object} flushType 刷新类型
			 */
			flushData: function(stopFlushCallback, flushType) {
				if (this.TabPage_tabInfo.TabCur === 'willInstall') {
					let pageInfo = this.pageInfo.willInstall;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
						}
						else {
							return;
						}
					}
					else {
						this.projectItems.willInstall = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataWillInstall(stopFlushCallback);
				}
				else if (this.TabPage_tabInfo.TabCur === 'installing') {
					let pageInfo = this.pageInfo.installing;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
						}
						else {
							return;
						}
					}
					else {
						this.projectItems.installing = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataInstalling(stopFlushCallback);
				}
			},
			/**
			 * @description 刷新待安装列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataWillInstall: function(stopFlushCallback) {
				// 0
				this.productRequest.installList(
					undefined, 1, 
					this.pageInfo.willInstall.page, this.pageInfo.willInstall.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo.willInstall.total = data.total;
							this.projectItems.willInstall = this.projectItems.willInstall.concat(data.records);
						}
				});
			},
			/**
			 * @description 刷新安装中列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataInstalling: function(stopFlushCallback) {
				// 1
				this.productRequest.installList(
					undefined, 2, 
					this.pageInfo.installing.page, this.pageInfo.installing.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo.installing.total = data.total;
							this.projectItems.installing = this.projectItems.installing.concat(data.records);
						}
				});
			}
		},
		mounted: function() {
			// 添加tab点击项
			this.TabPage_tabInfo.TabItems = [{
				title: '待安装',
				id: 'willInstall'
			}, {
				title: '安装中',
				id: 'installing'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
			
			// 刷新数据
			this.flushDataWillInstall();                   // 待安装
			this.flushDataInstalling();                 // 安装中
		}
	}
</script>

<style>

</style>
