<template>
<div>
<div class="pay-2 d-flex">
        <div class="pay2">
            <div class="d-flex">
                <div>
                    <img src="../../assets/weixin.png" alt="">
                    <span>微信支付</span>
                    <div class="mycheck text-center d-inline-block mr-4" style="margin-left: 135px">
                        <input type="radio" value="1" id="checkbox1" name="pay">
                        <label for="checkbox1"></label>
                    </div>
                </div>

            </div>
            <div class="d-flex">
                <div>

                    <img src="../../assets/alipay.png" alt="">
                    <span>支付宝</span>
                    <div class="mycheck text-center d-inline-block mr-4" style="margin-left: 166px">
                        <input type="radio" value="2" id="checkbox2" name="pay">
                        <label for="checkbox2"></label>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <div>
                    <img src="../../assets/PayPal.png" alt="">
                    <div class="mycheck text-center d-inline-block mr-4" style="margin-left: 151px">
                        <input type="radio" value="3" id="checkbox3" name="pay">
                        <label for="checkbox3"></label>
                    </div>
                </div>
            </div>
        </div>
        <div class="font-14">
            <div><span class="c-red">*</span> {{$t('other').express}} </div>
            <div><span class="c-red">*</span> {{$t('other').expressTime}} </div>
            <div><span class="c-red">*</span> {{$t('other').markText}} </div>
        </div>
    </div>
    <div class="text-right zf">
        <Button class="sp" @click="bofang" id="zhifu"> {{$t('buttons').pay}} </Button>
    </div>


    <div id="bofangshipin" class="bg-white" style="">
        <div class="kuang left" id="left">
                {{$t('other').thanks}}
            </div>
        <div style="width: 1000px;height: 100%;display: flex; align-items: center;">
              <video src="../../assets/video/ch.mp4" id="video"></video>
        </div>
        <div class="kuang right" id="right">
            {{userName}}
        </div>
        <div id="kaishi" @click="bofang"></div>
    </div>


</div>
</template>

<script>
import Button from "../common/Button.vue";
import $ from 'jquery';
export default {
  components: {
    Button,
  },
  data(){
    return {
      userName: window.sessionStorage.getItem('userName')
    }
  },
  mounted () {
    $(() => {
      $('#bofangshipin').hide()
    })

  },
  methods: {
    bofang(){

      $('#zhifu').animate({
                  opacity: 0
              },1500)
        setTimeout(()=>{
              $('#bofangshipin').fadeIn()
              $('#video')[0].play()
              setTimeout(()=>{
                  window.location.href='/'
              },57 * 1000)
          },1500)

          setTimeout(()=>{
              $('#left').animate({
                  marginLeft:'-280px'
              },1500)
              $('#right').animate({
                  marginRight:'-342px'
              },1500)
          },50 * 1000)

          setTimeout(()=>{
              $('#left').animate({
                  marginLeft:0
              },1500)
              $('#right').animate({
                  marginRight:0
              },1500)
        },34 * 1000)
    }
  }
}
</script>
<style lang='scss' scoped>
@import url("../../assets/bootstrap.css");
@import url("../../assets/shopping.css");
#bofangshipin {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 1368px;
  background-position: center;
}
.videobox {
  width: 100%;
}
#video {
  width: 100%;
}

.kuang{
    position: absolute;
    width: 280px;
    height: 90px;
    line-height: 84px;
    border-top: 3px solid #000;
    border-bottom: 3px solid #000;
    font-size: 24px;
    box-sizing: border-box;
}
.left{
    left: 0;
    top: 0;
    border-right: 3px solid #000;
    margin-top: 176px;
    margin-left: -280px;
    text-align: right;
    padding-right: 49px;
    z-index: 1;
}
.right{
    right: 0;
    top: 0;
    width: 342px;
    margin-right: -342px;
    border-left: 3px solid #000;
    margin-top: 503px;
    text-align: left;
    z-index: 1;
    padding-left: 50px;
}

</style>
