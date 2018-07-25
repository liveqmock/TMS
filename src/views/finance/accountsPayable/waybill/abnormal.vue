<template>
  <!-- 异常理赔 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-sort" @click="doAction('count')" plain>结算</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
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
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postFindAbnormalList } from '@/api/finance/accountsPayable'
import { parseShipStatus } from '@/utils/dict'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  data() {
    return {
      btnsize: 'mini',
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          // feeType: 10,
          // endTime: '',
          // id: 0,
          // incomePayType: 'PAYABLE',
          // incomePayTypeValue: '',
          // orgAllId: '',
          // senderCompanyName: '',
          // senderName: '',
          // shipFromCityCode: '',
          // shipFromOrgid: 0,
          // shipLoadId: 0,
          // shipLoadIdType: 0,
          // shipSn: '',
          // shipToCityCode: '',
          // startTime: '',
          // status: '',
          // totalFee: 0,
          // totalStatus: '',
          // totalStatusValue: ''
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      loading: false,
      setupTableVisible: false,
      tableColumn: [
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '150',
        fixed: true
      },
      {
        label: '运单号',
        prop: 'shipId',
        width: '120',
        fixed: false
      },
      {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '150',
        fixed: false
      },
      {
        label: '结算状态',
        prop: 'statusName',
        width: '150',
        fixed: false
      },
      {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '150',
        fixed: false
      },
      {
        label: '到达城市',
        prop: 'shipToCityName',
        width: '150',
        fixed: false
      },
      {
        label: '异常理赔',
        prop: 'totalCost',
        width: '150',
        fixed: false
      },
      {
        label: '已结异常理赔',
        prop: 'closeFee',
        width: '150',
        fixed: false
      },
      {
        label: '未结异常理赔',
        prop: 'unpaidFee',
        width: '150',
        fixed: false
      },
      {
        label: '开单日期',
        prop: 'createTime',
        width: '180',
        slot: (scope) => {
            return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
        fixed: false
      },
      {
        label: '发货方',
        prop: 'senderCompanyName',
        width: '150',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '150',
        fixed: false
      },
      {
        label: '收货方',
        prop: 'receiverCompanyName',
        width: '150',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '150',
        fixed: false
      },
        // {
        //   label: '结算操作人',
        //   prop: 'settlementBy',
        //   width: '150',
        //   fixed: false
        // },
      {
        label: '货品名',
        prop: 'cargoName',
        width: '150',
        fixed: false
      },
      {
        label: '件数',
        prop: 'cargoAmount',
        width: '150',
        fixed: false
      },
      {
        label: '重量(kg)',
        prop: 'cargoWeight',
        width: '150',
        fixed: false
      },
      {
        label: '体积(方)',
        prop: 'cargoVolume',
        width: '150',
        fixed: false
      },
      {
        label: '运单标识',
        prop: 'shipIdentifying',
        width: '150',
        fixed: false,
        slot: function(scope) {
            return parseShipStatus(scope.row.shipIdentifying)
          }
      },
        // {
        //   label: '承运商',
        //   prop: 'shipIdentifying',
        //   width: '150',
        //   fixed: false
        // },
        // {
        //   label: '中转送货费',
        //   prop: 'shipIdentifying',
        //   width: '150',
        //   fixed: false
        // },
        // {
        //   label: '中转其他费',
        //   prop: 'shipIdentifying',
        //   width: '150',
        //   fixed: false
        // },
      {
        label: '付款方式',
        prop: 'shipPayWayName',
        width: '150',
        fixed: false
      },
      {
        label: '制单人',
        prop: 'userName',
        width: '150',
        fixed: false
      },
      {
        label: '发货人电话',
        prop: 'senderCustomerMobile',
        width: '150',
        fixed: false
      },
      {
        label: '发货人地址',
        prop: 'senderDetailedAddress',
        width: '150',
        fixed: false
      },
      {
        label: '收货人电话',
        prop: 'receiverCustomerMobile',
        width: '150',
        fixed: false
      },
      {
        label: '收货地址',
        prop: 'receiverDetailedAddress',
        width: '150',
        fixed: false
      },
      {
        label: '交接方式',
        prop: 'shipDeliveryMethod',
        width: '150',
        fixed: false
      },
      {
        label: '时效',
        prop: 'shipEffective',
        width: '150',
        fixed: false
      },
      {
        label: '运单备注',
        prop: 'shipRemarks',
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
      this.selectListShipSns = []
      return postFindAbnormalList(this.searchQuery).then(data => {
        this.dataList = data.list
      })
    },
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'count':
          this.count()
          break
        case 'export':
          break
        case 'print':
          break
      }
    },
    count() {
      this.$router.push({
        path: '../accountsLoad',
        query: {
          currentPage: 'waybillAbnormal', // 本页面标识符
          searchQuery: this.searchQuery, // 搜索项
          selectListShipSns: this.selectListShipSns // 列表选择项的批次号batchNo
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListShipSns = []
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id)
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
