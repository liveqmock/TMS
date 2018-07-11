<template>
  <div class="tags-view-container">
    <div class="tags-view-scroll">
      <div class="scroll-container tags-view-wrapper" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
          <router-link class="tags-view-item" ref='tagIndex' :class="isActive(indexTag)?'active':''" to="/dashboard" >
          首页
          </router-link><router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
            :to="tag.fullPath" :key="tag.fullPath"> <span class="el-icon-refresh" title="刷新" @click.prevent.stop="refreshSelectedTag(tag)"></span>
            {{generateTitle(tag.title)}}<span class='el-icon-close' title="关闭" @click.prevent.stop='closeSelectedTag(tag)'></span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="tags-view-more">
      <i class="el-icon-arrow-down el-icon--right"></i>
      <div class="contextmenu-box" v-show="visible">
        <ul class='contextmenu' >
          <li v-if="!hideCloseCurrentMenu" @click="closeSelectedTag(selectedTag)">关闭</li>
          <li @click="closeOthersTags">关闭其他</li>
          <li @click="closeAllTags">关闭全部</li>
        </ul>
        <div class="menu-line"></div>
        <ul class="contextmenu contextmenu-list">
          <router-link tag="li" :class="isActive(indexTag)?'active-menu':''" to="/dashboard">
            <i class="el-icon-check"></i>
            首页
          </router-link>
          <router-link :class="isActive(tag, true)?'active-menu':''" tag="li" v-for="tag in Array.from(visitedViews)"
          :to="tag.fullPath" :key="tag.fullPath">
          <i class="el-icon-check"></i>
          {{generateTitle(tag.title)}}
          </router-link>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
const padding = 0

export default {
  data() {
    return {
      visible: true,
      top: 0,
      left: 0,
      selectedTag: {},
      hideCloseCurrentMenu: false,
      indexTag: { path: '/dashboard', fullPath: '/dashboard', name: '首页', lock: true }
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route(newpath, oldpath) {
      // 如果新的路径是三级路径以上，则不进行加入
      // if(/^(\/[^/]*){1,3}$/.test(newpath.fullPath)){
      this.addViewTags()
      this.moveToCurrentTag()
      // }
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
    // 用来替换当前路由
    // 调用方式类似：
    // this.eventBus.$emit('replaceCurrentView', '/operation/order/transfer')
    this.eventBus.$on('replaceCurrentView', (route) => {
      const lastRoute = this.$route
      route = typeof route === 'string' ? { 'path': route } : route
      this.$router.replace(route, () => {
        this.$store.dispatch('delVisitedViews', lastRoute)
      })
    })
    // 关闭当前路由
    const _this = this
    this.eventBus.$on('closeCurrentView', (route) => {
      console.log('closeCurrent:', _this.selectedTag)
      _this.closeSelectedTag(_this.selectedTag)
    })
  },
  methods: {
    generateTitle(title) {
      return title
    },
    // 判断是否为非首页
    generateRoute() {
      if (this.$route.name && this.$route.name !== '首页') {
        return this.$route
      }
      return false
    },
    isActive(route, isMenu) {
      // if(route.path === this.$route.path || route.name === this.$route.name){

      // if((route.fullPath === this.$route.fullPath) || (route.name === this.$route.name)){
      // 如果是tab，则只判断全路径
      const ison = route.tab ? (route.fullPath === this.$route.fullPath) : (route.path === this.$route.path)
      if (ison) {
        this.selectedTag = route
        return true
      } else {
        return false
      }
    },
    addViewTags() {
      const route = this.generateRoute()

      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      // 针对首页特殊处理
      if (this.$route.path == this.indexTag.path) {
        this.moveToTarget(this.$refs.tagIndex.$el)
        return
      }
      // 因为首页为固定标签，所以初始页面时，this.$refs.tag还未传入任何值，为undefined，需要给个默认的值 []
      const tags = this.$refs.tag ? Array.isArray(this.$refs.tag) ? this.$refs.tag : [this.$refs.tag] : []

      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.fullPath === this.$route.fullPath) {
            this.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.fullPath)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    refreshSelectedTag(tag) {
      this.$parent.refreshKey()
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.fullPath)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e, hideClose) {
      this.visible = true
      this.selectedTag = tag
      this.hideCloseCurrentMenu = !!hideClose
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      // console.log($target,$containerWidth,$targetLeft,$targetWidth)

      if ($targetLeft <= -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
 @import "src/styles/variate.scss";

.tags-view-container {
  position: absolute;
  height: $tabsHeight + 1px;
  top: $topNavHeight;
  background: #e6e6e6;
  z-index: 999;
  
  left: 0;
  width: 100%;

  .tags-view-scroll{
    .scroll-wrapper{
      
    }
  }
  .tags-view-more{
    width: 50px;
    height: $tabsHeight;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    background: #E6E6E6;

    .el-icon-arrow-down{
      cursor: pointer;
      line-height: $tabsHeight;
    }

    &:hover{
      background: #eee;

      .contextmenu-box{
        display: block;
      }
    }
  }

  .tags-view-wrapper {
    height: $tabsHeight + 1px;
    
    font-size: 0;
    
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: $tabsHeight;
      line-height: $tabsHeight;
      border-right: 2px solid #b8b8b8;
      color: #495060;
      background: #e6e6e6;
      padding: 0 30px;
      font-size: 14px;
      &:first-of-type {
        margin-left: 0;
      }
      &.active {
        background-color: #fff;
        color: #666;
        position: relative;
        height: $tabsHeight + 1px;
      }
    }
  }
  .contextmenu-box{
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    border-radius: 4px;
    padding: 2px 0;
    box-shadow: 0px 0px 3px 0 rgba(0, 0, 0, .3);

    position: absolute;
    right: 2px;
    top: $tabsHeight + 1px;

    display: none;

    .el-icon-check{
      font-size: 6px;
      position: absolute;
      top: 9px;
      left: 5px;
      display: none;
    }
    .active-menu{
      color: #2887e0;

      .el-icon-check{
        display: block;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    list-style-type: none;
    padding: 5px 0;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 400;
    color: #333;
    li {
      margin: 0;
      padding: 7px 25px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #eee;
      }
    }
    
  }
  .menu-line{
    padding: 0;
    height: 1px;
    background: #eee;
  }
  .contextmenu-list{
    max-height: 350px;
    overflow: auto;
  }
}

//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    &.active:hover{
      .el-icon-refresh{
        display: block;
      }
    }
    &:hover{
      .el-icon-close {
        color: #f00;
        font-weight: bold;
      }
    }
    .el-icon-refresh{
      position: absolute;
      top: 8px;
      left: 10px;
      display: none;

      &:hover{
        color: #2887e0;
        font-weight: bold;
      }
    }
    .el-icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      margin-left: 10px;
      border-radius: 50%;
      text-align: center;
      font-size: 12px;
    }
  }
}
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  &:after{
      content:'';
      width: 100%;
      height: 1px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #DCDCDC;
    }

  .scroll-wrapper {
    position: absolute;
    z-index: 2;
    height: $tabsHeight;
  }
}
</style>
