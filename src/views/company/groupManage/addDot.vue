<template>
  <div class="add-dot" v-loading="loading">
  <pop-right :title='popTitle' :isShow="popVisible" @close="closeMe" class='addEmployeerPop'>
    <template class='addEmployeerPop-content' slot="content">
          <el-form :model="form" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <el-form-item label="网点名称" :label-width="formLabelWidth" prop="orgName">
              <el-input v-model="form.orgName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点类型" :label-width="formLabelWidth">
              <el-select v-model="form.orgType">
                <el-option v-for="item in netWorkType" :key="item.id" :label="item.dictName" :value="item.id"></el-option>
                <!--<el-option label="分拨中心" :value="2"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
              <el-select v-model="form.status" :disabled="isModify ? false : true">
                <!--<el-option v-for="item in netWorkStatus" :key="item.id" :label="item.dictName" :value="item.id"></el-option>-->
                <el-option label="有效" :value="32"></el-option>
                <el-option label="无效" :value="31"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上级网点" :label-width="formLabelWidth">
              <SelectTree v-model="form.parentId" :disabled="isModify" />
            </el-form-item>
            <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-select v-model="form.manageType">
                <!--<el-option v-for="item in manageType" :key="item.id" :label="item.dictName" :value="item.id"></el-option>-->
                <el-option label="自营" :value="3"></el-option>
                <el-option label="加盟" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" v-if="isModify" :label-width="formLabelWidth">
              <el-input :disabled="isModify" :value="form.createTime | parseTime('{y}/{m}/{d}')"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="responsibleName">
              <el-input v-model="form.responsibleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="responsibleTelephone">
              <el-input  v-model="form.responsibleTelephone"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth" prop="city">
              <SelectCity :city="form.city" @change="getCity" />
            </el-form-item>
            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="serviceName">
              <el-input v-model="form.serviceName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input v-model="form.servicePhone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.detailedAddr" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点代码" :label-width="formLabelWidth" prop="networkCode">
              <el-input v-model="form.networkCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="代收款限额" :label-width="formLabelWidth" prop="collectionFee">
              <el-input v-model="form.collectionFee" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="提现基准" :label-width="formLabelWidth" prop="benchmark">
              <el-input v-model="form.benchmark"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="预警额度" :label-width="formLabelWidth" prop="warningQuota">
              <el-input v-model="form.warningQuota" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth" prop="lockMachineQuota">
              <el-input v-model="form.lockMachineQuota" auto-complete="off"></el-input>
            </el-form-item>

            <div class="ad-add-dot" v-if="!isModify">
              <el-checkbox checked :true-label="0" :false-label="1" v-model="form.accountStatus" disabled>开通管理员账号</el-checkbox>
              <p>登录账号：网点名称 密码：123456</p>
            </div>

            <div class="rem-add-dot">
              <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="不可超300字"
                  v-model="form.remarks"
                  auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-form>
      <div class="spanDiv">
        <span>元</span>
        <span>元</span>
        <span v-if="isModify" class="span-hidden">元</span>
        <span v-if="!isModify"  class="span-last">元</span>
      </div>
    </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="closeMe">取 消</el-button>
          </div>
  </pop-right>
  </div>
</template>

