<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addDriverPop" v-loading="loading">
    <template class="addDriverPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <el-form-item label="司机姓名" prop="driverName">
          <el-input v-model="form.driverName" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="driverMobile">
          <el-input v-numberOnly v-model="form.driverMobile" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="归属网点" prop="orgid">
          <SelectTree v-model="form.orgid" />
        </el-form-item>
        <el-form-item label="身份证号" prop="driverCardid">
          <el-input v-model="form.driverCardid" maxlength="18" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="驾驶证类型" prop="licenseType">
          <SelectType v-model="form.licenseType" type="driving_type" placeholder="驾驶证类型" />
        </el-form-item>
        <el-form-item label="驾驶证有效期" prop="validityDate">
          <el-date-picker
            v-model="form.validityDate"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCardNumber">
          <el-input v-model="form.bankCardNumber" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="openBank">
          <el-input maxlength="20" v-model="form.openBank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="司机地址" prop="driverAddress">
          <el-input v-model="form.driverAddress" maxlength="50" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="driverRemarks" label="备注" prop="driverRemarks">
          <el-input type="textarea" maxlength="125" v-model="form.driverRemarks"></el-input>
        </el-form-item>
        <!-- 个人信息 -->
        <el-form-item class="clearfix uploadcard">
          <div class="idcard">
            <upload :title="'身份证'" v-model="form.idcardPicture" />
          </div>
          <div class="drviercard">
            <upload :title="'驾驶证'" v-model="form.drivingPicture" />
          </div>
          <div class="certcard">
            <upload title="从业资格证" v-model="form.certification" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX }  from '@/utils/validate'
import { postDriver, putDriver } from '@/api/company/driverManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
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
    info: {
      type: Object,
      default: () => {}
    },
    licenseTypes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ])
  },
  data () {
    const _this = this
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
      if(REGEX.MOBILE.test(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormNumber = function (rule, value, callback) {
      console.log('rule:', rule)
      _this.form[rule.field] = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      form: {
        "bankCardNumber": "", // 银行卡号 20
        "bankName": "", // 银行名称 20
        "certification": "", // 从业资格证图片地址 125
        "driverAddress": "", // 地址 50
        "driverCardid": "", // 身份证号码 18
        "driverMobile": "", // 手机号码 11
        "driverName": "", // 司机姓名 10
        "driverRemarks": "", // 备注 125
        "drivingPicture": "", // 驾驶证图片地址 125
        // "id": 0, // 司机ID 11
        "idcardPicture": "", // 身份证图片地址 125
        "licenseType": '', // 驾驶证类型 18
        "licenseTypeName": "",
        "openBank": "", // 开户行 20
        "validityDate": "", // 驾驶证有效期
        "orgid": 0 // 所属机构 11
      },
      formLabelWidth: '100px',
      tooltip: false,
      rules: {
        driverName: [
          { required: true, message: '请输入司机名称', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        driverMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          // { validator: validateFormNumber, trigger: 'change'}
        ]
      },
      popTitle: '新增司机',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,

      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }

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
    info () {
      if(this.isModify){
        this.popTitle = '修改司机'
        let data = Object.assign({},this.info)
        for(let i in this.form){
          this.form[i] = data[i]
        }
        this.form.id = data.id
      } else {
        this.popTitle = '新增司机'
        for(let i in this.form){
          this.form[i] = ''
        }
        delete this.form.id
        this.form.orgid = this.orgid
      }
    }
  },
  methods: {
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = Object.assign({},this.form)
          data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = putDriver(data)
          } else {
            promiseObj = postDriver(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            });
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    reset () {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe (done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
.addDriverPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 560px;
  max-width:  560px;

  .el-form--inline .el-form-item{
    margin-right: 0;
    width: 50%;
    float: left;
    display: flex;
  }

  .el-form--inline .uploadcard{
    width: 100%;
  }

  .el-form--inline .driverRemarks{
    width: 100%;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }

  .el-form-item__label{
    font-size: 12px;
  }

  .el-form-item__content{
    flex:1;
  }

  .select-tree{
    width: 100%;
  }

  .drviercard,.certcard,.idcard{
    float: left;
    width: 254px;
    height: 136px;
    margin-bottom: 14px;
  }

  .upload-container{
    height: 100%;
  }

  .drviercard{
    float: right;
  }

  .licensePicture{
    height: 116px;
    line-height: 1.2;
  }

  .popRight-content{
    padding: 20px 10px 0;
    box-sizing: border-box;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

