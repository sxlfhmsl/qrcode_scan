<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				{{title}}
			</block>
			<block slot="right">
				<text class="cu-btn lg round text-white cuIcon-pic" style="background-color: rgba(255,255,255,0);"></text>
			</block>
		</cu-custom>
		
		<scroll-view>
			<view class="padding">
				<view class="grid margin-bottom text-center col-1">
					<view 
						class="padding margin-bottom margin-top" 
						v-for="(image, index) in images"
						style="border: #222222 solid 3rpx;"
						:key="index"
					>
						<image mode="widthFix" :src="Url.resBaseUrl + image.att" @tap="choosePicture(image.att)"></image>
					</view>
				</view>
			</view>
			
			<view class="text-center">
				<button class="cu-btn bg-blue round lg shadow margin font-title-simkai-nocolor" @tap="addPicture">新增</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import SystemRequest from "@/pages/components/network/request/system";
	import Url from "@/pages/components/network/request/url";
	
	export default {
		data() {
			return {
				title: '',
				type: null,
				systemRequest: new SystemRequest(),
				images: null,
				'Url': Url,
				id: null,
			}
		},
		methods: {
			choosePicture: function(pictureUrl) {
				uni.$emit(this.id, {'att': pictureUrl, 'id': this.id});
				uni.navigateBack();
			},
			addPicture: function() {
				uni.chooseImage({
				    count: 1,
				    success: res => {
						this.systemRequest.attUpload(this.type, res.tempFilePaths[0], result => {
							this.choosePicture(result);
						})
				    }
				});
			}
		},
		onLoad: function(option) {
			this.title = option.title;
			this.type = option.type;
			this.id = option.id;
			
			this.$nextTick(() => {
				if (this.type != null && this.type != undefined) {
					this.systemRequest.attList(this.type, result => {
						this.images = result;
					});
				}
			});
		}
	}
</script>

<style>

</style>
