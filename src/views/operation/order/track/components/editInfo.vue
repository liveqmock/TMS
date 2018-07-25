<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="content_head">
        批次号： {{info.batchNo}}
      </div>
      <div class="editInfoPop_content">
        <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
          <el-tab-pane label="批次详情" name="first">
            <Detail :info="info" :isShow="popVisible" class="animated fadeInRight"></Detail>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="info_box" v-loading="loading">
              <el-row class="stepItem_title">
                <el-col :span="5" class="tracktype">类型</el-col>
                <el-col :span="4">操作时间</el-col>
                <el-col :span="3">操作网点</el-col>
                <el-col :span="2">操作人</el-col>
                <el-col :span="6">操作信息</el-col>
              </el-row>
              <div class="stepinfo">
                <el-steps direction="vertical">
                  <el-step @mouseover.native="setThisActive" @mouseout.native="offThisActive" v-for="(item, index) in trackDetail" :key="index">
                    <span slot="icon" class="location"></span>
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="5">
                          <span class="typebox">{{item.loadStatus}}</span>
                          <template v-if="item.addStatus===1">
                            <span title="编辑" @click="editItem(item)" class="modifybtn"></span>
                            <span title="删除" @click="deleteTrack(item)" class="deletebtn"></span>
                          </template>
                        </el-col>
                        <el-col :span="4" class="textcenter">
                          <!-- <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p> -->
                          <p>{{item.operatorTime }}</p>
                        </el-col>
                        <el-col :span="3" class="textcenter">
                          <p>{{item.orgName}}</p>
                        </el-col>
                         <el-col :span="4">
                          <p>
                            <i class="track-human" v-if="item.addStatus===1"></i>
                            <i class="icon_blank" v-else></i> {{item.operatorUsername}}
                          </p>
                        </el-col>
                        <el-col :span="8">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <el-step>
                    <span slot="icon" class="location"></span>
                  </el-step>
                </el-steps>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <div slot="footer" class="stepinfo-footer stepFrom" v-if="isFootEdit">
      <el-form inline :model="formModel" :rules="ruleForm" ref="formModel">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model.trim="formModel.operatorTime" value-format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
          <transition name="el-zoom-in-center">
            <el-button v-if="isModify" type="warning" @click="resetForm()" size="mini">取 消</el-button>
          </transition>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-else="isFootEdit">
      <el-button @click="closeMe">关闭</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
