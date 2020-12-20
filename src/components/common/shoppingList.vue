<template>
  <div class="shopping-list">
    <table class="shoppingCar">
        <tr style="background:#eee;">
            <th></th>
            <th width="160px"></th>
            <th>{{$t('shoppingCart').proName}}</th>
            <th width="150" > {{$t('shoppingCart').price}} </th>
            <th width="100">{{$t('shoppingCart').number}} </th>
            <th width="150">{{$t('shoppingCart').total}} </th>
            <th style="min-width: 100px" align="center">{{type === "cart" ? '' : $t('shoppingCart').date}}</th>
        </tr>
        <tr v-for="(item, index) of proList" :key="item.id">
            <td class="text-center mx-auto">
                <div v-if="type !== 'cart'">{{index+1}}</div>
                <div v-else class="mycheck text-center d-inline-block">
                    <input type="checkbox" v-model="selected" :value="item.id" :id="item.id" name="">
                    <label :for="item.id"> </label>
                </div>
            </td>
            <td class="shoushi">
              <router-link :to="{ name: 'proDetail', params: { id: item.id }}">
                  <img width="160" :src="item.pic | formatImg" alt="">
              </router-link>
            </td>
            <td class="shoush title">
              <router-link :to="{ name: 'proDetail', params: { id: item.id }}">
                  {{langValue(item, 'title')}}
              </router-link>
              </td>
            <td id="price_id" align="center">
              <div v-if="type === 'cart'">￥{{item.price | money}}</div>
              <div v-else style="text-align: center">
                <img src="../../assets/logo-index.png" width="60" alt="">
              </div>
            </td>
            <td class="num text-center" style="width: 90px;height: 30px;">
                <el-input-number step-strictly :disabled="type !== 'cart'" v-model="item.point" @change="(val) => handleChange(item.id, val)" :min="1" :max="3" ></el-input-number>
            </td>
            <td>
              <div v-if="type === 'cart'">
              ￥<span id="all_id" class="iiiiiii">{{item.price * item.point | money}}</span>
              </div>
              <div v-else class="text-center" style="width: 120px">
                <span v-for="(img, index) in item.point" :key="index" :style="{display: item.point === 3 && index === 0 ? 'block' : 'inline-block'}">
                  <img src="../../assets/logo-index.png" width="60" alt="">
                </span>
              </div>
              </td>
            <td class="text-center">
              <span v-if="type !== 'cart'" style="font-size: 14px;">{{item.add_time}}</span>
              <img @click="delProduct(item.id)" v-else src="../../assets/wr.png" width="14" height="14" alt="">
            </td>
        </tr>
    </table>
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
          // {
          //   id: 12341234,
          //   checked: true,
          //   title: "这是一个标题",
          //   point: 2,
          //   price: 1999,
          //   total: 1999,
          //   pic: '/static/1.jpg',
          //   orderDate: '2020-02-22'
          // },
          //  {
          //   id: 64536536,
          //   checked: true,
          //   title: "这是二个标题",
          //   point: 3,
          //   price: 1999,
          //   total: 1999,
          //   pic: '/static/1.jpg',
          //   orderDate: '2020-02-22'
          // }
      ]
    }
  },
  mounted () {
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
        console.log(res.data[0].id, 'item.id')

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
.shoppingCar {
    width: 100%;
    margin-top: 11px;
    text-align: center;
    th, td {
        font-size: 16px;
        padding: 10px 15px;
        vertical-align: middle;
        border: 1px solid #000;
    }
    th {
      font-size: 18px;
      text-align: center;
    }
    img:hover {
      opacity: .5;
    }
  .title {
    &:hover {
      opacity: .5;
    }
  }
}

.shoppingCar input {
    width: auto;
}

.shoppingCar tr td:first-child {
    width: 56px;
}

.shoppingCar tr td:nth-child(3) {
    width: 350px;
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
