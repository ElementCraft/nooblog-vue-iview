import Vue from 'vue'
import App from './App'
import Resource from "vue-resource"
import router from './router'
import VueLocalStorage from 'vue-localstorage'

import iview from "iview"
import 'iview/dist/styles/iview.css'

import LazyLoad from "vue-lazyload"

Vue.use(Resource)
Vue.use(LazyLoad)
Vue.use(iview)
Vue.use(VueLocalStorage)

Vue.config.productionTip = false
Vue.http.options.emulateJSON = false;
Vue.http.options.root = "http://localhost:8081/"


var token = Vue.localStorage.get("token");
if (token) {
	Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
}

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
