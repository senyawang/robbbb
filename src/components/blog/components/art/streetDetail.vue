<template>
    <div class="detail main-body ui-flex-box stdetail">

      <div :class='["pro-list", "ui-flex-item", {"full-screen": !showDesc}]'>
        <Title :title="langValue(resData, 'title')" align="center" v-if="!showDesc" />
        <button @click="$refs.carouse.prev()" type="button" class="el-carousel__arrow el-carousel__arrow--left"><i class="el-icon-arrow-left"></i></button>
        <button @click="$refs.carouse.next()" type="button" class="el-carousel__arrow el-carousel__arrow--right"><i class="el-icon-arrow-right"></i></button>
        <el-carousel
            ref="carouse"
            :interval="5000"
            :height="showDesc ? '390px' : '556px'"
            v-on:change="slideChange"
            arrow="never"
            indicator-position="none"
        >
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <img @click="handleZoom" :src="item | formatImg">
            </el-carousel-item>
          </el-carousel>
          <div class="pro-total-num">{{`${current}/${imgList.length}`}}</div>
      </div>

      <div class="rob-text-area" v-show="showDesc">
          <Title :title="langValue(resData, 'title')" />
          <div class="side-content" v-html="langValue(resData, 'content')">

          </div>
      </div>

    </div>
</template>

<script>
import Title from '../../../common/title';
export default {
  data () {
    return {
        current: 1,
        showDesc: true,
        imgList: [],
        content: '',
        resData: {},
    }
  },
  components: {
    Title,
  },
  mounted () {
    this.init();
  },
  methods: {
    slideChange(val){
        this.current = val + 1;
    },
    handleZoom(){
      this.showDesc = !this.showDesc;
    },
    init(){
      this.ajaxPost('api/index/getProductDetail', {
        id: this.$route.params.id,
      }).then(res => {
        console.log(res.data.pic_list, 'daddd')
        this.imgList = res.data.pic_list;
        this.resData = res.data
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='scss'>

.stdetail {
  .pro-list {
    position: relative;
    width: 800px;
    padding: 80px 100px 20px;
    text-align: center;
    img {
      &:hover {
        cursor: zoom-in;
      }
    }
    .pro-total-num {
      text-align: left;
      font-size: 20px;
    }
  }
  .full-screen {
    margin: 0;
    padding: 30px 160px 0;
    position: fixed;
    z-index: 9999;
    top: 0;
    width: 1100px;
    background: #fff;
    img {
      width: 900px;
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
    width: 370px;
    margin-left: 37px;
  }
  .side-content {
    height: 445px;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #000;
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
}

</style>
