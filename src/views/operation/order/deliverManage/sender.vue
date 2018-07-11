<template>
  <!--v-loading="loading"-->
  <!-- 送货管理 -->
  <div class="tab-content">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增送货</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="doAction('edit')">修改</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancelDeliver')" plain>取消送货</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deliverFinish')" plain>送货完成</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain>打印</el-button> -->
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @cell-dblclick="deliverDetail" :data="infoList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%" :key="tablekey">
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
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <!-- 批次详情 -->
    <editInfo :orgid="orgid" :id='loadId' :info="loadInfo" :popVisible.sync="editInfoVisible" @close="closeMe" @isSuccess="isSuccess" @sendInfoData="sendInfo">
    </editInfo>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <!-- 签收弹出框 -->
    <SignFrom :popVisible="signVisible" :dotInfo="dotInfo" @close="closeSign" @message="signMessage"> </SignFrom>
  </div>
</template>
<script>
import { postSelectLoadMainInfoList, putDeliverLoad, putCompleteDelivery } from '@/api/operation/deliverManage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import editInfo from './components/editInfo'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, parseTime } from '@/utils/index'
import SignFrom from './components/sign'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    editInfo,
    SignFrom
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
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllData()
    // Promise.all(this.fetchAllData(this.otherinfo.orgid)).then(res => {
    //   console.log(res)
    //   this.loading = false
    // })
  },
  data() {
    return {
      loading: false,
      btnsize: 'mini',
      infoList: [],
      total: 0,
      trackId: '',
      loadId: 0,
      tablekey: 0,
      dotInfo: {},
      //加载状态
      // loading: true,
      setupTableVisible: false,
      // AddCustomerVisible: false,
      editInfoVisible: false,
      signVisible: false,
      isModify: false,
      isBatch: false,
      selectInfo: {},
      loadInfo: [],
      commonData: {},
      // 选中的行
      selected: [],
      searchQuery: {
        currentPage: 1,
        // pageNum: 1,
        pageSize: 100,
        vo: {
          // orgId: 1,
          loadTypeId: 40,
          loadStartTime: '',
          loadEndTime: '',
          departureStartTime: '',
          departureEndTime: '',
          batchTypeId: '',
          arriveOrgid: '',
          batchNo: '',
          truckIdNumber: '',
          dirverName: ''
        }
      },
      tableColumn: [{
          label: "ID",
          prop: "id",
          width: "180",
          fixed: true
        },
        {
          label: "送货批次",
          prop: "batchNo",
          width: "110",
          fixed: true
        },
        {
          label: "批次状态",
          prop: "batchTypeName",
          width: "120"
        },
        {
          label: "车牌号",
          prop: "truckIdNumber",
          width: "120"
        },
        {
          label: "司机",
          prop: "dirverName",
          width: "120"
        },
        {
          label: "司机电话",
          prop: "dirverMobile",
          width: "120"
        },
        {
          label: "送货时间",
          prop: "departureTime",
          width: "150",
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "完成时间",
          prop: "receivingTime",
          width: "150",
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "送货费",
          prop: "deliveryFee",
          width: "120"
        },
        {
          label: "送货件数",
          prop: "loadAmountall",
          width: "120"
        },
        {
          label: "送货重量",
          prop: "loadWeightall",
          width: "120"
        },
        {
          label: "送货体积",
          prop: "loadVolumeall",
          width: "120"
        },
        {
          label: "重量装载率",
          prop: "weightLoadRate",
          width: "120"
        }, {
          label: "体积装载率",
          prop: "volumeLoadRate",
          width: "120"
        },
        {
          label: "备注",
          prop: "remark",
          width: "120"
        }
      ]
    }
  },
  methods: {
    fetchAllData() {
      this.loading = true
      this.$set(this.searchQuery.vo, 'orgId', this.otherinfo.orgid)
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.infoList = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllData()
    },
    handlePageChange(obj) {
      Object.assign(this.searchQuery, obj)
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.vo = objectMerge2({}, obj)
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
      }
      console.log('sumit', this.searchQuery.vo)
      this.fetchAllData()
    },
    getSelection(selection) {
      this.selected = selection
      this.isBatch = true
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length < 1 && type !== 'add') { // 判断是否有选中项
        // this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }

      switch (type) {
        case 'add': // 添加
          this.add()
          break
        case 'edit': // 编辑
          this.edit()
          break
        case 'deliverFinish': // 送货完成(批量)
          if (isWork) {
            this.deliverFinish()
          }
          break
        case 'cancelDeliver': // 取消送货(批量)
          if (isWork) {
            this.cancelDeliver()
          }
          break
        case 'export': // 导入
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'print': // 打印
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setData(type) {
      let data = {}
      this.$set(data, 'loadTypeId', 40) // 40-送货
      this.$set(data, 'loadIds', [])
      this.selected.forEach(e => {
        if (e.batchTypeId === type) {
          data.loadIds.push(e.loadId) // 将符合typeid的选取，过滤选择项
        } else {
          this.isBatch = false
        }
      })
      data.loadIds = data.loadIds.join(',')
      if (data.loadIds.length < 1) { // 如果id为空，即请求状态不对，拦截请求
        this.isBatch = false
      }
      this.commonData = data
      data = {}
    },
    add() {
      this.$router.push({ path: '././load', query: { loadTypeId: 40 } })
    },
    edit() {
      if (this.selected.length !== 1) {
        this.$message({
          message: '每次只能修改单条数据~',
          type: 'warning'
        })
        return false
      } else if (this.selected[0].batchTypeId !== 57) {
        this.$message({ type: 'warning', message: '送货中状态才可以编辑' })
      } else if (this.selected.length === 1) {
        this.selectInfo = this.selected[0]
        this.$router.push({ path: '././load', query: { loadTypeId: 40, info: this.selectInfo, tablekey: Math.random() } })
      }
    },
    deliverFinish() { // 送货完成
      this.setData(57) //57-送货中
      if (this.isBatch) {
        putCompleteDelivery(this.commonData).then(data => {
            this.$message({ type: 'success', message: '操作成功' })
            this.fetchData()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
          })
      } else {
        this.$message({ type: 'warning', message: '送货中状态才可以送货完成' })
      }

    },
    cancelDeliver() { // 取消送货
      this.setData(57)
      if (this.isBatch) {
        putDeliverLoad(this.commonData).then(data => {
            this.$message({ type: 'success', message: '操作成功' })
            this.fetchData()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
          })
      } else {
        this.$message({ type: 'warning', message: '送货中状态才可以取消送货' })
      }
    },
    deliverDetail(row, column, cell, event) { // 双击单元格弹出详情页
      this.loadInfo = objectMerge2([], row)
      this.loadId = row.loadId
      this.setInfo()
      console.log(this.loadInfo)
    },
    clearData() {
      this.isBatch = false
      this.commonTruck = {}
      this.selected = []
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    closeMe() { // 关闭弹出框
      this.editInfoVisible = false
    },
    closeSign() {
      this.signVisible = false
    },
    setInfo() { // 打开弹出框
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    clearInfo() { // 清空数据
      this.editInfoVisible = false
      this.$refs.multipleTable.clearSelection()
    },
    isSuccess(obj) {
      if (obj) {
        this.getAllList()
      }
    },
    sendInfo(obj) { // 孙子-打开签收弹出框
      // console.log('祖父',JSON.stringify(obj))
      this.dotInfo = objectMerge2({}, obj)
      this.$nextTick(() => {
        this.signVisible = true
      })
    },
    signMessage(obj) { // 孙子-获取签收弹出框信息
      this.tablekey = Math.random()
      this.closeMe()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
