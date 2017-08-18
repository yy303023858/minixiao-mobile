// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  AjaxPlugin,
  ToastPlugin,
  LoadingPlugin
} from 'vux'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/iconfont/iconfont.css'
// import eruda from 'eruda'
// import vueg from 'vueg'
// import 'vueg/css/transition-min.css'
// eruda.init()

Vue.use(AjaxPlugin)
Vue.use(VueAwesomeSwiper)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(require('vue-wechat-title'))
// Vue.use(vueg, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
let vmm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    search: '',
    eventHub: new Vue()
  }
})

router.beforeEach((to, from, next) => {
  // 查看是否登录
  // if (localStorage.getItem('')) {}

  //  统一管理下面tabbar
  if (/jobs\//g.test(to.path) || /company\//g.test(to.path) || /search/g.test(to.path) || /profile/g.test(to.path) || /channel\//g.test(to.path) || /login/g.test(to.path) || /applylog/g.test(to.path) || /intention/g.test(to.path) || /attachment/g.test(to.path) || /config/g.test(to.path) || /changepwd/g.test(to.path) || /feedback/g.test(to.path) || /privacy/g.test(to.path) || /signup/g.test(to.path) || /collection/g.test(to.path) || /information/g.test(to.path)) {
    vmm.$root.eventHub.$emit('hideToolBar')
    next()
  } else {
    vmm.$root.eventHub.$emit('showToolBar')
    next()
  }
})

// router.push('/')
