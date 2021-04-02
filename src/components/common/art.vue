<template>
    <div class="art-box">
      <div class="art-list"
           v-infinite-scroll="init"
           infinite-scroll-delay="500"
           infinite-scroll-distance="300"
           infinite-scroll-immediate="false"
      >
          <div class="rob-photo" v-for="(item, index) in artList" :key="index">
              <router-link :to="{ name: detailName, params: { id: item.id }}">
                  <div class="img-wrapper"><img :src="item.pic | formatImg" alt=""></div>
                  <h3 class="text-right">{{langValue(item, 'title')}}</h3>
              </router-link>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Art',
    props: ['detailName', 'actionUrl'],
    data () {
      return {
        page: 1,
        pageSize: 15,
        artList: [ ]
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        console.log(this.finished, 'this.finished')
        if (this.finished) return
        this.loading = true
        this.ajaxPost(this.actionUrl || 'api/index/getProductList', {
          page: this.page,
          pageSize: this.pageSize,
          pid: this.$route.query.id
        }).then(res => {
          this.loading = false
          this.artList = [...this.artList, ...res.data]
          const pages = Math.ceil(Number(res.count) / this.pageSize)
          console.log(pages, this.page, 'pages', res.count)
          if ( pages > this.page) {
            this.page = this.page + 1
          } else {
            this.finished = true
          }
        }).catch(err => {
          this.loading = false
        })
      }
      // init(){
      //   this.ajaxPost(this.actionUrl || 'api/index/getProductList', {
      //     pid: this.$route.query.id,
      //   }).then(res => {
      //     this.artList = res.data;
      //     console.log(res.data)
      //   })
      // }
    }
}
</script>
<style lang='scss' scoped>
.art-list {
  // display: flex;
  // flex-wrap: wrap;
  max-height: 800px;
  overflow-y: auto;
  margin-bottom: -40px;
  // justify-content: space-between;
  .rob-photo {
    display: inline-block;
    width: 341px;
    margin-bottom: 40px;
    line-height: 1.5;
    margin-right: 38px;
    &:nth-child(3n) {
      margin-right: 0;
      padding-right: 0;
    }
    a {
      display: block;
    }
    .img-wrapper {
      width: 100%;
      height: 228px;
      overflow: hidden;
    }
    img {
      width: 100%;
      &:hover {
        opacity: .5;
      }
    }
    h3 {
      margin-left: 10%;
      width: 90%;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 10px;
      font-size: 16px;
      text-align: right;

    }
  }
}
</style>
