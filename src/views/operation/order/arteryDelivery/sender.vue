<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('sure')">到车确定</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">到货入库</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deselectCar')" plain>取消到车</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消入库</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>导入批次</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>导入配载</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>打印配载清单</el-button>
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
            prop="batchNo"
            width="120"
            label="发车批次">
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
            prop="endOrgName"
            sortable
            width="110"
            label="目的网点">
          </el-table-column>
          <el-table-column
            sortable
            prop="bathStatusName"
            width="110"
            label="批次状态">
          </el-table-column>
          <el-table-column
            label="发车时间"
            width="160"
            sortable
            >
            <template slot-scope="scope">
              {{ scope.row.loadTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>

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
            width="130"
            label="司机名称">
          </el-table-column>
          <el-table-column
            prop="dirverMobile"
            label="司机电话"
            width="130"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="actualAmount"
            label="实到件数"
            width="110"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="truckLoad"
            label="实到重量"
            width="110"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckVolume"
            label="实到体积"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="amountall"
            label="配载总件数"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightall"
            label="配载总重量"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeall"
            label="配载总体积"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightRate"
            label="重量装载率"
            width="160"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeRate"
            label="体积装载率"
            width="160"
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
            prop="totalFee"
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
              {{ scope.row.requireArrivedTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="配载人"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="truckName"
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
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { postArtList ,postCancelLoad ,postCancelPut ,postConfirmToCar} from '@/api/operation/arteryDelivery'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/storages'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'

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

      }
  },
  mounted () {
    this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
    this.fetchAllCustomer()
  },
  data () {
    return {
      loading: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      batchTypeId:'',//批次状态
      //加载状态
      // loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "arriveOrgid": '',
          dirverName: '',
          truckIdNumber:'',//车牌号
          batchTypeId: '',//批次状态
          batchNo:'',//发车批次
          loadTypeId:39,//配载类型
          endTime:'',//结束时间
          beginTime:'',//
          arrivedbeginDate:'',//到达时间(起始时间)
          arrivedEndDate:''//到达时间(结束时间)
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      // this.$set(this.searchQuery.vo, 'orgId', this.otherinfo.orgid)
      return postArtList(this.searchQuery).then(data => {
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
        if(!this.selected.length){
            this.closeAddCustomer()
            this.$message({
                message: '请选择要操作的项~',
                type: 'warning'
            })
            return false
        }

      switch (type) {
          // ruku
          case 'storage':
            if(this.selected.length > 1){
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false

            }else{
              if(this.selected[0].bathStatusName === '已到车'){
                this.selectInfo = this.selected[0]
                this.isModify = false
                this.openAddCustomer()
              }else{
                this.closeAddCustomer()
                this.$message({
                  message: '已到车的批次才可以做到货入库~',
                  type: 'warning'
                })
                return false
              }

            }

              break;
          //到车确定
          case 'sure':
            this.closeAddCustomer()
              if(this.selected.length > 1){
                  this.$message({
                      message: '每次只能修改单条数据~',
                      type: 'warning'
                  })
                return false
              }else{
                //在途中
                let id = this.selected[0].id
                if(this.selected[0].bathStatusName === '在途中'){
                  postConfirmToCar(id,54).then(res => {
                    this.$message({
                      type: 'success',
                      message: '到车确定成功~'
                    })
                    this.fetchData()

                  }).catch(err=>{
                    this.$message({
                      type: 'info',
                      message: '到车失败，原因：' + err.errorInfo ? err.errorInfo : err
                    })
                  })

                }else{
                  this.closeAddCustomer()
                  let bathStatusName = this.selected[0].bathStatusName
                  this.$message({
                    message: '批次状态为：' + bathStatusName + '不允许做到车确定~',
                    type: 'warning'
                  })
                  return false
                }
              }
              break;
        // sure 到车确定   deselectCar取消到车  deleteStor取消入库

          // deselectCar取消到车
          case 'deselectCar':
            this.closeAddCustomer()

            let ids = this.selected.filter(el=>{
              return el.bathStatusName === '已到车'
            }).map(el => {
              return  el.id
            })
            if(!ids.length){
              let bathStatusName = this.selected[0].bathStatusName
              this.$message({
                message: '批次状态为：' + bathStatusName + '不允许取消到车~',
                type: 'warning'
              })
              return false
            }else {
              ids = ids.join(',')
                this.$confirm('确定要取消到车？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  postCancelLoad(ids, 54).then(res => {
                    this.$message({
                      type: 'success',
                      message: '已取消到车~'
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
          // 取消入库
          case 'deleteStor':
            this.closeAddCustomer()
            if(this.selected.length > 1){
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
              return false
            }else{
              let deleteItemName =this.selected[0].batchNo
              //=>todo 删除多个
              let _ids = this.selected.map(item => {
                return item.id
              })
              _ids = _ids.join(',')

              if(this.selected[0].bathStatusName === '已入库'){
                this.$confirm('确定要取消发车批次 ' + deleteItemName + ' 入库吗？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  postCancelPut(_ids,54).then(res => {
                    this.$message({
                      type: 'success',
                      message: '已取消入库~'
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
                    message: '已取消入库'
                  })
                })
              }else{
                this.closeAddCustomer()
                let bathStatusName = this.selected[0].bathStatusName
                this.$message({
                  message: '批次状态为：' + bathStatusName + '不允许取消入库~',
                  type: 'warning'
                })
                return false
              }
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
      // this.selectInfo = row
      // this.isModify = true
      // this.openAddCustomer()
      console.log(row.bathStatusName);
      if(row.bathStatusName === '在途中'){
        this.selectInfo = row
        this.isModify = true
        this.openAddCustomer()
      }else {
        let bathStatusName = row.bathStatusName
        this.$message({
          message: '批次状态为：' + bathStatusName + '不允许做到车确定~',
          type: 'warning'
        })
        this.closeAddCustomer()
        return false
      }
    }
  }
}
</script>
