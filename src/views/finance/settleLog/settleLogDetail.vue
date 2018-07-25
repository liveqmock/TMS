<template>
  <!-- 资金流水明细 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="danger" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain>取消结算</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataListTop" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="50">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="info_tab_footer">
      共计:{{ total }}
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange" />
      </div>
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <!-- 结算单 -->
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/searchDetail'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postDetailList, postDetailCancel } from '@/api/finance/settleLog'
import { mapGetters } from 'vuex'
import Receipt from './components/receipt'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Receipt
  },
  data() {
    return {
      btnsize: 'mini',
      feeType: 8,
      selectedList: [],
      selectListShipSns: [],
      tableReceiptInfo: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tablekey: 0,
      tablekeyBottom: 0,
      total: 0,
      dataListTop: [],
      popVisibleDialog: false,
      loading: false,
      setupTableVisible: false,
      tableColumn: [],
      columnOrder: [{
          label: '结算网点',
          prop: 'orgId',
          width: "120",
          fixed: false
        },
        {
          label: '结算单号',
          prop: 'settlementSn',
          width: '150',
          fixed: true
        },
        {
          label: '结算类型',
          prop: 'settlementIdZh',
          width: '150',
          fixed: false
        },
        {
          label: '结算人',
          prop: 'settlementBy',
          width: '150',
          fixed: false
        },
        {
          label: '金额',
          prop: 'amount',
          width: '150',
          fixed: false
        },
        {
          label: '结算时间',
          prop: 'settlementTime',
          width: '180',
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '备注',
          prop: 'paymentsType',
          width: '150',
          fixed: false
        },
        {
          label: '现付',
          prop: 'onPay',
          width: '150',
          fixed: false
        },
        {
          label: '到付',
          prop: 'arrivalPay',
          width: '150',
          fixed: false
        },
        {
          label: '回单付',
          prop: 'backPay',
          width: '150',
          fixed: false
        },
        {
          label: '月结',
          prop: 'monthPay',
          width: '150',
          fixed: false
        },
        {
          label: '中转费合计',
          prop: 'transferPay',
          width: '150',
          fixed: false
        },
        {
          label: '异动费用',
          prop: 'unusualPay',
          width: '150',
          fixed: false
        },
        {
          label: '异常费用',
          prop: 'exceptionPay',
          width: '150',
          fixed: false
        },
        {
          label: '实际提货费',
          prop: 'pickPuPay',
          width: '150',
          fixed: false
        },
        {
          label: '回扣',
          prop: 'kickBackPay',
          width: '150',
          fixed: false
        },
        {
          label: '其他费用支出',
          prop: 'othePay',
          width: '150',
          fixed: false
        },
        {
          label: '收支方式',
          prop: 'paymentsType',
          width: '150',
          fixed: false
        },
        {
          label: '银行名称',
          prop: 'bankName',
          width: '150',
          fixed: false
        },
        {
          label: '银行卡号',
          prop: 'bankAccount',
          width: '150',
          fixed: false
        },
        {
          label: '开户人',
          prop: 'bankAccountName',
          width: '150',
          fixed: false
        },
        {
          label: '支票号码',
          prop: 'chequeNumber',
          width: '150',
          fixed: false
        },
        {
          label: '汇款号码',
          prop: 'receivableNumber',
          width: '150',
          fixed: false
        },
        {
          label: '微信号',
          prop: 'wechatAccount',
          width: '150',
          fixed: false
        },
        {
          label: '支付宝号',
          prop: 'alipayAccount',
          width: '150',
          fixed: false
        }
      ],
      columnBatch: [{
          label: '结算网点',
          prop: 'orgid',
          width: '150',
          fixed: true
        },
        {
          label: '短驳批次',
          prop: 'shortBatchNo',
          width: '150',
          fixed: false
        },
        {
          label: '送货批次',
          prop: 'sendBatchNo',
          width: '150',
          fixed: false
        },
        {
          label: '干线批次',
          prop: 'mainBatchNo',
          width: '150',
          fixed: false
        },
        {
          label: '结算单号',
          prop: 'settlementSn',
          width: '150',
          fixed: false
        },
        {
          label: '结算类型',
          prop: 'settlementIdZh',
          width: '150',
          fixed: false
        },
        {
          label: '结算人',
          prop: 'settlementBy',
          width: '150',
          fixed: false
        },
        {
          label: '金额',
          prop: 'amount',
          width: '150',
          fixed: false
        },
        {
          label: '结算时间',
          prop: 'settlementTime',
          width: '150',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.settlementTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '收支类型',
          prop: 'paymentsType',
          width: '150',
          fixed: false
        },
        {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '短驳费',
          prop: 'shortPay',
          width: '150',
          fixed: false
        },

        {
          label: '送货费',
          prop: 'sendPay',
          width: '150',
          fixed: false
        },
        {
          label: '现付运费',
          prop: 'onSendPay',
          width: '150',
          fixed: false
        },
        {
          label: '现付油卡',
          prop: 'onCardPay',
          width: '150',
          fixed: false
        },
        {
          label: '到付运费',
          prop: 'arrSendPay',
          width: '150',
          fixed: false
        },
        {
          label: '到付油卡',
          prop: 'arrCardPay',
          width: '150',
          fixed: false
        },
        {
          label: '回付运费',
          prop: 'backSendPay',
          width: '150',
          fixed: false
        },
        {
          label: '回付油卡',
          prop: 'backCardPay',
          width: '150',
          fixed: false
        },
        {
          label: '发站装卸费',
          prop: 'startLoadPay',
          width: '150',
          fixed: false
        },
        {
          label: '发站其他费',
          prop: 'startOtherPay',
          width: '150',
          fixed: false
        },
        {
          label: '到站装卸费',
          prop: 'endLoadPay',
          width: '150',
          fixed: false
        },
        {
          label: '到站其他费',
          prop: 'endOtherPay',
          width: '150',
          fixed: false
        },
        {
          label: '收支方式',
          prop: 'paymentsType',
          width: '150',
          fixed: false
        },
        {
          label: '银行名称',
          prop: 'bankName',
          width: '150',
          fixed: false
        },
        {
          label: '银行卡号',
          prop: 'bankAccount',
          width: '150',
          fixed: false
        },
        {
          label: '开户人',
          prop: 'bankAccountName',
          width: '150',
          fixed: false
        },
        {
          label: '支票号码',
          prop: 'senderCompanyName',
          width: '150',
          fixed: false
        },
        {
          label: '汇款号码',
          prop: 'receivableNumber',
          width: '150',
          fixed: false
        },
        {
          label: '微信号',
          prop: 'wechatAccount',
          width: '150',
          fixed: false
        },
        {
          label: '支付宝号',
          prop: 'alipayAccount',
          width: '150',
          fixed: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    flowId() {
      return this.$route.query.flowId
    },
    shipOrderType() {
      return this.$route.query.shipOrderType
    }
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    setView() {
      // 设置表格视图 
      // 【shipOrderType关联类型（1-运单/2-配载单/3-中转单）】
      if (this.$route.query.shipOrderType) {
        switch (this.shipOrderType) {
          case '1':
          this.tableColumn = this.columnOrder // 运单视图
            break
          case '2':
          this.tableColumn = this.columnBatch // 批次视图
            break
          case '3':
            break
        }
      }else {
        this.tableColumn = this.columnOrder // 没有数据上显示运单视图
      }
    },
    fetchList() {
      if (this.$route.query) {
        this.$set(this.searchQuery.vo, 'flowId', this.flowId)
        postDetailList(this.searchQuery).then(data => {
          this.dataListTop = data.list
        })
        this.setView() // 设置视图
      }
    },
    setTable() {},
    doAction(type) {
      let isShow = false
      if (this.selectedList.length !== 1) {
        isShow = false
        this.$message({ type: 'warning', message: '请选择一条数据' })
      } else {
        isShow = true
      }
      switch (type) {
        case 'income': // 记收入
          this.income()
          break
        case 'expandtiure': // 记支出
          this.expandtiure()
          break
        case 'cancelCount': // 取消结算
          if (isShow) {
            this.cancelCount()
          }
          break
        case 'showCount': // 查看结算单
          if (isShow) {
            this.showCount()
          }
          break
        case 'showDetail':
          if (isShow) {
            this.showDetail()
          }
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待！' })
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待！' })
          break
      }
    },
    cancelCount() {
      this.$confirm('确定要取消【 ' + this.selectedList[0].flowId + ' 】吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postDetailCancel(this.selectedList[0].id).then(data => {
            this.$message({ type: 'success', message: '取消结算操作成功' })
            this.fetchList()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '取消结算操作失败' })
          })
      })

    },
    showCount() {
      this.popVisibleDialog = true
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectedList = list
      this.selectListShipSns = []
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id)
    },
    showDetail() {

    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
<style lang="scss">
.info_tab_row {
  flex-grow: 1;
  height: 50%;
}

</style>
