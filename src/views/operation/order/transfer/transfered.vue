<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('waifa')">中转外发</el-button>
          <el-button type="info" :size="btnsize" icon="el-icon-delete" @click="doAction('cancel')" plain>取消中转</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('track')" plain>中转跟踪</el-button>
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
    <AddOrder :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddOrderVisible" @close="closeAddOrder" @success="fetchData"  />
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
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllTransfer(this.otherinfo.orgid).then(res => {
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
        'label': '开单网点',
        'prop': 'shipFromOrgName',
        'width': '150'
      }, {
        'label': '承运商',
        'prop': 'carrierName',
        'width': '150'
      }, {
        'label': '承运商电话',
        'prop': 'carrierMobile',
        'width': '150'
      }, {
        'label': '到站电话',
        'prop': 'arrivalMobile',
        'width': '150'
      }, {
        'label': '运单状态',
        'prop': 'shipStatusName',
        'width': '120',
        'fixed': true
      }, {
        'label': '运单号',
        'prop': 'shipSn',
        'width': '100',
        'fixed': true
      }, {
        'label': '中转单号',
        'prop': 'oddNumbers',
        'width': '150',
        'fixed': true
      }, {
        'label': '中转批次',
        'prop': 'transferBatchNo',
        'width': '150',
        'fixed': true
      }, {
        'label': '开单时间',
        'prop': 'ydCreateTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.ydCreateTime)}`
        }
      }, {
        'label': '中转时间',
        'prop': 'transferTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.transferTime)}`
        }
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
        'label': '代收货款',
        'prop': 'codService',
        'width': '150'
      }, {
        'label': '发货人',
        'prop': 'shipSenderName',
        'width': '150'
      }, {
        'label': '发货人电话',
        'prop': 'shipSenderMobile',
        'width': '150'
      }, {
        'label': '收货人',
        'prop': 'shipReceiverName',
        'width': '150'
      }, {
        'label': '收货人电话',
        'prop': 'shipReceiverMobile',
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
        'label': '货品名',
        'prop': 'cargoName',
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
        'label': '包装',
        'prop': 'cargoPack',
        'width': '150'
      }, {
        'label': '运单备注',
        'prop': 'shipRemarks',
        'width': '150'
      }, {
        'label': '中转备注',
        'prop': 'remark',
        'width': '150'
      }, {
        'label': '到达省',
        'prop': 'shipToCityName',
        'width': '150',
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[0]
        }
      }, {
        'label': '到达市',
        'prop': 'shipToCityName',
        'width': '150',
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[1]
        }
      }, {
        'label': '到达县区',
        'prop': 'shipToCityName',
        'width': '150',
        slot: function(scope) {
          return scope.row.shipToCityName.split(',')[2]
        }
      }, {
        'label': '发货方',
        'prop': 'sendCustomerUnit',
        'width': '150'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit',
        'width': '150'
      }, {
        'label': '发货人地址',
        'prop': 'sendDetailedAddress',
        'width': '150'
      }, {
        'label': '收货人地址',
        'prop': 'receiverDetailedAddress',
        'width': '150'
      }, {
        'label': '运费',
        'prop': 'shipFee',
        'width': '150'
      }, {
        'label': '目的网点',
        'prop': 'shipToOrgName',
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
        'label': '品种规格',
        'prop': 'description',
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
        'label': '等通知放货',
        'prop': 'cgStatus',
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
        'label': '制单人',
        'prop': 'shipUserName',
        'width': '150'
      }, {
        'label': '回单号',
        'prop': 'shipReceiptNum',
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
        'prop': 'realityhandlingFee',
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
      }]
    }
  },
  methods: {
    fetchAllTransfer() {
      this.loading = true
      return transferManageApi.getAlreadyTransferList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
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
            transferId: this.selectInfo.transferBatchNo,
            tab: '中转' + this.selectInfo.transferBatchNo
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
                    return el.id
                  })

            this.$confirm('确定要取消 ' + avaiableItem.length + ' 条运单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      // 提交前先进行去重
                  transferManageApi.deleteTransfer(this.otherinfo.orgid, uniqArray(transferBatchNos).join(','), uniqArray(shipSns).join(',')).then(res => {
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
    }
  }
}
</script>
