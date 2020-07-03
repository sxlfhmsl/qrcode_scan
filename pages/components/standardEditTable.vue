<template>
	<view>
		<!-- 标题 -->
		<view class="flex margin-left-sm margin-right-sm font-title-simkai-nocolor">
			<view 
				class="padding-sm col-auto-line text-white soild margin-top-sm"
				style="width: 100%;flex: auto; background-color: #5c9ed6"
			>
				{{viewData.title}}
			</view>
		</view>
		
		<!-- 下部 -->
		<view
			class="flex margin-left-sm margin-right-sm solid-left solid-bottom solid-top"
			v-for="(item, index) in this.viewData.itemData"
			:key="index"
		>
			<!-- 标题 -->
			<view 
				class="padding-sm col-auto-line text-white text-center solid-right font-title-simhei"
				style="flex: auto; width: 25%; background-color: #dad8d8"
			>
				{{item.title}}
			</view>
			
			<!-- 内容 -->
			<view
				class="padding-sm col-auto-line bg-white solid-right font-content-simsun"
				style="flex: auto; width: 75%; background-color: white"
			>
				<input v-if="item.type == 'text'" v-model="item.value" :id="item.id" @change="inputChange(item.id, item.value)" style="height: 100%; width: 100%;"/>
				<image 
					v-if="item.type == 'image'"
					mode="widthFix"
					:src="showPictureObj[item.id]? Url.resBaseUrl + showPictureObj[item.id]: ''"
					@tap="pictureChooseList(picInt, item.title, item.id)"
					:id="item.id"
				></image>
				
				<picker v-if="item.type == 'date'" :value="item.value" mode="date" @change="dateChange($event)" :id="item.id" style="height: 100%; width: 100%;">
					<input v-model="item.value" disabled="true" style="height: 100%; width: 100%;"/>
				</picker>
				
				<picker v-if="item.type == 'worker'" @change="workerPickerChange($event, item.id)" range-key="label" :value="workerIndex" :range="workersLocal" style="height: 100%; width: 100%;" :id="item.id">
					<view class="picker">
						{{workerIndex == null? '': workers[workerIndex].workerName + '-' + workers[workerIndex].dictName + '（' + workers[workerIndex].deptName + '）'}}
					</view>
				</picker>
				
				<view @tap="changeWorkerList(item.id)" v-if="item.type == 'workerList'" style="min-height: 1em;">
					<view class="margin-bottom-sm" v-if="Object.keys(workerObjs).length > 0"  v-for="(param, textListIndex) in workerListObj[item.id]" :key="'bTextList' + index + '-' + textListIndex">
						{{workerObjs[param].workerName + '-' + workerObjs[param].dictName /*+ '（' + workerObjs[param].deptName + '）'*/}}
					</view>
				</view>
				
				<swiper v-if="item.type == 'imageList'" class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item @tap="imagePreview(showPictureListObj[item.id])" v-for="(param, imageListIndex) in showPictureListObj[item.id]" :key="'bImageList' + index + '-' + imageListIndex">
						<image :src="Url.resBaseUrl + param" mode="aspectFill" :id="'imageb' + index + '-' + imageListIndex"></image>
						<button @tap.stop="removePicture(item.id, imageListIndex)" class="cu-btn bg-red" style="position: absolute; z-index: 999; top: 0rpx; left: 0rpx;">删除</button>
					</swiper-item>
					<swiper-item>
						<view class="text-center font-title-simkai" style="width: 100%; height: 100%;">
							<button @tap="pictureChoose(item.id, item.type)" class="cu-btn line-blue round lg shadow" style="margin-top: 32%;">上传</button>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import SystemRequest from "@/pages/components/network/request/system";
	import ProductRequest from "@/pages/components/network/request/product";
	import Url from "@/pages/components/network/request/url";
	
	export default {
		name: 'standardEditTable',
		props: {
			'itemData': {
				//结构[{id: '', value: '', title: '', type: 'image or text'}]
				'required': true,
			},
			'title': {
				'required': true,
				default: 'kkkk'
			},
			'picInt': {
				'required': true,
			},
			'workers': {
				'required': true,
			}
		},
		watch: {
			itemData: {
				handler: function(val, oldval){
					this.viewData.itemData = val;
				}
			},
			title: {
				handler: function(val, oldval){
					this.viewData.title = val;
				}
			}
		},
		data() {
			return {
				'viewData': {
					itemData: [],
					'title': ''
				},
				'systemRequest': new SystemRequest(),
				'workerIndex': null,
				'Url': Url,
				workersLocal: [],
				pictureEventName: '',
				showPictureObj: {},
				showPictureListObj: {},
				workerListObj: {},
				workerObjs: {},
			}
		},
		methods: {
			workersChange: function(params) {
				this.workerListObj[params.targetId] = params.targetValue;
				this.applyChange(params.targetId, params.targetValue.join(","));
				let workerNamesKey = params.targetId.substring(0, params.targetId.indexOf('WorkerIds')) + 'WorkerNames';
				let workerNamesValue = [];
				params.targetValue.forEach(item => {
					workerNamesValue.push(this.workerObjs[item].workerName + "-" + this.workerObjs[item].dictName);
				});
				this.applyChange(workerNamesKey, workerNamesValue.join(","));
				
			},
			workersSelecterClose: function(id) {
				uni.$off(id, this.workersChange);
			},
			changeWorkerList: function(id) {
				uni.setStorageSync("workers", JSON.stringify(this.workers));
				uni.navigateTo({
					url: "/pages/components/workerSelecter?targetId=" + id + "&targetValue=" +  this.workerListObj[id].join("-"),
				});
				uni.$on(id, this.workersChange);
			},
			/**
			 * @description 图片预览
			 */
			imagePreview: function(urls) {
				let newUrls = [];
				urls.forEach(item => {
					newUrls.push(Url.resBaseUrl + item);
				});
				uni.previewImage({
					urls: newUrls
				});
			},
			pictureChangeResponse: function(picInfo) {
				if (this.pictureEventName == picInfo.id) {
					this.applyChange(picInfo.id, picInfo.att);
				}
				this.$set(this.showPictureObj, picInfo.id, picInfo.att);
				uni.$off(this.pictureEventName, this.pictureChangeResponse);
				this.pictureEventName = '';
			},
			pictureChooseList: function(type, title, id) {
				this.pictureEventName = id;
				uni.$on(this.pictureEventName, this.pictureChangeResponse);
				uni.navigateTo({
					'url': '/pages/components/imageChoose?type=' + type + '&title=' + title + '&id=' + this.pictureEventName
				});
			},
			pictureChoose: function(id, eleType) {
				uni.chooseImage({
				    count: 1,
				    success: res => {
						this.systemRequest.attUpload(res.tempFilePaths[0], result => {
							let dataAtt = result;
							if (eleType == 'imageList') {
								this.showPictureListObj[id].push(dataAtt);
								dataAtt = this.showPictureListObj[id].join(",");
							}
							this.applyChange(id, dataAtt);
							this.viewData.itemData.forEach(item => {
								if (item.id == id) {
									item.value = dataAtt;
								}
							});
						})
				    }
				});
			},
			removePicture: function(id, index) {
				this.showPictureListObj[id].splice(index, 1);
				this.applyChange(id, this.showPictureListObj[id].join(","));
			},
			inputChange: function(id, value) {
				this.applyChange(id, value);
			},
			dateChange: function(e) {
				let value = e.detail.value;
				this.viewData.itemData.forEach(item => {
					if (item.id == e.currentTarget.id) {
						item.value = value; 
					}
				});
				this.applyChange(e.currentTarget.id, e.detail.value);
			},
			applyChange: function(id, value) {
				console.log(id, value);
				this.$emit('itemChange', {'id': id, 'value': value});
			},
			workerPickerChange: function(e, id) {
				this.workerIndex = e.detail.value;
				let workerNameKey = id.substring(0, id.indexOf('WorkerId')) + 'WorkerName';
				this.applyChange(id, this.workers[this.workerIndex].id);
				this.applyChange(workerNameKey, this.workers[this.workerIndex].workerName + '-' + this.workers[this.workerIndex].dictName + '（' + this.workers[this.workerIndex].deptName + '）');
			},
		},
		mounted: function(){
			this.viewData.itemData = this.itemData;
			this.viewData.title = this.title;
			
			this.$nextTick(() => {
				this.viewData.itemData.forEach(item => {
					if (item.type == 'image') {
						this.$set(this.showPictureObj, item.id, item.value);
					}
					
					if (item.type == 'imageList') {
						this.$set(this.showPictureListObj, item.id, item.value);
					}
					
					if (item.type == 'workerList') {
						this.$set(this.workerListObj, item.id, item.value);
						this.workers.forEach(workerItem => {
							this.$set(this.workerObjs, workerItem.id, workerItem);
						});
					}
					
					if (item.type == 'worker') {
						this.workers.forEach((wItem, wIndex) => {
							if (wItem.id == item.value) {
								this.workerIndex = wIndex;
							}
						});
					}
				});
				
				this.workers.forEach((item, index) => {
					this.workersLocal.push(item);
					this.workersLocal[index].label = item.workerName + '-' + item.dictName + '（' + item.deptName + '）';
				});
			});
			
			uni.$on("workersSelecterClose", this.workersSelecterClose);
		},
		destroyed: function() {
			uni.$off(this.pictureEventName, this.pictureChangeResponse);
			uni.$off("workersSelecterClose", this.workersSelecterClose);
		}
	}
</script>

<style>
	* {
		font-size: 25rpx;
	}
</style>
