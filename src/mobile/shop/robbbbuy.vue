<template>
  <div>
    <Art :actionUrl='actionUrl' detailName="proDetail" />
    <div class="mask-index ui-flex-box items-center justify-center" v-if="show" :style="{opacity: showBg ? 1 : 0}">
      <div class="ui-flex-item"><img @load="onloadImg" :style="{opacity: showIndex ? 1 : 0, width: '50%'}" src="../../assets/logo-robby-index.jpg" alt=""></div>
    </div>
  </div>
</template>

<script>
import Art from '../common/art.vue'
export default {
  data () {
    return {
      actionUrl: 'api/shop/getShopList',
      showIndex: true,
      show: true,
      showBg: true,
      onLoaded: false,
    }
  },
  components: {
    Art
  },
  mounted () {
    if (this.onLoaded) {
      this.onload()
    }
  },
  methods: {
    onloadImg () {
      this.onLoaded = true
      this.showIndex = false
      setTimeout(() => {
        this.showBg = false
      }, 1500)

      setTimeout(() => {
        this.show = false
        this.showIndex = true
      }, 2000)
    }
  }
}
</script>
<style lang='scss'>

</style>
