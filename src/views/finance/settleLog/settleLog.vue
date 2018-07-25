<template>
  <!-- 回扣 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort-down" @click="doAction('income')" plain>记收入</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-sort-up" @click="doAction('expandtiure')" plain>记支出</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-sort" @click="doAction('cancelCount')" plain>取消结算</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-tickets" @click="doAction('showCount')" plain>查看结算单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-rank" @click="doAction('showDetail')" plain>查看明细</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="selectedItem" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
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
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postFindLowList, postCancelSettlement } from '@/api/finance/settleLog'
import { mapGetters } from 'vuex'
import Receipt from './components/receipt'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Receipt
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
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
      total: 0,
      dataList: [],
      popVisibleDialog: false,
      loading: false,
      setupTableVisible: false,
      tableColumn: [
      // {
      //     label: '序号',
      //     prop: 'flowId',
      //     width: '180',
      //     fixed: true
      //   },
        {
          label: '结算网点',
          prop: 'orgName',
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
          fixed: true
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
          label: '收支方式',
          prop: 'financialWay',
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
        },
        {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        }
      ]
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
    fetchList() {
      return postFindLowList(this.searchQuery).then(data => {
        this.dataList = data.list
      })
    },
    setTable() {},
    doAction(type) {
      let isShow = false
      if (this.selectedList.length !== 1 && type !== 'income' && type !== 'expandtiure') {
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
            this.$confirm('确定要取消【 ' + this.selectedList[0].flowId + ' 】吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.cancelCount()
            })
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
    income() {
      this.$router.push({
        path: './settleLogIncome',
      })
    },
    expandtiure() {
      this.$router.push({
        path: './settleLogExpandtiure',
      })
    },
    cancelCount() {
      let data = {}
      this.$set(data, 'flowId', this.selectedList[0].flowId)
      postCancelSettlement(data).then(data => {
          this.$message({ type: 'success', message: '取消结算操作成功' })
        })
        .catch(error => {
          this.$message({ type: 'error', message: '取消结算操作失败' })
        })
    },
    showCount() {
      this.tableReceiptInfo = Object.assign([],this.selectedList)
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
    selectedItem(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.showDetail()
    },
    showDetail() {
      if (this.selectedList.length > 0) {
        this.$router.push({
          path: './settleLogDetail',
          query: {
            flowId: this.selectedList[0].flowId,
            shipOrderType: this.selectedList[0].shipOrderType
          }
        })
      }
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
