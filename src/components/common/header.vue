<template>
  <div class="navbox position-relative">
    <router-link v-if="flag==='shop'" to="/robbbbuy/shop" class="logo-robbbbuy" id="logo">
      <img src="../../assets/robbbbuy.png"  alt="" :style="{opacity: showMainNav || showSubNav ? 0 : 1}" >
    </router-link>
    <router-link v-else to="/" class="logo" id="logo">
      <img src="../../assets/logo.png"  alt="" :style="{opacity: showMainNav || showSubNav ? 0 : 1}" >
    </router-link>
    <div class="nav-menu ">
      <div class="navs">
        <transition name="slide-fade">
          <div class="main-nav" ref="mainNav" v-if="showMainNav" :style="{opacity: mainNavOpacity, transition: `all ${mainNavOpacity/2}s`}">
            <ul class="nav-left" >
              <li v-for="(item, index) in datas" :key="item.id" @click='index === 0 ? handleShowSubNav() : null' v-show="!(showSubNav && index > 0)">
                <router-link v-if="index === 0" to="" :style="{opacity: showSubNav ? '.5' : null}">{{langValue(item, 'title')}}</router-link>
                <router-link v-else-if="index === 2" :to="item.link_url" class="red">{{langValue(item, 'title')}}</router-link>
                <router-link v-else :to="`/about?id=${item.id}`" >{{langValue(item, 'title')}}</router-link>
              </li>
              <!-- <li @click="handleShowSubNav"><router-link to="" :style="{opacity: showSubNav ? '.5' : null}">{{datas[0].title}}</router-link></li>
              <li v-show="!showSubNav"><router-link to="/exhibition" >{{$t('mainNav')[1]}}</router-link></li>
              <li v-show="!showSubNav"><router-link to="/robbbbuy/shop" class="red">{{$t('mainNav')[2]}}</router-link></li>
              <li v-show="!showSubNav"><router-link to="/about" >{{$t('mainNav')[3]}}</router-link></li>
              <li v-show="!showSubNav"><router-link to="/contact" >{{$t('mainNav')[4]}}</router-link></li> -->
            </ul>
            <div class="xxx">
              <img @click="handleCloseNav" src="../../assets/x.png" class="float-right shoushi" id="xxx" >
            </div>
          </div>
        </transition>

        <transition name="slide-left">
          <div class="sub-nav" v-if="showSubNav">
            <ul class="nav-left" >
              <li><router-link class="nav-item" to='/street'>{{$t('subNav')[0]}}</router-link></li>
              <li><router-link class="nav-item" to="/shelf">{{$t('subNav')[1]}}</router-link></li>
              <li><router-link class="nav-item" to="/video">{{$t('subNav')[2]}}</router-link></li>
              <li><router-link class="nav-item" to="/fun">{{$t('subNav')[3]}}</router-link></li>
            </ul>
          </div>
        </transition>
      </div>

      <div class="nav-right jiantou">
        <span :style="{opacity: !(showMainNav || showSubNav) ? 1 : 0}" @click="$i18n.locale = $i18n.locale === 'en' ? 'zh' : 'en'" class="lang">{{$i18n.locale === 'en' ? '中文' : 'EN'}}</span>
        <img @click="handleShowMainNav" :style="{opacity: showMainNav ? .5 : null}" src="../../assets/jt1.png" class="float-right shoushi" id="jjj" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ["type", "datas"],
  data () {
    return {
      showMainNav: false,
      showSubNav: false,
      mainNavOpacity: 1,
    }
  },
  mounted () {
    console.log( this.$i18n, this.type, this.$i18n.locale , '18n')
  },
  computed: {
    flag(val){
      return this.type;
    }
  },
  methods: {
    // langValue(item) {
    //   const loc = this.$i18n.locale;
    //   return loc === 'zh' ? item['title'] : item[`en_title`]
    // },
    handleShowMainNav() {
      this.showSubNav = false;
      this.showMainNav = this.showSubNav ? true : !this.showMainNav;
    },
    handleCloseNav() {
      if(this.showSubNav) {
          this.showSubNav = false;
          const flag = this.showMainNav;
          this.mainNavOpacity = 0;
          setTimeout(() => {
               this.mainNavOpacity = 1;
          }, 800);
      } else {
          this.showMainNav = false;
          this.$refs.mainNav.removeAttribute('style');
      }

    },
    handleShowSubNav() {
      console.log('show sub nav')
      this.showSubNav = true;
      // this.showMainNav = false;
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../sass/var.scss';
.logo {
  width: 98px;
  position: absolute;
  top: 48px;
  left: 0;
  z-index: 1;
  img {
    opacity: 1;
    transition: all .5s;
    width: 100%;
  }
}

.logo-robbbbuy {
  width: 220px;
  position: absolute;
  top: 78px;
  left: 0;
  z-index: 1;
  img {
    opacity: 1;
    transition: all .5s;
    width: 100%;
  }
}

.lang {
  margin-right: 20px;
  font-size: 24px;
  line-height: 38px;
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
  padding: 74px 0 60px 0;
  height: 40px;
  z-index: 9;
  line-height: 36px;
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

  .sub-nav {
    position: absolute;
    left: 135px;
    top: 0;
    display: flex;
    width: 650px;
    height: 36px;
    background: #fff;
  }
}

.xxx {
  img {
    width: 20px;
    height: 20px;
    margin-top: 8px;
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
  display: flex;
  flex: 1 1 auto;
  height: 36px;
}

.en {
  .nav-left {
    li {
      font-size: 20px;
    }
  }
}
.nav-left li {
  position: relative;
  z-index: 9;
  margin: 0 10% 0 0;
  display: inline-block;
  font-size: 24px;
  a {
    display: block;
  }
}

.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(0.7, 0.9, 0.9, 0.9);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(500px);
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
  transform: translateX(-500px);
  opacity: 0;
}

.slide-left-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(500px);
  opacity: 0;
}

</style>
