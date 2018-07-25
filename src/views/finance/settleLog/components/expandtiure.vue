<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="receiptDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules">
      <div class="receiptDialog_head">
        <div class="receiptDialog_head_item">
          <label>单据号</label>
          <el-input v-model="formModel.settlementSn" placeholder="请输入" :size="btnsize" disabled></el-input>
        </div>
        <div class="receiptDialog_head_item">
          <label>发生时间</label>
          <el-date-picker :size="btnsize" v-model="formModel.settlementTime" value-format="yyyy-MM-dd HH:mm:ss" type="date">
          </el-date-picker>
        </div>

        <div class="receiptDialog_head_item">
          <label>经办人</label>
          <!-- <el-input v-model="formModel.settlementBy" placeholder="请输入" :size="btnsize"></el-input> -->
          <querySelect v-model="formModel.settlementBy" :size="btnsize" valuekey="id" search="name" label="name" />
        </div>
      </div>
      <div class="receiptDialog_table">
        <el-table :data="formModel.detailDtoList" style="width: 100%; height:100%;" height="100%" stripe show-summary :summary-method="getSum">
          <el-table-column prop="date" label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="dataName" label="费用项">
          </el-table-column>
          <el-table-column>
            <el-table-column prop="tenMillion" label="千" width="40">
            </el-table-column>
            <el-table-column prop="million" label="百" width="40">
            </el-table-column>
            <el-table-column prop="oneHundrenThousand" label="十" width="40">
            </el-table-column>
            <el-table-column prop="tenThousand" label="万" width="40">
            </el-table-column>
            <el-table-column prop="thousand" label="千" width="40">
            </el-table-column>
            <el-table-column prop="hundren" label="百" width="40">
            </el-table-column>
            <el-table-column prop="ten" label="十" width="40">
            </el-table-column>
            <el-table-column prop="yuan" label="元" width="40">
            </el-table-column>
            <el-table-column prop="jiao" label="角" width="40">
            </el-table-column>
            <el-table-column prop="fen" label="分" width="40">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="receiptDialog_todo">
        <el-button icon="el-icon-plus" type="primary" plain class="tableAllBtn" size="mini" @click="plusItem"></el-button>
        <el-table :data="formModel.szDtoList" border style="width: 100%;" height="100%" stripe>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button icon="el-icon-minus" type="danger" plain class="tableItemBtn" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="financialWay" label="收支方式" width="100">
            <template slot-scope="props">
              <el-input v-model="props.row.financialWay" :size="btnsize" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称">
            <template slot-scope="props">
              <el-input v-model="props.row.bankName" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行卡号">
            <template slot-scope="props">
              <el-input v-model="props.row.bankAccount" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccountName" label="开户人">
            <template slot-scope="props">
              <el-input v-model="props.row.bankAccountName" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="chequeNumber" label="支票号码">
            <template slot-scope="props">
              <el-input v-model="props.row.chequeNumber" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="receivableNumber" label="汇款号码">
            <template slot-scope="props">
              <el-input v-model="props.row.receivableNumber" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="wechatAccount" label="微信号">
            <template slot-scope="props">
              <el-input v-model="props.row.wechatAccount" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="alipayAccount" label="支付宝号">
            <template slot-scope="props">
              <el-input v-model="props.row.alipayAccount" :size="btnsize"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="agent" label="经办人" width="110">
            <template slot-scope="props">
              <querySelect v-model="props.row.agent" search="driverName" type="driver" label="driverName" :remote="true" :size="btnsize" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="receiptDialog_remark">
        <label>备注</label>
        <el-input v-model="formModel.remark" placeholder="最多可输入300个字符" :size="btnsize"></el-input>
      </div>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" icon="el-icon-document">保存</el-button>
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" icon="el-icon-printer" disabled>保存并打印</el-button>
      <el-button type="danger" @click="closeMe" :size="btnsize" icon="el-icon-circle-close-outline">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { GetFeeInfo, postLoadSettlement } from '@/api/finance/accountsPayable'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime } from '@/utils/index'
