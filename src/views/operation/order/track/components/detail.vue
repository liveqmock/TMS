<template>
  <div class="detailTables">
    <el-form inline v-model="info" label-width="100" class="detailTables_info">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td>
              <el-input v-model="info.arriveOrgName" :size="btnsize" disabled></el-input>
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
              <el-input v-model="info.shortFee" :size="btnsize" disabled></el-input>
            </td>
            <th>分摊方式</th>
            <td>
              <el-input v-model="info.apportionTypeName" :size="btnsize"  disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>
              <el-input v-model="info.actualVolumeall" :size="btnsize" disabled></el-input>
            </td>
            <th>短驳日期</th>
            <td>
              <el-input :value="info.departureTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
            <th>要求到达时间</th>
            <td>
              <el-input :value="info.receivingTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>可载重量</th>
            <td>
              <el-input v-model="info.actualVolumeall" :size="btnsize" disabled></el-input>
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
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="info_tab">
        <el-table :data="detailList" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark">
          <el-table-column sortable width="120" prop="shipFromOrgName" label="开单网点"></el-table-column>
          <el-table-column sortable width="120" prop="shipSn" label="运单号"></el-table-column>
          <el-table-column sortable width="120" prop="loadAmount" label="配载件数"></el-table-column>
          <el-table-column sortable width="120" prop="loadWeight" label="配载重量"></el-table-column>
          <el-table-column sortable width="120" prop="loadVolume" label="配载体积"></el-table-column>
          <el-table-column sortable width="120" prop="repertoryAmount" label="库存件数"></el-table-column>
          <el-table-column sortable width="120" prop="repertoryWeight" label="库存重量"></el-table-column>
          <el-table-column sortable width="120" prop="repertoryVolume" label="库存体积"></el-table-column>
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
          <el-table-column sortable width="120" prop="shipGoodsSn" label="货号"></el-table-column>
          <el-table-column sortable width="120" prop="shipRemarks" label="运单备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
export default {
  props: {
    info: {
      type: Object,
      default: {}
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
      query: {
        "arriveOrgid": 0,
        "batchNo": "",
        "batchTypeId": 0,
        "departureEndTime": "",
        "departureStartTime": "",
        "dirverName": "",
        "loadEndTime": "",
        "loadId": 0,
        "loadStartTime": "",
        "loadTypeId": 0,
        "orgId": 0,
        "truckIdNumber": ""
      }
    }
  },
  watch: {
    isShow() {
      console.log(this.isShow, 'SHOW')
      if (this.isShow) {
        this.fecthSelectLoadList()
      }
    }
  },
  methods: {
    setTable() {},
    fecthSelectLoadList() {
      this.getLoadTrack()
    },
    doAction(type) {
      switch (type) {
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    getLoadTrack() {
      console.log('查询信息', this.info)
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        this.detailList = data.data
        console.log(this.detailList)
      })
    }
  }
}

</script>
<style lang="scss">
.detailTables {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 240px);
  padding: 0 10px;
  position: relative;
  .detailTables_info {
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
            .el-input.is-disabled .el-input__inner{
              background-color: #fff;
              color:#999;
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
