import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);

import worktable from './pages/worktable/worktable.vue';
Vue.component('worktable',worktable);

import personal from './pages/personal/personal.vue';
Vue.component('personal',personal);

// 定义全局变量
Vue.prototype.softwareInfo = {
	'defaultTitle': '产品数字化管理系统',                         // 系统默认标题
	'version': 'v0.0.1',                                        // 版本号
	'owner': 'LuSheng'                                          // 版权所属
};

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