import { smalltoBIG } from '@/filters/'
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    querySelect
  },
  data() {
    const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }
    return {
      amount: 0,
      amountMessage: '',
      formModel: {},
      loading: true,
      rules: {},
      btnsize: 'mini',
      dialogTitle: '结 算 收 款 单',
      submitData: {},
      // settlementTypeId: 180, // 178：运单结算、179：干线批次结算、180：短驳批次结算、181：送货批次结算
      paymentsType: 1 // 收支类型, 0 收入, 1 支出,
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    },
    getRouteInfo() {
      return this.$route.query.searchQuery
    },
    settlementTypeId () {
      let currentPage = this.$route.query.currentPage
      switch(currentPage) {
        case 'batchShort':
        return 180
        case 'batchDeliver':
        return 181
        case 'batchInsurance':
        return 179
        case 'batchStationLoad':
        return 179
        case 'batchStationOther':
        return 179
        case 'batchArrivalLoad':
        return 179
        case 'batchArrivalOther':
        return 179
        case 'batchArrivalAll':
        return 179
      }
    },
    dataName () {
      let currentPage = this.$route.query.currentPage
      switch(currentPage) {
        case 'batchShort':
        return '短驳费'
        case 'batchDeliver':
        return '送货费'
        case 'batchInsurance':
        return '整车保险费'
        case 'batchStationLoad':
        return '发站装卸费'
        case 'batchStationOther':
        return '发站其他费'
        case 'batchArrivalLoad':
        return '到站装卸费'
        case 'batchArrivalOther':
        return '到站其他费'
        case 'waybillKickback':
        return '回扣'
      }
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Array,
      default: []
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.isShow = true
        this.getFeeInfo()
      } else {
        this.isShow = false
      }
    },
    info(newVal) {
      if (newVal) {
        return this.info
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.loading = false
    },
    getFeeInfo() {
      let orgId = this.otherinfo.orgid
      return GetFeeInfo(orgId, this.paymentsType).then(data => {
        this.formModel = data.data
        this.formModel.settlementTime = parseTime(new Date()) 
        this.formModel.settlementBy = this.otherinfo.name
        // this.getSystemTime()
        this.initDetailDtoList()
      })
    },
    initDetailDtoList() {
      this.formModel.amount = 0
      this.formModel.detailDtoList = Object.assign([],this.info)
      this.formModel.detailDtoList.forEach((e, index) => {
        e.dataName = this.dataName
        this.formModel.amount += e.amount
        let data = e.amount.toFixed(2).toString().split('').reverse()
        let item = data.indexOf('.')
        if (item !== -1) {
          data.splice(item, 1)
        }
        e.fen = data[0]
        e.jiao = data[1]
        e.yuan = data[2]
        e.ten = data[3]
        e.hundren = data[4]
        e.thousand = data[5]
        e.tenThousand = data[6]
        e.oneHundrenThousand = data[7]
        e.million = data[8]
        e.tenMillion = data[9]
      })
      this.amountMessage = smalltoBIG(this.formModel.amount)
      this.amount = this.formModel.amount.toFixed(2).toString().split('').reverse()
      let apoint = this.amount.indexOf('.')
      if (apoint !== -1) {
         this.amount.splice(apoint, 1)
      }
    },
    getSystemTime() {
      getSystemTime().then(data => {
        this.formModel.settlementTime = new Date(data.trim())
      })
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    setData() {
      this.$set(this.submitData, 'ascriptionOrgid', this.getRouteInfo.vo.ascriptionOrgid)
      this.$set(this.submitData, 'settlementTypeId', this.settlementTypeId)
      this.$set(this.submitData, 'settlementSn', this.formModel.settlementSn)
      this.$set(this.submitData, 'settlementBy', this.formModel.settlementBy)
      this.$set(this.submitData, 'settlementTime', this.formModel.settlementTime)
      this.$set(this.submitData, 'remark', this.formModel.remark)
      this.$set(this.submitData, 'tmsFinanceSettlementList', this.formModel.detailDtoList)
      this.$set(this.submitData, 'tmsFinanceFinancialWayLogList', this.formModel.szDtoList)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setData()
          postLoadSettlement(this.submitData).then(data => {
              this.$message({ type: 'success', message: '操作成功' })
              this.closeMe()
              this.$router.push({ path: './accountsPayable/batch' })
            })
            .catch(error => {
              this.$message({ type: 'error', message: '操作失败' })
            })
        }
      })
    },
    minusItem(row, index) {
      let item = this.formModel.szDtoList.indexOf(row)
      if (item !== -1) {
        this.formModel.szDtoList.splice(item, 1)
      }
    },
    plusItem() {
      let data = {
        agent: '',
        alipayAccount: '',
        bankAccount: '',
        bankAccountName: '',
        bankName: '',
        chequeNumber: '',
        financialWay: '',
        flowId: '',
        receivableNumber: '',
        rnum: '',
        wechatAccount: ''
      }
      this.formModel.szDtoList.push(data)
    },
    getSum(param) { // 表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      this.$nextTick(() => {
      })
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1) {
          sums[index] = this.amountMessage
          return
        }
        // for(let i = 13; i > -1; i--) {
        //   if (index === i) {
        //     sums[index] = this.amount[i-6]
        //     return
        //   }
        // }
        let count = -2 // 从第3列开始显示
        for(let i = 12; i > 2; i--) {
          count++
          if (index === i) {
            sums[index] = this.amount[count]
            return
          }
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}

</script>
<style lang="scss">
$borderColor: #999;
.receiptDialog {
  .el-dialog {
    width: 70%;
    min-width: 985px;
    max-width: 1200px;
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        font-size: 24px;
        padding: 0 10px;
        border-bottom: 2px solid $borderColor;
      }
    }
    .el-dialog__body {
      padding: 10px;
    }
  }
  .receiptDialog_head {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    .receiptDialog_head_item {
      display: flex;
      flex-direction: row;
      label {
        padding: 10px 10px 0 0;
        width: 120px;
        text-align: right;
      }
      .el-input__inner {
        border-radius: 0;
        border: none;
        border-bottom: 1px solid $borderColor; // padding: 0 10px;
        width: auto;
      }
      .el-input.is-disabled .el-input__inner {
        color: $borderColor;
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .receiptDialog_table {
    margin-top: 10px;
    width: 100%;
    padding: 0 30px;
    height: 200px;
    .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed,
    .el-table--border,
    .el-table--group,
    .el-table td,
    .el-table th.is-leaf {
      border-color: $borderColor;
    }
  }

  .receiptDialog_todo {
    margin-top: 20px;
    width: 100%;
    height: 231px;
    padding: 0 30px; // height: 100px;
    position: relative;
    .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed,
    .el-table--border,
    .el-table--group,
    .el-table td,
    .el-table th.is-leaf {
      border-color: $borderColor;
    }
    .tableItemBtn {
      width: 30px;
      padding-left: 8px;
    }
    .tableAllBtn {
      width: 30px;
      padding-left: 8px;
      position: absolute;
      z-index: 33;
      top: 4px;
      left: 41px;
    }
  }
  .receiptDialog_remark {
    width: 100%;
    margin: 20px 20px 0 0;
    padding-right: 30px;
    display: flex;
    flex-direction: row;
    label {
      padding: 10px 10px 0 0;
      width: 80px;
      text-align: right;
    }
    .el-input__inner {
      width: 100%;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid $borderColor;
      padding: 0 10px;
    }
  }
}

</style>
