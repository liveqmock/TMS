<template> 
   <el-dialog :title='popTitle' :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="wzl_addBatchPop" @close="closeMe">
    <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
      <div class="batch">
        <el-form-item label="签收单数:" prop="num">
          <!-- <p class="tp">{{this.form.num}}单</p> -->
          <el-input maxlength="20" :placeholder=" form.num +'单'" auto-complete="off" :disabled="true"></el-input>
        </el-form-item><br>
        <el-form-item label="到付合计:" prop="shipArrivepayFee">
          <!-- <p class="tp">{{this.form.shipArrivepayFee}}元</p> -->
          <el-input maxlength="20" :placeholder=" form.shipArrivepayFee +'元'" auto-complete="off" :disabled="true"></el-input>
        </el-form-item><br>
        <el-form-item label="代收款合计:" prop="agencyFund">
          <!-- <p class="tp">{{this.form.agencyFund}}元</p> -->
          <el-input maxlength="20" :placeholder=" form.agencyFund +'元'" auto-complete="off" :disabled="true"></el-input>
        </el-form-item><br>
        <el-form-item label="签收时间:" prop="signTime">
          <el-date-picker
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
        </el-form-item> 
        <el-form-item label="签收类型:" prop="signTypeId" >
          <SelectType v-model="form.signTypeId" type="sign_type"/>
        </el-form-item>
        <el-form-item label="签收证件:" prop="signCocumentTypeId" >
          <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type"/>
        </el-form-item>
        <el-form-item label="证件号码:" prop="documentNum">
          <el-input maxlength="20" v-model="form.documentNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input maxlength="250" v-model.trim="form.remark" auto-complete="off"></el-input>
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
import { postPickupBatchSign, postBatchSign } from '@/api/operation/sign'
import { REGEX } from '@/utils/validate'
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
    // searchQuery:[Object,Array],
    isDepMain: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    createrId: [Number, String],
    isModify: {
      type: Boolean,
      default: false
    },
    isSongh: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const validateNum = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入证件号码'))
      } else if (value.length > 20) {
        callback(new Error('最多可输入20位'))
      } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入字母和数字'))
      }
    }
    return {
      searchCreatTime: +new Date(),
      pickOption2: '',
      checked1: true,
      popTitle: '',
      loading: false,
      type: '',
      form: {
        'num': '',
        'repertoryIds': [],
        'signTime': '',
        'signName': '',
        'signCocumentTypeId': 96,
        'documentNum': '',
        'signTypeId': 99,
        'remark': '',
        'signPic': '',

        'loadIds': [],
        'shipIds': [],
        'childShipIds': []
      },
      formLabelWidth: '80px',
      tooltip: false,
      disabled: false,
      rules: {
        documentNum: [
          { required: true, trigger: 'blur', validator: validateNum }
        ]
      }
    }
  },
  mounted() {

  },
  watch: {
    isDepMain() {

    },
    dotInfo(newVal) {
      // this.form = this.dotInfo
      console.log(this.dotInfo + '00o0')
      // this.form = this.dotInfo
      this.form.num = this.dotInfo.length
      let total = 0
      this.dotInfo.map(el => {
        total += el.shipArrivepayFee ? el.shipArrivepayFee : 0
      })
      this.form.shipArrivepayFee = total

      total = 0
      this.dotInfo.map(el => {
        total += el.agencyFund ? el.agencyFund : 0
      })
      this.form.agencyFund = total
    },
    // searchQuery(newVal){
    //    this.form.repertoryId = this.searchQuery.vo.repertoryId
    //    console.log(this.searchQuery);
    // },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if (this.isModify) {
          this.popTitle = '批量签收'
          // this.form.pageType = this.searchQuery.vo.pageType
          // cocloseInfo);
          // this.showAlert = true
        } else {
          // this.showAlert = false
        }
      },
      immediate: true
    },
    isSongh: {
      handler(newVal) {
        this.popTitle = '批量签收'
      }
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
    // console.log(this.$refs.batch_show);
    // this.$refs.batch_show.className = 'batch_main'
    },
    submitForm(ruleForm) {
      this.form.signTime = this.searchCreatTime
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = objectMerge2({}, this.form)
          // console.log(this.dotInfo)
          data.repertoryIds = this.dotInfo.map(el => {
            return el.repertoryId
          })
          // console.log();
          let promiseObj

          if (this.isModify) {
            promiseObj = postPickupBatchSign(data)// 自提批量
          } else if (this.isSongh) {
            data.shipIds = this.dotInfo.map(el => {
              console.log(66)
              return el.shipId
            })
            data.childShipIds = this.dotInfo.map(el => {
              return el.childShipId
            })
            data.loadIds = this.dotInfo.map(el => {
              return el.loadId
            })
            promiseObj = postBatchSign(data)// 送货批量
          }
          promiseObj.then(res => {
            console.log(res)
            this.$message({
              message: '签收成功~',
              type: 'success'

            })
            this.closeMe()
            this.$emit('success')
              // this.$alert('保存成功', '提示', {
                //   confirmButtonText: '确定',
                //   callback: action => {
                //     this.loading = false
                //     this.closeMe()
                //     this.$emit('success')
                //   }
                // })
          }).catch(res => {
            this.loading = false
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
.wzl_addBatchPop{

  .el-dialog{
    max-width: 385px;
    min-width: 300px;
    margin-top: 29vh !important;
  }
  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
    padding: 10px 20px 8px;
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
 .el-dialog__body{
   padding:8px 20px;
 }
  .el-dialog__footer{
    // text-align: center;
    border-top:1px solid #3e9ff1;
    padding: 10px 20px 9px;
  }
  
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 12px;
    .el-form-item__label{
      padding:0;
      text-align: center;
      // margin-right:10px;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:209px;
  }
  .batch{
    margin:8px 20px 0px;
    .el-input__inner{
      padding:0 30px;
    }
    .el-input--mini .el-input__inner{
      color: #3e9ff1;
    }
  }
  
}
  
</style>
