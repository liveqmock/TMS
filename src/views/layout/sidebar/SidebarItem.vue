<template>
    <ul class="sidebar-menu" ref="sidebarMenu" @click.stop="showTab">
      <li
        class="menu-item"
        v-for="(route, index) in routes"
        :key="index"
        v-if="!route.hidden"
        :class="{'is-active': route.path === $route.path}" 
        ref="sidebaritem"
        >
        <!-- 有子菜单但不展示 && 没有子菜单 -->
        <router-link v-if="isFolder(route) ? route.noDropdown : (!route.tab && true)" :to="route.path" :key="route.name" >
          <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
        </router-link>
        <!-- 带子菜单展示 -->
        <template v-if="isFolder(route)">
          <span class="sidebar_menu_toggle" @mouseover="showSubNav" @mouseout="hideSubNav"  @click.stop="toggle($event)" >
            <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
            <i class="el-icon-caret-bottom dropdownIcon" ></i>
           </span>
           <ul class='sidebar-submenu' @click.stop>
            <!-- 暂时只展开二级菜单 -->
            <li v-for="(item, index) in route.children"
              v-if="!item.hidden"
              :key="index"
              :class="{'is-active': item.path === $route.path}"
              class="submenu-item">
              <router-link :to="item.path" :index="item.path" :key="item.name">
                <!-- <icon-svg v-if='item.icon' :icon-class="item.icon" />  --><span class="sidebar-nav-title">{{ item.meta.title }}</span>
              </router-link>
            </li>
          </ul>
        </template>
        <!-- 带tab菜单展示 -->
        <template v-if="route.tab">
          <span class="sidebar_menu_toggle"  @click.stop="toggle($event)" >
            <icon-svg v-if='route.icon' :icon-class="route.icon" /> <span class="sidebar-nav-title">{{ !sidebar.opened ? (route.meta.stitle||route.meta.title) : route.meta.title}}</span>
            <i class="el-icon-caret-bottom dropdownIcon" ></i>
           </span>
           <ul class='sidebar-submenu' @click.stop>
            <!-- 暂时只展开二级菜单 -->
            <li v-for="(item, index) in route.tab"
              v-if="!item.hidden"
              :key="index"
              :path="item.path"
              :class="{'is-active': item.path === $route.path}"
              class="submenu-item submenu-item-tab">
                <!-- <icon-svg v-if='item.icon' :icon-class="item.icon" />  --><span class="sidebar-nav-title">{{ item.meta.title }}</span>
            </li>
          </ul>
        </template>  
      </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import { closest } from '@/utils/index'
