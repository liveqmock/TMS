<template>
  <div class="tab-content manage-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新建</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('acceptance')" plain>受理</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('refuse')" plain>拒绝</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('cancel')" plain>作废</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
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
            <template slot-scope="scope">{{ ((searchForms.currentPage - 1)*searchForms.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orderSn"
            width="130"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop='orerStatusName'
            width="110"
            sortable
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            sortable
            width="130"
            label="关联运单号">
          </el-table-column>
          <el-table-column
            prop="orderTypeName"
            sortable
            width="110"
            label="订单类型">
          </el-table-column>
          <el-table-column
            sortable
            prop="orderEffectiveName"
            width="100"
            label="紧急度">
          </el-table-column>
          <el-table-column
            label="提货方式"
            width="110"
            prop="orderPickupMethodName"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="货品名"
            width="90"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoAmount"
            width="80"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            label="重量"
            width="90"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoPack"
            label="包装"
            width="80"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="description"
            label="品种规格"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipFee"
            label="运费"
            width="80"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderPayWayName"
            label="付款方式"
            width="110"
            sortable
          >
          </el-table-column>
          <!--创建时间-->
          <el-table-column
            label="创建时间"
            prop="createTime"
            width="160"
            sortable
          >
            <!--<template slot-scope="scope">-->
              <!--{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}-->
            <!--</template>-->
            <!--<template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}{m}{d}') }}</template>-->
          </el-table-column>
          <el-table-column
            prop="senderName"
            label="发货人"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="senderMobile"
            label="发货人电话"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="receiverName"
            label="收货人"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="receiverMobile"
            label="收货人电话"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="refuseReason"
            label="拒绝原因"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderRemarks"
            label="备注"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderFromCityName"
            label="出发城市"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderToCityName"
            label="目的城市"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderFromOrgName"
            label="开单网点"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderToOrgName"
            label="目的网点"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="声明价值"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收款"
            width="90"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="commissionFee"
            label="代收款手续费"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数单价"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="weightFee"
            label="重量单价"
            width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="volumeFee"
            label="体积单价"
            width="110"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { getPostlist,putRefuse,deletebatchDelete,putCancel,putAccept } from '../../../../api/operation/manage'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/add'
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
        // console.log(this.selectInfo.orgid , this.searchForms.vo.orgid , this.otherinfo.orgid)
        return this.isModify ? this.selectInfo.orgid : this.searchForms.vo.orgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchForms.vo.orgid = this.otherinfo.orgid
    // this.fetchAllList(this.otherinfo.orgid).then(res => {
    //   this.loading = false
    // })
    // this.fetchAllList(this.otherinfo.orgid)
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
      isModify: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],

      searchForms: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {

          orderStatus: '',
          orderSn: '',
          createTime: '',
          endTime: ''
        }
      }
    }
  },
  mounted(){
    this.eventBus.$on('putAcceptOrder', (_ids) => {
      putAccept(_ids).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.fetchData()
      }).catch(err=>{
        this.$message({
          type: 'info',
          message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
        })
      })
    })
  },
  methods: {
    fetchAllList() {
      this.loading = true
      return getPostlist(this.searchForms).then(data => {
        this.usersArr = data.list
        this.total = data.totalCount
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllList()
    },
    handlePageChange (obj) {
      this.searchForms.currentPage = obj.pageNum
      this.searchForms.pageSize = obj.pageSize
    },
    getSearchParam (obj) {
      this.searchForms.vo = objectMerge2(this.searchForms.vo, obj)
      this.fetchAllList()
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
      if(!this.selected.length && type !== 'add' && type !== 'acceptance'){
          this.closeAddCustomer()
          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }
      else if(!this.selected.length && type === 'acceptance'){
        this.closeAddCustomer()
        this.$message({
          message: '请选择要受理的订单~',
          type: 'warning'
        })
        return false
      }

      // console.log("this.selected:", this.selected)

      switch (type) {
          // 添加客户
          case 'add':
              this.isModify = false
              this.isDbclick = false
              this.selectInfo = {}
              this.openAddCustomer()
              break;
              //受理  acceptance
          case 'acceptance':
            this.isModify = false
            this.isDbclick = false
            this.closeAddCustomer()
            this.selectInfo = this.selected[0]
            if(this.selected.length > 1){
              this.$message({
                message: '每次只能修改单条数据~',
                type: 'warning'
              })
            }
            if(this.selected[0].orderStatus === 213){
              // this.$router.push('/operation/order/createOrder?preId=' + this.selected[0].id)
              this.eventBus.$emit('showCreateOrder',{
                preid: this.selected[0].id
              })

            //  订单至少需要一个预订单，点击受理跳转到开单页面
            }else if(this.selected[0].orerStatusName === "已受理" ) {
              this.$message({
                message: '订单已经受理了~',
                type: 'warning'
              })
              return false
            }else{
              return false
            }
            break;
          // 修改
          case 'modify':

          if(this.selected.length > 1){
                  this.$message({
                      message: '每次只能修改单条数据~',
                      type: 'warning'
                  })
              }
            else {
            if(this.selected[0].orderStatus === 213){
              this.openAddCustomer()

              this.isModify = true
              this.isDbclick = false
              this.selectInfo = this.selected[0]
            }else{
              this.$message({
                message: '未受理才能修改~',
                type: 'warning'
              })
              this.closeAddCustomer()
            }

          }

              break;
        // 作废
        case 'cancel':
          this.closeAddCustomer()
          if(this.selected[0].orderStatus == 213){
            let _deleteIt = this.selected.length > 1 ? this.selected.length + '条' : this.selected[0].orderSn
            let _ids = this.selected.map(item => {
              return item.id
            })
            _ids = _ids.length > 1 ? _ids.join(',') : _ids
            this.$confirm('确定要操作 ' + _deleteIt + ' 订单号吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              putCancel(_ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                this.fetchData()
              }).catch(err=>{
                this.$message({
                  type: 'info',
                  message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
                })
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
          }else if(this.selected[0].orderStatus === 214){
            this.$message({
              message: '已受理的订单不可以作废~',
              type: 'warning'
            })
          }else{
            this.$message({
              message: '已作废的订单不可以作废~',
              type: 'warning'
            })
          }

          break;
        // 拒绝 'refuse':
          case 'refuse':

            this.closeAddCustomer()
            if(this.selected[0].orderStatus == 213){
              //=>todo 删除多个
              let ids = this.selected.map(item => {
                return item.id
              })
              ids = ids.splice(',')
              this.$prompt('拒绝原因', '拒绝订单', {

                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then((value ) => {
                let refuseReason = value.value
                let data = {
                    ids ,
                    refuseReason
                  }
                 data.ids = ids
                data.refuseReason = refuseReason
                putRefuse(data).then(res => {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  })
                  this.fetchData()
                }).catch(err=>{
                  this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err
                  })
                })

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消操作'
                })
                this.loading = false
              })
            }else if(this.selected[0].orderStatus === 214){
              this.$message({
                message: '已受理的订单不可以拒绝~',
                type: 'warning'
              })
              return false
            }else{
              this.$message({
                message: '该订单不可以拒绝~',
                type: 'warning'
              })
              return false
            }

            break;
          // 删除
          case 'delete':
            this.closeAddCustomer()
            if(this.selected[0].orderStatus === 213 || this.selected[0].orderStatus === 215){

              let deleteIt = this.selected.length > 1 ? this.selected.length + '条' : this.selected[0].orderSn
              let ids = this.selected.map(item => {
                return item.id
              })
              ids = ids.length > 1 ? ids.join(',') : ids
              this.$confirm('确定要删除 ' + deleteIt + ' 订单号吗？', '提示', {
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
            }else if(this.selected[0].orderStatus === 214){
              this.$message({
                message: '已受理的订单不可以删除~',
                type: 'warning'
              })
            }
            else{
              this.$message({
                message: '未受理和已拒绝订单才可以删除~',
                type: 'warning'
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
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
<style lang="scss">
.manage-content{
    .el-message-box__message{
      padding-left: 0;
    }

}
</style>
