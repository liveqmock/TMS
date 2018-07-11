<template>
  <div class="payment-manager tab-wrapper">
    <div class="eltab clearfix">
        <span @click="component = 'Recycle'" class="tab-label" :class="{'active-tab': component.indexOf('Recycle')!==-1}">货款回收</span>
        <span @click="component = 'Send'" class="tab-label" :class="{'active-tab': component.indexOf('Send')!==-1}">货款汇款</span>
        <span @click="component = 'Accept'" class="tab-label" :class="{'active-tab': component.indexOf('Accept')!==-1}">货款到账</span>
        <span @click="component = 'Grant'" class="tab-label" :class="{'active-tab': component.indexOf('Grant')!==-1}">货款发放</span>
    </div>
    <keep-alive>
        <component v-bind:is="component"></component>
    </keep-alive>
  </div>
  
</template>

<script>
import Send from './send'//寄出
import Recycle from './recycle'//回收
import Grant from './grant'//发放
import Accept from './accept'//接收
// import Flow from './flow'
export default {
    components: {
        Send,
        Recycle,
        Grant,
        Accept
    },
    mounted () {
        },
        data() {
            return {
                component: 'Recycle'
            }
        },
        methods: {
        }
    
    }
</script>