<template>
  <div class="createOrder" @click="openCreatePage"><icon-svg icon-class="jia" /> 创建运单</div>
</template>
<script>
import openWindow from '@/utils/openWindow'
export default {
  methods: {
    openCreatePage () {
      // 根据用户配置信息，决定是新开窗口打开还是在当前页面打开
      //1.当前页面跳转
      this.$router.push('/operation/order/createOrder')
      //2.新开窗口查看
      //openWindow('/createOrder', '创建运单', 1200, 666)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";

.createOrder{
  float: right;
  height: $topNavHeight;
  padding: 0 30px;
  text-align: center;
  line-height: $topNavHeight;
  font-size: $topNavFontSize;
  color: #fff;
  cursor: pointer;

  &:hover{
    background-color: rgba(0, 0, 0, .1);
  }

  .svg-icon{
    margin-right: 0px;
    font-size: 1.5em;
    vertical-align: middle;
    fill: #fff;
  }
}
</style>
