<template>
  <div class="tab-content accountsReceivable-summary" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="success" :size="btnsize" icon="el-icon-sort" @click="viewDetails(selected)" plain>结算</el-button>
          
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="showDetail"
          @selection-change="getSelection"
          height="100%"
          show-summary
          :summary-method="getSummaries"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          
          <el-table-column
            fixed
            sortable
            type="selection"
            width="80">
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
                  <div class="td-slot" v-html="column.slot(scope)"></div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>   
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import * as accountApi from '@/api/finance/accountsReceivable'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import Pager from '@/components/Pagination/index'
import { parseDict, parseShipStatus } from '@/utils/dict'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  mounted() {
    // this.loading = false
  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          shipFromOrgid: '',
          endTime: '',
          startTime: '',
          senderName: '',
          senderCompanyName: '',
          shipFromCityCode: '',
          shipToCityCode: '',
          orgAllId: '',
          shipSn: '',
          'status': 'NOSETTLEMENT',
          'feeType': 1
        }
      },
      // 默认sort值为true
      tableColumn: [{
        'label': '序号',
        'prop': '',
        'fixed': true,
        'slot': function(scope) {
          return scope.$index + 1
        }
      }, {
        'label': '开单网点',
        'prop': 'shipFromOrgName',
        'fixed': true
      }, {
        'label': '运单号',
        'prop': 'shipSn',
        width: 120
      }, {
        'label': '货号',
        'prop': 'shipGoodsSn',
        'width': '150'
      }, {
        'label': '运单标识',
        'prop': 'shipIdentifying',
        slot: function(scope) {
          return parseShipStatus(scope.row.shipIdentifying)
        }
      }, {
        'label': '出发城市',
        'prop': 'shipFromCityName'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName'
      }, {
        'label': '结算状态',
        'prop': 'nowPayState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.nowPayState)
        }
      }, {
        'label': '现付',
        'prop': 'nowPayFee'
      }, {
        'label': '已结现付',
        'prop': 'finishNowPayFee'
      }, {
        'label': '未结现付',
        'prop': 'notNowPayFee'
      }, {
        'label': '到付',
        'prop': 'arrivepayFee'
      }, {
        'label': '已结到付',
        'prop': 'finishArrivepayFee'
      }, {
        'label': '未结到付',
        'prop': 'notArrivepayFee'
      }, {
        'label': '回单付',
        'prop': 'receiptpayFee'
      }, {
        'label': '已结回单付',
        'prop': 'finishReceiptpayFee'
      }, {
        'label': '未结回单付',
        'prop': 'notReceiptpayFee'
      }, {
        'label': '月结',
        'prop': 'monthpayFee'
      }, {
        'label': '已结月结',
        'prop': 'finishMonthpayFee'
      }, {
        'label': '未结月结',
        'prop': 'notMonthpayFee'
      }, {
        'label': '开单日期',
        'prop': 'createTime',
        width: 180
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '发货人',
        'prop': 'shipSenderName'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      }, {
        'label': '收货人',
        'prop': 'shipReceiverName'
      }, {
        'label': '货品名',
        'prop': 'cargoName'
      }, {
        'label': '件数',
        'prop': 'cargoAmount'
      }, {
        'label': '重量(kg)',
        'prop': 'cargoWeight'
      }, {
        'label': '体积(方)',
        'prop': 'cargoVolume'
      }, {
        'label': '付款方式',
        'prop': 'shipPayWay'
      }, {
        'label': '制单人',
        'prop': 'userName'
      }, {
        'label': '发货人电话',
        'prop': 'senderMobile'
      }, {
        'label': '发货人地址',
        'prop': 'senderAddr'
      }, {
        'label': '收货人电话',
        'prop': 'receiverMoblie'
      }, {
        'label': '收货地址',
        'prop': 'receiverAddr'
      }, {
        'label': '交接方式',
        'prop': 'shipDeliveryMethod'
      }, {
        'label': '时效',
        'prop': 'shipEffective'
      }, {
        'label': '运单备注',
        'prop': 'shipRemarks'
      }]
    }
  },
  methods: {
    viewDetails(row) {
      row = row || []
      console.log('row:', row.map(el => { console.log('11') }).join(','))
      this.$router.push({
        path: '/finance/accountsLoadReceivable',
        query: {
          searchQuery: this.searchQuery,
          currentPage: 'cash',
         // id: row.map(el => el.shipId).join(','),
          selectListShipSns: row.map(el => el.shipSn)
        }
      })
    },
    showDetail(order) {
      this.viewDetails([order])
    },
    fetchAllOrder() {
      this.loading = true
      return accountApi.getReceivableList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'detail':
          this.isModify = false
          this.selectInfo = {}
          this.showDetail(this.selected[0])
          break
          // 导出数据
        case 'export':
          var ids2 = this.selected.map(el => {
            return el.customerId
          })
          accountApi.getExportExcel(ids2.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '即将自动下载!'
            })
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    // 计算总数
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      // console.log(columns, data)
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
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
          sums[index] += ' 元'
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
.accountsReceivable-manager .tab-content{
  .tab_info{
    padding-bottom: 10px;
  }
}
</style>
