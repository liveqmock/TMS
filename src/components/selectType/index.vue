<template>
  <el-select ref="myautocomplete" @change="change" v-model="val" :placeholder="placeholder" v-bind="$attrs">
    <slot name="head"></slot>
    <template v-for="item in types">
      <!-- 将 `item` 对象作为一个插槽的 prop 传入。-->
      <slot v-bind:item="item">
        <!-- 回退的内容 -->
        <el-option :key="item.id" :label="item.dictName" :value="item.id"></el-option>
      </slot>
    </template>
    <slot name="foot"></slot>
  </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
import { getSelectType } from '@/api/common'
import { mapGetters } from 'vuex'
import CACHE from '@/utils/cache'

/**
 * 可选的type值
network_type	网点类型
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
order_status 订单状态
fee_status 交账状态
 */

export default {
  name: 'selectType',
  props: {
    orgid: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String, Array]
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      val: '',
      types: [],
      dataCache: {
        'fee_status': [{
          id: 'NOSETTLEMENT',
          dictName: '未交账'
        }, {
          id: 'PARTSETTLEMENT',
          dictName: '部分交账'
        }, {
          id: 'ALLSETTLEMENT',
          dictName: '已交账'
        }]
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        // 针对以id为value值的，将传过来的值做一次统一的转换为数值
        if (/\d+/.test(newVal)) {
          this.val = parseInt(newVal, 10) || ''
        } else {
          this.val = newVal || ''
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 因为字典的数据修改频率极其小，
    // 尝试缓存以减少网络请求
    if (this.remote) {
      this.fetchData()
    } else {
      const data = CACHE.get(this.type)
      if (data === '') {
        this.fetchData()
      } else {
        this.types = data
      }
    }
    eventBus.$on('closepopbox', () => {
      console.log('closepopbox selectType:')
      this.$refs.myautocomplete.handleClose()
    })
  },
  methods: {
    fetchData() {
      var cb = (data) => {
        this.types = data
        // debugger
        CACHE.set(this.type, data)
      }
      if (this.dataCache[this.type]) {
        cb(this.dataCache[this.type])
      } else {
        getSelectType(this.type, this.orgid || this.otherinfo.companyId).then(cb)
      }
    },
    change(item) {
      this.$emit('change', item)
      this.$emit('input', this.val)
    }
  }
}
</script>
