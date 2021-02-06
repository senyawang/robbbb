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
                  <input type="radio" value="1" id="checkbox1" v-model="pay">
                  <label for="checkbox1"></label>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="ui-flex-item">
                    <img src="../../assets/alipay.png" alt="">
                    <span>{{$t('payDetail').alipay}}</span>
                </div>

              <div class="mycheck">
                  <input type="radio" value="2" id="checkbox2" v-model="pay">
                  <label for="checkbox2"></label>
              </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <img src="../../assets/PayPal.png" alt="">
                </div>

                <div class="mycheck">
                    <input type="radio" value="3" id="checkbox3" v-model="pay">
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
        <Button class="sp" @click="bofang" id="zhifu"> {{$t('buttons').pay}} </Button>
    </div>

    <div id="bofangshipin" class="bg-white" style="">
        <div class="kuang left" id="left">
                {{$t('other').thanks}}
            </div>
      <div class="video" v-show="!playover" :style="{opacity: playover ? 0 : 1}">
          <video v-if="$i18n.locale === 'zh'" src="../../assets/video/end-zh1s.mp4" preload="auto" playsinline id="video"></video>
          <video v-else src="../../assets/video/end-en1s.mp4" preload="auto" id="video" playsinline></video>
        </div>
      <div class="video" v-show="showCao" :style="{opacity: showCaoOp ? 1 : 0}">
        <img src="../../assets/cao.jpg" alt="">
      </div>
      <div class="video" v-show="showLogo" :style="{opacity: showLogoOp ? 1 : 0}">
        <img src="../../assets/m-end-logo.jpg" style="width: 75%;" alt="">
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

const delay = t => new Promise((resolve) => setTimeout(resolve, t))

export default {
  components: {
    Button
  },
  data () {
    return {
      userName: window.sessionStorage.getItem('userName'),
      playover: false,
      showCao: false,
      showCaoOp: false,
      showLogo: false,
      showLogoOp: false,
      pay: null,
    }
  },
  mounted () {

  },
  methods: {
    async bofang () {

      if(!this.pay) return

      $('#zhifu').animate({
        opacity: 0
      }, 1500)
      const video = document.querySelector('#video')
      video.play()
      await delay(1500)
      $('#bofangshipin').fadeIn().css('opacity', 1).css('z-index', 999)

      video.addEventListener('ended', async () => {
        await delay(1500)
        this.playover = true
        await delay(200)
        this.showCao = true
        await delay(200)
        this.showCaoOp = true
        await delay(4000)
        $('#left').animate({
          marginLeft: 0
        }, 1000)
        $('#right').animate({
          marginRight: 0
        }, 1000)
        await delay(4000)
        $('#left').animate({
          marginLeft: '-380px'
        }, 1000)
        $('#right').animate({
          marginRight: '-442px'
        }, 1000)
        await delay(1000)
        this.showCaoOp = false
        await delay(3000)
        this.showCao = false
        this.showLogo = true
        await delay(300)
        this.showLogoOp = true
        await delay(3000)
        this.showLogoOp = false
        await delay(3000)
        this.$router.push('/?from=end')
      })
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  background: #fff;
  background-size: 1368px;
  background-position: center;
  transition: all 1s;
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
.video {
  width: 100%;height: 100%;display: flex; align-items: center;
  opacity: 0;
  justify-content: center;
  transition: all 3s;
  img {
    width: 100%;
  }
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
    top: 110px;
    border-right: 3px solid #000;
    margin-left: -380px;
    text-align: right;
    padding-right: 49px;
    z-index: 1;
}
.right{
    right: 0;
    top: auto;
    bottom: 110px;
    width: 342px;
    margin-right: -442px;
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
