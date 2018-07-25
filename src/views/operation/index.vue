<template>
  <div class="dashboard-container">
    <div class="operation_flow">
      <div class="operation_flow_item">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i>
            <p>提货</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：发货方，承运方之间的凭证
          </div>
          <router-link to="./order/createOrder">
            <i class="flowicon daoru"></i>
            <p>开单</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：把同个区域不同网点收的货物配载到分拨中心，进行干线配载
          </div>
          <div @click="gotoPage('deliver', './order/shortDepart')">
            <i class="flowicon duanbo"></i>
            <p>短驳接收</p>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：接收其他网点发运到本网点的货物，以车为单位
          </div>
          <router-link to="./order/arteryDelivery">
            <i class="flowicon daohuo"></i>
            <p>干线到车</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：开单收货，网点到货形成库存
          </div>
          <router-link to="./order/repertory">
            <i class="flowicon kucun"></i>
            <p>库存管理</p>
          </router-link>
        </el-tooltip>
      </div>
      <div class="operation_flow_item">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：把货物转运给分拨中心
          </div>
          <router-link to="./order/shortDepart">
            <i class="flowicon duobofache"></i>
            <p>短驳发车</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：在公司网点间走货运输
          </div>
          <router-link to="./order/arteryDepart">
            <i class="flowicon peizai"></i>
            <p>干线发车</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：目的网点对需要送货上门的运单安排送货
          </div>
          <router-link to="./order/deliverManage">
            <i class="flowicon songhuosm"></i>
            <p>送货上门</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：将运单转给第三方承运商
          </div>
          <router-link to="./order/transferLoad">
            <i class="flowicon zhongzhuan"></i>
            <p>中转外发</p>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：对自提，送货上门，中转外发运单进行签收
          </div>
          <router-link to="./order/sign">
            <i class="flowicon qianshou"></i>
            <p>签收管理</p>
          </router-link>
        </el-tooltip>
      </div>
      <div class="operation_flow_item">
        <div class="operation_flow_foot_left">
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：对目的网点寄回的回单做接收
            </div>
            <div @click="gotoPage('Accept', './order/receipt')">
              <i class="flowicon jieshou"></i>
              <p>回单接收</p>
            </div>
          </el-tooltip>
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：开单网点把回单发放给客户
            </div>
            <div @click="gotoPage('Grant', './order/receipt')">
              <i class="flowicon fafang"></i>
              <p>回单发放</p>
            </div>
          </el-tooltip>
        </div>
        <div class="operation_flow_foot_right">
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：从收货人处回收回单
            </div>
            <div @click="gotoPage('Recycle', './order/receipt')">
              <i class="flowicon huishou"></i>
              <p>回单回收</p>
            </div>
          </el-tooltip>
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：目的网点把回单寄到开单网点
            </div>
            <div @click="gotoPage('Send', './order/receipt')">
              <i class="flowicon jichu"></i>
              <p>回单寄出</p>
            </div>
          </el-tooltip>
        </div>
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
    gotoPage(name, path) {
      this.$router.push({ path: path, query: { tableKey: name } })
    }
  }
}

</script>
<style lang="scss">
.dashboard {
  &-container {
    padding: 30px;
  }
}

.operation_flow {
  width: 1178px;
  height: 752px;
  margin: 53px auto 0;
  background-image: url("../../assets/flow/operation.png");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  .operation_flow_item {
    height: 210px;
    width: 83%;
    margin: 0 0 40px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 70px 100px 60px;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  .operation_flow_foot_right,
  .operation_flow_foot_left {
    width: 28%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .operation_flow_foot_left {
    margin: 40px 0 0 40px;
  }
  .operation_flow_foot_right {
    margin: 40px 50px 0 0px;
  }
}

.flowicon {
  transition: 0.5s;
}

.flowicon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}

</style>
