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
  margin-bottom: 22px;
  text-align: right;
  font-size: 22px;
  font-weight: 500;
}
</style>
