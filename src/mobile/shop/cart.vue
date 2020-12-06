<template>
  <div>
    <ShoppingList
        type='cart'
        :handleChange="changeHandle"
        :delHandle="delHandle"
        :updatePrice="updatePrice"
        detailName="proDetail" />
    <div style="height: 100px;"></div>
    <div class="text-right pay-button ui-flex-box shopping-list">
      <div class="mycheck text-center d-inline-block">
        <input type="checkbox" v-model="selected" id="all" name="">
        <label for="all"></label>
      </div>
      <span style="padding-left: 5px"> 全选</span>
      <div class="text-right ui-flex-item theme-primary">
        {{$t('shoppingCart').totalPrice}}：￥{{totalPrice | money}}
        <Button style="min-width: 120px;width: auto; padding: 0 10px;" size="large" class="sp" @click="totalPrice > 0 ? goToPay() : ''">{{$t('shoppingCart').goPay}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingList from '../common/shoppingList.vue'
import Button from '../common/Button.vue'
export default {
  data () {
    return {
      actionUrl: '',
      selected: [],
      isFixed: false,
      totalPrice: 0
    }
  },
  components: {
    ShoppingList,
    Button
  },
  computed: {
    // totalPrice () {
    //
    // }
  },
  mounted () {
    const localCart = JSON.parse(localStorage.getItem('CART')) || []
    this.totalPrice = localCart.reduce((a, c) => {
      return a + Number(c.price) * c.point
    }, 0)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {

    },
    changeHandle (id, value) {
      const localCart = JSON.parse(localStorage.getItem('CART')) || []
      localCart.find(item => item.id === id).point = value
      localStorage.setItem('CART', JSON.stringify(localCart))

      this.updatePrice(this.selected)
    },
    updatePrice (selected) {
      this.selected = selected
      const cartList = JSON.parse(localStorage.getItem('CART')) || []
      const checkedCart = cartList.filter(item => selected.includes(item.id))
      const totalPrice = checkedCart.filter(item => item.checked).reduce((a, c) => {
        return a + c.price * c.point
      }, 0)
      console.log(totalPrice, checkedCart, selected)
      this.totalPrice = totalPrice
      cartList.map(item => {
        if (selected.includes(item.id)) {
          item.checked = true
        }
      })

      localStorage.setItem('CART', JSON.stringify(cartList))
    },
    delHandle (id) {
      const localCart = JSON.parse(localStorage.getItem('CART')) || []
      const newCart = localCart.filter(item => item.id !== id)
      localStorage.setItem('CART', JSON.stringify(newCart))

      this.updatePrice(this.selected)
    },
    goToPay () {
      this.$router.push('/robbbbuy/payDetail')
    }
  }
}
</script>
<style lang='scss' scoped>
.pay-button {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 36px;
  align-items: center;
  padding-top: 30px;
  font-size: 28px;
  background: #fff;
}
</style>
