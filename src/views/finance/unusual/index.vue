<template>
<div class="tab-wrapper tab-wrapper-100">
    <div class="tab-content" v-loading="loading">
        <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" class="el-icon-circle-plus"  plain @click="doAction('reg')">异动登记</el-button>
          <el-button type="primary" :size="btnsize" class="el-icon-edit" @click="doAction('xiugai')" plain>修改</el-button>
          <!-- <el-button type="primary" :size="btnsize"  @click="doAction('check')" plain>查看明细</el-button> -->
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" class="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
          
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
            width="80">
          </el-table-column>
          <!-- 没有返回字段名 -->
          <el-table-column
            label="开单网点"
            width="180"
            prop="shipFromOrgid"
            sortable
            >
          </el-table-column>
           <el-table-column
            sortable
            width="200"
            label="开单日期">
            <template slot-scope="scope">{{ scope.row.shipCreateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="120"
            sortable
            label="运单号">
          </el-table-column>
         
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="120"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityCode"
            label="出发城市"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="shipToCityCode"
            width="120"
            label="到达城市">
          </el-table-column>
           <!-- 没有返回字段名 -->
          <el-table-column
            prop="status"
            label="结算状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="changeFee"
            label="异动费用"
            width="120"
            sortable
            >
          </el-table-column>
           <!-- 没有返回字段名 -->
          <el-table-column
            prop="feeTypeId"
            label="费用类型"
            width="120"
            sortable
            >
          </el-table-column>

           <el-table-column
            prop=""
            label="异动时间"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
   
          <el-table-column
            prop="remark"
            label="异动备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipStatusName"
            label="运单状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="senderCustomerName"
            label="发货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="senderCustomerMobile"
            label="发货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverCustomerName"
            label="收货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverCustomerMobile"
            label="收货人电话"
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
            prop="cargoName"
            label="货品名"
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
            prop="cargoWeight"
            label="重量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipRemarks"
            label="运单备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="nowPayFee"
            label="现付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="arrivePayFee"
            label="到付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiptPayFee"
            label="回单付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="monthPayFee"
            label="月结"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="多笔付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            label="到达省"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template>     
          </el-table-column>
          <el-table-column
            label="到达市"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template>
          </el-table-column>
          <el-table-column
            label="到达区"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '' }}</template>
          </el-table-column>
     
          <el-table-column
            prop="senderDetailedAddress"
            label="发货地址"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverDetailedAddress"
            label="收货地址"
            width="120"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
      <Addunusual :issender="true" :isModify="isModify"  :isCheck="isCheck" :info="selectInfo" :id="id" :orgid="orgid" :companyId="otherinfo.companyId" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
      <!-- <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  /> -->
    </div>
</div> 
</template>
<script>
import SearchForm from './components/search'
import { getAbnormalUnusual } from '@/api/finance/unusual'
import { mapGetters } from 'vuex'
// import TableSetup from './components/tableSetup'
import Pager from '@/components/Pagination/index'
import Addunusual from './components/add'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
        // TableSetup,
    Addunusual
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
      dataset: [],
      isModify: false,
      isCheck: false,
      AddAbnormalVisible: false,
      setupTableVisible: false,
      isDbclick: false,
      licenseTypes: [],
      selected: [],
      loading: false,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
        }
      },
      total: 0,
      id: ''
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
      // this.loading = true
      // return getAbnormalUnusual(this.searchQuery).then(data => {
      this.dataset = data.list
      this.total = data.total
      this.loading = false
      // })
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
              message: '每次只能寄出单条数据',
              type: 'warning'
            })
          } else {
            this.isModify = true
            this.isCheck = false
                  //  this.isDbclick = false
            this.id = this.selected[0].id
            console.log(this.id)
            this.openAddAbnormal()
          }
          break
        // 删除
        case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].id
                    // =>todo 删除多个
          let ids = this.selected.map(item => {
            return item.id
          })
          ids = ids.join(',')

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
      this.repertoryId = row
      this.isCheck = true
      this.isModify = false
          // this.isDbclick = true
      this.openAddAbnormal()
    }
  }
}
</script>
