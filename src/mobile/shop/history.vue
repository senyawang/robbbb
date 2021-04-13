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

    },
    init(){
      this.ajaxPost('api/shop/getOrderList', {
        id: this.$route.params.id,
      }).then(res => {

        console.log(res.data)
      })
    },
  }
}
</script>
<style lang='scss' scoped>
.pay-button {
  padding-top: 30px;
  font-size: 18px;
  & >>> p {
    margin-bottom: 15px;
  }
}
</style>
