<template>
  <div>
    <ShoppingList type='cart' :handleChange="changeHandle" detailName="proDetail" />
    <div class="text-right pay-button">
      <p>价格总计：￥{{1234 | money}}</p>
      <p><Button size="large" color="red" @click="goToPay">立即支付</Button></p>
    </div>
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

    },
    goToPay(){
      this.$router.push('/robbbbuy/payDetail')
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