import Detail from './detail'
import { objectMerge2, parseTime, closest } from '@/utils/'
import { getSystemTime } from '@/api/common'
export default {
  components: {
    popRight,
    Detail
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    id: {
      type: [Number, String]
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      popTitle: '在途跟踪',
      loading: false,
      isModify: false,
      infoId: {},
      trackDetail: [],
      activeName: 'first',
      formModel: {},
      ruleForm: {
        loadStatus: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorTime: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorInfo: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      isShowBtn: true,
      isFootEdit: false,
      formModel: {
        addStatus: 1,
        id: 0,
        loadId: 0,
        loadStatus: '',
        operatorInfo: '',
        operatorOrgid: 1,
        operatorTime: '',
        operatorUserid: 0
      }
    }
  },
  watch: {
    id() {},
    info() {},
    popVisible(newVal, oldVal) {
      if (this.popVisible) {
        this.getDetail()
        this.getSystemTime()
      }
    }
  },
  mounted() {
    if (this.popVisible) {
      this.getDetail()
    }
  },
  methods: {
    getSystemTime() { // 获取系统时间
      if (!this.formModel.id) {
        getSystemTime().then(data => {
          this.formModel.operatorTime = parseTime(data.trim())
        })
          .catch(error => {
            this.$message({ type: 'error', message: '获取系统时间失败' })
          })
      }
    },
    submitForm(formName) { // 底部表单提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModel.id) {
            this.$confirm('此操作将修改跟踪信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.editTrack()
            })
          } else {
            this.$confirm('此操作将添加跟踪信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.addTrack()
            })
          }
        }
      })
    },
    getDetail() {
      const id = this.id
      return getLoadDetail(id).then(data => {
        this.trackDetail = objectMerge2([], data)
      })
    },
    closeMe(done) { // 关闭右边弹出框
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) { // 删除一条跟踪信息
      this.$confirm('此操作将删除本跟踪信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteTrack(item.id).then(data => {
          this.$message({ type: 'success', message: '删除成功' })
          this.getDetail()
          this.resetForm()
        })
          .catch(error => {
            this.$message({ type: 'success', message: '删除失败' })
          })
      })
    },
    editItem(item) {
      this.formModel = objectMerge2({}, item)
      this.isModify = true
    },
    editTrack() { // 修改跟踪信息
      console.log('修改', this.formModel)
      this.formModel.transferId = 0
      this.formModel.operatorTime = parseTime(this.formModel.operatorTime)
      return putUpdateTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    addTrack() { // 添加跟踪信息
      console.log('添加')
      this.formModel.loadId = this.id
      return postAddTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    handleClick() { // 底部按钮区显示
      if (this.activeName === 'second') {
        this.isFootEdit = true
        // this.getSystemTime()
      } else {
        this.isFootEdit = false
      }
    },
    resetForm() { // 清空表单及验证
      this.$nextTick(() => {
        this.isModify = false
        this.$refs['formModel'].resetFields()
        this.formModel = this.$options.data().formModel
        // this.getSystemTime()
      })
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
.icon_blank {
  background-size: 15px;
  display: inline-block;
  width: 14px;
  height: 16px;
  vertical-align: middle;
}

.trackInfoPop {
  width: 1000px !important;
}

.content_head {
  background-color: #E9F3FA;
  line-height: 36px;
  height: 36px;
  width: 100%;
  padding: 0 10px;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 34;
}

.editInfoPop_content {
  width: 100%;
  display: flex;
  flex-direction: column;

  .el-tabs__header {
    position: fixed;
    z-index: 34;
    top: 66px;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
  }
}

.info_box {
  margin: 76px 10px 0 10px;
  display: flex;
  flex-direction: column;
  /* 覆盖ele样式 */
  .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .el-step.is-vertical .el-step__head {
    width: 18px;
    position: relative;
    top: 0px;
  }
  .el-step.is-vertical .el-step__line {
    left: 8px;
  }
  .el-step__icon.is-text {
    border-color: transparent;
    border: 0;
    width: 18px;
    height: 18px;
  }
  .el-steps--vertical {
    height: auto;
  }
  .el-step__main {
    padding-bottom: 10px;
  }
  .el-step__description {
    padding-right: 0;
    font-size: 14px;
    color: #333;
  }

  .textcenter {
    text-align: center;
  }
  .typebox {
    background: url("../../../../../assets/png/track-bg.png") no-repeat;
    width: 118px;
    height: 24px;
    padding-left: 16px;
    text-align: center;
    color: #333;
    display: inline-block;
    line-height: 24px;
  }
  .location {
    background: url("../../../../../assets/png/unactive-icon.png") no-repeat;
    width: 18px;
    height: 18px;
    display: inline-block;
  }
  .modifybtn,
  .deletebtn {
    display: inline-block;
    display: none;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 3px;
    background: url("../../../../../assets/png/delete-icon.png") no-repeat;

    &:hover {}
  }
  /* 鼠标划过样式 */
  .trackactive {
    .modifybtn,
    .deletebtn {
      display: inline-block;
    }
    .typebox {
      background: url("../../../../../assets/png/track-active.png") no-repeat;
      color: #fff;
    }
    .location {
      background: url("../../../../../assets/png/active-point.png") no-repeat;
    }
    .el-step__line {
      background-color: #3e9ff1;
    }
  }
  .modifybtn {
    margin-left: 10px;
    background: url("../../../../../assets/png/edit-icon.png") no-repeat;
    margin-right: 8px;
  }
  .steptitle {
    font-size: 14px;
    color: #333;
    height: 34px;
  }
  .stepItem_title {
    color: #333;
    margin-top: 10px;
    padding-left: 34px;
    height: 34px;
    .el-col {
      text-align: center;
    }
    .tracktype {
      text-align: left;
      text-indent: 20px;
    }
  }

  .stepItem {
    /* 解决当出现空值项造成高度为0，使得样式坍塌的异常 */
    .el-col>p {
      min-width: 1px;
      min-height: 1px;
    }
  }
  .stepinfo {
    flex: 1;
    overflow: auto;
  }
  .stepinfo-footer {
    border-top: 1px solid #d8d8d8;
    height: 70px;
    padding-top: 30px;
  }
}

.stepFrom {
  background-color:#f2f2f2;
  box-shadow:-1px -1px 10px #bbb;
  text-align:left;
  padding:0 10px;
  .el-form-item__content{
    vertical-align:middle;
  }
}

.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

</style>
