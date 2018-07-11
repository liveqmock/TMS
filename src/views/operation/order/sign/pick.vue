<template>
    <div class="tab-content" @success="fetchAllreceipt">
      <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-check-outline" plain @click="doAction('pick')" >签收</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancel')" plain>取消签收</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('amend')">修改</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
        <!-- <el-button type="primary" :size="btnsize"  @click="doAction('import')" plain>打印</el-button> -->
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
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
            prop="shipId"
            label="序号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            sortable
            width="120"
            label="运单号">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="fromOrgName"
            width="120"
            label="开单网点">
          </el-table-column>
          <el-table-column
            sortable
            width="200"
            label="开单时间">
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
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
            prop="shipDeliveryMethodName"
            width="120"
            sortable
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="货物名"
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
            prop="sender_customer_name"
            label="发货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sender_customer_mobile"
            label="发货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sender_detailed_address"
            label="发货人地址"
            width="200"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiver_customer_name"
            label="收货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiver_customer_mobile"
            label="收货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiver_detailed_address"
            label="收货地址"
            width="200"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收款"
            width="120"
            sortable
          >
          </el-table-column>
           <el-table-column
            prop="commissionFee"
            label="代收手续费"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipIdentifying"
            label="运单标识"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="signStatusName"
            label="签收状态"
            width="120"
            sortable
            >
          </el-table-column>
          <!-- <el-table-column
            prop="backStatus"
            label="回单状态"
            width="120"
            sortable
            >
          </el-table-column> -->
          <el-table-column
            prop="signTypeName"
            label="签收类型"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="signName"
            label="签收人"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="signCocumentTypeName"
            label="签收证件"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="documentNum"
            label="证件号码"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipReceiptRequireName"
            label="回单类型"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipReceiptSn"
            label="回单号"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipReceiptNum"
            label="回单份数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="signRemark"
            label="签收备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
          label="到达省"
          width="200"
          sortable
          >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template>     
          </el-table-column>
          <el-table-column
            label="到达市"
            width="200"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template>
          </el-table-column>
          <el-table-column
            label="到达县"
            width="200"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '' }}</template>
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipTotalFee"
            label="运费合计"
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
          
          <el-table-column
            prop="shipFee"
            label="运费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="brokerageFee"
            label="回扣"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="deliveryFee"
            label="送货费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="声明价值"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="insuranceFee"
            label="保险费"
            width="120"
            sortable
            >
          </el-table-column>
        
          <el-table-column
            prop="handlingFee"
            label="装卸费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="packageFee"
            label="包装费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="pickupFee"
            label="提货费"
            width="120"
            sortable
            >
          </el-table-column>
        
          <el-table-column
            prop="goupstairsFee"
            label="上楼费"
            width="120"
            sortable
            >
          </el-table-column>
        
          <el-table-column
            prop="forkliftFee"
            label="叉车费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="realityhandlingFee"
            label="实际装卸费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="customsFee"
            label="包关费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="otherfeeIn"
            label="其他费收入"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="otherfeeOut"
            label="其他费支出"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="税率"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="taxes"
            label="税金"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="housingFee"
            label="入仓费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="stampTax"
            label="印花税"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="amountFee"
            label="件数单价"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="weightFee"
            label="重量单价"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="volumeFee"
            label="体积单价"
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
            prop="shipTruckIdNumber"
            label="送货车牌"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="dirverName"
            label="送货司机"
            width="120"
            sortable
            >
          </el-table-column>
          <!-- <el-table-column
            prop="transferOrgName" 
            label="中转网点"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="carrierName" 
            label="中转承运商"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="transferCharge"
            label="中转费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="deliveryExpense"
            label="中转送货费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="transferOtherFee" 
            label="中转其他费"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="totalCost"
            label="中转合计"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="paymentName"
            label="中转付款方式"
            width="120"
            sortable
            >
          </el-table-column> -->
          <el-table-column
            prop="signTime"
            sortable
            width="200"
            label="签收时间">
            <template slot-scope="scope">{{ scope.row.signTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total}} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
      </div>
      <Addsign :issender="true" :isPick="isPick" :isDbclick="isDbclick" :repertoryId="repertoryId" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddSignVisible" @close="openAddSign" @success="fetchData" :id="id"></Addsign>
      <Addbatch  :issender="true" :dotInfo="dotInfo" :popVisible="popVisible" @close="closeAddBacth" @success="fetchData" :isModify="isModify" :show="show"></Addbatch>
      <!-- <TableSetup :issender="true" :popVisible="setupTableVisible" @close="closeSetupTable" @success="fetchData"  /> -->
    </div>
