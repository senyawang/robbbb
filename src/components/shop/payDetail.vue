<template>
    <div class="d-flex justify-content-between">
        <div>
            <div class="d-flex justify-content-between pay1">
                <div style="max-height: 392px;overflow: auto">

                    <div v-for="item in shopList" :key="item.id" class="d-flex justify-content-between">
                        <img :src="item.pic | formatImg" alt="">
                        <div class="pl-2"><p class="ml-2">{{langValue(item, 'title')}}</p></div>
                        <div class="nnn text-right">
                            <p class="m-0">￥{{item.price | money}}</p>
                            <p class="c-red ">x{{item.number}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <h5 class="text-right mt-33">{{$t('payDetail').totalPrice}}&nbsp;&nbsp;&nbsp;&nbsp; ￥{{totalPrice | money}}</h5>
        </div>
        <div class="ui-flex-item" style="margin-left: 120px;padding-top: 60px;">
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
                <Button class="shoushi fs-16" @click="saveProfile">{{$t('buttons').modalConfirm}}</Button>
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
        width="30%"
        center
        :modal="false"
        :close-on-click-modal="false"
      >
        <div class="text-center">{{langValue(resData, 'msg')}}</div>
        <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false">{{$t('buttons').modalConfirm}}</Button>
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
        shopList: [],
        real_name: '',
        mobile: '',
        address: '',
        centerDialogVisible: false,
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
          obj.number = this.$route.query.num;
          this.shopList = [obj]
          this.totalPrice = res.data.price * obj.number
          console.log(res.data)
        })
      } else {
        const cartList = JSON.parse(localStorage.getItem("CART")) || [];
        const checkedCart = cartList.filter(item => item.checked)
        const totalPrice = checkedCart.reduce((a, c) => {
            return a + c.price * c.number
          }, 0)
        this.totalPrice = totalPrice
        this.shopList  = checkedCart;
      }

    },
    payment(){
      const goods = this.shopList.map(item => `${item.id}|${item.number}`).join(",");
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
          id: 0,
        }).then(res => {
            this.centerDialogVisible = true;
            this.resData = res;
        })
      },
  }
}
</script>
<style lang='scss' scoped>
@import url("../../assets/bootstrap.css");
@import url("../../assets/shopping.css");

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
</style>
