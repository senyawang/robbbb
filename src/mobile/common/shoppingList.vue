<template>
  <div class="shopping-list">
    <div class="shoppingCar">
        <div v-for="(item, index) of proList" :key="item.id" class="ui-flex-box cart-item">
            <div class="text-center mx-auto">
                <div v-if="type !== 'cart'">{{index+1}}</div>
                <div v-else class="mycheck text-center d-inline-block">
                    <input type="checkbox" v-model="selected" :value="item.id" :id="item.id" name="">
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
                <span v-else>{{item.orderDate}}</span>

                <div class="ui-flex-item text-right">
                    <el-input-number step-strictly :disabled="type !== 'cart'" v-model="item.number" @change="(val) => handleChange(item.id, val)" :min="1" :max="3" ></el-input-number>
                </div>
              </div>

            </div>


            <!-- <td>
              <div v-if="type === 'cart'">
              ￥<span id="all_id" class="iiiiiii">{{item.price * item.number | money}}</span>
              </div>
              <div v-else class="text-center">
                <span v-for="(img, index) in item.number" :key="index" :style="{display: item.number === 3 && index === 0 ? 'block' : 'inline-block'}">
                  <img src="../../assets/logo-index.png" width="60" alt="">
                </span>
              </div>
              </td>
            <td class="text-center">

              <img @click="delProduct(item.id)" src="../../assets/wr.png" width="14" height="14" alt="">
            </td> -->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    handleChange: Function,
    delHandle: Function,
    updatePrice: Function,
},
  name: 'ShoppingList',
  data () {
    return {
      selected: [],
      proList: [
          {
            id: 12341234,
            checked: true,
            title: "这是一个标题",
            point: 2,
            price: 1999,
            total: 1999,
            pic: '/static/1.jpg',
            orderDate: '2020-02-22'
          },
           {
            id: 64536536,
            checked: true,
            title: "这是二个标题",
            point: 3,
            price: 1999,
            total: 1999,
            pic: '/static/1.jpg',
            orderDate: '2020-02-22'
          }
      ]
    }
  },
  created () {
    this.init();
  },
  watch: {
      selected(val){
        this.updatePrice(val);
        // const cartList = JSON.parse(localStorage.getItem("CART")) || [];
        // const checkedCart = cartList.filter(item => val.includes(item.id))
      }
  },
  methods: {
    init(){
      if(this.type === "cart"){
        const cartList = JSON.parse(localStorage.getItem("CART")) || [];
        this.proList = cartList;
        cartList.filter(item => item.checked).map(ck => this.selected.push(ck.id))
      } else {
        this.ajaxPost('api/shop/getOrderList', {
          id: this.$route.params.id,
        }).then(res => {
          // this.imgList = res.data.pic_list;
          res.data.forEach(item => {
            this.getOrderDetail(item.id);
          })
          console.log(res.data)
        })
      }
    },
    delProduct(id){
      if(this.delHandle){
        this.delHandle(id);
      }
      const cartList = JSON.parse(localStorage.getItem("CART")) || [];
      console.log(cartList);
        this.proList = cartList;
    },
    getOrderDetail(id){
       this.ajaxPost('api/shop/getOrderDetail', {
          id,
        }).then(res => {
          this.proList.push(res.data[0]);
        })
    },
    format(num){
      return () => number_format(num);
    },
  },
  filters: {
        money(value) {
           if (/[^0-9\.]/.test(value))
          return "0";
        if (value == null || value == "")
          return "0";
        value = value.toString().replace(/^(\d*)$/, "$1.");
        value = (value + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        value = value.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(value))
          value = value.replace(re, "$1,$2");
        value = value.replace(/,(\d\d)$/, ".$1");
        return value;
        }
    },
}
</script>
<style lang='scss'>
@import '../sass/var.scss';
.shoppingCar {
    width: 100%;
    margin-top: 11px;
    text-align: center;
    .cart-item {
        padding: 25px 15px;
        border: 1px solid #ccc;
    }
    .mx-auto {
      margin-right: 20px;
    }
    img:hover {
      opacity: .5;
    }
    /deep/ .el-input-number {
      transform: scale(.7);
      transform-origin: right top;
    }
    .pro-des {
      text-align: left;
      line-height: 30px;
    }
    .title {
      height: 100px;
    }
    .price {
      color: $themeColor;
      line-height: 30px;
      height: 30px;
    }
    .red {
      line-height: 40px;
    }
    .img-box {
      width: 246px;
      height: 146px;
      margin-right: 32px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
}

.shoppingCar .choose {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    color: #aaa;
    display: inline-block;
}
</style>
