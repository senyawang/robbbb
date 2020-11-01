<template>
  <div>
    <Art :actionUrl='actionUrl' detailName="proDetail" />
  </div>
</template>

<script>
import Art from '../common/art.vue';
export default {
  data () {
    return {
      actionUrl: 'api/shop/getShopList',
    }
  },
  components: {
    Art,
  }
}
</script>
<style lang='scss'>

</style>
