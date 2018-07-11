<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addEmployeerPop" v-loading="loading">
    <template class="addEmployeerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini">
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobilephone">
          <el-input v-numberOnly v-model="form.mobilephone" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
          <el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip" tabindex="-1">
            <div slot="content">账号可以由字母、数字、中文组成<br/>长度范围2~15个字符</div>
            <el-input v-model.trim="form.username" auto-complete="off" @focus="tooltip = true" @blur="tooltip = false"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password" v-if="!isModify">
          <el-input v-model.trim="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
          <el-input v-model="form.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sexFlag" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" :label-width="formLabelWidth">
          <SelectTree v-model="form.orgid" />
        </el-form-item>
        <el-form-item label="权限角色" :label-width="formLabelWidth">
          <el-select multiple v-model="form.rolesId" placeholder="请选择权限">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" :label-width="formLabelWidth">
          <SelectType v-model="form.departmentId" type="department_type" placeholder="请选择部门" />
          <!-- <el-select v-model="form.departmentId" placeholder="请选择部门">
            <el-option v-for="item in departments" :key="item.id" :label="item.dictName" :value="item.id"></el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div class="info" v-if="!isModify">注：密码默认为：123456。</div>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { validateMobile, REGEX }  from '@/utils/validate'
import { postEmployeer, putEmployeer,  getAuthInfo, getDepartmentInfo } from '../../../api/company/employeeManage'
import popRight from '@/components/PopRight/index'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'

export default {
  components: {
    popRight,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    isModify: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ])
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    }

    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateusername = function (rule, value, callback) {
      if(isvalidUsername(value)){
        callback()
      } else {
        callback(new Error('用户名只能由中文，数字，字母组成'))
      }
    }

    return {
      form: {
        name: '', // 用户姓名
        mobilephone: '', // 手机号码
        username: '', // 登录账户
        password: '123456',
        position: '', // 职位
        sexFlag: '',// 性别
        orgid: '', // 归属网点
        rolesId: [], // 权限角色
        departmentId: '' // 归属部门
      },
      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        mobilephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
        ],
        username: [
          { required: true, message: '请输入有效的登录账号', trigger: 'blur', pattern: REGEX.USERNAME },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' },
        ],
        position: [
          { max: 10,  message: '不能超过10个字符', trigger: 'blur' }
        ]
      },
      popTitle: '新增员工',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false

    }
  },
  mounted () {
    this.form.orgid = this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
      this.form.orgid = newVal
    },
    userInfo () {
      if(this.isModify){
        this.popTitle = '修改员工'
        let data = Object.assign({},this.userInfo)
        for(let i in this.form){
          this.form[i] = this.userInfo[i]
        }
        this.form.rolesId = this.userInfo.rolesIdList === '0' ? '' : this.userInfo.rolesIdList
      } else {
        this.popTitle = '新增员工'
        for(let i in this.form){
          this.form[i] = i === 'password' ? '123456' : i === 'rolesId' ? [] : ''
        }
        this.form.orgid = this.orgid
      }
    }
  },
  methods: {
    initInfo () {
      this.loading = true
      return Promise.all([getAuthInfo(this.otherinfo.companyId), getDepartmentInfo(this.otherinfo.companyId)]).then(resArr => {
        this.loading = false
        this.roles = resArr[0].list
        this.departments = resArr[1]
      }).catch(err => {
        this.loading = false
        this.inited = false
      })
    },
    getOrgid (id) {
      this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = Object.assign({},this.form)
          let promiseObj
          data.rolesId = data.rolesId.join(',')
          // 判断操作，调用对应的函数
          if(this.isModify){
            data.id = this.userInfo.id
            promiseObj = putEmployeer(data)
          } else {
            promiseObj = postEmployeer(data)
          }

          promiseObj.then(res => {
            this.loading = false
            /* this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            }); */
            
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.closeMe()
            this.$emit('success')
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    closeMe (done) {
      this.$refs['ruleForm'].resetFields()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
.addEmployeerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 600px;
  max-width:  600px;

  .popRight-content{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

