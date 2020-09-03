<template>
    <div class="detail ui-flex-box">

      <div :class='["pro-list", "ui-flex-item", {"full-screen": !showDesc}]'>
        <el-carousel :interval="5000" :height="showDesc ? '430px' : '700px'" v-on:change="slideChange" arrow="always">
            <el-carousel-item class="pro-item" v-for="(item, index) in imgList" :key="index">
              <h1>{{langValue(item, 'title')}}</h1>
              <img @click="handleZoom" :src="`http://robbb.gx/${item}`" :alt="langValue(item, 'title')">
            </el-carousel-item>
          </el-carousel>
          <div class="pro-total-num">{{`${current}/${imgList.length}`}}</div>
      </div>

      <div class="rob-text-area" v-show="showDesc">
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
          <div class="text-right">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="3" label="描述文字"></el-input-number>
          </div>

          <div class="ui-flex-box btn-area">
            <div class="ui-flex-item"> <Button type="ghost" @click="addToCart">加入购物车</Button></div>
            <div class="ui-flex-item"> <Button>购买</Button></div>
          </div>

      </div>

    </div>
</template>

<script>
import Title from '../common/title';
import Button from '../common/Button.vue';
export default {
  data () {
    return {
        current: 1,
        showDesc: true,
        num: 1,
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
    Button
  },
  created () {
    this.init();
  },
  methods: {
     init(){
      this.ajaxPost('api/shop/getShopDetail', {
        id: this.$route.params.id,
      }).then(res => {
        this.imgList = res.data.pic_list;
        this.resData = res.data
        console.log(res.data)
      })
    },
    handleChange(){

    },
    slideChange(val){
        this.current = val + 1;
    },
    handleZoom(){
      this.showDesc = !this.showDesc;
    },
    addToCart(){
      this.$router.push('/robbbbuy/shop/cart')
    }
  }
}
</script>
<style lang='scss'>
.pro-list {
  width: 800px;
  padding: 0 0 20px;
  text-align: center;
  .pro-item {
    box-sizing: border-box;
    padding: 0 60px;
  }
  h1 {
    text-align: left;
    font-size: 20px;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
    &:hover {
      cursor: zoom-in;
    }
  }
  .pro-total-num {
    padding-left: 60px;
    margin-top: 20px;
    text-align: left;
    font-size: 20px;
  }
}
.full-screen {
  margin-top: 0;
  padding-top: 0;
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
}

.btn-area {
  padding-top: 20px;
  .ui-flex-item{
    flex: 1 1 50%;
    &:first-child {
    }
    &:last-child {
      text-align: right;
    }
  }
  button {
    width: 90% !important;
  }
}
.rob-text-area {
    width: 370px;
    margin-left: 37px;
    .text-right {
      margin-top: 20px;
      text-align: right;
    }
}
.side-content {
    height: 355px;
    overflow: scroll;
    border: 1px solid #000000;
}

.el-carousel__arrow--right,
.el-carousel__arrow--left {
    right: 0;
    width: 42px;
    height: 66px;
    background-color: transparent;
    background: url('../../assets/right.png') no-repeat;
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

.el-carousel__indicators {
  display: none;
}

.el-carousel__arrow--left {
  left: 0;
  background: url('../../assets/left.png') no-repeat;
  background-size: contain;
}

</style>
