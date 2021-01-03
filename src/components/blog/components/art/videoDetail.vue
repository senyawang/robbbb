<template>
    <div class="detail main-body ui-flex-box">

      <div :class='["pro-list", "ui-flex-item"]'>
        <template v-if="video_url">
          <video ref="video" :src="video_url" loop @click="videoPlay" class="rob-video-detail" id="videoDetail"></video>
          <div class="btn-play" id="dabofang" @click="videoPlay">
            <img v-if="showBtn" src="../../../../assets/play.png" alt="">
          </div>
        </template>
        <iframe v-else width="100%" height="450" frameborder="0" :src="resData.video_link" allowFullScreen="true"></iframe>
      </div>

      <div class="rob-text-area">
          <Title :title="langValue(resData, 'title')" />
          <div class="side-content" v-html="langValue(resData, 'content')"></div>
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
      this.showBtn = !this.showBtn
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
  height: 450px;
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
  flex: 0 0 330px;
    width: 330px;
    margin-left: 37px;
}
.side-content {
    height: 515px;
  border: 1px solid #000;
  overflow-y: auto;
    overflow-x: hidden;
}
</style>
