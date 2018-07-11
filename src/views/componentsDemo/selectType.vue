<template>
  <div class="component">
    <h2>获取指定类型的下拉框</h2>
    <SelectType v-model="selected" type="department_type" />
    <p>选中的值： {{ selected }}</p>
    <blockquote>
      引用地址：
      components/selectType/index.vue
    </blockquote>

    <h3>SLOT</h3>
    <p>作用域插槽： item</p>
    <select-type v-model="selected2" type="driving_type" >
      <template slot-scope="{ item }">
        <el-option
          :key="item.id"
          :label="item.dictName"
          :value="item.id">
          <span style="float: left">{{ item.dictName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">id: {{ item.id }}</span>
        </el-option>
      </template>
    </select-type>
    <p>选中的值： {{ selected2 }}</p>
    <p>插槽： head</p>
    <p>插入到所有选项的前面</p>
    <select-type v-model="selected3" type="driving_type" >
      <template slot="head">
        <el-option label="全部" value=""></el-option>
      </template>
      <template slot-scope="{ item }">
        <el-option
          :key="item.id"
          :label="item.dictName"
          :value="item.id">
          <span style="float: left">{{ item.dictName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">id: {{ item.id }}</span>
        </el-option>
      </template>
    </select-type>
    <p>插槽： foot</p>
    <p>插入到所有选项的后面</p>

    <h3>prop</h3>
    <ul>
      <li class="info-require">v-model<div class="type"> [Number, String]</div>用来绑定值</li>
      <li class="info-require">type<div class="type">String</div>下拉框要请求的类型</li>
      <li>orgid<div class="type">String</div>网点id，如果不传则引用当前用户的公司id</li>
      <li>placeholder<div class="type">Boolean</div>替代显示文案</li>
    </ul>

    <h3>type可选的值</h3>
    <pre>network_type	网点类型
manage_type	经营类型
driving_type	驾驶证类型
department_type	部门类型
upType	upRemark
payment_type	中转付款方式
department_type	部门类型
menu_type	菜单类型
network_status	网点状态
ship_time_rule	开单时间规则
notify_cargo_rule	通知放货规则
load_type	配载类型
apportion_type	分摊方式
short_batch_type	短驳批次状态
main_batch_type	干线批次状态
delivery_batch_type	送货批次状态
ship_status	运单状态
ship_delivery_method	交接方式
ship_pay_way	付款方式
ship_receipt_require	回单要求
ship_shipping_type	运输方式
ship_business_type	业务类型
ship_effective	时效性
sign_cocument_type	签收证件
sign_type	签收类型
ship_pay_way	付款方式
rec_status	回单回收状态
send_status	回单寄出状态
accept_status	回单接收状态
giveout_status	回单发放状态
rec_type	回单回收情况
accept_type	回单接收情况
abnormal_status	异常状态
abnormal_type	异常类型
truck_source	车辆来源
truck_type	车型
ship_other	其他
type	备注
department_type	部门类型
    </pre>
  </div>
</template>
<script>
import SelectType from '@/components/selectType/index'
export default {
  name: 'SelectTypeDemo',
  components: {
    SelectType
  },
  data () {
    return {
      orgid: 1,
      selected: '',
      selected3: '',
      selected2: ''
    }
  },
  methods: {
    getOrgid (obj) {
      // {
      //   pageNum: 1,
      //   pageSize: 100
      // }
      console.log('pagenation', obj)
    }
  }
}
</script>
