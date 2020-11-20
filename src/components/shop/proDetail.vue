<template>
    <div class="detail prodetail ui-flex-box">

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
            <el-carousel-item class="pro-item" v-for="(item, index) in resData.pic_list" :key="index">
              <h1 v-if="showDesc">{{langValue(resData, 'title')}}</h1>
              <img @click="handleZoom" :src="item | formatImg" :alt="langValue(item, 'title')">
            </el-carousel-item>
          </el-carousel>
          <div class="pro-total-num">{{`${current}/${imgList.length}`}}</div>
      </div>

      <div class="rob-text-area" v-show="showDesc">
          <div class="side-content" v-html="langValue(resData, 'content')">
          </div>
          <div class="text-right">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="3" ></el-input-number>
          </div>

          <div class="ui-flex-box btn-area">
            <div class="ui-flex-item"> <Button type="ghost" @click="addToCart">{{$t('buttons').addToCart}}</Button></div>
            <div class="ui-flex-item"> <Button class="sp" @click="handleBuy">{{$t('buttons').buy}}</Button></div>
          </div>

      </div>

      <el-dialog
            :visible.sync="centerDialogVisible"
            width="260px"
            center
            :show-close="false"
            :modal="false"
            :close-on-click-modal="false"
        >
            <div class="text-center">{{$t('shoppingCart').text1}}</div>
            <span slot="footer" class="dialog-footer">
              <Button @click="centerDialogVisible = false" class="red">{{$t('buttons').continueBuy}}</Button>
              <p style="margin-top: 10px;">
                <Button type="ghost" @click="$router.push(`/robbbbuy/shop/cart`)">{{$t('buttons').goCart}}</Button>
              </p>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import Title from '../common/title';
import Button from '../common/Button.vue';
import EventBus from "../../utils/eventBus";
export default {
  data () {
    return {
        current: 1,
        showDesc: true,
        num: 1,
        resData: {},
        centerDialogVisible: false,
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
  inject: ["globalData"],
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
    addToCart(id){
      const {isLogin} = this.globalData;
      console.log(isLogin, this.globalData)
      if(!isLogin){
        EventBus.$emit('showLogin');
        return
      }

      console.log(this.resData)
        const { resData } = this;
        const product = {
          checked: true,
          id: resData.id,
          title: resData.title,
          pic: resData.pic,
          en_title: resData.en_title,
          price: resData.price,
          number: this.num,
        }
        const localCart = JSON.parse(localStorage.getItem('CART')) || [];
        const newLocalCart = localCart.filter(item => item.id !== resData.id);
        newLocalCart.push(product)
        localStorage.setItem('CART', JSON.stringify(newLocalCart))
        this.centerDialogVisible = true;
    },
    handleBuy(){
      const {isLogin} = this.globalData;
      console.log(isLogin, this.globalData)
      if(!isLogin){
        EventBus.$emit('showLogin');
        return
      }
        this.$router.push(`/robbbbuy/payDetail?id=${this.resData.id}&num=${this.num}`)
    }
  }
}
</script>
<style lang='scss'>
.prodetail {
  .pro-list {
  position: relative;
  width: 800px;
  padding: 0 50px 20px;
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
  margin: 0;
  padding: 20px 160px 0;
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
  .pro-item {
    box-sizing: border-box;
    padding: 0;
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

.btn-area {
  padding-top: 20px;
  .ui-flex-item{
    flex: 1 1 50%;
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
    overflow-y: auto;
    overflow-x: hidden;
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
}

</style>
