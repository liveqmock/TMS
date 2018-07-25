<template>
  <!---->
  <div class="costomerCreat_lll" v-loading="loading" >
    <div class="sTop">
      <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules"  label-width="100px" class="short_searchinfo clearfix" ref="formName" :model="searchTitle">

      <div class="sTitle">
        <el-form-item label="">
          <el-input v-model="checkBillName" auto-complete="off" ></el-input><span></span>

          <!--&nbsp;<p>对账表</p>-->
      </el-form-item>
      </div>
      <div class="sDate">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-form-item class="">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>
      </el-form>
    </div>
    <div class="sMessageTop">
      <el-form :inline="true" :size="btnsize" label-position="center"  :model="messageInfo" label-width="100px" class="staff_searchinfo clearfix" ref="formName">

        <el-form-item label="承运商名称">
          <el-input v-model="messageInfo.memberName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="业务负责人">
          <el-input v-model="messageInfo.memberPerson" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="messageInfo.orgBusinessOfficerPhone" auto-complete="off"  maxlength="12" v-numberOnly></el-input>
        </el-form-item>
        <el-form-item label="对账单编号">
          <el-input v-model="messageInfo.checkBillCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="messageInfo.memberCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="messageInfo.checkStartTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="messageInfo.checkEndTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-input v-model="messageInfo.settlementType" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="账户账号">
          <el-input v-model="messageInfo.bankAccount" auto-complete="off" maxlength="20" v-numberOnly></el-input>
        </el-form-item>
        <el-form-item label="账户开户行">
          <el-input v-model="messageInfo.bankName" auto-complete="off" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="messageInfo.financialOfficer" auto-complete="off" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="messageInfo.financialOfficerPhone" auto-complete="off"  maxlength="12" v-numberOnly></el-input>
        </el-form-item>
        <el-form-item label="支付宝">
          <el-input v-model="messageInfo.alipayAccount" auto-complete="off" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="微信" class="sWetPay">
          <el-input v-model="messageInfo.wechatAccount" auto-complete="off" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="sMessageCont">
      <div class="sMessageCont_info">
        <p>应收清单</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="dealInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          height="150"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
            <!--fixed-->
            <!--sortable-->
            <!--type="selection"-->
            <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <span @click="iconDelete(scope)"><icon-svg icon-class="delete_lll" ></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
            label="到达城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            sortable
            width="160"
            label="体积">
          </el-table-column>
          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="160"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动增款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipReceiptpayFee"
            label="回单付"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipMonthpayFee"
            label="月结"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>
      <div class="sMessageCont_info">
        <p>应付清单</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="dealPayInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          height="150"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
          <!--fixed-->
          <!--sortable-->
          <!--type="selection"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <span @click="iconDelete(scope)"><icon-svg icon-class="delete_lll" ></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="160"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="异动减款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>
      <div class="sMessageCont_info">
        <p>已收清单(本结算期内)</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="alreadyInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          height="150"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
          <!--fixed-->
          <!--sortable-->
          <!--type="selection"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <span @click="iconDelete(scope)"><icon-svg icon-class="delete_lll" ></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="开单时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="160"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
            label="到达城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="140"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            sortable
            width="160"
            label="体积">
          </el-table-column>
          <el-table-column
            prop="shipDeliveryMethod"
            sortable
            width="160"
            label="交接方式">
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualFee"
            label="异动增款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipReceiptpayFee"
            label="回单付"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="shipMonthpayFee"
            label="月结"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>

      <div class="sMessageCont_info">
        <p>已付清单(本结算期内)</p>
      </div>
      <div class="info_tab">
        <!--@selection-change="getSelection"-->
        <el-table
          ref="multipleTable"
          :data="alreadyPayInfo"
          stripe
          border
          show-summary
          :summary-method="getSummaries"
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          height="150"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <!--<el-table-column-->
          <!--fixed-->
          <!--sortable-->
          <!--type="selection"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <span @click="iconDelete(scope)"><icon-svg icon-class="delete_lll" ></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="createTime"
            width="160"
            label="中转时间">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="160"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            sortable
            width="160"
            label="中转单号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            prop="shipToCityName"
            sortable
            width="160"
            label="出发城市">
          </el-table-column>
          <el-table-column
            sortable
            prop="cargoName"
            width="140"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="cargoWeight"
            sortable
            width="160"
            label="重量">
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="unusualRemark"
            label="异动备注"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="异动减款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="agencyFund"
            label="代收货款"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="totalFee"
            label="小计"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>
    </div>
    <div class="sBottom">
      <div class="sMessageBut">
        <el-form :inline="true" :size="btnsize" label-position="center"  :model="messageButtonInfo" label-width="90px" class="sButtom_searchinfo clearfix" ref="formName">
          <!--<el-form-item label="总计">-->
            <!--<el-input v-model="messageButtonInfo.totalCount" auto-complete="off" ></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="messageButtonInfo.remark" auto-complete="off" ></el-input>
          </el-form-item>
            <div class="sMessageCont_info">
        <p>若对以上对账 明细有疑问，请及时联系我们，我们的联系信息如下</p>
      </div>


          <el-form-item label="公司名称">
            <el-input v-model="messageButtonInfo.companyName" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="业务负责人">
            <el-input v-model="messageButtonInfo.orgBusinessOfficer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="messageButtonInfo.orgBusinessOfficerPhone" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="财务负责人">
            <el-input v-model="messageButtonInfo.orgFinancialOfficer" auto-complete="off" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="messageButtonInfo.orgFinancialOfficerPhone" auto-complete="off" maxlength="12" v-numberOnly></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="messageButtonInfo.createTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!--<el-input v-model="messageButtonInfo.createTime" auto-complete="off" maxlength="8"></el-input>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="sBottomBut">
      <div>
        <el-button >打印</el-button>
        <el-button >导出</el-button>
        <el-button >取消</el-button>
        <el-button @click="submit('formName')" type="primary">保存</el-button>
      </div>
    </div>
    <SaveDialog :popVisible.sync="visibleDialog" :dotInfo="form"  @close="oopenVisibleDialog" :sendId="sendId" @success="fetchList" ></SaveDialog>
  </div>
