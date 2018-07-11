<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCarrierPop" v-loading="loading">
    <template class="addCarrierPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <el-form-item label="归属网点" prop="orgid">
          <SelectTree v-model="form.orgid" />
        </el-form-item>
        <el-form-item label="承运商编码" prop="carrierSn">
          <el-input v-model="form.carrierSn" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="承运商" prop="carrierName">
          <el-input v-model="form.carrierName" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="承运商电话" prop="carrierMobile">
          <el-input v-numberOnly v-model="form.carrierMobile" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="liableName">
          <el-input v-model="form.liableName" maxlength="25" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人手机" prop="liablePhone">
          <el-input v-numberOnly v-model="form.liablePhone" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同起始日" prop="contractStarttime">
          <el-date-picker
            v-model="form.contractStarttime"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            :picker-options="pickOption"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同终止日" prop="contractEndtime">
          <el-date-picker
            v-model="form.contractEndtime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客服电话" prop="customerServicePhone">
          <el-input v-numberOnly maxlength="11" v-model="form.customerServicePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="carrierAddr">
          <el-input v-model="form.carrierAddr" maxlength="50" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="carrierRemarks" label="备注" prop="carrierRemarks">
          <el-input type="textarea" maxlength="125" v-model="form.carrierRemarks"></el-input>
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
import { postCarrier, putCarrier } from '@/api/company/carrierManage'
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
        "carrierAddr": "", // 地址 50
        // "carrierId": 0, // 承运商ID 11
        "carrierMobile": "", // 承运商电话 11
        "carrierName": "", // 承运商 10
        "carrierRemarks": "", // 备注 125
        "carrierSn": "", // 承运商编号 15
        "contractEndtime": "", // 合同终止日
        "contractStarttime": "", // 合同起始日
        "customerServicePhone": "", // 客服电话 11
        "liableName": "", // 负责人 25
        "liablePhone": "", // 负责人电话 11
        "orgid": 0 // 所属机构 11
      },
      formLabelWidth: '100px',
      tooltip: false,
      rules: {
        carrierName: [
          { required: true, message: '请输入承运商名称', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        carrierMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
        ],
        liablePhone: [
          { message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          //{ validator: validateFormNumber, trigger: 'change'}
        ]
      },
      popTitle: '新增承运商',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,
      pickOption: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.contractEndtime ? time.getTime() > _this.form.contractEndtime : false
        }
      },
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.contractStarttime ? time.getTime() < _this.form.contractStarttime : false
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
        this.popTitle = '修改承运商'
        let data = Object.assign({},this.info)
        for(let i in this.form){
          this.form[i] = data[i]
        }
        this.form.carrierId = data.carrierId
      } else {
        this.popTitle = '新增承运商'
        for(let i in this.form){
          this.form[i] = ''
        }
        delete this.form.carrierId
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
            promiseObj = putCarrier(data)
          } else {
            promiseObj = postCarrier(data)
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
.addCarrierPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 600px;
  max-width:  600px;

  .el-form--inline .el-form-item{
    margin-right: 0;
    width: 50%;
    float: left;
    display: flex;
  }

  .el-form--inline .carrierRemarks{
    width: 100%;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }

  .el-form-item__content{
    flex:1;
  }

  .select-tree{
    width: 100%;
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

