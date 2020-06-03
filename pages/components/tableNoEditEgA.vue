<template>
	<view>
		<!-- 上部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom"
			:class="index == 0? ' solid-top margin-top-sm': ' solid-top'"
			v-for="(rowBeforeTitle, index) in rowsBeforeTitle"
			v-if="rowBeforeTitle.contentType != 'image' || rowBeforeTitle.content"
			:key="'b' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-black text-center solid-right"
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
				<text v-if="rowBeforeTitle.contentType == 'text'">{{rowBeforeTitle.content}}</text>
				<image v-if="rowBeforeTitle.contentType == 'image'" @tap="imagePreview(rowBeforeTitle.content)" :src="rowBeforeTitle.content" mode="widthFix" :id="'imageb' + index"></image>
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
			v-if="rowAfterTitle.contentType != 'image' || rowAfterTitle.content"
			:key="'a' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-black text-center solid-right"
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
				<text v-if="rowAfterTitle.contentType == 'text'">{{rowAfterTitle.content}}</text>
				<image v-if="rowAfterTitle.contentType == 'image'" @tap="imagePreview(rowAfterTitle.content)" :src="rowAfterTitle.content" mode="widthFix" :id="'imagea' + index"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tableNoEditEgA',
		props: {
			title: {
				default: null
			},
			rowsBeforeTitle: {
				// 为列表，内容大体如 TableEgAElem
				default: function() {
					return [];
				}
			},
			rowsAfterTitle: {
				// 为列表，内容大体如 TableEgAElem
				default:  function() {
					return [];
				}
			},
			rawData: {
				default: null
			}
		},
		data() {
			return {
			}
		},
		methods: {
			/**
			 * @description 图片预览
			 */
			imagePreview: function(url) {
				uni.previewImage({
					urls: [url]
				});
			}
		}
	}
</script>

<style>
	.col-auto-line {
		word-wrap:break-word;
		word-break:normal;
	}
</style>
