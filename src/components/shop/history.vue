<template>
  <div>
    <ShoppingList type='history' :handleChange="changeHandle" detailName="proDetail" />
  </div>
</template>

<script>
import ShoppingList from '../common/shoppingList.vue';
import Button from "../common/Button.vue";
export default {
  data () {
    return {
      actionUrl: '',
    }
  },
  components: {
    ShoppingList,
    Button,
  },
  methods: {
    changeHandle(){

    }
  }
}
</script>
<style lang='scss' scoped>
.pay-button {
  padding-top: 30px;
  font-size: 18px;
  & /deep/ p {
    margin-bottom: 15px;
  }
}
</style>
