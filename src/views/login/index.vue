<template>
  <div class="login-container">
    <div class="login-wrapper clearfix">
    <div class="container-left">
      <img src="../../assets/login_images/left.png" alt="">
    </div>
    <div class="container-right">
        <div class="logo">
          <img  class="logo-img" src="../../assets/login_images/logo.png" alt="">
        </div>

      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
               class="card-box login-form">
        <h3 class="title">欢迎使用安发物流</h3>

        <!--<div v-if="errInfo">-->
          <!--<span>{{errInfo}}</span>-->
        <!--</div>-->


        <el-form-item prop="accNum">

          <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
          <!--</span>-->

         <el-input name="accNum" type="text" v-model="loginForm.accNum" autoComplete="off" :placeholder="holder.accNum" @focus='accNum()'   clearable >
          <template slot="prepend">公司ID</template>
         </el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input name="username" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.username" autoComplete="off"
                    :placeholder="holder.username" @focus='username()' clearable>
                    <template slot="prepend">用户名</template>
         </el-input>


        </el-form-item>

        <el-form-item prop="password">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off"
                    :placeholder="holder.password" @focus='password()' clearable>
            <template slot="prepend">密　码</template>
          </el-input>
        </el-form-item>

        <el-form-item class="login">
          <el-button class="el-but" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>

        <div class="rember">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <p class="rember-tit" @click="forgetPsw">忘记密码</p>
        </div>
      </el-form>
    </div>
    </div>
    <div class="button-cont">
      <ul>
        <li>广州安发网络科技有限公司</li>
        <li>地址：天河区天河路石牌桥丰兴广场B座1804</li>
        <li>电话 ：020-38856254 </li>
        <li>网址：www.anfanet.com </li>
      </ul>
      <div class="down">
        <img src="../../assets/login_images/code.png" alt="">
        <p>扫描二维码下载app</p>
      </div>
    </div>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的公司ID'))
      } else {
        callback()
      }
    }
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else if (!value.length) {
        callback(new Error('请输入6位数字密码'))
      } else {
        callback()
      }
    }
    return {
      holder: {
        accNum: '公司ID',
        username: '账号',
        password: '密码'
      },
      loading: false,
      checked: false,
      errInfo: false,
      //模拟登陆信息
      loginForm: {
        accNum: '4',
        username: 'fangjian',
        password: '123456'
      },
      loginRules: {
        accNum: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }

    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            // if (!this.loginForm.accNum) {
            //   this.errInfo = true
            //   this.errInfo = '该公司Id不存在'
            // } else if (!this.loginForm.username) {
            //   this.errInfo = true
            //   this.errInfo = '该用户名不存在'
            // } else if (!this.loginForm.password) {
            //   this.errInfo = true
            //   this.errInfo = '输入的密码错误'
            // }
            this.loading = false
            // 获取登录前的页面地址
            // 有可能会出现前一个页面是现在登录账号没有权限访问的？
            const nexturl = this.$route.query.tourl
            this.$router.push({ path: nexturl && nexturl.indexOf('/login') === -1 ? nexturl : '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetPsw() {
      // this.$router.push({ path: '/' })
      // console.log(5555)
    },
    accNum() {
      this.holder = ''
    },
    username() {
      this.holder = ''
    },
    password() {
      this.holder = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";
  @import "../../styles/login-index.css";


</style>