</template>
<script>
import SearchForm from './components/search'
import { postPickuplist, postCancelPickupSign } from '@/api/operation/sign'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
// import TableSetup from './components/tableSetup'
import Addsign from './components/add'
import Addbatch from './components/batch'
import { objectMerge2 } from '@/utils/index'
export default {
  name: 'tab-content',
  components: {
    SearchForm,
    Addsign,
    Addbatch,
        // TableSetup,
    Pager
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
        // this.searchQuery.vo.orgId = this.otherinfo.orgid
    Promise.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
            // this.licenseTypes = resArr[1]
    })
  },
  data() {
    return {
      returnData: [],
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      selected: [],
      dataset: [],
      AddSignVisible: false,
      AddBatchVisible: false,
      setupTableVisible: false,
      popVisible: false,
      isModify: false,
      show: false,
      isPick: false,
      dotInfo: [],
      repertoryId: '',
      signId: '',
      disabled: false,
      isDbclick: false,
      signStatus: '',
              // loading:false,
      searchQuery: {
        'currentPage': 1,
        'pageSize': 10000,
        'vo': {
          'repertoryId': '',
          'signId': '',
          'signStatus': '226'
        }
      },
      total: 0,
      id: ''
    }
  },
        // props:{
        //   type: { // 可以有confirm, 和inform两个类型
        //   type: String,
        //   default: 'confirm',
        //   validator(value) {
        //       return value === 'confirm' || value === 'inform';
        //     },
        //   },
        // },
  methods: {
    fetchAllreceipt() {
      this.loading = true
      return postPickuplist(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.signId = data.signId
        this.signStatus = data.signStatus
      })
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
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
        // getSearchParam (searchParam) {
        //   Object.assign(this.searchQuery.vo, searchParam)
        //   this.fetchAllreceipt()
        // },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        return false
      }
          // 判断是否有选中项
      if (!this.selected.length) {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
              // 签收
        case 'pick':
              // let idss = this.selected
          const ids = this.selected.filter(el => {
            return el.signStatus !== 227
          })
              // console.log(ids.length)
          if (ids.length > 1) {
            this.dotInfo = ids
            // console.log(this.dotInfo)
            this.isModify = true
            this.openAddBatch()
            this.isPick = false
                // this.show = true
          } else if (ids.length) {
            this.repertoryId = this.selected[0]
            this.isDbclick = false
            this.isPick = false
                // this.selectInfo = this.selected[0]
            this.openAddSign()
          } else {
            this.$message({
              message: '不可重复签收',
              type: 'warning'
            })
          }
          break
        case 'amend':
              // this.repertoryId = this.selected[0]
              // this.openAddSign()
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据',
              type: 'warning'
            })
          } else {
            this.isPick = true
            this.isDbclick = false
            this.repertoryId = this.selected[0]
                  // this.selectInfo = this.selected[0]
            this.id = this.selected[0].signId
            console.log(this.id)
            this.openAddSign()
          }
          break
        case 'cancel':
          const _ids = this.selected.filter(el => {
            return el.signStatus === 227
          })
          if (_ids.length) {
            const repertoryId = this.selected[0].repertoryId
            const signId = this.selected[0].signId

            this.searchQuery.vo.repertoryId = repertoryId
            this.searchQuery.vo.signId = signId
                // console.log(repertoryId);
            postCancelPickupSign(this.searchQuery.vo).then(res => {
              this.$message({
                message: '取消签收成功~',
                type: 'success'
              })
              this.fetchAllreceipt()
              return false
            }).catch(res => {
                  // this.loading = false
              this.$message.warning(res.text)
                  // this.closeMe()
            })
          } else {
            this.$message.warning('不可取消~')
          }
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
    openAddSign() {
      this.AddSignVisible = true
    },
    closeAddSign() {
      this.AddSignVisible = false
    },
    openAddBatch() {
      this.popVisible = true
    },
    closeAddBacth() {
          // this.AddBacthVisible = false
      this.popVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selected) {
      this.selected = selected
    },
    getDbClick(row, event) {
      this.repertoryId = row
      this.isPick = false
      this.isDbclick = true
      this.openAddSign()
    }

  }
}
</script>
