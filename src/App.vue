<template>
  <div id="app" :class="$i18n.locale">
    <div class="container">
      <Header :type="headerType" />
      <router-view>
      </router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from './components/common/header.vue';
import Footer from './components/common/footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data () {
    return {
      // headerType: this.$route.fullPath.startsWith('/robbbbuy') ? 'shop' : '',
    }
  },
  computed: {
    headerType(){
      return this.$route.fullPath.startsWith('/robbbbuy') ? 'shop' : '';
    },
  },
  mounted () {
    console.log(this.$route.fullPath, this.headerType, 'app.route.fullpath');
    this.$nextTick(() => {
      this.$route.fullPath
    })

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

</style>
