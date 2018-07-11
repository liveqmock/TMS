<template>
    <li :class="{'isOpen': open, 'is-active': item.path === $route.path}" @click="toggle" ref="sidebaritem">
      <!-- 有子菜单但不展示 -->
      <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path" :key="item.name" :index="item.path">
        <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.children[0].meta.stitle||item.children[0].meta.title) : item.children[0].meta.title}}</span>
      </router-link>
      <!-- 没有子菜单 -->
      <router-link :to="item.path" v-if="(!item.children || item.children.length===0)" :index="item.path" :key="item.name">
        <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.meta.stitle||item.meta.title) : item.meta.title}}</span>
      </router-link>

      <!-- 包含子菜单展示 -->
      <template v-if="!item.noDropdown&&item.children&&item.children.length">
        <router-link :to="item.path" :key="item.name" >
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (item.children[0].meta.stitle||item.children[0].meta.title) : item.children[0].meta.title}}</span>
          <i :class="{'el-icon-caret-bottom': !open, 'el-icon-caret-top': open}" class="dropdownIcon" ></i>
        </router-link>
        <ul class='sidebar-submenu' v-if="isFolder" @click.stop>
          <!-- <SidebarItemNode
            class="submenu-item"
            v-for="(route, index) in item.children"
            v-if="!route.hidden"
            :key="index"
            @removeOtherOpenFolder="removeOtherOpenFolder"
            :routes="route">
          </SidebarItemNode> -->
          <!-- 暂时只展开二级菜单 -->
          <li v-for="(route, index) in item.children"
            v-if="!route.hidden"
            :key="index"
            :class="{'is-active': route.path === $route.path}"
            class="submenu-item">
            <router-link :to="route.path" v-if="!route.hidden" :index="route.path" :key="route.name">
              <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
            </router-link>
          </li>
        </ul>
      </template>
    </li>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItemNode',
  props: {
    routes: {
      type: Object
    },
    removeOtherOpenFolder: {
      type: Function
    }
  },
  computed: {
    item () {
      return this.routes
    },
    ...mapGetters([
      'sidebar'
    ]),
    isFolder: function () {
      return this.routes.children &&
        this.routes.children.length
    }
  },
  data: function () {
    return {
      open: false
    }
  },
  watch: {
    $route () {
      if(this.isFolder){
        this.setNavHightlight()
      }
    }
  },
  mounted(){
    this.setNavHightlight()
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
      //关闭同级展开的菜单
      this.removeOtherOpenFolder2()
    },
    changeType() {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    removeOtherOpenFolder2 () {
      let thisParentEle = this.$refs.sidebaritem.parentElement
      let otherEle = thisParentEle.querySelector('.isOpen')
      if(otherEle && otherEle !== this.$refs.sidebaritem){
        this.$emit('removeOtherOpenFolder')
      }
    },
    setNavHightlight () {
      let thisEle = this.$refs.sidebaritem
      if(thisEle.querySelector('.is-active')){
        this.open = true
      }
    }
  }
}
</script>
