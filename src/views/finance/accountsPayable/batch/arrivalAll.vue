<template>
  <!-- 到车汇总 -->
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
import SearchForm from './components/searchArtery'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postPayListBySummary } from '@/api/finance/accountsPayable'
import { mapGetters } from 'vuex'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      btnsize: 'mini',
      sign: 2, // 2-到车汇总
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          // sign: 1,
          // orgid: 1,
          // ascriptionOrgid: 1,
          status: 'NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT'
          // loadStartTime: '',
          // loadEndTime: '',
          // departureStartTime: '',
          // departureEndTime: '',
          // batchNo: '',
          // truckIdNumber: '',
          // dirverName: ''
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      loading: false,
      setupTableVisible: false,
      tableColumn: [
      {
          label: '序号',
          prop: 'id',
          width: '110',
          fixed: true
        },
        {
          label: '发车批次',
          prop: 'batchNo',
          width: '150',
          fixed: true
        },
        {
          label: '批次状态',
          prop: 'batchTypeName',
          width: '150',
          fixed: false
        },
        {
          label: '发车网点',
          prop: 'orgName',
          width: "120",
          fixed: false
        },
        {
          label: '到达网点',
          prop: 'arriveOrgName',
          width: '150',
          fixed: false
        },
        {
          label: '发车时间',
          prop: 'departureTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '到达时间',
          prop: 'receivingTime',
          width: '180',
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: '到付运费',
          prop: 'nowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结到付运费',
          prop: 'paidNowpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结到付运费',
          prop: 'unpaidNowpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '到付油卡',
          prop: 'nowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结到付油卡',
          prop: 'paidNowpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结到付油卡',
          prop: 'unpaidNowpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '到站装卸费',
          prop: 'backpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '已结到站装卸费',
          prop: 'paidBackpayCarriage',
          width: '180',
          fixed: false
        },
        {
          label: '未结到站装卸费',
          prop: 'unpaidBackpayCarriage',
          width: '150',
          fixed: false
        },
        {
          label: '到站其他费',
          prop: 'backpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '已结到站其他费',
          prop: 'paidBackpayOilCard',
          width: '180',
          fixed: false
        },
        {
          label: '未结到站其他运费',
          prop: 'unpaidBackpayOilCard',
          width: '150',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '150',
          fixed: false
        },
        {
          label: '司机名称',
          prop: 'dirverName',
          width: '150',
          fixed: false
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '150',
          fixed: false
        },
        {
          label: '配载件数',
          prop: 'loadAmountall',
          width: '150',
          fixed: false
        },
        {
          label: '配载重量',
          prop: 'loadWeightall',
          width: '150',
          fixed: false
        },
        {
          label: '配载体积',
          prop: 'loadVolumeall',
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
      // this.$set(this.searchQuery.vo, 'sign', this.sign)
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchList() {
      this.$set(this.searchQuery.vo, 'sign', this.sign)
      this.$set(this.searchQuery.vo, 'orgid', this.otherinfo.orgid)
      this.$set(this.searchQuery.vo, 'ascriptionOrgid', this.otherinfo.orgid)
      return postPayListBySummary(this.searchQuery).then(data => {
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
          currentPage: 'batchArrivalAll', // 本页面标识符
          searchQuery: this.searchQuery, // 搜索项
          selectListBatchNos: this.selectListBatchNos // 列表选择项的批次号batchNo
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectListBatchNos = []
      list.forEach((e, index) => {
        this.selectListBatchNos.push(e.batchNo)
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
