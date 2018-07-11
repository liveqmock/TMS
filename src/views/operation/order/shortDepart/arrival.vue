<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳到货 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="doAction('truck')">短驳到车</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-document" plain @click="doAction('repertory')">短驳入库</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelTruck')">取消到车</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelRepertory')">取消入库</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('printPaper')" plain>打印清单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('printList')" plain>打印批次</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @cell-dblclick="editTruck" @row-click="clickDetails" @selection-change="getSelection" height="100%" style="width:100%;" tooltip-effect="dark" :data="infoList" stripe border :default-sort="{prop: 'id', order: 'ascending'}" :key="tableKey">
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
      <editInfo :orgid="orgid" :id='loadId' :info="loadInfo" :popVisible.sync="editInfoVisible" @close="closeMe" @isSuccess="isSuccess"></editInfo>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import { postLoadList, postCancelLoad, postCancelPut, postConfirmToCar } from '@/api/operation/shortDepart'
import { mapGetters } from 'vuex'
import SearchForm from './components/searchArrival'
import Pager from '@/components/Pagination/index'
import editInfo from './components/editInfo'
import { objectMerge2, parseTime } from '@/utils/index'
import TableSetup from '@/components/tableSetup'
export default {
  components: {
    Pager,
    SearchForm,
    editInfo,
    TableSetup
  },
  data() {
    return {
      total: 0,
      btnsize: 'mini',
      setupTableVisible: false,
      selected: [],
      tableKey: 0,
      loadId: 0,
      loading: true,
      isModify: false,
      editInfoVisible: false,
      selectInfo: {},
      loadInfo: [],
      isBatch: true,
      commonTruck: {},
      infoList: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          loadTypeId: 38,
          arriveOrgid: 0
        }
      },
      tableColumn: [
        {
          label: "序号",
          prop: "id",
          width: "180",
          fixed: true
        },
        {
          label: "发货批次",
          prop: "batchNo",
          width: "110",
          fixed: true
        },
        {
          label: "批次状态",
          prop: "bathStatusName",
          width: "120",
          fixed: false
        },
        {
          label: "车牌号",
          prop: "truckIdNumber",
          width: "120",
          fixed: false
        },
        {
          label: "司机",
          prop: "dirverName",
          width: "120",
          fixed: false
        },
        {
          label: "司机电话",
          prop: "dirverMobile",
          width: "120",
          fixed: false
        },
        {
          label: "短驳时间",
          prop: "loadTime",
          width: "180",
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "目的网点",
          prop: "endOrgName",
          width: "120",
          fixed: false
        },
        {
          label: "接收时间",
          prop: "receivingTime",
          width: "180",
          fixed: false,
          slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "短驳费",
          prop: "shortFee",
          width: "120",
          fixed: false
        },
        {
          label: "实到件数",
          prop: "actualAmount",
          width: "120",
          fixed: false
        },
        {
          label: "实到重量",
          prop: "actualWeight",
          width: "120",
          fixed: false
        },
        {
          label: "实到体积",
          prop: "actualVolume",
          width: "120",
          fixed: false
        },
        {
          label: "配载总件数",
          prop: "amountall",
          width: "120",
          fixed: false
        },
        {
          label: "配载总重量",
          prop: "weightall",
          width: "120",
          fixed: false
        },
        {
          label: "配载总体积",
          prop: "volumeall",
          width: "120",
          fixed: false
        },
        {
          label: "重量装载率",
          prop: "weightRate",
          width: "120",
          fixed: false
        },
        {
          label: "体积装载率",
          prop: "volumeRate",
          width: "120",
          fixed: false
        },
        {
          label: "短驳经办人",
          prop: "username",
          width: "120",
          fixed: false
        },
        {
          label: "备注",
          prop: "remark",
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
      return this.isModify ? this.selectInfo.arriveOrgid : this.searchQuery.vo.arriveOrgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
    this.getAllList()
    this.eventBus.$on('updateCurrentData')
  },
  methods: {
    getSearchParam(obj) { // 获取搜索框表单内容
      this.searchQuery.vo = objectMerge2({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.arriveOrgid) {
        this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
      }
      this.getAllList()
    },
    doAction(type) {
      let isWork = false
      if (this.selected.length !== 1) {
        this.$message({
          message: '请选择一条数据~',
          type: 'warning'
        })
        isWork = false
      } else {
        isWork = true
      }
      switch (type) {
        case 'truck': // 短驳到车
          if (isWork) {
            this.$confirm('此操作将短驳到车, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.truck()
            })
          }
          break
        case 'repertory': // 短驳入库
          if (isWork) {
            this.repertory()
          }
          break
        case 'chanelTruck': // 取消到车
          if (isWork) {
            this.$confirm('此操作将取消到车, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.chanelTruck()
            })
          }
          break
        case 'chanelRepertory': // 取消入库
          if (isWork) {
            this.$confirm('此操作将短驳入库, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.chanelRepertory()
            })
          }
          break
        case 'printPaper':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'printList':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    editTruck(row, column, cell, event) { // 双击单元格弹出详情页
      this.setInfo()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    clickDetails(row) { //勾选列 toggle
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) { // 获取列表勾选项
      this.selected = Object.assign([], list)
      if (list.length === 1) {
        let lid = 0
        list.forEach(e => {
          lid = e.id
          this.loadInfo = Object.assign([], e)
        })
        this.loadId = lid
      }
    },
    handlePageChange(obj) { // 翻页
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    truck() { // 短驳到车确认
      let data = {}
      this.$set(data, 'id', this.loadInfo.id)
      this.$set(data, 'typeId', 49) // 49为短驳到车，54为干线到车
      if (this.loadInfo.bathStatusName === '短驳中') {
        postConfirmToCar(data).then(data => {
            this.$message({ type: 'success', message: '短驳到车操作成功' })
            this.getAllList()
            this.clearInfo()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
            this.clearInfo()
          })
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.loadInfo.batchNo + ' 】已【 ' + this.loadInfo.bathStatusName + ' 】不允许短驳到车' })
        this.clearInfo()
      }

    },
    repertory() { // 短驳入库-打开弹出框
      if (this.loadInfo.bathStatusName === '短驳中' || this.loadInfo.bathStatusName === '已到车') {
        this.setInfo()
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.loadInfo.batchNo + ' 】已【 ' + this.loadInfo.bathStatusName + ' 】不允许短驳入库' })
        this.clearInfo()
      }
    },
    chanelTruck() { // 取消到车
      let data = {}
      this.$set(data, 'id', this.loadInfo.id)
      this.$set(data, 'loadType', 38) // 装载类型：38-短驳
      if (this.loadInfo.bathStatusName === '已到车') {
        postCancelLoad(data).then(data => {
            this.$message({ type: 'success', message: '取消到车成功' })
            this.getAllList()
            this.clearInfo()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
            this.clearInfo()
          })
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.loadInfo.batchNo + ' 】已【 ' + this.loadInfo.bathStatusName + ' 】不允许取消到车' })
        this.clearInfo()
      }

    },
    chanelRepertory() { // 取消入库
      let data = {}
      this.$set(data, 'id', this.selected[0].id)
      this.$set(data, 'loadType', 38) // 装载类型：短驳
      if (this.loadInfo.bathStatusName === '已入库') {
        postCancelPut(data).then(data => {
            this.$message({ type: 'success', message: '取消入库成功' })
            this.getAllList()
            this.clearInfo()
          })
          .catch(error => {
            this.$message({ type: 'error', message: '操作失败' })
            this.clearInfo()
          })
      } else {
        this.$message({ type: 'warning', message: '【 ' + this.loadInfo.batchNo + ' 】已【 ' + this.loadInfo.bathStatusName + ' 】不允许取消入库' })
        this.clearInfo()
      }
    },
    getAllList() { // 获取短驳到货列表
      this.loading = true
      return postLoadList(this.searchQuery).then(data => {
        if (data) {
          this.infoList = data.list
          this.total = data.total
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    closeMe() { // 关闭弹出框
      this.editInfoVisible = false
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
        // this.$router.push({path: '././shortDepart', query:{tableKey: Math.random()}})
        this.getAllList()
      }
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
