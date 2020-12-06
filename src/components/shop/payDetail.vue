<template>
    <div class="d-flex justify-content-between">
        <div>
            <div class="d-flex justify-content-between pay1">
                <div style="max-height: 392px;overflow: auto">

                    <div v-for="item in shopList" :key="item.id" class="d-flex item justify-content-between">
                        <img class="img" :src="item.pic | formatImg" alt="">
                        <div class="pl-2 ui-flex-item"><p class="ml-2">{{langValue(item, 'title')}}</p></div>
                        <div class="text-right">
                            <p class="m-0">￥{{item.price | money}}</p>
                            <p class="c-red ">x{{item.point}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <h5 class="text-right mt-33">{{$t('payDetail').totalPrice}}&nbsp;&nbsp;&nbsp;&nbsp; ￥{{totalPrice | money}}</h5>
        </div>
        <div class="ui-flex-item" style="margin-left: 120px;padding-top: 38px;">
            <div class="form-style">
              <h5 style="margin-bottom: 20px;">{{$t('payDetail').userInfo}}</h5>
              <div class="form-item">
                  <div class="label">{{$t('payDetail').userName}}</div>
                  <input type="text" class="form-input" v-model="real_name">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('payDetail').userMobile}}</div>
                  <input type="tel" class="form-input" v-model="mobile">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('payDetail').userAddress}}</div>
                  <input type="text" class="form-input" v-model="address">
              </div>

              <div class="d-flex">
                <Button style="width: 80px; height: 34px" class="shoushi fs-16" @click="centerDialogVisible = true">{{$t('buttons').modalConfirm}}</Button>
                <div class="text">
                    <p class="m-0"><span class="c-red">*</span>{{$t('payDetail').text1}}</p>
                    <p><span class="c-red">*</span>{{$t('payDetail').text2}}</p>
                </div>
            </div>
            <div class="text-right">
                <Button class="xyb shoushi fs-18" @click="payment">{{$t('payDetail').btnNext}}</Button>
            </div>
        </div>

      </div>

      <el-dialog
        :visible.sync="centerDialogVisible"
        width="300px"
        center
        :show-close="false"
        :modal="false"
        :close-on-click-modal="false"
      >
        <div class="text-center">{{ $t('payDetail').ask }}</div>
        <span slot="footer" class="dialog-footer">
          <div><Button color="red" @click="() => {saveProfile()}">{{$t('payDetail').yes}}</Button></div>
          <Button style="margin-top: 10px" @click="centerDialogVisible = false">{{$t('payDetail').no}}</Button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="centerDialogVisible2"
        width="300px"
        center
        :show-close="false"
        :modal="false"
        :close-on-click-modal="false"
      >
        <div class="text-center">{{langValue(resData, 'msg')}}</div>
        <span slot="footer" class="dialog-footer">
          <Button color="red" @click="centerDialogVisible2 = false">{{$t('buttons').modalConfirm}}</Button>
        </span>
      </el-dialog>

    </div>

</template>

<script>
import Button from "../common/Button.vue";

export default {
  components: {
    Button,
  },
  data () {
    return {
        shopList: [
          // {
          //   id: 12341234,
          //   checked: true,
          //   title: "这是一个标题",
          //   point: 2,
          //   price: 1999,
          //   total: 1999,
          //   pic: '/assets/1.jpg',
          //   orderDate: '2020-02-22'
          // },
          // {
          //   id: 12341234,
          //   checked: true,
          //   title: "这是一个标题",
          //   point: 2,
          //   price: 1999,
          //   total: 1999,
          //   pic: '/assets/1.jpg',
          //   orderDate: '2020-02-22'
          // },
          //  {
          //   id: 64536536,
          //   checked: true,
          //   title: "这是二个标题",
          //   point: 3,
          //   price: 1999,
          //   total: 1999,
          //   pic: '/assets/1.jpg',
          //   orderDate: '2020-02-22'
          // }
        ],
        real_name: '',
        mobile: '',
        address: '',
        centerDialogVisible: false,
        centerDialogVisible2: false,
        is_sync: 0,
        resData: {},
    }
  },
  created () {
      this.init();
      this.getProfiles();
  },
  methods: {
    init(){
      if (this.$route.query.id) {
        this.ajaxPost('api/shop/getShopDetail', {
          id: this.$route.query.id,
        }).then(res => {
          const obj = res.data;
          obj.point = this.$route.query.num;
          this.shopList = [obj]
          this.totalPrice = res.data.price * obj.point
          console.log(res.data)
        })
      } else {
        const cartList = JSON.parse(localStorage.getItem("CART")) || [];
        const checkedCart = cartList.filter(item => item.checked)
        const totalPrice = checkedCart.reduce((a, c) => {
            return a + c.price * c.point
          }, 0)
        this.totalPrice = totalPrice
        this.shopList  = checkedCart;
      }

    },
    payment(){
      const goods = this.shopList.map(item => `${item.id}|${item.point}`).join(",");
      this.ajaxPost('api/shop/addOrder', {
          real_name: this.real_name,
          mobil: this.mobile,
          address: this.address,
          account: this.totalPrice,
          goods,
        }).then(res => {
          this.$router.push('/robbbbuy/payment')
        })
    },
    getProfiles(){
        this.ajaxPost('api/shop/getUserAddress', {
          // id: this.$route.params.id,
        }).then(res => {
          const {real_name, mobile, address} = res.data || {};
          this.real_name = real_name;
          this.mobile = mobile;
          this.address = address;
          console.log(res.data)
        })
      },
      saveProfile(){
        this.ajaxPost('api/shop/editUserAddress', {
          real_name: this.real_name,
          mobile: this.mobile,
          address: this.address,
          is_sync: this.is_sync,
          id: 0,
        }).then(res => {
            // this.centerDialogVisible = true;
            this.resData = res;
            this.centerDialogVisible2 = true;
            this.centerDialogVisible = false;
            is_sync = 1
        }).catch(e => {
          this.centerDialogVisible = false;
        })
      },
  }
}
</script>
<style lang='scss' scoped>
@import url("../../assets/bootstrap.css");
@import url("../../assets/shopping.css");

.pay1 {
  & > div {
    padding-bottom: 15px;
    padding-right: 5px;
  }
  .img {
    width: 150px;
    height: 100px;
  }
  .item {
    padding-bottom: 0 !important;
  }
  >>> .button {
      width: 90px;
  }
}

.text {
  font-size: 12px;
  line-height: 1.7;
  padding-left: 10px;
}
.nnn {
  .c-red {
    margin-top: 10px;
  }
}
.mt-33 {
  margin-top: 33px;
}
  .xyb {
    margin-top: 12px;
  }
</style>
