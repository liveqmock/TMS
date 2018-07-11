<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
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
          @row-dblclick="showDetail"
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
              <template slot-scope="scope" v-html="true">
                  {{ column.slot(scope) }}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import orderManageApi from '@/api/operation/orderManage'
import SearchForm from './components/search2'
import TableSetup from './components/tableSetup'
import AddOrder from './components/add'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index'

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
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllOrder(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
  },
  data() {
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
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'shipFromOrgid': 1,
          startTime: '',
          shipDelete: 3,
          endTime: ''
        }
      },
      // 默认sort值为true
      tableColumn: [{
        'label': '运单号',
        'prop': 'shipSn',
        'width': '100',
        'fixed': true
      }, {
        'label': '运单状态',
        'prop': 'shipStatusName',
        'width': '120',
        'fixed': true
      }, {
        'label': '运单标识',
        'prop': 'shipIdentifying',
        'width': '150'
      }, {
        'label': '开单网点',
        'prop': 'fromOrgName',
        'width': '150'
      }, {
        'label': '目的网点',
        'prop': 'toOrgName',
        'width': '150'
      }, {
        'label': '开单时间',
        'prop': 'createTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.createTime, '{y}{m}{d}')}`
        }
      }, {
        'label': '发货人',
        'prop': 'senderCustomerName',
        'width': '150'
      }, {
        'label': '发货人电话',
        'prop': 'senderCustomerMobile',
        'width': '150'
      }, {
        'label': '收货人',
        'prop': 'receiverCustomerName',
        'width': '150'
      }, {
        'label': '收货人电话',
        'prop': 'receiverCustomerMobile',
        'width': '150'
      }, {
        'label': '交接方式',
        'prop': 'shipDeliveryMethodName',
        'width': '150'
      }, {
        'label': '货号',
        'prop': 'shipGoodsSn',
        'width': '150'
      }, {
        'label': '货品名',
        'prop': 'cargoName',
        'width': '150'
      }, {
        'label': '品种规格',
        'prop': 'description',
        'width': '150'
      }, {
        'label': '件数',
        'prop': 'cargoAmount',
        'width': '150'
      }, {
        'label': '重量',
        'prop': 'cargoWeight',
        'width': '150'
      }, {
        'label': '体积',
        'prop': 'cargoVolume',
        'width': '150'
      }, {
        'label': '件数单价',
        'prop': 'amountFee',
        'width': '150'
      }, {
        'label': '重量单价',
        'prop': 'weightFee',
        'width': '150'
      }, {
        'label': '体积单价',
        'prop': 'volumeFee',
        'width': '150'
      }, {
        'label': '出发城市',
        'prop': 'shipFromCityName',
        'width': '150'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName',
        'width': '150'
      }, {
        'label': '等通知放货',
        'prop': 'shipIsControll',
        'width': '150'
      }, {
        'label': '回单要求',
        'prop': 'shipReceiptRequireName',
        'width': '150'
      }, {
        'label': '回单份数',
        'prop': 'shipReceiptNum',
        'width': '150'
      }, {
        'label': '代收款',
        'prop': 'agencyFund',
        'width': '150'
      }, {
        'label': '付款方式',
        'prop': 'shipPayWayName',
        'width': '150'
      }, {
        'label': '现付',
        'prop': 'shipNowpayFee',
        'width': '150'
      }, {
        'label': '到付',
        'prop': 'shipArrivepayFee',
        'width': '150'
      }, {
        'label': '回单付',
        'prop': 'shipReceiptpayFee',
        'width': '150'
      }, {
        'label': '月结',
        'prop': 'shipMonthpayFee',
        'width': '150'
      }, {
        'label': '运费合计',
        'prop': 'shipTotalFee',
        'width': '150'
      }, {
        'label': '备注',
        'prop': 'shipRemarks',
        'width': '150'
      }, {
        'label': '制单人',
        'prop': 'userName',
        'width': '150'
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit',
        'width': '150'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit',
        'width': '150'
      }, {
        'label': '发货人地址',
        'prop': 'senderDetailedAddress',
        'width': '150'
      }, {
        'label': '收货人地址',
        'prop': 'receiverDetailedAddress',
        'width': '150'
      }, {
        'label': '回单号',
        'prop': 'shipReceiptSn',
        'width': '150'
      }, {
        'label': '回扣',
        'prop': 'brokerageFee',
        'width': '150'
      }, {
        'label': '客户单号',
        'prop': 'shipCustomerNumber',
        'width': '150'
      }, {
        'label': '运输方式',
        'prop': 'shipShippingTypeName',
        'width': '150'
      }, {
        'label': '业务类型',
        'prop': 'shipBusinessTypeName',
        'width': '150'
      }, {
        'label': '时效',
        'prop': 'shipEffectiveName',
        'width': '150'
      }, {
        'label': '提货批次',
        'prop': 'pickupBatchNumber',
        'width': '150'
      }, {
        'label': '提货司机名',
        'prop': 'driverName',
        'width': '150'
      }, {
        'label': '提货车牌',
        'prop': 'truckIdNumber',
        'width': '150'
      }, {
        'label': '送货费',
        'prop': 'deliveryFee',
        'width': '150'
      }, {
        'label': '代收款手续费',
        'prop': 'commissionFee',
        'width': '150'
      }, {
        'label': '声明价值',
        'prop': 'productPrice',
        'width': '150'
      }, {
        'label': '保险费',
        'prop': 'insuranceFee',
        'width': '150'
      }, {
        'label': '装卸费',
        'prop': 'handlingFee',
        'width': '150'
      }, {
        'label': '包装费',
        'prop': 'packageFee',
        'width': '150'
      }, {
        'label': '提货费',
        'prop': 'pickupFee',
        'width': '150'
      }, {
        'label': '上楼费',
        'prop': 'goupstairsFee',
        'width': '150'
      }, {
        'label': '实际提货费',
        'prop': 'shipSn',
        'width': '150'
      }, {
        'label': '叉车费',
        'prop': 'forkliftFee',
        'width': '150'
      }, {
        'label': '报关费',
        'prop': 'customsFee',
        'width': '150'
      }, {
        'label': '其他费收入',
        'prop': 'otherfeeIn',
        'width': '150'
      }, {
        'label': '其他费支出',
        'prop': 'otherfeeOut',
        'width': '150'
      }, {
        'label': '税率',
        'prop': 'taxRate',
        'width': '150'
      }, {
        'label': '税金',
        'prop': 'taxes',
        'width': '150'
      }, {
        'label': '入仓费',
        'prop': 'housingFee',
        'width': '150'
      }, {
        'label': '印花税',
        'prop': 'stampTax',
        'width': '150'
      }]
    }
  },
  methods: {
    fetchAllOrder() {
      this.loading = true
      return orderManageApi.getAllShip(this.searchQuery).then(data => {
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
        this.closeAddOrder()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.openAddOrder()
          break
          // 修改运单信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
                  message: '每次只能修改单条数据~',
                  type: 'warning'
                })
          }
          this.selectInfo = this.selected[0]
          this.openAddOrder()
          break
          // 删除运单
        case 'delete':
          if (this.selected.length > 1) {
            this.$message({
                      message: '每次只能操作单条数据~',
                      type: 'warning'
                    })
          }
          const deleteItem = this.selected[0].shipSn
          const id = this.selected[0].id

          this.$confirm('确定要删除 ' + deleteItem + ' 运单吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
                    orderManageApi.deleteOrderInfoById(id).then(res => {
                      this.$message({
                          type: 'success',
                          message: '删除成功!'
                        })
                      this.fetchData()
                    }).catch(err => {
                        this.$message({
                          type: 'info',
                          message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
                        })
                      })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除'
                    })
                  })
          break
          // 作废运单
        case 'cancel':
          if (this.selected.length > 1) {
            this.$message({
                  message: '每次只能操作单条数据~',
                  type: 'warning'
                })
          }
          const cancelItem = this.selected[0].shipSn
          const theid = this.selected[0].id
          this.$confirm('确定要作废 ' + cancelItem + ' 运单吗？', '提示', {
            confirmButtonText: '作废',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
                orderManageApi.deleteCancleOrderById(theid).then(res => {
                      this.$message({
                          type: 'success',
                          message: '作废成功!'
                        })
                      this.fetchData()
                    }).catch(err => {
                        this.$message({
                          type: 'info',
                          message: '作废失败，原因：' + err.errorInfo ? err.errorInfo : err
                        })
                      })
              }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消作废'
                    })
                  })
          break
          // 导出数据
        case 'export':
          const ids2 = this.selected.map(el => {
            return el.customerId
          })
          orderManageApi.getExportExcel(ids2.join(',')).then(res => {
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
    openAddOrder() {
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
    },
    showDetail(order) {
      // 当为草稿时，双击表示查看并可修改创建
      this.eventBus.$emit('showCreateOrder', {
        orderid: order.id
      })
    }
  }
}
</script>

