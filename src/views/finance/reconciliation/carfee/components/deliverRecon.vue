<template>
  <!---->
  <div class="short_lll" v-loading="loading" >
    <div class="sTop">
      <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules"  label-width="100px" class="short_searchinfo clearfix" ref="formName" :model="searchTitle">

      <div class="sTitle">
        <el-form-item label="">
          <el-input v-model="checkBillName" auto-complete="off" ></el-input><span>对账表</span>

          <!--&nbsp;<p>对账表</p>-->
      </el-form-item>
      </div>
      <!--<div class="sTitle"><p>广州网点2018年6月7日-2018年8月12日</p>&nbsp;<p>对账表</p></div>-->
      <div class="sDate">

          <el-form-item label="" prop="memberName" placeholder="请选择车牌号">
              <querySelect search="truckIdNumber" valuekey="truckIdNumber" type="trunk" @change="getTrunkName"  v-model="searchTitle.memberName" clearable/>

          </el-form-item>
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

        <el-form-item label="车牌号">
          <el-input v-model="messageInfo.memberName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="司机">
          <el-input v-model="messageInfo.memberPerson" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="messageInfo.memberPersonPhone" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="对账单编号">
          <el-input v-model="messageInfo.checkBillCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="messageInfo.checkStartTime" auto-complete="off" disabled></el-input>
          <!--<el-date-picker-->
            <!--v-model="messageInfo.checkStartTime"-->
            <!--align="right"-->
            <!--type="date"-->
            <!--placeholder="选择日期"-->
            <!--value-format="timestamp"-->
            <!--:picker-options="pickOption"-->
          <!--&gt;-->
          <!--</el-date-picker>-->

        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="messageInfo.checkEndTime" auto-complete="off" disabled></el-input>
          <!--<el-date-picker-->
            <!--v-model="messageInfo.checkEndTime"-->
            <!--align="right"-->
            <!--type="date"-->
            <!--:picker-options="pickOption2"-->
            <!--placeholder="选择日期"-->
            <!--value-format="timestamp"-->

          <!--&gt;-->
          <!--</el-date-picker>-->
        </el-form-item>
        <el-form-item label="账户账号">
          <el-input v-model="messageInfo.bankAccount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户开户行">
          <el-input v-model="messageInfo.bankName" auto-complete="off"></el-input>
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
        <p>应付账款</p>
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
          height="200"
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
            prop="departureTime"
            width="160"
            label="送货时间">
          </el-table-column>
          <el-table-column
            prop="batchNo"
            width="160"
            sortable
            label="送货批次号">
          </el-table-column>
          <el-table-column
            prop="driverName"
            sortable
            width="160"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="loadAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="loadWeight"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="loadVolume"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="sendPay"
            label="送货费"
            width="250"
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
          height="200"
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
              <span @click="iconDeleteAl(scope)"><icon-svg icon-class="delete_lll" ></icon-svg></span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="departureTime"
            width="160"
            label="送货时间">
          </el-table-column>
          <el-table-column
            prop="batchNo"
            width="160"
            sortable
            label="送货批次号">
          </el-table-column>
          <el-table-column
            prop="driverName"
            sortable
            width="160"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="orgName"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="loadAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="loadWeight"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="loadVolume"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="sendPay"
            label="送货费"
            width="250"
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
    <SaveDialog :popVisible.sync="visibleDialog" :dotInfo="form"  @close="oopenVisibleDialog" :tota="tota" :sendId="sendId" :deliver="deliver"></SaveDialog>
  </div>
</template>

