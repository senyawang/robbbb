<template>
  <div>
    <ShoppingList
        type='cart'
        :handleChange="changeHandle"
        :delHandle="delHandle"
        :updatePrice="updatePrice"
        detailName="proDetail" />
    <div class="text-right pay-button">
      <p>价格总计：￥{{totalPrice | money}}</p>
      <p><Button size="large" class="sp" @click="totalPrice > 0 ? goToPay() : ''">进入支付</Button></p>
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
      totalPrice: 0,
      selected: [],
    }
  },
  components: {
    ShoppingList,
    Button,
  },
  created () {
       const localCart = JSON.parse(localStorage.getItem("CART")) || []
        const totalPrice = localCart.reduce((a, c) => {
          return a + c.price * c.number
        }, 0)

        this.totalPrice = totalPrice
  },
  methods: {
    changeHandle(id, value){

          const localCart = JSON.parse(localStorage.getItem("CART")) || []
          localCart.find(item => item.id === id).number = value;
          localStorage.setItem("CART", JSON.stringify(localCart))

          this.updatePrice(this.selected);

    },
    updatePrice(selected){
       this.selected = selected;
        const cartList = JSON.parse(localStorage.getItem("CART")) || [];
        const checkedCart = cartList.filter(item => selected.includes(item.id))
        const totalPrice = checkedCart.filter(item => item.checked).reduce((a, c) => {
            return a + c.price * c.number
          }, 0)
        this.totalPrice = totalPrice
        cartList.map(item => {
          if(selected.includes(item.id)){
            item.checked = true;
          }
        })

        localStorage.setItem("CART", JSON.stringify(cartList))
    },
    delHandle(id){

        const localCart = JSON.parse(localStorage.getItem("CART")) || []
        const newCart = localCart.filter(item => item.id !== id);
        localStorage.setItem("CART", JSON.stringify(newCart))

        this.updatePrice(this.selected);

    },
    goToPay(){
      this.$router.push('/robbbbuy/payDetail')
    }
  }
}
</script>
<style lang='scss'>
.pay-button {
  padding-top: 30px;
  font-size: 18px;
  p {
    margin-bottom: 15px;
  }
}
</style>
