<template>
    <div class="d-flex justify-content-between">
        <div>
            <div class="d-flex justify-content-between pay1">
                <div style="max-height: 340px;overflow: auto">

                    <div v-for="item in shopList" :key="item.id" class="d-flex item justify-content-between">
                        <img class="img" :src="item.pic | formatImg" alt="">
                      <div class="pl-2 ui-flex-item ml-2"><div class="title">{{langValue(item, 'title')}}</div></div>
                        <div class="text-right">
                            <p class="m-0" style="line-height: 1.5; font-size: 18px;">￥{{item.price | money}}</p>
                            <p class="c-red " style="line-height: 1.8;">x{{item.point}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <h5 class="text-right mt-33">{{$t('payDetail').totalPrice}}&nbsp;&nbsp;&nbsp;&nbsp; ￥{{totalPrice | money}}</h5>
        </div>
        <div class="ui-flex-item" style="margin-left: 120px;padding-top: 38px;">
            <div class="form-style">
              <h5 style="margin-bottom: 20px; line-height: 1;">{{$t('payDetail').userInfo}}</h5>
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
                <Button style="width: 88px; height: 34px; font-size: 14px;" class="shoushi fs-16" @click="centerDialogVisible = true">{{$t('buttons').modalConfirm}}</Button>
                <div class="text">
                    <p><span class="c-red">*</span>{{$t('payDetail').text1}}</p>
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
      resData: {},
      totalPrice: 0,
    }
  },
  created () {
    this.init()
    this.getProfiles()
  },
  methods: {
    init () {
      if (this.$route.query.id) {
        this.ajaxPost('api/shop/getShopDetail', {
          id: this.$route.query.id
        }).then(res => {
          const obj = res.data
          obj.point = this.$route.query.num
          this.shopList = [obj]
          this.totalPrice = res.data.price * obj.point
          console.log(res.data)
        })
      } else {
        const cartList = JSON.parse(localStorage.getItem('CART')) || []
        const checkedCart = cartList.filter(item => item.checked)
        const totalPrice = checkedCart.reduce((a, c) => {
          return a + c.price * c.point
        }, 0)
        this.totalPrice = totalPrice
        this.shopList = checkedCart
      }
    },
    payment () {
      const goods = this.shopList.map(item => `${item.id}|${item.point}`).join(',')
      this.ajaxPost('api/shop/addOrder', {
        real_name: this.real_name,
        mobil: this.mobile,
        address: this.address,
        account: this.totalPrice,
        goods
      }).then(res => {
        this.$router.push('/robbbbuy/payment')
      })
    },
    getProfiles () {
      this.ajaxPost('api/shop/getUserAddress', {
        // id: this.$route.params.id,
      }).then(res => {
        const {real_name, id, mobile, address} = res.data || {}
        this.real_name = real_name
        this.mobile = mobile
        this.id = id
        this.address = address
        console.log(res.data)
      })
    },
    saveProfile () {
      this.is_sync = 1
      this.ajaxPost('api/shop/editUserAddress', {
        real_name: this.real_name,
        mobile: this.mobile,
        address: this.address,
        is_sync: this.is_sync,
        id: this.id
      }).then(res => {
        // this.centerDialogVisible = true;
        this.resData = res
        this.$Event.$emit('ERROR', this.$i18n.locale === 'zh' ? res.msg : res.en_msg)
        this.centerDialogVisible = false
      }).catch(e => {
        this.centerDialogVisible = false
      })
    }
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
  .title {
    font-size: 18px;
    line-height: 1.8;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
  line-height: 1.8;
  padding-left: 10px;
  p {
    line-height: 1;
    margin-bottom: 8px;
  }
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
