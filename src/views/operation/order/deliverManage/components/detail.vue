<template>
  <div class="detailTable">
    <el-form inline v-model="info" label-width="100" class="detailTable_info">
      <table>
        <tbody>
          <tr>
            <th>送货费</th>
            <td>
              <el-input v-model="info.deliveryFee" :size="btnsize" disabled></el-input>
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
            <th>可载体积</th>
            <td>
              <el-input v-model="info.truckVolume" :size="btnsize" disabled></el-input>
            </td>
            <th>可载重量</th>
            <td>
              <el-input v-model="info.actualVolumeall" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>分摊方式</th>
            <td>
              <!-- {{info.truckLoad}} -->
              <el-input v-model="info.apportionTypeName" :size="btnsize"  disabled></el-input>
            </td>
            <th>送货日期</th>
            <td>
              <el-input :value="info.loadTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
            <th>要求到达时间</th>
            <td>
              <el-input :value="info.receivingTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="5">
               <el-input v-model="info.remark" :size="btnsize" disabled></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('add')">签收</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :reserve-selection="true" :data="detailList" @row-click="clickDetails" @selection-change="getSelection" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50" sortable type="selection"></el-table-column>
          <el-table-column sortable width="120" prop="shipFromOrgName" label="开单网点"></el-table-column>
          <el-table-column sortable width="120" prop="shipId" label="运单号"></el-table-column>
          <el-table-column sortable width="120" prop="loadAmount" label="配载件数"></el-table-column>
          <el-table-column sortable width="120" prop="loadWeight" label="配载重量"></el-table-column>
          <el-table-column sortable width="120" prop="loadVolume" label="配载体积"></el-table-column>
          <el-table-column sortable width="120" prop="cargoAmount" label="运单件数"></el-table-column>
          <el-table-column sortable width="120" prop="cargoWeight" label="运单重量"></el-table-column>
          <el-table-column sortable width="120" prop="cargoVolume" label="运单体积"></el-table-column>
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
    <!-- <Addbatch :issender="true" :dotInfo="dotInfo" :popVisible="popVisible" @close="closeAddBacth" @success="closeAddBacth" :isModify="isModify" :isSongh="isSongh"></Addbatch> -->
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
// import { postBatchSign } from '@/api/operation/deliverManage'
import { objectMerge2 } from '@/utils/index'
// import Addbatch from './sign'
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
      selectDetailList: [],
      message: false,
      signData: {
        shipIds: [],
        childShipIds: [],
        signTime: '',
        signName: '',
        signCocumentTypeId: 0,
        documentNum: '',
        signTypeId: 0,
        remark: '',
        signPic: ''
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
      }
    }
  },
  methods: {
    setTable() {},
    doAction(type) {
      switch (type) {
        case 'add': // 签收
          this.openSignVisible()
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    setData() {},
    // postBatchSign() {
    // postBatchSign(data).then(data => {
    //     this.$router.push({ path: '././deliverManage', query: { tableKey: Math.random() } })
    //     this.$message({ type: 'success', message: '签收操作成功' })
    //     this.message = true
    //   })
    //   .catch(error => {
    //     this.message = false
    //   })
    // this.$emit('isSuccess', this.message)
    // },
    getLoadTrack() {
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        if (data) {
          this.detailList = data.data
          this.toggleAllRows()
        }
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      let data = {}
      this.$set(data, 'shipIds', [])
      this.$set(data, 'childShipIds', [])
      if (list.length > 0) {
        this.selectDetailList = objectMerge2([], list)
        this.selectDetailList.forEach(e => {
          // data.shipIds = e.shipId
          // data.childShipIds = e.childShipIds
          data.shipIds.push(e.shipId)
          if (!e.childShipIds || e.childShipIds === '') {
            e.childShipIds = null
          }
          data.childShipIds.push(e.childShipIds)
        })
        // data.shipIds = data.shipIds.join(',')
        // data.childShipIds = data.childShipIds.join(',')
      } else {
        this.isBatch = false
      }
      this.signData.shipIds = data.shipIds
      this.signData.childShipIds = data.childShipIds
      data = {}
      console.log('select', this.signData)
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.detailList.forEach((e, index) => {
          this.$refs.multipleTable.toggleRowSelection(e, true)
        })
      })
    },
    openSignVisible() {
      console.log('批次详情页', this.signData)
      this.$emit('sendInfoData', this.signData)
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
    border-bottom: 2px dotted #eee;
    background-color: #fff;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            color: #999;
            width: 12%;
            height: 36px;
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
    .info_tab {
      width: 100%;
      height: calc(100vh - 430px);
      flex-grow: 1;
    }
  }
}

</style>
