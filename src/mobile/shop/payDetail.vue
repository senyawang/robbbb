<template>
    <div class="pt18">
        <div class="pay1">
            <div class="cart-box" style="height: 80px; overflow: auto">
              <div v-for="item in shopList" :key="item.id" class="d-flex" >
                  <img :src="item.pic | formatImg" alt="" width="120" height="80">
                  <div class="pl-2 f28 ui-flex-item ml-2"><div class="title">{{langValue(item, 'title')}}</div></div>
                  <div class="nnn text-right f28" style="line-height: 1.5;">
                      <p class="m-0">￥{{item.price | money}}</p>
                      <p class="c-red ">x{{item.point}}</p>
                  </div>
              </div>
            </div>
        </div>
        <h5 class="text-center mt-33 f28">{{$t('payDetail').totalPrice}}&nbsp;&nbsp;&nbsp;&nbsp; ￥{{totalPrice | money}}</h5>
        <div>
            <div class="form-style">
              <h5 class="text-center mt-43 f30" style="margin-bottom: 10px;">{{$t('payDetail').userInfo}}</h5>
              <div class="form-item">
                  <div class="label text-center">{{$t('payDetail').userName}}</div>
                  <input type="text" class="form-input" v-model="real_name">
              </div>
              <div class="form-item">
                  <div class="label text-center">{{$t('payDetail').userMobile}}</div>
                  <input type="tel" class="form-input" v-model="mobile">
              </div>
              <div class="form-item">
                  <div class="label text-center">{{$t('payDetail').userAddress}}</div>
                  <input type="text" class="form-input" v-model="address">
              </div>

              <div class="d-flex" style="overflow: hidden;">
                <Button class="shoushi fs-16" @click="centerDialogVisible = true">{{$t('buttons').modalConfirm}}</Button>
                <div class="ui-flex-item">
                  <div class="text" style="float: right">
                    <p class="m-0"><span class="c-red">*</span>{{$t('payDetail').text1}}</p>
                    <p><span class="c-red">*</span>{{$t('payDetail').text2}}</p>
                  </div>
                </div>

            </div>
            <div class="text-center mt-43">
                <Button class="xyb shoushi fs-18 large" @click="payment">{{$t('payDetail').btnNext}}</Button>
            </div>
        </div>

      </div>

      <el-dialog
        :visible.sync="centerDialogVisible"
        center
        :modal="false"
        class="custom-dialog"
        :close-on-click-modal="false"
      >
        <div class="text-center">{{ $t('payDetail').ask }}</div>
        <span slot="footer" class="dialog-footer">
          <div><Button color="red" @click="() => {saveProfile()}">{{$t('payDetail').yes}}</Button></div>
          <Button style="margin-top: 10px" @click="centerDialogVisible = false">{{$t('payDetail').no}}</Button>
        </span>
      </el-dialog>

    </div>

</template>

<script>
import Button from '../common/Button.vue'

export default {
  components: {
    Button
  },
  data () {
    return {
        shopList: [],
        real_name: '',
        mobile: '',
        address: '',
        centerDialogVisible: false,
        centerDialogVisible2: false,
        is_sync: 0,
        totalPrice: 0,
        id: 0,
        resData: {},
    }
  },
  created () {
      this.init();
      this.getProfiles();
  },
  computed: {
    // totalPrice () {
	//
    // }
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
          const {real_name, mobile, address, id} = res.data || {};
          this.real_name = real_name;
          this.mobile = mobile;
          this.id = id
          this.address = address;
          console.log(res.data)
        })
      },
      saveProfile(){
        this.is_sync = 1
        this.ajaxPost('api/shop/editUserAddress', {
          real_name: this.real_name,
          mobile: this.mobile,
          address: this.address,
          is_sync: this.is_sync,
          id: this.id || 0,
        }).then(res => {
            // this.centerDialogVisible = true;
            this.resData = res;
          this.$Event.$emit('ERROR', this.$i18n.locale === 'zh' ? res.msg : res.en_msg)
            this.centerDialogVisible = false;
        }).catch(e => {
          this.centerDialogVisible = false;
        })
      },
  }
}
</script>
<style lang='scss' scoped>
/*@import url("../../assets/bootstrap.css");*/
/*@import url("../../assets/shopping.css");*/

.form-style {
  font-size: 24px;
  padding: 0 70px;
}
.cart-box {
  padding:0 20px;
}
.pay1 {
  padding: 20px 0;
  border: .8PX solid #000;
  .d-flex {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  .title {
    font-size: 28px;
    line-height: 1.5;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.text {
  font-size: 16px;
  line-height: 1.5;
  padding-left: 10px;
}
>>> .en {
  .text {
    font-size: 12px;
  }
}
.nnn {
  .c-red {
    margin-top: 10px;
  }
}
.pl-2 {
  padding: 0 20px;
  line-height: 1.5;
}
.mt-33 {
  margin-top: 33px;
}
.fs-16 {
  width: 7em !important;
  height: 50px;
  font-size: 20px;
}
.mt-43 {
  margin-top: 43px;
}
</style>
