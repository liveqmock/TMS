<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增提货</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('finishPick')" plain>提货完成</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('relevance')" plain>关联运单</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>打印</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="pickupBatchNumber"
            width="110"
            label="提货批次">
          </el-table-column>
          <el-table-column
            prop="pickupStatusName"
            width="110"
            sortable
            label="提货状态">
          </el-table-column>
          <el-table-column
            prop="cancelStatus"
            sortable
            width="150"
            label="运费核销状态">
          </el-table-column>
          <el-table-column
            prop="customerName"
            sortable
            width="120"
            label="发货人">
          </el-table-column>
          <el-table-column
            sortable
            prop="customerMobile"
            width="130"
            label="手机号">
          </el-table-column>
          <el-table-column
            label="提货地址"
            width="170"
            prop="detailedAddress"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="pickupName"
            label="货品名"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="pickupAmount"
            width="80"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="pickupWeight"
            label="重量"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="pickupVolume"
            label="体积"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="realWeight"
            label="实际载重量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="differWeight"
            label="差额重量"
            width="110"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="realVolume"
            label="实际载体积"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="differVolume"
            label="差额体积"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipSn"
            label="关联运单号"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="pickupFee"
            label="关联提货费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="toCityName"
            label="到达城市"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
          prop="payMethodName"
          label="付款方式"
          width="120"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="120"
          sortable
        >
        </el-table-column>
          <el-table-column
            prop="carriage"
            label="运费"
            width="80"
            sortable
          >

        </el-table-column>
        <el-table-column
          prop="collectionFee"
          label="代收费用"
          width="110"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="truckIdNumber"
          label="车牌号"
          width="90"
          sortable
        >
        </el-table-column>
          <el-table-column
          prop="truckFee"
          label="车费"
          width="80"
          sortable
        >
        </el-table-column>
         <el-table-column
          prop="truckUnit"
          label="车辆单位"
          width="110"
          sortable
        >
        </el-table-column>
          <el-table-column
            prop="driverName"
            label="司机姓名"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="driverMobile"
            label="司机手机"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="truckTypeName"
            label="车辆类型"
            width="110"
            sortable>

          </el-table-column>
          <el-table-column
            label="出车时间"
            width="130"
            sortable
          >
            <template slot-scope="scope">{{ new Date(scope.row.outTime).toLocaleDateString() }}</template>
          </el-table-column>
          <el-table-column
            label="要求到达司机"
            width="150"
            sortable
          >
            <template slot-scope="scope">{{ new Date(scope.row.arriveTime).toLocaleDateString() }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
    <PickupMain :popVisible.sync="pickMaintainisible" :isDepMain="isDepMain" @close="openpickMaintainisible" @success="fetchData" :dotInfo="selectInfo"></PickupMain>
    <PickupRelevance :popVisible.sync="releMaintainisible" :isDepMain="isDepMain" @close="openpickReletainisible" @success="fetchData" :dotInfo="selectInfo"></PickupRelevance>

  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { fetchPostlist , deletebatchDelete } from '@/api/operation/pickup'

import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/add'
import PickupMain from './components/pickupMain'
import PickupRelevance from './components/pickupRelevance'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import {objectMerge2} from '@/utils/index'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    PickupMain,
    PickupRelevance
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ]),
      orgid () {
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    // this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
    //   this.loading = false
    // })
    // this.fetchData()
  },
  data () {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      //加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      pickMaintainisible:false,
      releMaintainisible:false,
      isModify: false,
      isDepMain: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          pickupStatus: '',
          startTime: '',
          pickupBatchNumber: '',
          truckIdNumber: '',
          driverName: ''
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return fetchPostlist(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.totalCount
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllCustomer()
    },
    handlePageChange (obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam (obj) {
      this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
      this.fetchAllCustomer()
    },
    showImport () {
      // 显示导入窗口
    },
    doAction (type) {
      if(type==='import'){
        this.showImport()
        return false
      }
      // 判断是否有选中项
      if(!this.selected.length && type !== 'add'){
          this.closeAddCustomer()
          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }
      switch (type) {
          // 新增
          case 'add':
              this.isModify = false
              this.isDbclick = false
              this.selectInfo = {}
              this.openAddCustomer()
              break;
          // 修改
          case 'modify':
              this.isModify = true
              this.isDbclick = false
              if(this.selected.length > 1){
                  this.$message({
                      message: '每次只能修改单条数据~',
                      type: 'warning'
                  })
                return false
              }
              this.selectInfo = this.selected[0]
              this.openAddCustomer()
              break;
        // 提货完成
        case 'finishPick':
          this.closeAddCustomer()
          if(this.selected.length > 1){
            this.$message({
              message: '每次只能生成单条数据~',
              type: 'warning'
            })
            return false
          }
          if(this.selected[0].pickupStatus === 237){
            this.$message({
              message: '已经提货完成了~',
              type: 'warning'
            })
            return false
          }
          this.selectInfo = this.selected[0]
          this.openpickMaintainisible()
          break;
          //关联运单
        case 'relevance':
          this.closeAddCustomer()
          if(this.selected.length > 1){
            this.$message({
              message: '每次只能生成单条数据~',
              type: 'warning'
            })
            return false
          }
          this.selectInfo = this.selected[0]
          this.openpickReletainisible()
          break;
          // 删除客户
          case 'delete':
            this.closeAddCustomer()
                  //=>todo 删除多个
                  let ids = this.selected.filter(el=>{
                    return el.pickupStatus === 236
                  }).map(el => {
                    return  el.id
                  })
            if(!ids.length){
              this.$message.warning('提货完成的不可以删除~')
            }else {
              ids = ids.join(',')
              this.$confirm('确定要删除提货批次吗？', '提示', {
                          confirmButtonText: '删除',
                          cancelButtonText: '取消',
                          type: 'warning'
                      }).then(() => {
                        deletebatchDelete(ids).then(res => {
                              this.$message({
                                  type: 'success',
                                  message: '删除成功!'
                              })
                              this.fetchData()
                          }).catch(err=>{
                              this.$message({
                                  type: 'info',
                                  message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
                              })
                          })

                      }).catch(() => {
                          this.$message({
                              type: 'info',
                              message: '已取消删除'
                          })
                      })
            }
              break;
          // 导出数据
          case 'export':
              let ids2 = this.selected.map(el => {
                return el.customerId
              })
              getExportExcel(ids2.join(',')).then(res => {
                this.$message({
                    type: 'success',
                    message: '即将自动下载!'
                })
              })
              break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable () {
      this.setupTableVisible = true
    },
    closeSetupTable () {
      this.setupTableVisible = false
    },
    openAddCustomer () {
      this.AddCustomerVisible = true
    },

    closeAddCustomer () {
      this.AddCustomerVisible = false
    },
    openpickMaintainisible(){
      this.pickMaintainisible = true
      this.releMaintainisible = false
    },
    openpickReletainisible() {
      this.releMaintainisible = true
      this.pickMaintainisible = false
    },
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection (selection) {
      this.selected = selection
    },
    getDbClick(row, event){
      this.selectInfo = row
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
    }
  }
}
</script>
