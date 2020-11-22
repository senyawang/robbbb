<template>
  <div id="app" :class="$i18n.locale">
    <div class="container">
      <Header :type="headerType" :datas="navList" />
      <router-view>
      </router-view>
      <Footer />
    </div>

    <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal="false"
        :close-on-click-modal="false"
    >
        <div class="text-center">{{errMsg}}</div>
        <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false" class="red">{{$i18n.locale === 'zh' ? '确定' : 'ok'}}</Button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';

import Header from './components/common/header.vue';
import Footer from './components/common/footer';
import Button from './components/common/Button';

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
    headerType(){
      return this.$route.fullPath.startsWith('/robbbbuy') ? 'shop' : '';
    },
  },
  mounted () {
    console.log(this, 'this');
    const lang = window.localStorage.getItem('LOCALE')
    console.log(lang, 'lang')
    this.$i18n.locale = lang
    this.getNavs();
    this.$Event.$on('ERROR', (val) => {
      console.log(val, 'val');
      this.centerDialogVisible = true;
      this.errMsg = val;
    })

  },
  methods: {
    getNavs(){
        this.ajaxPost('api/index/getNavList', {}).then(res => {
          this.navList = res.data;
          console.log(res, 'navList')
        })
    }
  }
}
</script>

<style lang='scss'>
@import './sass/index.scss';

#app {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, simhei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
.container {
  width: 1100px;
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
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
  .mask-index {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    text-align: center;
    opacity: 1;
    transition: all 1.5s;
    img {
      width: 300px;
    }
  }

</style>