<script>
  import { postOrgSaveDate, putOrgData, getNetWorkTypeInfo, getManageTypeInfo, getNetworkStatusInfo } from '../../../api/company/groupManage'
  import popRight from '@/components/PopRight/index'
  import SelectTree from '@/components/selectTree/index'
  import SelectCity from '@/components/selectCity/index'
  import { REGEX } from '../../../utils/validate'

  export default {
    components: {
      popRight,
      SelectTree,
      SelectCity
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      isModify: {
        type: Boolean,
        default: false
      },
      dotInfo: Object,
      orgid: {
        type: Number
      },
      companyId: {
        type: Number
      }
    },
    computed: {
      isShow: {
        get() {
          return this.popVisible
        },
        set() {

        }
      }
    },
    watch: {
      dotInfo(newVal) {
        if (this.isModify) {
          this.form = Object.assign({}, this.dotInfo)
        }
      },
      isModify(newVal) {
        if (newVal) {
          this.popTitle = '修改网点'
          this.form = Object.assign({}, this.dotInfo)
          this.form.parentId = this.dotInfo.parentId || this.companyId
        } else {
          this.popTitle = '新增网点'
          for (const i in this.form) {
            this.form[i] = ''
          }
          if (this.form.id) {
            delete this.form.id
          }
          delete this.form.createTime
          this.form.orgType = 1
          this.form.status = 32
          this.form.manageType = 3
          this.form.parentId = this.dotInfo.parentId || this.companyId
        }
      }
    },
    data() {
      // REGEX
      var orgName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入网点名称'))
        } else {
          callback()
        }
      }
      var callBackName = (rule, value, callback) => {
        callback()
      }
      var collectionFee = (rule, value, callback) => {
        if (!REGEX.ONLY_NUMBER.test(value) && !value === '') {
          return callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }

      var benchmark = (rule, value, callback) => {
        // 暂定
        if (!REGEX.NUM_POINT.test(value) && !REGEX.NUM_PERCENTAGE.test(value) && value !== '') {
          return callback(new Error('请输入百分比和小数点'))
        } else {
          callback()
        }
      }
      var networkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入网点代码'))
        } else {
          callback()
        }
      }
      var remarks = (rule, value, callback) => {
        callback()
      }
      // var city = (rule, value,callback) => {
      //   if (!value) {
      //     return callback(new Error('请选择城市~'));
      //   } else{
      //     callback();
      //   }
      // }
      return {
        popTitle: '新增网点',
        // 多选框
        checked: true,
        loading: false,
        netWorkType: [],
        manageType: [],
        netWorkStatus: [],
        form: {
          orgName: '',
          orgType: 1,
          status: 32,
          responsibleTelephone: '',
          // createTime:'',
          responsibleName: '',
          city: '',
          serviceName: '',
          parentName: '', // 上级网点
          servicePhone: '',
          detailedAddr: '',
          networkCode: '', // 网点代码
          collectionFee: '', // 代收款额度
          benchmark: '',
          warningQuota: '',
          lockMachineQuota: '',
          manageType: 3,
          remarks: '',
          // 默认值
          accountStatus: 0,
          // id: '',
          parentId: 0

        },
        rules: {
          orgName: [
            { required: true, validator: orgName, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 15, message: '不可超过15个字符', trigger: 'blur' }
          ],
          responsibleName: [
            { validator: callBackName, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          responsibleTelephone: [
            { pattern: REGEX.MOBILE, trigger: ['blur', 'change'] }
          ],
          serviceName: [
            { validator: callBackName, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          servicePhone: [
            { pattern: REGEX.TELEPHONE, trigger: ['blur', 'change'] },
            { max: 13, message: '不可超过13个字符', trigger: 'blur' }
          ],
          // 网点代码
          networkCode: [
            { required: true, validator: networkCode, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          city: [
            { required: true, trigger: 'blur' }
          ],
          collectionFee: [
            { validator: collectionFee, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 9, message: '不可超过9个字符', trigger: 'blur' }
          ],
          benchmark: [
            { validator: benchmark, trigger: 'blur' }
          ],
          warningQuota: [
            { validator: collectionFee, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 9, message: '不可超过9个字符', trigger: 'blur' }
          ],
          lockMachineQuota: [
            { validator: collectionFee, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 9, message: '不可超过9个字符', trigger: 'blur' }
          ],
          remarks: [
            { validator: remarks, trigger: 'blur' },
            { min: 2, message: '最少2个字符', trigger: 'blur' },
            { max: 300, message: '不可超过300个字符', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        formLabelWidth: '120px'
      }
    },
    mounted() {
      // this.form.parentId = this.isModify ? this.companyId : (this.form.id || this.orgid)
      this.form.parentId = this.orgid || this.companyId
      Promise.all([getNetWorkTypeInfo(this.form.parentId), getManageTypeInfo(this.form.parentId), getNetworkStatusInfo(this.form.parentId)]).then(resArr => {
        this.loading = false
        this.netWorkType = resArr[0]
        this.manageType = resArr[1]
        this.netWorkStatus = resArr[2]
      })
    },
    methods: {
      getCity(city) {
        this.form.city = city ? city.longAddr : city
      },
      getOrgid(id) {
        this.form.parentId = id
      },
      reset() {
        this.$refs['ruleForm'].resetFields()
      },
      closeMe(done) {
        this.$emit('close')
        this.reset()
        if (typeof done === 'function') {
          done()
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            let reqPromise
            if (this.isModify) {
              // 当修改最上级网点时，传0
              if (this.form.id === this.form.parentId && this.form.parentId === this.otherinfo.companyId) {
                this.form.parentId = 0
              }
              reqPromise = putOrgData(this.form)
            } else {
              if (this.form.accountStatus === true) {
                this.form.accountStatus = 0
              } else {
                this.form.accountStatus = 1
              }
              reqPromise = postOrgSaveDate(this.form)
            }
            reqPromise.then(res => {
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.closeMe()
                  this.$emit('success')
                }
              })
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./addDot.css";
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

