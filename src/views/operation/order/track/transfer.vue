<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳跟踪 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="setInfo" plain class="table_setup" :disabled="isDisBtn">在途跟踪</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @row-dblclick="setInfo" :key="tablekey">
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
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
      <!-- 在途跟踪 -->
      <editInfoTransfer :orgid="orgid" :id='transferId' :info="trackInfo" :popVisible.sync="editInfoVisible" @close="closeMe"></editInfoTransfer>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import SearchForm from './components/searchTransfer'
import { mapGetters } from 'vuex'
import { postTransferList } from '@/api/operation/track'
import Pager from '@/components/Pagination/index'
import editInfoTransfer from './components/editInfoTransfer'
import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
    editInfoTransfer,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [],
      total: 0,
      isDisBtn: true,
      transferId: 0,
      tablekey: 0,
      selectInfo: [],
      trackInfo: {},
      loading: true,
      editInfoVisible: false,
      setupTableVisible: false,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: 0
          // batchNo: '',
          // batchTypeId: '',
          // deliveryBatchType: '',
          // dirverName: '',
          // endTime: '',
          // mainBatchType: '',
          // shortBatchType: '',
          // startTime: '',
          // truckIdNumber: ''
        }
      },
      tableColumn: [{
          label: "开单网点",
          prop: "shipFromOrgid",
          width: "110"
        },
        {
          label: "承运商",
          prop: "carrierName",
          width: "120"
        },
        {
          label: "承运商电话",
          prop: "carrierMobile",
          width: "120"
        },
        {
          label: "到站电话",
          prop: "arrivalMobile",
          width: "120"
        },
        {
          label: "运单状态",
          prop: "shipStatusName",
          width: "120"
        },
        {
          label: "运单号",
          prop: "shipSn",
          width: "120"
        },
        {
          label: "中转单号",
          prop: "oddNumbers",
          width: "120"
        },
        // {
        //   label: "中转批次",
        //   prop: "batchTypeId",
        //   width: "120"
        // },
        {
          label: "开单时间",
          prop: "createTime",
          width: "120",
          slot: (scope) => {
            return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "中转时间",
          prop: "transferTime",
          width: "120",
          slot: (scope) => {
            return `${parseTime(scope.row.transferTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "中转运费",
          prop: "transferCharge",
          width: "120"
        },
        {
          label: "中转送货费",
          prop: "deliveryExpense",
          width: "120"
        },
        // {
        //   label: "中转费其他费",
        //   prop: "batchTypeId",
        //   width: "120"
        // },
        {
          label: "中转费合计",
          prop: "totalCost",
          width: "120"
        },
        {
          label: "中转付款方式",
          prop: "paymentId",
          width: "120"
        },
        {
          label: "代收货款",
          prop: "codService",
          width: "120"
        },
        {
          label: "发货人",
          prop: "senderName",
          width: "120"
        },
        {
          label: "发货人电话",
          prop: "senderMobile",
          width: "120"
        },
        {
          label: "收货人",
          prop: "receiverName",
          width: "120"
        },
        {
          label: "收货人电话",
          prop: "receiverMobile",
          width: "120"
        },
        {
          label: "出发城市",
          prop: "shipFromCityCode",
          width: "120"
        },
        {
          label: "到达城市",
          prop: "shipToCityCode",
          width: "120"
        },
        {
          label: "货物名称",
          prop: "cargoName",
          width: "120"
        },
        {
          label: "件数",
          prop: "cargoAmount",
          width: "120"
        },
        {
          label: "重量",
          prop: "cargoWeight",
          width: "120"
        },
        {
          label: "体积",
          prop: "cargoVolume",
          width: "120"
        },
        {
          label: "包装",
          prop: "cargoPack",
          width: "120"
        },
        {
          label: "运单备注",
          prop: "shipRemarks",
          width: "120"
        },
        {
          label: "中转备注",
          prop: "remark",
          width: "120"
        },
        {
          label: "发货单位",
          prop: "senderUnit",
          width: "120"
        },
        {
          label: "发货地址",
          prop: "senderAddr",
          width: "120"
        }, {
          label: "收货单位",
          prop: "receiverUnit",
          width: "120"
        },
        {
          label: "收货地址",
          prop: "receiverAddr",
          width: "120"
        },
        {
          label: "运费",
          prop: "shipFee",
          width: "120"
        },
        {
          label: "交接方式",
          prop: "shipDeliveryMethod",
          width: "120"
        },
        {
          label: "货号",
          prop: "shipGoodsSn",
          width: "120"
        },
        {
          label: "品种规格",
          prop: "description",
          width: "120"
        },
        {
          label: "重量单价",
          prop: "weightFee",
          width: "120"
        },
        {
          label: "体积单价",
          prop: "volumeFee",
          width: "120"
        },
        /*{
          label: "件数单价",
          prop: "batchTypeId",
          width: "120"
        },*/
        // {
        //   label: "等通知放货",
        //   prop: "batchTypeId",
        //   width: "120"
        // },
        {
          label: "回单要求",
          prop: "shipReceiptRequire",
          width: "120"
        },
        {
          label: "回单份数",
          prop: "shipReceiptNum",
          width: "120"
        },
        {
          label: "代收款手续费",
          prop: "commissionFee",
          width: "120"
        },
        {
          label: "付款方式",
          prop: "shipPayWay",
          width: "120"
        },
        {
          label: "现付",
          prop: "shipNowpayFee",
          width: "120"
        },
        {
          label: "到付",
          prop: "shipArrivepayFee",
          width: "120"
        },
        {
          label: "回单付",
          prop: "shipReceiptpayFee",
          width: "120"
        },
        {
          label: "月结",
          prop: "shipMonthpayFee",
          width: "120"
        },
        {
          label: "运费合计",
          prop: "shipTotalFee",
          width: "120"
        },
        {
          label: "制单人",
          prop: "name",
          width: "120"
        },
        {
          label: "回扣",
          prop: "brokerageFee",
          width: "120"
        },
        //  {
        //   label: "客户单号",
        //   prop: "batchTypeId",
        //   width: "120"
        // },
        {
          label: "送货费",
          prop: "deliveryFee",
          width: "120"
        },
        {
          label: "声明价值",
          prop: "productPrice",
          width: "120"
        },
        {
          label: "保险费",
          prop: "insuranceFee",
          width: "120"
        },
        {
          label: "装卸费",
          prop: "handlingFee",
          width: "120"
        },
        {
          label: "包装费",
          prop: "packageFee",
          width: "120"
        },
        {
          label: "提货费",
          prop: "pickupFee",
          width: "120"
        },
        {
          label: "实际提货费",
          prop: "realityhandlingFee",
          width: "120"
        },
        {
          label: "上楼费",
          prop: "goupstairsFee",
          width: "120"
        },
        {
          label: "报关费",
          prop: "customsFee",
          width: "120"
        },
        {
          label: "其他费收入",
          prop: "otherfeeIn",
          width: "120"
        },
        {
          label: "其他费支出",
          prop: "otherfeeOut",
          width: "120"
        }
      ]
    }
  },
  activated() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
        // this.searchQuery.vo.loadTypeId = 39
      }
      this.fetchList()
    },
    getSelection(list) {
      if (this.$route.query.transfer) {
        this.transferId = Number(this.this.$route.query.transfer)
      } else {
        if (list.length === 1) {
          this.selectInfo = Object.assign([], list)
          this.isDisBtn = false
          let tid = this.selectInfo[0].transferId
          this.trackId = tid
          this.trackInfo = Object.assign({}, this.selectInfo[0])
        } else if (list.length > 1) {
          this.$message({ type: 'warning', message: '只能选择一条数据进行跟踪设置' })
          this.isDisBtn = true
        } else {
          this.isDisBtn = true
        }
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setInfo() {
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    closeMe() {
      this.editInfoVisible = false
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      postTransferList(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
          this.searchQuery.vo = {}
        } else {
          this.loading = false
        }
      })
      this.isTransferTrack()
    },
    isTransferTrack() {
      if (this.$route.query.transfer) {
        console.log('transfer', this.$route.query.transfer)
        this.setInfo()
      } else {
        this.closeMe()
      }
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
