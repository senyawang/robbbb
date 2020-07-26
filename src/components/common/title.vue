<template functional>
  <h1 class="detail-title" style="{textAlign: 'right}">{{props.title}}</h1>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang='scss' scoped>
.detail-title {
  margin-bottom: 22px;
  text-align: right;
  font-size: 22px;
  font-weight: 500;
}
</style>
