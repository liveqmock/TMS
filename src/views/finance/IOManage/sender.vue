<template>
  <!--v-loading="loading"-->
  <div class="tab-content" >
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

          <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('stop')" plain>停用</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('deleteStor')" plain>取消入库</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>

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
            width="160">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="120"
            label="所属网点">
          </el-table-column>
          <el-table-column
            prop="financialWay"
            width="110"
            sortable
            label="收支方式">
          </el-table-column>
          <el-table-column
            prop="bankName"
            sortable
            width="140"
            label="银行名称">
          </el-table-column>
          <el-table-column
            prop="bankAccount"
            sortable
            width="180"
            label="银行卡号">
          </el-table-column>

          <el-table-column
            sortable
            prop="bankAccountName"
            width="130"
            label="开户人">
          </el-table-column>
          <el-table-column
            prop="alipayAccount"
            label="支付宝账号"
            width="150"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="wechatAccount"
            label="微信号"
            width="150"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="statusStr"
            label="状态"
            width="110"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="110"
            sortable
          >
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="160"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
            </template>
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
import {  getExportExcel } from '@/api/company/customerManage'
import { postArtList ,postCancelLoad ,postCancelPut } from '@/api/operation/arteryDelivery'
import {postTmsFfinancialwayList,putStop} from '@/api/finance/financefinancialway'
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
        //要不你先去健身，差不多
        // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
        // return this.isModify ? this.selectInfo.arriveOrgid : this.searchQuery.vo.arriveOrgid || this.otherinfo.orgid
      }
  },
  mounted () {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchAllCustomer()
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
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgId":'',
          financialWay: '',//收支方式名称
          status:''
        }
      }
    }
  },
  methods: {
    fetchAllCustomer () {
      this.loading = true
      return postTmsFfinancialwayList(this.searchQuery).then(data => {
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

      if(!this.selected.length && type !== "storage"){
          // this.closeAddCustomer()
          this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
          })
          return false
      }

      switch (type) {
        // 新增
          case 'storage':
            this.isModify = false
            this.openAddCustomer()
            break;
          //  修改
          case 'modify':
            this.closeAddCustomer()
          if(this.selected.length > 1){
            this.$message({
              message: '只能选择单条数据进行跟踪设置~',
              type: 'warning'
            })
            return false

          }else{
            this.selectInfo = this.selected[0]
            this.isModify = true
            this.openAddCustomer()
          }

            break;
          // 停用
          case 'stop':
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
      this.openAddCustomer()
    }
  }
}
</script>
