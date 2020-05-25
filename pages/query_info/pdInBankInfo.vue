<template>
	<view>
		<tableNoEdit :topAttr="topAttr" :rowCommonAttr="rowCommonAttr" :colCommonAttr="colCommonAttr" :rowsAttr="rowsAttr"></tableNoEdit>
	</view>
</template>

<script>
	import tableNoEdit from "@/pages/components/tableNoEdit";
	import TableElem from "@/pages/components/tableElem";
	export default {
		name: 'pdInBankInfo',
		components: {
			tableNoEdit
		},
		data() {
			return {
				topAttr: new TableElem('', ''),
				rowCommonAttr: new TableElem('margin-left-sm margin-right-sm solid-left solid-bottom', ''),
				colCommonAttr: new TableElem('padding-sm col-auto-line solid-right', ''),
				rowsAttr: [],
			}
		},
		methods: {
			createData: function() {
				// 第一行
				this.rowsAttr.push(new TableElem('margin-top-sm solid-top', ''));
				this.rowsAttr[0].cols.push(new TableElem('text-white text-center soild', 'width: 25%; background-color: #dad8d8;', '入库时间'));
				this.rowsAttr[0].cols.push(new TableElem('text-black bg-white', 'width: 75%;', ''));
				
				// 第二行
				this.rowsAttr.push(new TableElem('', ''));
				this.rowsAttr[1].cols.push(new TableElem('text-white text-center', 'width: 25%; background-color: #dad8d8;', '负责人'));
				this.rowsAttr[1].cols.push(new TableElem('text-black bg-white', 'width: 75%;', ''));
				
				// 第三行
				this.rowsAttr.push(new TableElem('', ''));
				this.rowsAttr[2].cols.push(new TableElem('text-white text-center', 'width: 25%; background-color: #dad8d8;', '合格证编号'));
				this.rowsAttr[2].cols.push(new TableElem('text-black bg-white', 'width: 75%;', ''));
				
				// 第四行
				this.rowsAttr.push(new TableElem('', ''));
				this.rowsAttr[3].cols.push(new TableElem('text-white text-center', 'width: 25%; background-color: #dad8d8;', '合格证照片'));
				this.rowsAttr[3].cols.push(new TableElem('text-black bg-white', 'width: 75%;', ''));
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
