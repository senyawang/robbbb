<template>
<div>
  <div class="pt-60 myAccount">
      <div @click="showMyProfile = true" class="shoushi">{{$t('account').myProfile}}</div>
      <div @click="showModifyPwd = true" class="shoushi">{{$t('account').modifyPwd}}</div>
      <div @click="goHistory" class="shoushi">{{$t('account').shopHistory}}</div>
      <p class="text-center" style="padding-bottom: 20px">
          <img src="../../assets/www.png" class="tupiantihuan" alt="">
          <img src="../../assets/qqq.png" class="tupiantihuan" alt="">
          <img src="../../assets/qqq.png" class="tupiantihuan" alt="">
          <img src="../../assets/qqq.png" class="tupiantihuan" alt="">
      </p>
  </div>

  <el-dialog
          :visible.sync="showMyProfile"
          width="90%"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">收件人姓名</div>
                  <input type="text" class="form-input" v-model="real_name">
              </div>
              <div class="form-item">
                  <div class="label">收件人电话</div>
                  <input type="tel" class="form-input" v-model="mobile">
              </div>
              <div class="form-item">
                  <div class="label">收件人地址</div>
                  <input type="text" class="form-input" v-model="address">
              </div>
              <p class="mbp font-12"><span class="c-red">*</span>您的资料会受到保护</p>
              <p class="mbp font-12"><span class="c-red">*</span>可发往中国境外</p>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="saveProfile">确定</Button>
            </div>
          </template>
      </el-dialog>


      <el-dialog
          :visible.sync="showModifyPwd"
          width="90%"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">当前密码</div>
                  <input type="password" class="form-input" v-model="oldPwd">
              </div>
              <div class="form-item">
                  <div class="label">新密码</div>
                  <input type="password" class="form-input" v-model="pwd">
              </div>
              <div class="form-item">
                  <div class="label">确认密码</div>
                  <input type="password" class="form-input" v-model="repwd">
              </div>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="modifyPwd">确定</Button>
            </div>
          </template>
      </el-dialog>
</div>


</template>

<script>
import Button from '../common/Button';
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
        repwd: ''
      }
    },
    components: {
      Button,
    },
    created () {
      this.getProfiles();
    },
    methods: {
      goHistory(){
        this.$router.push('/robbbbuy/history')
      },
      getProfiles(){
        this.ajaxPost('api/shop/getUserAddress', {
          // id: this.$route.params.id,
        }).then(res => {
          const {real_name, mobile, address} = res.data;
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
          this.showMyProfile = false;
          console.log(res.data)
        })
      },
      modifyPwd(){
        this.ajaxPost('api/shop/modifyPwd', {
          oldPwd: this.oldPwd,
          pwd: this.pwd,
          repwd: this.repwd,
        }).then(res => {
          this.showModifyPwd = false;
          console.log(res.data)
        })
      },
    }
}
</script>
<style lang='scss' scoped>
.pt-60 {
  padding-top: 40px;
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

</style>
