<template>
    <div class="tab-content" v-loading="loading">
        <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
        <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('reg')">异常登记</el-button>
          <el-button type="primary" :size="btnsize"  icon="el-icon-edit" @click="doAction('xiugai')" plain>异常修改</el-button>
          <el-button type="primary" :size="btnsize"  icon="el-icon-news" @click="doAction('check')" plain>查看明细</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
          
          <el-button type="primary" :size="btnsize"  plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="dataset"
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
            prop="id"
            label="序号"
            width="200">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="abnormalNo"
            width="120"
            label="异常编号">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="120"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            sortable
            width="200"
            label="开单时间">
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
          </el-table-column>
          <el-table-column
            prop="cargoName"
            sortable
            width="120"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="abnormalStatusName"
            label="异常状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="abnormalTypeName"
            width="120"
            label="异常类型">
          </el-table-column>
          <el-table-column
            label="登记网点"
            width="120"
            prop="orgName"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="dutyOrgName"
            label="责任网点"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="registerTime"
            sortable
            width="200"
            label="登记时间">
            <template slot-scope="scope">{{ scope.row.registerTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column
            prop="registerName"
            label="登记人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="登记金额"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            label="货号"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoPack"
            label="包装"
            width="120"
            sortable
            >
          </el-table-column>
           <el-table-column
            prop="cargoAmount"
            label="件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="abnormalDescribe"
            label="异常描述"
            width="120"
            sortables
            >
          </el-table-column>
          <!-- <el-table-column
            prop="disposeTime"
            label="处理时间"
            width="200"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.disposeTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column> -->
          <el-table-column
            prop="disposeResultName"
            label="处理结果"
            width="120"
            sortable
            type="dispose_result"
            >
          </el-table-column>
           <el-table-column
            prop="disposeOrgName"
            label="处理网点"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="disposeName"
            label="处理人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="disposeOpinion"
            label="处理意见"
            width="120"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
        <Addabnormal :issender="true" :isModify="isModify"  :isCheck="isCheck" :info="selectInfo" :id="id" :orgid="orgid" :companyId="otherinfo.companyId" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
        <!-- <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  /> -->
    </div>
</template>
<script>
import SearchForm from './components/search'
import { PostGetAbnormalList, delAbnormal } from '@/api/operation/dashboard'
import { mapGetters } from 'vuex'
// import TableSetup from './components/tableSetup'
import Pager from '@/components/Pagination/index'
import Addabnormal from './components/add'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
        // TableSetup,
    Addabnormal
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
            // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    Promise.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
            // this.licenseTypes = resArr[1]
    })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      loading: true,
      dataset: [],
      isModify: false,
      isCheck: false,
      AddAbnormalVisible: false,
      setupTableVisible: false,
      isDbclick: false,
      licenseTypes: [],
      selected: [],
      total: 0,
      id: '',
      searchQuery: {
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
        }
      }
    }
  },
  methods: {
        // getLicenType(id){
        //   let info = this.licenseTypes.filter(item => {
        //     console.log(item,id)
        //     return parseInt(item.id, 10) === id
        //     })
        //   return info[0] ? info[0].dictName : id
        // },
    fetchAllreceipt() {
      this.loading = true
      return PostGetAbnormalList(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
      })
    },

    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchData() {
      this.fetchAllreceipt()
    },
         // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
            // 根据搜索参数请求后台获取数据
      objectMerge2(this.searchQuery.vo, searchParam)
            // this.searchQuery.vo.orgId = searchParam.orgid
      this.fetchData()
    },
    doAction(type) {
      if (type === 'export') {
        this.showImport()
        return false
      }
          // 判断是否有选中项
      if (!this.selected.length && type !== 'reg') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
              // 登记
        case 'reg':
          this.isModify = false
          this.isCheck = false
                // this.isDbclick = false
          console.log(this.isModify)
          this.selectInfo = {}
          this.openAddAbnormal()
          break
              // 修改
        case 'xiugai':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据',
              type: 'warning'
            })
          } else if (this.selected[0].abnormalStatus === 118) {
            this.selectInfo = {}
            this.isModify = true
            this.isCheck = false
                  //  this.isDbclick = false
            this.selectInfo = Object.assign({}, this.selected[0])
            // console.log(this.id)

            this.openAddAbnormal()
          } else if (this.selected[0].abnormalStatus === 119) {
            this.$message.warning('异常已经处理，不允许删除~')
          }
          break
          // 查看明细
        case 'check':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次自能查看单条数据',
              type: 'warning'
            })
          } else {
                    // this.isDbclick = false
            this.isModify = false
            this.isCheck = true
            // this.id = this.selected[0].id
            this.selectInfo = Object.assign({}, this.selected[0])
            this.openAddAbnormal()
            // console.log(this.selectInfo, this.id + 'xz')
          }
          break
        // 删除
        case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].id
                    // =>todo 删除多个
                    // ids = ids.join(',')
          // const ids = this.selected.filter(el => {
          //   return el.abnormalStatus === 118
          // }).map(el => {
          //   return el.id
          // })

          const ids = this.selected.map(item => {
            return item.id
          })

          // console.log(ids)
          if (this.selected[0].abnormalStatus === 118) {
            this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delAbnormal(ids).then(res => {
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
          } else if (this.selected[0].abnormalStatus === 119) {
            this.$message.warning('异常已处理，不允许删除')
          }

          // this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
          //   confirmButtonText: '删除',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   delAbnormal(ids).then(res => {
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     })
          //     this.fetchData()
          //   }).catch(err => {
          //     this.$message({
          //       type: 'info',
          //       message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
          //     })
          //   })
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   })
          // })

          // const deleteItem = this.selected[0].id
          // const ids = this.selected.map(item => {
          //   return item.abnormalStatus !== 119
          // })
          // if (ids.length) {
          //   this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
          //     confirmButtonText: '删除',
          //     cancelButtonText: '取消',
          //     type: 'warning'
          //   }).then(() => {
          //     delAbnormal(ids).then(res => {
          //       this.$message({
          //         type: 'success',
          //         message: '删除成功!'
          //       })
          //       this.fetchData()
          //     }).catch(err => {
          //       this.$message({
          //         type: 'info',
          //         message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
          //       })
          //     })
          //   }).catch(() => {
          //     this.$message({
          //       type: 'info',
          //       message: '已取消删除'
          //     })
          //   })
          // } else {
          //   this.$message.warning('异常已经处理，不允许删除~')
          // }
          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    openAddAbnormal() {
      this.AddAbnormalVisible = true
    },
    closeAddAbnormal() {
      this.AddAbnormalVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    getDbClick(row, event) {
      this.selectInfo = row
      this.isCheck = true
      this.isModify = false
      // this.id = row.id
      this.openAddAbnormal()
    }
  }
}
</script>
