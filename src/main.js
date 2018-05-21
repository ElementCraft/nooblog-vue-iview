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
//Vue.http.options.root = "http://localhost:8081/"
Vue.http.options.root = "http://119.23.149.25:8088/"

var token = Vue.localStorage.get("token");
if (token) {
	Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.prototype.fixUserInfo = function(u){
	if(u.iconPath){
		u.iconPath = Vue.http.options.root + u.iconPath;
	}
	return u;
}

new Vue({
	el: '#app',
	router: router,
	components: {
		App
	},
	template: '<router-view />'
})
