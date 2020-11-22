<template>
  <div>
    <Art :actionUrl='actionUrl' detailName="proDetail" />
    <div class="mask-index ui-flex-box items-center justify-center" v-if="show" :style="{opacity: showIndex ? 1 : 0}">
      <div class="ui-flex-item"><img src="../../assets/robbbbuy.png" alt=""></div>
    </div>
  </div>
</template>

<script>
import Art from '../common/art.vue';
export default {
  data () {
    return {
      actionUrl: 'api/shop/getShopList',
      showIndex: true,
      show: true
    }
  },
  components: {
    Art,
  },
  mounted () {
    setTimeout(() => {
      this.showIndex = false
    }, 1000)

    setTimeout(() => {
      this.show = false
    }, 2500)
  }
}
</script>
<style lang='scss'>

</style>
