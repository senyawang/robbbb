<template>
    <el-dialog
        :visible.sync="globalData.showRegister"
        width="480px"
        center
    >
        <template v-slot:title>
          <div class="text-center logo"> <img src="../../assets/robbbbuy.png"  alt="" > </div>
        </template>

        <div class="form-style">
            <div class="form-item">
                <div class="label">用户名</div>
                <input type="text" class="form-input">
            </div>
            <div class="form-item">
                <div class="label">电子邮箱</div>
                <input type="text" class="form-input">
            </div>
             <div class="form-item">
                <div class="label">密码</div>
                <input type="password" class="form-input">
            </div>
            <div class="form-item">
                <div class="label">确认密码</div>
                <input type="password" class="form-input">
            </div>
        </div>

        <template v-slot:footer>
          <div class="dialog-footer">
            <Button @click="handleShowRegister">注册</Button>
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
    props: ["handleShowRegister"],
    inject: ['globalData'],
    computed: {

    },
    watch: {

    },
    data () {
      return {
        login: false,
        dialogVisible: true,
      }
    },

    methods: {
      handleLogin(){
        console.log(222);
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
