<template>
    <div class="detail main-body">
        <Title :title="langValue(resData, 'title')" align="center" />

      <div :class='["pro-list", {"full-screen": !showDesc}]' style="padding-top: 0">
          <van-swipe
            @change="slideChange"
          >
            <van-swipe-item v-for="(item, index) in imgList" :key="index">
              <img @click="handleZoom" :src="item | formatImg">
            </van-swipe-item>
            <template #indicator>
              <div class="pro-total-num">
                {{`${current}/${imgList.length}`}}
              </div>
            </template>
          </van-swipe>
      </div>

      <div class="rob-text-area" v-show="showDesc">
          <div class="side-content"  v-html="langValue(resData, 'content')">
          </div>
      </div>

    </div>
</template>

<script>
import { ImagePreview } from 'vant'
import Title from '../../../common/title'
export default {
  data () {
    return {
      current: 1,
      showDesc: true,
      imgList: [],
      content: '',
      resData: {}
    }
  },
  components: {
    Title
  },
  mounted () {
    this.init()
  },
  methods: {
    slideChange (val) {
      this.current = val + 1
    },
    handleZoom () {
      // ImagePreview({
      //   images: ['https://img.yzcdn.cn/vant/apple-1.jpg'],
      //   showIndex:true,
      //   loop:false,
      //   startPosition: 0, // 指明预览第几张图
      // });
      // const imgs = this.imgList.map(item => item.imgSrc)
      // console.log(imgs, 'imgs');
      // ImagePreview(imgs)
      // this.showDesc = !this.showDesc;
    },
    init () {
      this.ajaxPost('api/index/getProductDetail', {
        id: this.$route.params.id
      }).then(res => {
        console.log(res.data.pic_list, 'daddd')
        this.imgList = res.data.pic_list
        this.resData = res.data
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='scss'>
.pro-list {
  position: relative;
  text-align: center;
  padding-top: 17px;
  img {
    &:hover {
      cursor: zoom-in;
    }
  }
  .pro-total-num {
    font-size: 35px;
    line-height: 3;
  }
}
.full-screen {
  margin: 0;
  position: fixed;
  z-index: 9999;
  top: 0;
  background: #fff;
  img {
    height: auto;
    &:hover {
      cursor: zoom-out;
    }
  }
  .pro-total-num {
    text-align: center;
    padding-left: 0;
  }
  .el-carousel__arrow--right {
    right: 50px;
  }
  .el-carousel__arrow--left {
    left: 50px;
  }
}
.rob-text-area {
}
.side-content {
    height: 460px;
    overflow: scroll;
    border: .8PX solid #ccc;
}

.el-carousel__arrow--right,
.el-carousel__arrow--left {
    right: 0;
    width: 42px;
    height: 66px;
    background-color: transparent;
    background: url('../../../../assets/right.png') no-repeat;
    background-position: left top;
    background-size: contain;
    border-radius: 0;

    &:hover {
      opacity: .5;
      background-color: transparent;
    }

    .el-icon-arrow-right {
      display: none;
    }
}

.el-carousel__arrow--left {
  left: 0;
  background: url('../../../../assets/left.png') no-repeat;
  background-size: contain;
}

</style>

<style scoped lang="scss">
  .detail {
    padding-left: 17px !important;
    padding-right: 17px !important;
  }
</style>
