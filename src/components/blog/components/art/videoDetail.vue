<template>
    <div class="detail ui-flex-box">

      <div :class='["pro-list", "ui-flex-item"]'>
        <video ref="video" :src="video_url || '../../../../assets/video.mp4'" loop @click="videoPlay" class="rob-video-detail" id="videoDetail"></video>
        <div class="btn-play" id="dabofang" @click="videoPlay">
            <img src="../../../../assets/play.png" alt="">
        </div>
      </div>

      <div class="rob-text-area">
          <Title :title="langValue(resData, 'title')" />
          <div class="side-content">
              {{langValue(resData, 'content')}}
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
        showBtn: true,
        video_url: '',
        resData: {},
    }
  },
  components: {
    Title,
  },
  mounted () {
    this.init();
  },
  methods: {
     init(){
      this.ajaxPost('api/index/getProductDetail', {
        id: this.$route.params.id,
      }).then(res => {
        this.video_url = res.data.video_url;
        this.resData = res.data
        console.log(res.data)
      })
    },
    videoPlay(e){
      const video = this.$refs.video;
      if(video.paused){
        video.play();
      } else {
        video.pause();
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.pro-list {
  position: relative;
  width: 800px;
  margin: 80px 0 20px;
  padding: 0;
  text-align: center;
  &:hover {
    .btn-play {
      top: 0;
    }
  }
}
.rob-video-detail {
  width: 100%;
}
.btn-play {
  position: absolute;
  left: 0;
  top: -9990px;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: rgba($color: #000000, $alpha: .5);
  img {
    width: 200px;
    height: 200px;
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
</style>
