<template>
  <!-- <div class="dep-maintain">
      <PopFrame :title='popTitle' :isShow="popVisible" @close="closeMe" class='addpopDepMain'>
        <template class='addRelationPop-content' slot="content">
           <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <div class="addMark" v-if="isModify">
              <el-form-item label="回收情况" prop="recTypeId" :cols="45">
                <SelectType type="rec_type" v-model="form.recTypeId" />
              </el-form-item>
              <el-form-item label="回收备注" :label-width="formLabelWidth" prop="recRemark">
                <el-input
                  type="textarea"
                  :rows="7"
                  :cols="30"
                  placeholder="最多20个字符"
                  v-model="form.recRemark"
                  auto-complete="off"></el-input>
              </el-form-item>
            </div>   
            <div class="addMark" v-if="isAccept">
              <el-form-item label="接收情况" prop="acceptTypeId" :cols="45">
                <SelectType type="accept_type" v-model="form.acceptTypeId" />
              </el-form-item>
              <el-form-item label="接收备注" :label-width="formLabelWidth" prop="acceptRemark">
                <el-input
                  type="textarea"
                  :rows="7"
                  :cols="30"
                  placeholder="最多20个字符"
                  v-model="form.acceptRemark"
                  auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer-frame">
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn">确定</el-button>
          <el-button @click="closeMe" class="btn">取消</el-button>
        </div>
      </PopFrame>
  </div> -->

   <el-dialog :title='popTitle' @close="closeMe" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="setupTablePop">
     <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <div class="addMark" v-if="isModify">
              <el-form-item label="回收情况" prop="recTypeId" :cols="45">
                <SelectType type="rec_type" v-model="form.recTypeId" />
              </el-form-item>
              <el-form-item label="回收备注" :label-width="formLabelWidth" prop="recRemark">
                <el-input
                  type="textarea"
                  :rows="7"
                  :cols="30"
                  placeholder="最多20个字符"
                  v-model="form.recRemark"
                  auto-complete="off"></el-input>
              </el-form-item>
            </div>   
            <div class="addMark" v-if="isAccept">
              <el-form-item label="接收情况" prop="acceptTypeId" :cols="45">
                <SelectType type="accept_type" v-model="form.acceptTypeId" />
              </el-form-item>
              <el-form-item label="接收备注" :label-width="formLabelWidth" prop="acceptRemark">
                <el-input
                  type="textarea"
                  :rows="7"
                  :cols="30"
                  placeholder="最多20个字符"
                  v-model="form.acceptRemark"
                  auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { putUpdateReceipt } from '@/api/operation/receipt'
// import { REGEX } from '@/utils/validate'
// import { mapGetters } from 'vuex'
// import { exportWithIframe } from '@/utils'
import { objectMerge2 } from '@/utils/index'
export default {
  // computed: {
  // ...mapGetters([
  //     'otherinfo'
  //   ])
  // },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {

      }
    }
  },
  components: {
    PopFrame,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    dotInfo: [Object, Array],
    searchQuery: [Object, Array],
    isDepMain: {
      type: Boolean,
      default: false
    },
    createrId: [Number, String],
    isModify: {
      type: Boolean,
      default: false
    },
    isAccept: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: {
        'pageType': '',
        'recTypeId': 113,
        'recRemark': '',
        'acceptTypeId': 115,
        'acceptRemark': ''
      },
      formLabelWidth: '75px',
      tooltip: false,
      rules: {

      },
      checked1: true,
      popTitle: '',
      loading: false,
      type: ''
    }
  },
  mounted() {

  },
  watch: {
    isDepMain() {

    },
    dotInfo(newVal) {
      this.getMentInfo = this.dotInfo
    },
    searchQuery(newVal) {
      this.form.pageType = this.searchQuery.vo.pageType
      //  console.log(this.form.pageType);
    },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if (this.isModify) {
          this.popTitle = '回单回收'
          this.form.pageType = this.searchQuery.vo.pageType
          console.log(888)
        }
      },
      immediate: true
    },
    isAccept: {
      handler(newVal) {
        if (this.isAccept) {
          this.popTitle = '回单接收'
          this.form.pageType = this.searchQuery.vo.pageType
          console.log(888)
        }
      },
      immediate: true
    },
    createrId(newVal) {
    }

  },
  methods: {
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = objectMerge2({}, this.form)
          data.receiptIds = this.dotInfo
          const promiseObj = putUpdateReceipt(data)
          promiseObj.then(res => {
            this.$message({
              message: '保存成功~',
              type: 'success'

            })
            this.closeMe()
            this.$emit('success')
          }).catch(res => {
            this.$message.warning(res.text)
            this.closeMe()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  // .dep-maintain .addpopDepMain{
  //   top: 29%;
  //   bottom: auto;
  //   min-width: 426px;
  //   max-width:  486px;
  //   .dep-maintain .addRelationPop-content{
  //     margin: 20px 20px 0;
  //     box-sizing: border-box;
  //   }
  //   // .dep-maintain .el-select .el-input__inner{
  //   //   padding-right: 15px;
  //   // }


  //   .popRight-header {
  //     height: 45px;
  //     line-height: 45px;
  //     background-color: #e6e6e6;
  //     color: #333;
  //     text-align: left;
  //     font-weight: 600;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     position: absolute;
  //     border-radius: 6px 0px 0px 0px;
  //     /* padding-left: 22px; */
  //     text-align: center;
      
  //   }
  //   .popRight-header i{
  //     position: absolute;
  //     top: 6px;
  //     right: 9px;
  //     line-height: 30px;
  //     height: 30px;
  //     cursor: pointer;
  //   }
  //   .popRight-content{
  //     width:426px;
  //     height: 308px;
  //   }
  //   .addMark{
  //     margin:50px 38px;
  //     .el-form--inline .el-form-item{
  //       margin-top:10px;
  //     }
  //     .el-input--mini .el-input__inner{
  //         padding-right: 67px;
  //     }
  //   }
  //   .dialog-footer-frame{
  //       text-align: center;
  //       .btn{
  //         width: 107px;
  //         height: 35px;
  //       }
  //   }
  // }
  
 .setupTablePop{
  .el-dialog{
    max-width: 425px;
    min-width: 300px;
  }
  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
  }
  .dialog-footer{
    text-align: center;
  }
  .el-dialog__header{
    text-align: center;
    background: #ddd;
  }
  .el-dialog__body{
    text-align: center;
  }
  .el-input--suffix .el-input__inner{
    padding-right:63px;
  }
}
  
  
</style>
