<template>
  <div class="setpinfo_box" v-loading="loading">
    <h3 class="steptitle">物流信息</h3>
    <el-row class="stepItem_title">
      <el-col :span="5" class="tracktype" >类型</el-col>
      <el-col :span="4" >操作时间</el-col>
      <el-col :span="3">操作网点</el-col>
      <el-col :span="6">操作信息</el-col>
      <el-col :span="6">操作明细</el-col>
    </el-row>
    <div class="stepinfo">
      <el-steps direction="vertical">
      <el-step @mouseover.native="setThisActive" @mouseout.native="offThisActive" v-for="(item, index) in trackDetail" :key="index">
        <span slot="icon" class="location" ></span>
        <template slot="description">
          <el-row class="stepItem">
            <el-col :span="5">
              <span class="typebox">{{item.trackNode}}</span>
              <template v-if="item.trackType===1">
                <span title="编辑" @click="editItem(item)" class="modifybtn"></span>
                <span title="删除" @click="deleteTrack(item)" class="deletebtn"></span>
              </template>
            </el-col>
            <el-col :span="4" class="textcenter">
              <p>{{item.createTime | parseTime }}</p>
            </el-col>
            <el-col :span="3" class="textcenter">
              <p>{{item.orgName}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{item.trackInfo}}</p>
            </el-col>
            <el-col :span="5" :offset="1">
              <p>
                <span class="track-human"  v-if="item.trackType===1" ></span>
                 {{item.trackDetailed}}
              </p>
            </el-col>
          </el-row>
        </template>
      </el-step>
      <el-step>
        <span slot="icon" class="location" ></span>
      </el-step>
    </el-steps>
    </div>
    <div class="stepinfo-footer">
      <el-form inline :model="formModel" :rules="ruleForm" ref="formModel" label-width="80px">
        <el-form-item label="类型" prop="trackNode">
          <el-input v-model="formModel.trackNode" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="createTime">
          <el-date-picker v-model.trim="formModel.createTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="trackInfo">
          <el-input v-model="formModel.trackInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm()" size="mini">保 存</el-button>
          <el-button v-if="isModify" type="warning" @click="reset()" size="mini">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'
import { closest, objectMerge2, parseTime } from '@/utils/'

