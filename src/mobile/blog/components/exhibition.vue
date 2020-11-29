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
            <div v-show="showText" class="text">虚拟展览空间建设中</div>
            <!-- <img ref="img" :src="fullUrl" alt=""> -->
            <video ref="video" src="../../../assets/exhibition.mp4"  class="rob-video-detail" id="videoDetail"></video>
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
      showText: false,
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
          setTimeout(() => {
            video.style.display = 'none'
            this.showText = true
          }, 600);
          setTimeout(() => {
            location.href = '/'
          }, 2000);
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
  height: 80vh;
  display: flex;
  align-items: center;
  .text {
    width: 100%;
    text-align: center;
    font-size: 40px;
    color: #000;
  }
  video {
    width: 100%;
    transition:  all .5s;
  }
}
</style>
