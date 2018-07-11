<template>
  <el-dialog title="表格设置" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog">
    <div class="tableSetup_warp">
      <!-- 左边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft.label" @change="handChangeAllLeft">隐藏列 {{leftCheckLen}} / {{leftListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchLeft" :fetch-suggestions="querySearchLeft" placeholder="请输入内容" @select="handleSearchLeft" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <span>{{ item.label }}</span>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListLeft" @change="handleCheckChangeLeft">
            <transition-group name="el-zoom-in-center" :key="listKey">
              <div class="tableSetup_item" v-for="(column, index) in columnData" :key="index" @dblclick="dbCheckItemLeft(column, index, $event)">
                <el-checkbox :label="column">
                  {{column.label}}
                </el-checkbox>
              </div>
            </transition-group>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>双击，可快速左右切换。</span>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="tableSetup_btn">
        <el-button type="primary" icon="el-icon-arrow-right" @click="doAction('goRight')"></el-button>
        <br>
        <el-button type="primary" icon="el-icon-arrow-left" @click="doAction('goLeft')"></el-button>
      </div>
      <!-- 右边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <el-checkbox :indeterminate="isIndeterminateRight" v-model="checkAllRight" @change="handChangeAllRight">显示列 {{rightCheckLen}} / {{rightListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchRight" :fetch-suggestions="querySearchRight" placeholder="请输入内容" @select="handleSearchRight" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <span>{{ item.label }}</span>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListRight" @change="handleCheckChangeRight">
            <draggable :move="canDragStart" :list="showColumnData" class="dragArea">
              <transition-group name="el-zoom-in-center">
                <div class="tableSetup_item" v-for="(column, index) in showColumnData" :key="index" @dblclick="dbCheckItemRight(column, index, $event)">
                  <el-checkbox :label="column">
                    {{column.label}}
                  </el-checkbox>
                  <el-switch v-model="column.fixed" :active-text="column.fixed?'固定':'活动'" @change="handleSwitch(column)"></el-switch>
                </div>
              </transition-group>
            </draggable>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>拖拽，可调整上下顺序。</span>
          <br><span>列表最多只能显示50个字段。</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    issender: {
      type: Boolean,
      dafault: false
    },
    columns: {
      type: Array,
      default: []
    }
  },
  components: {
    draggable
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  data() {
    const generateData = _ => { // 初始化左边列表
      const data = []
      if (this.columns.length > 0) {
        this.columns.forEach((e, index) => {
          if (!e.fixed) { // 除去固定列
            data.push({
              label: e.label,
              key: index,
              fixed: e.fixed,
              prop: e.prop,
              width: e.width,
              slot: e.slot
            })
          }
        })
      }
      return data
    }
    const generateRightData = _ => { // 初始化右边的列表
      const data = []
      if (this.columns.length > 0) {
        this.columns.forEach((e, index) => {
          if (e.fixed) { // 选择固定列
            data.push({
              label: e.label,
              key: index,
              fixed: e.fixed,
              prop: e.prop,
              slot: e.slot
            })
          }
        })
      }
      return data
    }
    const getleftListLen = _ => { // 计算左边列表的长度
      let count = 0
      this.columns.forEach(e => {
        if (!e.fixed) {
          count++
        }
      })
      return count
    }
    const getRightListLen = _ => { // 计算右边列表的长度
      let count = 0
      this.columns.forEach(e => {
        if (e.fixed) {
          count++
        }
      })
      return count
    }
    return {
      orgColumnData: generateData(),
      columnData: generateData(),
      orgShowColumnData: generateRightData(),
      showColumnData: generateRightData(),
      list: [],
      rightList: [],
      listKey: 0,
      isIndeterminateLeft: true,
      isIndeterminateRight: true,
      checkAllLeft: false,
      checkAllRight: false,
      checkListLeft: [],
      checkListRight: [],
      searchLeft: '',
      searchRight: '',
      leftListLen: getleftListLen(),
      rightListLen: getRightListLen(),
      isCheck: true, // false-不可选择 true-可以选择,
      maxLen: 50,
      rightCheckLen: 0,
      leftCheckLen: 0
    }
  },
  methods: {
    sort(array) { // 从小到大排序
      return array.sort((a, b) => {
        return a.key - b.key
      })
    },
    doAction(type) {
      switch (type) {
        case 'goRight':
          this.goRight()
          break
        case 'goLeft':
          this.goLeft()
          break
      }
    },
    checkRightLen() { // 判断右边列表是否超过50个字段
      if (this.showColumnData.length > 50) {
        this.$message({ type: 'warning', message: '列表最多只能显示50个字段。' })
        this.isCheck = true
      } else {
        this.isCheck = false
      }
    },
    canDragStart(list) {},
    setColumnLen() { // 更新数据
      this.leftListLen = this.columnData.length
      this.rightListLen = this.showColumnData.length
      this.orgShowColumnData = objectMerge2([], this.showColumnData)
      this.orgColumnData = objectMerge2([], this.columnData)
    },
    handChangeAllLeft(val) { // 左边列表全选
      this.checkListLeft = val ? Object.assign([], this.columnData) : []
      this.isIndeterminate = false
    },
    handChangeAllRight(val) { // 右边列表全选
      this.checkListRight = val ? Object.assign([], this.showColumnData) : []
      this.isIndeterminate = false
    },
    goRight() { // 将隐藏列勾选的项转移到显示列（左边->右边）
      if (this.checkListLeft.length + this.rightListLen > this.maxLen || this.rightListLen > this.maxLen - 1) {
        this.$message({ type: 'warning', message: '列表最多只能显示50个字段。' })
        return false
      }
      this.columnData = this.columnData.filter(el => {
        if (this.checkListLeft.indexOf(el) === -1) {
          return true
        } else {
          this.showColumnData.push(el)
          return false
        }
      })
      this.checkListLeft = [] // 清空左边勾选列表
      this.setColumnLen()
      this.leftCheckLen = 0
    },
    goLeft() { // 将显示列勾选的项转移到隐藏列（右边->左边）
      this.checkListRight.forEach((e, index) => {
        this.columnData.push(e) // 将右边勾选的数据项返回到左边
        let item = this.showColumnData.indexOf(e)
        if (item !== -1) { // 源数据减去被穿梭的数据
          this.showColumnData.splice(item, 1)
        }
      })
      this.sort(this.columnData)
      this.checkListRight = [] // 清空右边勾选列表
      this.setColumnLen()
      this.rightCheckLen = 0
    },
    dbCheckItemLeft(row, index, event) { // 双击-左边列表选择项（左边->右边）
      if (this.rightListLen > this.maxLen - 1) {
        this.$message({ type: 'warning', message: '列表最多只能显示50个字段。' })
        return false
      }
      this.showColumnData.push(row)
      this.columnData.splice(index, 1)
      this.setColumnLen()
    },
    dbCheckItemRight(row, index, event) { // 双击-右边列表选择项（右边->左边）
      this.columnData.push(row)
      this.showColumnData.splice(index, 1)
      this.setColumnLen()
      this.sort(this.columnData)
    },
    handleCheckChangeLeft(val) { // 勾选左边列表项
      this.leftCheckLen = val.length
    },
    handleCheckChangeRight(val) { // 勾选右边列表项
      this.rightCheckLen = val.length
    },
    querySearchLeft(queryString, cb) {
      this.searchLeft = queryString
      if (queryString.label === undefined) {
        if (!this.searchLeft) { // 如果搜索框为空则恢复左边列表
          this.columnData = objectMerge2([], this.orgColumnData)
        }
      }
      let col = this.orgColumnData
      let results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchRight(queryString, cb) {
      this.searchRight = queryString
      if (queryString.label === undefined) {
        if (!this.searchRight) { // 如果搜索框为空则恢复右边列表
          this.showColumnData = objectMerge2([], this.orgShowColumnData)
        }
      }
      let col = this.orgShowColumnData
      let results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (data) => {
        return (data.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSearchLeft(val) { // 左边选择操作
      this.searchLeft = val ? val.label : ''
      let array = Object.assign([], this.columnData)
      array.forEach(e => {
        if (e.label === this.searchLeft) {
          array = []
          array.push(e)
        }
      })
      this.columnData = Object.assign([], array)
      array = []
    },
    handleSearchRight(val) { // 右边选择操作
      this.searchRight = val ? val.label : ''
      let array = Object.assign([], this.showColumnData)
      array.forEach(e => {
        if (e.label === this.searchRight) {
          array = []
          array.push(e)
        }
      })
      this.showColumnData = Object.assign([], array)
      array = []
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    handleChange(value, direction, movedKeys) {
      this.rightList = objectMerge2([], value)
    },
    handleSwitch(obj) {},
    submitForm(formName) {
      let data = Object.assign([], this.showColumnData)
      console.log(data)
      this.$emit('success', data)
      this.listKey = Math.random()
      this.closeMe()
    }
  }
}

</script>
<style lang="scss">
.tms_dialog {
  .el-dialog {
    min-width: 600px;
  }
}

.tableSetup_warp {
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;

  .tableSetup_list {
    position: relative;
    height: 500px;
    width: 40%;
    min-width: 250px;
    border: 1px solid #eee;
    text-align: left;
    .tableSetup_item {
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px;
      .el-checkbox {}
      .el-switch {
        position: absolute;
        right: 30px;
        .el-switch__core {
          width: 63px !important;
        }
        .el-switch__label * {
          font-size: 10px;
        }
        .el-switch__label--right {
          margin-left: -44px;
          color: #fff;
          z-index: 2;
        }
      }
    }
    .tableSetup_item:hover {
      background-color: #eee;
    }

    .tableSetup_head {
      background-color: #eee;
      padding: 10px 10px 5px 10px;
      box-shadow: 1px 3px 10px #eee;
    }
    .tableSetup_content {
      overflow: auto;
      height: 383px;
    }
    .tableSetup_tips {
      padding: 10px;
      color: #999;
      box-shadow: -1px -3px 10px #eee;
    }
  }
  .tableSetup_btn {
    display: flex;
    flex-direction: column;
    margin-top: 15vh;
  }
  .sortable-ghost {
    border: 1px dashed #f00;
    background: #ffe;
  }
}

</style>
