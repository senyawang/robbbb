<template>
  <div class="video">
    <video
      @click="videoPlay"
      src="../../assets/video.mp4"
      loop="loop"
      autoplay
      preload="auto"
      playsinline
      class="rob-video"
      id="videoDetail"></video>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  min-height: 60vh;
  display: flex;
  align-items: center;
}
.rob-video {
  width: 100%;
}
</style>
