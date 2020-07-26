<template>
    <div class="detail ui-flex-box">

      <div :class='["pro-list", "ui-flex-item", {"full-screen": !showDesc}]'>
        <el-carousel :interval="5000" :height="showDesc ? '430px' : '700px'" v-on:change="slideChange" arrow="always">
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <img @click="handleZoom" :src="item.imgSrc" alt="itme.title">
            </el-carousel-item>
          </el-carousel>
          <div class="pro-total-num">{{`${current}/${imgList.length}`}}</div>
      </div>

      <div class="rob-text-area" v-show="showDesc">
          <Title title="你是我的小苹果" />
          <div class="side-content">
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
        ]
    }
  },
  components: {
    Title,
  },
  methods: {
    slideChange(val){
        this.current = val + 1;
    },
    handleZoom(){
      this.showDesc = !this.showDesc;
    }
  }
}
</script>
<style lang='scss'>
.pro-list {
  width: 800px;
  padding: 80px 0 20px;
  text-align: center;
  img {
    width: 600px;
    &:hover {
      cursor: zoom-in;
    }
  }
  .pro-total-num {
    padding-left: 100px;
    text-align: left;
    font-size: 20px;
  }
}
.full-screen {
  margin-top: 0;
  padding-top: 0;
  img {
    width: 1000px;
    height: auto;
    &:hover {
      cursor: zoom-out;
    }
  }
  .pro-total-num {
    text-align: center;
    padding-left: 0;
  }
}
.rob-text-area {
    width: 370px;
    margin-left: 37px;
}
.side-content {
    height: 500px;
    overflow: scroll;
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
