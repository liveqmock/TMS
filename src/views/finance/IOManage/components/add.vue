<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addIOManagePop" v-loading="loading">
    <template class="addIOManagePop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="pickup_lrl">


        <div class="iommanage-bottom">
          <el-form-item label="所属网点">
            <SelectTree v-model="form.orgId" />
          </el-form-item>
          <el-form-item label="收支方式" prop="financialWay">
            <SelectType v-model="form.financialWay" type="financial_way_type" placeholder="请选择"  @change="financialWayClick"/>

          </el-form-item>

          <div v-if="bankPay===true">
            <el-form-item label="银行名称" prop="bankName">
              <el-input v-model="form.bankName" auto-complete="off" :disabled="isDbclick" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号">
              <el-input v-model="form.bankAccount" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
            <el-form-item label="开户人">
              <el-input v-model="form.bankAccountName" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="aliPay===true">
            <el-form-item label="支付宝号" >
              <el-input v-model="form.alipayAccount" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="wPay===true">
            <el-form-item label="微信号" >
              <el-input v-model="form.wechatAccount" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <div v-if="casyPay===true">
            <el-form-item label="经手人" >
              <el-input v-model="form.agent" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </div>
          <!--<el-form-item label="微信号" >-->
            <!--<el-input v-model="form.wechatAccount" auto-complete="off" :disabled="isDbclick"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="备注" class="iom_textarea">
            <el-input v-model="form.remark" auto-complete="off" :disabled="isDbclick" type="textarea"></el-input>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">取 消</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>



