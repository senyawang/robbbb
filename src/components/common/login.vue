<template>
    <el-dialog
        :visible.sync="globalData.showLogin"
        width="480px"
        center
    >
        <template v-slot:title>
          <div class="text-center logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
        </template>

        <div class="form-style">
            <div class="form-item">
                <div class="label">用户名或电子邮箱</div>
                <input type="text" class="form-input" v-model="user_name">
            </div>
             <div class="form-item">
                <div class="label">密码</div>
                <input type="password" class="form-input" v-model="pwd">
            </div>
        </div>

        <template v-slot:footer>
          <div class="dialog-footer">
            <Button @click="handleLogin">确定</Button>
          </div>
        </template>
    </el-dialog>
</template>

<script>
import Button from './Button';

export default {
    components: {
      Button,
    },
    props: ["handleShowLogin"],
    inject: ['globalData'],
    computed: {

    },

    data () {
      return {
          user_name: '',
          pwd: '',
      }
    },

    mounted () {

    },

    methods: {
        handleLogin(){
            this.ajaxPost('api/shop/login', {
              user_name: this.user_name,
              pwd: this.pwd,
            }).then(res => {
              console.log(111)
              this.handleShowLogin();
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.logo {
  padding: 20px 0 0;
  img {
    width: 200px;
  }
}
.dialog-footer {
  margin-top: -20px;
  padding: 0 0 20px;
}
</style>
