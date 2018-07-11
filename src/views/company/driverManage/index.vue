<template>
  <div class="driver-manager" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
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
            width="80">
            <template slot-scope="scope">
              {{ (searchQuery.currentPage - 1)*searchQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="120"
            label="归属网点">
          </el-table-column>
          <el-table-column
            prop="driverName"
            sortable
            width="120"
            label="司机姓名">
          </el-table-column>
          <el-table-column
            prop="driverMobile"
            sortable
            width="120"
            label="司机电话">
          </el-table-column>
          <el-table-column
            sortable
            width="200"
            prop="driverCardid"
            label="身份证号码">
          </el-table-column>
          <el-table-column
            label="驾驶证类型"
            width="120"
            sortable
            >
            <template slot-scope="scope">
              {{ getLicenType(scope.row.licenseType) }}
            </template>
          </el-table-column>
          <el-table-column
            label="驾驶证有效期"
            width="180"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.validityDate | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="bankCardNumber"
            label="银行卡号"
            width="200"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="银行名称"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="openBank"
            label="开户行"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="driverAddress"
            label="地址"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="driverRemarks"
            label="备注"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
    <AddCustomer :licenseTypes="licenseTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getAllDriver, deleteSomeDriverInfo, getExportExcel, getDriverLiceseType } from '@/api/company/driverManage'
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
    orgid() {
        console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
        return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
      }
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    Promise.all([this.fetchAllCustomer(this.otherinfo.orgid), getDriverLiceseType(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
      this.licenseTypes = resArr[1]
    })
  },
  data() {
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': 1,
          driverMobile: '',
          driverName: ''
        }
      },
      licenseTypes: []
    }
  },
  methods: {
    getLicenType(id) {
      const info = this.licenseTypes.filter(item => {
        console.log(item, id)
        return parseInt(item.id, 10) === id
      })
      return info[0] ? info[0].dictName : id
    },
    fetchAllCustomer() {
      this.loading = true
      return getAllDriver(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.totalCount
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(obj) {
      this.searchQuery.vo.orgid = obj.orgid
      this.searchQuery.vo.driverMobile = obj.mobile
      this.searchQuery.vo.driverName = obj.name
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        return false
      }
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add') {
        this.closeAddCustomer()
        this.$message({
            message: '请选择要操作的项~',
            type: 'warning'
          })
        return false
      }

      console.log('this.selected:', this.selected)


      switch (type) {
          // 添加客户
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.openAddCustomer()
          break
          // 修改客户信息
          case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
                this.$message({
                    message: '每次只能修改单条数据~',
                    type: 'warning'
                  })
              }
          this.selectInfo = this.selected[0]
          this.openAddCustomer()
          break
          // 删除客户
          case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].driverName
                  // =>todo 删除多个
          let ids = this.selected.map(item => {
                    return item.id
                  })
          ids = ids.join(',')

          this.$confirm('确定要删除 ' + deleteItem + ' 客户吗？', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    deleteSomeDriverInfo(ids).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                          })
                        this.fetchData()
                      }).catch(err => {
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
          break
          // 导出数据
          case 'export':
          const ids2 = this.selected.map(el => {
                return el.id
              })
          getExportExcel(ids2.join(',')).then(res => {
                this.$message({
                  type: 'success',
                  message: '即将自动下载!'
                })
              })
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    openAddCustomer() {
      this.AddCustomerVisible = true
    },
    closeAddCustomer() {
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    }
  }
}
</script>
<style lang="scss" scoped>
  .driver-manager{
    height: 100%;
    width: 100%;
    padding: 0 0 40px;
  }
</style>
<style lang="scss">
.driver-manager{
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
        padding:10px 10px;
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction:column;

        .btns_box{
            margin-bottom:10px;
            .el-button{
                margin-right:0;
            }
            .table_setup{
                float: right;
                margin-right: 0;
            }
        }
        .info_tab{
            width: 100%;
            height: calc(100% - 68px);
            flex-grow: 1;
            
            .el-table{
                table{
                    th,td{
                        text-align:center;
                    }
                }
                .unauth{
                    color: #f00;
                }
            }
            .el-table td, .el-table th{
                padding: 5px 0;
            }
        }
    }
    .info_tab_footer{
        padding-left: 20px;
        background: #eee;
        height: 40px;
        line-height: 40px;
        box-shadow: 0 -2px 2px rgba(0,0,0,.1);
        position: relative;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .show_pager{
        float: right;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
    }
}
</style>
