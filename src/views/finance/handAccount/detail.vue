<template>
<div class="handAccount-manager tab-wrapper tab-wrapper-100">
  <div class="tab-content handAccount-detail" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('print')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
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
              <template slot-scope="scope" v-html="true">
                  {{ column.slot(scope) }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>   
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
  </div>
</template>
<script>
import * as handAccountApi from '@/api/finance/handAccount'
import SearchForm from './components/search2'
import TableSetup from './components/tableSetup'

export default {
  components: {
    SearchForm,
    TableSetup
  },
  mounted() {
    this.searchQuery.vo.userId = this.$route.query.id
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
          'orgid': '',
          status: '',
          endTime: '',
          startTime: '',
          userId: ''
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
        'label': '网点',
        'prop': 'orgName',
        'fixed': true
      }, {
        'label': '员工姓名',
        'prop': 'userName'
      }, {
        'label': '运单号',
        'prop': 'shipSn'
      }, {
        'label': '费用类别',
        'prop': 'feeName'
      }, {
        'label': '金额',
        'prop': 'shipNowpayFee'
      }, {
        'label': '交账状态',
        'prop': 'statusValue',
        'width': '150'
      }, {
        'label': '已交金额',
        'prop': 'finishAccount'
      }, {
        'label': '未交账金额',
        'prop': 'noSettlementFee'
      }, {
        'label': '开单时间',
        'prop': 'createTime'
      }, {
        'label': '出发城市',
        'prop': 'shipFromCityName'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName'
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '发货人',
        'prop': 'senderCustomerName'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      }, {
        'label': '收货人',
        'prop': 'receiverCustomerName'
      }]
    }
  },
  methods: {
    viewDetails(row) {
      this.$router.push({
        path: '/finance/handAccount/detail',
        query: {
          orderid: row.id,
          type: 'view',
          tab: '查看' + row.shipSn
        }
      })
    },
    showDetail(order) {
      this.viewDetails(order)
    },
    fetchAllOrder() {
      this.loading = true
      return handAccountApi.getFeeList(this.searchQuery).then(data => {
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
          handAccountApi.getExportExcel(ids2.join(',')).then(res => {
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
.handAccount-manager .tab-content{
  .tab_info{
    padding-bottom: 10px;
  }
}
</style>

