<template>
  <div class="controlgoods-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'AllGoods'" class="tab-label" :class="{'active-tab': component.indexOf('AllGoods')!==-1}">全部</span>
      <span @click="component = 'NoGoods'" class="tab-label" :class="{'active-tab': component.indexOf('NoGoods')!==-1}">未放货</span>
      <span @click="component = 'HaveGoods'" class="tab-label" :class="{'active-tab': component.indexOf('HaveGoods')!==-1}">已放货</span>
    </div>
    <keep-alive>
        <component v-bind:is="component"></component>
    </keep-alive>
  </div>
  
</template>

<script>
import NoGoods from './noGoods'// 登记
import HaveGoods from './haveGoods'// 处理
import AllGoods from './allGoods'// 处理
export default {
  components: {
    NoGoods,
    HaveGoods,
    AllGoods
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  mounted() {
        // this.searchQuery.vo.orgid = this.otherinfo.orgid
            // this.fetchAllCustomer(this.otherinfo.orgid).then(res => {
                // this.loading = false
            // })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'AllGoods'
    }
  },
  methods: {
  }

}
</script>

