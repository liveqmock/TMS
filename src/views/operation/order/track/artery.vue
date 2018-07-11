<template>
  <div class="tab-content" v-loading="loading">
    <!-- 干线跟踪 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="setInfo" plain class="table_setup" :disabled="isDisBtn">在途跟踪</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-dblclick="setInfo" @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}">
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
      <editInfo :orgid="orgid" :id='trackId' :info="trackInfo" :popVisible.sync="editInfoVisible" @close="closeMe"></editInfo>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
  </div>
</template>
<script>
import SearchForm from './components/searchArtery'
import { mapGetters } from 'vuex'
import { postTrackList } from '@/api/operation/track'
import Pager from '@/components/Pagination/index'
import editInfo from './components/editInfo'
import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
    editInfo,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [],
      total: 0,
      tablekey: 0,
      isDisBtn: true,
      trackId: 0,
      selectInfo: [],
      trackInfo: {},
      loading: true,
      editInfoVisible: false,
      setupTableVisible: false,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          loadTypeId: 39,
          orgId: 0
        }
      },
      tableColumn: [{
          label: "发车批次",
          prop: "batchNo",
          width: "110"
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
          label: "发车时间",
          prop: "departureTime",
          width: "120",
          slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "目的网点",
          prop: "arriveOrgName",
          width: "120"
        },
        // {
        //   label: "短驳费",
        //   prop: "shortFee",
        //   width: "120"
        // },
        {
          label: "实载总件数",
          prop: "actualAmountall",
          width: "120"
        },
        {
          label: "实载总重量",
          prop: "actualWeigntall",
          width: "120"
        },
        {
          label: "实载总体积",
          prop: "actualVolumeall",
          width: "120"
        },
        {
          label: "运单总件数",
          prop: "shipAmount",
          width: "120"
        },
        {
          label: "运单总重量",
          prop: "shipWeigntall",
          width: "120"
        },
        {
          label: "运单总体积",
          prop: "shipVolumeall",
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
          label: "现付油卡",
          prop: "nowpayOilCard",
          width: "120"
        },
        {
          label: "到付运费",
          prop: "arrivepayCarriage",
          width: "120"
        },
        {
          label: "到付油卡",
          prop: "arrivepayOilCard",
          width: "120"
        },
        {
          label: "回付油卡",
          prop: "backpayOilCard",
          width: "120"
        },
        {
          label: "回付运费",
          prop: "backpayOilCard",
          width: "120"
        },
        // {
        //   label: "运费合计",
        //   prop: "userName",
        //   width: "120"
        // },
        {
          label: "整车保险费",
          prop: "carloadInsuranceFee",
          width: "120"
        },
        {
          label: "发站装卸费",
          prop: "leaveHandlingFee",
          width: "120"
        },
        {
          label: "发站其他费",
          prop: "leaveOtherFee",
          width: "120"
        },
        {
          label: "到站装卸费",
          prop: "arriveHandlingFee",
          width: "120"
        },
        {
          label: "到站其他费",
          prop: "arriveOtherFee",
          width: "120"
        },
        {
          label: "配载时间",
          prop: "loadTime",
          width: "120",
          slot: (scope) => {
            return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
        },
        {
          label: "配载人",
          prop: "username",
          width: "120"
        },
        {
          label: "发车人",
          prop: "truckUsername",
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
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchList()
  },
  methods: {
    getSearchParam(obj) {
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
        this.searchQuery.vo.loadTypeId = 39
      }
      this.fetchList()
    },
    getSelection(list) {
      if (list.length === 1) {
        this.selectInfo = Object.assign([], list)
        this.isDisBtn = false
        let tid = this.selectInfo[0].id
        this.trackId = tid
        this.trackInfo = Object.assign({}, this.selectInfo[0])
      } else if (list.length > 1) {
        this.$message({ type: 'warning', message: '只能选择一条数据进行跟踪设置' })
        this.isDisBtn = true
      } else {
        this.isDisBtn = true
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setInfo() {
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    closeMe() {
      this.editInfoVisible = false
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      return postTrackList(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
          this.searchQuery.vo = {}
        } else {
          this.loading = false
        }
      })
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
