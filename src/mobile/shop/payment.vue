<template>
<div class="">
<div class="pay-2">
        <div class="pay2">
            <div class="d-flex justify-content-between">
                <div class="ui-flex-item">
                    <img src="../../assets/weixin.png" alt="">
                    {{$t('payDetail').weixin}}
                </div>

                <div class="mycheck">
                  <input type="radio" value="1" id="checkbox1" name="pay">
                  <label for="checkbox1"></label>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="ui-flex-item">
                    <img src="../../assets/alipay.png" alt="">
                    <span>{{$t('payDetail').alipay}}</span>
                </div>

              <div class="mycheck">
                  <input type="radio" value="2" id="checkbox2" name="pay">
                  <label for="checkbox2"></label>
              </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <img src="../../assets/PayPal.png" alt="">
                </div>

                <div class="mycheck">
                    <input type="radio" value="3" id="checkbox3" name="pay">
                    <label for="checkbox3"></label>
                </div>
            </div>
        </div>
        <div class="font-14 text-center pay-text" style="margin-top: 60px">
          <div><span class="c-red">*</span> {{$t('other').express}} </div>
          <div><span class="c-red">*</span> {{$t('other').expressTime}} </div>
          <div><span class="c-red">*</span> {{$t('other').markText}} </div>
        </div>
    </div>
    <div class="text-center zf">
        <Button class="ssssss" @click="bofang" id="zhifu"> {{$t('buttons').pay}} </Button>
    </div>

    <div id="bofangshipin" class="bg-white" style="">
        <div class="kuang left" id="left">
                {{$t('other').thanks}}
            </div>
        <div style="width: 1000px;height: 100%;display: flex; align-items: center;">
          <video v-if="$i18n.locale === 'zh'" src="../../assets/video/ch.mp4" preload="metadata" playsinline muted autoplay id="video"></video>
          <video v-else src="../../assets/video/en.mp4" preload="metadata" muted autoplay id="video" playsinline></video>
        </div>
        <div class="kuang right" id="right">
            {{userName}}
        </div>
        <div id="kaishi" @click="bofang"></div>
    </div>
</div>
</template>

<script>
import Button from '../common/Button.vue'
import $ from 'jquery'
export default {
  components: {
    Button
  },
  data () {
    return {
      userName: window.sessionStorage.getItem('userName')
    }
  },
  mounted () {
    const video = document.querySelector('#video')
    video.play()
    video.pause()
  },
  methods: {
    bofang () {
      const video = document.querySelector('#video')
      video.play()
      video.pause()

      $('#zhifu').animate({
        opacity: 0
      }, 1500)
      setTimeout(() => {
        $('#bofangshipin').fadeIn().css('opacity', 1).css('z-index', 999)
        video.play()

        const loading = this.$loading({
          lock: true,
          text: '视频加载中，请稍等...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        video.onloadeddata = function () {
          loading.close()
        }

        video.addEventListener('playing', function () {
          console.log('[Playing] loading of video')
          loading.close()
          if (video.readyState == 4) {
            console.log('[Finished] loading of video')
          }
        })
        video.addEventListener('suspend', function (e) {
          console.log('[Suspended] loading of video')
          if (video.readyState == 4) {
            console.log('[Finished] loading of video')
            loading.close()
          }
        })

        video.addEventListener('ended', () => {
          window.location.href = '/m/'
        })
      })

      setTimeout(() => {
        $('#left').animate({
          marginLeft: '-280px'
        }, 1500)
        $('#right').animate({
          marginRight: '-342px'
        }, 1500)
      }, 50 * 1000)

      setTimeout(() => {
        $('#left').animate({
          marginLeft: 0
        }, 1500)
        $('#right').animate({
          marginRight: 0
        }, 1500)
      }, 34 * 1000)
    }
  }
}
</script>
<style lang='scss' scoped>
.pay2 {
  line-height: 2;
  & > .d-flex {
    width: auto;
    margin: 70px;
    align-items: center;
    font-size: 30px;
    &:first-child {
      margin-top: 18px;
    }
  }
  img {
    height: 76px;
    vertical-align: middle;
    margin-right: 20px;
  }
  div:nth-child(3) img {
    height: 60px;
  }
}
#bofangshipin {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  background-size: 1368px;
  background-position: center;
}
.pay-text {
  & > div {
    margin-top: 40px;
  }
  line-height: 1.4;
}
.zf {
  margin-top: 120px;
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
    top: 200px;
    border-right: 3px solid #000;
    margin-left: -280px;
    text-align: right;
    padding-right: 49px;
    z-index: 1;
}
.right{
    right: 0;
    top: auto;
    bottom: 200px;
    width: 342px;
    margin-right: -342px;
    border-left: 3px solid #000;
    text-align: left;
    z-index: 1;
    padding-left: 50px;
}

</style>
<style lang="scss">
  .el-loading-spinner i,
  .el-loading-spinner .el-loading-text {
    color: #fff !important;
  }
</style>