</template>

<script>
  import { pickerOptions2, parseTime } from '@/utils/'
  import {postCSaveCustomerDetail} from '@/api/finance/fin_customer'
  import {postCFinanceinitialize} from '@/api/finance/fin_customer'
  import querySelect from '@/components/querySelect/index'
  import { mapGetters } from 'vuex'
  import {objectMerge2} from '@/utils/index'
  import SaveDialog from './saveDialog'

    export default {
      components:{
        querySelect,
        SaveDialog
      },
      data() {
          return {
            pickerOptions2: {
              shortcuts: pickerOptions2
            },

            searchCreatTime: [],
            // changeCreateTime: [],
            defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
            searchForm:{},
            usersArr:[],
            messageArr:[],
            checkBillName:'',
            messageInfo:{
              orgName:'',
              memberName:'',
              orgBusinessOfficer:'',
              orgBusinessOfficerPhone:'',
              checkBillCode:'',
              checkStartTime:'',
              checkEndTime:'',
              settlementType:'',
              bankAccount:'',
              bankName:'',
              financialOfficer:'',
              financialOfficerPhone:'',
              alipayAccount:'',
              wechatAccount:''
            },
            messageButtonInfo:{
              companyName:'',
              orgBusinessOfficer:'',//本网点业务负责人
              orgBusinessOfficerPhone:'',//本网点业务负责人
              orgFinancialOfficer:'',//本网点财务负责人
              orgFinancialOfficerPhone:'',//本网点财务负责人
              createTime:'',
              remark:'',
              totalCount:'',
            },
            dealPayInfo:[],
            dealInfo:[],
            alreadyPayInfo:[],
            alreadyInfo:[],
            form:{
              tmsFinanceBillCheckDto:{},
              customerDetailDtoList:[]
            },
            sendId:'',
            visibleDialog:false,
            loading:false,
            btnsize: 'mini',
            searchTitle:{
              shipSenderId:'',//
              startTime:'',
              endTime:'',
            },
            rules:{
              truckIdNumber:[
                { required: true, validator: this.validateIsEmpty('车牌号不能为空'), trigger: 'blur' }
              ]
            }
          };

      },

      computed: {
        ...mapGetters([
          'otherinfo'
        ]),
      },
      mounted(){
        this.searchCreatTime = this.defaultTime
        if(this.$route.query.tab === '客户对账-创建对账'){
          this.onSubmit()
          // this.sendId = this.$route.query.id
        }else{

        }

      },
      methods:{
        fetchList(){
          this.loading = true
          this.searchTitle.shipSenderId = this.$route.query.id
          return postCFinanceinitialize(this.searchTitle).then(data => {
            this.messageArr = data.tmsFinanceBillCheckDto
            this.infoMessage(this.messageArr)

            data.customerDetailDtoList.forEach((el,val) => {
              if(el.type === 1){
                this.dealInfo.push(el)
                // this.dealInfoData.push(el)
              }
              else if(el.type === 2){
                this.dealPayInfo.push(el)
                // this.dealPayInfoData.push(el)
              }
              else if(el.type === 3){
                this.alreadyInfo.push(el)
                // this.alreadyInfoData.push(el)
              }
              else{
                this.alreadyPayInfo.push(el)
                // this.alreadyPayInfoData.push(el)
              }
            })
            this.loading = false
          })
        },

        getTrunkName(trunk) {
          if (trunk) {
            this.searchTitle.memberName = trunk.truckIdNumber
            this.searchDealPay.truckIdNumber = trunk.truckIdNumber
            this.searchAlReadyPay.truckIdNumber = trunk.truckIdNumber
            // console.log(trunk)

          }
        },
        onSubmit(){
          const searchObj = {}
          searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
          searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
          this.infoSearchTime(searchObj.startTime,searchObj.endTime)
          // searchObj.carrierId = this.$route.query.id
          this.fetchList()
        },
        submit(formName){
        //

          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loading = true
              let promiseObj
              let data = {}
              for(const i in this.messageInfo){
                this.form.tmsFinanceBillCheckDto[i] = this.messageInfo[i]
              }
              for(const i in this.messageButtonInfo){
                this.form.tmsFinanceBillCheckDto[i] = this.messageButtonInfo[i]
              }
              this.dealInfo.map(el=>this.form.customerDetailDtoList.push(el))
              this.dealPayInfo.map(el=>this.form.customerDetailDtoList.push(el))
              this.alreadyInfo.map(el=>this.form.customerDetailDtoList.push(el))
              this.alreadyPayInfo.map(el=>this.form.customerDetailDtoList.push(el))
              data = this.form
              // data.checkStartTime = parseTime(data.checkStartTime)
              // data.checkEndTime = parseTime(data.checkEndTime)
              // data.createTime = parseTime(data.createTime)
              if(this.$route.query.tab === '客户对账-修改查看'){
                data.id = this.$route.query.id

                promiseObj = postCSaveCustomerDetail(data)
              }else{
                promiseObj = postCSaveCustomerDetail(data)
              }

              promiseObj.then(res => {
                this.loading = false
                this.$message({
                  message: '操作成功~',
                  type: 'success'
                })
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/customer/detailTable')
                this.closeMe()
              }).catch(err => {
                this.loading = false
              })


            } else {
              return false
            }
          })

        },
        validateIsEmpty(msg = '不能为空！') {
          return (rule, value, callback) => {
            if (!value) {
              callback(new Error(msg))
            }else {
              callback()
            }
          }
        },
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '总价';
              return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' ';

            } else {
              sums[index] = '';
            }

          });

          return sums;
        },
        iconDelete(scope){
          // this.alreadyPayInfo = this.alreadyPayInfo.filter(el => {
          //   return el.id !== scope.row.id
          // })
        },
        oopenVisibleDialog(){
          this.visibleDialog = true
        },
        closeVisibleDialog(){
          this.visibleDialog = false
        },
        infoMessage(item){
          this.messageInfo.orgName = item.orgName
          this.messageInfo.memberName = item.memberName
          this.messageInfo.memberPersonPhone = item.memberPersonPhone
          this.messageInfo.checkBillCode = item.checkBillCode
          this.messageInfo.settlementType = item.settlementType
          this.messageInfo.bankAccount = item.bankAccount
          this.messageInfo.bankName = item.bankName
          this.messageInfo.alipayAccount = item.alipayAccount
          this.messageInfo.wechatAccount = item.wechatAccount
          this.messageInfo.checkStartTime = item.checkStartTime
          this.messageInfo.checkEndTime = item.checkEndTime
          this.messageInfo.financialOfficer = item.financialOfficer
          this.messageInfo.financialOfficerPhone = item.financialOfficerPhone
          this.messageInfo.orgBusinessOfficer = item.orgBusinessOfficer
          this.messageInfo.orgBusinessOfficerPhone = item.orgBusinessOfficerPhone
          this.messageButtonInfo.companyName = item.companyName
          this.messageButtonInfo.orgBusinessOfficer = item.orgBusinessOfficer
          this.messageButtonInfo.orgBusinessOfficerPhone = item.orgBusinessOfficerPhone
          this.messageButtonInfo.orgFinancialOfficer = item.orgFinancialOfficer
          this.messageButtonInfo.orgFinancialOfficerPhone = item.orgFinancialOfficerPhone
          this.messageButtonInfo.createTime = item.createTime
          this.messageButtonInfo.remark = item.remark
          this.messageButtonInfo.totalCount = item.totalCount
          this.checkBillName = item.checkBillName
        },
        infoSearchTime(startTime,endTime){
          this.searchTitle.startTime = startTime
          this.searchTitle.endTime = endTime
        },
        clickDetails(row, event, column){
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        getDbClick(row, event){},

      },
      getSelection (selection) {
        this.selected = selection
      },
    }
