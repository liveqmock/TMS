<template>
  <pop-right :title="popTitle +  orderSn" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" label-position="right" size="mini" class="manage-add manage-add_lrl" label-width="100px">
        <div class="info_order clearfloat">发货人信息</div>
        <div class="info_send clearfloat">
          <ul>
            <li><el-form-item label="发货方:">
              <querySelect search="customerUnit" type="sender" valuekey="companyName" v-model="form.customSend.customerUnit" @change="setSender" :disabled="isDbclick" />
            </el-form-item></li>
            <li> <el-form-item label="发货人:" prop="customSend.customerName">
              <querySelect search="customerName" type="sender" valuekey="customerName" v-model="form.customSend.customerName" @change="setSender" :disabled="isDbclick"/>

            </el-form-item></li>
            <li ><el-form-item label="联系号码:" prop="customSend.customerMobile">
              <querySelect search="customerMobile" type="sender" valuekey="customerMobile" v-model="form.customSend.customerMobile" @change="setSender" :disabled="isDbclick"/>
            </el-form-item></li>
            <li>
              <el-form-item label="发货地址:" >
                <querySelect search="detailedAddress" type="sender" valuekey="detailedAddress" v-model="form.customSend.detailedAddress" @change="setSender" class="send_detailedAddress" :disabled="isDbclick"/>
              </el-form-item>
            </li>
          </ul>
        </div>
        <div class="info_order clearfloat">收货人信息</div>
        <div class="info_send clearfloat">
          <ul>
            <li class="marginTop_10"><el-form-item label="收货方:">
              <querySelect search="customerUnit" type="receiver" valuekey="customerUnit" v-model="form.customRece.customerUnit" @change="setReceiver" :disabled="isDbclick"/>
            </el-form-item></li>
            <li class="marginTop_10"><el-form-item label="收货人:" prop="customRece.customerName">
              <querySelect search="customerName" type="receiver" valuekey="customerName" v-model="form.customRece.customerName" @change="setReceiver" :disabled="isDbclick"/>
            </el-form-item></li>
            <li class="marginTop_10"><el-form-item label="联系号码:" prop="customRece.customerMobile">
              <querySelect search="customerMobile" type="receiver" valuekey="customerMobile" v-model="form.customRece.customerMobile" @change="setReceiver" :disabled="isDbclick"/>
            </el-form-item></li>
            <li>
              <el-form-item label="收货地址:">
                <querySelect search="detailedAddress" type="receiver" valuekey="detailedAddress" v-model="form.customRece.detailedAddress" @change="setReceiver" :disabled="isDbclick"/>
              </el-form-item>
            </li>
          </ul>
        </div>

        <div class="info_order" >货物信息</div>
        <div class="info_table">
            <ul>
              <li>
                <p><i>*</i> 货品名</p>
                <el-form-item prop="tmsOrderCargoList.cargoName" >
                  <querySelect size="mini" search="value" type="cargoName" valuekey="value" v-model="form.tmsOrderCargoList.cargoName" :disabled="isDbclick"/>
                </el-form-item>
              </li>
              <li>
                <p><i>*</i> 件数</p>
                <el-form-item prop="tmsOrderCargoList.cargoAmount">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.cargoAmount" :disabled="isDbclick"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>重量</p>
                <el-form-item prop="tmsOrderCargoList.weightFee">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.weightFee" :disabled="isDbclick"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>体积</p>
                <el-form-item prop="tmsOrderCargoList.volumeFee">
                  <el-input maxlength="10" v-model="form.tmsOrderCargoList.volumeFee" :disabled="isDbclick"></el-input>
                </el-form-item>
              </li>
              <li>
                <p>包装</p>
                <el-form-item prop="nowpayCarriage">
                  <querySelect size="mini" search="value" type="cargoPack" valuekey="value" v-model="form.tmsOrderCargoList.cargoPack" :disabled="isDbclick"/>
                </el-form-item>
              </li>
              <li>
                <p>品种规格</p>
                <el-form-item prop="tmsOrderCargoList.description">
                  <el-input maxlength="20" v-model="form.tmsOrderCargoList.description" :disabled="isDbclick"></el-input>
                </el-form-item>
              </li>
            </ul>
        </div>

        <div class="info_order" style="margin-top: 12px">订单信息</div>
        <table class="manage-add-table-foot">
          <tbody>
          <tr>
            <td>
              <el-form-item label="出发城市">

                <querySelect search="longAddr" @change="selectFromCity" type="city"  v-model="form.tmsOrderPre.orderFromCityName" :remote="true" :disabled="isDbclick"/>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="到达城市" prop="tmsOrderPre.orderToCityName">
                <querySelect @change="selectToCity" search="longAddr" type="city"  v-model="form.tmsOrderPre.orderToCityName" :remote="true" :disabled="isDbclick"/>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="开单网点">
                <SelectTree v-model="form.tmsOrderPre.orderFromOrgid" disabled="disabled" :disabled="isDbclick"/>
              </el-form-item>
            </td>

            <td>
              <el-form-item label="目的网点" >
                <SelectTree v-model="form.tmsOrderPre.orderToOrgid" :disabled="isDbclick"/>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="提货方式">
                <SelectType v-model="form.tmsOrderPre.orderPickupMethod" type="order_pickup_method"  :disabled="isDbclick"/>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="紧急度">
                <SelectType v-model="form.tmsOrderPre.orderEffective" type="ship_effective" :disabled="isDbclick" />
              </el-form-item>
            </td>

            <td>
              <el-form-item label="代收款">
                <el-input v-numberOnly v-model="form.tmsOrderCargoList.agencyFund" maxlength="8" auto-complete="off" clearable :disabled="isDbclick"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="代收款手续费">
                <el-input v-numberOnly v-model="form.tmsOrderCargoList.commissionFee" maxlength="8" auto-complete="off" clearable class="order_com" :disabled="isDbclick"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="付款方式">
                <SelectType v-model="form.tmsOrderPre.orderPayWay" type="ship_pay_way" :disabled="isDbclick" />
              </el-form-item>
            </td>

            <td>
              <el-form-item label="运费">
                <el-input v-numberOnly v-model="form.tmsOrderCargoList.shipFee" maxlength="8" auto-complete="off" clearable :disabled="isDbclick"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="声明价值">
                <el-input v-numberOnly v-model="form.tmsOrderCargoList.productPrice" maxlength="8" auto-complete="off" clearable :disabled="isDbclick"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="备注">
                <el-input v-model="form.tmsOrderPre.orderRemarks" maxlength="300" auto-complete="off" type="textarea" clearable class="add-textarea" placeholder="少于300字" :disabled="isDbclick"></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>

        </table>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { postAddOrder , postModifyOrder } from '@/api/operation/manage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import querySelect from '@/components/querySelect/index'
