<template>
  <div class="video">
    <video
      @click="videoPlay"
      preload="metadata"
      src="../../assets/video.mp4"
      muted
      loop="loop"
      autoplay
      class="rob-video"
      id="videoDetail"
      poster="../../assets/index.png"
    >
    </video>
    <!--<video @click="videoPlay" src="http://203.195.204.34/assets/media/video.a4e7419.mp4"  loop="loop" muted autoplay class="rob-video" id="videoDetail"></video>-->

    <div class="mask-index ui-flex-box items-center justify-center" v-if="show" :style="{opacity: showBg ? 1 : 0}">
      <div class="ui-flex-item"><img :style="{opacity: showIndex ? 1 : 0}" src="../../assets/logo-index.png" alt=""></div>
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
      showBg: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.showIndex = false
    }, 1000)

    setTimeout(() => {
      this.showBg = false
    }, 2500)

    setTimeout(() => {
      this.show = false
    }, 4500)
  },
  methods: {
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
<style scoped>
.video {
  margin-top: -20px;
}
.rob-video {
  width: 100%;
}
</style>
