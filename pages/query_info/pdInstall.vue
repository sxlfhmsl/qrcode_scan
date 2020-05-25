<template>
	<view>
		<tableNoEditEgA 
			v-for="(tableItem, index) in tableList"
			:key="index"
			:rowsBeforeTitle="tableItem.rowsBeforeTitle"
			:title="tableItem.title" 
			:rowsAfterTitle="tableItem.rowsAfterTitle" 
		></tableNoEditEgA>
	</view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	export default {
		name: 'pdInstall',
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				tableList: [{
					rowsBeforeTitle:[],
					title: {},
					rowsAfterTitle: [],
				}, {
					rowsBeforeTitle:[],
					title: {},
					rowsAfterTitle: [],
				}, {
					rowsBeforeTitle:[],
					title: {},
					rowsAfterTitle: [],
				}]
			}
		},
		methods: {
			createData: function() {
				// 安装作业
				this.tableList[0].rowsBeforeTitle.push(new TableEgAElem('实际使用部位', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[0].title = {color: '#5c9ed6', value: '安装作业信息'};
				this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工作业时间', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[0].rowsAfterTitle.push(new TableEgAElem('作业人员', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工作业内容', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工过程照片', '', '30%', '70%', '#dad8d8', 'white'));
				
				// 检验信息
				this.tableList[1].title = {color: '#5c9ed6', value: '安装检验信息'};
				this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验时间', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[1].rowsAfterTitle.push(new TableEgAElem('检验人员', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验结论', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验照片', '', '30%', '70%', '#dad8d8', 'white'));
				
				// 检验信息
				this.tableList[2].title = {color: '#5c9ed6', value: '业主代表'};
				this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主检测时间', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表检测结论', '', '30%', '70%', '#dad8d8', 'white'));
				this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表检测照片', '', '30%', '70%', '#dad8d8', 'white'));
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
