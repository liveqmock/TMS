<template>
  <div class="topNav-message">
    <el-popover
      ref="popovermsg"
      placement="bottom-end"
      :popper-options="{'padding': 0}"
      width="360"
      :visible-arrow="false"
      popper-class="popovermsg"
      trigger="click">
      <el-row  class="msgbox-header">
        <el-col :span="16"><strong>消息中心</strong></el-col>
          <el-col :span="8"><el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-setting"></el-button></el-col>
      </el-row>
      <el-row class="msgbox-body">
        <el-col :span="24">
          <ul>
            <li v-for="i in 10" :key="i">
              消息{{i}}
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-popover>
    <div class="message-wrapper" v-popover:popovermsg>
      <el-badge :value="1">
        <icon-svg icon-class="xiaoxi" />
      </el-badge>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import "src/styles/variate.scss";
.topNav-message{
  position: absolute;
  top: 0;
  right: 264px;
  width: 80px;
  text-align: center;
  
  height: $topNavHeight;
  line-height: 16px;
  color:#fff;
  cursor: pointer;
  
}
.message-wrapper{
  height: $topNavHeight;
  padding-top: 27px;
  padding-right: 22px;
  padding-left: 18px;
  .svg-icon{
        margin-right: 0px;
        font-size: 1.5em;
        vertical-align: middle;
      }
  .el-badge__content{
    border-radius: 8px;
    padding: 0 4px;
  }

  &::after,&::before{
    position: absolute;
    content: '';
    top: ($topNavHeight - 20px) / 2;
    height: 20px;
    width: 1px;
    background: #87cfff;
  }
  &::after{
    left: 0;
  }
  &::before{
    right: 0;
  }
}
.popovermsg{
  padding: 0;
}
.msgbox-header{
    background: #eee;
    line-height: 30px;
  }
  .msgbox-body{
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

