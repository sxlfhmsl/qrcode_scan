<template>
	<view>
		<pdBaseInfo></pdBaseInfo>
		<scroll-view scroll-x class="bg-white nav solid-top solid-bottom" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
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
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdSource'">
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin-right" @tap="toSourceChoosePage">原材料</button>
				<button class="cu-btn bg-blue round lg shadow margin-left" @tap="toNextStep">下一步</button>
			</view>
		</scroll-view>
		
		<scroll-view v-show="TabPage_tabInfo.TabCur==='pdMake'">
			sdsd55
		</scroll-view>
	</view>
</template>

<script>
	import pdBaseInfo from '@/pages/components/pdBaseInfo';
	import TabPage from "@/pages/components/custom-tab-page";
	export default {
		components: {
			pdBaseInfo
		},
		name: 'makeMain',
		extends: TabPage,
		data() {
			return {
				
			}
		},
		methods: {
			/**
			 * @description 跳转至原材料选择界面
			 * @param {Object} e 事件
			 */
			toSourceChoosePage: function(e) {
				uni.navigateTo({
					url: '/pages/make/makeSourceChoose'
				});
			},
			/**
			 * @description 跳转到下一步
			 */
			toNextStep: function() {
				this.TabPage_tabInfo.TabCur = 'pdMake';
			}
		},
		mounted:function(){
			this.TabPage_tabInfo.TabItems = [{
				title: '原材料',
				id: 'pdSource'
			}, {
				title: '产品制作',
				id: 'pdMake'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
