<template>
	<view>
		<!-- 上部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom"
			:class="index == 0? ' solid-top margin-top-sm': ' solid-top'"
			v-for="(rowBeforeTitle, index) in rowsBeforeTitle"
			:key="'b' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-white text-center solid-right"
				style="flex: auto;"
				:style="'width:' + rowBeforeTitle.titleWidth + ';background-color:' + rowBeforeTitle.titleColor + ';'"
			>
				{{rowBeforeTitle.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right"
				style="flex: auto;"
				:style="'width:' + rowBeforeTitle.contentWidth + ';background-color:' + rowBeforeTitle.contentColor + ';'"
			>
				{{rowBeforeTitle.content}}
			</view>
		</view>
		
		<!-- 标题 -->
		<view v-if="title != null" class="flex margin-left-sm margin-right-sm">
			<view 
				class="padding-sm col-auto-line text-white soild"
				:class="title != null && rowsBeforeTitle.length == 0? ' margin-top-sm': ''"
				style="width: 100%;flex: auto;"
				:style="'background-color:' + title.color + ';'"
			>
				{{title.value}}
			</view>
		</view>
		
		<!-- 下部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom"
			:class="rowsBeforeTitle.length == 0 && index == 0 && title == null? ' solid-top margin-top-sm': ' solid-top'"
			v-for="(rowAfterTitle, index) in rowsAfterTitle"
			:key="'a' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-white text-center solid-right"
				style="flex: auto;"
				:style="'width:' + rowAfterTitle.titleWidth + ';background-color:' + rowAfterTitle.titleColor + ';'"
			>
				{{rowAfterTitle.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right"
				style="flex: auto;"
				:style="'width:' + rowAfterTitle.contentWidth + ';background-color:' + rowAfterTitle.contentColor + ';'"
			>
				{{rowAfterTitle.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tableNoEditEgA',
		props: {
			title: {
				required: true,
				default: null
			},
			rowsBeforeTitle: {
				// 为列表，内容大体如 TableEgAElem
				required: true,
				default: []
			},
			rowsAfterTitle: {
				// 为列表，内容大体如 TableEgAElem
				required: true,
				default: []
			}
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
</style>
