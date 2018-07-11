<template>
<el-dialog class="passwordPop" title="修改密码" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe">
  <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
    <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
      <el-input disabled v-model="form.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="原始密码" :label-width="formLabelWidth" prop="origin_pwd">
      <el-input type="password" v-model="form.origin_pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" :label-width="formLabelWidth" prop="pwd">
      <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="re_pwd">
      <el-input type="password" v-model="form.re_pwd" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { putChangeMyPassword } from '../../../api/company/myinfo'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  mounted () {
    this.form.username = this.otherinfo.username
    this.form.id = this.otherinfo.id
  },
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: 0,
        username: '',
        origin_pwd: '',
        pwd: '',
        re_pwd: '',
        errorTip: ''
      },
      formLabelWidth: '100px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        origin_pwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.form
          putChangeMyPassword({
            "username": form.username,
            "id": form.id,
            "password": form.origin_pwd,
            "newPassword": form.pwd,
            "affirmNewPassword": form.re_pwd
          }).then( res => {
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
              }
            })
          }).catch( res => {
            this.$alert(res.data.errorInfo, '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeMe (done) {
      this.resetForm('ruleForm')
      this.$emit('update:isShow', false)
      if(typeof done === 'function'){
        done()
      }
    }
  }
}
</script>

<style lang="scss">
  .passwordPop .el-dialog{
    min-width: 300px;
    max-width: 600px;
  }
</style>
