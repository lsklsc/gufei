import Vue from 'vue'
import App from './App'
import * as filters from './common/filters.js'//过滤
import store from './store'
import base from './base'//引用

Vue.config.productionTip = false

Vue.use(base);//将全局函数当做插件来进行注册

// 全局过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// vuex
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
