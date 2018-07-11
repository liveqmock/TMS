<template>
  <div class="detailTable">
    <el-form inline v-model="info" label-width="100" class="detailTable_info">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td v-if="info.arriveOrgName">
              <el-input v-model="info.arriveOrgName" :size="btnsize" disabled></el-input>
            </td>
            <td v-else>
              <el-input v-model="info.endOrgName" :size="btnsize" disabled></el-input>
            </td>
            <th>司机名称</th>
            <td>
              <el-input v-model="info.dirverName" :size="btnsize" disabled></el-input>
            </td>
            <th>司机电话</th>
            <td>
              <el-input v-model="info.dirverMobile" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>车牌号码</th>
            <td>
              <el-input v-model="info.truckIdNumber" :size="btnsize" disabled></el-input>
            </td>
            <th>短驳费</th>
            <td>
              <el-input v-model="info.shortFee" :size="btnsize"></el-input>
            </td>
            <th>分摊方式</th>
            <td>
              <el-input v-model="info.apportionName" :size="btnsize" disabled v-if="info.apportionName"></el-input>
              <el-input v-model="info.apportionTypeName" :size="btnsize" disabled v-else></el-input>
            </td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>
              <el-input v-model="info.truckVolume" :size="btnsize" disabled></el-input>
            </td>
            <th>短驳日期</th>
            <td>
              <!-- <el-input :value="info.loadTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input> -->
              <el-input :value="info.loadTime" :size="btnsize" disabled></el-input>
            </td>
            <th>要求到达时间</th>
            <td>
              <el-input :value="info.requireArrivedTime" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>可载重量</th>
            <td>
              <el-input v-model="info.truckLoad" :size="btnsize" disabled></el-input>
            </td>
            <th>备注</th>
            <td colspan="3">
              <el-input v-model="info.remark" :size="btnsize" disabled></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button v-if="info.endOrgName" :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('add')">短驳入库</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="detailinfo_tab">
        <el-table ref="multipleTable" :reserve-selection="true" :data="detailList" @row-click="clickDetails" @selection-change="getSelection" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50" sortable type="selection"></el-table-column>
          <el-table-column sortable width="120" prop="shipFromOrgName" label="开单网点"></el-table-column>
          <el-table-column sortable width="120" prop="shipSn" label="运单号"></el-table-column>
          <el-table-column sortable width="110" prop="actualAmount" label="实到件数">
            <template slot-scope="scope">
              <el-input type="number" :disabled="isEditActual" :size="btnsize" v-model.number="scope.row.actualAmount" @change="changeData(scope.$index)" required></el-input>
            </template>
          </el-table-column>
          <el-table-column sortable width="110" prop="actualWeight" label="实到重量">
            <template slot-scope="scope">
              <el-input type="number"  :disabled="isEditActual" :size="btnsize" v-model.number="scope.row.actualWeight" @change="changeData(scope.$index)" required></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="actualVolume" sortable label="实到体积" width="110">
            <template slot-scope="scope">
              <el-input type="number"  :disabled="isEditActual" :size="btnsize" v-model.number="scope.row.actualVolume" @change="changeData(scope.$index)" required></el-input>
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="loadAmount" label="配载件数"></el-table-column>
          <el-table-column sortable width="120" prop="loadWeight" label="配载重量"></el-table-column>
          <el-table-column sortable width="120" prop="loadVolume" label="配载体积"></el-table-column>
          <!-- <el-table-column sortable width="120" prop="cargoAmount" label="运单件数"></el-table-column>
          <el-table-column sortable width="120" prop="cargoWeight" label="运单重量"></el-table-column>
          <el-table-column sortable width="120" prop="cargoVolume" label="运单体积"></el-table-column> -->
          <el-table-column sortable width="160" prop="shipFromCityName" label="出发城市"></el-table-column>
          <el-table-column sortable width="160" prop="shipToCityName" label="到达城市"></el-table-column>
          <el-table-column sortable width="120" prop="shipSenderName" label="发货人"></el-table-column>
          <el-table-column sortable width="120" prop="shipSenderMobile" label="发货人电话"></el-table-column>
          <el-table-column sortable width="120" prop="shipReceiverName" label="收货人"></el-table-column>
          <el-table-column sortable width="120" prop="shipReceiverMobile" label="收货人电话"></el-table-column>
          <el-table-column sortable width="200" prop="cargoName" label="货品名"></el-table-column>
          <el-table-column sortable width="120" prop="shipSn" label="货号"></el-table-column>
          <el-table-column sortable width="120" prop="shipRemarks" label="运单备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
