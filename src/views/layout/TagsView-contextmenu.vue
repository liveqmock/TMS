<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link class="tags-view-item" :class="isActive({path:'/dashboard'})?'active':''" to="/dashboard" @contextmenu.prevent.native="openMenu($el,$event,true)">
        首页
      </router-link>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)"
        :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <div class="contextmenu-box" v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <ul class='contextmenu' >
        <li v-if="!hideCloseCurrentMenu" @click="closeSelectedTag(selectedTag)">关闭</li>
        <li @click="closeOthersTags">关闭其他</li>
        <li @click="closeAllTags">关闭全部</li>
      </ul>
      <div class="menu-line"></div>
      <ul class="contextmenu contextmenu-list">
        <router-link tag="li" to="/dashboard">
          <i :class="isActive({path:'/dashboard'})?'el-icon-check':''"></i>
          首页
        </router-link>
        <router-link tag="li" v-for="tag in Array.from(visitedViews)"
        :to="tag.path" :key="tag.path">
        <i :class="isActive(tag)?'el-icon-check':''"></i>
        {{generateTitle(tag.title)}}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      hideCloseCurrentMenu: false
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
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
  },
  methods: {
    generateTitle (title) {
      return title
    },
    generateRoute() {
      if (this.$route.name && this.$route.name !== '首页') {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
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
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path)
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
      this.left = e.clientX
      this.top = e.clientY
      this.hideCloseCurrentMenu = !!hideClose
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
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
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    .el-icon-check{
      font-size: 6px;
      color: #2887e0;
      position: absolute;
      top: 9px;
      left: 5px;
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
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
