<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <div class="accountsLoad_table">
    <!-- 搜索框 -->
    <div class="transferTable_search clearfix">
      <currentSearch :info="orgLeftTable" @change="selectCurrent"></currentSearch>
    </div>
    <transferTable style="height: calc(100% - 40px);padding:10px">
      <!-- 左上角按钮区 -->
      <div slot="btnsBox">
        <el-button :type="isGoReceipt?'info':'success'" size="mini" icon="el-icon-sort" @click="goReceipt" :disabled="isGoReceipt">结算</el-button>
      </div>
      <!-- 左边表格区 -->
      <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">

        <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed :render-header="setHeader" width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnLeft">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot-scope="scope">
                <div v-if="column.expand">
                  <el-input type="number" v-model.number="column.slot(scope)" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-input>
                </div>
                <div v-else>
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!-- <div class="accountsLoad_table_pager">
          <b>共计:{{ totalLeft }}</b>
          <div class="show_pager">
            <Pager :total="totalLeft" @change="handlePageChangeLeft" />
          </div>
        </div> -->
      </div>
      <!-- 右边表格区 -->
      <div slot="tableRight" class="tableHeadItemBtn">
        <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column :render-header="setHeader2" fixed width="50">
            <template slot-scope="scope">
              <el-button class="tableItemBtnMinus" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnRight">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width" :prop="column.prop">
              <template slot-scope="scope">
                <div v-if="column.expand">
                  <el-input type="number" v-model.number="column.slot(scope)" :size="btnsize" @change="(val) => changLoadData(scope.$index, column.prop, val)"></el-input>
                </div>
                <div v-else>
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!-- <div class="accountsLoad_table_pager">
          <b>共计:{{ totalRight }}</b>
        </div> -->
      </div>
    </transferTable>
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
  </div>
  </div>
