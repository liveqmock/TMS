<template>
  <div class="dashboard-container">
    <div class="wzl_caiwu-flow">
      <div class="fin1-content">
        <el-tooltip content="现付" placement="top">
          <el-button @click="gotoPage('Cash', './accountsReceivable')">现付</el-button>
        </el-tooltip>
        <el-tooltip content="到付" placement="top">
          <el-button @click="gotoPage('Arrive', './accountsReceivable')">到付</el-button>
        </el-tooltip>
        <el-tooltip content="月结" placement="top">
          <el-button @click="gotoPage('Month', './accountsReceivable')">月结</el-button>
        </el-tooltip>
        <el-tooltip content="回单付" placement="top">
          <el-button @click="gotoPage('Receipt', './accountsReceivable')">回单付</el-button>
        </el-tooltip>
        <el-tooltip content="异动费用" placement="top">
          <el-button @click="gotoPage('Abnormal', './accountsReceivable')">异动费用</el-button>
        </el-tooltip>
      </div>
      <div class="fin2-content">
        <el-tooltip content="提货费" placement="top">
          <el-button>提货费</el-button>
        </el-tooltip>
        <el-tooltip content="实际提货费" placement="top">
          <el-button>实际提货费</el-button>
        </el-tooltip>
        <el-tooltip content="中转费" placement="top">
          <el-button @click="gotoPage('Transfer', './accountsPayable/waybill')">中转费</el-button>
        </el-tooltip>
        <el-tooltip content="回扣" placement="top">
          <el-button @click="gotoPage('Kickback', './accountsPayable/waybill')">回扣</el-button>
        </el-tooltip>
        <el-tooltip content="单票提货费" placement="top">
          <el-button  @click="gotoPage('Ticket', './accountsPayable/waybill')">单票提货费</el-button>
        </el-tooltip>
        <el-tooltip content="异动费用" placement="top">
          <el-button  @click="gotoPage('Unusual', './accountsPayable/waybill')">异动费用</el-button>
        </el-tooltip>
        <el-tooltip content="其他支出" placement="top">
          <el-button @click="gotoPage('Other', './accountsPayable/waybill')">其他支出</el-button>
        </el-tooltip>
        <el-tooltip content="送货费" placement="top">
          <el-button @click="gotoPage('Deliver', './accountsPayable/batch')">送货费</el-button>
        </el-tooltip>
        <el-tooltip content="短驳费" placement="top">
          <el-button  @click="gotoPage('Short', './accountsPayable/batch')">短驳费</el-button>
        </el-tooltip>
        <el-tooltip content="干线费" placement="top">
          <el-button>干线费</el-button>
        </el-tooltip>
        <el-tooltip content="异常理赔" placement="top">
          <el-button @click="gotoPage('Abnormal', './accountsPayable/waybill')">异常理赔</el-button>
        </el-tooltip>
        <el-tooltip content="整车保险费" placement="top">
          <el-button @click="gotoPage('Insurance', './accountsPayable/batch')">整车保险费</el-button>
        </el-tooltip>
        <el-tooltip content="发车汇总" placement="top">
          <el-button @click="gotoPage('TruckAll', './accountsPayable/batch')">发车汇总</el-button>
        </el-tooltip>
        <el-tooltip content="到车汇总" placement="top">
          <el-button @click="gotoPage('ArrivalAll', './accountsPayable/batch')">到车汇总</el-button>
        </el-tooltip>
        <el-tooltip content="发站装卸费" placement="top">
          <el-button @click="gotoPage('StationLoad', './accountsPayable/batch')">发站装卸费</el-button>
        </el-tooltip>
        <el-tooltip content="发站其他费" placement="top">
          <el-button @click="gotoPage('StationOther', './accountsPayable/batch')">发站其他费</el-button>
        </el-tooltip>
        <el-tooltip content="到站装卸费" placement="top">
          <el-button @click="gotoPage('ArriveLoad', './accountsPayable/batch')">到站装卸费</el-button>
        </el-tooltip>
        <el-tooltip content="到站其他费" placement="top">
          <el-button @click="gotoPage('ArriveOther', './accountsPayable/batch')">到站其他费</el-button>
        </el-tooltip>
      </div>
      <div class="fin3-content">
        <el-tooltip content="货款到账" placement="top">
          <el-button @click="gotoPage('Accept', './payment')">货款到账</el-button>
        </el-tooltip>
        <el-tooltip content="货款发放" placement="top">
          <el-button @click="gotoPage('Grant', './payment')">货款发放</el-button>
        </el-tooltip>
      </div>
      <div class="fin4-content">
        <el-tooltip content="货款回收" placement="top">
          <el-button @click="gotoPage('Recycle', './payment')">货款回收</el-button>
        </el-tooltip>
        <el-tooltip content="货款汇款" placement="top">
          <el-button @click="gotoPage('Send', './payment')">货款汇款</el-button>
        </el-tooltip>
      </div>
      <div class="fin5-content">
        <router-link to="./accountsReceivable">
          <el-tooltip content="应收账款" placement="top">
            <el-button>应收账款</el-button>
          </el-tooltip>
        </router-link>
        
        <!-- <router-link to="./accountsReceivable"></router-link> -->
        <el-tooltip content="应付账款" placement="top">
          <el-button  @click="gotoPage('Kickback', './accountsPayable/waybill')">应付账款</el-button>
        </el-tooltip>
      </div>
      <div class="fin6-content">
        <router-link to="./reconciliation/carrier">
           <el-tooltip content="帐款管理" placement="top">
            <el-button>账款管理</el-button>
          </el-tooltip>
        </router-link>
        <router-link to="./settleLogIncome">
          <el-tooltip content="记收入" placement="top">
            <el-button  @click="gotoPage('Send', './settleLogIncome')">记收入</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin7-content">
        <router-link to="./settleLogExpandtiure">
          <el-tooltip content="记支出" placement="top">
            <el-button  @click="gotoPage('Send', './settleLogExpandtiure')">记支出</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin8-content">
        <router-link to="./settleLog">
          <el-tooltip content="资金流水" placement="top">
            <el-button>资金流水</el-button>
          </el-tooltip>
        </router-link>
      </div>
    </div>	
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // gotoPage() {
    //   this.$router.push({
    //     path: './accountsPayable/batch',
    //     query: {
    //       name: 'batchShort'
    //     }
    //   })
    // }
    gotoPage: function(name, path) {
      this.$router.push({
        path: path,
        query: {
          name: name
        }
      })
    }
  }
}
</script>
<style lang="scss">
@media (min-width: 1024px){
// body{background:red;}
  .dashboard {
    &-container {
      padding: 30px;
    }
  }
  .wzl_caiwu-flow{
    width: 1223px;
    height: 603px;
    margin: 53px auto 0;
    position: relative;
    background: url("../../assets/flow/cw1.png") no-repeat;
    .el-button{
      display: inline-block;
      // width: 88px;
      width: 110px;
      margin:5px;
      padding: none;
      text-align: center;
      background-color: #cbebff;
      border-radius: 2px;
      border: solid 1px #39bbff;
      font-weight: bold;
      font-size: 13px;
      user-select: none;//避免选中的时候有默认样式
    }
    .fin1-content{
      width:680px;
      height: 75px;
      line-height: 75px;
      border-radius: 10px;
      text-align: center;
      // background: red;
      position: absolute;
      top:5px;
      left:347px;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin2-content{
      width: 681px;
      height: 223px;
      padding-top: 10px;
      // background: red;
      position: absolute;
      top: 110px;
      right: 195px;
      border-radius: 10px;
      padding-left:33px;
      // text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        // transform: translate(8px,5px)
        transform:scale(1.1,1.1)
      
      }
      :hover span{
        color:#fff;
      }
      
    }
    .fin3-content{
      // background: red;
      width: 268px;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      position: absolute;
      left: 413px;
      top: 388px;
      text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin4-content{
      // background:yellow;
      width: 268px;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      position: absolute;
      left: 693px;
      top: 388px;
      text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin5-content{
      // background: red;
      width: 118px;
      height: 308px;
      position: absolute;
      left: 184px;
      top: 16px;
      .el-button{
        display: inline-block;
        width: 110px;
        margin-top: 9px;
        margin-bottom: 127px;
        padding: none;
        text-align: center;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin6-content{
      // background: yellow;
      width: 118px;
      height: 308px;
      position: absolute;
      left: 184px;
      top: 371px;
      .el-button{
        display: inline-block;
        width: 110px;
        margin-top: 28px;
        margin-bottom: 88px;
        padding: none;
        text-align: center;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin7-content{
      // background: yellow;
      width: 121px;
      height: 50px;
      position: absolute;
      bottom: 3px;
      left: 338px;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin8-content{
      // background:red;
      width: 121px;
      height: 50px;
      position:absolute;
      right:-5px;
      bottom: 257px;
      cursor: pointer;
      .el-button{
        height: 42px;
       background-color: #13a5f2;
       border:none;
       color:#fff;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
    }
  }  
}

</style>
