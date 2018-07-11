<template>
  <div class="component">
    <h2>右边弹窗</h2>
    <popCenter title="自定义的标题" :isShow="show" @close="close" />
    <button @click="show = true">展示弹窗</button>
    <blockquote>
      引用地址：
      components/PopRight/index.vue
    </blockquote>
    <h3>prop</h3>
    <ul>
      <li>title<div class="type">String</div>自定义的标题</li>
      <li class="info-require">isShow<div class="type">Boolean</div>是否显示弹窗</li>
    </ul>
    <h3>event</h3>
    <ul>
      <li><div class="function">close</div>点击关闭按钮触发 </li>
    </ul>
    <h3>SLOT</h3>
    <ul>
      <li>
        title 标题部分
      </li>
      <li>
        content 内容部分
      </li>
      <li>
        footer 底部部分
      </li>
    </ul>
  </div>
</template>
<script>
import popCenter from '@/components/PopRight/index'
export default {
  components: {
    popCenter
  },
  data () {
    return {
      show: false  
    }
  },
  methods: {
    close (obj) {
      this.show = false
    }
  }
}
</script>
