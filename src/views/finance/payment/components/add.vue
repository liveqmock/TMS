<template>
   <el-dialog :title='popTitle' @close="closeMe" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="paymentStap">
    <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
          <div class="title"><i class="el-icon-info"></i>请您确认是否进行<a>{{proptitle}}</a>，总金额：<span>{{form.agencyFund}}</span>元？</div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button :plain="true" @click="openHTML">使用 HTML 片段</el-button>  -->
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { putUpdateGoodsFunds } from '@/api/finance/payment'
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
    },
    proptitle: String
  },

  data() {
    return {
      form: {
        'pageType': '1',
        'goodsFundsIds': [],
        'agencyFund': ''
      },
      formLabelWidth: '75px',
      tooltip: false,
      rules: {

      },
      checked1: true,
      popTitle: '操作确认',
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
      // this.getMentInfo = this.dotInfo
      console.log(this.dotInfo)
      let total = 0
      this.dotInfo.map(el => {
        total += el.agencyFund ? el.agencyFund : 0
      })
      this.form.agencyFund = total
      console.log(total + 'jfdsl')
    },
    // searchQuery(newVal) {
    //   this.form.pageType = this.searchQuery.vo.pageType
    //   console.log(this.form.pageType);
    // },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if (this.isModify) {
          // this.popTitle = '回单回收'
          this.form.pageType = this.searchQuery.vo.pageType
          // console.log(888)
        }
      },
      immediate: true
    },
    isAccept: {
      handler(newVal) {
        if (this.isAccept) {
          // this.popTitle = '回单接收'
          // this.form.pageType = this.searchQuery.vo.pageType
          // console.log(888)
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
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = objectMerge2({}, this.form)
          data.goodsFundsIds = this.dotInfo.map(el => {
            return el.id
          })
          const promiseObj = putUpdateGoodsFunds(data)
          promiseObj.then(res => {
            this.$message({
              showClose: true,
              // duration: 0,
              message: '贷款回收成功~',
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
// .el-message--success{
//   min-width: 428px;
//   background: #cef0c1;
//   position: fixed;
//   left: 50%;
//   top: 20px;
//   top: 480px !important;
  
  
// }
// .el-message--success .el-message__content{
//     color:black !important;
//   }
// .el-message__closeBtn{
//   color: #90dfa8;
//   font-weight: bold;
// }
.paymentStap{
  margin-top: 25vh;

  .el-dialog{
    max-width: 445px;
    border:1px solid #cbcbcb;
  }
  .el-dialog__header{
    background: #e9e9e9;
    border-bottom: 1px solid #cbcbcb;
    padding: 10px 20px 10px;
    span{
      font-size: 15px;
      font-weight: bold;
    }
    .el-dialog__headerbtn{
      position: absolute;
      top: 14px;
      right: 20px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 18px;
    }
  }
  .el-dialog__body{
    padding: 32px 20px;
  }
  .el-dialog__footer{
    background: #e9e9e9;
    border-top: 1px solid #cbcbcb;
    padding: 9px 20px 9px;
    .el-button{
      padding: 5px 8px;
    }
    .el-button--primary{
      background-color:#0697ce;
    }
    .el-button--default{
      color:#0697ce;
    }
  }
  .title{
    font-size: 15px;
    color:#000000;
    text-align: center;
    i{
      color:#93c0e9;
      margin-right: 10px;
      font-size: 17px;
    }
    span{
      font-size: 23px;
      color:#f02222;
      font-weight: bold;
    }
  }
}

</style>
