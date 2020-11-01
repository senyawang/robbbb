<template>
    <div class="art-box">
      <div class="art-list">
          <div class="rob-photo" v-for="(item, index) in artList" :key="index">
              <router-link :to="{ name: detailName, params: { id: item.id }}">
                  <div class="img-wrapper"><img src="../../assets/1.jpg" alt=""></div>
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
        artList: [
          {
            imgsrc: "../../assets/1.jpg",
            title: "这是一个标题"
          },
          {
            imgsrc: "../../assets/1.jpg",
            title: "这是一个标题"
          }
        ]
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init(){
        this.ajaxPost(this.actionUrl || 'api/index/getProductList', {
          pid: this.$route.query.id,
        }).then(res => {
          this.artList = res.data;
          console.log(res.data)
        })
      }
    }
}
</script>
<style lang='scss' scoped>
.art-list {
  padding: 17px;
  .rob-photo {
    margin-bottom: 40px;
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
      margin-top: 10px;
      font-size: 32px;
      line-height: 1.5;
      text-align: right;
    }
  }
}
</style>
