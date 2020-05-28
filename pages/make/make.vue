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
		<scroll-view scroll-x class="bg-white nav solid-top solid-bottom text-center" scroll-with-animation :scroll-left="TabPage_tabInfo.scrollLeft">
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
</template>

<script>
	import TabPage from '@/pages/components/custom-tab-page';
	
	export default {
		extends: TabPage,
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