export default {
  props: {
    orderid: [String, Number]
  },
  data() {
    return {
      loading: false,
      trackDetail: [],
      isModify: false,
      nowTime: new Date(),
      ruleForm: {
        trackNode: [{ required: true, trigger: 'blur', message: '不能为空' }],
        createTime: [{ required: true, trigger: 'blur', message: '不能为空' }],
        trackInfo: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      formModel: {
        'createTime': '',
        // 修改时需要带上
        // "id": 0,
        'orgid': '',
        'shipId': '',
        'trackDetailed': '',
        'trackInfo': '',
        'trackNode': '',
        'trackType': ''
      }
    }
  },
  watch: {
    orderid(newVal) {
      if (newVal !== '') {
        this.init()
      } else {
        this.reset()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.reset()
      this.loading = true
      return Promise.all([
        this.getSystemTime(),
        this.getDetail()
      ]).then(res => {
        this.formModel.createTime = this.nowTime
        this.loading = false
      }).catch(err => {
        this.$message.error('数据加载错误： ' + err.text)
      })
    },
    // 获取系统时间
    getSystemTime() {
      return orderManage.getCreateOrderDate().then(data => {
        this.nowTime = new Date(data)
        return data
      })
    },
    // 获取跟踪信息
    getDetail() {
      return orderManage.getShipTrackinfo(this.orderid).then(data => {
        this.trackDetail = data
        return data
      })
    },
    // 删除跟踪信息
    deleteTrack(item) {
      const data = item.id
      this.$confirm('此操作将删除跟踪信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderManage.deleteTrackinfo(data).then(res => {
          this.$message.success('删除成功')
          this.getDetail()
        }).catch(err => {
          this.$message.error('删除失败，原因：' + err.text)
        })
      })
    },
    // 编辑跟踪信息
    editItem(item) {
      this.isModify = true
      this.itemid = item.id
      for (const i in this.formModel) {
        this.formModel[i] = item[i]
      }
    },
    // 提交跟踪信息
    submitForm() {
      this.$refs['formModel'].validate((valid) => {
        if (valid) {
          const data = objectMerge2({}, this.formModel)
          data.createTime = +new Date(data.createTime)
          let promObj
          if (!this.isModify) {
            promObj = orderManage.postTrackinfo(data)
          } else {
            data.id = this.itemid
            promObj = orderManage.putTrackinfo(data)
          }

          promObj.then(res => {
            this.$message.success('操作成功')
            this.reset()
            this.getDetail()
          }).catch(err => {
            this.$message.error('操作失败，原因：' + err.text)
          })
        }
      })
    },
    // 重置表单
    reset() {
      this.$refs['formModel'].resetFields()
      this.isModify = false
      this.itemid = ''
      this.formModel.createTime = this.nowTime
      this.formModel.orgid = this.otherinfo.orgid
      this.formModel.shipId = this.orderid
      this.formModel.trackDetailed = ''
      this.formModel.trackInfo = ''
      this.formModel.trackNode = ''
      // 1 表示为用户新增的信息
      this.formModel.trackType = 1
      delete this.formModel.id
    },
    // 取消高亮样式
    offThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.remove('trackactive')
      }
    },
    // 设置高亮样式
    setThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.add('trackactive')
      }
    }
  }
}
</script>
<style lang="scss">
.setpinfo_box{
  display: flex;
  flex-direction: column;
  /* 覆盖ele样式 */
  .el-form--inline .el-form-item{
    margin-bottom: 0;
  }
  .el-step.is-vertical .el-step__head{
    width: 18px;
    position: relative;
    top: 5px;
  }
  .el-step.is-vertical .el-step__line{
    left: 8px;
  }
  .el-step__icon.is-text{
    border-color: transparent;
    border: 0;
    width: 18px;
    height: 18px;
  }
  .el-steps--vertical{
    height: auto;
  }
  .el-step__main{
    padding-bottom: 10px;
  }
  .el-step__description{
      padding-right: 0;
      font-size: 14px;
      color: #333;
    }

  .textcenter{
    text-align: center;
  }
  .typebox{
    background: url("../../../../assets/png/track-bg.png") no-repeat;
    width: 118px;
    height: 24px;
    padding-left: 16px;
    text-align: center;
    color: #333;
    display: inline-block;
    line-height: 24px;
  }
  .location{
    background: url("../../../../assets/png/unactive-icon.png") no-repeat;
    width: 18px;
    height: 18px;
    display: inline-block;
  }
  .modifybtn, .deletebtn{
    display: inline-block;
    display: none;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 3px;
    background: url("../../../../assets/png/delete-icon.png") no-repeat;

    &:hover{
    }
  }
  /* 鼠标划过样式 */
  .trackactive{
    .modifybtn, .deletebtn{
      display: inline-block;
    }
    .typebox{
      background: url("../../../../assets/png/track-active.png") no-repeat;
      color: #fff;
    }
    .location{
    background: url("../../../../assets/png/active-point.png") no-repeat;
    }
    .el-step__line{
      background-color: #3e9ff1;
    }
  }
  .modifybtn{
    margin-left: 30px;
    background: url("../../../../assets/png/edit-icon.png") no-repeat;
    margin-right: 8px;
  }
  .steptitle{
    font-size: 14px;
    color: #333;
    height: 34px;
  }
  .stepItem_title{
    color: #666;
    padding-left: 34px;
    height: 34px;
    .el-col{
      text-align: center;
    }
    .tracktype{
      text-align: left;
      text-indent: 20px;
    }
  }
  
  .stepItem{
    /* 解决当出现空值项造成高度为0，使得样式坍塌的异常 */
    .el-col>p{
      min-width: 1px;
      min-height: 1px;
    }
  }
  .stepinfo{
    flex:1;
    overflow: auto;
  }
  .stepinfo-footer{
    border-top: 1px solid #d8d8d8;
    height: 70px;
    padding-top: 30px;
  }
}
</style>
