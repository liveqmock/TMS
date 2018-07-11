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
          <el-date-picker
          :size="btnsize"
            v-model="formModel.settlementTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime">
          </el-date-picker>
          <!-- <el-input placeholder="请输入" v-model="formModel.settlementTime" :size="btnsize"></el-input> -->
        </div>
        <div class="receiptDialog_head_item">
          <label>经办人</label>
          <el-input v-model="formModel.settlementBy" placeholder="请输入" :size="btnsize"></el-input>
        </div>
      </div>
      <div class="receiptDialog_table">
        <el-table :data="formModel.detailDtoList" style="width: 100%; height:100%;" height="100%" stripe show-summary>
          <el-table-column prop="date" label="序号" type="index" width="70">
          </el-table-column>
          <el-table-column prop="dataName" label="费用项">
          </el-table-column>
          <el-table-column>
            <el-table-column prop="name" label="千" width="40">
            </el-table-column>
            <el-table-column prop="name" label="百" width="40">
            </el-table-column>
            <el-table-column prop="name" label="十" width="40">
            </el-table-column>
            <el-table-column prop="name" label="万" width="40">
            </el-table-column>
            <el-table-column prop="name" label="千" width="40">
            </el-table-column>
            <el-table-column prop="name" label="百" width="40">
            </el-table-column>
            <el-table-column prop="name" label="十" width="40">
            </el-table-column>
            <el-table-column prop="name" label="元" width="40">
            </el-table-column>
            <el-table-column prop="name" label="角" width="40">
            </el-table-column>
            <el-table-column prop="name" label="分" width="40">
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
              <el-input v-model="props.row.financialWay"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" label="银行名称">
          </el-table-column>
          <el-table-column prop="bankAccount" label="银行卡号">
          </el-table-column>
          <el-table-column prop="bankAccountName" label="开户人">
          </el-table-column>
          <el-table-column prop="chequeNumber" label="支票号码">
          </el-table-column>
          <el-table-column prop="receivableNumber" label="汇款号码">
          </el-table-column>
          <el-table-column prop="wechatAccount" label="微信号">
          </el-table-column>
          <el-table-column prop="alipayAccount" label="支付宝号">
          </el-table-column>
        </el-table>
      </div>
      <div class="receiptDialog_remark">
        <label>备注</label>
        <el-input placeholder="最多可输入300个字符" :size="btnsize"></el-input>
      </div>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" 
      icon="el-icon-document">保存</el-button>
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" 
      icon="el-icon-printer" disabled>保存并打印</el-button>
      <el-button type="danger" @click="closeMe" :size="btnsize" 
      icon="el-icon-circle-close-outline">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { GetFeeInfo } from '@/api/finance/accountsPayable'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime } from '@/utils/index'
export default {
  data() {
    const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }
    return {
      formModel: {},
      loading: true,
      rules: {},
      btnsize: 'mini',
      dialogTitle: '结 算 收 款 单'
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
    getFeeInfo () {
      // console.log(this.info)
      let orgId = this.otherinfo.orgid
      let paymentsType = 1 // 收支类型, 0 收入, 1 支出
      return GetFeeInfo(orgId, paymentsType).then(data => {
        this.formModel = data.data
        this.formModel.settlementTime = parseTime(new Date())
        // this.getSystemTime()
        console.log(this.formModel)

      })
    },
    getSystemTime () {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {}
      })
    },
    minusItem(row, index) {},
    plusItem() {}
  }
}

</script>
<style lang="scss">
$borderColor: #999;
.receiptDialog {
  .el-dialog {
    width: 70%;
    min-width: 900px;
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
        border-bottom: 1px solid $borderColor;
        // padding: 0 10px;
        width: auto;
      }
      .el-input.is-disabled .el-input__inner{
        color:$borderColor;
        background-color:rgba(0,0,0,0);
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
    height:231px;
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
  .receiptDialog_remark{
    width:100%;
    margin:20px 20px 0 0;
    padding-right:30px;
     display: flex;
      flex-direction: row;
      label {
        padding: 10px 10px 0 0;
        width: 80px;
        text-align: right;
      }
      .el-input__inner {
        width:100%;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid $borderColor;
        padding: 0 10px;
      }
  }
}

</style>
