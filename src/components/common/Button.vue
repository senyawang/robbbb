<template>
    <button :class="['button', size, color, type]" @click="handleClick">
      <slot></slot>
    </button>
</template>

<script>
export default {
    props: ["size", "color", "type"],
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
}
</script>
<style lang='scss' scoped>
@import '../../sass/var.scss';
.button {
  width: 142px;
  height: 40px;
  background: $black;
  font-size: 16px;
  color: #fff;
  border: 0 none;
  &:hover {
    background: rgba($color: $black, $alpha: .5);
  }
  &.large {
    width: 200px;
    height: 50px;
  }
  &.red {
    background: $themeColor;
    &:hover {
      background: rgba($color: $themeColor, $alpha: .7);
    }
  }

  &.sp {
    &:hover {
      background: $themeColor;
    }
  }

  &.ghost {
    background: #fff;
    color: $black;
    border: 1px solid $black;
    &:hover {
      border-color: rgba($color: $black, $alpha: .5)
    }
  }
}
</style>
