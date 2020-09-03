<template>
  <div style="padding-top: 40px;">
    <Menu
        :title="subTitle"
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
          showLogin: false,
          showRegister: false,
        }
      }
    })
    return {
      globalData: this.globalData,
    }
  },
  mounted () {
    console.log(this.$route.fullPath, 'router.fullpath');

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
  }
}
</script>
<style lang='scss' scoped>

</style>
