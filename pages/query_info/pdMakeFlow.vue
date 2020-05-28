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
	import Url from "@/pages/components/network/request/url";
	
	export default {
		name: 'pdMakeFlow',
		components: {
			tableNoEditEgA
		},
		props: {
			itemData: {
				required: true,
				default: function() {
					return {
						'productCategory': null,
						'productMade': null
					}
				}
			}
		},
		data() {
			return {
				tableList: [],
				mode: [{
					id: 'mtkModeWelding',
					title: '焊接作业信息',
					idPrefix: 'mtkWelding',
					titlePrefix: '焊接作业',
					checkPrefix: 'mtk',
					type: 'makeTaskInfo'
				}, {
					id: 'mtkModeAnti',
					title: '防腐作业信息',
					idPrefix: 'mtkAnti',
					titlePrefix: '防腐作业',
					checkPrefix: 'mtk',
					type: 'makeTaskInfo'
				}, {
					id: 'mtkModeTask',
					title: '加工作业信息',
					idPrefix: 'mtkTask',
					titlePrefix: '加工作业',
					checkPrefix: 'mtk',
					type: 'makeTaskInfo'
				}, {
					id: 'mckModeWelding',
					title: '焊接检验信息',
					idPrefix: 'mckWelding',
					titlePrefix: '焊接检验',
					checkPrefix: 'mck',
					type: 'makeCheckInfo'
				}, {
					id: 'mckModeProduct',
					title: '产品检验信息',
					idPrefix: 'mckProduct',
					titlePrefix: '产品检验',
					checkPrefix: 'mck',
					type: 'makeCheckInfo'
				}, {
					id: 'mckModeSupervision',
					title: '监造检验信息',
					idPrefix: 'mckSupervision',
					titlePrefix: '监造检验',
					checkPrefix: 'mck',
					type: 'makeCheckInfo'
				}]
			}
		},
		methods: {
			/**
			 * @description 创造数据
			 */
			// createData: function() {
			// 	// 例子1
			// 	this.tableList.push({
			// 		rowsBeforeTitle: [],
			// 		title: {color: '#5c9ed6', value: '焊接作业信息'},
			// 		rowsAfterTitle: [
			// 			new TableEgAElem('作业时间', '', '25%', '75%', '#dad8d8', 'white'),
			// 			new TableEgAElem('作业人员', '', '25%', '75%', '#dad8d8', 'white'),
			// 			new TableEgAElem('作业内容', '', '25%', '75%', '#dad8d8', 'white'),
			// 			new TableEgAElem('作业图片', '', '25%', '75%', '#dad8d8', 'white')
			// 		]
			// 	});
			// }
			flushData: function(data) {
				this.tableList = [];
				if (data.productCategory !== null && data.productCategory !== undefined) {
					if (data.productMade !== null && data.productMade !== undefined) {
						this.mode.forEach(item => {
							if (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0) {
								// 生成行数据
								let rowsAfterTitle = [];
								let rawData = {};
								if (data.productCategory[item.checkPrefix + 'Date'] != 0) {  // 时间
									rowsAfterTitle.push(new TableEgAElem(item.titlePrefix + '时间', data.productMade[item.idPrefix + 'Date'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'Date'] = data.productMade[item.idPrefix + 'Date'];
								}
								if (data.productCategory[item.checkPrefix + 'Content'] != 0) {  // 内容
									rowsAfterTitle.push(new TableEgAElem(item.titlePrefix + '内容', data.productMade[item.idPrefix + 'Content'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'Content'] = data.productMade[item.idPrefix + 'Content'];
								}
								if (data.productCategory[item.checkPrefix + 'User'] != 0) {  // 人员
									rowsAfterTitle.push(new TableEgAElem(item.titlePrefix + '人员', data.productMade[item.idPrefix + 'WorkerName'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'WorkerName'] = data.productMade[item.idPrefix + 'WorkerName'];
									rawData[item.idPrefix + 'WorkerId'] = data.productMade[item.idPrefix + 'WorkerId'];
								}
								if (data.productCategory[item.checkPrefix + 'Att'] != 0) {  // 图片
									rowsAfterTitle.push(new TableEgAElem(item.titlePrefix + '图片', (
										data.productMade[item.idPrefix + 'Att'] == null || data.productMade[item.idPrefix + 'Att'] == ''? 
										'': 
										Url.resBaseUrl + data.productMade[item.idPrefix + 'Att']
									), '25%', '75%', '#dad8d8', 'white', 'image'));
									rawData[item.idPrefix + 'Att'] = data.productMade[item.idPrefix + 'Att'];
								}
								this.tableList.push({
									'rowsBeforeTitle': [],
									'title': {color: '#5c9ed6', value: item.title},
									'rowsAfterTitle': rowsAfterTitle,
									'rawData': rawData
								});
							}
						});
					}
				}
			}
			
		},
		mounted:function(){
			this.flushData(this.itemData);
		}
	}
</script>

<style>

</style>
