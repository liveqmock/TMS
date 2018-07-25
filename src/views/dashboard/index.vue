<template>
  <div class="dashboard-container">
    <div class="index-flow">
      <!-- 第一块 -->
        <!-- <h3 class="thetitle">发货网点</h3> -->
        <el-tooltip placement="top">
          <div slot="content">功能：安排车辆上门提货
<br/>操作：提货管理-新增提货</div>
          <router-link to="/operation/order/pickUp" class="flowitem send-01tihuo">
            <i class="flowicon tihuo"></i>
            <p>提货</p>
          </router-link>
        </el-tooltip>
        
        <el-tooltip placement="top">
          <div slot="content">功能：批量导入运单。
<br/>操作：订单管理-批量开单</div>
        <router-link to="/operation/order/manage" class="flowitem send-02daoru">
          <i class="flowicon daoru"></i>
          <p>运单导入</p>
        </router-link>
        </el-tooltip>

        <el-tooltip placement="top">
          <div slot="content">功能：客户通过网络，电话下单。
<br/>操作：订单管理-客服，网络订单</div>
        <router-link to="/operation/order/manage" class="flowitem send-03dingdna">
          <i class="flowicon dingdna"></i>
          <p>客户订单</p>
        </router-link>
        </el-tooltip>

        <el-tooltip placement="top">
          <div slot="content">功能：创建并打印标签和快速运单<br/>操作：订单管理-预开单</div>
        <router-link to="/operation/order/orderManage" class="flowitem send-04yundan">
          <i class="flowicon yundan"></i>
          <p>正式运单</p>
        </router-link>
        </el-tooltip>

        <el-tooltip placement="top">
          <div slot="content">功能：发货方，承运方之间凭证。<br/>操作：首页，运单列表，创建运单。</div>
        <router-link to="/operation/order/transfer" class="flowitem send-04zhongzhuan">
          <i class="flowicon zhongzhuan"></i>
          <p>中转外发</p>
        </router-link>
        </el-tooltip>

        <el-tooltip  placement="top">
          <div slot="content">功能：开单，网点接货，并未配载出库。<br/>操作：运营管理-库存管理。</div>
        <router-link to="/operation/order/repertory" class="flowitem send-06fahuokc">
          <i class="flowicon fahuokc"></i>
          <p>发货库存</p>
        </router-link>
        </el-tooltip>

        <el-tooltip placement="top">
          <div slot="content">功能：同个区域不同网点货物配载到分拨中心。<br/>操作：运营管理-短驳管理。</div>
        <router-link to="/operation/order/shortDepart" class="flowitem send-07duanbo">
          <i class="flowicon duanbo"></i>
          <p>短驳接收</p>
        </router-link>
        </el-tooltip>

        <el-tooltip content="配载发车" placement="top">
        <router-link to="/operation/order/arteryDepart" class="flowitem send-08peizai">
          <i class="flowicon peizai"></i>
          <p>配载发车</p>
        </router-link>
        </el-tooltip>
      <!-- 中间 -->
      <el-tooltip content="中转跟踪" placement="top">
        <router-link to="/operation/order/track" class="flow-add-1">中转跟踪</router-link>
      </el-tooltip>
      <el-tooltip content="智能在途跟踪" placement="top">
        <router-link to="/operation/order/track" class="flow-add-2">智能在途跟踪</router-link>
      </el-tooltip>
      <!-- 第二块 -->
        <!-- <h3 class="thetitle">收货网点</h3> -->

        <el-tooltip content="到车/到货" placement="top">
        <router-link to="/operation/order/arteryDelivery" class="flowitem receive-09daohuo">
          <i class="flowicon daohuo"></i>
          <p>到车/到货</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="中转外发" placement="top">

        <router-link to="/operation/order/transfer" class="flowitem receive-04zhongzhuan">
          <i class="flowicon zhongzhuan"></i>
          <p>中转外发</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="到货库存" placement="top">
        <router-link to="/operation/order/repertory" class="flowitem receive-10kucun">
          <i class="flowicon kucun"></i>
          <p>到货库存</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="短驳发车" placement="top">
        <router-link to="/operation/order/shortDepart" class="flowitem receive-11duobofache">
          <i class="flowicon duobofache"></i>
          <p>短驳发车</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="自提" placement="top">

        <router-link to="/operation/order/pickUp" class="flowitem receive-12ziti">
          <i class="flowicon ziti"></i>
          <p>自提</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="送货上门" placement="top">
        <router-link to="/operation/order/deliverManage" class="flowitem receive-13songhuosm">
          <i class="flowicon songhuosm"></i>
          <p>送货上门</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="签收" placement="top">

        <router-link to="/operation/order/sign" class="flowitem receive-14qianshou">
          <i class="flowicon qianshou"></i>
          <p>签收</p>
        </router-link>
        </el-tooltip>

      <!-- 第三块 -->
        <!-- <h3 class="thetitle">回单管理</h3> -->

        <el-tooltip content="回单发放" placement="top">
        <router-link to="/operation/order/receipt" class="flowitem receipt-18fafang">
          <i class="flowicon fafang"></i>
          <p>回单发放</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="回单接收" placement="top">
        <router-link to="/operation/order/receipt" class="flowitem receipt-17jieshou">
          <i class="flowicon jieshou"></i>
          <p>回单接收</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="回单寄出" placement="top">
        <router-link to="/operation/order/receipt" class="flowitem receipt-16jichu">
          <i class="flowicon jichu"></i>
          <p>回单寄出</p>
        </router-link>
        </el-tooltip>
        <el-tooltip content="回单回收" placement="top">
        <router-link to="/operation/order/receipt" class="flowitem receipt-15huishou">
          <i class="flowicon huishou"></i>
          <p>回单回收</p>
        </router-link>
        </el-tooltip>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    padding: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.index-flow{
  width: 1171px;
  height: 654px;
  margin: 53px auto 0;
  position: relative;
  background: url("../../assets/flow/index-bg.png") no-repeat;
  /* background: url("../../assets/flow/index.jpg") no-repeat -3px -4px; */


  .flowitem{
    position: absolute;
    width: 80px;
    height: 90px;
    text-align: center;
    position: absolute;
    transition: all .5s ease;

    &:hover{
      transform: translate(0, -1px);
    }

    i{
      display: block;
      margin: 0 auto;
    }

    p{
      display: inline-block;
      white-space:nowrap;
      font-size: 14px;
    }
  }

  .send-01tihuo{
    left: 22px;
    top: 73px;
  }
  .send-02daoru{
    left: 15px;
    top: 229px;
  }

  .send-04yundan{
    left: 149px;
    top: 221px;
  }
  .send-03dingdna{
    left: 17px;
    top: 392px;
  }

  .send-04zhongzhuan{
    left: 266px;
    top: 80px;
  }

  .send-06fahuokc{
    left: 264px;
    top: 222px;
  }

  .send-07duanbo{
    left: 258px;
    top: 395px;
  }

  .send-08peizai{
    left: 412px;
    top: 220px;
  }

  .flow-add-1,.flow-add-2{
    position: absolute;
    text-align: center;
    width: 127px;
    height: 41px;
    line-height: 41px;
  }

  .flow-add-1{
    left: 521px;
    top: 91px;
  }

  .flow-add-2{
    left: 521px;
    top: 237px;
    font-size: 14px;
  }

  .receive-09daohuo{
    left: 666px;
    top: 222px;
  }

  .receive-04zhongzhuan{
    left: 811px;
    top: 76px;
  }

  .receive-10kucun{
    left: 810px;
    top: 223px;
  }

  .receive-11duobofache{
    left: 810px;
    top: 397px;
  }

  .receive-12ziti{
    left: 941px;
    top: 131px;
  }

  .receive-13songhuosm{
    left: 941px;
    top: 266px;
  }

  .receive-14qianshou{
    left: 1067px;
    top: 226px;
  }

  .receipt-18fafang{
    left: 197px;
    top: 555px;
  }

  .receipt-17jieshou{
    left: 417px;
    top: 555px;
  }

  .receipt-16jichu{
    left: 624px;
    top: 555px;
  }

  .receipt-15huishou{
    top: 555px;
    left: 862px;
  }
}

</style>
