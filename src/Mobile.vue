<template>
  <div id="app" :class="$i18n.locale">
    <div class="container">
      <Header :type="headerType" :datas="navList" />
      <div style="min-height: 50vh">
          <router-view> </router-view>
      </div>
      <Footer />
    </div>

    <el-dialog
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        :show-close="false"
        :modal="false"
        class="test"
        :close-on-click-modal="false"
    >
        <div class="text-center err-info">{{errMsg}}</div>
        <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false" class="red" size="large">{{$i18n.locale === 'zh' ? '确定' : 'ok'}}</Button>
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
  font-size: 32px;
}
.test {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 50px 20px 40px;
  }
  .el-dialog__footer {
    padding-top: 0;
  }
}
</style>
