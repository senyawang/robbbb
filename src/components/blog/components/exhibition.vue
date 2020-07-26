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
            <img ref="img" :src="fullUrl" alt="">
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
    }
  },
  components: {
    Title,
    Button,
  },
  mounted () {

      let num = 0;
      const timer = setInterval(() => {
        num ++ ;
        const nl = String(num).length;
        const st = ['0', '00']
        const number = nl > 2 ? num : st[3-nl] + num;
        console.log(number, 'number');

        this.number = num;
        // const url = `/static/exhibition/立体Tag 序列_00${number}.png`
        // this.imgs.push(new Image(url))
        // this.$refs.img.src = url;
        if (num === 124) {
            clearInterval(this.timer)
        }
      }, 66);
  },

  destroyed () {
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
  width: 1200px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
</style>
