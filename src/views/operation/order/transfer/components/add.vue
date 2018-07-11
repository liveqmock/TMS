<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addTransferPop" v-loading="loading">
    <template class="addTransferPop-content" slot="content">
      <el-form :model="form" ref="ruleForm"  :inline="true" label-position="right" size="mini">
        <!-- 基本信息 -->
          <el-form-item label="承运商" class="addCarrierInput" prop="carrierId">
            <el-input disabled :value="form.carrierName" ></el-input>
          </el-form-item>
          <el-form-item prop="transferTime" label="中转日期">
            <el-input disabled :value="form.transferTime" ></el-input>
          </el-form-item>
          <el-form-item label="承运商电话" prop="carrierMobile">
            <el-input size="mini" disabled :value="form.carrierMobile" placeholder="承运商电话">
            </el-input>
          </el-form-item>
          <el-form-item label="到站电话" prop="arrivalMobile">
            <el-input size="mini" disabled :value="form.arrivalMobile" v-number-only placeholder="到站电话">
            </el-input>
          </el-form-item>
          <el-form-item label="备注" class="remark">
            <el-input size="mini" disabled :value="form.remark" placeholder="备注">
            </el-input>
          </el-form-item>
      </el-form>
      <div class="btns_box clearfix">
          <el-button type="info" class="cancelBtn" :size="btnsize" icon="el-icon-delete" @click="doAction('cancel')" plain>取消中转</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>打印清单</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>导出清单</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="table_wrapper">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </template>
    <div slot="footer" class="dialog-footer">
    </div>
  </pop-right>
