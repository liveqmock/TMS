<template>
  <div class="abnormal-manager tab-wrapper">
    <div class="eltab clearfix">
        <span @click="component = 'AbReg'" class="tab-label" :class="{'active-tab': component.indexOf('AbReg')!==-1}">异常登记</span>
        <span @click="component = 'AbDeal'" class="tab-label" :class="{'active-tab': component.indexOf('AbDeal')!==-1}">异常处理</span>
    </div>
    <keep-alive>
        <component v-bind:is="component"></component>
    </keep-alive>
  </div>
  
</template>

<script>
import AbReg from './abReg'// 登记
import AbDeal from './abDeal'// 处理
// import AbReg from './abdj'
// import AbDeal from './abcl'
export default {
  components: {
    AbReg,
    AbDeal
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
      component: 'AbReg'
    }
  },
  methods: {
  }

}
</script>
