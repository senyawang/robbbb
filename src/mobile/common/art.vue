<template>
    <div class="art-box">
      <div class="art-list">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="init"
          >
            <div class="rob-photo" v-for="(item, index) in artList" :key="index">
              <router-link :to="{ name: detailName, params: { id: item.id }}">
                <div class="img-wrapper"><img :src="item.pic | formatImg" alt=""></div>
                <h3 class="text-right">{{langValue(item, 'title')}}</h3>
              </router-link>
            </div>
          </van-list>

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
      loading: false,
      finished: false,
      artList: [ ]
    }
  },
  mounted () {
    // this.init()
    // let move = null
    // window.addEventListener('touchend touchstart touchmove', 'a', function (e) {
    //   if (e.type === 'touchstart') {
    //     move = null
    //     e.tartget.className = e.tartget.className + ' active'
    //   } else if (e.type === 'touchmove') {
    //     if (move) return
    //     move = true
    //   } else {
    //     if (move) return
    //     $(this).removeClass('active')
    //   }
    // })
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
  }
}
</script>
<style lang='scss' scoped>
.art-list {
  padding: 17px 17px 0;
  .rob-photo {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      display: block;
    }
    .img-wrapper {
      width: 100%;
      max-height: 500px;
      overflow: hidden;
    }
    img {
      width: 100%;
      &:hover {
        opacity: .5;
      }
    }
    h3 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 10px;
      font-size: 28px;
      line-height: 1.5;
      text-align: right;
    }
  }
}
</style>
