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
		
		<projectList v-if="TabPage_tabInfo.TabCur === 'willMake'"></projectList>
		
		<projectList v-if="TabPage_tabInfo.TabCur === 'making'"></projectList>
	</view>
</template>

<script>
	import TabPage from '@/pages/components/custom-tab-page';
	import projectList from '@/pages/components/projectList';
	
	export default {
		extends: TabPage,
		components: {
			projectList
		},
		data() {
			return {
				
			}
		},
		methods: {
		},
		mounted: function() {
			this.TabPage_tabInfo.TabItems = [{
				title: '待制作',
				id: 'willMake'
			}, {
				title: '制作中',
				id: 'making'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
