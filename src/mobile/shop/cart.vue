<template>
  <div>
    <ShoppingList
        type='cart'
        ref="shoplist"
        :handleChange="changeHandle"
        :delHandle="delHandle"
        :updatePrice="updatePrice"
        detailName="proDetail" />
    <div style="height: 100px;"></div>
    <div class="text-right pay-button ui-flex-box shopping-list">
      <div class="mycheck text-center d-inline-block">
        <input type="checkbox" v-model="selectedAll" id="all" name="" @click="handleSelectAll">
        <label for="all"></label>
      </div>
      <span style="padding-left: 5px">{{$t('other').selectAll}}</span>
      <div class="text-right ui-flex-item total-price">
        {{$t('shoppingCart').totalPrice}}<span class="theme-primary"> ￥{{totalPrice | money}}</span>
        <Button style="min-width: 120px;width: auto; padding: 0 10px; margin-left: 10px;" size="large" class="sp" @click="totalPrice > 0 ? goToPay() : ''">{{$t('shoppingCart').goPay}}</Button>
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
      totalPrice: 0,
      cartLength: 0
    }
  },
  components: {
    ShoppingList,
    Button
  },
  computed: {
    selectedAll: {
      get () {
        return this.selected.length === this.cartLength
      },
      set (val) {
        if (val) {
          this.$refs.shoplist.selectAll()
        } else {
          this.$refs.shoplist.unSelectAll()
        }
      }
    }
  },
  watch: {
    selected (val) {

    }
  },
  created () {
    const localCart = JSON.parse(localStorage.getItem('CART')) || []
    localCart.forEach(item => item.checked = false)
    localStorage.setItem('CART', JSON.stringify(localCart))
  },
  mounted () {
    const localCart = JSON.parse(localStorage.getItem('CART')) || []
    this.cartLength = localCart.length
    // this.totalPrice = localCart.reduce((a, c) => {
    //   return a + Number(c.price) * c.point
    // }, 0)

    window.addEventListener('scroll', this.handleScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {

    },
    handleSelectAll (event) {
      console.log(event.target.checked, 'event')
      // this.$refs.shoplist.selectAll(event.target.checked)
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
      cartList.map(item => {
        if (selected.includes(item.id)) {
          item.checked = true
        }
      })

      localStorage.setItem('CART', JSON.stringify(cartList))

      const checkedCart = cartList.filter(item => selected.includes(item.id))
      const totalPrice = checkedCart.filter(item => item.checked).reduce((a, c) => {
        return a + c.price * c.point
      }, 0)
      console.log(totalPrice, checkedCart, selected)
      this.totalPrice = totalPrice

    },
    delHandle (id) {
      const localCart = JSON.parse(localStorage.getItem('CART')) || []
      const newCart = localCart.filter(item => item.id !== id)
      localStorage.setItem('CART', JSON.stringify(newCart))

      this.updatePrice(this.selected)
    },
    goToPay () {
      if(this.selected.length) {
        this.$router.push('/robbbbuy/payDetail')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .total-price {
    font-size: 24px;
  }
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
