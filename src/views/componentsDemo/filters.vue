<template>
  <div>
    <h2>自定义过滤器</h2>

    <blockquote>
      目前所有自定义过滤器都是注册到全局，可在子组件中直接使用
    </blockquote>
    
    <h3>timeAgo</h3>
    <div class="type">接受数值格式的时间值</div>
    <p>返回指定时间距离现在的时间段</p>
    <p>{{ (+new Date()/1000 - 1000) | timeAgo}}</p>
    <p>{{ (+new Date()/1000 - 10000) | timeAgo}}</p>
    <p>{{ (+new Date()/1000 - 100000) | timeAgo}}</p>
    <p>{{ new Date('2017/01/01 00:00:00') | timeAgo}}</p>
    <pre>
      
    </pre>

    <h3>parseTime</h3>
    <p>将时间以指定格式输出展示</p>
    <p>new Date() | parseTime <br>
    {{ new Date() | parseTime }}</p>
    <p>
      new Date() | parseTime('{y}/{m}/{d}') <br>
      {{ new Date() | parseTime('{y}/{m}/{d}') }}
    </p>
    <p>
      new Date() | parseTime('{y}{m}{d} {h}:{i}:{s}')<br>
      {{ new Date() | parseTime('{y}{m}{d} {h}:{i}:{s}') }}
    </p>

    <h3>formatTime</h3>
    <p>输出距离时间段</p>
    <p>
      +new Date()/1000 | formatTime<br>
      {{ +new Date()/1000 | formatTime }}
    </p>
    <p>
      +new Date('2017/01/01 00:00:00')/1000 | formatTime<br>
      {{ +new Date('2017/01/01 00:00:00')/1000 | formatTime }}
    </p>
    <p>
      +new Date('2018/05/27 00:00:00')/1000 | formatTime<br>
      {{ +new Date('2018/05/27 00:00:00')/1000 | formatTime }}
    </p>

    <h3>nFormatter</h3>
    <p>数字 格式化</p>
    <p>
       1111 | nFormatter <br>
      {{ 1111 | nFormatter }}
    </p>
    <p>
       2222222 | nFormatter <br>
      {{ 2222222 | nFormatter }}
    </p>
    <p>
       55555555 | nFormatter <br>
      {{ 55555555 | nFormatter }}
    </p>
    <p>
       999 | nFormatter <br>
      {{ 999 | nFormatter }}
    </p>


    <h3>toThousandslsFilter</h3>
    <p>用逗号分隔数字</p>
    <p>
      1234567890 | toThousandslsFilte <br>
      {{ 1234567890 | toThousandslsFilter }}
    </p>
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

