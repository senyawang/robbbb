<template>
<div :class="showTitle ? 'main-body' : ''">
    <Title v-if="showTitle" title="联系" />
    <div class="contact">
          <h5>请留言，我们会尽快回复您。</h5>
          <h5 class="mt-12">请填写全部信息以便我们能够满足您的需要，谢谢。</h5>
          <div class="ui-flex-box form-box">
              <div class="ui-flex-item">
                  <h5>您的名字</h5>
                  <input type="text" class=" mb-4" v-model="user_name">
                  <h5>您的电子邮箱地址</h5>
                  <input type="email" class=" mb-4" v-model="email">
                  <h5>主题</h5>
                  <input type="text" class=" mb-4" v-model="title">
              </div>
              <div class="ui-flex-item">
                  <h5>内容</h5>
                  <textarea name="liuyan" id="liuyan" class="w-100" v-model="content"></textarea>
              </div>
          </div>
          <div class="text-right mt-2">
              <Button size="large" @click="handleSubmit">发送信息</Button>
          </div>
    </div>

    <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal="false"
        :close-on-click-modal="false"
    >
        <div class="text-center">{{errMsg}}</div>
        <span slot="footer" class="dialog-footer">
          <Button color="red" @click="centerDialogVisible = false">确定</Button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import Title from '../../common/title';
import Button from '../../common/Button';
export default {
  data () {
    return {
      centerDialogVisible: false,
      showTitle: this.$route.name === "contact",
      user_name: '',
      email: '',
      title: '',
      content: '',
      errMsg: '',
    }
  },
  components: {
    Title,
    Button,
  },
  methods: {
    handleSubmit(){
      this.ajaxPost('api/index/addMessage', {
        user_name: this.user_name,
        title: this.title,
        email: this.email,
        content: this.content,
      }).then(res => {
        console.log(res, 'res');
        this.errMsg = res.msg
        this.centerDialogVisible = true;
      }).catch(err => {
        this.errMsg = err
        this.centerDialogVisible = true;
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.contact {
    font-size: 18px;
    line-height: 1.8;

    .submit {
          width: 200px;
          height: 50px;
          background-color: #000;
          color: #fff;
          border: 0 none;
          &:hover {
            background: rgba($color: #000000, $alpha: .5);
          }
      }

    .form-box {
      padding-top: 60px;

      input {
        width: 80%;
        height: 52px;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 0;
        box-sizing: border-box;
      }
      textarea {
        width: 100%;
        height: 290px;
        padding: 10px;
        border-radius: 0;
        border: 1px solid #000;
        resize: none;
        box-sizing: border-box;
      }
    }

    .mb-4 {
      margin-bottom: 30px;
    }
    .mt-2 {
      margin-top: 20px;
    }
}
</style>
