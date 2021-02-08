<template>
  <div class="navbox position-relative">

    <router-link v-if="flag==='shop'" to="/robbbbuy/shop" class="logo-robbbbuy" id="logo">
      <img src="../../assets/robbbbuy.png"  alt="" :style="{opacity: showMainNav || showSubNav ? 0 : 1}" >
    </router-link>
    <router-link v-else-if='!(showMainNav || showSubNav)' to="/" class="logo" id="logo">
      <img src="../../assets/logo.png"  alt="" :style="{opacity: showMainNav || showSubNav ? 0 : 1}" >
    </router-link>

    <div class="nav-menu " >
      <div class="nav-top" :style="{zIndex: (showMainNav || showSubNav) ? '10' : '2' }">
          <span :style="{opacity: (showMainNav || showSubNav) ? 1 : 0, zIndex: (showMainNav || showSubNav) ? '10' : '3' }" v-show="showMainNav || showSubNav" @click="handleLangValue" class="lang">{{$i18n.locale === 'en' ? 'CN' : 'EN'}}</span>
          <div class="hamburger" id="hamburger-1" @click="handleShowMainNav" :class="showMainNav && 'is-active'" >
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
      </div>

      <div class="navs">
        <transition name="slide-fade">
          <div class="main-nav" ref="mainNav" v-if="showMainNav" >
            <ul class="nav-left" >
              <li
                v-for="(item, index) in datas"
                :key="item.id"
                @click='index === 0 ? handleShowSubNav(item.id) : handleCloseNav()'
              >
                <span v-if="index === 0" :style="{opacity: showSubNav ? '.5' : null, cursor: 'pointer'}">{{langValue(item, 'title')}}</span>
                <router-link v-else-if="index === 2" :to="item.link_url" class="red">{{langValue(item, 'title')}}</router-link>
                <router-link v-else :to="`${item.link_url}?id=${item.id}`" >{{langValue(item, 'title')}}</router-link>
              </li>
            </ul>
          </div>
        </transition>

        <transition name="slide-fade">
          <div class="sub-nav" v-if="showSubNav">
            <ul class="nav-left" >
              <li v-for="subNav in navList" :key="subNav.id" @click="handleCloseNav">
                <router-link class="nav-item" :to="`${subNav.link_url}?id=${subNav.id}`">{{langValue(subNav, 'title')}}</router-link>
              </li>
            </ul>
          </div>
        </transition>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['type', 'datas'],
  data () {
    return {
      showMainNav: false,
      showSubNav: false,
      mainNavOpacity: 1,
      navList: []
    }
  },
  mounted () {
    console.log(this.$i18n, this.type, this.$i18n.locale, '18n')
  },
  computed: {
    flag (val) {
      return this.type
    }
  },
  watch: {
    datas (val) {
      if (val.length) {
        this.getNavs(val[0].id)
      }
    }
  },
  methods: {
    handleLangValue () {
      const loc = this.$i18n.locale
      this.$i18n.locale = loc === 'en' ? 'zh' : 'en'
      window.sessionStorage.setItem('LOCALE', this.$i18n.locale)
    },
    getNavs (pid) {
      if (this.navList.length) return Promise.resolve()
      return this.ajaxPost('api/index/getNavChildList', {
        pid
      }).then(res => {
        this.navList = res.data
        console.log(res, 'navList')
      })
    },
    handleShowMainNav () {
      if (this.showSubNav) {
        this.showSubNav = false
        this.mainNavOpacity = 0
        console.log(this.showMainNav, 'showMainnav')
        setTimeout(() => {
          this.mainNavOpacity = 1
        }, 800)
      } else {
        this.showSubNav = false
        this.showMainNav = this.showSubNav ? true : !this.showMainNav
      }
    },
    handleCloseNav () {
      if (this.showSubNav) {
        this.showSubNav = false
        this.mainNavOpacity = 0
        console.log(this.showMainNav, 'showMainnav')
        setTimeout(() => {
          this.showMainNav = false
          this.$refs.mainNav.removeAttribute('style')
        }, 800)
      } else {
        this.showMainNav = false
        this.$refs.mainNav.removeAttribute('style')
      }
    },
    handleShowSubNav (pid) {
      if (this.showSubNav) {
        this.showSubNav = false;
        return
      }
      this.getNavs(pid).then(() => {
        console.log('show sub nav')
        this.showSubNav = true
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../sass/var.scss';

.hamburger {
  float: right;
  margin-top: 20px;
}

.hamburger .line{
  width: 35PX;
  height: 5PX;
  background-color: #000;
  display: block;
  margin: 5PX auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover{
  cursor: pointer;
}

/* ONE */

#hamburger-1.is-active .line:nth-child(2){
  opacity: 0;
}

#hamburger-1.is-active .line:nth-child(1){
  -webkit-transform: translateY(10PX) rotate(45deg);
  -ms-transform: translateY(10PX) rotate(45deg);
  -o-transform: translateY(10PX) rotate(45deg);
  transform: translateY(10PX) rotate(45deg);
  opacity: .5;
}

#hamburger-1.is-active .line:nth-child(3){
  -webkit-transform: translateY(-10PX) rotate(-45deg);
  -ms-transform: translateY(-10PX) rotate(-45deg);
  -o-transform: translateY(-10PX) rotate(-45deg);
  transform: translateY(-10PX) rotate(-45deg);
  opacity: .5;
}

.logo {
  width: 100px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  img {
    opacity: 1;
    transition: all .5s;
    width: 100%;
  }
}

.logo-robbbbuy {
  width: 270px;
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 3;
  img {
    opacity: 1;
    transition: all .5s;
    width: 100%;
  }
}

.lang {
  float: left;
  margin-top: 20px;
  font-size: 40px;
  font-weight: 700;
  line-height: 70px;
  vertical-align: middle;
  cursor: pointer;
  transition: all .5s;
  &:hover {
    opacity: .5 !important;
  }
}
.red { color: $themeColor; }
.navbox {
  position: relative;
  z-index: 10;
  height: 126px;
}
.nav-menu {
  position: relative;

  .navs {
      position: absolute;
      top: 100%;
      left: -.5%;
      width: 101%;
      z-index: 1;

      .main-nav {
        background: #fff;
        padding-bottom: 40px;
      }
  }

  .nav-left {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 1 1 100%;
      position: relative;
      z-index: 9;
      font-size: 36px;
      font-weight: 700;
      line-height: 70px;
      text-align: center;
      a {
        display: block;
      }

    }
  }
  .main-nav {
    .nav-left li {
      &:nth-child(3) {
        order: 5;
      }
    }
  }

  .sub-nav {
    position: absolute;
    top: 70px;
    z-index: 9;
    width: 100%;
    background: #fff;
    padding-bottom: 40px;
  }
}

.nav-top {
  position: relative;
  z-index: 2;
  text-align: right;
  overflow: hidden;
 }

.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(0.7, 0.9, 0.9, 0.9);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-8em);
  opacity: 0;
}

.fade-enter-active {
  transition: all .8s ease;
}
.fade-leave-active {
  transition: all .5s cubic-bezier(0.7, 0.9, 0.9, 0.9);
}
.fade-enter, .fade-leave-to
/* .fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}

.slide-left-enter-active {
  transition: all .8s ease;
}
.slide-left-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.7, 0.9, 0.6);
}
.slide-left-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(8em);
  opacity: 0;
}

.slide-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-8em);
  opacity: 0;
}

</style>
