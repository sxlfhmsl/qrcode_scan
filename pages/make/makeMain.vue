<template>
	<view>
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
	</view>
</template>

<script>
	import TabPage from "@/pages/components/custom-tab-page";
	export default {
		name: 'makeMain',
		extends: TabPage,
		data() {
			return {
				
			}
		},
		methods: {
			
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
