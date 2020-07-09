<template>
	<uni-collapse class="warp">
		<uni-collapse-item class="font-title-simhei" open="true" show-animation="true" :title="'批次号:' + rawData.code">
			<tableNoEditEgA :rowsAfterTitle="rowsAfterTitle" :rawData="rawData"></tableNoEditEgA>
		</uni-collapse-item>
	</uni-collapse>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	import Url from "@/pages/components/network/request/url";
	import MaterialRequest from "@/pages/components/network/request/material.js";
	
	export default {
		components: {
			tableNoEditEgA,
			uniCollapse,
			uniCollapseItem,
		},
		props: {
			materialId: {
				required: true,
				default: null
			}
		},
		data() {
			return {
				'pageTitle': '',
				'rowsAfterTitle': [],
				'rawData': [],
				'materialRequest': new MaterialRequest(),
			}
		},
		mounted:function(){
			if (this.materialId !== null && this.materialId !== undefined) {
				this.materialRequest.getMaterial(this.materialId, result => {
					this.flushData(result);
				});
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
					this.rowsAfterTitle.push(new TableEgAElem('所属单位', data.deptName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('生产厂家', data.origin, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('负责人', data.workerName, '30%', '70%', '#f2f2f2;', 'white'));
					this.rowsAfterTitle.push(new TableEgAElem('抽检报告', data.checkImg? Url.resBaseUrl + data.checkImg: data.checkImg, '30%', '70%', '#f2f2f2;', 'white', 'image'));
					this.rowsAfterTitle.push(new TableEgAElem('材质证明', data.certImg? Url.resBaseUrl + data.certImg: data.certImg, '30%', '70%', '#f2f2f2;', 'white', 'image'));
					this.rawData = data;
				}
			} 
		}
	}
</script>

<style>
</style>
