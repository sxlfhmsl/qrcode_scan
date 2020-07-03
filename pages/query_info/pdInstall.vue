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
		watch: {
			itemData: {
				handler: function (val, oldVal) {
					if (val !== null && val !== undefined) {
						this.flushData(val);
					}
				}
			}
		},
		props: {
			itemData: {
				required: true
			}
		},
		data() {
			return {
				tableList: [],
				'mode': [
				// 	{
				// 	'special': true,
				// 	'id': null,
				// 	'title': '收货信息',
				// 	'idPrefix': null,
				// 	'itemTitles': [{
				// 		'id': 'recevieDate',
				// 		'title': '收货时间',
				// 		'type': 'text',
				// 	}, {
				// 		'id': 'deptName',
				// 		'title': '收货人',
				// 		'type': 'text',
				// 	}, {
				// 		'id': 'place',
				// 		'title': '实际使用部位',
				// 		'type': 'text',
				// 	}, ],
				// 	'checkPrefix': 'isu',
				// 	'type': 'installTaskInfo',
				// }, 
				{
					'id': 'itkConstructionUnit',
					'title': '施工单位',
					'idPrefix': 'ic',
					'itemTitles': [{
						'id': ['u', 'Date'],
						'title': '作业时间',
						'type': 'text',
					}, {
						'id': ['u', 'WorkerNames'],
						'title': '作业人员',
						'type': 'textList',
					}, {
						'id': ['cu', 'WorkerNames'],
						'title': '检验人员',
						'type': 'textList',
					}, {
						'id': ['u', 'Content'],
						'title': '检验结论',
						'type': 'text',
					}, {
						'id': ['u', 'Att'],
						'title': '检验报告',
						'type': 'imageList',
					}, ],
					'checkPrefix': 'icu',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkSupervisionUnit',
					'title': '监理单位',
					'idPrefix': 'isu',
					'itemTitles': [{
						'id': ['', 'Date'],
						'title': '监理时间',
						'type': 'text',
					}, {
						'id': ['', 'WorkerNames'],
						'title': '监理人员',
						'type': 'textList',
					}, {
						'id': ['', 'Content'],
						'title': '监理结论',
						'type': 'text',
					}, ],
					'checkPrefix': 'isu',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkThirdCheck',
					'title': '第三方检测',
					'idPrefix': 'itc',
					'itemTitles': [{
						'id': ['', 'Date'],
						'title': '检测时间',
						'type': 'text',
					}, {
						'id': ['', 'WorkerNames'],
						'title': '检测人员',
						'type': 'textList',
					}, {
						'id': ['', 'Device'],
						'title': '检测设备',
						'type': 'text',
					}, {
						'id': ['', 'Content'],
						'title': '检测结论',
						'type': 'text',
					}, ],
					'checkPrefix': 'itc',
					'type': 'installTaskInfo',
				}, {
					'id': 'itkOwner',
					'title': '业主代表',
					'idPrefix': 'io',
					'itemTitles': [{
						'id': ['', 'WorkerNames'],
						'title': '业主代表',
						'type': 'textList',
					}, ],
					'checkPrefix': 'io',
					'type': 'installTaskInfo',
				}, ],
			}
		},
		methods: {
			flushData: function(data) {
				this.tableList = [];
				if (data.productCategory !== null && data.productCategory !== undefined) {
					if (data.productInstall !== null && data.productInstall !== undefined) {
						this.mode.forEach((item, index) => {
							if (item.special || (data.productCategory[item.id] != 0 && data.productCategory[item.type] != 0)) {
								// 生成数据
								let rowsAfterTitle = [];
								let rawData = {};
								item.itemTitles.forEach(childTitle => {
									// 生成key
									let childTitleKey = item.special? childTitle.id: item.idPrefix + childTitle.id[0]  + childTitle.id[1];
									let childTitleData = "";
									switch(childTitle.type) {
										case "text":
										childTitleData = data.productInstall[childTitleKey];
										break;
										case "image":
										childTitleData = data.productInstall[childTitleKey]?  Url.resBaseUrl + data.productInstall[childTitleKey]: data.productInstall[childTitleKey];
										break;
										case "textList":
										childTitleData = data.productInstall[childTitleKey]? data.productInstall[childTitleKey].split(","): [];
										break;
										case "imageList":
										if (data.productInstall[childTitleKey]) {
											childTitleData = data.productInstall[childTitleKey].split(",");
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
