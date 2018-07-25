<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">对账明细</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>打印</el-button>

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
            width="120">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="200"
            label="网点">
          </el-table-column>
          <el-table-column
            prop="customerUnit"
            width="200"
            sortable
            label="发货方">
          </el-table-column>
          <el-table-column
            prop="customerName"
            sortable
            width="200"
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="customerMobile"
            sortable
            width="200"
            label="客户电话">
          </el-table-column>

          <el-table-column
            sortable
            prop="totalFee"
            width="190"
            label="对账合计">
          </el-table-column>
          <el-table-column
            prop="receivableFee"
            label="应收账款"
            width="190"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="payableFee"
            label="应付账款"
            width="200"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="totalCount"
            label="总单数"
            width="180"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import {  getExportExcel } from '@/api/company/customerManage'
//postCustomerdetailList
import {postTmsFfinancialwayList,putStop} from '@/api/finance/financefinancialway'
import {postCustomerdetailList} from '@/api/finance/fin_customer'
import SearchForm from './components/search'
import TableSetup from './components/tableSetup'
import AddCustomer from './components/add'
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
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        // return this.isModify ? this.selectInfo.arriveOrgid : this.searchQuery.vo.arriveOrgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    // this.fetchAllCustomer()
    // Promise.all(this.fetchAllCustomer(this.otherinfo.orgid)).then(res => {
    //   console.log(res)
    //   this.loading = false
    // })
  },
  data () {
    return {
      loading: false,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId:'',
      batchTypeId:'',//批次状态
      //加载状态
      // loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgId":'',
          customerName: '',//
          customerMobile: '',//
          startTime: '',//
          endTime:''
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return postCustomerdetailList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      })
    },
    fetchData () {
      this.fetchAllCustomer()
    },
    handlePageChange (obj) {
      // Object.assign(this.searchQuery, obj)
      // this.fetchData()
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
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
          // this.closeAddCustomer()
          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }

      switch (type) {
        // 明细
          case 'storage':
            this.selectInfo = this.selected[0]

            this.$router.push({
              path: '/finance/reconciliation/customer/detailTable',
              query: {
                tab: '客户对账',
                id: this.selectInfo.shipSenderId
              }
            })

            break;
          // 停用
          case 'stop':
            this.closeAddCustomer()
            if(this.selected.length > 1){
              this.$message({
                message: '只能选择一条数据进行跟踪设置~',
                type: 'warning'
              })
              return false

            }else{
              if(this.selected[0].statusStr === '启用'){
                let id = this.selected[0].id
                putStop(id).then(res => {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '操作成功~'
                  })
                      this.fetchData()
                }).catch(err => {
                  this.loading = false
                })
              }else{
                this.$message({
                 type: 'info',
                 message: '当前收支方式已经在停用状态~'
                })
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
      this.selectInfo = row
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
    }
  }
}
</script>
