<template>
  <div class="truck-manager" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :truckSources="truckSources" :btnsize="btnsize" />  
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
            prop="truckIdNumber"
            fixed            
            sortable
            width="120"
            label="车牌号">
          </el-table-column>
          <el-table-column
            sortable
            prop="orgName"
            width="120"
            label="归属网点">
          </el-table-column>
          <el-table-column
            sortable
            width="130"
            label="车辆来源">
            <template slot-scope="scope">
              {{ getLabelName(scope.row.truckSource, truckSources) }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="truckLoad"
            width="130"
            label="可载重（吨）">
          </el-table-column>
          <el-table-column
            label="可载体积"
            prop="truckVolume"
            width="130"
            sortable
            >
          </el-table-column>
          <el-table-column
            label="车长"
            prop="truckHeight"
            width="100"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckWidth"
            label="车宽"
            width="100"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckHeight"
            label="车高"
            width="100"
            sortable
            >
          </el-table-column>
          <el-table-column
            label="车型"
            width="100"
            sortable
            >
            <template slot-scope="scope">
              {{ getLabelName(scope.row.truckType, truckTypes) }}
            </template>
          </el-table-column>
          <el-table-column
            label="车辆注册时间"
            width="150"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.truckRegisterDate | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            label="车辆报废时间"
            width="150"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.truckScrapDate | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="truckRemarks"
            label="备注"
            width="100"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckUnit"
            label="车辆单位"
            width="130"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="truckUnitMobile"
            label="单位电话"
            width="130"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="driverName"
            label="司机"
            width="100"
            sortable
            >
          </el-table-column>

          <el-table-column
            prop="dirverMobile"
            label="司机电话"
            width="130"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
    <AddCustomer :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
  </div>
</template>
<script>
import { getAllTrunk, deleteSomeTrunkInfo, getExportExcel, getTruckType, getTruckSource } from '@/api/company/trunkManage'
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
    Promise.all([this.fetchAllCustomer(this.otherinfo.orgid), getTruckType(this.otherinfo.orgid), getTruckSource(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
      this.truckTypes = resArr[1]
      this.truckSources = resArr[2]
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
          truckIdNumber: '',
          truckSource: ''
        }
      },
      truckSources: [],
      truckTypes: []
    }
  },
  methods: {
    getLabelName(id, data) {
      console.log('data:', data)
      const info = data.filter(item => {
        return parseInt(item.id, 10) === id
      })
      return info[0] ? info[0].dictName : id
    },
    getLicenType(id) {
      const info = this.truckSources.filter(item => {
        console.log(item, id)
        return parseInt(item.id, 10) === id
      })
      return info[0] ? info[0].dictName : id
    },
    fetchAllCustomer() {
      this.loading = true
      return getAllTrunk(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
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
      this.searchQuery.vo.truckIdNumber = obj.truckIdNumber
      this.searchQuery.vo.truckSource = obj.truckSource
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
          var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].driverName
                  // =>todo 删除多个
          var ids = this.selected.map(item => {
            return item.truckId
          })
          ids = ids.join(',')

          this.$confirm('确定要删除 ' + deleteItem + ' 客户吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteSomeTrunkInfo(ids).then(res => {
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
          var ids2 = this.selected.map(el => {
            return el.truckId
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
  .truck-manager{
    height: 100%;
    width: 100%;
    padding: 0 0 40px;
  }
</style>
<style lang="scss">
.truck-manager{
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
        padding:10px;
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