</template>
<script>
import { REGEX } from '@/utils/validate'
import { postAdd , putUpdate} from '@/api/finance/financefinancialway'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import SelectCity from '@/components/selectCity/index'
import querySelect from '@/components/querySelect/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    querySelect,
    SelectType,
    SelectTree,
    SelectCity
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    //isDbclick
    isModify: {
      type: Boolean,
      default: false
    },
    isDbclick: {
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

    return {
      rules: {
        'financialWay':[
          {required: true,validator: this.validateIsEmpty('收支方式不能为空'), trigger: 'blur'},
        ]
      },
      form: {
        orgId:'',
        financialWay:'',//收支方式
        bankName:'',//银行名称
        bankAccount:'',//银行卡号
        bankAccountName:'',//开户人
        alipayAccount:'',//支付宝号
        wechatAccount:'',//微信号
        remark:'',//
        agent:'',//
      },
      checked: true,
      formLabelWidth: '80px',
      popTitle: '新增收支方式',
      loading: false,
      inited: false,
      bankPay: false,//银行
      aliPay: false,//支付宝
      wPay: false,//微信
      casyPay: false,//现金
      chePay: false,//支票

    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
      this.form.orgId = this.otherinfo.orgid
    }

    // this.fetchGetPickUp()

  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
      this.form.orgId = newVal
      console.log(this.form.financialWay)
    },
    info () {
      if (this.isModify) {
        this.popTitle = '修改收支方式'
        // this.infoData(this.info)
      }
      else if(this.isDbclick) {
        this.popTitle = '查看收支方式'
        // this.infoData(this.info)
      }
      else {
        this.popTitle = '新增收支方式'
        // this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        // this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        // this.form.tmsDriver = this.setObject(this.form.tmsDriver)
        // this.form.tmsCustomer = this.setObject(this.form.tmsCustomer)
        // this.form.tmsTruck.truckUnit = ''
        // this.form.tmsOrderPickup.payMethod = 76
        // this.form.tmsOrderPickup.pickupStatus = 236
      }
    },
    isModify () {
      if (this.isModify) {
        this.popTitle = '修改收支方式'
        console.log(this.info);
        // this.infoData(this.info)
      }
      else if(this.isDbclick) {
        this.popTitle = '查看收支方式'
        // this.infoData(this.info)
      }
      else {
        this.popTitle = '新增收支方式'
        // this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        // this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        // this.form.tmsDriver = this.setObject(this.form.tmsDriver)
        // this.form.tmsCustomer = this.setObject(this.form.tmsCustomer)
        // this.form.tmsTruck.truckUnit = ''
        // this.form.tmsOrderPickup.payMethod = 76
        // this.form.tmsOrderPickup.pickupStatus = 236
      }
    }
  },
  methods: {
    financialWayClick(item){
      if(item === 280){
        this.bankPay = true
        this.aliPay = false
        this.wPay = false
        this.casyPay = false
        this.chePay = false
      }else if(item === 281){
        this.aliPay = true
        this.bankPay = false
        this.wPay = false
        this.casyPay = false
        this.chePay = false
      }
      else if(item === 282){
        this.wPay = true
        this.aliPay = false
        this.bankPay = false
        this.casyPay = false
        this.chePay = false
      }
      else if(item === 283){
        this.casyPay = true
        this.wPay = false
        this.aliPay = false
        this.bankPay = false
        this.chePay = false
      }
      else{
        this.chePay = true
        this.casyPay = false
        this.wPay = false
        this.aliPay = false
        this.bankPay = false
      }

    },
    getTrunkName(trunk){
      if(trunk){
        // this.form.tmsDriver.driverName = trunk.driverName
        // this.form.tmsDriver.driverMobile = trunk.dirverMobile
        // this.form.tmsDriver.driverId = trunk.driverId
        // this.form.tmsTruck.truckId = trunk.truckId
        // this.form.tmsTruck.truckType = trunk.truckType
        // this.form.tmsTruck.truckUnit = trunk.truckUnit
        // this.form.tmsTruck.truckIdNumber = trunk.truckIdNumber

      }

    },
    infoData(item){

    },
    validateIsEmpty (msg = '不能为空！') {
      return (rule, value, callback) => {
        if(!value){
          callback(new Error(msg))
        }else{
          callback()
        }
      }
    },
    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
    },
    // fetchGetPickUp(){
    //   this.loading = true
    //   return fetchGetPickUp().then(data => {
    //     this.pickupBatchNumber = data.data
    //     this.loading = false
    //   })
    // },
    /** 收货人/发货人  tmsCustomer*/
    setSender(item, type){
      type = type ? 'customRece' : 'tmsCustomer'
      if(item){
        this.form[type].customerType = type === 'tmsCustomer' ? 1 : 2
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
        this.form[type].customerId = item.customerId
      }
    },
    selectToCity (item, city) {
      if(item){
        this.form.tmsOrderPickup.toCityCode = item.id
        this.form.tmsOrderPickup.toCityName = item.longAddr
        } else {
      }
    },
    //司机姓名
    getdriverName (item, city) {
      if(item){
        this.form.tmsDriver.driverName = item.driverName
        this.form.tmsDriver.driverMobile = item.driverMobile
        this.form.tmsDriver.driverId = item.id
      } else {
      }
    },
    initInfo () {
      this.loading = false
    },
    submit(){
      console.log('保存并打印')
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = this.form

          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = putUpdate(data)
          } else {
            promiseObj = postAdd(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('success')
                this.closeMe()
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
    reset() {
      this.$refs['ruleForm'].resetFields()
      this.form = ''
      this.form.orgId = this.otherinfo.orgid
    },
    closeMe (done) {
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
  .addIOManagePop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 600px;
    max-width:  600px;
    z-index: 999 !important;//1000左右
    .popRight-content{
      padding: 20px 0px 0;
      box-sizing: border-box;
    }
    .el-form-item{
      .el-form-item__content{
        width: 69%;
      }
    }
    .el-form-item.iom_textarea{
      width: 98%;
      .el-form-item__content{
        width:83%;
      }

    }
  }
  .senderName_lrl{
    .el-autocomplete{
      width: 430px;
    }
  }
    .selectListOption_lrl{
    clear:both;
    span{
      display: inline-block;
      width: 50%;
    }
    .addr{
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }

  .iommanage-bottom .arrive-time .el-form-item__label{
    width: 108px !important;
  }

.pickup-way .el-input__suffix{
  right: 20px;
}
  .pickup_lrl .el-input.is-disabled .el-input__inner,.pickup_lrl .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
    color: #666;
  }
  .pickup_lrl{
    padding-left: 10px;
  }


</style>

