<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">
				人员选择
			</block>
		</cu-custom>
		<view class="cu-form-group margin-top" v-for="(param, index) in workers" :key="index">
			<view class="title">{{param.workerName + '-' + param.dictName}}</view>
			<switch @change="switchChange(param.id, $event)" :class="targetValue.indexOf(param.id) != -1?'checked':''" :checked="targetValue.indexOf(param.id) != -1"></switch>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				targetId: null,
				targetValue: null,
				workers: null,
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
				this.targetValue[index] = Number(item);
			});
			this.workers = JSON.parse(uni.getStorageSync("workers"));
		},
		methods: {
			switchChange: function(id, e) {
				id = Number(id);
				let selectIndex = this.targetValue.indexOf(id);
				if (e.detail.value && selectIndex == -1) {
					this.targetValue.push(id);
				}
				else if (selectIndex != -1){
					this.targetValue.splice(selectIndex, 1);
				}
				
				this.targetValue.forEach((item, index) => {
					this.targetValue[index] = Number(item);
				});
				
				uni.$emit(this.targetId, {
					'targetId': this.targetId,
					'targetValue': this.targetValue,
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
