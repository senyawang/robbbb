<template>
  <div class="navbox ui-flex-box" style="margin-bottom: 15px;">
    <div class="menu-title" :style="{opacity: showMainNav ? 0 : 1, transition: 'all .5s', float: 'left'}">{{$t('routes')[title]}}</div>
    <div class="nav-menu ui-flex-item">
      <div class="navs">
        <transition name="slide-fade">
          <div class="main-nav" v-if="showMainNav">
            <ul class="nav-left" >
              <li ><router-link to="/robbbbuy/account">{{$t('shopNav')[0]}}</router-link></li>
              <li ><router-link to="/robbbbuy/shop/cart" >{{$t('shopNav')[1]}}  <span class="cart-num">{{cartNum}}</span></router-link></li>
              <li ><router-link to="/robbbbuy/service">{{$t('shopNav')[2]}}</router-link></li>
              <li  @click="handleLogout">{{$t('shopNav')[3]}}</li>
            </ul>
            <!--<div class="xxx">-->
              <!--<img @click="handleShowMainNav" src="../../assets/x.png" class="float-right shoushi" id="xxx" >-->
            <!--</div>-->
          </div>
        </transition>
      </div>

      <div v-if="isLogin" class="nav-right jiantou">
        <span :style="{opacity: showMainNav ? 0 : 1, transition: 'all .5s'}">{{$t('shopTitle')[3]}}，</span>
        <span @click="handleShowMainNav" :class="['user-name', showMainNav && 'active']">{{userName}}</span>
      </div>
      <div v-else class="nav-right jiantou login">
        <span @click="handleShowLogin">{{$t('shopTitle')[1]}}</span>
         /
         <span @click="handleShowRegister">{{$t('shopTitle')[2]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/eventBus'
export default {
  name: 'Menu',
  props: ['title', 'handleShowLogin', 'handleShowRegister', 'setLoginHandle'],
  data () {
    return {
      subtitle: '',
      showMainNav: false,
      showSubNav: false,
      isLogin: false,
      userName: '',
      cartNum: 0
    }
  },
  mounted () {
    this.init()
    console.log(localStorage.getItem('CART'))
    const localCart = JSON.parse(localStorage.getItem('CART')) || []
    this.cartNum = localCart.length

    EventBus.$on('cartchange', () => {
      const localCart = JSON.parse(localStorage.getItem('CART')) || []
      this.cartNum = localCart.length
    })
  },
  methods: {
    init () {
      this.ajaxPost('api/shop/getUserDetail', {
      }).then(res => {
        this.userName = res.data.username
        window.sessionStorage.setItem('userName', res.data.username)
        this.isLogin = true
        this.setLoginHandle(true)
      }).catch(err => this.showMsg(err))
    },
    handleShowMainNav () {
      this.showMainNav = this.showSubNav ? false : !this.showMainNav
      this.showSubNav = false
    },
    handleShowSubNav () {
      this.showSubNav = true
      // this.showMainNav = false;
    },
    loginHandle () {
      this.handleShowLogin()
    },
    handleLogout () {
      this.ajaxPost('api/shop/logout', {
      }).then(res => {
        if (this.$route.fullPath === '/robbbbuy/shop') {
          window.location.reload()
        } else {
          window.location.href = '#/robbbbuy/shop'
          setTimeout(() => {
            window.location.reload()
          })
        }
      }).catch(err => this.showMsg(err))
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../sass/var.scss';

.user-name {
  color: $themeColor;
  cursor: pointer;
  &:hover,
  &.active {
    opacity: .7;
  }
}
.menu-title {
  position: absolute;
}
.red { color: $themeColor; }
.navbox {
  position: relative;
  padding-bottom: 10px;
  height: 40px;
  z-index: 9;
  line-height: 36px;
  font-size: 20px;
}
.nav-menu {
  position: relative;
  display: flex;
  align-items: top;
  overflow: hidden;
  .navs {
    flex: 1 1 auto;
  }
  .main-nav {
    display: flex;
    .nav-left {
      flex: 1 1 auto;
    }
  }
}

.login {
  cursor: pointer;
}

.xxx {
  img {
    width: 14px;
    height: 14px;
    margin-top: 15px;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
      opacity: .5;
    }
  }
}

.nav-right {
  position: relative;
  z-index: 1;
  width: 200px;
  text-align: right;
  padding-left: 40px;
  background: #fff;
  img {
    /*height: 36px;*/
    height: 21px;
    width: 54px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      opacity: .5;
    }
  }
}

.nav-left {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  height: 36px;
  .cart-num {
    position: absolute;
    right: -10px;
    top: 0;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    border-radius: 50%;
    background: $themeColor;
    color: #fff;
  }
}

.nav-left li {
  position: relative;
  z-index: 9;
  margin: 0 6% 0 0;
  display: inline-block;
  cursor: pointer;
  a {
    display: block;

  }
  &:hover {
    opacity: .5;
  }
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(0.7, 0.9, 0.9, 0.9);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(900px);
  /*opacity: 0;*/
}

.slide-left-enter-active {
  transition: all .5s ease;
}
.slide-left-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.7, 0.9, 0.6);
}
.slide-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-900px);
  /*opacity: 0;*/
}

.slide-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(900px);
  /*opacity: 0;*/
}

</style>
