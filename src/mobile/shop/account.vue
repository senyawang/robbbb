<template>
<div>
  <div class="pt-60 myAccount">
      <div @click="showMyProfile = true" class="shoushi">{{$t('account').myProfile}}</div>
      <div @click="showModifyPwd = true" class="shoushi">{{$t('account').modifyPwd}}</div>
      <div @click="goHistory" class="shoushi">{{$t('account').shopHistory}}</div>
      <p class="text-center">
        <img :src="robbbuy[0]" class="tupiantihuan" alt="">
        <img :src="robbbuy[1]" class="tupiantihuan" alt="">
        <img :src="robbbuy[2]" class="tupiantihuan" alt="">
      </p>
  </div>

  <el-dialog
          :visible.sync="showMyProfile"
          class="dialog-main"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">{{$t('account').userName}}</div>
                  <input type="text" class="form-input" v-model="real_name">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('account').userMobile}}</div>
                  <input type="tel" class="form-input" v-model="mobile">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('account').userAddress}}</div>
                  <input type="text" class="form-input" v-model="address">
              </div>
              <p class="mbp"><span class="c-red">*</span>{{$t('payDetail').text3}}</p>
              <p class="mbp"><span class="c-red">*</span>{{$t('payDetail').text2}}</p>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="saveProfile">{{$t('account').btn}}</Button>
            </div>
          </template>
      </el-dialog>

      <el-dialog
          :visible.sync="showModifyPwd"
          class="dialog-main"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">{{$t('account').pwd}}</div>
                  <input type="password" class="form-input" v-model="oldPwd">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('account').newpwd}}</div>
                  <input type="password" class="form-input" v-model="pwd">
              </div>
              <div class="form-item">
                  <div class="label">{{$t('account').repwd}}</div>
                  <input type="password" class="form-input" v-model="repwd">
              </div>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="modifyPwd">{{$t('account').btn}}</Button>
            </div>
          </template>
      </el-dialog>
</div>

</template>

<script>
import Button from '../common/Button'
import rob1 from '../../assets/qqq.png'
import rob2 from '../../assets/www.png'

const delay = t => new Promise((resolve) => setTimeout(resolve, t))

const swapItem = function (arr, fromIndex, toIndex) {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0]
  return arr
}

export default {
  data () {
    return {
      showMyProfile: false,
      showModifyPwd: false,
      real_name: '',
      mobile: '',
      address: '',
      oldPwd: '',
      pwd: '',
      repwd: '',
      id: 0,
      robbbuy1: rob1,
      robbbuy2: rob1,
      robbbuy: [rob2, rob1, rob1],
      stop: false
    }
  },
  components: {
    Button
  },
  created () {
    this.getProfiles()
  },
  mounted () {
    this.showAnimation()
  },
  destroyed () {
    this.stop = true
  },
  methods: {
    async showAnimation () {
      if (this.stop) return
      await delay(500)
      const rob = [...this.robbbuy]

      for (let i = 1; i < rob.length; i++) {
        console.log(500)
        this.robbbuy = swapItem(rob, i - 1, i)
        await delay(500)
      }
      await delay(500)
      this.robbbuy = swapItem(rob, rob.length - 1, 0)
      console.log(this.robbbuy, rob)
      for (let i = 1; i < rob.length; i++) {
        await delay(150)
        this.robbbuy = swapItem(rob, i - 1, i)
      }

      await delay(1000)
      this.robbbuy = swapItem(rob, rob.length - 1, 0)

      this.showAnimation()
    },
    goHistory () {
      this.$router.push('/robbbbuy/history')
    },
    getProfiles () {
      this.ajaxPost('api/shop/getUserAddress', {
        // id: this.$route.params.id,
      }).then(res => {
        const {real_name, mobile, address, id} = res.data
        this.real_name = real_name
        this.mobile = mobile
        this.address = address
        this.id = id
        console.log(res.data)
      })
    },
    saveProfile () {
      this.ajaxPost('api/shop/editUserAddress', {
        real_name: this.real_name,
        mobile: this.mobile,
        address: this.address,
        id: this.id,
      }).then(res => {
        this.showMyProfile = false
        this.$Event.$emit('ERROR', this.$i18n.locale === 'zh' ? res.msg : res.en_msg)
        console.log(res.data)
      })
    },
    modifyPwd () {
      this.ajaxPost('api/shop/modifyPwd', {
        oldPwd: this.oldPwd,
        pwd: this.pwd,
        repwd: this.repwd
      }).then(res => {
        this.oldPwd = ''
        this.pwd = ''
        this.repwd = ''
        this.showModifyPwd = false
        this.$Event.$emit('ERROR', this.$i18n.locale === 'zh' ? res.msg : res.en_msg)
        console.log(res.data)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.pt-60 {
  padding-top: 10px;
}
.myAccount > div {
    height: 90px;
    line-height: 90px;
    font-size: 35px;
    font-weight: 700;
    text-align: center;
    .shoushi:hover {
      opacity: .5;
    }
}

.justify-content-between {
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.myAccount img {
    width: 90%;
    margin-top: 70px;
}
.mbp {
  font-size: 17px;
}
</style>
