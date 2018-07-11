<template>
  <el-dialog :title="popTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog">
    <el-form ref="ruleForm" :model="repertorySetting" :rules="rules" class="colorpickerForm">
      <el-form-item class="colorpickerItem" prop="sectionOne">
        <b>超过：</b>
        <el-input v-model="repertorySetting.sectionOne"></el-input><b>小时的库存颜色</b>
        <el-color-picker v-model.number="repertorySetting.sectionOneColour" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item class="colorpickerItem" prop="sectionTwo">
        <b>超过：</b>
        <el-input v-model="repertorySetting.sectionTwo"></el-input><b>小时的库存颜色</b>
        <el-color-picker v-model.number="repertorySetting.sectionTwoColour" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item class="colorpickerItem" prop="sectionThree">
        <b>超过：</b>
        <el-input v-model="repertorySetting.sectionThree"></el-input><b>小时的库存颜色</b>
        <el-color-picker v-model.number="repertorySetting.sectionThreeColour" :predefine="predefineColors"></el-color-picker>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import popRight from '@/components/PopRight/index'
import { getRepertoryColor, putRepertoryColor } from '@/api/operation/repertory'
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2 } from '@/utils/index'
export default {
  data() {
    const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }
    const timingIdentifier = (rule, value, callback) => {
      if (value < 12 || value > 24) {
        callback(new Error('请输入12-24的数字'))
      } else {
        callback()
      }
    }
    const outtimeIdentifier = (rule, value, callback) => {
      if (value < 24) {
        callback(new Error('请输入大于24的数字'))
      } else {
        callback()
      }
    }
    return {
      popTitle: '提醒颜色设置',
      repertorySetting: {},
      loading: false,
      isShow: false,
      rules: {
        sectionOne: [{ validator: pretimeIdentifier, tigger: 'blur' }],
        sectionTwo: [{ validator: timingIdentifier, tigger: 'blur' }],
        sectionThree: [{ validator: outtimeIdentifier, tigger: 'blur' }]
      },
      colorSetting: [],
      miniInput: '70px',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ]
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        this.isShow = true
      }else {
        this.isShow = false
      }
    }
  },
  mounted() {
    this.getColor()
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  methods: {
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    getColor() {
      getRepertoryColor(this.otherinfo.orgid).then(data => {
          if (data) {
            let list = data.data.repertorySetting
            this.$nextTick(() => {
              this.repertorySetting = objectMerge2({}, list)
              this.colorSetting = data.data
              this.$emit('success', this.colorSetting.repertorySetting)
            })
          }
        })
        .catch(error => {
          this.$message({ type: 'error', message: '获取颜色列表失败' })
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let colorData = {}
          this.$set(colorData, 'repertorySetting', this.repertorySetting)
          putRepertoryColor(colorData, this.otherinfo.orgid, this.colorSetting.id).then(data => {
              this.$message({ type: 'success', message: '修改成功' })
              this.loading = false
              this.isShow = false
              this.getColor()
              this.$nextTick(() => {
                this.$refs[formName].resetFields()
              })
            })
            .catch(error => {
              this.$message({ type: 'error', message: '修改失败' })
              this.loading = false
            })
        }
      })
    }
  }
}

</script>
<style lang="scss">
.colorpickerItem {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .el-input {
    width: 100px;
  }
  .el-color-picker {
    vertical-align: middle !important;
  }
  b {
    margin: 0 10px;
  }
}

</style>