import { postAddRepertory } from '@/api/operation/shortDepart'
import { objectMerge2 } from '@/utils/index'
export default {
  props: {
    info: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    info() {}
  },
  data() {
    return {
      btnsize: 'mini',
      loadId: '',
      detailList: [],
      newData: {
        tmsOrderLoadFee: [],
        tmsOrderLoadDetailsList: {},
        tmsOrderLoad: {}
      },
      selectDetailList: [],
      isEditActual: false,
      message: false,
      query: {
        arriveOrgid: 0,
        batchNo: '',
        batchTypeId: 0,
        departureEndTime: '',
        departureStartTime: '',
        dirverName: '',
        loadEndTime: '',
        loadId: 0,
        loadStartTime: '',
        loadTypeId: 0,
        orgId: 0,
        truckIdNumber: ''
      }
    }
  },
  mounted() {
    this.toggleAllRows()
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.getLoadTrack()
        this.toggleAllRows()
        if (this.info.arriveOrgName) {
          this.isEditActual = true
        }else {
          this.isEditActual = false
        }
      }
    }
  },
  methods: {
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'add': // 短驳入库
          this.$confirm('此操作将短驳入库, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postAddRepertory()
          })
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    changeData(newVal) { // 判断当行
      let curAmount = this.detailList[newVal].actualAmount // 实到件数
      let curWeight = this.detailList[newVal].actualWeight // 实到重量
      let curVolume = this.detailList[newVal].actualVolume // 实到体积
      let curloadAmount = this.detailList[newVal].loadAmount // 配载件数
      let curloadWeight = this.detailList[newVal].loadWeight // 配载重量
      let curloadVolume = this.detailList[newVal].loadVolume // 配载体积
      if (this.selectDetailList.length === 1 && curAmount === 0) {
        console.log(this.selectDetailList.length, this.detailList.length)
        this.detailList[newVal].actualAmount = curloadAmount
        this.detailList[newVal].actualWeight = curloadWeight
        this.detailList[newVal].actualVolume = curloadVolume
        this.$notify({
          title: '提示',
          message: '实到件数不能为0',
          type: 'warning'
        })
      }
      if (curAmount !== 0 && curWeight === 0 && curVolume === 0) {
        console.log(this.selectDetailList.length, this.detailList.length)
        this.detailList[newVal].actualAmount = curloadAmount
        this.detailList[newVal].actualWeight = curloadWeight
        this.detailList[newVal].actualVolume = curloadVolume
        this.$notify({
          title: '提示',
          message: '实到重量和实到体积不能同时为0',
          type: 'warning'
        })
      }
      if (curAmount === 0 && curVolume === 0 && curWeight === 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], false)
        console.log(this.selectDetailList.length)
        if (this.selectDetailList.length === 0) {
          this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
          this.detailList[newVal].actualAmount = curloadAmount
          this.detailList[newVal].actualWeight = curloadWeight
          this.detailList[newVal].actualVolume = curloadVolume
        }
        this.$notify({
          title: '提示',
          message: '实到数量都为0时,取消本条运单入库,但必须有一条运单',
          type: 'warning'
        })
      } else if (curAmount > curloadAmount || curAmount < 0 || curWeight > curloadWeight || curWeight < 0 || curVolume > curloadVolume || curVolume < 0) {
        this.$notify({
          title: '提示',
          message: '实到件数/实到重量/实到体积不能小于0大于库存数量,默认为该库存数量',
          type: 'warning'
        })
        this.detailList[newVal].actualAmount = curloadAmount
        this.detailList[newVal].actualWeight = curloadWeight
        this.detailList[newVal].actualVolume = curloadVolume
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
      } else {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
      }
      return this.detailList[newVal].actualAmount && this.detailList[newVal].actualWeight && this.detailList[newVal].actualVolume
    },
    setData() {
      console.log('info', this.info)
      let dataFee = {} // 配载费用
      dataFee.arriveHandlingFee = this.info.arriveHandlingFee
      dataFee.arriveOtherFee = this.info.arriveOtherFee
      dataFee.arrivepayCarriage = this.info.arrivepayCarriage
      dataFee.arrivepayOilCard = this.info.arrivepayOilCard
      dataFee.backpayCarriage = this.info.backpayCarriage
      dataFee.backpayOilCard = this.info.backpayOilCard
      dataFee.carloadInsuranceFee = this.info.carloadInsuranceFee
      dataFee.deliveryFee = this.info.deliveryFee
      dataFee.id = this.info.id
      dataFee.leaveHandlingFee = this.info.leaveHandlingFee
      dataFee.leaveOtherFee = this.info.leaveOtherFee
      dataFee.loadId = this.info.loadId
      dataFee.nowpayCarriage = this.info.nowpayCarriage
      dataFee.nowpayOilCard = this.info.nowpayOilCard
      dataFee.shortFee = this.info.shortFee
      let dataLoad = {} // 配载信息
      dataLoad.actualAmountall = this.info.loadAmount
      dataLoad.actualVolumeall = this.info.loadVolume
      dataLoad.actualWeigntall = this.info.loadWeight
      dataLoad.apportionTypeId = this.info.apportionTypeId
      dataLoad.arriveOrgid = this.info.arriveOrgid
      dataLoad.batchNo = this.info.batchNo
      dataLoad.batchTypeId = this.info.batchTypeId
      dataLoad.contractNo = this.info.contractNo
      // dataLoad.createTime = this.info.createTime
      // dataLoad.departureTime = this.info.departureTime
      dataLoad.dirverMobile = this.info.dirverMobile
      dataLoad.dirverName = this.info.dirverName
      dataLoad.id = this.info.id
      dataLoad.loadAmountall = this.info.loadAmountall
      dataLoad.loadTime = this.info.loadTime
      dataLoad.loadTypeId = this.info.loadTypeId
      dataLoad.loadVolumeall = this.info.loadVolumeall
      dataLoad.loadWeightall = this.info.loadWeightall
      dataLoad.orgid = this.info.orgid
      // dataLoad.planArrivedTime = this.info.planArrivedTime
      dataLoad.receivedUserId = this.info.receivedUserId
      // dataLoad.receivingTime = this.info.receivingTime
      dataLoad.remark = this.info.remark
      // dataLoad.requireArrivedTime = this.info.requireArrivedTime
      dataLoad.truckIdNumber = this.info.truckIdNumber
      dataLoad.truckLoad = this.info.truckLoad
      dataLoad.truckUserId = this.info.truckUserId
      dataLoad.truckVolume = this.info.truckVolume
      dataLoad.updateTime = this.info.updateTime
      dataLoad.userId = this.info.userId
      // 实到体积/重量/件数
      // this.detailList.forEach((e, index) => {
      //   e.actualWeight = e.loadWeight
      //   e.actualVolume = e.loadVolume
      //   e.actualAmount = e.loadAmount
      // })
      // setData 后台需要的数据结构
      // this.selectDetailList.forEach(e => {
      //   if (e.actualVolume === 0 && e.actualWeight === 0 && e.actualAmount === 0) {
      //     console.log('not select')
      //     this.$refs.multipleTable.toggleRowSelection(e, false)
      //     let item = this.selectDetailList.indexOf(e)
      //     if (item !== -1) {
      //       this.selectDetailList.splice(item, 1)
      //     }
      //   }
      // })

      this.newData.tmsOrderLoad = objectMerge2({}, dataLoad)
      this.newData.tmsOrderLoadFee = objectMerge2({}, dataFee)
      this.newData.tmsOrderLoadDetailsList = Object.assign([], this.selectDetailList)
    },
    postAddRepertory() {
      this.setData()
      if (this.newData.tmsOrderLoadDetailsList.length === 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[0], true)
        this.$message({type: 'warning', message: '至少要有一条数据'})
        return false
      }else {
        postAddRepertory(50, this.newData).then(data => {
          if (data.status === 200) {
            this.$router.push({ path: '././shortDepart', query: { tableKey: Math.random() } })
            this.$message({ type: 'success', message: '短驳入库操作成功' })
            this.message = true
          } else {
            this.message = false
          }
          this.$emit('isSuccess', this.message)
        })
        .catch(error => {
          this.message = false
          this.$emit('isSuccess', this.message)

        })
      }
    },
    getLoadTrack() {
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        if (data) {
          this.detailList = data.data
          this.setData()
          this.toggleAllRows()
          this.$nextTick(() => { // 默认设置实到数量为配载数量
            this.detailList.forEach(e => {
              e.actualAmount = e.loadAmount
              e.actualWeight = e.loadWeight
              e.actualVolume = e.loadVolume
            })
          })
        }
      })
    },
    clickDetails(row) {
      // this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectDetailList = Object.assign([], list)
      console.log('select', this.selectDetailList)
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.detailList.forEach((e, index) => {
          if (e.actualVolume === 0 && e.actualWeight === 0 && e.actualAmount === 0) {
            this.$refs.multipleTable.toggleRowSelection(e, false)
          } else {
            this.$refs.multipleTable.toggleRowSelection(e, true)
          }
        })
      })
    }
  }
}

</script>
<style lang="scss">
.detailTable {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
  position: relative;

  .detailTable_info {
    border-bottom: 2px dotted #ddd;
    background-color: #fff;
    margin-top: 5px;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            color: #999;
            width: 12%;
            height: 34px;
          }
          td {
            width: 21.3%;
            padding: 0 3px;
            .el-input.is-disabled .el-input__inner {
              background-color: #fff;
              color: #999;
            }
          }
        }
      }
    }
  }
  .tab_infos {
    padding: 10px 0;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .btns_box {
      margin-bottom: 5px;
      .el-button {
        margin-right: 0;
      }
      .table_setup {
        float: right;
        margin-left: 10px;
      }
    }
    .detailinfo_tab {
      width: 100%;
      height: calc(100vh - 440px);
      flex-grow: 1;
    }
  }
}

</style>
