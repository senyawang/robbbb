<template>
<div class="main-body">
    <Title :title="langValue(content, 'title')" />
    <div class="about" v-html="langValue(content, 'content')">
    </div>
</div>
</template>

<script>
import Title from '../../common/title';
import { getLocationParams } from '../../../utils/help.js';
export default {
  components: {
    Title,
  },
  data () {
    return {
      pageId: this.$route.query.id,
      content: {},
    }
  },
  mounted () {
      this.init();
  },
  methods: {
    init(){
      this.ajaxPost('api/index/getPage', {
        pid: this.pageId
      }).then(res => {
        this.content = res.data;
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.about {
  min-height: 50vh;
  // background: #f0f0f0;
}
</style>
