<template>
  <!--v-loading="loading"-->
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" title="
送货" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">

        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('storage')">创建对账单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('completion')">对账完成</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('cancelCom')">取消完成</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('modify')">修改查看</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" plain @click="doAction('detele')">删除</el-button>
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
            width="100">
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="120"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="memberName"
            width="130"
            sortable
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="memberPerson"
            sortable
            width="120"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            width="160"
            label="创建时间">
          </el-table-column>

          <el-table-column
            sortable
            prop="payAmount"
            width="120"
            label="应付账款">
          </el-table-column>
          <el-table-column
            prop="hadPayAmount"
            label="已付账款"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="memberPersonPhone"
            label="司机电话"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="checkStartTime"
            label="开始时间"
            width="160"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="checkEndTime"
            label="结束时间"
            width="160"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="运输总数"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="checkStatusZh"
            label="对账状态"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="bankAccount"
            label="银行卡号"
            width="180"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="开户行"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="wechatAccount"
            label="微信"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="alipayAccount"
            label="支付宝"
            width="150"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="130"
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
  import {postCompletion} from '@/api/finance/fin_customer'
  import {postCarfShortDetailList,deleteCarShort} from '@/api/finance/fin_carfee'
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
      }
    },
    mounted () {
      this.searchQuery.vo.orgId = this.otherinfo.orgid
      // this.searchQuery.vo.memberId = this.$route.query.id
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
            memberName: '',//
            memberPerson: '',//
            status: '',// 0未 1已
            loadTypeId: 40,//
            startTime: '',//
            endTime:''
          }
        }
      }
    },
    methods: {
      fetchAllCustomer () {
        this.loading = true
        return postCarfShortDetailList(this.searchQuery).then(data => {
          this.usersArr = data.list
          this.total = data.total
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

        if(!this.selected.length && type !== 'storage'){
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
            this.$router.push({
              path: '/finance/reconciliation/carfee/components/deliverRecon',
              query: {
                tab: '送货对账-创建对账'
              }
            })

            break;
          // 修改
          case 'modify':
            this.$router.push({
              path: '/finance/reconciliation/carfee/components/deliverRecon',
              query: {
                tab: '送货对账-修改查看',
                id: this.selected[0].id
              }
            })

            break;
          // 对账完成 cancelCom
          case 'completion':
            this.closeAddCustomer()
            if(this.selected.length > 1){
              this.$message({
                message: '只能选择一条数据进行跟踪设置~',
                type: 'warning'
              })
              return false

            }else{
              if(this.selected[0].checkStatus === 0){
                let data = {
                  id:'',
                  checkStatus:0
                }
                data.id = this.selected[0].id
                postCompletion(data).then(res => {
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
                  message: '该对账单已经完成对账~'
                })
              }
            }

            break;
          // 取消对账
          case 'cancelCom':
            this.closeAddCustomer()
            if(this.selected.length > 1){
              this.$message({
                message: '只能选择一条数据进行跟踪设置~',
                type: 'warning'
              })
              return false

            }else{
              if(this.selected[0].checkStatus === 1){
                let _data = {
                  id:'',
                  checkStatus:1
                }
                _data.id = this.selected[0].id
                postCompletion(_data).then(res => {
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
                  message: '该对账单还没对账~'
                })
              }
            }

            break;
          // 删除
          case 'detele':
            this.closeAddCustomer()
            if(this.selected.length > 1){
              this.$message({
                message: '只能选择一条数据进行跟踪设置~',
                type: 'warning'
              })
              return false

            }else{
              if(this.selected[0].checkStatus === 0){
                let id = this.selected[0].id
                deleteCarShort(id).then(res => {
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
                  message: '该对账单已完成对账不可以删除~'
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
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
</script>



