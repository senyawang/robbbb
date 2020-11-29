<template>
  <div class="main-body">
    <Title :title="$t('subNav')[2]" />
    <Art :actionUrl='actionUrl' detailName='videoDetail' />
  </div>
</template>

<script>
import Art from '../../../common/art';
import Title from '../../../common/title';
export default {
  data () {
    return {
      actionUrl: '',
      title: this.$route.meta.title
    }
  },
  components: {
    Art,
    Title,
  }
}
</script>
<style lang='scss' scoped>

</style>