</template>
<script>
import * as accountApi from '@/api/finance/accountsReceivable'
import { parseDict, parseShipStatus } from '@/utils/dict'
import { postFindListByFeeType } from '@/api/finance/accountsPayable'
import transferTable from '@/components/transferTable'
import { objectMerge2, parseTime } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Receipt from './components/receiptWaybill'
import Pager from '@/components/Pagination/index'
import currentSearch from './components/currentSearch'
export default {
  components: {
    transferTable,
    querySelect,
    Receipt,
    Pager,
    currentSearch
  },
  data() {
    return {
      currentSearch: '',
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loading: false,
      popVisibleDialog: false,
      btnsize: 'mini',
      // totalLeft: 0,
      // totalRight: 0,
      tableReceiptInfo: [],
      orgLeftTable: [],
      selectedRight: [],
      selectedLeft: [],
      isGoReceipt: true,
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      isFresh: false, // 是否手动刷新页面
      feeType: 8,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tableColumnLeft: [{
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      },
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '结算状态',
        prop: 'totalStatus',
        width: '120',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.totalStatus)
        }
      },
      {
        label: '发货人',
        prop: 'shipSenderName',
        width: '120',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'shipReceiverName',
        width: '120',
        fixed: false
      },
      {
        'label': '现付',
        'prop': 'nowPayFee'
      }, {
        'label': '现付结算状态',
        'prop': 'nowPayState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.nowPayState)
        }
      }, {
        'label': '未结现付',
        'prop': 'notNowPayFee'
      }, {
        'label': '已结现付',
        'prop': 'finishNowPayFee'
      }, {
        'label': '到付',
        'prop': 'arrivepayFee'
      }, {
        'label': '到付结算状态',
        'prop': 'arrivepayState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.arrivepayState)
        }
      }, {
        'label': '未结到付',
        'prop': 'notArrivepayFee'
      }, {
        'label': '已结到付',
        'prop': 'finishArrivepayFee'
      }, {
        'label': '回单付',
        'prop': 'receiptpayFee'
      }, {
        'label': '回单付结算状态',
        'prop': 'receiptpayState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.receiptpayState)
        }
      }, {
        'label': '未结回单付',
        'prop': 'notReceiptpayFee'
      }, {
        'label': '已结回单付',
        'prop': 'finishReceiptpayFee'
      },

      {
        'label': '月结',
        'prop': 'monthpayFee'
      }, {
        'label': '月结结算状态',
        'prop': 'monthpayState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.monthpayState)
        }
      }, {
        'label': '未结月结',
        'prop': 'notMonthpayFee'
      }, {
        'label': '已结月结',
        'prop': 'finishMonthpayFee'
      },

      {
        'label': '异动',
        'prop': 'changeFee'
      }, {
        'label': '异动结算状态',
        'prop': 'changeState',
        'slot': function(scope) {
          return parseDict('count_status', scope.row.changeState)
        }
      }, {
        'label': '未结异动',
        'prop': 'notChangeFee'
      }, {
        'label': '已结异动',
        'prop': 'finishChangeFee'
      }, {
        'label': '发货方',
        'prop': 'senderCustomerUnit'
      }, {
        'label': '收货方',
        'prop': 'receiverCustomerUnit'
      },

      {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
      },

      {
        label: '开单时间',
        prop: 'createTime',
        width: '120',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.createTime)}`
        }
      },
      {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      },
      {
        label: '到达城市',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      },
      {
        label: '货品名',
        prop: 'cargoName',
        width: '120',
        fixed: false
      },
      {
        label: '件数',
        prop: 'cargoAmount',
        width: '120',
        fixed: false
      },
      {
        label: '重量',
        prop: 'cargoWeight',
        width: '120',
        fixed: false
      },
      {
        label: '体积',
        prop: 'cargoVolume',
        width: '120',
        fixed: false
      },
      {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }
      ],
      tableColumnRight: [{
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      },
      {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: false
      },
      {
        label: '结算状态',
        prop: 'statusName',
        width: '120',
        fixed: false
      },
      {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '120',
        fixed: false
      },
      {
        label: '回扣',
        prop: 'brokerageFee',
        width: '120',
        fixed: false
      },
      {
        label: '未结回扣',
        prop: 'unpaidFee',
        width: '120',
        fixed: false
      },
      {
        label: '已结回扣',
        prop: 'closeFee',
        width: '120',
        fixed: false
      },
      {
        label: '实结回扣',
        prop: 'inputBrokerageFee',
        width: '120',
        fixed: false,
        expand: true,
        slot: (scope) => {
          return scope.row.inputBrokerageFee
        }
      },
      {
        label: '发货方',
        prop: 'senderCompanyName',
        width: '120',
        fixed: false
      },
      {
        label: '收货方',
        prop: 'receiverCompanyName',
        width: '120',
        fixed: false
      },
      {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
      },
      {
        label: '货品名',
        prop: 'cargoName',
        width: '120',
        fixed: false
      },
      {
        label: '开单时间',
        prop: 'createTime',
        width: '180',
        fixed: false,
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        }
      },
      {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      },
      {
        label: '到达城市',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      },
      {
        label: '件数',
        prop: 'cargoAmount',
        width: '120',
        fixed: false
      },
      {
        label: '重量',
        prop: 'cargoWeight',
        width: '120',
        fixed: false
      },
      {
        label: '体积',
        prop: 'cargoVolume',
        width: '120',
        fixed: false
      },
      {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }
      ]
    }
  },
  computed: {
    getRouteInfo() {
      return this.$route.query.searchQuery
    },
    totalLeft() {
      return this.leftTable.length
    },
    totalRight() {
      return this.rightTable.length
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handlePageChangeLeft(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    initLeftParams() {
      if (!this.$route.query.searchQuery.vo) {
        this.eventBus.$emit('replaceCurrentView', '/finance/accountsReceivable')
        // this.$router.push({ path: './accountsPayable/waybill' })
        this.isFresh = true // 是否手动刷新页面
      } else {
        this.$set(this.searchQuery.vo, 'feeType', this.getRouteInfo.vo.feeType)
        this.searchQuery.vo.orgAllId = this.otherinfo.orgid
        this.$set(this.searchQuery.vo, 'status', '')
        this.isFresh = false
      }
    },
    getList() {
      const selectListShipSns = objectMerge2([], this.$route.query.selectListShipSns)
      if (this.$route.query.selectListShipSns) {
        this.isModify = true
      } else {
        this.isModify = false
      }
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      this.tableReceiptInfo = this.$options.data().tableReceiptInfo
      this.orgLeftTable = this.$options.data().orgLeftTable

      this.initLeftParams() // 设置searchQuery
      if (!this.isFresh) {
        accountApi.getReceivableList(this.searchQuery).then(data => {
          // NOSETTLEMENT,PARTSETTLEMENT
          // 过滤未完成结算的数据
          this.leftTable = Object.assign([], data.list.filter(el => {
            return /(NOSETTLEMENT|PARTSETTLEMENT)/.test(el.totalStatus)
          }))
          selectListShipSns.forEach(e => {
            this.leftTable.forEach(item => {
              if (e === item.shipSn) {
                this.rightTable.push(item)
              }
            })
          })
          if (this.rightTable.length < 1) {
            this.isGoReceipt = true
          } else {
            this.isGoReceipt = false
          }
          this.rightTable.forEach(e => { // 左边表格减去右边的数据
            e.inputBrokerageFee = e.unpaidFee
            const item = this.leftTable.indexOf(e)
            if (item !== -1) {
              this.leftTable.splice(item, 1)
            }
          })
          this.orgLeftTable = objectMerge2([], this.leftTable)
        })
      }
    },
    changLoadData(index, prop, newVal) {
      this.rightTable[index][prop] = Number(newVal)
      const unpaidName = 'unpaidFee' // 未结费用名
      const unpaidVal = Number(this.rightTable[index][unpaidName]) // 未结费用值
      const paidVal = this.rightTable[index][prop]
      if (paidVal < 0 || paidVal > unpaidVal) {
        this.$message({ type: 'warning', message: '实结费用不小于0，不大于未结费用。' })
      } else {
        this.rightTable[index][prop] = Number(newVal)
      }
      console.log(this.rightTable[index][prop], paidVal, unpaidName, this.rightTable[index][unpaidName], this.rightTable[index])
    },
    clickDetailsRight(row) {
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    clickDetailsLeft(row) {
      this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    getSelectionRight(list) { // 获取右边表格打勾的数据列表
      this.selectedRight = list
    },
    getSelectionLeft(list) { // 获取左边表格打勾的数据列表
      this.selectedLeft = list
    },
    changeTableKey() { // 刷新表格
      this.tablekey = Math.random()
    },
    doAction(type) {
      switch (type) {
        case 'goLeft': // 右边数据勾选到左边
          this.goLeft()
          break
        case 'goRight': // 左边数据勾选到右边
          this.goRight()
          break
      }
    },
    goLeft() { // 数据从左边穿梭到右边
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置实结数量
          e.inputBrokerageFee = e.unpaidFee
          this.rightTable.push(e)
          const item = this.leftTable.indexOf(e)
          if (item !== -1) { // 左边表格源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
          }
          const orgItem = this.orgLeftTable.indexOf(e)
          if (item !== -1) { // 搜索源数据同样减去被穿梭数据
            this.orgLeftTable.splice(item, 1)
          }
        })
        this.selectedRight = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          const item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 右边源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        this.selectedLeft = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    // 选中的行
    selectCurrent(obj) {
      this.leftTable = Object.assign([], obj)
    },
    addItem(row, index) { // 添加单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.doAction('goLeft')
    },
    minusItem(row, index) { // 减去单行
      this.selectedLeft = []
      this.selectedLeft[index] = row
      this.doAction('goRight')
    },
    addALLList() { // 添加全部
      this.selectedRight = Object.assign([], this.leftTable)
      this.doAction('goLeft')
    },
    minusAllList() { // 减去全部
      this.selectedLeft = Object.assign([], this.rightTable)
      this.doAction('goRight')
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    goReceipt() {
      this.tableReceiptInfo = []
      if (!this.isGoReceipt) {
        this.rightTable.forEach((e, index) => {
          let item = {
            shipId: e.shipId,
            amount: e.inputBrokerageFee,
            inputBrokerageFee: e.inputBrokerageFee,
            shipSn: e.shipSn,
            // feeTypeId: e.feeTypeId,
            dataName: '回扣'
          }
          if (item.amount > 0 && item.amount <= e.unpaidFee) { // 提交可结算项
            this.tableReceiptInfo.push(item)
          }
          item = {}
        })
        if (this.tableReceiptInfo.length > 0) { // 判断是否要结算
          this.openDialog()
        } else {
          this.$message({ type: 'warning', message: '暂无可结算项！实结费用不小于0，不大于未结费用。' })
        }
      }
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = '操作'
          return
        }
        if (index === 2) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 || index === 9 || index === 10 || index === 11 || index === 18) {
          sums[index] = ''
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
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const { columns, data } = param
      const sums = []
      const strNull = [12, 13, 14, 15, 16, 17, 18, 19, 20]
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 1) {
          sums[index] = '操作'
          return
        }
        if (index === 2 || index === 3) {
          sums[index] = data.length + '单'
          return
        }
        if (index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 || index === 20) {
          sums[index] = ''
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
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    setHeader(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-plus',
          size: 'mini'
        },
        'class': {
          'tableAllBtn': true,
          'setTableHeader': true
        },
        on: {
          click: this.addALLList
        }
      })
    },
    setHeader2(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-minus',
          size: 'mini'
        },
        'class': {
          'tableAllBtnMinus': true,
          'setTableHeader': true
        },
        on: {
          click: this.minusAllList
        }
      })
    }
  }
}
// settlementId 178
</script>
<style lang="scss">
.tableHeadItemBtn .setTableHeader{
  position: static;
}
</style>
