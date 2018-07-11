<template>
  <div>
    <h2>自定义指令</h2>

    <blockquote>
      目前所有自定义指令都是注册到全局，可在子组件中直接使用
    </blockquote>
    
    <h3>v-numberOnly</h3>
    <p>只允许输入数字</p>
    <input v-numberOnly type="text">
    <blockquote>
      只适用于input、el-input标签
    </blockquote>
    <p>修饰符 v-number-only:point 允许小数点</p>
    <input v-number-only:point type="text">

    <h3>v-showPicture</h3>
    <p>弹窗展示图片</p>
    <button v-showPicture imgurl="http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png">点击预览</button>
    <blockquote>
      目前获取大图链接的逻辑是：<br>el.getAttribute('imgurl') || el.src || el.href
    </blockquote>
    <ul>
      <li>先尝试获取自定义属性imgurl；</li>
      <li>如果没有，则将其当作图片对待，获取src属性；</li>
      <li>最后前面都没拿到链接，则当a标签处理，获取其href属性</li>
    </ul>

    <h3>v-Clipboard</h3>
    <p>复制文案</p>
    <el-button type="primary" icon="document" v-clipboard:copy='inputData' v-clipboard:success='clipboardSuccess'>copy</el-button>
    <ul>
      <li>
        v-clipboard:copy='inputData' 要复制的数据
      </li>
      <li>
        v-clipboard:success 复制成功后的回调函数
      </li>
      <li>
        v-clipboard:error 复制失败后的回调函数
      </li>
    </ul>

    <h3>可移动的dialog</h3>
    <p>应用在el-dialog标签上</p>
    <div class="components-container">
    <el-button type="primary" @click="dialogTableVisible = true">open a Drag Dialog</el-button>
    <el-dialog v-el-drag-dialog title="Shipping address" :visible.sync="dialogTableVisible">
      asfasfasf
    </el-dialog>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogTableVisible: false,
      inputData: '安发网络'
    }
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

