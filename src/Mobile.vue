<template>
  <div id="app" :class="$i18n.locale">
    <div class="container">
      <Header :type="headerType" :datas="navList" />
      <div style="min-height: 50vh">
          <router-view> </router-view>
      </div>
      <Footer v-if="showFooter" />
    </div>

    <el-dialog
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        :show-close="false"
        :modal="false"
        :close-on-click-modal="false"
    >
        <div class="text-center err-info">{{errMsg}}</div>
        <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false" class="red" size="large">{{$i18n.locale === 'zh' ? '确定' : 'OK'}}</Button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import Header from './mobile/common/header.vue';
import Footer from './mobile/common/footer';
import Button from './mobile/common/Button';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Button
  },
  data () {
    return {
      navList: [],
      errMsg: '',
      centerDialogVisible: false,
      // headerType: this.$route.fullPath.startsWith('/robbbbuy') ? 'shop' : '',
    }
  },
  computed: {
    showFooter () {
      return this.$route.name !== 'cart'
    },
    headerType(){
      return this.$route.fullPath.startsWith('/robbbbuy') ? 'shop' : '';
    },
  },
  mounted () {
    const lang = window.sessionStorage.getItem('LOCALE')
    this.$i18n.locale = lang || 'zh'
    this.getNavs();
    this.$Event.$on('ERROR', (val) => {
      this.centerDialogVisible = true;
      this.errMsg = val;
    })
  },
  methods: {
    getNavs(){
        this.ajaxPost('api/index/getNavList', {}).then(res => {
          this.navList = res.data;
        })
    }
  }
}
</script>

<style lang='scss'>
@import './mobile/sass/index.scss';

#app {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, simhei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
.container {
  padding: 36px;
  margin: 0 auto;
}
a:link,
a:visited {
  color: #000;
  text-decoration: none;
  outline: none;
}

.ui-flex-box{
    display: -webkit-box;
    display: box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.ui-flex-item{
    box-flex: 1 1 auto;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    min-width: 1%;
}
.err-info {
  font-size: 28px;
  word-break: break-word;
}
.mask-index {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  text-align: center;
  opacity: 1;
  transition: all 1.5s;
  align-items: center;
  justify-content: center;
  img {
    width: 150px;
    transition: all 1.5s;
  }
}
</style>
