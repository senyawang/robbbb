<template>
<div :class="showTitle ? 'main-body' : ''">
    <Title v-if="showTitle" :title="$t('mainNav')[4]" />
    <div class="contact">
          <div class="text-center ipadstyle">
            <h5 style="font-size: 9px;"> {{$t('contact').text1}} </h5>
            <h5 style="font-size: 9px;" class="mt-12"> {{$t('contact').text2}} </h5>
          </div>

          <div class=" form-box">
              <div class="" style="padding: 0 26px">
                  <h5> {{$t('contact').name}} </h5>
                  <input type="text" class=" mb-4" v-model="user_name">
                <h5> {{$t('contact').email}} </h5>
                  <input type="email" class=" mb-4" v-model="email">
                <h5> {{$t('contact').theme}} </h5>
                  <input type="text" class=" mb-4" v-model="title">
              </div>
              <div class="">
                <h5 class="text-center"> {{$t('contact').content}} </h5>
                  <textarea name="liuyan" id="liuyan" class="w-100" v-model="content"></textarea>
              </div>
          </div>
          <div class="text-center mt-2">
              <Button style="width: 140px" size="large" @click="handleSubmit">{{$t('contact').btn}}</Button>
          </div>
    </div>

    <!-- <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal="false"
        :close-on-click-modal="false"
    >
        <div class="text-center">{{errMsg}}</div>
        <span slot="footer" class="dialog-footer">
          <Button @click="centerDialogVisible = false">确定</Button>
        </span>
    </el-dialog> -->

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
    handleSubmit () {
      const api = this.$route.name === 'contact' ? 'api/index/addMessage' : 'api/shop/addService'
      this.ajaxPost(api, {
        user_name: this.user_name,
        title: this.title,
        email: this.email,
        content: this.content,
      }).then(res => {
        console.log(res, 'res');
        this.res = res
        this.centerDialogVisible = true;
        this.user_name = ''
        this.email = ''
        this.title = ''
        this.content = ''
        this.$Event.$emit('ERROR', this.$i18n.locale === 'zh' ? res.msg : res.en_msg)
      }).catch(err => {
        // this.errMsg = err
        // this.centerDialogVisible = true
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.contact {
    font-size: 24px;
    line-height: 1.8;
    font-weight: 500;
  padding-top: 17px;
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
      padding-top: 50px;

      h5 {
        font-size: 20px;
        text-align: left;
      }

      input {
        width: 100%;
        height: 60px;
        padding: 10px;
        border: .8PX solid #000;
        border-radius: 0;
        box-sizing: border-box;
        -webkit-appearance: none;
      }
      textarea {
        width: 100%;
        height: 290px;
        padding: 10px;
        border-radius: 0;
        border: .8PX solid #000;
        resize: none;
        box-sizing: border-box;
      }
    }

    .mb-4 {
      margin-bottom: 30px;
    }
    .mt-2 {
      margin-top: 40px;
    }
}
@media screen and (min-width: 750px) {
  .button {
    width: 224px !important;
    height: 64px !important;
    /*font-size: 12px !important;*/
  }
  .ipadstyle h5{
    font-size: 14px !important;
  }
  .form-box {
    input {
      transform: matrix3d();
      box-sizing: content-box !important;
      border:.5px solid #000 !important;
    }
    textarea {
      box-sizing: content-box !important;
      border: .8px solid #000 !important;
    }
  }
}
</style>
