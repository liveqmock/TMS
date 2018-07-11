<template>
<div class="tab-wrapper tab-wrapper-100">
  <div class="tab-content">
      <SearchForm :orgid="otherinfo.orgid" type="funds_account_status" title="到账" status="fundsAccountStatus" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-sort-down" plain @click="doAction('send')">货款汇款</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-remove-outline" @click="doAction('cancel')" plain>取消汇款</el-button>
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
            <!-- <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('import')" plain>打印</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        </div>
        <div class="info_tab">
            <el-table
              ref="multipleTable"
              :data="dataset"
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
                prop="shipId"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                fixed
                sortable
                prop="fromOrgName"
                width="120"
                label="开单网点">
              </el-table-column>
              <el-table-column
                prop=""
                sortable
                width="200"
                label="开单日期">
                <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
              </el-table-column>
              <el-table-column
                prop="shipSn"
                sortable
                width="120"
                label="运单号">
              </el-table-column>
              <el-table-column
                prop="shipGoodsSn"
                sortable
                width="200"
                label="货号">
              </el-table-column>
              <el-table-column
                prop="fundsAccountStatusName"
                label="到账状态"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="fundsGoodsStatusName"
                label="货款状态"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="accountTime"
                label="到账日期"
                width="200"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.acceptTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
              </el-table-column>
              
              <el-table-column
                sortable
                prop="shipFromCityName"
                width="120"
                label="出发城市">
              </el-table-column>
              <el-table-column
                label="到达城市"
                width="120"
                prop="shipToCityName"
                sortable
                >
              </el-table-column>
              
              <el-table-column
                prop="agencyFund"
                label="代收货款"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="agencyFund"
                label="代收货款手续费"
                width="120"
                sortable
                >
              </el-table-column>
              
              <el-table-column
                prop="senderName"
                label="发货人"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="senderMobile"
                label="发货人电话"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="senderAddress"
                label="发货地址"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="receiptName"
                label="收货人"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="receiptMobile"
                label="收货人电话"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="receiptAddress"
                label="收货地址"
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
                prop="shipPayWayName"
                label="付款方式"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipNowpayFee"
                label="现付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipArrivepayFee"
                label="到付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipReceiptpayFee"
                label="回单付"
                width="120"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="shipMonthpayFee"
                label="月结"
                width="120"
                sortable
                >
              </el-table-column>
              <!-- 这里没有找到对应的字段 -->
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
              
              
       
               
            <!--  <el-table-column
                prop="giveoutTime"
                label="发放日期"
                width="120"
                sortable
                >
                <template slot-scope="scope">{{ scope.row.giveoutTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
              </el-table-column> -->
          
            </el-table>
        </div>  
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
      <AddPayment :popVisible="popVisible" :issender="true" :dotInfo="dotInfo" proptitle="货款到账" :searchQuery="searchQuery"  @close="closeAddDot" @success="featchAllpayment" :isModify="isModify" :isAccept="isAccept"/>
    </div>
</div>
</template>
<script>
import SearchForm from './components/search'
import { postGoodsfundsList, putUpdateCancelReceipt } from '@/api/finance/payment'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import AddPayment from './components/add'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
    AddPayment
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
            // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
            // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
        // this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.featchAllpayment(this.otherinfo.orgid).then(res => {
      this.loading = false
    })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      dataset: [],
      selected: [],
      dotInfo: {},
      isModify: false,
      popVisible: false,
      isAccept: false,
      // rec_status:113,
      loading: false,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
          'pageType': 3,
          'fundsAccountStatus': '260'
        }
      },
      total: 0

    }
  },
  methods: {
    featchAllpayment() {
            // this.loading = true
      return postGoodsfundsList(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
                // this.loading = false
                // console.log(data);
      })
    },
    fetchData() {
      this.featchAllpayment()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
            // this.searchQuery.vo.orgid = obj.orgid
            // this.searchQuery.vo.customerMobile = obj.mobile
            // this.searchQuery.vo.customerName = obj.name
      objectMerge2(this.searchQuery.vo, searchParam)
      this.featchAllpayment()
    },
    getSelection(selection) {
      this.selected = selection
          // console.log(this.selection)
    },
    doAction(type) {
          // 判断是否有选中项
      // console.log(this.selected)
      if (!this.selected.length) {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
          // 汇款
        case 'send':
          const ids = this.selected.filter(el => {
            return el.fundsAccountStatus === 260
          })

          if (ids.length) {
            // this.searchQuery.vo.goodsFundsIds = ids
            this.dotInfo = ids
            this.popVisible = true
                  // this.isAccept = true
            this.isModify = true
          } else {
            this.$message.warning('请选择未回收项~')
          }
          break
            // 取消
        case 'cancel':

          const _ids = this.selected.filter(el => {
            return el.fundsAccountStatus === 261 && el.fundsGiveoutStatus === 263
          }).map(el => {
            return el.id
          })

          if (_ids.length) {
            this.searchQuery.vo.goodsFundsIds = _ids
            putUpdateCancelReceipt(this.searchQuery.vo).then(res => {
              this.$message({
                message: '取消回收成功~',
                type: 'success'
              })
              this.featchAllpayment()
              return false
            }).catch(res => {
              this.$message.error(res.text)
              this.closeAddDot()
            })
          } else {
            this.$message.warning('不可取消~')
          }

          break
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    closeAddDot() {
      this.popVisible = false
            // this.addDoTotVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {}

  }
}
</script>
