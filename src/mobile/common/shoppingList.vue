<template>
  <div class="shopping-list">
    <div class="shoppingCar">
      <van-swipe-cell
        :right-width="60"
        v-for="(item, index) of proList"
        :key="String(item.id)"
        class="swipe-cart"
        :disabled="type === 'history'"
      >
        <!--<span slot="left">选择</span>-->
        <div class="ui-flex-box cart-item" :class="selected.includes(item.id) ? 'checked' : ''">
          <div class="text-center mx-auto">
            <div v-if="type !== 'cart'">{{index+1}}</div>
            <div v-else class="mycheck text-center d-inline-block">
              <input type="checkbox" v-model="selected" :checked="item.checked" :value="item.id" :id="item.id" name="">
              <label :for="item.id"> </label>
            </div>
          </div>
          <div class="shoushi img-box">
            <router-link :to="{ name: 'proDetail', params: { id: item.id }}">
              <img width="160" :src="item.pic | formatImg" alt="">
            </router-link>
          </div>

          <div class="shoushi ui-flex-item pro-des">
            <div class="title">
              <router-link :to="{ name: 'proDetail', params: { id: item.id }}">
                {{langValue(item, 'title')}}
              </router-link>
            </div>

            <div id="price_id"  class="ui-flex-box price">
              <div v-if="type === 'cart'" class="red">￥{{item.price | money}}</div>
              <span v-else>{{item.add_time.split(' ')[0]}}</span>

              <div class="ui-flex-item text-right">
                <el-input-number v-if="type === 'cart'" step-strictly :disabled="type !== 'cart'" v-model="item.point" @change="(val) => handleChange(item.id, val)" :min="1" :max="3" ></el-input-number>
                <span class="xiaoren" v-else><img src="../../assets/logo-index.png" width="40" alt=""> <span>X</span> {{item.point}}</span>
              </div>
            </div>

          </div>
        </div>
        <div slot="right" class="swipe-del">
          <img @click="delProduct(item.id)" src="../../assets/wr.png" width="14" height="14" alt="">
        </div>
      </van-swipe-cell>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    handleChange: Function,
    delHandle: Function,
    updatePrice: Function
  },
  name: 'ShoppingList',
  data () {
    return {
      proList: null,
      selected: []
    }
  },
  computed: {
    // selected: {
    //   get () {
    //
    //   },
    //   set (val) {
    //     console.log(val, 'aaaa')
    //     const a = []
    //     this.proList.filter(item => item.checked).map(ck => a.push(ck.id))
    //     return a
    //   }
    // }
  },
  created () {
    this.init()
  },
  watch: {
    selected (val) {
      this.updatePrice(val)
      // const cartList = JSON.parse(localStorage.getItem("CART")) || [];
      // const checkedCart = cartList.filter(item => val.includes(item.id))
    },
    proList (val) {
      console.log(val, 'prolist')
    }
  },
  methods: {
    init () {
      if (this.type === 'cart') {
        const cartList = JSON.parse(localStorage.getItem('CART')) || []
        this.proList = cartList
        cartList.filter(item => item.checked).map(ck => this.selected.push(ck.id))
      } else {
        const loading = this.$loading()
        this.ajaxPost('api/shop/getOrderList', {}).then(res => {
          let length = res.data.length
          if (!length) return loading.close()
          const proList = []
          res.data.forEach(item => {
            this.getOrderDetail(item.id)
              .then(({data}) => {
                if (data && data[0]) {
                  proList.push(data[0])
                } else {
                  console.log(data, item, 'undef')
                }
              })
              .finally(() => {
                length--
                console.log(length, 'length')
                if (length === 0) {
                  console.log(length, proList, 'proList')
                  this.proList = proList
                  loading.close()
                }
              })
          })
          console.log(res.data)
        })
      }
    },
    selectAll () {
      const cartList = JSON.parse(localStorage.getItem('CART')) || []
      cartList.map(item => { this.selected.push(item.id) })
      console.log(this.proList, 'prolist')
    },
    unSelectAll () {
      this.selected = []
    },
    delProduct (id) {
      if (this.delHandle) {
        this.delHandle(id)
      }
      const cartList = JSON.parse(localStorage.getItem('CART')) || []
      console.log(cartList)
      this.proList = cartList
    },
    getOrderDetail (id) {
      return this.ajaxPost('api/shop/getOrderDetail', {
        id
      })
    },
    format (num) {
      return () => number_format(num)
    }
  },
  filters: {
    money (value) {
      if (/[^0-9\.]/.test(value)) { return '0' }
      if (value == null || value == '') { return '0' }
      value = value.toString().replace(/^(\d*)$/, '$1.')
      value = (value + '00').replace(/(\d*\.\d\d)\d*/, '$1')
      value = value.replace('.', ',')
      var re = /(\d)(\d{3},)/
      while (re.test(value)) { value = value.replace(re, '$1,$2') }
      value = value.replace(/,(\d\d)$/, '.$1')
      return value.split('.')[0]
    }
  }
}
</script>
<style lang='scss'>
@import '../sass/var.scss';
.shoppingCar {
    width: 100%;
    margin-top: 18px;
    text-align: center;
    .cart-item {
      align-items: center;
      width: 100%;
        padding: 25px 15px;
      &.checked {
        background: #f7f7f7;
      }
    }
    .mx-auto {
      font-size: 30px;
      margin-right: 20px;
    }
    img:hover {
      opacity: .5;
    }
    >>> .el-input-number {
      transform: scale(.6);
      transform-origin: right top;
    }
    .pro-des {
      height: 164px;
      text-align: left;
      line-height: 30px;
    }
    .title {
      line-height: 1.6;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 26px;
      height: 80px;
      margin-bottom: 45px;
    }
    .price {
      font-size: 26px;
      align-items: center;
      line-height: 30px;
      height: 30px;
    }
    .red {
      color: $themeColor;
      line-height: 40px;
    }
    .img-box {
      flex: 0 0 246px;
      width: 246px;
      height: 164px;
      margin-right: 32px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
}

.shopping-list {
  .swipe-cart {
    margin-bottom: 26px;
    border: .8PX solid #ccc;

    &:last-child {
      margin-bottom: 0;
    }
    .van-swipe-cell__wrapper {
      display: flex;
      align-items: center;
    }
  }
  .swipe-del {
    position: relative;
    display: flex;
    height: 100%;
    width: 120px;
    align-items: center;
    justify-content: center;
  }
  .mycheck label {
    border-color: #999 !important;
  }
}
  .xiaoren {
    color: $themeColor;
    font-size: 28px;
    span {
      font-size: 22px;
    }
    img {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
<style lang="scss">
  .shoppingCar {
    .el-input-number {
      transform: scale(.8);
      transform-origin: right center;
    }
  }
</style>
