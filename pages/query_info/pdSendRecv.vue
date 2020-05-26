<template>
	<scroll-view class="bg-white">
		<tableNoEditEgA
			v-for="(tableItem, index) in tableList"
			:key="index"
			:rowsBeforeTitle="tableItem.rowsBeforeTitle"
			:title="tableItem.title" 
			:rowsAfterTitle="tableItem.rowsAfterTitle" 
		></tableNoEditEgA>
	</scroll-view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	
	export default {
		name: 'pdSendRecv',
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				tableList: []
			}
		},
		methods: {
			/**
			 * @description 创造数据
			 */
			createData: function() {
				// 例子1
				this.tableList.push({
					rowsBeforeTitle: [],
					title: {color: '#5c9ed6', value: '发货基本信息'},
					rowsAfterTitle: [
						new TableEgAElem('发货时间', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('发货订单编号', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('客户单位', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('发货地址', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('收货地址', '', '25%', '75%', '#dad8d8', 'white')
					]
				});
				
				// 例子2
				this.tableList.push({
					rowsBeforeTitle: [],
					title: {color: '#5c9ed6', value: '收货基本信息'},
					rowsAfterTitle: [
						new TableEgAElem('收货时间', '', '25%', '75%', '#dad8d8', 'white'),
					]
				});
			}
		},
		mounted:function(){
			this.createData();
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
	* {
		font-size: 25rpx !important;
	}
</style>
