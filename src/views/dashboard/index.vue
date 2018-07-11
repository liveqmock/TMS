<template>
  <div class="dashboard-container">
    <div class="index-flow">
      <!-- 第一块 -->
      <div class="sendGroup">
        <h3 class="thetitle">发货网点</h3>
        <div class="flowitem send-01tihuo">
          <i class="flowicon 01tihuo"></i>
          <p class="flowtitle">提货</p>
        </div>
        <div class="flowitem send-02daoru">
          <i class="flowicon 02daoru"></i>
          <p class="flowtitle">运单导入</p>
        </div>
        <div class="flowitem send-03dingdna">
          <i class="flowicon 03dingdna"></i>
          <p class="flowtitle">客户订单</p>
        </div>

        <div class="flowitem send-04yundan">
          <i class="flowicon 04yundan"></i>
          <p class="flowtitle">正式运单</p>
        </div>

        <div class="flowitem send-04zhongzhuan">
          <i class="flowicon 04zhongzhuan"></i>
          <p class="flowtitle">中转外发</p>
        </div>
        <div class="flowitem send-06fahuokc">
          <i class="flowicon 06fahuokc"></i>
          <p class="flowtitle">发货库存</p>
        </div>
        <div class="flowitem send-07duanbo">
          <i class="flowicon 07duanbo"></i>
          <p class="flowtitle">短驳接收</p>
        </div>

        <div class="flowitem send-08peizai">
          <i class="flowicon 08peizai"></i>
          <p class="flowtitle">配载发车</p>
        </div>
      </div>
      <!-- 中间 -->
      <span class="flow-add-1">中转跟踪</span>
      <span class="flow-add-2">智能在途跟踪</span>
      <!-- 第二块 -->
      <div class="receiveGroup">
        <h3 class="thetitle">收货网点</h3>

        <div class="flowitem receive-09daohuo">
          <i class="flowicon 09daohuo"></i>
          <p class="flowtitle">到车/到货</p>
        </div>

        <div class="flowitem receive-04zhongzhuan">
          <i class="flowicon 04zhongzhuan"></i>
          <p class="flowtitle">中转外发</p>
        </div>
        <div class="flowitem receive-10kucun">
          <i class="flowicon 10kucun"></i>
          <p class="flowtitle">到货库存</p>
        </div>
        <div class="flowitem receive-11duobofache">
          <i class="flowicon 11duobofache"></i>
          <p class="flowtitle">短驳发车</p>
        </div>

        <div class="flowitem receive-12ziti">
          <i class="flowicon 12ziti"></i>
          <p class="flowtitle">自提</p>
        </div>
        <div class="flowitem receive-13songhuosm">
          <i class="flowicon 13songhuosm"></i>
          <p class="flowtitle">送货上门</p>
        </div>

        <div class="flowitem receive-14qianshou">
          <i class="flowicon 14qianshou"></i>
          <p class="flowtitle">签收</p>
        </div>
      </div>
      <!-- 第三块 -->
      <div class="receiptGroup">
        <h3 class="thetitle">回单管理</h3>
        <div class="flowitem receipt-18fafang">
          <i class="flowicon 18fafang"></i>
          <p class="flowtitle">回单发放</p>
        </div>
        <div class="flowitem receipt-17jieshou">
          <i class="flowicon 17jieshou"></i>
          <p class="flowtitle">回单接收</p>
        </div>
        <div class="flowitem receipt-16jichu">
          <i class="flowicon 16jichu"></i>
          <p class="flowtitle">回单寄出</p>
        </div>
        <div class="flowitem receipt-15huishou">
          <i class="flowicon 15huishou"></i>
          <p class="flowtitle">回单回收</p>
        </div>
      </div>
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
  width: 1172px;
  width: 1176px;
  height: 754px;
  margin: 53px auto 0;
  background: url("../../assets/flow/index.png") no-repeat;
  background: url("../../assets/flow/index.jpg") no-repeat;

  *{
    display: none;
  }
}

</style>
