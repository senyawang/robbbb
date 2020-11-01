<template>
  <h1 class="detail-title" :style="{textAlign: align || 'right'}">{{title}}</h1>
</template>

<script>
export default {
  props: {
    title: String,
    align: String,
  }
}
</script>
<style lang='scss' scoped>
.detail-title {
  margin-top: 60px;
  margin-bottom: 44px;
  text-align: center !important;
  font-size: 35px;
  font-weight: 500;
}
</style>