import { eventBus } from '@/eventBus'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data () {
    return {
      open: true
    }
  },
  methods: {
    isFolder (item) {
      return item.children && item.children.length
    },
    removeOtherOpenFolder () {
      let childRef = Array.isArray(this.$refs.sidebarMenuItem) ? this.$refs.sidebarMenuItem : [this.$refs.sidebarMenuItem]
      childRef.map( el =>{
        if(el.isFolder && el.open){
          el.open = false
        }
      })
    },
    isOpen (route) {
      return true
    },
    toggle (event) {
      const el = closest(event.target, 'li')
      el.classList.toggle('isOpen')
    },
    setSubNav(type, event){
      let parentEle = document.querySelector('.sidebar-menu')
      let isHide = document.querySelector('.hideSidebar') ? true : false
      let showBox = document.querySelector('.subNavWrapper')

      if(type === 'show'){
        if(isHide){
          let el = closest(event.target, 'li.menu-item')
          let ul = el ? el.querySelector('.sidebar-submenu') : ''

          if(ul){
            showBox.innerHTML = ''
            showBox.appendChild(ul.cloneNode(true))
            let elHeight = showBox.offsetHeight
            let winHeight = window.innerHeight
            let parentY = el.offsetTop + parentEle.offsetTop - parentEle.scrollTop
            // 50 为顶部导航的高度
            // 保证底端对齐
            // 当子菜单为超长时，需要设置滚动条显示
            if((parentY + elHeight + 50) > winHeight){
              parentY = winHeight - elHeight - 50
            }
            showBox.style.display = "block"
            showBox.style.top = parentY + 'px'
          }
          
        }
      } else {
        showBox.innerHTML = ''
      }
    },
    clearTimer () {
      clearTimeout(this.subMenuTimer)
    },
    showSubNav (event) {
      this.clearTimer()
      this.setSubNav('show', event)  
    },
    hideSubNav (event) {
      this.clearTimer()
      this.subMenuTimer = setTimeout(() => {
        this.setSubNav('hide')   
      }, 200);
    },
    showTab (event) {
      let el = closest(event.target, 'li.submenu-item-tab')
      
      if(el){
        eventBus.$emit('changeTab', el.path)        
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";
$backgroundColor: #333744;
$hoverBackgroundColor: #00c1de;
$sidebarBackgroundColor: #42485b;

.sidebar-menu{
  color: rgba(255, 255, 255, 0.8);
  &>.menu-item,&>.sidebar-submenu{
    background: $sidebarBackgroundColor;
  }
  &>.menu-item>a{
    padding-left: 24px;
  }
  .sidebar-submenu{
    display: none;
  }

  a{
    display: block;
  }

  .isOpen>.sidebar-submenu{
    display: block;
  }

  .menu-item{
    height: 40px;
    line-height: 40px;
    font-size: $sidebarFontSize;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    transition: height .4s ease;
  }
  .isOpen{
    height: auto;
    .dropdownIcon{
      transform-origin: center center;
      transform: rotate(180deg);
    }
  }

  .sidebar-nav-title{
    display: inline-block;
  }

  .sidebar-submenu .submenu-item{
    min-width: 100%;
    padding-left: $sidebarFontSize * 1.2 + 34px;
    font-size: $sidebarFontSize - 2px;
  }

  &>.is-active{
    background: $hoverBackgroundColor;

    .is-active{
      border: none;
    }
  }

   &>.isOpen{
    background: $backgroundColor;

    .is-active{
      border: none;
    }
  }

  .is-active{
    &>a {
      color: #fff;
    }
  }

  .sidebar_menu_toggle, .submenu-item-tab{
    cursor: pointer;
    display: block;
    padding-left: 24px;
  }

  .menu-item:focus, .menu-item:hover,.sidebar_menu_toggle:hover, .sidebar-submenu .submenu-item:hover, .submenu-item.is-active{
    background: $hoverBackgroundColor;
  }

  &>.isOpen:hover{
    background: $backgroundColor;

    .is-active{
      border: none;
    }
  }

  .svg-icon {
    margin-right: 6px;
    font-size: 1.2em;
    color: #fff;
  }
  .dropdownIcon{
    position: absolute;
    top: 12px;
    right: 5px;
    cursor: pointer;
    transition: transform .6s ease;
  }
}
/** 收缩边栏时的样式 **/
.hideSidebar{
  .sidebar-menu{
    position: relative;
    z-index: 99;
    .sidebar_menu_toggle{
      text-align: center;
    }
    .menu-item{
      padding-top: 5px;
      padding-bottom: 25px;
      height: auto;
      font-size: 12px;
      min-height: 40px;
      margin-bottom: 0px;

      &>a>.sidebar-nav-title{
        line-height: 20px;
        min-height: auto;
      }
    }
    .isOpen{
      &:hover{
        background: $hoverBackgroundColor;
      }
      .sidebar-submenu{
        display: none;
      }
    }
    .menu-item:hover{
      .sidebar-submenu{
        background: $sidebarBackgroundColor;
        display: none;
      }
    }
    .svg-icon{
      margin-left: -4px;
    }
    .sidebar-submenu{
      display: none;
    }
    
    .el-menu--popup{
      background: $sidebarBackgroundColor;
    }
    .el-submenu__icon-arrow{
      display: none;
    }

    a:hover{
      color: #3e9ff1;
    }

    .dropdownIcon{
      display: none;
    }

    .menu-item>a>.sidebar-nav-title,.sidebar_menu_toggle .sidebar-nav-title{
      position: absolute;
      left: 0;
      width: 100%;
      top: 20px;
      text-align: center;
      line-height: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-menu-item, .sidebar-nav-title{
      min-height: 44px;
      height: auto;
    }
    .el-submenu{
      min-width: auto;
    }
    
  }
  
  .sidebar-submenu{
    width: 130px;
    background: $sidebarBackgroundColor;

    .submenu-item{
      line-height: 40px;
      color: #fff;
      font-size: 12px;

      a{
        display: block;
        padding-left: 34px;
      }
      &.is-active, &:hover{
        background: $hoverBackgroundColor;
      }
    }
  }
}

</style>

