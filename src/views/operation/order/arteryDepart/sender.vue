<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增配载</el-button>

          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('depart')">发车</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deselectCar')" plain>取消发车</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('sure')">修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消装车</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>打印合同</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          @row-dblclick="getDbClick"
          stripe
          border
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
            <template slot-scope="scope">{{ ((searchQuery.pageNum - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="batchNo"
            width="120"
            label="发车批次"

          >
          </el-table-column>
          <el-table-column
            prop="truckIdNumber"
            width="110"
            sortable
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="110"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="arriveOrgName"
            sortable
            width="110"
            label="目的网点">
          </el-table-column>
          <el-table-column
            sortable
            prop="batchTypeName"
            width="110"
            label="批次状态">
          </el-table-column>
          <el-table-column
            label="发车时间"
            width="160"

            sortable
            >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </template>
            <!--<template slot-scope="scope">{{ new Date(scope.row.createTime).toLocaleDateString() }}</template>-->
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="vipNum"-->
            <!--label="车牌号"-->
            <!--width="110"-->
            <!--sortable-->
            <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            sortable
            prop="dirverName"
            width="110"
            label="司机名称">
          </el-table-column>
          <el-table-column
            prop="dirverMobile"
            label="司机电话"
            width="110"
            sortable
            >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="actualAmount"-->
            <!--label="实到件数"-->
            <!--width="110"-->
            <!--sortable-->
            <!--&gt;-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
            <!--prop="truckLoad"-->
            <!--label="实到重量"-->
            <!--width="110"-->
            <!--sortable-->
            <!--&gt;-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="truckVolume"-->
            <!--label="实到体积"-->
            <!--width="110"-->
            <!--sortable-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop="loadAmountall"
            label="配载总件数"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="loadWeightall"
            label="配载总重量"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="loadVolumeall"
            label="配载总体积"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightLoadRate"
            label="重量装载率"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeLoadRate"
            label="体积装载率"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="nowpayCarriage"
            label="现付运费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="nowpayOilCard"
            label="现付油卡"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="arrivepayCarriage"
            label="到付运费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="arrivepayOilCard"
            label="到付油卡"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="backpayCarriage"
            label="回付运费"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="backpayOilCard"
            label="回付油卡"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipFeeAmount"
            label="运费合计"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="carloadInsuranceFee"
            label="整车保险费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="leaveHandlingFee"
            label="发站装卸费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="leaveOtherFee"
            label="发站其他费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="arriveHandlingFee"
            label="到站装卸费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="arriveOtherFee"
            label="到站其他费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            label="配载时间"
            width="160"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.loadTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </template>
            <!--<template slot-scope="scope">{{ new Date(scope.row.loadTime).toLocaleDateString() }}</template>-->
          </el-table-column>
          <el-table-column
            prop="userName"
            label="配载人"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="truckUserName"
            label="发车人"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="150"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { postSelectLoadMainInfoList,putLoadDepart,putCancelLoadDepart ,putCancelLoadTruck} from '@/api/operation/arteryDepart'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/storages'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import {objectMerge2} from '@/utils/index'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ]),
      orgid () {
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        // return this.isModify ? this.selectInfo.arriveOrgid : this.searchQuery.vo.arriveOrgid || this.otherinfo.orgid
      }
  },
  mounted () {
    //this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllCustomer()
  },
  data () {
    return {
      loading: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId:'',
      //加载状态
      // loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        // "currentPage": 1,
        "pageNum": 1,
        "pageSize": 100,
        "vo": {
          "orgId": '',
          dirverName: '',
          truckIdNumber:'',//车牌号
          batchTypeId: '',//批次状态
          batchNo:'',//发车批次
          loadTypeId:39,//配载类型 38
          loadEndTime:'',//结束时间
          loadStartTime:'',
          departureStartTime:'',
          departureEndTime:''
          // arriveOrgid:'',
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllCustomer()
    },
    handlePageChange (obj) {
      Object.assign(this.searchQuery, obj)
      this.fetchData()
      // this.searchQuery.currentPage = obj.pageNum
      // this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam (obj) {
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
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
        //新增配载
        case 'add':
        this.$router.push({path: '././load', query:{loadTypeId: 39}}) // 38-短驳 39-干线 40-送货
        break
        // 添加客户
        case 'storage':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false

          } else if (this.selected.length === 1) {

            this.selectInfo = this.selected[0]
            this.isModify = false
            this.openAddCustomer()
          }

          break;
        //修改
            case 'sure':

              if (this.selected.length > 1) {
                this.$message({
                  message: '每次只能修改单条数据~',
                  type: 'warning'
                })
                return false
              } else if (this.selected.length === 1) {
                this.selectInfo = this.selected[0]
                this.$router.push({path: '././load', query: {loadTypeId:39, info:this.selectInfo}})
              }
              break;
        //    发车
            case 'depart':
              let loadIds = this.selected.filter(el=>{
                return el.batchTypeName === '已装车'
              }).map(el => {
                return  el.id
              })
              if(!loadIds.length){
                let batchTypeName = this.selected[0].batchTypeName
                this.$message({
                  message: '批次状态为：' + batchTypeName + '不允许发车~',
                  type: 'warning'
                })
                return false
              }else {
                  //=>todo 删除多个
                  loadIds = loadIds.join(',')
                  this.$confirm('确定要发车？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    putLoadDepart(loadIds, 39).then(res => {
                      this.$message({
                        type: 'success',
                        message: '发车成功!'
                      })
                      this.fetchData()
                    }).catch(err => {
                      this.$message({
                        type: 'error',
                        message: '发车失败，原因：' + err.text ? err.text : err
                      })
                    })

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    })
                  })
              }

                break;
          //  取消配载发车(批量)
            case 'deselectCar':
              let ids = this.selected.filter(el=>{
                return el.batchTypeName==='在途中'
              }).map(el => {
                return  el.id
              })
              if(!ids.length){
                let batchTypeName = this.selected[0].batchTypeName
                this.$message({
                  message: '批次状态为：' + batchTypeName + '不允许取消发车~',
                  type: 'warning'
                })
                return false
              }else {
                //=>todo 删除多个

                ids = ids.join(',')
                this.$confirm('确定要取消发车？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  putCancelLoadDepart(ids, 39).then(res => {
                    this.$message({
                      type: 'success',
                      message: '取消装车成功!'
                    })
                    this.fetchData()
                  }).catch(err => {
                    this.$message({
                      type: 'info',
                      message: '取消失败，原因：' + err.errorInfo ? err.errorInfo : err
                    })
                  })

                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  })
                })
              }
                break;
        //  取消装车(批量)
        case 'deleteStor':
          let _ids = this.selected.filter(el=>{
            return el.batchTypeName==='已装车'
          }).map(el => {
            return  el.id
          })
          if(!_ids.length){
            let batchTypeName = this.selected[0].batchTypeName
            this.$message({
              message: '批次状态为：' + batchTypeName + '不允许取消装车~',
              type: 'warning'
            })
            return false
          }else{
            //=>todo 删除多个
            _ids = _ids.join(',')

            this.$confirm('确定要取消装车？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              putCancelLoadTruck(_ids,39).then(res => {
                this.$message({
                  type: 'success',
                  message: '取消装车成功!'
                })
                this.fetchData()
              }).catch(err=>{
                this.$message({
                  type: 'info',
                  message: '取消失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
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
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection (selection) {
      this.selected = selection
    },
    getDbClick(row, event){
      this.selectInfo = row
      // this.isModify = true
      this.openAddCustomer()
    }
  }
}
</script>
