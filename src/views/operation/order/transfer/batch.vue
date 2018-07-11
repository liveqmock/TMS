<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :isbatch="true" :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="info" :size="btnsize" icon="el-icon-delete" @click="doAction('cancel')" plain>取消中转</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="openAddOrder"
          @selection-change="getSelection"
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
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
    <AddOrder @action="setAction" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddOrderVisible" @close="closeAddOrder" @success="fetchData"  />
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import * as transferManageApi from '@/api/operation/transfer'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddOrder from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { parseTime, uniqArray } from '@/utils/'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddOrder
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgId || this.otherinfo.orgid
    }
  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllTransfer(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
  },
  data() {
    const _this = this
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddOrderVisible: false,
      isModify: false,
      selectInfo: {},
      addCarrierVisible: false,
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgId': 1,
          'transferTimeStart': '',
          'transferTimeEnd': '',
          'ydCreateTimeStart': '',
          'ydCreateTimeEnd': '',
          'carrierId': '',
          'shipFromCityName': '',
          'shipToCityName': ''
        }
      },
      // 默认sort值为true
      tableColumn: [{
        'label': '中转批次',
        'prop': 'transferBatchNo',
        'width': '150',
        'slot': function(scope) {
          return scope.row.transferBatchNo
        }
      }, {
        'label': '中转时间',
        'prop': 'transferTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.transferTime)}`
        }
      }, {
        'label': '承运商',
        'prop': 'carrierName',
        'width': '150'
      }, {
        'label': '承运商电话',
        'prop': 'carrierMobile',
        'width': '150'
      }, {
        'label': '中转件数',
        'prop': 'transferAmount',
        'width': '150'
      }, {
        'label': '中转体积',
        'prop': 'transferVolume',
        'width': '150'
      }, {
        'label': '中转重量',
        'prop': 'transferWeight',
        'width': '150'
      }, {
        'label': '代收货款',
        'prop': 'codService',
        'width': '150'
      }, {
        'label': '中转运费',
        'prop': 'transferCharge',
        'width': '150'
      }, {
        'label': '中转送货费',
        'prop': 'deliveryExpense',
        'width': '150'
      }, {
        'label': '中转费其他费',
        'prop': 'transferOtherFee',
        'width': '150'
      }, {
        'label': '中转费合计',
        'prop': 'totalCost',
        'width': '150'
      }, {
        'label': '中转费付款方式',
        'prop': 'paymentName',
        'width': '150'
      }, {
        'label': '中转备注',
        'prop': 'remark',
        'width': '150'
      }]
    }
  },
  methods: {
    fetchAllTransfer() {
      this.loading = true
      return transferManageApi.getAlreadyTransferBatchList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
        console.log('this.usersArr:', this.usersArr, data)
      })
    },
    fetchData() {
      this.fetchAllTransfer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = obj
      this.loading = false
      this.fetchData()
    },
    setAction(type, val) {
      if (type === 'cancel') {
        this.cancelBatch(val)
      }
    },
    cancelBatch(transferBatchNos) {
      this.$confirm('确定要取消 ' + transferBatchNos.length + ' 条运单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          // 提交前先进行去重
        transferManageApi.deleteTransfer(this.otherinfo.orgid, uniqArray(transferBatchNos).join(','), '').then(res => {
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            this.fetchData()
          }).catch(err => {
            this.$message({
              type: 'info',
              message: '取消失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
            })
          })
      }).catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消:' + JSON.stringify(err)
          })
        })
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'waifa') {
        this.closeAddOrder()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 中转外发
        case 'waifa':
          this.isModify = false
          this.selectInfo = {}
          this.$router.push('/operation/order/transferLoad')
          break
          // 修改中转信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
                  message: '每次只能修改单条数据~',
                  type: 'warning'
                })
          }
          this.selectInfo = this.selected[0]
          this.$router.push({ path: '/operation/order/transferLoad', query: {
            id: this.selectInfo.transferBatchNo
          }})
          break
          // 跟踪中转
        case 'track':
          if (this.selected.length > 1) {
            this.$message({
                      message: '每次只能操作单条数据~',
                      type: 'warning'
                    })
          }
          const id = this.selected[0].id

          this.$router.push({ path: '/operation/order/track', query: {
            transfer: id
          }})
          break
          // 取消中转
        case 'cancel':
          const avaiableItem = this.selected.filter(el => {
            return el.ship_status !== 67
          })
          if (!avaiableItem.length) {
            this.$message.warning('已签收运单不能被取消~')
          } else {
                  // 获取批次
            const transferBatchNos = avaiableItem.map(el => {
                    return el.transferBatchNo
                  })
                  // 获取运单号
            const shipSns = avaiableItem.map(el => {
                    return el.shipSn
                  })

            this.cancelBatch(transferBatchNos)
          }

          break
          // 导出数据
        case 'export':
          const ids2 = this.selected.map(el => {
            return el.customerId
          })
          transferManageApi.getExportExcel(ids2.join(',')).then(res => {
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
    openAddOrder(item) {
      this.selectInfo = item
      this.AddOrderVisible = true
    },
    closeAddOrder() {
      this.AddOrderVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    }
  }
}
</script>
