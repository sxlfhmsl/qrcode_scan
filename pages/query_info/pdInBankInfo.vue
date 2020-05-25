<template>
	<view>
		<tableNoEditEgA :rowsAfterTitle="rowsAfterTitle"></tableNoEditEgA>
	</view>
</template>

<script>
	import tableNoEditEgA from "@/pages/components/tableNoEditEgA";
	import TableEgAElem from "@/pages/components/tableEgAElem";
	export default {
		name: 'pdInBankInfo',
		components: {
			tableNoEditEgA
		},
		data() {
			return {
				rowsAfterTitle: [],
			}
		},
		methods: {
			createData: function() {
				this.rowsAfterTitle.push(new TableEgAElem('入库时间', '', '25%', '75%', '#dad8d8', 'white'));
				this.rowsAfterTitle.push(new TableEgAElem('负责人', '', '25%', '75%', '#dad8d8', 'white'));
				this.rowsAfterTitle.push(new TableEgAElem('合格证编号', '', '25%', '75%', '#dad8d8', 'white'));
				this.rowsAfterTitle.push(new TableEgAElem('合格证照片', '', '25%', '75%', '#dad8d8', 'white'));
			}
		},
		mounted() {
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
