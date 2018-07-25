<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addOrderManagePop" v-loading="loading">
    <template class="addOrderManagePop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <el-form-item  v-if="!isModify" class="clearfix">
          <div class="selectType" :class="{checked: form.companyType === 2}" @click.stop="form.companyType=2">
            <span class="icon"><icon-svg icon-class="qiye" /></span>
             <strong>企业</strong>
            <p>有合法营业执照等企业</p>
          </div>
          <div class="selectType single" :class="{checked: form.companyType === 1}" @click.stop="form.companyType=1">
            <span class="icon"><icon-svg icon-class="geren" /></span> <strong>个人</strong>
            <p>具备有效身份的自然人</p>
          </div>
        </el-form-item>
        <!-- 公司信息 -->
        <template v-if="form.companyType === 2">
          <div class="info info-require">公司名称</div>
          <el-form-item prop="companyName">
            <el-input v-model="form.companyName" maxlength="25" placeholder="公司全称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item >
            <upload class="licensePicture" tip="（有年检章，jpg/png。小于5M）" v-model="form.licensePicture" />
          </el-form-item>
          <div class="info" >公司法人信息</div>
          <el-form-item prop="legalPersonname" >
            <el-input v-model.trim="form.legalPersonname" maxlength="25" placeholder="公司法人名称" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <!-- 个人信息 -->
        <el-form-item class="clearfix">
          <div class="idcard-pos">
            <upload :title="form.companyType === 1 ? '自然人身份证正面' : '法人身份证正面'" v-model="form.idCardPositive" />
          </div>
          <div class="idcard-ver">
            <upload :title="form.companyType === 1 ? '自然人身份证反面' : '法人身份证反面'" v-model="form.idCardVerso" />
          </div>
        </el-form-item>

        <div class="info">{{ issender ? '发' : '收'}}货信息</div>
        <el-form-item :label="(issender ? '发' : '收')+'货方'" prop="customerUnit">
          <el-input v-model="form.customerUnit" maxlength="25" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="customerName">
          <el-input v-model="form.customerName" maxlength="25" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="customerMobile">
          <el-input v-numberOnly v-model="form.customerMobile" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="customerPhone" prop="customerPhone">
          <el-input v-numberOnly v-model="phoneshort" class="phoneshort" maxlength="4" auto-complete="off"></el-input> - <el-input class="phonelong" v-numberOnly v-model="phonelong" maxlength="8" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="归属网点" prop="orgid">
          <SelectTree v-model="form.orgid" />
        </el-form-item>
        <el-form-item label="客户VIP号" prop="vipNum">
          <el-input v-model="form.vipNum" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="form.idcard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="openBank">
          <el-input v-model="form.openBank" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCardNumber">
          <el-input v-model="form.bankCardNumber" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" placeholder="最多输入50个字符" maxlength="50" auto-complete="off"></el-input>
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
import { REGEX } from '@/utils/validate'
import { postCustomer, putCustomer } from '@/api/company/customerManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    SelectTree
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
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    ...mapGetters([
        'otherinfo'
      ]),
    'fixPhone': {
        get() {
          return this.phoneshort + '-' + this.phonelong
        },
        set(val) {
          // let names = val.match(/(.*)(.{7})$/)
          const names = val ?　val.split('-')　: ''
          if (names) {
            this.phoneshort = names[1] ? names[0] : ''
            this.phonelong = names[1] ? names[1] : names[0]
          } else {
            this.phoneshort = ''
            this.phonelong = ''
          }
        }
      }
  },
  data() {
    const _this = this
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }

    const validateFormMobile = function(rule, value, callback) {
      if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormNumber = function(rule, value, callback) {
      _this.form.customerMobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      phoneshort: '', // 固话区号
      phonelong: '', // 固话号码
      // fixPhone: '',
      form: {
        'bankCardNumber': '', // "银行卡号" 20
        'bankName': '', // "银行名称", 20
        'companyName': '', // "公司名称", 25
        'companyType': 2, // 公司类型 1：自然人 2：企业
        // "customerId": 0, // 当新增时，不传
        'customerMobile': '', // 手机号码 11
        'customerName': '', // 客户名称 25
        // "customerNum": "", // 客户编号 25
        'customerType': this.issender ? 1 : 2, // 客户类型 1:发货人2:收货人
        'customerUnit': '', // 客户单位 50
        'detailedAddress': '', // 详细地址 50
        'fixPhone': '', // 固话 11
        'idCardPositive': '', // 身份证正面图片地址
        'idCardVerso': '', // 身份证反面图片地址
        'idcard': '', // 身份证号码 18
        'legalPersonname': '', // 公司法人 25
        'licensePicture': '', // 营业执照图片地址
        'openBank': '', // 开户行 20
        'orgid': 0, // 所属机构ID
        'vipNum': '' // VIP号 11
      },
      formLabelWidth: '90px',
      tooltip: false,
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        customerMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
         // { validator: validateFormNumber, trigger: 'change'}
        ],
        customerName: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { max: 30, message: '不能超过30个字符', trigger: 'blur' }
        ]
      },
      popTitle: '新增发货人',
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
  mounted() {
    this.form.orgid = this.orgid
    if (!this.inited) {
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    info() {
      if (this.isModify) {
        this.popTitle = '修改' + (this.issender ? '发' : '收') + '货人'
        const data = Object.assign({}, this.info)
        for (const i in this.form) {
          this.form[i] = data[i]
        }
        this.form.customerId = data.customerId
        console.log('this.fixphone', this.fixPhone, this.form.fixPhone, data)
        this.fixPhone = this.form.fixPhone
      } else {
        this.popTitle = '新增' + (this.issender ? '发' : '收') + '货人'
        for (const i in this.form) {
          this.form[i] = ''
        }
        delete this.form.customerId
        this.form.companyType = 2 // 重置为选中公司
        this.form.customerType = this.issender ? 1 : 2 // 重置为发货人
        this.form.orgid = this.orgid
        this.fixPhone = ''
      }
    }
  },
  methods: {
    initInfo() {
      this.loading = false
    },
    getOrgid(id) {
      this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.form)
          data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            promiseObj = putCustomer(data)
          } else {
            promiseObj = postCustomer(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            })
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
      this.form.licensePicture = ''
      this.form.idCardPositive = ''
      this.form.idCardVerso = ''
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    }
  }
}
</script>
<style lang="scss">
.addOrderManagePop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 546px;
  max-width:  546px;

  .el-form--inline .el-form-item{
    margin-right: 0;
    width: 100%;
    display: flex;
  }

  .el-form-item__content{
    flex:1;
  }

  .select-tree{
    width: 100%;
  }

  .customerPhone .el-form-item__content{
    display: flex;
  }
  .phoneshort{
    width: 78px;
  }
  .phonelong{
    flex:1;
  }

  .licensePicture{
    height: 116px;
    line-height: 1.2;
  }

  .popRight-content{
    padding: 20px 24px 0;
    box-sizing: border-box;
  }

  .selectType{
    width: 234px;
    height: 118px;
    padding-top: 32px;
    border-radius: 4px;
    border: solid 1px #d2d2d2;
    float: left;
    text-align: center;
    color: #666;
    cursor: pointer;
    position: relative;
    overflow: hidden;


    &.checked{
      border-color: #05e2ea;
      &::before,&::after{
        position: absolute;
        top: 0;
        right: 0;
        content: '';
      }
      &::after{
        border: #05e2ea 12px solid;
        border-color: #05e2ea #05e2ea  transparent transparent;
      }
      &::before{
        width: 18px;
        height: 20px;
        z-index: 2;
        content: "\E611";
        font-family: element-icons!important;
        speak: none;
        font-variant: normal;
        text-transform: none;
        font-weight: bold;
        line-height: 1;
        vertical-align: baseline;
        -webkit-font-smoothing: antialiased;
        color: #fff;
      }
    }

    .icon{
      display: inline-block;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #456bf7;
      color: #fff;
      line-height: 34px;
    }

    &.single{
      float: right;
    }

    &.single .icon{
      background-color: #15e2e9;
    }

    .svg-icon{
      font-size: 25px;
      vertical-align: middle;
    }
    strong{
      font-size: 24px;
      line-height: 34px;
    }
    p{
      font-size: 13px;
    }
  }

  .idcard-pos,.idcard-ver{
    width: 234px;
    height: 136px;
    float: left;
    line-height: 1.2;

    .upload-container{
      height: 100%;
    }
  }
  .idcard-ver{
    float: right;
  }

  .el-select .el-input__inner{
    padding-right: 15px;
  }
}
</style>

