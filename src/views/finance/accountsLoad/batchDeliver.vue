<template>
  <!-- 送货费结算页面 -->
  <div class="accountsLoad_table">
    <transferTable style="height: calc(100% - 40px);padding:10px">
      <div>
        <el-button>结算</el-button>
      </div>
      <!-- 搜索框 -->
      <div slot="search">
        <querySelect search="shipSn" type="order" size="mini" @change="searchShip" />
      </div>
      <!-- 左上角按钮区 -->
      <div slot="btnsBox">
        <el-button type="success" size="mini" icon="el-icon-sort" @click="goReceipt">送货费结算</el-button>
      </div>
      <!-- 左边表格区 -->
      <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn">
        <el-button icon="el-icon-plus" class="tableAllBtn" size="mini" @click="addALLList"></el-button>
        <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :default-sort="{prop: 'id', order: 'ascending'}" :show-overflow-tooltip="true" :show-summary="true">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button icon="el-icon-plus" class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
         <template v-for="column in tableColumnLeft">
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
      <!-- 右边表格区 -->
      <div slot="tableRight" class="tableHeadItemBtn">
        <el-button icon="el-icon-minus" class="tableAllBtn" size="mini" @click="minusAllList"></el-button>
        <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true' style="height:100%;">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50">
            <template slot-scope="scope">
              <el-button icon="el-icon-minus" class="tableItemBtn" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
            </template>
          </el-table-column>
          <template v-for="column in tableColumnRight">
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
    </transferTable>
    <Receipt :popVisible="popVisibleDialog" :info="tableReceiptInfo" @close="closeDialog"></Receipt>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { postFindListByFeeType } from '@/api/finance/accountsPayable'
import transferTable from '@/components/transferTable'
import { objectMerge2 } from '@/utils/index'
import querySelect from '@/components/querySelect/'
import Receipt from './components/receipt'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      popVisibleDialog: false,
      btnsize: 'mini',
      tableReceiptInfo: {
        name: 'tableReceiptInfo'
      },
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      },
      feeType: 8,
      searchQuery: {
        currentPage: 1,
        pageSize: 10000,
        vo: {
          // feeType: 8,
          // endTime: '',
          // id: 0,
          incomePayType: 'PAYABLE',
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
          status: 'NOSETTLEMENT',
          // totalFee: 0,
          // totalStatus: '',
          // totalStatusValue: ''
        }
      },
      tableColumnLeft: [{
          label: '短驳批次',
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
          label: '短驳时间',
          prop: 'shipSenderName',
          width: '120',
          fixed: false
        },
        {
          label: '短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '结算状态',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '未结短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '已结短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '司机电话',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'shipReceiverMobile',
          width: '120',
          fixed: false
        },
        {
          label: '司机姓名',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '目的网点',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '接收时间',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳件数',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳重量',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳体积',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '备注',
          prop: 'shipSn',
          width: '120',
          fixed: false
        }
      ],
      tableColumnRight: [{
          label: '短驳批次',
          prop: 'shipSn',
          width: '120',
          fixed: true
        },
        {
          label: '发车网点',
          prop: 'shipFromOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '短驳时间',
          prop: 'shipSenderName',
          width: '120',
          fixed: false
        },
        {
          label: '短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '结算状态',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '未结短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '已结短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '实结短驳费',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '司机电话',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '车牌号',
          prop: 'shipReceiverMobile',
          width: '120',
          fixed: false
        },
        {
          label: '司机姓名',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '目的网点',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '接收时间',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳件数',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳重量',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '短驳体积',
          prop: 'shipSn',
          width: '120',
          fixed: false
        },
        {
          label: '备注',
          prop: 'shipSn',
          width: '120',
          fixed: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  components: {
    transferTable,
    querySelect,
    Receipt
  },
  mounted() {
    // this.getList()
  },
  methods: {
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
      let strNull = [12, 13, 14, 15, 16, 17, 18, 19, 20]
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
    getList() {
      console.log('isModify', this.isModify)
      this.leftTable = this.$options.data().leftTable
      this.rightTable = this.$options.data().rightTable
      if (this.isModify) {
        this.leftTable = this.orgData.left
        this.rightTable = this.orgData.right
        this.$emit('loadTable', this.rightTable)
      } else {
        this.$set(this.searchQuery.vo, 'feeType', this.feeType)
        postFindListByFeeType(this.searchQuery).then(data => {
          this.leftTable = data.data
          this.$emit('loadTable', this.rightTable)
        })
      }
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
          // 默认设置配载重量,配载体积,配载数量
          e.loadAmount = e.repertoryAmount
          e.loadWeight = e.repertoryWeight
          e.loadVolume = e.repertoryVolume
          this.rightTable.push(e)
          let item = this.leftTable.indexOf(e)
          if (item !== -1) { // 源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
          }
        })
        this.selectedRight = [] // 清空选择列表
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          let item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        this.selectedLeft = [] // 清空选择列表
      }
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
    searchShip(obj) {
      console.log('searchShip', obj)
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    goReceipt() {
      this.openDialog()
      this.$nextTick(() => {
        console.log('goReceipt', this.popVisibleDialog)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.tableHeadItemBtn {
  height: 100%;
  position: relative;
  .tableItemBtn {
    width: 30px;
    padding-left: 8px;
  }
  .tableAllBtn {
    width: 30px;
    padding-left: 8px;
    position: absolute;
    z-index: 33;
    top: 8px;
    left: 61px;
  }
}

.accountsLoad_table {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100;
  overflow: hidden;
  height: 100%;
}

</style>