</template>
<script>
import { REGEX }  from '@/utils/validate'
import { postCustomer, putCustomer } from '@/api/company/customerManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import { parseTime } from '@/utils/'
import * as transferManageApi from '@/api/operation/transfer'
import { getSystemTime } from '@/api/common'
import querySelect from '@/components/querySelect/index'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
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
      "fixPhone": {
        get(){
          return this.phoneshort+'-'+this.phonelong
        },
        set (val){
          //let names = val.match(/(.*)(.{7})$/)
          let names = val ?　val.split('-')　: ''
          if(names){
            this.phoneshort = names[1] ? names[0] : ''
            this.phonelong = names[1] ? names[1] : names[0]
          } else {
            this.phoneshort = ''
            this.phonelong = ''
          }
        }
      }
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
      _this.form.customerMobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      btnsize: 'mini',
      usersArr: [],

      carrierName: '',
      phoneshort: '', // 固话区号
      phonelong: '', // 固话号码
      //fixPhone: '',
      form: {
        "carrierName": "",
        transferTime: '',
        carrierMobile: '',
        arrivalMobile: '',
        remark: ''
      },
      tableColumn: [{
        "label": "开单网点",
        "prop": "shipFromOrgName",
        "width": "100",
        "fixed": true
      },{
        "label": "承运商",
        "prop": "carrierName",
        "width": "100"
      },{
        "label": "承运商电话",
        "prop": "carrierMobile",
        "width": "100"
      },{
        "label": "到站电话",
        "prop": "arrivalMobile",
        "width": "100"
      },{
        "label": "运单状态",
        "prop": "shipStatusName",
        "width": "120"
      },{
        "label": "运单号",
        "prop": "shipSn",
        "width": "100"
      },{
        "label": "中转单号",
        "prop": "oddNumbers",
        "width": "100"
      },{
        "label": "中转批次",
        "prop": "transferBatchNo",
        "width": "100"
      },{
        "label": "开单时间",
        "prop": "ydCreateTime",
        "width": "100",
        "slot": function(scope){
          return `${ parseTime(scope.row.ydCreateTime, '{y}{m}{d}') }`
        }
      },{
        "label": "中转时间",
        "prop": "transferTime",
        "width": "100",
        "slot": function(scope){
          return `${ parseTime(scope.row.transferTime, '{y}{m}{d}') }`
        }
      },{
        "label": "中转运费",
        "prop": "transferCharge",
        "width": "100"
      },{
        "label": "中转送货费",
        "prop": "deliveryExpense",
        "width": "100"
      },{
        "label": "中转费其他费",
        "prop": "transferOtherFee",
        "width": "100"
      },{
        "label": "中转费合计",
        "prop": "totalCost",
        "width": "100"
      },{
        "label": "中转费付款方式",
        "prop": "paymentName",
        "width": "100"
      },{
        "label": "代收货款",
        "prop": "codService",
        "width": "100"
      },{
        "label": "发货人",
        "prop": "shipSenderName",
        "width": "100"
      },{
        "label": "发货人电话",
        "prop": "shipSenderMobile",
        "width": "100"
      },{
        "label": "收货人",
        "prop": "shipReceiverName",
        "width": "100"
      },{
        "label": "收货人电话",
        "prop": "shipReceiverMobile",
        "width": "100"
      },{
        "label": "出发城市",
        "prop": "shipFromCityName",
        "width": "100"
      },{
        "label": "到达城市",
        "prop": "shipToCityName",
        "width": "100"
      },{
        "label": "货品名",
        "prop": "cargoName",
        "width": "100"
      },{
        "label": "件数",
        "prop": "cargoAmount",
        "width": "100"
      },{
        "label": "重量",
        "prop": "cargoWeight",
        "width": "100"
      },{
        "label": "体积",
        "prop": "cargoVolume",
        "width": "100"
      },{
        "label": "包装",
        "prop": "cargoPack",
        "width": "100"
      },{
        "label": "运单备注",
        "prop": "shipRemarks",
        "width": "100"
      },{
        "label": "中转备注",
        "prop": "remark",
        "width": "100"
      },{
        "label": "到达省",
        "prop": "shipToCityName",
        "width": "100",
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[0]
        }
      },{
        "label": "到达市",
        "prop": "shipToCityName",
        "width": "100",
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[1]
        }
      },{
        "label": "到达县区",
        "prop": "shipToCityName",
        "width": "100",
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[2]
        }
      },{
        "label": "发货方",
        "prop": "sendCustomerUnit",
        "width": "100"
      },{
        "label": "收货方",
        "prop": "receiverCustomerUnit",
        "width": "100"
      },{
        "label": "发货人地址",
        "prop": "sendDetailedAddress",
        "width": "100"
      },{
        "label": "收货人地址",
        "prop": "receiverDetailedAddress",
        "width": "100"
      },{
        "label": "运费",
        "prop": "shipFee",
        "width": "100"
      },{
        "label": "目的网点",
        "prop": "shipToOrgName",
        "width": "100"
      },{
        "label": "交接方式",
        "prop": "shipDeliveryMethodName",
        "width": "100"
      },{
        "label": "货号",
        "prop": "shipGoodsSn",
        "width": "100"
      },{
        "label": "品种规格",
        "prop": "description",
        "width": "100"
      },{
        "label": "件数单价",
        "prop": "amountFee",
        "width": "100"
      },{
        "label": "重量单价",
        "prop": "weightFee",
        "width": "100"
      },{
        "label": "体积单价",
        "prop": "volumeFee",
        "width": "100"
      },{
        "label": "等通知放货",
        "prop": "cgStatus",
        "width": "100"
      },{
        "label": "回单要求",
        "prop": "shipReceiptRequireName",
        "width": "100"
      },{
        "label": "回单份数",
        "prop": "shipReceiptNum",
        "width": "100"
      },{
        "label": "付款方式",
        "prop": "shipPayWayName",
        "width": "100"
      },{
        "label": "现付",
        "prop": "shipNowpayFee",
        "width": "100"
      },{
        "label": "到付",
        "prop": "shipArrivepayFee",
        "width": "100"
      },{
        "label": "回单付",
        "prop": "shipReceiptpayFee",
        "width": "100"
      },{
        "label": "月结",
        "prop": "shipMonthpayFee",
        "width": "100"
      },{
        "label": "运费合计",
        "prop": "shipTotalFee",
        "width": "100"
      },{
        "label": "制单人",
        "prop": "shipUserName",
        "width": "100"
      },{
        "label": "回单号",
        "prop": "shipReceiptNum",
        "width": "100"
      },{
        "label": "回扣",
        "prop": "brokerageFee",
        "width": "100"
      },{
        "label": "客户单号",
        "prop": "shipCustomerNumber",
        "width": "100"
      },{
        "label": "送货费",
        "prop": "deliveryFee",
        "width": "100"
      },{
        "label": "代收款手续费",
        "prop": "commissionFee",
        "width": "100"
      },{
        "label": "声明价值",
        "prop": "productPrice",
        "width": "100"
      },{
        "label": "保险费",
        "prop": "insuranceFee",
        "width": "100"
      },{
        "label": "装卸费",
        "prop": "handlingFee",
        "width": "100"
      },{
        "label": "包装费",
        "prop": "packageFee",
        "width": "100"
      },{
        "label": "提货费",
        "prop": "pickupFee",
        "width": "100"
      },{
        "label": "上楼费",
        "prop": "goupstairsFee",
        "width": "100"
      },{
        "label": "实际提货费",
        "prop": "realityhandlingFee",
        "width": "100"
      },{
        "label": "报关费",
        "prop": "customsFee",
        "width": "100"
      },{
        "label": "其他费收入",
        "prop": "otherfeeIn",
        "width": "100"
      },{
        "label": "其他费支出",
        "prop": "otherfeeOut",
        "width": "100"
      }],
      formLabelWidth: '90px',
      tooltip: false,
      popTitle: '中转批次：',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,
      transferBatchNo: ''

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
    info (newVal) {
      if(newVal.transferBatchNo){
        this.popTitle = '中转批次：' + newVal.transferBatchNo
        this.transferBatchNo = newVal.transferBatchNo
        this.getUpdateTransferDetail(newVal.transferBatchNo)
      }
        
    }
  },
  methods: {
    doAction(type) {
      if(type==='cancel'){
        this.$emit('action', 'cancel', [this.transferBatchNo])
      }
    },
    setTable() {

    },
    // 获取批次详细信息
    getUpdateTransferDetail(transferBatchNo) {
      return transferManageApi.getUpdateTransferDetail(this.otherinfo.orgid, transferBatchNo).then(res => {
        let data = res.data
        if(!data.transferBatchNo){
          // 当这个批次号不能获取到信息时，提示用户
          this.$alert('当前批次号不存在', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.closeMe()     
            }
          });
        } else {
          for(let i in this.form){
            this.form[i] = data[i]
          }
          this.form.transferTime = parseTime(new Date(this.form.transferTime))
          this.usersArr = data.tmsOrderTransferDetails || []
        }
      })
    },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      this.form.orgid = id
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
.addTransferPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 900px;
  max-width:  900px;

  .el-form{
    height: 80px;
  }

  .el-form-item__content{
    width: 140px;
  }

  .el-form-item{
    margin-right: 0;
  }
  .el-input__inner{
    padding: 0 10px;
  }

  .btns_box{
    text-align: right;
    margin-bottom: 10px;
    margin-top: 5px;
    height: 30px;
  }

  .cancelBtn{
    float: left;
  }

  .remark{
    display: flex;

    .el-form-item__label{
      width: 54px;
      text-align: right;
    }

    .el-form-item__content{
      width: auto;
      flex:1;
    }
  }

  .popRight-content{
    padding: 20px 24px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .table_wrapper{
      flex:1;
    }
  }

}
</style>

