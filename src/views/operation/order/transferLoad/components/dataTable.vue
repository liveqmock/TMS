<template>
  <transferTable>
    <!-- 左边表格区 -->
    <div style="height:100%;" slot="tableLeft" class="tableHeadItemBtn2">
      <el-table ref="multipleTableRight" :data="leftTable" border @row-click="clickDetailsRight" @selection-change="getSelectionRight" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumRight" :show-overflow-tooltip="true" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary="true">
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed :render-header="setHeader" width="50">
          <template slot-scope="scope">
            <el-button icon="el-icon-plus" class="tableItemBtn" size="mini" @click="addItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
        <el-table-column prop="repertoryAmount" sortable label="库存件数" width="120">
        </el-table-column>
        <el-table-column prop="repertoryWeight" sortable label="库存重量" width="120">
        </el-table-column>
        <el-table-column prop="repertoryVolume" sortable label="库存体积" width="120">
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 右边表格区 -->
    <div style="height:100%;" slot="tableRight" class="tableHeadItemBtn2">
      <el-table ref="multipleTableLeft" :data="rightTable" border @row-click="clickDetailsLeft" @selection-change="getSelectionLeft" tooltip-effect="dark" triped :key="tablekey" height="100%" :summary-method="getSumLeft" :default-sort="{prop: 'id', order: 'ascending'}" :show-summary='true'>
        <el-table-column fixed type="index" width="50">
        </el-table-column>
        <el-table-column fixed width="50" :render-header="setHeader2">
          <template slot-scope="scope">
            <el-button icon="el-icon-minus" class="tableItemBtn" size="mini" @click="minusItem(scope.row, scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="120">
        </el-table-column>
        <el-table-column prop="oddNumbers" sortable label="中转单号" width="120">
          <template slot-scope="scope">
            <el-input size="mini"  :value="scope.row.oddNumbers" @change="(val) => changeRow('oddNumbers', scope, val)" required></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="transferCharge" sortable label="中转运费" width="120">
          <template slot-scope="scope">
            <el-input size="mini"
            v-number-only:point  :value="scope.row.transferCharge" @change="(val) => changeRow('transferCharge', scope, val)"  ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryExpense" sortable label="中转送货费" width="120">
          <template slot-scope="scope">
            <el-input size="mini"
            v-number-only:point 
             @change="(val) => changeRow('deliveryExpense', scope, val)"
             :value="scope.row.deliveryExpense" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="transferOtherFee" sortable label="中转其他费" width="120">
          <template slot-scope="scope">
            <el-input size="mini"
            v-number-only:point 
            @change="(val) => changeRow('transferOtherFee', scope, val)"  :value="scope.row.transferOtherFee" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalCost" sortable label="中转费合计" width="120">
          <template slot-scope="scope">
            <el-input size="mini" disabled  
            v-model="rightTable[scope.$index].totalCost" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentId" sortable label="中转费付款方式" width="120">
          <template slot-scope="scope">
            <selectType type="payment_type" size="mini"
            @change="(val) => changeRow('paymentId', scope, val)" :value="scope.row.paymentId" :name="scope.row.paymentName" />
          </template>
        </el-table-column>
        <el-table-column prop="cargoAmount" sortable label="运单件数" width="120">
        </el-table-column>
        <el-table-column prop="cargoWeight" sortable label="运单重量" width="120">
        </el-table-column>
        <el-table-column prop="cargoVolume" sortable label="运单体积" width="120">
        </el-table-column>
        <el-table-column prop="shipFromCityName" sortable label="出发城市" width="120">
        </el-table-column>
        <el-table-column prop="shipToCityName" sortable label="到达城市" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderName" sortable label="发货人" width="120">
        </el-table-column>
        <el-table-column prop="shipSenderMobile" sortable label="发货人电话" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverName" sortable label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="shipReceiverMobile" sortable label="收货人电话" width="120">
        </el-table-column>
        <el-table-column prop="cargoName" sortable label="货品名" width="120">
        </el-table-column>
        <el-table-column prop="shipGoodsSn" sortable label="货号" width="120">
        </el-table-column>
        <el-table-column prop="shipRemarks" sortable label="运单备注" width="120">
        </el-table-column>
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import transferTable from '@/components/transferTable'
import selectType from '@/components/selectType/index'
import { getTotal } from '@/utils/'

export default {
  props: {
    leftData: {
      type: Array
    },
    rightData: {
      type: Array
    }
  },
  data() {
    return {
      tablekey: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: []
    }
  },
  components: {
    transferTable,
    selectType
  },
  watch: {
    leftData(newVal) {
      this.leftTable = newVal
    },
    rightData(newVal) {
      this.rightTable = newVal
    }
  },
  mounted() {
  },
  methods: {
    getSum(param, type) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (type !== 'left') {
          if (index === 1 || index === 2 || index === 10) {
            sums[index] = data.length + '单'
            return
          }
          if (index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index === 8 || index === 9) {
            sums[index] = ''
            return
          }
        } else {
          if (index === 1 || index === 2) {
            sums[index] = data.length + '单'
            return
          }
          if (index === 12 || index === 13 || index === 14 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19) {
            sums[index] = ''
            return
          }
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
    getSumRight(param) { // 右边表格合计-自定义显示
      return this.getSum(param, 'right')
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      return this.getSum(param, 'left')
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
      // this.tablekey = Math.random()
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
    // 设置对应行
    changeRow(filed, scope, val) {
      const index = scope.$index
      const _this = this
      const current = _this.rightTable[index]
      current[filed] = val
      // 计算总费用
      current['totalCost'] = getTotal(current['transferCharge'], current['deliveryExpense'], current['transferOtherFee'])
      _this.rightTable[index].totalCost = current['totalCost']
      _this.$emit('loadTable', _this.rightTable)
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
          const item = this.leftTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.leftTable.splice(item, 1)
          }
        })
        this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        this.$emit('loadTable', this.rightTable)
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable.push(e)
          const item = this.rightTable.indexOf(e)
          if (item !== -1) {
            // 源数据减去被穿梭的数据
            this.rightTable.splice(item, 1)
          }
        })
        this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        this.$emit('loadTable', this.rightTable)
      }
    },
    addItem(row, index) { // 添加单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.doAction('goLeft')
    },
    setHeader(h, { column }) {
      return h('el-button', {
        props: {
          icon: 'el-icon-plus',
          size: 'mini'
        },
        'class': {
          'tableItemBtn': true
        },
        on: {
          click: this.addALLList
        }
      })
    },
    setHeader2(h, { column }) {
      return h('el-button', {
        props: {
          icon: 'el-icon-minus',
          size: 'mini'
        },
        'class': {
          'tableItemBtn': true
        },
        on: {
          click: this.minusAllList
        }
      })
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
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemBtn2 {
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
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
