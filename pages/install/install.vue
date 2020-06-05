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
		<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<projectList 
				v-for="(item, index) in this.TabPage_tabInfo.TabItems"
				:key="index"
				v-show="TabPage_tabInfo.TabCur === item.id" 
				style="min-height: 200rpx; width: 100%;"
				:itemData="projectItems[item.id]"
				:btnExtends="btnExtends[item.id]"
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
				'status': {
					'willInstall': 1,
					'installing': 2,
					'installed': 3,
					'scrap': 4,
					'receive': 0,
				},
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
					},
					'installed': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
					'scrap': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
					'receive': {
						'page': 1,
						'pageLimit': 20,
						'total': 99999
					},
				},
				'projectItems': {
					'willInstall': [],
					'installing': [],
					'installed': [],
					'scrap': [],
					'receive': [],
				},
				productRequest: new ProductRequest(),
				btnExtends: {
					'willInstall': [{
						'type': 'install',
						'color': 'blue',
						'title': '安装',
						'perNum': 5,
					}],
					'installing': [{
						'type': 'install',
						'color': 'blue',
						'title': '安装',
						'perNum': 5,
					}],
					'installed': [],
					'scrap': [],
					'receive': [],
				},
				pageHide: false,
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
				// 修改并获取page info
				let pageInfo = this.pageInfo[this.TabPage_tabInfo.TabCur];
				if (flushType === 'up') {
					if (pageInfo.total > (pageInfo.page * pageInfo.limit)) {
						pageInfo.page ++;
					}
					else {
						return;
					}
				}
				else {
					this.projectItems[this.TabPage_tabInfo.TabCur].splice(0, this.projectItems[this.TabPage_tabInfo.TabCur].length);
					pageInfo.page = 1;
					pageInfo.total = 99999;
				}
				
				this.flushRealData(stopFlushCallback);
			},
			flushRealData: function(stopFlushCallback, typeString) {
				typeString = (typeString != undefined? typeString: this.TabPage_tabInfo.TabCur);
				this.productRequest.installList(
					undefined, this.status[typeString], 
					this.pageInfo[typeString].page, this.pageInfo[typeString].pageLimit, 
					data => {
						if (stopFlushCallback !== null && stopFlushCallback !== undefined) {
							stopFlushCallback();
						}
						if (data !== null && data !== undefined) {
							this.pageInfo[typeString].total = data.total;
							this.projectItems[typeString] = this.projectItems[typeString].concat(data.records);
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
				title: '待安装',
				id: 'willInstall'
			}, {
				title: '已安装',
				id: 'installed'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
			
			// 刷新数据
			this.TabPage_tabInfo.TabItems.forEach(item => {
				this.flushRealData(undefined, item.id);
			});
		}
	}
</script>

<style>

</style>
