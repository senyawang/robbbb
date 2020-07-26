<template>
    <div class="d-flex justify-content-between">
        <div>
            <div class="d-flex justify-content-between pay1">
                <div style="max-height: 392px;overflow: auto">
                    <div class="d-flex justify-content-between">
                        <img src="../../assets/1.jpg" alt="">
                        <div class="pl-2"><p class="ml-2">xxxxxxxxxxxxxxxxxxxxxxxxxxx</p></div>
                        <div class="nnn text-right">
                            <p class="m-0">￥1,999</p>
                            <p class="c-red ">x1</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <img src="../../assets/1.jpg" alt="">
                        <div class="pl-2"><p class="ml-2">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p></div>
                        <div class="nnn text-right">
                            <p class="m-0">￥1,999</p>
                            <p class="c-red ">x1</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <img src="../../assets/1.jpg" alt="">
                        <div class="pl-2"><p class="ml-2">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p></div>
                        <div class="nnn text-right">
                            <p class="m-0">￥1,999</p>
                            <p class="c-red ">x1</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <img src="../../assets/1.jpg" alt="">
                        <div class="pl-2"><p class="ml-2">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p></div>
                        <div class="nnn text-right">
                            <p class="m-0">￥1,999</p>
                            <p class="c-red ">x1</p>
                        </div>
                    </div>
                </div>
            </div>
            <h5 class="text-right mt-33">价格总计&nbsp;&nbsp;&nbsp;&nbsp; ￥1,999</h5>
        </div>
        <div class="ui-flex-item" style="margin-left: 120px;padding-top: 60px;">
            <div class="form-style">
              <h5 style="margin-bottom: 20px;">收件信息</h5>
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

              <div class="d-flex">
                <Button class="shoushi fs-16">确定</Button>
                <div class="text">
                    <p class="m-0"><span class="c-red">*</span>请仔细核对收件信息</p>
                    <p><span class="c-red">*</span>可发往中国境外</p>
                </div>
            </div>
            <div class="text-right">
                <Button class="xyb shoushi fs-18" @click="payment">下一步</Button>
            </div>
        </div>

          </div>

    </div>

</template>

<script>
import Button from "../common/Button.vue";

export default {
  components: {
    Button,
  },
  methods: {
    payment(){
      this.$router.push('/robbbbuy/payment')
    }
  }
}
</script>
<style lang='scss' scoped>
@import url("../../assets/bootstrap.css");
@import url("../../assets/shopping.css");

.text {
  font-size: 12px;
  line-height: 1.7;
  padding-left: 10px;
}
.nnn {
  .c-red {
    margin-top: 10px;
  }
}
.mt-33 {
  margin-top: 33px;
}
</style>
