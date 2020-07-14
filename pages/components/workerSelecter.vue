<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				人员选择
			</block>
		</cu-custom>
		<view class="cu-form-group margin-top" v-for="(param, index) in workers" :key="index">
			<view class="title" @tap="jumpToDetails(param.id)">{{param.workerName + '-' + param.dictName}}</view>
			<switch @change="switchChange(param.id, $event)" :class="selected[param.id]?'checked':''" :checked="selected[param.id]" :disabled="disabled[param.id]"></switch>
		</view>
	</view>
</template>

<script>
	import PermissionRequest from "@/pages/components/network/request/permission.js";
	import ProductRequest from "@/pages/components/network/request/product.js";
	
	export default {
		data() {
			return {
				targetId: null,
				targetValue: null,
				workers: null,
				productRequest: new ProductRequest(),
				selected: {},
				disabled: {},
				permissionRequest: new PermissionRequest(),
			}
		},
		onLoad:function(options){
			this.targetId = options.targetId !== null && options.targetId !== undefined? options.targetId: null;
			this.targetValue = options.targetValue !== null && options.targetValue !== undefined? options.targetValue: null;
			if (this.targetValue !== null && this.targetValue != "") {
				this.targetValue = this.targetValue.split("-");
			}
			else {
				this.targetValue = [];
			}
			this.targetValue.forEach((item, index) => {
				this.$set(this.selected, item, true);
				this.$set(this.disabled, item, false);
			});
			this.productRequest.selectWorker(data => {
				this.workers = data;
				this.workers.forEach(item => {
					if (!this.selected[item.id]) {
						this.$set(this.selected, item.id, false);
						if (this.targetValue.length >= 3) {
							this.$set(this.disabled, item.id, true);
						}
						else {
							this.$set(this.disabled, item.id, false);
						}
					}
					else {
						this.$set(this.disabled, item.id, false);
					}
				});
				uni.setStorage({
					key: 'workers',
					data: JSON.stringify(data),
				});
			});
		},
		methods: {
			/**
			 * @description 跳转至人员详情页面
			 * @param {Object} id 人员id
			 */
			jumpToDetails: function(id) {
				uni.navigateTo({
					url: "/pages/components/personDetails?workerId=" + id,
				});
			},
			switchChange: function(id, e) {
				let selectIndex = this.targetValue.indexOf(id.toString());
				if (e.detail.value && selectIndex == -1) {
					this.targetValue.push(id.toString());
					this.selected[id] = true;
				}
				else if (selectIndex != -1){
					this.targetValue.splice(selectIndex, 1);
					this.selected[id] = false;
				}
				
				uni.$emit(this.targetId, {
					'targetId': this.targetId,
					'targetValue': this.targetValue,
				});
				
				this.workers.forEach(item => {
					if (this.targetValue.length >= 3) {
						if (!this.selected[item.id]) {
							this.$set(this.disabled, item.id, true);
						}
					}
					else {
						this.$set(this.disabled, item.id, false);
					}
				});
				
				
			}
		},
		beforeDestroy:function(){
			uni.$emit("workersSelecterClose", this.targetId);
		}
	}
</script>

<style>

</style>
