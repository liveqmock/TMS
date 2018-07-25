<template>
   <el-dialog :title='popTitle' @close="closeMe" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="wzl_addReceiptPop">
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

.wzl_addReceiptPop{
  .el-dialog{
    max-width: 385px;
    min-width: 300px;
    margin-top: 29vh !important;
  }
  .el-dialog__body{
    text-align: center;
  }
  .el-input--suffix .el-input__inner{
    padding-right:63px;
  }

  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
    padding: 10px 20px 8px;
  }
  .el-textarea__inner{
    // line-height: 0px;
    color: #3e9ff1;
  }
  .el-dialog__header{
    padding: 9px 20px 6px;
    font-size:14px;
    border-bottom: 1px solid #3e9ff1;
  }
  .el-dialog__title{
    font-size: 15px;
    font-weight: bold;
    // color:#fff;
  }
  .el-button{
    padding: 4px 12px;
    // float:right;
  }
  .el-dialog__headerbtn{
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 18px;
    
  }
  .el-dialog__footer{
    // text-align: center;
    border-top:1px solid #3e9ff1;
    padding: 10px 20px 9px;
  }
  .el-input--mini .el-input__inner{
    color: #3e9ff1;
  }
}
  
  
</style>
