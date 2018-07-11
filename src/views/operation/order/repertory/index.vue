<template>
	<div class="repetory-manager tab-wrapper">
		<div class="eltab clearfix">
			<!-- 库存管理 -->
			<span @click="component = 'allrepertory'" class="tab-label" :class="{'active-tab': component.indexOf('allrepertory')!==-1}">库存总表</span>
     		<span @click="component = 'deliver'" class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">发货库存</span>
     		<span @click="component = 'arrival'" class="tab-label" :class="{'active-tab': component.indexOf('arrival')!==-1}">到货库存</span>
		</div>
		<keep-alive>
	      <component v-bind:is="component"></component>
	   </keep-alive>
	</div>
</template>

<script>
import arrival from './arrival'
import deliver from './deliver'
import allrepertory from './allrepertory'
export default {
  components: {
  	allrepertory,
  	deliver,
  	arrival
  },
  props: {
  	isShow: {
  	  type: Boolean,
  	  default: false
  	}
  },
  data () {
    return {
      component: 'allrepertory'
    }
  }
}
</script>

