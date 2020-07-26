<template>
  <div>
    <Title :title="title" />
    <Art actionUrl='actionUrl' />
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
