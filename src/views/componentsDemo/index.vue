<template>
  <div class="showComponents">
    <div class="sidebar-demo">
      <h2>边栏导航</h2>
      <ol>
        <li v-for="(route, index) in sidebar" :key="index" :class="{active: route.path === $route.path}">
          <router-link :to="route.path">{{ index + 1 }} 、 {{ route.name }}</router-link>
        </li>
      </ol>
    </div>
    <div class="demo-contents">
      <h1>展示自定义的组件、指令、过滤器等</h1>
      <p>为了方便大家使用各自开发的公共组件，希望大家弄了自定义组件、指令等，都添加示例到这个页面</p>
      <div class="important">
        正式上线需要屏蔽此页面，减小打包体积
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'permission_routers'
    ]),
    sidebar () {
      return this.permission_routers.filter(i => {
        return i.path === "/components"
      })[0].children
    }
  }
}
</script>
<style lang="scss">
.showComponents{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  

  p {
    margin-top: 20px;
  }
  h2, h3{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .important{
    border-left: 5px solid #f00;
    text-indent: 20px;
    background: #ffe;
    margin: 10px 0;
  }
  .component{
    margin-top: 20px;
    border-top: 1px dashed #000;
    padding: 20px 0;
    li{
      margin-top: 20px;
      .type{
        color:orchid;
      }
    }
  }
  .active{
    color: #f00;
    background: #ffe;
  }
  .sidebar-demo{
    float: left;
    width: 200px;
    overflow: auto;
    height: 100%;
    border-right: 1px solid #000;
    margin-right: 30px;
    
    ol{
      list-style: decimal;
    }

    li{
      line-height: 1.5;
      text-indent: 30px;
      border-bottom: 1px dashed #eee;
      

      &:hover{
        background: #ffe;
      }
    }
  }
  .demo-contents{
    height: 100%;
    overflow: auto;
    padding-right: 30px;
  }
  blockquote{
    border-left: 1px solid #000;
    padding: 10px;
    background: #eee;
    margin: 20px 0;
  }
}
</style>
