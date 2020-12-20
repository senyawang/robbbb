<template>
<div class="main-body">
    <el-dialog
        :visible.sync="centerDialogVisible"
        center
        fullscreen
        :show-close="false"
        custom-class="no-border"
        :modal="false"
    >
        <div class="img-body">
            <!-- <img ref="img" :src="fullUrl" alt=""> -->
            <video v-show="!playOver" preload="auto"  ref="video" muted="muted" src="/assets/exhibition.mp4" class="rob-video-detail" id="videoDetail"></video>
            <div v-show="playOver" style="font-size: 28px;">{{$t('other').exhibition}}</div>
        </div>
    </el-dialog>

</div>
</template>

<script>
import Title from '../../common/title';
import Button from '../../common/Button';
export default {
  data () {
    return {
      centerDialogVisible: true,
      number: 0,
      imgs: [],
      timer: null,
      baseUrl: process.env.BASE_URL,
      playOver: false
    }
  },
  components: {
    Title,
    Button,
  },
  mounted () {


    this.$nextTick(() => {
      const video = this.$refs.video;
      video.play();

      video.addEventListener('ended', () => {
          video.style.opacity = 0;
          this.playOver = true;
          setTimeout(() => {
            location.href = '/'
          }, 1600);
      }, false)

    })




      // let num = 0;
      // this.timer = setInterval(() => {
      //   num ++ ;
      //   const nl = String(num).length;
      //   const st = ['0', '00']
      //   const number = nl > 2 ? num : st[3-nl] + num;
      //   console.log(number, 'number');

      //   this.number = num;
      //   // const url = `/static/exhibition/立体Tag 序列_00${number}.png`
      //   // this.imgs.push(new Image(url))
      //   // this.$refs.img.src = url;
      //   if (num === 124) {
      //       clearInterval(this.timer)
      //   }
      // }, 66);
  },

  destroyed () {
    console.log(this.timer, 'this.timer')
    clearInterval(this.timer);
  },

  computed: {
    fullUrl: function(){ return `${this.baseUrl}/img/img%20(${this.number}).png` }
  },

  methods: {
    handleSubmit(){
      this.centerDialogVisible = true;
    }
  }
}
</script>
<style lang='scss' scoped>
.img-body {
  position: relative;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    margin: 0 auto;
    width: 50%;
    transition:  all .5s;
  }
}
</style>
