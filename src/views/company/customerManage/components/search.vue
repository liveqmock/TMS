<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" class="staff_searchinfo clearfix">
      <el-form-item label="网点">
          <SelectTree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item :label="title+'货人'">
          <el-input
              :placeholder="title+'货单位或'+title+'货人'"
              v-model="searchForm.name"
              maxlength="15"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item label="手机号码">
          <el-input
              v-numberOnly
              placeholder="请输入手机号码"
              maxlength="11"
              v-model="searchForm.mobile"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { REGEX }  from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'

export default {
  components: {
    SelectTree
  },
  props: {
    btnsize: {
      type: String,
      default: 'mini'
    },
    orgid: {
      type: Number
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
    title () {
      return this.issender ? '发' : '收'
    }
  },
  data () {
    let _this = this
    const validateFormMobile = function (rule, value, callback) {
      if(validateMobile(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function (rule, value, callback) {
      callback()
    }

    const validateFormNumber = function (rule, value, callback) {
      _this.searchForm.mobile = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      searchForm: {
        orgid: '',
        name: '',
        mobile: ''
      },
      rules: {
        mobile: [{
          //validator: validateFormMobile, trigger: 'blur'
          validator: validateFormNumber, trigger: 'change'
        }]
      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgid = this.orgid
  },
  methods: {
    getOrgid (id){
      this.searchForm.orgid = id
    },
    onSubmit () {
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
    }
  }
}
</script> 