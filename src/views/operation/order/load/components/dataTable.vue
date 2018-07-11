<template>
  <transferTable>
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
        <el-table-column fixed prop="shipFromOrgName" label="开单网点" width="80">
        </el-table-column>
        <el-table-column prop="shipSn" label="运单号" width="120">
        </el-table-column>
        <el-table-column prop="loadAmount" sortable label="配载件数" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadAmount" @change="changLoadData(scope.$index)" required></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadWeight" sortable label="配载重量" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadWeight" @change="changLoadData(scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="loadVolume" sortable label="配载体积" width="120">
          <template slot-scope="scope">
            <el-input type="number" :size="btnsize" v-model.number="scope.row.loadVolume" @change="changLoadData(scope.$index)"></el-input>
          </template>
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
      </el-table>
    </div>
  </transferTable>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSelectAddLoadRepertoryList, postLoadInfo } from '@/api/operation/load'
import transferTable from '@/components/transferTable'
import { objectMerge2 } from '@/utils/index'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      btnsize: 'mini',
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: [],
      orgData: {
        left: [],
        right: []
      }
    }
  },
  props: {
    setLoadTable: {
      type: Object,
      default: () => {}
    },
    isModify: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  components: {
    transferTable
  },
  watch: {
    isModify: {
      handler(cval, oval) { // 深度监听
        this.getList()
      },
      deep: true
    },
    setLoadTable: { // 深度监听数组变换
      handler(cval, oval) {
        if (cval) {
          this.orgData = Object.assign({}, cval)
          this.getList()
          console.log('cval', cval)
        }
      },
      deep: true
    }
  },
  activated() {
    this.getList()
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
        getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
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
    changLoadData(newVal) { // 修改右边表格是配载数量 newVal为rightTable的下标index
      let curAmount = this.rightTable[newVal].loadAmount // 配载件数
      let curWeight = this.rightTable[newVal].loadWeight // 配载重量
      let curVolume = this.rightTable[newVal].loadVolume // 配载体积
      let currepertAmount = this.rightTable[newVal].repertoryAmount // 库存件数
      let currepertWeight = this.rightTable[newVal].repertoryWeight // 库存重量
      let currepertVolume = this.rightTable[newVal].repertoryVolume // 库存体积
      if (curAmount > currepertAmount || curAmount < 1 || curWeight > currepertWeight || curWeight < 0 || curVolume > currepertVolume || curVolume < 0) {
        this.$notify({
          title: '警告',
          message: '配载件数不能小于1,配载重量和体积不能小于0,都不能大于库存数量,默认为该库存数量',
          type: 'warning'
        })
        this.rightTable[newVal].loadAmount = currepertAmount
        this.rightTable[newVal].loadWeight = currepertWeight
        this.rightTable[newVal].loadVolume = currepertVolume
        // return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
      } else if (curAmount === currepertAmount) {
        this.$notify({
          title: '提示',
          message: '配载件数等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        this.rightTable[newVal].loadAmount = currepertAmount
        // this.rightTable[newVal].loadWeight = currepertWeight
        // this.rightTable[newVal].loadVolume = currepertVolume
        // return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
      } else if (curVolume === currepertVolume && curWeight === currepertWeight) {
        this.$notify({
          title: '提示',
          message: '配载重量与配载体积都等于该库存大小,即所有配载数量为库存数量',
          type: 'warning'
        })
        // this.rightTable[newVal].loadAmount = currepertAmount
        this.rightTable[newVal].loadWeight = currepertWeight
        this.rightTable[newVal].loadVolume = currepertVolume
        // return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
      } else {
        // return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
      }
      // this.$emit('change', this.rightTable)
      this.$emit('loadTable', this.rightTable)
      return this.rightTable[newVal].loadAmount && this.rightTable[newVal].loadWeight && this.rightTable[newVal].loadVolume
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
        // this.changeTableKey() // 刷新表格视图
        this.selectedRight = [] // 清空选择列表
        console.log('rightTable', this.rightTable)
        this.$emit('loadTable', this.rightTable)
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
        // this.changeTableKey() // 刷新表格视图
        this.selectedLeft = [] // 清空选择列表
        console.log('rightTable', this.rightTable)
        this.$emit('loadTable', this.rightTable)
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
  .showAllTable {
    width: calc(100% - 100px);
  }
}

</style>
