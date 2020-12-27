<template>
<div :class="showTitle ? 'main-body' : ''">
    <Title v-if="showTitle" :title="$t('mainNav')[4]" />
    <div class="contact">
          <h5> {{$t('contact').text1}} </h5>
          <h5 class="mt-12"> {{$t('contact').text2}} </h5>
          <div class="ui-flex-box form-box">
              <div class="ui-flex-item">
                  <h5> {{$t('contact').name}} </h5>
                  <input type="text" class=" mb-4" v-model="user_name">
                  <h5> {{$t('contact').email}} </h5>
                  <input type="email" class=" mb-4" v-model="email">
                  <h5> {{$t('contact').theme}} </h5>
                  <input type="text" class=" mb-4" v-model="title">
              </div>
              <div class="ui-flex-item">
                  <h5> {{$t('contact').content}} </h5>
                  <textarea name="liuyan" id="liuyan" class="w-100" v-model="content"></textarea>
              </div>
          </div>
          <div class="text-right mt-2">
              <Button size="large" @click="handleSubmit"> {{$t('contact').btn}} </Button>
          </div>
    </div>

    <!--<el-dialog-->
        <!--:visible.sync="centerDialogVisible"-->
        <!--width="30%"-->
        <!--center-->
        <!--custom-class="dialog-message"-->
        <!--:modal="false"-->
        <!--:close-on-click-modal="false"-->
    <!--&gt;-->
        <!--<div class="text-center">{{langValue(res, 'msg')}}</div>-->
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<Button color="red" @click="centerDialogVisible = false">{{$i18n.locale === 'zh' ? '确定' : 'OK'}}</Button>-->
        <!--</span>-->
    <!--</el-dialog>-->

</div>
</template>

<script>
import Title from '../../common/title'
import Button from '../../common/Button'
export default {
  data () {
    return {
      centerDialogVisible: false,
      showTitle: this.$route.name === 'contact',
      user_name: '',
      email: '',
      title: '',
      content: '',
      res: ''
    }
  },
  components: {
    Title,
    Button
  },
  methods: {
    handleSubmit () {
      const api = this.$route.name === 'contact' ? 'api/index/addMessage' : 'api/shop/addService'
      this.ajaxPost(api, {
        user_name: this.user_name,
        title: this.title,
        email: this.email,
        content: this.content
      }).then(res => {
        console.log(res, 'res')
        this.res = res
        this.centerDialogVisible = true
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
        height: 280px;
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
