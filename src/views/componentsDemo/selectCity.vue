<template>
  <div class="component">
    <h2>获取城市</h2>
    <SelectCity :city="city" @change="getcity" />
    <blockquote>
      引用地址：
      components/selectCity/index.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li class="info-require">city<div class="type">  String</div>用来绑定值</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">change</div>返回当前选择的城市 </li>
    </ul>
  </div>
</template>
<script>
import SelectCity from '@/components/selectCity/index'
export default {
  components: {
    SelectCity
  },
  data() {
    return {
      city: '广州,广东省'
    }
  },
  methods: {
    getcity(obj) {
      // {
      //   pageNum: 1,
      //   pageSize: 100
      // }
      console.log('pagenation', obj)
      this.city = obj.longAddr
    }
  }
}
</script>
