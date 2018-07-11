<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="pickup_lrl">

        <div class="pickUp-top">
          <el-form-item label="提货批次" prop="customerUnit">
            <el-input v-model="pickupBatchNumber" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="发货人" prop="" class="senderName_lrl">
            <querySelect search="customerName" type="sender" valuekey="customerName" v-model="form.tmsCustomer.customerName" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="手机号" prop="tmsCustomer.customerMobile" class="senderName_lrl">
            <querySelect search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.tmsCustomer.customerMobile" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="提货地址" prop="tmsCustomer.detailedAddress" class="senderName_lrl">

            <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.tmsCustomer.detailedAddress" @change="setSender" :disabled="isDbclick"/>
          </el-form-item>
        </div>
        <div class="pickUp-order">
          <el-form-item label="货品名" prop="tmsOrderPickup.pickupName">
            <querySelect search="value" valuekey="value" :maxlength="8" type="cargoName" :remote="true" v-model="form.tmsOrderPickup.pickupName" :disabled="isDbclick"  />

          </el-form-item>
          <el-form-item label="件数" prop="tmsOrderPickup.pickupAmount">
            <el-input v-model="form.tmsOrderPickup.pickupAmount" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="tmsOrderPickup.pickupVolume">
            <el-input v-model="form.tmsOrderPickup.pickupVolume" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="tmsOrderPickup.pickupWeight">
            <el-input v-model="form.tmsOrderPickup.pickupWeight" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="tmsOrderPickup.carriage">
            <el-input v-model="form.tmsOrderPickup.carriage" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="付款方式" >
            <SelectType v-model="form.tmsOrderPickup.payMethod" type="ship_pay_way"  class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="到达城市" class="order_toCityCode">
            <querySelect @change="selectToCity" search="longAddr" type="city"  v-model="form.tmsOrderPickup.toCityName" :remote="true" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="备注" prop="tmsOrderPickup.remark" class="order_remark">
            <el-input v-model="form.tmsOrderPickup.remark" type="textarea" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
        </div>
        <div class="pickUp-bottom">
          <el-form-item label="车费" prop="tmsOrderPickup.truckFee">
            <el-input v-model="form.tmsOrderPickup.truckFee"  auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="代收费用" prop="tmsOrderPickup.collectionFee">
            <el-input v-model="form.tmsOrderPickup.collectionFee" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="tmsDriver.truckIdNumber">
            <querySelect search="truckIdNumber" valuekey="truckIdNumber" type="trunk" @change="getTrunkName"  v-model="form.tmsTruck.truckIdNumber" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="司机姓名" prop="tmsDriver.driverName">
            <querySelect search="driverName" valuekey="driverName" type="driver" @change="getdriverName" :remote="true" v-model="form.tmsDriver.driverName" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="车辆类型">
            <SelectType v-model="form.tmsTruck.truckType" type="truck_type" placeholder="请选择" class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="司机手机" prop="tmsDriver.driverMobile">
            <el-input v-model="form.tmsDriver.driverMobile" auto-complete="off" :disabled="isDbclick"></el-input>
            <!--<querySelect search="driverMobile" type="driver"  @change="getdriverMobile" :remote="true" v-model="form.tmsDriver.driverMobile" />-->
          </el-form-item>
          <el-form-item label="车辆单位" prop="tmsTruck.truckUnit">
            <el-input v-model="form.tmsTruck.truckUnit" auto-complete="off" :disabled="isDbclick"></el-input>
          </el-form-item>
          <el-form-item label="提货状态" prop="tmsOrderPickup.pickupStatus">
            <SelectType v-model="form.tmsOrderPickup.pickupStatus" type="pickup_status" placeholder="请选择" class="pickup-way" :disabled="isDbclick"/>
          </el-form-item>
          <el-form-item label="出车时间" class="customerunit">
              <el-date-picker
                v-model="form.tmsOrderPickup.outTime"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :picker-options="pickOption"
                :disabled="isDbclick"
              >
              </el-date-picker>
          </el-form-item>
          <el-form-item label="要求到达时间" class="arrive-time" prop="tmsOrderPickup.arriveTime">
            <el-date-picker
              v-model="form.tmsOrderPickup.arriveTime"
              align="right"
              type="date"
              :picker-options="pickOption2"
              placeholder="选择日期"
              value-format="timestamp"
              :disabled="isDbclick"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class='checked'>
            <el-checkbox v-model="checked" disabled>发送短信给司机</el-checkbox>
          </el-form-item>

        </div>

      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">取 消</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button @click="submit">保存并打印</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>



