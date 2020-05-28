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
	import Url from "@/pages/components/network/request/url";
	
	export default {
		name: 'pdInstall',
		components: {
			tableNoEditEgA
		},
		props: {
			itemData: {
				required: true,
				default: function() {
					return {
						'productCategory': null,
						'productInstall': null
					}
				}
			}
		},
		data() {
			return {
				tableList: [],
				mode: [{
					id: 'itkModeWelding',
					title: '安装焊接作业',
					idPrefix: 'itkWelding',
					'itemTitles': {'Date':'焊接作业时间', 'Content': '作业环境温度', 'User': '作业人员', 'Att': '焊接作业照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'itk',
					type: 'installTaskInfo'
				}, {
					id: 'itkModeAnti',
					title: '安装防腐作业',
					idPrefix: 'itkAnti',
					'itemTitles': {'Date':'防腐作业时间', 'Content': '防腐作业内容', 'User': '作业人员', 'Att': '防腐过程照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'itk',
					type: 'installTaskInfo'
				}, {
					id: 'itkModeTask',
					title: '安装作业信息',
					idPrefix: 'itkTask',
					'itemTitles': {'Date':'加工作业时间', 'Content': '加工作业内容', 'User': '作业人员', 'Att': '加工过程照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'itk',
					type: 'installTaskInfo'
				},     {
					id: 'ickModeInstall',
					title: '安装检验信息',
					idPrefix: 'ickInstall',
					'itemTitles': {'Date':'安装检验时间', 'Content': '安装检验结论', 'User': '检验人员', 'Att': '安装检验照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}, {
					id: 'ickManageWelding',
					title: '焊接旁站监理',
					idPrefix: 'ickManageWelding',
					'itemTitles': {'Date':'焊接旁站时间', 'Content': '焊接旁站结论', 'User': '监理工程师', 'Att': '焊接旁站照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}, {
					id: 'ickManageAnti',
					title: '防腐旁站监理',
					idPrefix: 'ickManageAnti',
					'itemTitles': {'Date':'防腐旁站时间', 'Content': '防腐旁站结论', 'User': '监理工程师', 'Att': '防腐旁站照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}, {
					id: 'ickThirdWelding',
					title: '三方焊接检测',
					idPrefix: 'ickThirdWelding',
					'itemTitles': {'Date':'三方焊接检测时间', 'Content': '三方焊接检测结论', 'User': '检验人员', 'Att': '三方焊接检测照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}, {
					id: 'ickThirdAnti',
					title: '三方防腐检测',
					idPrefix: 'ickThirdAnti',
					'itemTitles': {'Date':'三方防腐检测时间', 'Content': '三方防腐检测结论', 'User': '检验人员', 'Att': '三方防腐检测照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}, {
					id: 'ickModeOwner',
					title: '业主代表',
					idPrefix: 'ickOwner',
					'itemTitles': {'Date':'业主检测时间', 'Content': '业主检测结论', 'User': '业主代表', 'Att': '业主检测照片'},
					// titlePrefix: '焊接作业',
					checkPrefix: 'ick',
					type: 'installCheckInfo'
				}]
			}
		},
		methods: {
			// createData: function() {
			// 	// 安装作业
			// 	this.tableList[0].rowsBeforeTitle.push(new TableEgAElem('实际使用部位', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[0].title = {color: '#5c9ed6', value: '安装作业信息'};
			// 	this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工作业时间', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[0].rowsAfterTitle.push(new TableEgAElem('作业人员', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工作业内容', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[0].rowsAfterTitle.push(new TableEgAElem('加工过程照片', '', '30%', '70%', '#dad8d8', 'white'));
				
			// 	// 检验信息
			// 	this.tableList[1].title = {color: '#5c9ed6', value: '安装检验信息'};
			// 	this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验时间', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[1].rowsAfterTitle.push(new TableEgAElem('检验人员', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验结论', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[1].rowsAfterTitle.push(new TableEgAElem('安装检验照片', '', '30%', '70%', '#dad8d8', 'white'));
				
			// 	// 检验信息
			// 	this.tableList[2].title = {color: '#5c9ed6', value: '业主代表'};
			// 	this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主检测时间', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表检测结论', '', '30%', '70%', '#dad8d8', 'white'));
			// 	this.tableList[2].rowsAfterTitle.push(new TableEgAElem('业主代表检测照片', '', '30%', '70%', '#dad8d8', 'white'));
			// }
			flushData: function(data) {
				this.tableList = [];
				if (data.productCategory !== null && data.productCategory !== undefined) {
					if (data.productInstall !== null && data.productInstall !== undefined) {
						this.mode.forEach((item, index) => {
							if (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0) {
								// 生成行数据
								let rowsAfterTitle = [];
								let rawData = {};
								if (data.productCategory[item.checkPrefix + 'Date'] != 0) {  // 时间
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles['Date'], data.productInstall[item.idPrefix + 'Date'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'Date'] = data.productInstall[item.idPrefix + 'Date'];
								}
								if (data.productCategory[item.checkPrefix + 'Content'] != 0) {  // 内容
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles['Content'], data.productInstall[item.idPrefix + 'Content'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'Content'] = data.productInstall[item.idPrefix + 'Content'];
								}
								if (data.productCategory[item.checkPrefix + 'User'] != 0) {  // 人员
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles['User'], data.productInstall[item.idPrefix + 'WorkerName'], '25%', '75%', '#dad8d8', 'white'));
									rawData[item.idPrefix + 'WorkerName'] = data.productInstall[item.idPrefix + 'WorkerName'];
									rawData[item.idPrefix + 'WorkerId'] = data.productInstall[item.idPrefix + 'WorkerId'];
								}
								if (data.productCategory[item.checkPrefix + 'Att'] != 0) {  // 图片
									rowsAfterTitle.push(new TableEgAElem(item.itemTitles['Att'], (
										data.productInstall[item.idPrefix + 'Att'] == null || data.productInstall[item.idPrefix + 'Att'] == ''? 
										'': 
										Url.resBaseUrl + data.productInstall[item.idPrefix + 'Att']
									), '25%', '75%', '#dad8d8', 'white', 'image'));
									rawData[item.idPrefix + 'Att'] = data.productInstall[item.idPrefix + 'Att'];
								}
								let rowsBeforeTitle = [];
								if (index == 0) {
									rowsBeforeTitle.push(new TableEgAElem('实际使用部位', data.productInstall.place, '25%', '75%', '#dad8d8', 'white'));
								}
								this.tableList.push({
									'rowsBeforeTitle': rowsBeforeTitle,
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
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
	* {
		font-size: 25rpx !important;
	}
</style>
