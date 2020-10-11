<template>
    <div class="detail ui-flex-box">

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
              <img @click="handleZoom" :src="item.imgSrc">
            </el-carousel-item>
          </el-carousel>
          <div class="pro-total-num">{{`${current}/${imgList.length}`}}</div>
      </div>

      <div class="rob-text-area" v-show="showDesc">
          <Title :title="langValue(resData, 'title')" />
          <div class="side-content">
              {{langValue(resData, 'content')}}
              <div :style="{fontSize: '16px', lineHeight: '2', textAlign: 'center'}">
                <p>世界上最远的距离，不是生与死的距离， 而是我站在你面前，你不知道我爱你</p>
                <p>不是我站在你面前，你不知道我爱你，<br>而是爱到痴迷却不能说我爱你</p>
              </div>
              <div :style="{fontSize: '16px', lineHeight: '2', textAlign: 'center'}">
                <p>世界上最远的距离，不是生与死的距离，而是我站在你面前，你不知道我爱你</p>
                <p>你不知道我爱你，而是爱到痴迷却不能说我爱你</p>
              </div>
              <div :style="{fontSize: '16px', lineHeight: '2', textAlign: 'center'}">
                <p>世界上最远的距离，不是生与死的距离，而是我站在你面前，你不知道我爱你</p>
                <p>世界上最远的距离，而是爱到痴迷却不能说我爱你</p>
              </div>
              <div :style="{fontSize: '16px', lineHeight: '2', textAlign: 'center'}">
                <p>世界上最远的距离，不是生与死的距离，而是我站在你面前，你不知道我爱你</p>
                <p>你不知道我爱你，而是爱到痴迷却不能说我爱你</p>
              </div>
              <div :style="{fontSize: '16px', lineHeight: '2', textAlign: 'center'}">
                <p>世界上最远的距离，不是生与死的距离，而是我站在你面前，你不知道我爱你</p>
                <p>世界上最远的距离，而是爱到痴迷却不能说我爱你</p>
              </div>
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
        imgList: [
          {
            imgSrc: '/static/img/1.607ddd7.jpg',
            title: '你是我的小苹果'
          },
          {
            imgSrc: '/static/img/1.607ddd7.jpg',
            title: '你是我的小苹果'
          }
        ],
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
        // this.imgList = res.data.pic_list;
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
    height: 460px;
    overflow: scroll;
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

</style>
