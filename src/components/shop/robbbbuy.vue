<template>
  <div>
    <Art actionUrl='actionUrl' detailName="proDetail" />
  </div>
</template>

<script>
import Art from '../common/art';
export default {
  data () {
    return {
      actionUrl: '',
    }
  },
  components: {
    Art,
  }
}
</script>
<style lang='scss'>

</style>
