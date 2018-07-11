<template>
  <div class="sign-manager tab-wrapper">
    <div class="eltab clearfix">
        <span @click="component = 'Pick'" class="tab-label" :class="{'active-tab': component.indexOf('Pick')!==-1}">自提签收</span>
        <span @click="component = 'Delivery'" class="tab-label" :class="{'active-tab': component.indexOf('Delivery')!==-1}">送货签收</span>
        <span @click="component = 'Transfer'" class="tab-label" :class="{'active-tab': component.indexOf('Transfer')!==-1}">中转签收</span>
    </div>
    <keep-alive>
        <component v-bind:is="component"></component>
    </keep-alive>
  </div>
  
</template>

<script>
import Pick from './pick'// 自提签收
import Delivery from './delivery'// 送货签收
import Transfer from './transfer'// 中转签收

// import Flow from './flow'
export default {
  components: {
    Pick,
    Delivery,
    Transfer

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
      component: 'Pick'
    }
  },
  methods: {
  }

}
</script>
