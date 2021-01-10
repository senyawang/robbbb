<template>
  <div class="navbox">
    <div style="font-weight: 700">{{$t('routes')[title] || $t('routes').shop}}</div>
    <div v-show="!$t('routes')[title]" style="font-weight: 700">{{$t('routes').title}}</div>

    <div class="nav-menu">
      <div v-if="isLogin" class="nav-right jiantou">
        <span>{{$t('shopTitle')[3]}}，</span>
        <span
          :style="{opacity: showMainNav ? 0.7 : 1}"
          @click="handleShowMainNav"
          class="user-name">{{userName}}</span>
      </div>
      <div v-else class="nav-right jiantou login">
        <span @click="handleShowLogin">{{$t('shopTitle')[1]}}</span>
         /
         <span @click="handleShowRegister">{{$t('shopTitle')[2]}}</span>
      </div>
    </div>

    <div class="navs">
        <transition name="slide-fade">
          <div class="main-nav" v-if="showMainNav">
            <ul class="nav-left"  @click="showMainNav = false">
              <li ><router-link to="/robbbbuy/account">{{$t('shopNav')[0]}}</router-link></li>
              <li ><router-link to="/robbbbuy/shop/cart" >{{$t('shopNav')[1]}}  <span class="cart-num">{{cartNum}}</span></router-link></li>
              <li ><router-link to="/robbbbuy/service">{{$t('shopNav')[2]}}</router-link></li>
              <li  @click="handleLogout">{{$t('shopNav')[3]}}</li>
            </ul>
          </div>
        </transition>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: ["title", "handleShowLogin", "handleShowRegister", "setLoginHandle"],
  data () {
    return {
      subtitle: '',
      showMainNav: false,
      showSubNav: false,
      isLogin: false,
      userName: '',
      cartNum: 0,
    }
  },
  mounted () {
    this.init();
    const localCart = JSON.parse(localStorage.getItem("CART")) || []
    this.cartNum = localCart.length
  },
  methods: {
    init(){
      this.ajaxPost('api/shop/getUserDetail', {
      }).then(res => {
        this.userName = res.data.username;
        window.sessionStorage.setItem('userName', res.data.username)
        this.isLogin = true;
        this.setLoginHandle(true)
      }).catch(err => this.showMsg(err))
    },
    handleShowMainNav() {
      this.showMainNav = this.showSubNav ? false : !this.showMainNav;
      this.showSubNav = false;
    },
    handleShowSubNav() {
      this.showSubNav = true;
      // this.showMainNav = false;
    },
    loginHandle(){
      this.handleShowLogin();
    },
    handleLogout(){
      this.ajaxPost('api/shop/logout', {
      }).then(res => {
        if(this.$route.fullPath === '/robbbbuy/shop'){
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
}
.red { color: $themeColor; }
.navbox {
  position: relative;
  padding-bottom: 20px;
  z-index: 9;
  line-height: 36px;
  font-size: 35px;
  text-align: center;
}
.nav-menu {
  position: relative;
  align-items: top;
  overflow: hidden;
  font-weight: 400;
  .login {
    font-weight: 400;
  }
}

 .main-nav {
    position: absolute;
    z-index: 9;
    width: 100%;
    background: #fff;
    padding: 40px 20px;
   font-weight: 700;
   .nav-left {
      li {
        position: relative;
        z-index: 9;
        font: 700 32px/2 arial;
        a {
          display: block;
        }
      }
      .cart-num {
        position: absolute;
        left: 50%;
        margin-left: 2em;
        display: inline-block;
        vertical-align: super;
        width: 32px;
        height: 32px;
        overflow: hidden;
        line-height: 32px;
        text-align: center;
        font-size: 24px;
        border-radius: 50%;
        background: $themeColor;
        color: #fff;
      }
    }
  }
.en {
  .cart-num {
    margin-left: 5em !important;
  }
}
.login {
  cursor: pointer;
}

.nav-right {
  position: relative;
  z-index: 1;
  font-size: 30px;
  font-weight: 900;
  margin-top: 30px;
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


.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(0.7, 0.9, 0.9, 0.9);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all .5s ease;
}
.slide-left-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.7, 0.9, 0.6);
}
.slide-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(50px);
  opacity: 0;
}

.slide-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}

</style>
