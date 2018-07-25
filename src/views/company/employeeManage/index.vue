<template>
    <div class="staff_manage" v-loading="loading">
        <SearchForm :groups="groupsArr" :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
        <div class="staff_info">
            <div class="btns_box">
                <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增员工</el-button><el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('auth')" plain>员工授权</el-button><el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button><el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button><el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
            </div>
            <div class="info_news">
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
                        {{ (searchForm.pageNum - 1)*searchForm.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                      fixed
                      sortable
                      prop="name"
                      width="150"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="orgName"
                      sortable
                      width="150"
                      label="归属网点">
                    </el-table-column>
                    <el-table-column
                      prop="departmentName"
                      sortable
                      width="150"
                      label="归属部门">
                    </el-table-column>
                    <el-table-column
                      prop="position"
                      sortable
                      width="150"
                      label="职务">
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      sortable
                      width="150"
                      label="登录账号">
                    </el-table-column>
                    <el-table-column
                      sortable
                      width="200"
                      label="权限角色">
                       <template slot-scope="scope">
                           <span v-if="scope.row.rolesId !== '0'">{{ scope.row.rolesName }}</span>
                           <span class="unauth" v-else>未授权</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="性别"
                      width="120"
                      sortable
                      >
                      <template slot-scope="scope">
                          {{ scope.row.sexFlag === "0" ? "男" : "女" }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="mobilephone"
                      label="联系手机"
                      width="150"
                      sortable
                      >
                    </el-table-column>
                    <el-table-column
                      sortable
                      label="创建日期">
                      <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}{m}{d}') }}</template>
                    </el-table-column>
                  </el-table>
            </div>

            <div class="info_news_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
        </div>
        <transition name="slideInRight">
            <AddEmployeer :isModify="isModify" :userInfo="theUser" :orgid="searchForm.orgid || otherinfo.orgid" :popVisible.sync="AddEmployeerVisible" @close="closeAddEmployeer" @success="fetchData"  />
        </transition>
        <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  />
        <transition name="slideInRight">
            <SetAuth :orgid="otherinfo.companyId" :popVisible.sync="SetAuthVisible" @close="closeAuth" @success="fetchData" :users="authUser" v-if="showSetAuth" />
        </transition>
    </div>
</template>

<script type="text/javascript">
import { getAllOrgInfo, getAllUser, deleteEmployeer } from '../../../api/company/employeeManage'
import { mapGetters } from 'vuex'
import SearchForm from './search'
import TableSetup from './tableSetup'
import AddEmployeer from './add'
import SetAuth from './authorization'
import Pager from '@/components/Pagination/index'

export default{
  components: {
    SearchForm,
    TableSetup,
    AddEmployeer,
    SetAuth,
    Pager
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
            // 请求获得的数据
      groupsArr: [],
      rolesArr: [],
      departmentArr: [],
      usersArr: [],
            // 加载状态
      loading: true,
            // 选中的行
      selected: [],
      authUser: [],
            // 保存要修改的用户
      theUser: {},
            // 按钮大小
      btnsize: 'mini',
            // 各个弹窗状态更改
      setupTableVisible: false,
      AddEmployeerVisible: false,
      SetAuthVisible: false,
      showTableSetup: false,
      showSetAuth: false,
      showAddEmployeer: false,
      searchForm: {
        name: '',
        pageSize: 100,
        pageNum: 1,
        mobile: '',
        orgid: ''
      },
      dialogFormVisible: false,
            // 是否修改员工信息
      isModify: false,
      total: 0
    }
  },
  mounted() {
    Promise.all([getAllOrgInfo(this.otherinfo.orgid), this.fetchAllUser(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
      this.groupsArr = resArr[0]
      this.usersArr = resArr[1].list
      this.total = resArr[1].total
    })
  },
  methods: {
    fetchAllUser(orgid, username, mobilephone) {
      return getAllUser(orgid, username || '', mobilephone || '')
    },
    doAction(type) {
            // 判断是否有选中项
      if (!this.selected.length && type !== 'add') {
        this.closeAuth()
        this.closeAddEmployeer()
        this.$message({
          message: '请选择要操作的员工~',
          type: 'warning'
        })
        return false
      }

      console.log('this.selected:', this.selected)

      switch (type) {
                // 添加员工
        case 'add':
          this.isModify = false
          this.theUser = {}
          this.openAddEmployeer()
          break
                // 修改员工信息
        case 'modify':
          this.isModify = true
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          }
          this.theUser = this.selected[0]
          this.openAddEmployeer()
          break
                // 删除员工
        case 'delete':
          var deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
                        // =>todo 删除多个
          var ids = ''
          this.selected.map(item => {
            ids += item.id + ','
          })
          ids = ids.slice(0, ids.length - 1)

          // const id = this.selected[0].id
          this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteEmployeer(ids).then(res => {
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
                // 设置员工权限
        case 'auth':
          this.authUser = this.selected
          this.openAuth()
          break
      }
            // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
        // 设置表格
    setTable() {
      this.showTableSetup = true
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    openAddEmployeer() {
      this.showAddEmployeer = true
      this.AddEmployeerVisible = true
    },
    closeAddEmployeer() {
      this.AddEmployeerVisible = false
    },
    openAuth() {
      this.showSetAuth = true
      this.SetAuthVisible = true
    },
    closeAuth() {
      this.SetAuthVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    fetchData(orgid = this.searchForm.orgid || this.otherinfo.orgid, name = this.searchForm.name, mobile = this.searchForm.mobile, pageSize = this.searchForm.pageSize, pageNum = this.searchForm.pageNum) {
      this.loading = true
      this.fetchAllUser(orgid, name, mobile).then(data => {
        this.loading = false
        this.usersArr = data.list
        this.total = data.total
      })
    },
        // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
            // 根据搜索参数请求后台获取数据
      Object.assign(this.searchForm, searchParam)
      this.fetchData()
    },
        // 获取翻页返回的数据
    handlePageChange(obj) {
      Object.assign(this.searchForm, obj)
      this.fetchData()
    }
  }

}
</script>


<style type="text/css" lang="scss">
    
.staff_manage{
    height: 100%;
    display: flex;
    flex-direction:column;
    position: relative;

    .staff_info{
        padding:10px 10px 40px;
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction:column;

        .btns_box{
            margin-bottom:10px;
            .el-button{
            }
            .table_setup{
                float: right;
                margin-right: 0;
            }
        }
        .info_news{
            width: 100%;
            height: calc(100% - 90px);
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
        }
    }
    .info_news_footer{
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
