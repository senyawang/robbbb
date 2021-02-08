import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import qs from 'qs';
import $ from 'jquery';
import routes from './router-mobile.js'
import store from './vuex/store.js'
import App from './Mobile.vue'
import messages from './lang.config.js';
import { Swipe, SwipeItem, SwipeCell, NoticeBar } from 'vant';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(store)
Vue.use(VueI18n)
Vue.prototype.axios = axios


Vue.use(Swipe);
Vue.use(NoticeBar);
Vue.use(SwipeItem);
Vue.use(SwipeCell);


// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息
})

const host = process.env.NODE_ENV === 'production' ? location.host : '203.195.204.34'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? `http://${host}` : '/apis'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let route = new VueRouter({ mode: 'hash', routes: routes })

Vue.prototype.$Event = new Vue()

// 全局配置
Vue.mixin({
  // data () {
  //   return {
  //     cartNum: 0 ,
  //     showLogin: false,
  //     showRegister: false,
  //   }
  // },
  filters: {
    money (value) {
      if (/[^0-9\.]/.test(value)) { return '0' }
      if (value == null || value == '') { return '0' }
      value = value.toString().replace(/^(\d*)$/, '$1.')
      value = (value + '00').replace(/(\d*\.\d\d)\d*/, '$1')
      value = value.replace('.', ',')
      var re = /(\d)(\d{3},)/
      while (re.test(value)) { value = value.replace(re, '$1,$2') }
      value = value.replace(/,(\d\d)$/, '.$1')
      return value.split('.')[0]
    },
    lang (value) {
      const loc = i18n.locale
      return loc === 'zh' ? value : `en_${value}`
    },
    formatImg (val) {
      return `http://${host}${val}`
    }
  },
  // provide: () => {
  //   this.globalData = new Vue({
  //     data () {
  //       return {
  //         showLogin: false,
  //         showRegister: false,
  //       }
  //     }
  //   })
  // },
  computed: {},
  methods: {
    handleChangeLang () {
      const loc = i18n.locale
      i18n.locale = loc === 'zh' ? 'en' : 'zh'
    },
    ajaxPost (url, params) {
      console.log(this, 'this')
      const vm = this
      return axios.post(url, qs.stringify(params))
        .then(res => res.data)
        .then(data => {
          if (data.code === -2) {
            const loc = i18n.locale
            setTimeout(() => {
              window.location.href = '/#/robbbbuy/shop'
            }, 3000)
            return Promise.reject(loc === 'zh' ? data.msg : data.en_msg)
          }
          if (data.code !== 0) {
            const loc = i18n.locale
            return Promise.reject(loc === 'zh' ? data.msg : data.en_msg)
          }
          return Promise.resolve(data)
        }).catch(err => {
          console.error(err)
          vm.$Event.$emit('ERROR', err)
          return Promise.reject(err)
        })
    },
    // handleShowLogin(){
    //   console.log(1111);
    //   this.globalData.showLogin = true;
    // },

    langValue (obj, key) {
      const loc = this.$i18n.locale
      return loc === 'zh' ? obj[key] : obj[`en_${key}`]
    }

  }
})

/* eslint-disable no-new */
let apps = new Vue({
  el: '#app',
  i18n,
  router: route,
  render: h => h(App)
})

let routerHistory = []
let commit = store.commit || store.dispatch

route.beforeEach((to, from, next) => {
  let rl = routerHistory.length
  // console.log(routerHistory[rl-1],to.path)
  if (rl > 1 && routerHistory[rl - 2] === to.path) { // router.app.transition = 'vux-pop-out'
    commit('UPDATEPAGEDIR', 'vux-pop-out')
    routerHistory.splice(rl - 1, 1)
    setTimeout(next, 15)
    // return
  } else { // router.app.transition = 'vux-pop-in'
    commit('UPDATEPAGEDIR', 'vux-pop-in')
    routerHistory.push(to.path)
    setTimeout(next, 15)
  }
})

route.afterEach((to, from) => { // commit('UPDATEPAGEDIR', 'vux-pop-in')
  commit('SETTITLE', to.meta.title)
  // commit('UPDATELOADING', false)

  // transition.to.router.app.$root.updateLoading(false)
})
