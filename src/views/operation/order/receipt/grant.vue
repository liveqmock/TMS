<template>
    <div class="tab-content" v-loading="loading">
        <SearchForm :orgid="otherinfo.orgid" title="发放" type="giveout_status" status="giveoutStatus" @change="getSearchParam" :btnsize="btnsize" />
        <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize"  icon="el-icon-sort-up" plain @click="doAction('grant')">回单发放</el-button>
          <!-- <el-button type="primary" :size="btnsize"  @click="doAction('cancel')" plain>取消发放</el-button> -->
          <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
          <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize"  icon="el-icon-printer"@click="doAction('import')" plain>打印</el-button>
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
            prop="shipFromOrgid"
            width="120"
            label="开单网点">
          </el-table-column>f
          <el-table-column
            prop="shipToOrgid"
            width="120"
            sortable
            label="目的网点">
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
            sortable
            prop="shipFromOrgid"
            width="120"
            label="出发城市">
          </el-table-column>
          <el-table-column
            label="到达城市"
            width="120"
            prop="shipToCityCode"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="giveoutStatusName"
            label="发放状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="发放日期"
            width="200"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.giveoutTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column
            prop="backStatusName"
            label="回单状态"
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
            prop="shipReceiptNum"
            label="回单数量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sendName"
            label="发货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recName"
            label="收货人"
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
            prop="acceptRemark"
            label="回收备注"
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
          <!-- 这里没有找到对应的字段 -->
          <el-table-column
            prop="cargoName"
            label="多笔付"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="carrierName"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="中转日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.transferTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            label="中转单号"
            width="120"
            sortable
            >
          </el-table-column>
           <!-- 这里没有找到对应的字段 -->
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
            prop="sendMobile"
            label="发货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sendAddress"
            label="发货地址"
            width="200"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recMobile"
            label="收货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recAddress"
            label="收货地址"
            width="200"
            sortable
            >
          </el-table-column>
          <!-- <el-table-column
            prop=""
            label="寄出日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.sendTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column
            prop=""
            label="接收日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.acceptTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column> -->
          
          <el-table-column
            prop="recRemark"
            label="回收备注"
            width="120"
            sortable
            >
          </el-table-column>

        </el-table>
      </div>
    </div>
        <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
</template>
<script>
import SearchForm from './components/search'
import { postReceipt, putUpdateReceipt } from '@/api/operation/receipt'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager
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
    this.fetchAllreceipt(this.otherinfo.orgid).then(res => {
      this.loading = false
    })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      selected: [],
      dataset: [],
      loading: false,
      searchQuery: {
                    // "currentPage":1,
                    // "pageSize":10,
        'vo': {
          'pageType': 4,
          'receiptIds': []
        }
      },
      total: 0
    }
  },
  methods: {
    fetchAllreceipt() {
            // this.loading = true
      return postReceipt(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
      })
    },
    fetchData() {
      this.fetchAllreceipt()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(searchParam) {
      objectMerge2(this.searchQuery.vo, searchParam)
      this.fetchAllreceipt()
    },
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
              // 回单发放
        case 'grant':
          const ids = this.selected.filter(el => {
            return el.giveoutStatus === 111
          }).map(el => {
            return el.receiptId
          })
          if (ids.length) {
            this.searchQuery.vo.receiptIds = ids
            this.dotInfo = ids
            this.popVisible = true
            this.isAccept = true
            this.isModify = false
            this.searchQuery.vo.receiptIds = ids
            putUpdateReceipt(this.searchQuery.vo).then(res => {
              this.$message({
                message: '回单发放成功~',
                type: 'success'
              })
              this.fetchAllreceipt()
              return false
            })
          } else {
            this.$message.warning('请选择未发放项~')
          }
          break
              // case 'cancel':
              //  let _ids = this.selected.filter(el=>{
              //     return el.giveoutStatus === 112
              //   }).map(el => {
              //   return  el.receiptId
              // })

              // console.log(this._ids)

              // if(_ids.length){
              //     this.searchQuery.vo.receiptIds = _ids
              //   (this.searchQuery.vo).then(res=>{
              //       this.$message({
              //         message: '取消发放成功~',
              //         type: 'success'
              //       })
              //       this.fetchAllreceipt()
              //       return false
              //     })

              //   }

              // break;
      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {},
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selected) {
      this.selected = selected
    }

  }
}
</script>
