<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
		</cu-custom>
		
		<!-- 滚动条 -->
		<scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
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
				title: '',
				itemCode: ''
			}
		},
		methods: {
			
		},
		onLoad:function(option){
			this.title = (option.title? option.title: this.title);
			this.itemCode = (option.itemCode? option.itemCode: this.itemCode);
		},
		mounted:function(){
			this.TabPage_tabInfo.TabItems = [{
				title: '基本信息',
				id: 'base_info'
			}, {
				title: '原材料信息',
				id: 'source_info'
			}, {
				title: '制作流程',
				id: 'make_flow'
			}, {
				title: '入库信息',
				id: 'in_bank_info'
			}, {
				title: '发货/收货',
				id: 'send_recv'
			}, {
				title: '产品安装',
				id: 'install'
			}];
			this.TabPage_tabInfo.TabCur = this.TabPage_tabInfo.TabItems[0].id;
		}
	}
</script>

<style>

</style>
