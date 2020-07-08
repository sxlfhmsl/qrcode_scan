<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{pageTitle}}
			</block>
		</cu-custom>
		<tableNoEditEgA :rowsAfterTitle="rowsAfterTitle" :rawData="rawData"></tableNoEditEgA>
	</view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	import Url from "@/pages/components/network/request/url";
	
	export default {
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				'pageTitle': '',
				'rowsAfterTitle': [],
				'rawData': [],
				'itemId': null,
			}
		},
		onLoad: function(options){
			if (options.id !== null && options.id !== undefined) {
				
			}
		},
		methods: {
			flushData: function(data) {
				this.rowsAfterTitle.splice(0, this.rowsAfterTitle.length);
				this.pageTitle = data.materialType;
				if (data !== null && data !== undefined) {
					this.rowsAfterTitle.push(new TableEgAElem('批次号', data.code, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('进场时间', data.enterDate, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('品种名称', data.materialType, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('所属单位', data.origin, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('生产厂家', data.deptName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('状态', data.statusName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('负责人', data.workerName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('抽检报告', Url.resBaseUrl + data.checkAtt, '30%', '70%', '#f2f2f2;', 'white', 'image'));
					this.rowsAfterTitle.push(new TableEgAElem('材质证明', Url.resBaseUrl + data.certificateAtt, '30%', '70%', '#f2f2f2;', 'white', 'image'));
					this.rawData = data;
				}
			} 
		}
	}
</script>

<style>

</style>
