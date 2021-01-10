<template>
<div>
<div class="pay-2 d-flex">
        <div class="pay2">
            <div class="d-flex align-items-center">
                  <img src="../../assets/weixin.png" alt="">
                  <span style="margin-top: 0" class="ui-flex-item">{{$t('payDetail').weixin}}</span>
                  <div class="mycheck text-center d-inline-block mr-4">
                      <input type="radio" value="1" id="checkbox1" name="pay">
                      <label for="checkbox1"></label>
                  </div>

            </div>
            <div class="d-flex align-items-center">
                <img src="../../assets/alipay.png" alt="">
                <span  style="margin-top: 0" class="ui-flex-item">{{$t('payDetail').alipay}}</span>
                <div class="mycheck text-center d-inline-block mr-4">
                  <input type="radio" value="2" id="checkbox2" name="pay">
                  <label for="checkbox2"></label>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <div class="ui-flex-item"><img src="../../assets/PayPal.png" alt=""></div>
                <div class="mycheck text-center d-inline-block mr-4">
                    <input type="radio" value="3" id="checkbox3" name="pay">
                    <label for="checkbox3"></label>
                </div>
            </div>
        </div>
        <div class="font-14 express-des">
            <div>{{$t('other').express}} </div>
            <div>{{$t('other').expressTime}} </div>
            <div>{{$t('other').markText}} </div>
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
              <video v-if="$i18n.locale === 'zh'" src="../../assets/video/ch.mp4" preload="metadata" muted autoplay id="video"></video>
              <video v-else src="../../assets/video/en.mp4" preload="metadata" muted autoplay id="video"></video>
              <!--<video src="http://203.195.204.34/assets/media/ch.034c6c2.mp4" preload="metadata" muted autoplay id="video"></video>-->
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
      // $('#bofangshipin').hide()
    })

  },
  methods: {
    bofang(){
      const video = document.querySelector('#video')
      video.play()

      $('#zhifu').animate({
                  opacity: 0
              },1500)
        setTimeout(()=>{
              $('#bofangshipin').fadeIn().css('opacity', 1).css('z-index', 999)
              video.play()

              const loading = this.$loading({
                lock: true,
                text: '视频加载中，请稍等...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

            video.onloadeddata = function() {
              loading.close()
            }

          video.addEventListener("playing", function() {
            console.log("[Playing] loading of video");
            loading.close()
            if ( video.readyState == 4 ) {
              console.log("[Finished] loading of video");
            }
          });
          video.addEventListener("suspend", function(e) {
            console.log("[Suspended] loading of video");
            if ( video.readyState == 4 ) {
              console.log("[Finished] loading of video");
              loading.close()
            }
          });

              video.addEventListener('canplaythrough', () => {
                loading.close()
              });


          video.addEventListener('ended', () => {
                window.location.href = '/'
              })
              // setTimeout(()=>{
              //     window.location.href='/'
              // },57 * 1000)
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
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  opacity: 0;
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
  .express-des {
    padding: 13px 0 0 50px;
    div {
      margin-bottom: 40px;
      position: relative;
      line-height: 2 !important;
      &:before {
        content: '*';
        position: absolute;
        color: #F6625E;
        left: -10px;
      }
    }
  }
.pay2 {
  img {
    margin-top: 0;
  }
  span {
    font-size: 20px !important;
  }
  .mr-4 {
    margin-right: 40px !important;
  }
}
</style>
