<template>
  <el-dialog :title='popTitle' :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="signDialog" @close="closeMe">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
      <div class="batch">
        <el-form-item label="签收单数:">
          <p class="tp">{{orderNum}}单</p>
        </el-form-item>
        <el-form-item label="签收人:" prop="signName">
          <el-input maxlength="250" v-model.trim="form.signName" auto-complete="off" placeholder="签收人"></el-input>
        </el-form-item>
        <el-form-item label="签收时间:" prop="signTime">
          <el-date-picker v-model="form.signTime" align="right" type="date" placeholder="选择日期" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="签收类型:" prop="signTypeId">
          <SelectType v-model="form.signTypeId" type="sign_type" />
        </el-form-item>
        <el-form-item label="签收证件:" prop="signCocumentTypeId">
          <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type" />
        </el-form-item>
        <el-form-item label="证件号码:" prop="documentNum">
          <el-input maxlength="20" v-model="form.documentNum" auto-complete="off" placeholder="证件号码"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input maxlength="250" v-model.trim="form.remark" auto-complete="off" placeholder="备注"></el-input>
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
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { REGEX } from '@/utils/validate'
import { objectMerge2 } from '@/utils/index'
import { postBatchSign } from '@/api/operation/deliverManage'
import { getSystemTime } from '@/api/common'
export default {
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  components: {
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    dotInfo: {
      type: Object,
      default: {}
    },
    isModify: {
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
      checked1: true,
      popTitle: '送货签收',
      loading: false,
      message: false,
      orderNum: 0,
      form: {
        shipIds: [],
        childShipIds: [],
        signTime: '',
        signName: '',
        signCocumentTypeId: 0,
        documentNum: '',
        signTypeId: 0,
        remark: ''
        // signPic: ''
      },
      rules: {
        documentNum: [{ required: true, trigger: 'blur', validator: validateNum }]
      }
    }
  },
  watch: {
    isDepMain() {},
    dotInfo(newVal) {
      if (newVal) {
        this.form = newVal
        this.form.signTime = +new Date()
        this.orderNum = newVal.shipIds.length
        if (this.orderNum === 0) {
          this.orderNum = newVal.childShipIds.length
        }
      }
    },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if (this.isModify) {}
      },
      immediate: true
    }
  },
  methods: {
    setSystemTime() {
      return getSystemTime().then(data => {
        this.form.signTime = data
      })
    },
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let data = objectMerge2({}, this.form)
          console.log(data)
          this.$confirm('此操作将签到, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            postBatchSign(data).then(data => {
                this.$message({ type: 'success', message: '签收成功' })
                this.message = true
                this.closeMe()
                this.$emit('message', this.message)
              })
              .catch(error => {
                this.$message({ type: 'error', message: '签收失败' })
                this.message = false
                this.closeMe()
                this.$emit('message', this.message)
              })
          })
        }
      })
    }
  },
}

</script>
<style lang="scss">
.signDialog {
  .el-dialog {
    max-width: 452px;
    min-width: 300px;
  }
  .transfer-footer {
    line-height: 20px;
    color: #666;
    font-size: 12px;
  }
  .el-dialog__header {
    text-align: center;
    background: #ddd;
  }
  .el-dialog__body {
    padding: 8px 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    // margin-bottom: 15px;
    .el-form-item__label {
      padding: 0;
      text-align: center; // margin-right:10px;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 209px;
  }
  .batch {
    margin: 0 50px;
    .el-input__inner {
      padding: 0 30px;
    }
  }
}

</style>
