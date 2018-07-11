<template>
  <div class="component">
    <h2>获取网点树id</h2>
    <SelectTree v-model="orgid" @change="getOrgid" />
    <blockquote>
      引用地址：
      components/selectTree/index.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li class="info-require">v-model<div class="type"> [Number, String]</div>用来绑定值</li>
      <li>disabled<div class="type">Boolean</div>是否禁用组件，默认为false</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">change</div>返回当前选择的网点id </li>
    </ul>
  </div>
</template>
<script>
import SelectTree from '@/components/selectTree/index'
export default {
  components: {
    SelectTree
  },
  data () {
    return {
      orgid: 1
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