import { mapGetters } from 'vuex'
import {objectMerge2} from '@/utils/index'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType,
    querySelect
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
    const validateOnlyNumberAndLetter = (rule, value, callback) => {
      if(REGEX.ONLY_NUMBER_AND_LETTER.test(value)){
        callback()
      } else if(value == ''){
        callback()
      }else{
        callback(new Error('只能输入数字或者字母'))
      }
    }
    const validateMobile = (rule, value, callback) => {
      if(REGEX.MOBILE.test(value)){
        callback()
      } else if(this.isDbclick){
        callback()
      }else {
        callback(new Error('请输入正确的联系号码~'))
      }
    }
    const validatePickupNum = function (rule, value, callback) {
      if(REGEX.ONLY_NUMBER.test(value)){
        callback()
      } else {
        callback(new Error('只能输入数字'))
      }
    }
    let hasOne = false
    const validateVolumnWeight = (rule, value, callback) => {
      if(this.form.tmsOrderCargoList.volumeFee === '' && this.form.tmsOrderCargoList.weightFee === '' ){
        hasOne = false
      }
      if(!value && !hasOne){
        callback(new Error('体积或重量必填其中一项'))
      }else{
        hasOne = true
        callback()
      }
    }
    return {
      rules:{
        "tmsOrderPre.orderToCityName": [
          {validator: this.validateIsEmpty('到达城市不能为空'), trigger: ['blur']}
        ],
        "customSend.customerName": [
          {required: true,validator: this.validateIsEmpty('发货人不能为空'), trigger: 'blur'}
        ],
        "customSend.customerMobile": [
          {required: true,validator: this.validateIsEmpty('发货人联系电话不能为空'), trigger: 'blur'},
          { validator: validateMobile, trigger: 'change' }
        ] ,
        "customRece.customerName": [
          {required: true,validator: this.validateIsEmpty('收货人不能为空'), trigger: 'blur'}
        ],
        "customRece.customerMobile": [
          {required: true,validator: this.validateIsEmpty('收货人联系电话不能为空'), trigger: 'blur'},
          { validator: validateMobile, trigger: 'change' }
        ],
        "tmsOrderCargoList.cargoName": [
          {validator: this.validateIsEmpty('货品名不能为空'), trigger: 'blur'},
          // { validator: validateCargoName, trigger: 'change' }
        ],
        "tmsOrderCargoList.cargoAmount": [
          {validator: this.validateIsEmpty('件数不能为空'), trigger: 'blur'},
          {validator: validatePickupNum, trigger: 'blur'}
        ],
        'tmsOrderCargoList.volumeFee': [{
          validator: validateVolumnWeight, trigger: 'blur'
        }],
        'tmsOrderCargoList.weightFee': [{
          validator: validateVolumnWeight, trigger: 'blur'
        }],
        "tmsOrderCargoList.description": [
          { validator: validateOnlyNumberAndLetter,trigger: ['change'] }
        ]
      },
      btnsize: 'mini',
      carObj: {
        cargoName:'',  // 货品名
        cargoAmount:'',  // 件数
        weightFee:'',  // 重量
        volumeFee:'',  // 体积
        cargoPack:'',  // 包装
        // description:''  // 品种规格
      },
      form: {
        customSend:{
          // 发货人
          customerId:'',
          customerUnit:'',
          customerName:'',
          customerMobile:'',
          detailedAddress:'',
          customerType:1
        },
        customRece:{
          customerId:'',
          customerUnit:'',
          customerName:'',
          customerMobile:'',//
          detailedAddress:'',
          customerType:2
        },
        customerList:[{},{}],
        //货物信息
        tmsOrderCargoList: [
          {
            cargoName:'',  // 货品名
            cargoAmount:'',  // 件数
            weightFee:'',  // 重量
            volumeFee:'',  // 体积
            cargoPack:'',  // 包装
            description:'' , // 品种规格
            commissionFee:'',//代收款手续费
            agencyFund:'',//代收款
            productPrice:'',//声明价值
            shipFee:'',//运费shipFee
            cargoId:''
          }
        ],
        //订单信息
        tmsOrderPre: {
          orderFromCityCode:'',
          orderFromCityName:'',
          orderToCityCode:'',
          orderToCityName:'',
          orderFromOrgid:'',
          orderToOrgid:'',//目的网点
          orderPickupMethod :218,//提货方式
          orderEffective:94,//紧急度
          orderPayWay:76,//付款方式 orderPayWayName
          // deliveryFee:'',//运费
          // commissionFee:'',//代收款手续费
          // agencyFund:'',//代收款
          // productPrice:'',//声明价值
          orderRemarks:''//
          // cargoId,senderId,receiverId
        }
      },
      customSend:{
        // 发货人
        // customerId:'',
        customerUnit:'',
        customerName:'',
        customerMobile:'',
        detailedAddress:'',
        customerType:1
      },
      customRece:{
        customerUnit:'',
        customerName:'',
        customerMobile:'',//
        detailedAddress:'',
        customerType:2
      },
      popTitle: '新增订单',
      orderSn: '',
      loading: false,
      inited: false
    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
    this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
    },
    info () {
      if(this.isModify){
        this.popTitle = '修改订单'
        this.orderSn = this.info.orderSn
        this.infoData(this.info)
      }else if(this.isDbclick) {
        this.popTitle = '查看订单'
        this.orderSn = this.info.orderSn
        this.infoData(this.info)
      }
      else {
        this.popTitle = '新增订单'
        this.orderSn = ''
        // cargoId
        // this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre)
        this.form.tmsOrderCargoList = objectMerge2({}, this.carObj)
        this.form.customSend = objectMerge2({}, this.customSend)
        this.form.customRece = objectMerge2({}, this.customRece)
        this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
        this.form.tmsOrderPre.orderFromCityName = this.info.orderFromCityName
        this.form.tmsOrderPre.orderToCityName = this.info.orderToCityName
        // this.form.tmsOrderPre.orderEffectiveName = ''
        this.form.tmsOrderCargoList.agencyFund = ''
        this.form.tmsOrderCargoList.commissionFee = ''
        this.form.tmsOrderCargoList.shipFee = ''
        this.form.tmsOrderCargoList.productPrice = ''
        this.form.tmsOrderPre.orderRemarks = ''
        this.form.tmsOrderPre.orderPickupMethod  = 218
        this.form.tmsOrderPre.orderEffective = 94
        this.form.tmsOrderPre.orderPayWay = 76
      }
    }
  },
  methods: {
    infoData(item){
      this.form.tmsOrderCargoList.cargoName = item.cargoName
      this.form.tmsOrderCargoList.cargoAmount = item.cargoAmount
      this.form.tmsOrderCargoList.weightFee = item.cargoWeight
      this.form.tmsOrderCargoList.volumeFee = item.cargoVolume
      this.form.tmsOrderCargoList.cargoPack = item.cargoPack
      this.form.tmsOrderCargoList.description = item.description
      this.form.tmsOrderCargoList.agencyFund = item.agencyFund
      this.form.tmsOrderCargoList.commissionFee = item.orderProcedureFee
      this.form.tmsOrderCargoList.shipFee = item.deliveryFee
      this.form.tmsOrderCargoList.productPrice = item.productPrice
      this.form.tmsOrderCargoList.cargoId = item.id
      //发
      this.form.customSend.customerName = item.senderName
      this.form.customSend.customerMobile = item.senderMobile
      this.form.customSend.detailedAddress = item.senderAddr
      this.form.customSend.customerUnit = item.senderUnit
      this.form.customSend.customerId = item.senderId
      //收
      this.form.customRece.customerName = item.receiverName
      this.form.customRece.customerMobile = item.receiverMobile
      this.form.customRece.detailedAddress = item.receiverAddr
      this.form.customRece.customerUnit = item.receiverUnit
      this.form.customRece.customerId = item.receiverId

      // 订单信息
      this.form.tmsOrderPre.orderFromCityName = this.info.orderFromCityName
      this.form.tmsOrderPre.orderToCityName = this.info.orderToCityName
      this.form.tmsOrderPre.orderRemarks = item.orderRemarks
      // this.form.tmsOrderPre.orderPickupMethodName = this.info.orderPickupMethodName
      this.form.tmsOrderPre.orderEffective = item.orderEffective
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
    // 选择出发城市
    selectFromCity (item, city) {
      if(item){
        this.form.tmsOrderPre.orderFromCityCode = item.id
        this.form.tmsOrderPre.orderFromCityName = item.longAddr
      } else {
        //this.form.tmsOrderPre.orderFromCityCode = city || ''
      }
    },
    // 选择到达城市
    selectToCity (item, city) {
      if(item){
        this.form.tmsOrderPre.orderToCityCode = item.id
        this.form.tmsOrderPre.orderToCityName = item.longAddr
      } else {
      }
    },
    /** 收货人/发货人 */
    setSender(item, type){
      type = type ? 'customRece' : 'customSend'
      if(item){

        // this.form[type].customerId = item.customerId || ''
        this.form[type].customerType = type === 'customSend' ? 1 : 2
        this.form[type].customerUnit = item.customerUnit
        this.form[type].customerName = item.customerName
        this.form[type].customerMobile = item.customerMobile
        this.form[type].detailedAddress = item.detailedAddress
      }
    },
    setReceiver(item){
      this.setSender(item, 'receiver')
    },

    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
    },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.customerList[0] = this.form.customSend
          this.form.customerList[1] = this.form.customRece

          let promiseObj
          let data = objectMerge2({}, this.form)
          delete data.customSend
          delete data.customRece
          let obj = {}
          for(let i in data.tmsOrderCargoList) {
            obj[i] = data.tmsOrderCargoList[i]
          }
          data.tmsOrderCargoList = [obj]
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = postModifyOrder(data)
          } else {
            promiseObj = postAddOrder(data)
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
      this.form.customerList[0] = ''
      this.form.customerList[1] = ''
      // this.form.tmsOrderCargoList = ''
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
.addCustomerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 900px;
  max-width:  900px;

  .el-autocomplete{
    width: 100%;
  }

  .el-form--inline .el-form-item{
    margin-right: -9px;
    width: 90%;
    display: flex;
    margin-left: 7px
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
    box-sizing: border-box;
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

}
  /*收货-发货方*/
.info_send{
  ul{
    margin-top: 10px;
    li{
      float: left;

      .send_detailedAddress{

      }
    }
    li:last-of-type{
      width: 100%;
      .el-form-item--mini{
        .el-form-item__content{
          width: 100%;
          .el-autocomplete{
            width: 100%;
          }
        }
      }

    }
  }
}

.manage-add-table-foot{
  height: 100%;
  width: 100%;
}
.manage-add-table-foot{
  margin-top: 10px;
}
.manage-add-table-foot th{
  width: 50%;
  height: 30px;
  background: #eee;
  margin-left: 10px;
  font-size: 14px;
  padding: 2px 2px 2px 5px !important;
}
  .manage-add-table-foot th{
  background:transparent;
  width: 0;
}
.manage-add-table-foot {
  tbody{
    tr{
      td{
        .el-form-item--mini{
          .el-form-item__label{
            width: 40%;
          }
        }

      }
    }
  }
  .add-textarea{
    width: 630%;
  }
}


.info_order,.info_rece{
  height: 36px;
  line-height: 36px;
  /*margin-top: 12px;*/
  padding-left: 10px;
  font-size: 14px;
  color: #666;
  font-weight: 600;
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  background: #e9f3fa;
}
.manage-add-table-foot .el-form-item--mini {
  margin-left: 12px;
}

  .manage-add div.el-form-item{
    width: 40%;
  }
  .info_table{
    border-color: #dcdfe6;
    margin: 22px 0 20px;
    ul{
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;

      li:nth-of-type(1){
        padding-left: 0;
      }
      li:last-of-type{
        border-right: none;
      }
      li{
        border: 1px solid #d4d4d4;
        width: 30%;
        border-left: none;
        padding-bottom: 10px;

        p{
          font-size: 14px;
          text-align: center;
          line-height: 34px;
          background: #e8e8e8;
          margin-bottom: 5px;
          i{
            color: red;
          }
        }
      }

      .el-form-item{
        margin-bottom: 0;
        margin-right: 0;

      }
    }

  }
  /*清除浮动代码*/
  .clearfloat:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .clearfloat{
    zoom:1
  }
  .manage-add_lrl .el-input.is-disabled .el-input__inner,.manage-add_lrl .el-textarea.is-disabled .el-textarea__inner{
    background-color: #fff;
    /*color: red;*/
  }

</style>