</template>
<script>
import { REGEX } from '@/utils/validate'
import { fetchGetPickUp , putUpdatePickup , postAddPickup} from '@/api/operation/pickup'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
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
    const _this = this
    const validatePickupNum = function (rule, value, callback) {
      if(REGEX.ONLY_NUMBER.test(value) || !value){
        callback()
      }
      else {
        callback(new Error('只能输入数字'))
      }
    }
    const validateMobile = (rule, value, callback) => {
      if(REGEX.MOBILE.test(value) || !value){
        callback()
      }
      else if(this.isDbclick){
        callback()
      }
      else {
        callback(new Error('请输入正确的手机号码~'))
      }
    }

    return {
      rules: {
        'tmsOrderPickup.pickupName':[
          {required: true,validator: this.validateIsEmpty('货品名不能为空'), trigger: 'blur'},
          //{max: 8, message: '货品名最多可输入8个字符', trigger:'blur'}
        ],
        'tmsOrderPickup.pickupAmount': [
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '件数最多可输入8个字符', trigger: 'blur' }
          // { min: 2, max: 8, message: '件数最多可输入8位数', trigger: 'blur' }
        ],
        'tmsOrderPickup.pickupVolume':[
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '体积最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.pickupWeight':[
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '重量最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.carriage': [
          { validator:validatePickupNum,mtrigger: 'blur' },
          { max: 8, message: '运费最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.remark':[
          { max: 300, message: '备注最多可输入300个字符', trigger: 'blur' }
        ],
        'tmsOrderPickup.truckFee': [
          { validator:validatePickupNum, trigger: 'blur' },
        ],
        'tmsOrderPickup.collectionFee': [
          { validator:validatePickupNum, trigger: 'blur' },
          { max: 8, message: '代收费用最多可输入8个字符', trigger: 'blur' }
        ],
        'tmsDriver.truckIdNumber':[
          { max: 8, message: '车牌号最多可输入8个字符'},
         // {validator: this.validateIsEmpty('车牌号不能为空')},
        ],
        'tmsDriver.driverName':[
          { max: 8, message: '司机姓名最多可输入8个字符', trigger: 'blur' },
          {required: true,validator: this.validateIsEmpty('司机姓名不能为空'), trigger: ['change','blur']},
        ],
        'tmsDriver.driverMobile': [
          { validator: validateMobile, trigger: 'change' }
        ],
        'tmsTruck.truckUnit':[
          { max: 18, message: '车辆单位最多可输入18个字符', trigger: 'blur' }
        ],
        "tmsOrderPickup.arriveTime": [
          {required: true,validator: this.validateIsEmpty('要求到达时间不能为空'), trigger: ['blur']}
        ],
        "tmsCustomer.customerMobile": [
          {required: true,validator: this.validateIsEmpty('发货人手机号不能为空'), trigger: ['blur']}
        ],
        "tmsCustomer.detailedAddress": [
          {required: true,validator: this.validateIsEmpty('提货地址不能为空'), trigger: ['blur']}
        ],
      },
      pickOption: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
      },
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
        }
      },
      form: {
        tmsCustomer:{
          customerName:'',
          customerMobile:'',
          detailedAddress:'',
          customerId:''
        },
        tmsDriver:{
          driverName:'',//司机姓名
          driverMobile:'',//司机手机 /
          driverId:''
          //  发送短信给司机
        },
        tmsTruck:{
          truckIdNumber:'', //车牌号 /
          truckType:'',//车辆类型
          truckUnit:'',//车辆单位
          truckId:''
        },
        tmsOrderPickup:{
          pickupBatchNumber:'',//提货批次
          pickupName:'',//货品名
          pickupAmount:'',//件数
          pickupVolume:'',// 体积
          pickupWeight:'',// 重量
          carriage:'',// 运费
          payMethod:76,// 付款方式
          toCityCode:'',// 到达城市
          toCityName:'',// 到达城市
          remark:'',
          truckFee:'',//车费
          pickupStatus:236,//提货状态
          collectionFee:'',// 代收费用
          outTime:'',//出车时间
          arriveTime:''//
        }
      },
      checked: true,
      formLabelWidth: '80px',
      popTitle: '提货派车单',
      loading: false,
      inited: false,
      pickupBatchNumber:'',
// 用来在提交
      sender: {},
    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }

    this.fetchGetPickUp()
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    info () {
      if (this.isModify) {
        this.popTitle = '修改派车单'
        this.infoData(this.info)
      }
      else if(this.isDbclick) {
        this.popTitle = '查看派车单'
        this.infoData(this.info)
      }
      else {
        this.popTitle = '提货派车单'
        this.form.tmsOrderPickup = this.setObject(this.form.tmsOrderPickup)
        this.form.tmsTruck = this.setObject(this.form.tmsTruck)
        this.form.tmsDriver = this.setObject(this.form.tmsDriver)
        this.form.tmsCustomer = this.setObject(this.form.tmsCustomer)
        this.form.tmsTruck.truckUnit = ''
        this.form.tmsOrderPickup.payMethod = 76
        this.form.tmsOrderPickup.pickupStatus = 236
      }
    }
  },
  methods: {
    getTrunkName(trunk){
      if(trunk){
        this.form.tmsDriver.driverName = trunk.driverName
        this.form.tmsDriver.driverMobile = trunk.dirverMobile
        this.form.tmsDriver.driverId = trunk.driverId
        this.form.tmsTruck.truckId = trunk.truckId
        this.form.tmsTruck.truckType = trunk.truckType
        this.form.tmsTruck.truckUnit = trunk.truckUnit
        this.form.tmsTruck.truckIdNumber = trunk.truckIdNumber

      }
    },
    infoData(item){
      this.form.tmsOrderPickup.pickupName = item.pickupName
      this.form.tmsOrderPickup.pickupAmount = item.pickupAmount
      this.form.tmsOrderPickup.pickupWeight = item.pickupWeight
      this.form.tmsOrderPickup.carriage = item.carriage
      this.form.tmsOrderPickup.collectionFee = item.collectionFee
      this.form.tmsOrderPickup.payMethod = item.payMethod
      this.form.tmsOrderPickup.pickupStatus = item.pickupStatus
      this.form.tmsOrderPickup.remark = item.remark
      this.form.tmsOrderPickup.arriveTime = item.arriveTime
      this.form.tmsOrderPickup.outTime = item.outTime
      this.form.tmsOrderPickup.toCityName = item.toCityName
      this.form.tmsOrderPickup.id = item.id

      this.form.tmsTruck.truckIdNumber = item.truckIdNumber
      this.form.tmsTruck.truckType = item.truckType
      this.form.tmsTruck.truckUnit = item.truckUnit

      this.form.tmsDriver.driverName = item.driverName
      this.form.tmsDriver.driverMobile = item.driverMobile

      this.form.tmsCustomer.customerName = item.customerName
      this.form.tmsCustomer.customerMobile = item.customerMobile
      this.form.tmsCustomer.detailedAddress = item.detailedAddress

      this.pickupBatchNumber = item.pickupBatchNumber
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
    fetchGetPickUp(){
      this.loading = true
      return fetchGetPickUp().then(data => {
        this.pickupBatchNumber = data.data
        this.loading = false
      })
    },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.tmsOrderPickup.pickupBatchNumber = this.pickupBatchNumber
          let data = this.form

          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = putUpdatePickup(data)
          } else {
            let changeSender = false
            for(let i in data.tmsCustomer){
              if(this.sender[i] !== data.tmsCustomer[i]){
                changeSender = true
              }
            }
            if(changeSender){
              data.tmsCustomer.customerId = ''
            }else {
              data.tmsCustomer.customerId = this.form.tmsCustomer.customerId
            }
            promiseObj = postAddPickup(data)
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
      this.form.tmsCustomer = ''
      this.form.tmsDriver = ''
      this.form.tmsTruck = ''
      this.form.tmsOrderPickup = ''
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
  .addCustomerPop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 580px;
    max-width:  580px;
    .popRight-content{
      padding: 20px 0px 0;
      box-sizing: border-box;
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
   .pickUp-order,.pickUp-bottom{
     padding-top: 10px;
     border-top: 1px solid #e4e7ed;
     .order_toCityCode {
       margin-right: 35px !important;
     }
     .order_remark {
       .el-form-item__content{
         width: 430px;
       }
     }
     .el-form-item--mini{
       .el-input__inner{
         width: 90%;
       }
     }
     .customer-unit{
       width: 80%;
     }


     .checked{
       display: block;
       .el-form-item__content{
         padding-left: 14px;
       }
     }
   }
  .pickUp-bottom .arrive-time .el-form-item__label{
    width: 108px !important;
  }
  .pickUp-top .el-input.is-disabled .el-input__inner{
    background-color: transparent;
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

