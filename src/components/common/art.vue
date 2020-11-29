<template>
    <div class="art-box">
      <div class="art-list">
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
        artList: [ ]
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
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .rob-photo {
    flex: 0 0 33.33333%;
    padding-right: 2.3333%;
    margin-bottom: 40px;

    &:nth-child(3n) {
      padding-right: 0;
    }
    a {
      display: block;
    }
    .img-wrapper {
      width: 100%;
      max-height: 250px;
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
      font-size: 16px;
      text-align: right;
    }
  }
}
</style>