<script>
  import { pickerOptions2, parseTime } from '@/utils/'
  import {postCarfBillCheckCarBaseInfo,postCarfBillCheckCarInitList,postCreateBillCheckCarInfo,postCarfDtoById,postCarfBillCheckCarUpdateList} from '@/api/finance/fin_carfee'
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
        let _this = this
          return {
            pickOption: {
              firstDayOfWeek: 1,
              disabledDate(time) {
                // 小于终止日
                return _this.messageInfo.checkEndTime ? time.getTime() > _this.messageInfo.checkEndTime : false
              }
            },
            pickOption2: {
              firstDayOfWeek: 1,
              disabledDate(time) {
                // 大于起始日
                return _this.messageInfo.checkStartTime ? time.getTime() < _this.messageInfo.checkStartTime : false
              }
            },
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
              checkStartTime:'',
              checkEndTime:'',
              orgName:'',
              memberIdType:3,
              memberName:'',
              memberPerson:'',
              memberPersonPhone:'',
              checkBillCode:'',
              bankAccount:'',
              bankName:'',
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
            alreadyPayInfo:[],
            form:{"orgId": '',
              "checkBillCode": "",
              "payDetailList":[],
              "hadPayDetailList":[]
            },
            //总计
            tota:{
              alreadyPaytota:[],
              dealPaytota:[],
            },
            //保存总计数据
            alreadyPaytota:[],
            dealPaytota:[],
            sendId:'',
            visibleDialog:false,
            loading:false,
            deliver:false,
            btnsize: 'mini',
            searchTitle:{
              orgId:'',
              memberName:'',//
              startTime:'',
              endTime:'',
            },
            searchDealPay:{
              orgId:'',
              memberType:'3',
              loadTypeId:40,
              payTypeStatus:'pay',
              truckIdNumber:'',
              startTime:'',
              endTime:''
            },
            searchAlReadyPay:{
              orgId:'',
              memberType:'3',
              loadTypeId:40,
              payTypeStatus:'hadPay',
              truckIdNumber:'',
              startTime:'',
              endTime:''
            },
            moiffyDealPay:{
              orgId:'',
              payTypeStatus:'pay',
              checkId:'1'
            },
            moiffyAlReadyPay:{
              orgId:'',
              payTypeStatus:'hadPay',
              checkId:'1'
            },
            rules:{
              memberName:[
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

        this.changeOrgid(this.otherinfo,this.$route.query.id)
        if(this.$route.query.id){
          this.sendId = this.$route.query.id
          this.changeId(this.$route.query.id)
          this.onSubmit()
        }else{

        }
      },
      methods:{
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
          this.dealPayInfo = this.dealPayInfo.filter(el => {
            return el.id !== scope.row.id
          })
          this.$message({
            message: '删除成功~',
            type: 'success'
          })
        },
        //
        iconDeleteAl(scope){
          this.alreadyPayInfo = this.alreadyPayInfo.filter(el => {
            return el.id !== scope.row.id

          })
          this.$message({
            message: '删除成功~',
            type: 'success'
          })
        },
        fetchList(){
          this.loading = true
          return postCarfBillCheckCarBaseInfo(this.searchTitle).then(data => {
            this.messageArr = data

            this.infoMessageData(this.messageArr)
            this.loading = false
          })
        },
        fetchDealPay(){
          this.loading = true
          return postCarfBillCheckCarInitList(this.searchDealPay).then(data => {
            this.dealPayInfo = data
            // this.dealPaytota = data
            this.loading = false
          })
        },
        fetchReadyPay(){
          this.loading = true
          return postCarfBillCheckCarInitList(this.searchAlReadyPay).then(data => {
            this.alreadyPayInfo = data
            // this.alreadyPaytota = data
            this.loading = false
          })
        },
        //修改
        moodifyList(){
          this.loading = true
          this.sendId = this.$route.query.id
          return postCarfDtoById(this.sendId).then(data => {
            this.messageArr = data.data
            this.infoMessageData(this.messageArr)
            this.loading = false
          })
        },
        moodifyDealPay(){
          this.loading = true
          return postCarfBillCheckCarUpdateList(this.moiffyDealPay).then(data => {
            this.dealPayInfo = data
            this.loading = false
          })
        },
        moodifyReadyPay(){
          this.loading = true
          return postCarfBillCheckCarUpdateList(this.moiffyAlReadyPay).then(data => {
            this.alreadyPayInfo = data
            this.loading = false
          })
        },
        changeOrgid(item,checkId){
          this.searchTitle.orgId = item.orgid
          this.searchDealPay.orgId = item.orgid
          this.searchAlReadyPay.orgId = item.orgid
          this.moiffyDealPay.orgId = item.orgid
          this.moiffyAlReadyPay.orgId = item.orgid
          this.moiffyDealPay.checkId = checkId
          this.moiffyAlReadyPay.checkId = checkId
        },
        changeId(id){
          this.searchTitle.id = id
          this.searchDealPay.id = id
          this.searchAlReadyPay.id = id
        },
        getTrunkName(trunk) {
          if (trunk) {
            this.searchTitle.memberName = trunk.truckIdNumber
            this.searchDealPay.truckIdNumber = trunk.truckIdNumber
            this.searchAlReadyPay.truckIdNumber = trunk.truckIdNumber
          }
        },
        //查询
        onSubmit(){
          if(this.$route.query.id){
            this.sendId = this.$route.query.id
            this.moodifyList()
            this.moodifyDealPay()
            this.moodifyReadyPay()
          }else{

            this.fetchList()
            this.fetchDealPay()
            this.fetchReadyPay()
          }
          const searchObj = {}
          searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
          searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
          this.infoSearchTime(searchObj.startTime,searchObj.endTime)
        },
        //保存
        submit(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.oopenVisibleDialog()
              this.deliver = true
            } else {
              return false
            }
          })
          // messageInfo:{
          //   checkStartTime:'',
          //     checkEndTime:'',
          // this.messageInfo.checkStartTime = parseTime(this.messageInfo.checkStartTime)
          // console.log(this.messageInfo.checkStartTime);
          for(const i in this.messageInfo){
            this.form[i] = this.messageInfo[i]
          }
          for(const i in this.messageButtonInfo){
            this.form[i] = this.messageButtonInfo[i]
          }
          this.form.orgId = this.otherinfo.orgid
          this.form.checkBillName = this.checkBillName
            this.form.payDetailList = this.dealPayInfo ?  this.dealPayInfo.map(el=>{
              const a = {}
              a.shipOrderId = el.shipOrderId
              a.sendPay = el.sendPay
              return a
            }) :[]
            this.form.hadPayDetailList = this.alreadyPayInfo ? this.alreadyPayInfo.map(el=>{
              const a = {}
              a.shipOrderId = el.shipOrderId
              a.sendPay = el.sendPay
              return a
            }) : []
          //总计
          this.tota.dealPaytota = this.dealPaytota ?  this.dealPaytota.map(el=>{
            const a = {}
            a.shortPay = el.shortPay
            return a
          }) :[]
          this.tota.alreadyPaytota = this.alreadyPaytota ? this.alreadyPaytota.map(el=>{
            const a = {}
            a.shortPay = el.shortPay
            return a
          }) : []



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
        oopenVisibleDialog(){
          this.visibleDialog = true
        },
        closeVisibleDialog(){
          this.visibleDialog = false
        },
        infoMessageData(item){

          // this.messageInfo.checkStartTime = new Date()
          // this.messageInfo.checkEndTime = new Date(+new Date() + 60 * 24 * 60 * 60 * 60)
          // this.messageButtonInfo.createTime = new Date()
          this.messageInfo.memberName = item.memberName
          this.messageInfo.memberPerson = item.memberPerson
          this.messageInfo.memberPersonPhone = item.memberPersonPhone
          this.messageInfo.checkBillCode = item.checkBillCode
          this.messageInfo.bankAccount = item.bankAccount
          this.messageInfo.bankName = item.bankName
          this.messageInfo.alipayAccount = item.alipayAccount
          this.messageInfo.wechatAccount = item.wechatAccount
          this.messageInfo.checkStartTime = item.checkStartTime
          this.messageInfo.checkEndTime = item.checkEndTime
          this.messageInfo.orgName = item.orgName
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
          this.searchDealPay.startTime = startTime
          this.searchAlReadyPay.startTime = startTime
          this.searchTitle.endTime = endTime
          this.searchDealPay.endTime = endTime
          this.searchAlReadyPay.endTime = endTime
        },
        clickDetails(row, event, column){
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        getDbClick(row, event){},

      },
      getSelection (selection) {
        this.selected = selection
      },
      fetchData(){

      }
    }
</script>

<style lang="scss">
.short_lll{
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
        width: 187px;
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
    .sWetPay{
      width: 50%;
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
    margin-bottom: 70px;
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

      /*padding: 16px 0 10px 0;*/
        .sButtom_searchinfo{
          .el-form-item{
            border: 1px solid #b4b4b4;
            margin-right:-5px;
            margin-bottom: 0;
            .el-input__inner{
              width: 193px;
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
