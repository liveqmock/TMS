<template>
  <div class="customer-manager tab-wrapper">
    <div class="eltab clearfix">
      <span @click="component = 'Sender'" class="tab-label" :class="{'active-tab': component.indexOf('ender')!==-1}">发货人</span>
      <span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">收货人</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import Sender from './sender'
import Receiver from './receiver'

export default {
  components: {
    Sender,
    Receiver
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'Sender'
    }
  }
}
</script>

