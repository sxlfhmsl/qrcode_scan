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
				'tableList': [],
				'mode': {},
				'modePccp': [{
					'id': 'mtkHydrostatic',
					'title': '水压检测信息',
					'idPrefix': 'Hydr',
					'itemTitles': [{
						'id': ['mck', 'Date'],
						'title': '水压作业时间',
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '水压作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '水压检测人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '水压检测结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '水压检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkSteamCuring',
					'title': '蒸汽检测信息',
					'idPrefix': 'Sc',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '蒸汽作业时间',
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '蒸汽作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '蒸汽检测人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '蒸汽检测结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '蒸汽检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkWrappingWire',
					'title': '缠丝信息',
					'idPrefix': 'Ww',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '缠丝作业时间',
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '缠丝作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '缠丝检验人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '缠丝检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '缠丝检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'mtkRollEjection',
					'title': '辊射信息',
					'idPrefix': 'Re',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '辊射作业时间',
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '辊射作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '辊射检验人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '辊射检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '辊射检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					}],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'itkOwner',
					'title': '业主代表',
					'idPrefix': 'mo',
					'itemTitles': [{
						'id': ['', 'WorkerNames'],
						'title': '业主代表',
						'type': 'textList',
					}, ],
					'checkPrefix': 'io',
					'type': 'makeTaskInfo',
				}],
				'modeSteelPipe': [{
					'id': 'mtkWelding',
					'title': '焊接信息',
					'idPrefix': 'Welding',
					'itemTitles': [{
						'id': ['mtk', 'Date'],
						'title': '焊接作业时间',
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '焊接作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '焊缝检验人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '焊缝检验结论',
						'type': 'text',
					}, {
						'id': ['', 'AttOne'],
						'title': '焊缝外观检测报告',
						'type': 'imageList',
					}, {
						'id': ['', 'AttTwo'],
						'title': '焊缝探伤检测报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
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
						'type': 'text',
					}, {
						'id': ['mtk', 'WorkerNames'],
						'title': '防腐作业人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'WorkerNames'],
						'title': '防腐检验人员',
						'type': 'textList',
					}, {
						'id': ['mck', 'Content'],
						'title': '防腐检验结论',
						'type': 'text',
					}, {
						'id': ['', 'Att'],
						'title': '防腐检验报告',
						'type': 'imageList',
					}, {
						'id': ['msk', 'WorkerNames'],
						'title': '监造人员',
						'type': 'textList',
					}, {
						'id': ['msk', 'Content'],
						'title': '监造结论',
						'type': 'text',
					},],
					'checkPrefix': 'mtk',
					'type': 'makeTaskInfo'
				}, {
					'id': 'itkOwner',
					'title': '业主代表',
					'idPrefix': 'mo',
					'itemTitles': [{
						'id': ['', 'WorkerNames'],
						'title': '业主代表',
						'type': 'textList',
					}, ],
					'checkPrefix': 'io',
					'type': 'makeTaskInfo',
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
				this.tableList.splice(0, this.tableList.length);
				if (data.productCategory !== null && data.productCategory !== undefined) {
					if (data.productMade !== null && data.productMade !== undefined) {
						this.mode[data.productCategory.name].forEach(item => {
							if (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0) {
								// 生成数据
								let rowsAfterTitle = [];
								let rawData = {};
								item.itemTitles.forEach(childTitle => {
									// 生成key
									let childTitleKey = 
										childTitle.id[0] + 
										(childTitle.id[0] == ''? item.idPrefix.toLowerCase(): item.idPrefix) + 
										childTitle.id[1];
									let childTitleData = "";
									switch(childTitle.type) {
										case "text":
										childTitleData = data.productMade[childTitleKey]
										break;
										case "image":
										childTitleData = data.productMade[childTitleKey]?  Url.resBaseUrl + data.productMade[childTitleKey]: data.productMade[childTitleKey];
										break;
										case "textList":
										childTitleData = {
											'value': data.productMade[childTitleKey]? data.productMade[childTitleKey].split(","): [],
											'type': 'normal'
											}
										if (childTitleKey.indexOf("WorkerNames") != -1) {
											let keybuf = childTitleKey.substring(0, childTitleKey.indexOf('WorkerNames')) + 'WorkerIds'
											childTitleData['type'] = 'worker';
											childTitleData['extend'] = data.productMade[keybuf]? data.productMade[keybuf].split(","): [];
											childTitleData['productId'] = data.pdBaseInfo.id;
										}
										break;
										case "imageList":
										if (data.productMade[childTitleKey]) {
											childTitleData = data.productMade[childTitleKey].split(",");
											let childTitleIndex = 0;
											for (; childTitleIndex < childTitleData.length; childTitleIndex++) {
												childTitleData[childTitleIndex] = Url.resBaseUrl + childTitleData[childTitleIndex];
											}
										}
										else {
											childTitleData = [];
										}
									}
									rowsAfterTitle.push(new TableEgAElem(childTitle.title, childTitleData, '30%', '70%', '#f2f2f2', 'white', childTitle.type));
									rawData[childTitleKey] = childTitleData;
								});
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
			this.mode['PCCP'] = this.modePccp;
			this.mode['钢管'] = this.modeSteelPipe;
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
