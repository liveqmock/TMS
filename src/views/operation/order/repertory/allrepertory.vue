<template>
  <div class="tab-content" v-loading="loading">
    <!-- 库存总表 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-menu" plain @click="doAction('colorpicker')">提醒颜色设置</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="showDetail" :data="repertoryArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :row-style="tableRowColor" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
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
      <!-- 颜色设置弹出框 -->
      <Colorpicker :popVisible="colorpickerVisible" :reportors="reportorSelect" @close="closeColorpicker" @success="setColumColor"></Colorpicker>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import { postAllOrderRepertory } from '@/api/operation/repertory'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
import Colorpicker from './components/colorpicker'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime } from '@/utils/index'
export default {
  components: {
    Pager,
    SearchForm,
    Colorpicker,
    TableSetup
  },
  data() {
    return {
      isFix: false,
      total: 0,
      tablekey: '',
      btnsize: 'mini',
      setupTableVisible: false,
      repertoryArr: [],
      selected: [],
      loading: true,
      colorpickerVisible: false,
      isModify: false,
      selectInfo: [],
      selectionColorSetting: {},
      reportorSelect: {},
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: 1
        }
      },
      tableColumn: [{
          label: "运单号",
          prop: "shipSn",
          width: "150",
          fixed: true
        },
        {
          label: "运单状态",
          prop: "shipStatusName",
          width: "120",
          fixed: false
        },
        {
          label: "运单标识",
          prop: "shipIdentifying",
          width: "120",
          fixed: false
        },
        {
          label: "入库时间",
          prop: "repertoryCreateTime",
          width: "180",
          // slot: (scope) => {
          //   return `${parseTime(scope.row.repertoryCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
          fixed: false
        },
        {
          label: "库存时长",
          prop: "hashours",
          width: "120",
          fixed: false
        },
        {
          label: "开单网点",
          prop: "fromOrgName",
          width: "120",
          fixed: false
        },
        {
          label: "开单时间",
          prop: "createTime",
          width: "180",
          // slot: (scope) => {
          //   return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
          fixed: false
        },
        {
          label: "货品名",
          prop: "cargoName",
          width: "120",
          fixed: false
        },
        {
          label: "库存件数",
          prop: "repertoryAmount",
          width: "120",
          fixed: false
        },
        {
          label: "库存重量",
          prop: "repertoryWeight",
          width: "120",
          fixed: false
        },
        {
          label: "库存体积",
          prop: "repertoryVolume",
          width: "120",
          fixed: false
        },
        {
          label: "运单件数",
          prop: "cargoAmount",
          width: "120",
          fixed: false
        },
        {
          label: "运单重量",
          prop: "cargoWeight",
          width: "120",
          fixed: false
        },
        {
          label: "运单体积",
          prop: "cargoVolume",
          width: "120",
          fixed: false
        },
        {
          label: "出发城市",
          prop: "shipFromCityName",
          width: "150",
          fixed: false
        },
        {
          label: "到达城市",
          prop: "shipToCityName",
          width: "150",
          fixed: false
        },
        {
          label: "发货人",
          prop: "shipShippingTypeName",
          width: "120",
          fixed: false
        },
        {
          label: "发货人电话",
          prop: "receiverCustomerMobile",
          width: "120",
          fixed: false
        },
        {
          label: "收货人",
          prop: "shipReceiverId",
          width: "120",
          fixed: false
        },
        {
          label: "收货人电话",
          prop: "senderCustomerMobile",
          width: "120",
          fixed: false
        },
        {
          label: "交接方式",
          prop: "shipDeliveryMethodName",
          width: "120",
          fixed: false
        },
        {
          label: "运费",
          prop: "shipTotalFee",
          width: "120",
          fixed: false
        },
        {
          label: "提货费",
          prop: "pickupFee",
          width: "120",
          fixed: false
        },
        // {
        //   label: "实际提货费",
        //   prop: "realityhandlingFee",
        //   width: "120"
        // },
        {
          label: "回扣",
          prop: "brokerageFee",
          width: "120",
          fixed: false
        },
        {
          label: "保险费",
          prop: "insuranceFee",
          width: "120",
          fixed: false
        },
        {
          label: "声明价值",
          prop: "productPrice",
          width: "120",
          fixed: false
        },
        {
          label: "包装费",
          prop: "packageFee",
          width: "120",
          fixed: false
        },
        {
          label: "送货费",
          prop: "deliveryFee",
          width: "120",
          fixed: false
        },
        {
          label: "运费合计",
          prop: "shipTotalFee",
          width: "120",
          fixed: false
        },
        {
          label: "付款方式",
          prop: "shipPayWayName",
          width: "120",
          fixed: false
        },
        {
          label: "现付",
          prop: "shipNowpayFee",
          width: "120",
          fixed: false
        },
        {
          label: "到付",
          prop: "shipArrivepayFee",
          width: "120",
          fixed: false
        },
        {
          label: "回单付",
          prop: "shipReceiptpayFee",
          width: "120",
          fixed: false
        },
        {
          label: "月结",
          prop: "shipMonthpayFee",
          width: "120",
          fixed: false
        },
        {
          label: "备注",
          prop: "shipRemarks",
          width: "120",
          fixed: false
        },
        // {
        //   label: "到达省",
        //   prop: "orgId",
        //   width: "120"
        // },
        // {
        //   label: "到达市",
        //   prop: "orgId",
        //   width: "120"
        // },
        // {
        //   label: "到达县区",
        //   prop: "orgId",
        //   width: "120"
        // },
        {
          label: "发货方",
          prop: "shipSenderId",
          width: "120",
          fixed: false
        },
        {
          label: "发货地址",
          prop: "senderDetailedAddress",
          width: "150",
          fixed: false
        },
        {
          label: "发货方",
          prop: "shipSenderId",
          width: "120",
          fixed: false
        },
        {
          label: "收货方",
          prop: "shipReceiverId",
          width: "120",
          fixed: false
        },
        {
          label: "收货地址",
          prop: "receiverDetailedAddress",
          width: "120",
          fixed: false
        },
        {
          label: "货号",
          prop: "shipGoodsSn",
          width: "120",
          fixed: false
        },
        {
          label: "品种规格",
          prop: "description",
          width: "120",
          fixed: false
        },
        {
          label: "件数单价",
          prop: "amountFee",
          width: "120",
          fixed: false
        },
        {
          label: "重量单价",
          prop: "weightFee",
          width: "120",
          fixed: false
        },
        {
          label: "体积单价",
          prop: "volumeFee",
          width: "120",
          fixed: false
        },
        {
          label: "回单号",
          prop: "shipReceiptSn",
          width: "120",
          fixed: false
        },
        {
          label: "回单要求",
          prop: "shipReceiptRequireName",
          width: "120",
          fixed: false
        },
        {
          label: "回单份数",
          prop: "shipReceiptNum",
          width: "120",
          fixed: false
        },
        {
          label: "代收款手续费",
          prop: "commissionFee",
          width: "120",
          fixed: false
        },
        // {
        //   label: "制单人",
        //   prop: "userName",
        //   width: "120"
        // },
        {
          label: "客户单号",
          prop: "shipCustomerNumber",
          width: "120",
          fixed: false
        },
        {
          label: "运输方式",
          prop: "shipShippingTypeName",
          width: "120",
          fixed: false
        },
        {
          label: "业务类型",
          prop: "shipBusinessType",
          width: "120",
          fixed: false
        },
        {
          label: "是时效",
          prop: "shipEffectiveName",
          width: "120",
          fixed: false
        },
        {
          label: "上楼费",
          prop: "goupstairsFee",
          width: "120",
          fixed: false
        },
        {
          label: "叉车费",
          prop: "forkliftFee",
          width: "120",
          fixed: false
        },
        {
          label: "装卸费",
          prop: "handlingFee",
          width: "120",
          fixed: false
        },
        // {
        //   label: "实际装卸费",
        //   prop: "realityhandlingFee",
        //   width: "120"
        // },
        {
          label: "入仓费",
          prop: "housingFee",
          width: "120",
          fixed: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgId || this.otherinfo.orgid
    }
  },
  mounted() {
    this.initTable()
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    // this.fetchAllOrderRepertory()
  },
  methods: {
    showDetail(order) {
      this.eventBus.$emit('showOrderDetail', order.shipId)
      console.log(order.shipId)
    },
    initTable() {
      // let strArray = this.$refs.multipleTable.$children
      let strArray = this.$refs.multipleTable.columns
      console.log(this.$refs.multipleTable)
      this.$refs.multipleTable.columns.forEach((e, index) => {
        if (index > 0) {
          if (e.label === '运单状态') {
            e.fixed = true
            console.log(index, e.label, e.fixed)
          }
        }
      })
      // this.$refs.multipleTable.$children[2].fixed = true
      // str.forEach((e, index) => {
      //   if (e.columnConfig && index > 0) {
      //     if (e.columnConfig.label === '运单状态') {
      //       // this.isFix = true
      //       e.columnConfig.fixed = true
      //       console.log(index, e.columnConfig.label, e.columnConfig.fixed)
      //       console.log(e.columnConfig)
      //     }
      //   }
      // })
      console.log('-----------------')
    },
    tableRowColor({ row, rowIndex }) {
      let orgTime = new Date().getTime() - row.repertoryCreateTime
      let timeOne = this.selectionColorSetting.sectionOne * 3600
      let timeTwo = this.selectionColorSetting.sectionTwo * 3600
      let timeThree = this.selectionColorSetting.sectionThree * 3600
      if (orgTime < timeOne || orgTime === timeOne) {
        return { "color": this.selectionColorSetting.sectionOneColour }
      } else if (orgTime > timeThree) {
        return { "color": this.selectionColorSetting.sectionThreeColour }
      } else {
        return { "color": this.selectionColorSetting.sectionTwoColour }
      }
    },
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchAllOrderRepertory()
    },
    doAction(type) {
      if (type !== 'colorpicker' && this.selected.length !== 1) {
        this.closeColorpicker()
        this.$message({
          message: '请选择一条数据~',
          type: 'warning'
        })
      }
      switch (type) {
        case 'colorpicker':
          this.reportorSelect = this.selected
          this.openColor()
          break
        case 'print':
          this.closeColorpicker()
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.closeColorpicker()
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selected = list
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchAllOrderRepertory() {
      this.getAllOrderRepertory()
    },
    openColor() {
      this.colorpickerVisible = true
    },
    closeColorpicker() {
      this.colorpickerVisible = false
    },
    getAllOrderRepertory() {
      this.loading = true
      postAllOrderRepertory(this.searchQuery).then(data => {
          this.repertoryArr = data.list
          this.total = data.total
          this.loading = false
          this.$nextTick(() => {
            if (data) {

            }
          })
        })
        .catch(error => {
          this.$message({ type: 'error', message: '获取列表失败' })
          this.loading = false
        })
    },
    setColumColor(obj) {
      this.selectionColorSetting = obj
      this.closeColorpicker()
      this.fetchAllOrderRepertory()
      this.tablekey = Math.random()
    },
    setColumn(obj) {
      this.tableColumn = obj
      this.tablekey = Math.random()
    }
  }
}

</script>
