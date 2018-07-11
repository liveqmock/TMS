<template>
  <div class="component">
    <h2>翻页</h2>
    <Pagination :sizes="[100, 200, 300, 400]" :total="1000" @change="getPageInfo" />
    <blockquote>
      引用地址：
      components/Pagination/index.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li>sizes<div class="type">Array</div>每页数量配置，默认[100, 200, 300, 400]</li>
      <li class="info-require">total<div class="type">Number</div>条目总数， 必填</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">change</div>返回当前翻页相关数据，如 <pre>
      {
        pageNum: 1, // 当前页
        pageSize: 100 // 每页展示数量
      }  
      </pre></li>
    </ul>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
export default {
  components: {
    Pagination
  },
  methods: {
    getPageInfo (obj) {
      // {
      //   pageNum: 1,
      //   pageSize: 100
      // }
      console.log('pagenation', obj)
    }
  }
}
</script>
