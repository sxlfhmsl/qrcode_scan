<template>
	<view>
		<!-- 上部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom"
			:class="index == 0? ' solid-top margin-top-sm': ' solid-top'"
			v-for="(rowBeforeTitle, index) in rowsBeforeTitle"
			v-if="(rowBeforeTitle.contentType != 'image' || rowBeforeTitle.content) && (rowBeforeTitle.contentType != 'imageList' || rowBeforeTitle.content.length)"
			:key="'b' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-black text-center solid-right font-title-simhei-nocolor"
				style="flex: auto;"
				:style="'width:' + rowBeforeTitle.titleWidth + ';background-color:' + rowBeforeTitle.titleColor + ';'"
			>
				{{rowBeforeTitle.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right font-content-simsun"
				style="flex: auto;"
				:style="'width:' + rowBeforeTitle.contentWidth + ';background-color:' + rowBeforeTitle.contentColor + ';'"
			>
				<text v-if="rowBeforeTitle.contentType == 'text'">{{rowBeforeTitle.content}}</text>
				<image v-if="rowBeforeTitle.contentType == 'image'" @tap="imagePreview([rowBeforeTitle.content])" :src="rowBeforeTitle.content" mode="widthFix" :id="'imageb' + index"></image>
				
				<view v-if="rowBeforeTitle.contentType == 'textList'" v-for="(param, textListIndex) in rowBeforeTitle.content" :key="'bTextList' + index + '-' + textListIndex" class="margin-bottom-sm">
					<text>{{param}}</text>
				</view>
				
				<swiper v-if="rowBeforeTitle.contentType == 'imageList' && rowBeforeTitle.content.length" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item @tap="imagePreview(rowBeforeTitle.content)" v-for="(param, imageListIndex) in rowBeforeTitle.content" :key="'bImageList' + index + '-' + imageListIndex">
						<image :src="param" mode="aspectFill" :id="'imageb' + index + '-' + imageListIndex"></image>
					</swiper-item>
				</swiper>
				
			</view>
		</view>
		
		<!-- 标题 -->
		<view v-if="title != null" class="flex margin-left-sm margin-right-sm font-title-simkai-nocolor">
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
			v-if="(rowAfterTitle.contentType != 'image' || rowAfterTitle.content) && (rowAfterTitle.contentType != 'imageList' || rowAfterTitle.content.length)"
			:key="'a' + index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-black text-center solid-right font-title-simhei-nocolor"
				style="flex: auto;"
				:style="'width:' + rowAfterTitle.titleWidth + ';background-color:' + rowAfterTitle.titleColor + ';'"
			>
				{{rowAfterTitle.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right font-content-simsun"
				style="flex: auto;"
				:style="'width:' + rowAfterTitle.contentWidth + ';background-color:' + rowAfterTitle.contentColor + ';'"
			>
				<text v-if="rowAfterTitle.contentType == 'text'">{{rowAfterTitle.content}}</text>
				<image v-if="rowAfterTitle.contentType == 'image'" @tap="imagePreviewSingle(rowAfterTitle.content)" :src="rowAfterTitle.content" mode="widthFix" :id="'imagea' + index"></image>
				
				<view v-if="rowAfterTitle.contentType == 'textList'" @tap="jumpToPersonalDetails(textListIndex, rowAfterTitle.content)" v-for="(param, textListIndex) in rowAfterTitle.content.value" :key="'aTextList' + index + '-' + textListIndex" class="margin-bottom-sm">
					<text>{{param}}</text>
				</view>
				
				<swiper v-if="rowAfterTitle.contentType == 'imageList' && rowAfterTitle.content.length" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item @tap="imagePreview(rowAfterTitle.content)" v-for="(param, imageListIndex) in rowAfterTitle.content" :key="'bImageList' + index + '-' + imageListIndex">
						<image :src="param" mode="aspectFill" :id="'imageb' + index + '-' + imageListIndex"></image>
					</swiper-item>
				</swiper>
				
			</view>
		</view>
	</view>
</template>

<script>
	import PermissionRequest from "@/pages/components/network/request/permission.js";
	
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
				permissionRequest: new PermissionRequest(),
			}
		},
		methods: {
			/**
			 * @description 图片预览
			 */
			imagePreview: function(urls) {
				uni.previewImage({
					urls: urls
				});
			},
			imagePreviewSingle: function(url) {
				uni.previewImage({
					urls: [url]
				});
			},
			jumpToPersonalDetails: function(index, content) {
				this.permissionRequest.data(
					6,
					content.productId,
					result => {
						if (result) {
							uni.navigateTo({
								url: "/pages/components/personDetails?workerId=" + content.extend[index],
							})
						}
					}
				);
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
