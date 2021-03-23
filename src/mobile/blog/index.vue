<template>
  <div class="video">
    <img src="../../assets/android-index.png" alt="" v-if="isAndroid">
    <video
      v-else
      @click="videoPlay"
      src="../../assets/video.mp4"
      loop="loop"
      muted
      autoplay
      preload="auto"
      playsinline
      class="rob-video"
      id="videoDetail"
    >
    </video>
    <!--poster="../../assets/index.png"-->
    <!--<video @click="videoPlay" src="http://203.195.204.34/assets/media/video.a4e7419.mp4"  loop="loop" muted autoplay class="rob-video" id="videoDetail"></video>-->

    <div
      class="mask-index ui-flex-box items-center justify-center"
      v-show="show"
      :style="{opacity: showBg ? 1 : 0}"
    >
      <div class="ui-flex-item">
        <img
          @load="onloadImg"
          :style="{opacity: showIndex ? 1 : 0}"
          src="../../assets/logo-index.png"
          alt=""
        />
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Home',
  data () {
    return {
      showIndex: true,
      show: true,
      showBg: true,
      isAndroid: false,
    }
  },
  created () {
    // const { from } = getLocationParams() || {}
    const { from } = this.$route.query || {}
    if (from === 'end') {
      this.show = false
    }

    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
    // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
    this.isAndroid = isAndroid
  },
  mounted () {

  },
  methods: {
    onloadImg () {
      setTimeout(() => {
        this.showIndex = false
      }, 200)
      setTimeout(() => {
        this.showBg = false
      }, 1500)

      setTimeout(() => {
        this.show = false
        this.showIndex = true
      }, 2000)
    },
    videoPlay(e){
      const video = e.target;
      if(video.paused){
        video.play();
      } else {
        video.pause();
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video {
  min-height: 60vh;
  display: flex;
  align-items: center;
}
.rob-video {
  width: 100%;
}
  .mask-index {
    img {
      width: 200px !important;
      height: 200px;
    }
  }
</style>
