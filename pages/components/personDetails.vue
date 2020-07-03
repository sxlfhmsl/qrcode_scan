<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				人员详情
			</block>
		</cu-custom>
		 <tableNoEditEgA
		 	:rowsBeforeTitle="rowsBeforeTitle"
		 	:title="title" 
		 	:rowsAfterTitle="rowsAfterTitle" 
		 ></tableNoEditEgA>
	</view>
</template>

<script>
	import ProductRequest from "@/pages/components/network/request/product.js";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import Url from "@/pages/components/network/request/url.js";
	
	export default {
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				rowsBeforeTitle: [],
				title: null,
				rowsAfterTitle: [],
				productRequest: new ProductRequest(),
			}
		},
		onLoad: function(options) {
			this.productRequest.workerInfo(options.workerId, data => {
				this.rowsAfterTitle.push(new TableEgAElem("用户名", data.workerName, '30%', '70%', '#f2f2f2', 'white', "text"));
				this.rowsAfterTitle.push(new TableEgAElem("工种", data.dictName, '30%', '70%', '#f2f2f2', 'white', "text"));
				this.rowsAfterTitle.push(new TableEgAElem("所属单位", data.deptName, '30%', '70%', '#f2f2f2', 'white', "text"));
				this.rowsAfterTitle.push(new TableEgAElem("资质证书", Url.resBaseUrl + data.att, '30%', '70%', '#f2f2f2', 'white', "image"));
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
