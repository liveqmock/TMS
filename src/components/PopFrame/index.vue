<template>
  <div class="popRight-center" :class="{showPopRight: isShow}" :style='{zIndex: zIndex}'>
    <div class="popRight-header">
      <slot name="title">{{title}}</slot>
      <i class="el-icon-close" @click="close" title="关闭"></i>
    </div>
    <div class="popRight-content">
      <slot name="content">内容</slot>
    </div>
    <div class="popRight-footer">
      <slot name="footer">底部</slot>
    </div>
  </div>
</template>
<script>
// 简单管理一个自增长的zIndex
function getPopZindex() {
  if (!window.tmsPopZindex) {
    window.tmsPopZindex = 1000
  } else {
    window.tmsPopZindex += 1
  }
  return window.tmsPopZindex
}
export default {
  props: {
    width: {
      type: String,
      default: '400'
    },
    title: {
      type: String,
      default: '标题'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zIndex: getPopZindex()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
@import "src/styles/variate.scss";

.popRight-center{
  width: 400px;
  position: fixed;
  left: 50%;
  top: $hideSidebarTop;
  height: calc( 50% - 50px);
  z-index: 33;
  padding-top: 30px;
  padding-bottom: 76px;
  background: #fff;
  border-radius: 6px 0px 0px 6px;
  box-shadow: -2px 0px 8px 0px
    rgba(169, 169, 169, 0.78);

  transition: transform 0.6s ease;
  transform: translate(-50%,0);
  display: none;

}
.showPopRight{
  display: block;
}
.popRight-header{
  height: 30px;
  line-height: 30px;
	background-color: #0b4b7c;
  color: #fff;
  text-align: left;
  font-weight: 600;
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  border-radius: 6px 0px 0px 0px;
  padding-left: 22px;

  i{
    position: absolute;
    top: 0;
    right: 9px;
    line-height: 30px;
    cursor: pointer;

    &:hover{
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
.popRight-content{
  position: relative;
  height: 100%;
  overflow: auto;
}
popRight-content .popRight-footer{
  position: absolute;
  bottom: 3px;
  left: 0;
  height: 30px;
  line-height: 30px;
  text-align: right;
  width: 100%;
  padding-right: 9px;
  background: #e6e6e6;
}
  .dialog-footer-frame .el-button--primary,.dialog-footer-frame .el-button--default{
    font-size: 12px;
    padding: 6px 11px;
  }
.dialog-footer-frame .el-button--default{
  background: #e6e6e6;
  border-color: #3e9ff1;
}
</style>
