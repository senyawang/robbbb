<template>
  <div class="shopping-list">
    <table class="shoppingCar">
        <tr style="background:#eee;">
            <th></th>
            <th width="160px"></th>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
            <th align="center">{{type === "cart" ? '' : '日期'}}</th>
        </tr>
        <tr v-for="(item, index) of proList" :key="item.id">
            <td class="text-center mx-auto">
                <div v-if="type !== 'cart'">{{index+1}}</div>
                <div v-else class="mycheck text-center d-inline-block">
                    <input type="checkbox" :checked.sync="item.checked" value="1" :id="item.id" name="">
                    <label :for="item.id"> </label>
                </div>
            </td>
            <td class="shoushi">
                <img width="160" :src="item.imgsrc" alt="">
            </td>
            <td class="shoushi">{{item.title}}</td>
            <td id="price_id" align="center">
              <div v-if="type === 'cart'">￥{{item.price | money}}</div>
              <div v-else style="text-align: center">
                <img src="../../assets/logo-index.png" width="60" alt="">
              </div>
            </td>
            <td class="num text-center" style="width: 90px;height: 30px;">
                <el-input-number step-strictly :disabled="type !== 'cart'" v-model="item.number" @change="handleChange" :min="1" :max="3" ></el-input-number>
            </td>
            <td>
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
              <span v-if="type !== 'cart'" style="font-size: 14px;">{{item.orderDate}}</span>
              <img v-else src="../../assets/wr.png" width="14" height="14" alt="">
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  name: 'ShoppingList',
  data () {
    return {
      proList: [
          {
            id: 12341234,
            checked: true,
            title: "这是一个标题",
            number: 2,
            price: 1999,
            total: 1999,
            imgsrc: '/static/1.jpg',
            orderDate: '2020-02-22'
          },
           {
            id: 64536536,
            checked: true,
            title: "这是二个标题",
            number: 3,
            price: 1999,
            total: 1999,
            imgsrc: '/static/1.jpg',
            orderDate: '2020-02-22'
          }
      ]
    }
  },
  methods: {
    format(num){
      return () => number_format(num);
    },
    handleChange(){

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
