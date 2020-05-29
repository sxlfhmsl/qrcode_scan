<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				制作上传
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-punch" style="background-color: rgba(255,255,255,0);"></text>
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
				v-if="TabPage_tabInfo.TabCur === 'willMake'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.willMake"
				:btnExtends="btnExtends"
				@projectTap="projectTap"
			></projectList>
			
			<projectList 
				v-if="TabPage_tabInfo.TabCur === 'making'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.making"
				:btnExtends="btnExtends"
				@projectTap="projectTap"
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
					'willMake': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
					'making': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					}
				},
				'projectItems': {
					'willMake': [],
					'making': []
				},
				productRequest: new ProductRequest(),
				btnExtends: [{
					'type': 'make',
					'color': 'red',
					'title': '制作'
				}]
			}
		},
		methods: {
			onPullDown: function(done) { // 下拉刷新
				this.flushData(done, 'down');
			},
			onScroll: function(e) { // 监听滚动
				console.log(e.detail.scrollTop)
			},
			onLoadMore: function(e) { // 加载更多
				this.flushData(undefined, 'up');
			},
			/**
			 * @description 子组件回传项目点击事件
			 * @param {Object} params 参数 结构{'btnType': btnType, 'projectId': projectId}
			 */
			projectTap: function(params) {
				console.log(params);
			},
			/**
			 * @description 刷新数据
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 * @param {Object} flushType 刷新类型
			 */
			flushData: function(stopFlushCallback, flushType) {
				if (this.TabPage_tabInfo.TabCur === 'willMake') {
					let pageInfo = this.pageInfo.willMake;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
						}
						else {
							return;
						}
					}
					else {
						this.projectItems.willMake = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataWillMake(stopFlushCallback);
				}
				else if (this.TabPage_tabInfo.TabCur === 'making') {
					let pageInfo = this.pageInfo.making;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
						}
						else {
							return;
						}
					}
					else {
						this.projectItems.making = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataMaking(stopFlushCallback);
				}
			},
			/**
			 * @description 刷新待制作列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataWillMake: function(stopFlushCallback) {
				// 0
				this.productRequest.madeList(
					undefined, 0, 
					this.pageInfo.willMake.page, this.pageInfo.willMake.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo.willMake.total = data.total;
							this.projectItems.willMake = this.projectItems.willMake.concat(data.records);
						}
				});
			},
			/**
			 * @description 刷新制作中列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataMaking: function(stopFlushCallback) {
				// 1
				this.productRequest.madeList(
					undefined, 1, 
					this.pageInfo.making.page, this.pageInfo.making.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo.making.total = data.total;
							this.projectItems.making = this.projectItems.making.concat(data.records);
						}
				});
			}
		},
		mounted: function() {
			// 添加tab点击项
			this.TabPage_tabInfo.TabItems = [{
				title: '待制作',
				id: 'willMake'
			}, {
				title: '制作中',
				id: 'making'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
			
			// 刷新数据
			this.flushDataMaking();                   // 制作中
			this.flushDataWillMake();                 // 待制作
		}
	}
</script>

<style>

</style>
