<template>
<div>
  <div class="pt-60 myAccount">
      <div class="ui-flex-box justify-content-between" id="xianshiwodeziliao">
          <div @click="showMyProfile = true" class="shoushi">{{$t('account').myProfile}}</div>
          <img src="../../assets/www.png" class="tupiantihuan" alt="">
      </div>
      <div class="ui-flex-box justify-content-between" id="xianshigenggaimima">
          <div @click="showModifyPwd = true" class="shoushi">{{$t('account').modifyPwd}}</div>
          <img src="../../assets/qqq.png" class="tupiantihuan" alt="">
      </div>
      <div class="ui-flex-box justify-content-between">
          <div @click="goHistory" class="shoushi">{{$t('account').shopHistory}}</div>
          <img src="../../assets/qqq.png" class="tupiantihuan" alt="">
      </div>
  </div>

  <el-dialog
          :visible.sync="showMyProfile"
          width="480px"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">收件人姓名</div>
                  <input type="text" class="form-input">
              </div>
              <div class="form-item">
                  <div class="label">收件人电话</div>
                  <input type="tel" class="form-input">
              </div>
              <div class="form-item">
                  <div class="label">收件人地址</div>
                  <input type="text" class="form-input">
              </div>
              <p class="mbp font-12"><span class="c-red">*</span>您的资料会受到保护</p>
              <p class="mbp font-12"><span class="c-red">*</span>可发往中国境外</p>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="showMyProfile = false">确定</Button>
            </div>
          </template>
      </el-dialog>


      <el-dialog
          :visible.sync="showModifyPwd"
          width="480px"
          center
      >
          <template v-slot:title>
            <div class="text-center dialog-logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
          </template>

          <div class="form-style">
              <div class="form-item">
                  <div class="label">当前密码</div>
                  <input type="password" class="form-input">
              </div>
              <div class="form-item">
                  <div class="label">新密码</div>
                  <input type="password" class="form-input">
              </div>
              <div class="form-item">
                  <div class="label">确认密码</div>
                  <input type="password" class="form-input">
              </div>
              <p class="mbp font-12"><span class="c-red">*</span>可发往中国境外</p>
          </div>

          <template v-slot:footer>
            <div class="dialog-footer">
              <Button @click="showModifyPwd = false">确定</Button>
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
      }
    },
    components: {
      Button,
    },
    methods: {
      goHistory(){
        this.$router.push('/robbbbuy/history')
      }
    }
}
</script>
<style lang='scss' scoped>
.pt-60 {
  padding-top: 60px;
}
.myAccount > div {
    height: 90px;
    line-height: 90px;
    font-size: 21px;
    margin-bottom: 76px;
    .shoushi:hover {
      opacity: .5;
    }
}

.justify-content-between {
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.myAccount img {
    height: 117px;
    margin-top: -5px;
}

</style>
