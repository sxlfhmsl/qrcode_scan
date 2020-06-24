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
				required: true
			}
		},
		watch: {
			itemData: {
				handler: function (val, oldVal) {
					if (val !== null && val !== undefined) {
						this.flushData(val);
					}
				}
			}
		},
		data() {
			return {
				tableList: [],
				modePccp: [{
					'id': 'mtkHydrostatic',
					'title': '水压检测',
					'idPrefix': 'Hydr',
					'itemTitles': [{
						'id': ['mck', 'Date'],
						'title': '水压检测时间',
						'type': '',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '水压检测人员',
						'type': '',
					}, {
						'id': ['mck', 'Content'],
						'title': '水压检测结论',
						'type': '',
					}, {
						'id': ['', 'Att'],
						'title': '水压检测报告',
						'type': '',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': '',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': '',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkSteamCuring',
					'title': '蒸汽养护',
					'idPrefix': 'Sc',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '蒸汽养护时间',
						'type': '',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '蒸汽养护人员',
						'type': '',
					}, {
						'id': ['mck', 'Content'],
						'title': '蒸汽养护结论',
						'type': '',
					}, {
						'id': ['', 'Att'],
						'title': '蒸汽养护报告',
						'type': '',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': '',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': '',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkSteamCuring',
					'title': '蒸汽养护',
					'idPrefix': 'Sc',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '蒸汽养护时间',
						'type': '',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '蒸汽养护人员',
						'type': '',
					}, {
						'id': ['mck', 'Content'],
						'title': '蒸汽养护结论',
						'type': '',
					}, {
						'id': ['', 'Att'],
						'title': '蒸汽养护报告',
						'type': '',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': '',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': '',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}],
				modeSteelPipe: [{
					'id': 'mtkWelding',
					'title': '焊接信息',
					'idPrefix': 'Welding',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '焊接作业时间',
						'type': '',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '焊接作业人员',
						'type': '',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '焊缝检验人员',
						'type': '',
					}, {
						'id': ['mck', 'Content'],
						'title': '焊缝检验结论',
						'type': '',
					}, {
						'id': ['', 'AttOne'],
						'title': '焊缝外观检测报告',
						'type': '',
					}, {
						'id': ['', 'AttTwo'],
						'title': '焊缝探伤检测报告',
						'type': '',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': '',
					}, {
						'id': ['msk', 'content'],
						'title': '监造结论',
						'type': '',
					}, ],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkAnti',
					'title': '防腐信息',
					'idPrefix': 'Anti',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '防腐作业时间',
						'type': '',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '防腐作业人员',
						'type': '',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '防腐检验人员',
						'type': '',
					}, {
						'id': ['mck', 'Content'],
						'title': '防腐检验结论',
						'type': '',
					}, {
						'id': ['', 'Att'],
						'title': '防腐检验报告',
						'type': '',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': '',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': '',
					},],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
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
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles.Date, data.productMade[item.idPrefix + 'Date'], '30%', '70%', '#f2f2f2', 'white'));
									rawData[item.idPrefix + 'Date'] = data.productMade[item.idPrefix + 'Date'];
								}
								if (data.productCategory[item.checkPrefix + 'Content'] != 0) {  // 内容
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles.Content, data.productMade[item.idPrefix + 'Content'], '30%', '70%', '#f2f2f2', 'white'));
									rawData[item.idPrefix + 'Content'] = data.productMade[item.idPrefix + 'Content'];
								}
								if (data.productCategory[item.checkPrefix + 'User'] != 0) {  // 人员
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles.User, data.productMade[item.idPrefix + 'WorkerName'], '30%', '70%', '#f2f2f2', 'white'));
									rawData[item.idPrefix + 'WorkerName'] = data.productMade[item.idPrefix + 'WorkerName'];
									rawData[item.idPrefix + 'WorkerId'] = data.productMade[item.idPrefix + 'WorkerId'];
								}
								if (data.productCategory[item.checkPrefix + 'Att'] != 0) {  // 图片
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles.Att, (
										data.productMade[item.idPrefix + 'Att'] == null || data.productMade[item.idPrefix + 'Att'] == ''? 
										'': 
										Url.resBaseUrl + data.productMade[item.idPrefix + 'Att']
									), '30%', '70%', '#f2f2f2', 'white', 'image'));
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
		mounted: function(){
			if (this.itemData !== null && this.itemData !== undefined) {
				this.flushData(this.itemData);
			}
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
