<template>
  <el-dialog
    title="常用备注"
    class="remarksPopSetup"
    :visible="popVisible"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    append-to-body
    v-loading="loading"
    @open="getRemarkSetup"
    width="300px"
    :before-close="close">
    <div class="dialog-title" slot="title">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="canAdd" circle></el-button>
      常用备注
    </div>
    <div class="setup-info-remark">
      <div class="addNew" v-if="isAdd">
        <el-input size="mini" v-model.trim="newItem" /><el-button size="mini" icon="el-icon-check" @click="addItem" class="add-btn"></el-button><el-button @click="reset" size="mini" icon="el-icon-close" class="delete-btn"></el-button>
      </div>
      <el-checkbox-group v-model="checkList">
      <ul>
        <li v-for="(item, index) in remarksData" :key="index">
          <div class="remarks-edit" >
            <!-- 勾选展示框 -->
            <el-checkbox :label="item.value" v-if="!item.isedit"><span @dblclick.prevent.stop="doPost([item.value])" class="remark-info">{{ item.value }}</span></el-checkbox>
            <!-- 输入编辑框 -->
            <el-input size="mini" :title="item.value" v-if="item.isedit" :value="item.value" @change="(val)=>{changeItem(item.id, val)}" />
            <!-- 操作按钮 -->
            <el-button size="mini" class="toeditbtn" icon="el-icon-edit" @click="item.isedit = true" v-if="!item.isedit" ></el-button>
            <el-button @click="deleteItem(item.id)" v-if="!item.isedit" size="mini" icon="el-icon-delete" class="toeditbtn"></el-button>
            <!-- 编辑操作按钮框 -->
            <el-button size="mini" v-if="item.isedit" icon="el-icon-check" @click="modifyItem(item.id)" class="add-btn"></el-button>
            <el-button @click="item.isedit = false" v-if="item.isedit" size="mini" icon="el-icon-close" class="delete-btn"></el-button>
          </div>
        </li>
      </ul>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      
      <el-button size="mini" type="info"  @click="close">取 消</el-button>
      <el-button size="mini" type="primary" :disabled="!checkList.length" @click="doPost(checkList)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from '@/api/operation/orderManage'

export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 搜索项不参与拖拉排序
    searchList() {
      if (this.query) {
        return this.remarksData.filter(el => {
          return el.name.indexOf(this.query) !== -1
        })
      } else {
        return []
      }
    }
  },
  data() {
    return {
      remarksData: [],
      // 用来搜索项
      query: '',
      loading: false,
      isedit: false,
      newItem: '',
      modifyObj: {},
      isAdd: false,
      checkList: []
    }
  },
  methods: {
    close(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    reset() {
      if (this.isedit) {
        this.getRemarkSetup()
      }
      this.isedit = false
      this.isAdd = false
      this.newItem = ''
      this.checkList = []
    },
    // 新增
    addItem(val) {
      if (this.newItem !== '') {
        OrderApi.postRemark({
          type: 3,
          userId: this.otherinfo.id,
          value: this.newItem
        }).then(res => {
          this.newItem = ''
          this.$message.success('添加成功~')
          this.getRemarkSetup()
        }).catch(err => {
          this.$message.error('出错了：' + err.text)
        })
      } else {
        this.$message.warning('请先填写内容~')
      }
    },
     // 修改
    changeItem(id, val) {
      this.modifyObj[id] = val
    },
    modifyItem(id) {
      if (this.modifyObj[id]) {
        OrderApi.putRemark(id, {
          value: this.modifyObj[id]
        }).then(res => {
          this.$message.success('修改成功')
        }).catch(err => {
          this.$message.error('修改失败：' + err.text)
        })
      } else {
        this.$message.warning('不能修改为空！')
      }
    },
    // 删除
    deleteItem(id) {
      this.$confirm('确定要删除id: ' + id + ' 这条吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrderApi.deleteRemark(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRemarkSetup()
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '删除失败，原因：' + (err.text ? err.text : err)
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 当打开设置窗口时，从后台获取最新的设置
    getRemarkSetup() {
      this.loading = true
      return OrderApi.getRemarkList().then(res => {
        this.remarksData = res.list.map(el => {
          el.ischeck = false
          el.isedit = false
          return el
        })
        res.list.forEach(el => {
          this.modifyObj[el.id] = el.value
        })
        this.loading = false
      })
    },
    doPost(item) {
      this.$emit('success', item.join(','))
      this.close()
    },
    canEdit() {
      this.isedit = true
      this.isAdd = false
    },
    canAdd() {
      this.isAdd = true
      this.isedit = false
    }
  }
}
</script>
<style lang="scss">
.remarksPopSetup{
  .el-dialog__header, .el-dialog__footer{
    background: #eee;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 10px 0 20px;
    position: relative;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .dialog-title{
    .el-button{
      padding: 2px;
    }
  }
  .el-input{
    width: 180px;
    .el-input__inner{
      border-color: #cce1f9;
    }
  }
  .el-button+.el-button{
    margin-left: 5px;
  }
  .el-button{
    margin-left: 5px;
    i{
      font-weight: bold;
    }
  }
  .remarks-edit{
    padding-left: 10px;
  }
  .add-btn{
    color: #3b95ee;
    border: 1px solid #3b95ee;
  }
  .delete-btn{
    color: #f00;
    border: 1px solid #f00;
  }
  .setup-info-remark{
    height: 258px;
    overflow: auto;

    li{
      .toeditbtn{
        display: none;
      }
      &:hover .toeditbtn{
        display: inline-block;
      }
      border-bottom: 1px solid #ccc;
      line-height: 30px;
    }

    .el-checkbox__label{
      vertical-align: middle;
      display: inline-block;
      width: 166px;
      color:#666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

