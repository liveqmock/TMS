<template>
  <div class="myinfo-panel">
    <el-row class="infopanel">
      <el-col :span="24" class="info-title">
        <strong>个人信息</strong>
      </el-col>

      <el-col :span="4">
        <div class="label">
         <img class="user-avatar" :src="avatar">
        </div>
      </el-col>
      <el-col :span="20">
        <span class="inline-label">姓名：</span>{{ otherinfo.username }}
          <br />
          <span class="inline-label">手机号：</span>
        {{ otherinfo.mobilephone }}
      </el-col>
    </el-row>
    
    <el-row class="infopanel">
      <el-col :span="24" class="info-title">
        <strong>账号信息</strong>
      </el-col>

      <el-col :span="4">
        <div class="label">登录账户：</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.username }}
      </el-col>

      <el-col :span="4">
        <div class="label">密码：</div>
      </el-col>
      <el-col :span="20">
        *********** <el-button @click="showPop = true" type="text">修改密码</el-button>
      </el-col>
    </el-row>

    <el-row class="infopanel">
      <el-col :span="24" class="info-title">
        <strong>公司信息</strong>
      </el-col>

      <el-col :span="4">
        <div class="label">公司：</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.orgName }}
      </el-col>

      <el-col :span="4">
        <div class="label">所属网点：</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.orgName }}
      </el-col>

      <el-col :span="4">
        <div class="label">所属部门：</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.departmentName || otherinfo.departmentId }}
      </el-col>

      <el-col :span="4">
        <div class="label">职位：</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.position }}
      </el-col>
    </el-row>
    <ChangePwPop :isShow.sync="showPop" @close="close" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwPop from './ChangePassword'

export default {
  name: 'myinfo',
  components: {
    ChangePwPop
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'company',
      'avatar',
      'otherinfo'
    ])
  },
  data() {
    return {
      showPop: false
    }
  },
  methods: {
    close() {
      this.showPop = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-avatar{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.myinfo-panel{
  
  color: #333;
  line-height: 2;
  height: 100%;
  background: #f3f5f7;

  .label,.inline-label{
    text-align: right;
    padding-right: 10%;
    color: #777;
  }
  .inline-label{
    width: 5em;
    display: inline-block;
    padding-right: 0;
  }
  .infopanel{
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;
    padding-bottom: 20px;
    background: #fff;
  }

  .info-title{
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #dadada;
    margin-bottom: 20px;

    strong{
      display: inline-block;
      border-bottom: 2px solid #5bb444;
      position: relative;
      top: 1px;
    }
  }
}

</style>
