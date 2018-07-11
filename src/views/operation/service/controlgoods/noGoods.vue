<template>
    <div class="tab-content">
      <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-goods" plain @click="doAction('haveGoods')">放货</el-button>
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2"  @click="doAction('export')" plain>导出</el-button>
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
              prop="shipSn"
              sortable
              width="120"
              label="运单号">
            </el-table-column>
            <el-table-column
              prop="status"
              label="控货状态"
              width="120"
              sortable
              >
              <template slot-scope="scope">
                {{ scope.row.status === 1 ? "未放货" : "已放货" }}
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              sortable
              width="200"
              label="放货时间">
              <template slot-scope="scope">{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
            </el-table-column>
            <el-table-column
              prop="shipStatusName"
              label="运单状态"
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
              prop="fromOrgName"
              width="120"
              sortable
              label="开单网点">
            </el-table-column>
            <el-table-column
              prop="toOrgName"
              width="120"
              sortable
              label="目的网点">
            </el-table-column>
            <el-table-column
              prop=""
              sortable
              width="200"
              label="开单时间">
              <template slot-scope="scope">{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
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
              prop="shipDeliveryMethodName"
              label="交接方式"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="cargoName"
              label="货物名称"
              width="120"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="description"
              label="品种规格"
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
              label="送货方式"
              width="120"
              prop="shipDeliveryMethodName"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="shipReceiptRequireName"
              label="回单要求"
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
            <!--代收款找不到-->
            <el-table-column
              prop="agencyFund"
              label="代收货款"
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
              prop="shipTotalFee"
              label="合计运费"
              width="120"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="shipRemarks"
              label="备注"
              width="120"
              sortable
              >
            </el-table-column>
            <!-- 这里没有找到对应的字段 -->
            <el-table-column
              label="目的省"
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template> 
            </el-table-column>
            <el-table-column
              label="目的市"
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template> 
            </el-table-column>
            <el-table-column
              label="目的区"
              width="120"
              sortable
              >
              <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '' }}</template> 
            </el-table-column>
            <el-table-column
              prop="userName"
              label="制单人"
              width="120"
              sortable
              >
            </el-table-column>
            <!-- 这里没有找到对应的字段 -->
            <el-table-column
              prop="senderCustomerUnit"
              label="发货单位"
              width="200"
              sortable
              >
            </el-table-column>
          <el-table-column
              prop="receiverCustomerUnit"
              label="收货单位"
              width="200"
              sortable
              >
            </el-table-column>
            <el-table-column
              prop="senderDetailedAddress"
              label="发货人地址"
              width="200"
              sortable
              >
            </el-table-column>
            
          
            <el-table-column
              prop="receiverDetailedAddress"
              label="收货地址"
              width="200"
              sortable
              >
            </el-table-column>
            <!-- 这里没有找到对应的字段 -->
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
              prop="commissionFee"
              label="代收手续费"
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
            <!--实际提货费-->
            <el-table-column
              prop="shipFee"
              label="实际提货费"
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
              label="报关费"
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

          </el-table>
        </div>
        <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
      </div>
    </div>
</template>
<script>
import SearchForm from './components/search'
// import { postReceipt } from '@/api/operation/receipt'
import { PutFh, PostControlgoods } from '@/api/operation/dashboard'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
// import { deleteTrunkInfo } from '@/api/company/trunkManage'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    Promise.all([this.fetchAllPutFh(this.otherinfo.orgid)]).then(resArr => {
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
      loading: false,
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 10,
        'vo': {
          'status': 1
        }

      },
      total: 0,
      id: ''
    }
  },
  methods: {
          // PutFh
    fetchAllPutFh() {
            // this.loading = true
      return PostControlgoods(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
                // console.log(data);
      })
    },
        // fetchAllPutFh() {
        //     // this.loading = true
        //     return postReceipt(this.searchQuery).then(data => {
        //         this.dataset = data.list
        //         this.total = data.totalCount
        //         // this.loading = false
        //         console.log(data);
        //     })
        // },
    fetchData() {
      this.fetchAllPutFh()
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
    getSelection(selected) {
      this.selected = selected
    },

    doAction(type) {
          // 判断是否有选中项
      if (!this.selected.length && type !== 'export') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        console.log(this.selected)
        return false
      }
      switch (type) {
              // 放货
        case 'haveGoods':
          if (this.selected.length > 1) {
            this.$message({
              message: '一次只能选择一条运单放货',
              type: 'warning'
            })
          } else {
                // if(id){

                // }
            const id = this.selected[0].id
            // console.log(id)
                // console.log(id)
                // let id = this.selected.map(el => {
                //   return el.shipId
                // })
            PutFh(id).then(res => {
              this.$message({
                message: '已放货成功~',
                type: 'success'
              })
                  // fetchData()
              return false
            })
          }

      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {}

  }
}
</script>