</script>

<style lang="scss">
.costomerCreat_lll{
  margin: 0 9px;
  .sTop{

    .short_searchinfo{
      display: flex;
      padding: 20px 0 15px 0;
      .sTitle{
        flex: 1;
        text-align: center;

        span{
          position: relative;
          top: -20px;
          left: 200px;
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }
        .el-input__inner{
          border-left-color: transparent;
          border-right-color: transparent;
          border-top-color: transparent;
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }
        .el-input__inner:focus{
          border-bottom-color: #c0c4cc;
        }
        .el-input{
          width: 158%;
        }
      }
      .el-form-item__content{
        line-height: 0;
      }
    }
    .el-form-item{
      margin-bottom:0;
    }
    .el-form--inline .el-form-item {
      vertical-align: middle;
    }
  }

  .sMessageTop{
    border: 1px solid #b4b4b4;
    border-top: transparent;
    border-bottom: transparent;
    /*padding: 16px 0 10px 0;*/

    .el-form-item{
      /*width: 265px;*/
      margin-bottom: 0;
      margin-right: -5px;
      border: 1px solid #b4b4b4;
      border-left-color: transparent;
      .el-input__inner{
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        width: 185px;
        border-radius: 0;
      }
      .el-input__inner:focus{
        border-left: 1px solid #dcdfe6;
      }

    }
    .el-form-item:nth-of-type(6){
      /*border-top-color: transparent;*/
      border-right-color: transparent;
    }
    .el-form-item:nth-of-type(7){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(8){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(9){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(10){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(11){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(12){
      border-top-color: transparent;
      border-right-color: transparent;
    }
    .el-form-item:nth-last-of-type(2){
      border-top-color: transparent;
    }
    .sWetPay{
      width: 83.4%;;
      border-top-color: transparent;
      border-right-color: transparent;
      .el-form-item__content{
        /*width: 90%;*/
        .el-input{
          .el-input__inner{
            /*width: 100%;*/

          }

        }
      }
    }
    .el-input.is-disabled .el-input__inner{
      background-color: transparent;
      color: #666666;
    }
  }
  .sMessageCont{
    .sMessageCont_info{
      background-color: #e2eaff;
      p{
        text-align: center;
        font-size: 14px;
        color: #668cf0;
        padding: 4px 0 5px 0;
        font-weight: 600;
      }
    }
  }
  .sBottom{
    border-right: 1px solid #b4b4b4;
    border-left: 1px solid #b4b4b4;
    margin-bottom: 100px;
    .sMessageCont_info{
      background-color: #e2eaff;
      p{
        text-align: left;
        font-size: 14px;
        color: #668cf0;
        padding: 4px 0 5px 0;
        font-weight: 600;
      }
    }
    .sMessageBut{
        .sButtom_searchinfo{
          .el-form-item{
            border: 1px solid #b4b4b4;
            margin-right:-5px;
            margin-bottom: 0;
            .el-input__inner{
              width: 191px;
              border-radius: 0;
              border-top-color: transparent;
              border-right-color: transparent;
              border-bottom-color: transparent;
            }
            .el-input__inner:nth-of-type(2n){
              border-right-color: transparent;
            }
          }
          .el-form-item:nth-of-type(1){
            /*border-bottom-color: transparent;*/
            border-right-color: transparent;
          }
          .el-form-item:nth-of-type(1){
            border-left-color: transparent;
            width: 100%;
            .el-input__inner{
              width: 1625px;
            }
          }
          .el-form-item:nth-of-type(3){
            border-left-color: transparent;
          }
          .el-form-item:nth-of-type(2n){
            border-right-color: transparent;
          }
        }
      .el-input__inner:focus {
        border-color: #b4b4b4;
      }
    }
  }
  .sBottomBut{
    background: #eee;
    height: 70px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    div{
      position: fixed;
      bottom: 0;
      left: 50%;
      margin: 20px 0 15px 0;
    }

  }
}
</style>
