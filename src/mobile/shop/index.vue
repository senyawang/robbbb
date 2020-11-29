<template>
  <div style="padding-top: 20px;">
    <Menu
        :title="subTitle"
        :setLoginHandle="handleSetLogin"
        :handleShowLogin="handleShowLogin"
        :handleShowRegister="handleShowRegister"
    />
    <router-view></router-view>
    <Login :handleShowLogin="handleShowLogin"></Login>
    <Register :handleShowRegister="handleShowRegister"></Register>

  </div>
</template>

<script>
import Vue from 'vue';
import Menu from './menu.vue';
import Login from '../common/login.vue';
import Register from '../common/register.vue';
import  EventBus from "../../utils/eventBus";
export default {
  data () {
    return {
      subTitle: this.$route.name,
    }
  },
  components: {
    Menu,
    Login,
    Register,
  },
  mounted() {
    console.log(this.$route.name, 'this.$route.name')
  },
  watch: {
    '$route' (to, from) {
        this.subTitle = to.name
        console.log(to.name, 'to.name');

    }
  },
  provide: () => {
    this.globalData = new Vue({
      data () {
        return {
          isLogin: false,
          showLogin: false,
          showRegister: false,
        }
      },
      methods: {
        handleShowLogin: this.handleShowLogin
      }
    })
    return {
      globalData: this.globalData,
    }
  },
  mounted () {
     EventBus.$on('showLogin', () => {
       this.handleShowLogin();
     })
  },
  updated () {
    // console.log(this._provided.globalData.showLogin, 'this._provided.globalData.showLogin')
  },
  methods: {
    handleShowLogin(){
      console.log(1111);
      this._provided.globalData.showLogin = !this._provided.globalData.showLogin;
    },
    handleShowRegister(){
      console.log(1111);
      this._provided.globalData.showRegister = !this._provided.globalData.showRegister;
    },
    handleSetLogin(isLogin){
      console.log(isLogin, 'isLogin')
      this._provided.globalData.isLogin=isLogin
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
