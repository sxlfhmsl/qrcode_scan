<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				发货/收货
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-deliver" style="background-color: rgba(255,255,255,0);"></text>
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
					class="cu-item font-title-simhei-nocolor"
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
		
		<!-- 主要内容 -->
		<you-scroll :style="'height: calc(100vh - ' + (CustomBar * 2 + 100) + 'rpx)'" ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<projectList 
				v-show="TabPage_tabInfo.TabCur === 'recv'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.recv"
				:btnExtends="btnExtendsRecv"
				@productTap="productTap"
			></projectList>
			
			<projectList 
				v-show="TabPage_tabInfo.TabCur === 'send'" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems.send"
				:btnExtends="btnExtendsSend"
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
				'pullup': {
					'text': '正在努力加载中......',
					'show': false,
				},
				'pageInfo': {
					'recv': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
					'send': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					}
				},
				'projectItems': {
					'recv': [],
					'send': []
				},
				productRequest: new ProductRequest(),
				btnExtendsRecv: [{
					'type': 'recv',
					'color': 'blue',
					'title': '收货',
					'perNum': 4,
				}],
				btnExtendsSend: [{
					'type': 'send',
					'color': 'blue',
					'title': '发货',
					'perNum': 3,
				}],
				pageHide: false,
			}
		},
		methods: {
			stopFlushUp: function() {
				this.pullup.text = '正在努力加载中......';
				this.pullup.show = false;
			},
			onPullDown: function(done) { // 下拉刷新
				this.flushData(done, 'down');
			},
			onScroll: function(e) { // 监听滚动
			},
			onLoadMore: function(e) { // 加载更多
				this.flushData(this.stopFlushUp, 'up');
			},
			/**
			 * @description 子组件回传项目点击事件
			 * @param {Object} params 参数 结构{'btnType': btnType, 'productId': productId}
			 */
			productTap: function(params) {
				if (params.btnType === 'recv') {
					// 收货
					uni.navigateTo({
						url: '/pages/send_recv/recvMain?productId=' + params.productId
					});
				}
				if (params.btnType === 'send') {
					// 发货
					uni.navigateTo({
						url: '/pages/send_recv/sendMain?productId=' + params.productId
					});
				}
			},
			/**
			 * @description 刷新数据
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 * @param {Object} flushType 刷新类型
			 */
			flushData: function(stopFlushCallback, flushType) {
				if (this.TabPage_tabInfo.TabCur === 'recv') {
					let pageInfo = this.pageInfo.recv;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
							this.pullup.text = '正在努力加载中......';
							this.pullup.show = true;
						}
						else {
							this.pullup.text = '没有更多的数据了';
							this.pullup.show = true;
							return;
						}
					}
					else {
						this.projectItems.recv = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataRecv(stopFlushCallback);
				}
				else if (this.TabPage_tabInfo.TabCur === 'send') {
					let pageInfo = this.pageInfo.send;
					if (flushType === 'up') {
						if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
							pageInfo.page ++;
						}
						else {
							return;
						}
					}
					else {
						this.projectItems.send = [];
						pageInfo.page = 1;
						pageInfo.total = 99999;
					}
					this.flushDataSend(stopFlushCallback);
				}
			},
			/**
			 * @description 刷新收货列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataRecv: function(stopFlushCallback) {
				// 0
				this.productRequest.installList(
					undefined, 0, 
					this.pageInfo.recv.page, this.pageInfo.recv.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo.recv.total = data.total;
							this.projectItems.recv = this.projectItems.recv.concat(data.records);
						}
				});
			},
			/**
			 * @description 刷新发货列表
			 * @param {Object} stopFlushCallback 结束刷新的回调
			 */
			flushDataSend: function(stopFlushCallback) {
				// 2
				this.productRequest.unDeliveryList(
					this.pageInfo.send.page, this.pageInfo.send.pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						console.log(data);
						if (data !== null && data !== undefined) {
							this.pageInfo.send.total = data.count;
							this.projectItems.send = this.projectItems.send.concat(data.data);
						}
				});
			}
		},
		onHide: function() {
			this.pageHide = true;
			uni.removeStorage({
				key: 'flushPage'
			});
		},
		onShow: function() {
			if (this.pageHide == true) {
				let flushPage = uni.getStorageSync('flushPage');
				if (flushPage == true) {
					uni.removeStorage({
						key: 'flushPage'
					});
					this.flushData();
				}
			}
			this.pageHide = false;
		},
		mounted: function() {
			// 添加tab点击项
			this.TabPage_tabInfo.TabItems = [{
				title: '发货',
				id: 'send'
			}, {
				title: '收货',
				id: 'recv'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
			
			this.flushDataRecv();                         // 刷新收货
			this.flushDataSend();                         // 刷新发货
		}
	}
</script>

<style>

</style>
