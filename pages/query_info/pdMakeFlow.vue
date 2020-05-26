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
		name: 'pdMakeFlow',
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
					title: {color: '#5c9ed6', value: '焊接作业信息'},
					rowsAfterTitle: [
						new TableEgAElem('作业时间', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('作业人员', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('作业内容', '', '25%', '75%', '#dad8d8', 'white'),
						new TableEgAElem('作业图片', '', '25%', '75%', '#dad8d8', 'white')
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

</style>
