<template>
  <div class="saveDialog-maintain">
    <PopFrame :title="'对账单名称'+popTitle" :isShow="popVisible" @close="closeMe" class='pickpopDepMain' v-loading="loading" >
      <template class='pickRelationPop-content' slot="content">
        <!--isDepMain-->
        <div class="depmain-div" >
          <div class="dialogMoney">
          对账总金额：<span>{{totaMoney}}元</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="dialogInfo"
            stripe
            border
            height="160"
            tooltip-effect="dark"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
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
            prop="date"
            width="185"
            label="费用项">
            </el-table-column>
            <el-table-column
            fixed
            sortable
            prop="toPay"
            width="189"
            label="金额">
            </el-table-column>
          </el-table>


        </div>
      </template>
      <div slot="footer" class="dialog-footer-frame" >

        <el-button @click="closeMe">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </PopFrame>
  </div>

</template>

<script>
  import { REGEX } from '@/utils/validate'
  import PopFrame from '@/components/PopFrame/index'
  import querySelect from '@/components/querySelect/index'
  import {postCreateBillCheckCarInfo} from '@/api/finance/fin_carfee'
  //parseTime
  import {parseTime} from '@/utils'
  // import { getFindShipByid,putRelevancyShip,putRremoveShip} from '@/api/operation/pickup'

  export default {
    components: {
      PopFrame,
      querySelect
    },
    props: {
      popVisible: {
        type: Boolean,
        default: false
      },
      isDepMain: {
        type: Boolean,
        default: false
      },
      //
      deliver: {
        type: Boolean,
        default: false
      },
      isShort: {
        type: Boolean,
        default: false
      },
      isArtery: {
        type: Boolean,
        default: false
      },
      tota: {
        type: [Object,Array,Boolean],
        default: false
        },
      dotInfo: {
        type: [Object,Array],
        default: false
      },
      sendId: [Number,String]
    },
    data() {
      return {
        selected: [],

        formLabelWidth:'90',
        dialogInfo:[
          {
            toPay:0,
            date:"应付账款"
          },
          {
            toPay:0,
            date:"已付账款"
          }
        ],
        dialogData:{},
        checked1: true,
        popTitle: '',
        totaMoney: 0,
        loading:false,
      }
    },
    computed: {
      isShow: {
        get(){
          return this.popVisible
        },
        set(){
        }
      }
    },
    watch: {
      deliver:{
        handler(newVal){

        }

      },
      isShort:{
        handler(newVal){

        }

      },
      isArtery:{
        handler(newVal){

        }

      },
      tota:{
        handler(newVal){
          this.dialogData = this.tota

          this.dialogData.dealPaytota.map(el=>{
            this.$set(this.dialogInfo, 0, {
              date:"应付账款",
              toPay: this.dialogInfo[0].toPay + (el.shortPay ? +el.shortPay : 0)
            })
            //this.dialogInfo[0].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
          })
          this.dialogData.alreadyPaytota.map(el=>{
            this.$set(this.dialogInfo, 1, {
              date:"已付账款",
              toPay: this.dialogInfo[1].toPay + (el.shortPay ? +el.shortPay : 0)
            })
            // this.dialogInfo[1].toPay += (el.arrSendPay ? +el.arrSendPay : 0)
          })
          this.totaMoney = this.dialogInfo[0].toPay + this.dialogInfo[1].toPay
          if(this.sendId){
            this.dotInfo.id = this.sendId
          }else{
            this.dotInfo
          }
        },
        deep: true
      },
      dotInfo :{
        handler(newVal) {
          console.log(this.dotInfo);
          this.popTitle = this.dotInfo.checkBillName
          if(this.sendId){
            this.dotInfo.id = this.sendId
          }else{
            this.dotInfo
          }
        },
        deep: true
      },
      popVisible (newVal) {
        this.fetchData()
      },
      sendId(newVal){

        if(this.sendId){
          this.dotInfo.id = this.sendId
        }else{
          this.dotInfo
        }
      }
    },
    mounted() {
      if(this.popVisible){
        this.popTitle = this.dotInfo.checkBillName
      }

    },
    methods: {
      search (item) {
        // return item.pickupBatchNumber ? false : true
      },
      fetchFindByShipSnOrGoodSn() {
        // this.loading = true
        // return getFindShipByid(this.dotInfo.id).then(data => {
        //   this.usersArr = data
        //   this.loading = false
        // })
      },
      fetchData() {
        this.fetchFindByShipSnOrGoodSn()
      },
      closeMe (done) {
        this.reset()
        this.$emit('update:popVisible', false);
        if(typeof done === 'function'){
          done()
        }
      },
      reset(){
      },

      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
            this.loading = true
            let promiseObj
            let data = []
            data = this.dotInfo
            // delete data.payDetailList.shortPay


// this.messageInfo.checkStartTime = new Date()
        // this.messageInfo.checkEndTime = new Date(+new Date() + 60 * 24 * 60 * 60 * 60)
        // this.messageButtonInfo.createTime = new Date()

        data.checkStartTime = parseTime(data.checkStartTime)
        data.checkEndTime = parseTime(data.checkEndTime)
        data.createTime = parseTime(data.createTime)


        if(this.sendId){
              data.id = this.sendId
              if(this.deliver){
                data.loadTypeId = 40
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=deliver')
              }
                else if(this.isArtery){
                data.loadTypeId = 39
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=artery')
              }
                else{
                data.loadTypeId = 38
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=shortDepart')
              }

        }else{

              if(this.deliver){
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=deliver')
              }
              else if(this.isArtery){
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=artery')
              }
              else{
                promiseObj = postCreateBillCheckCarInfo(data)
                this.eventBus.$emit('replaceCurrentView', '/finance/reconciliation/carfee?tabname=shortDepart')
              }
            }

            promiseObj.then(res => {
              this.loading = false
              this.$message({
                message: '操作成功~',
                type: 'success'
              })

              this.closeMe()
            }).catch(err => {
              this.loading = false
            })
        //   } else {
        //     return false;
        //   }
        // });
      },
    }
  }
</script>

<style lang="scss">
  .saveDialog-maintain .pickpopDepMain{
    top: 29%;
    bottom: auto;
    min-width: 486px;
    max-width:  486px;
    .dialog-footer-frame{
      text-align: right;
      padding-right: 10px;
    }

  }
  .saveDialog-maintain .popRight-content{
    padding: 20px 0 5px 10px;
    box-sizing: border-box;
    .el-form--inline .el-form-item{
      margin-right: -8px;
      margin-bottom: 5px;
    }
    .el-input{
      width: 90%;

    }

    .el-input__inner{
      height: 30px;
      font-size: 14px;

    }
    .dialogMoney{
      margin: 0 0 13px 0px;
      font-size: 14px;
      color: #333333;
      span{
        color: #ff2f2f;
        font-weight: 600;
      }
    }
  }
</style>
