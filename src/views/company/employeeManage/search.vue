<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" ref="searchFormRef" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="归属网点">
          <SelectTree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="员工名称">
          <el-input
              placeholder="请输入姓名"
              v-model="searchForm.name"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item label="手机号码">
          <el-input
              placeholder="请输入手机号码"
              maxlength="11"
              v-model="searchForm.mobile"
              v-numberOnly
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm('searchFormRef')" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { validateMobile, REGEX } from '@/utils/validate'
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
    }
  },
  data() {
    const validateFormMobile = function(rule, value, callback) {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormEmployeer = function(rule, value, callback) {
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
          pattern: REGEX.MOBILE
        }]
      }
    }
  },
  watch: {
    orgid(newVal) {
      this.searchForm.orgid = newVal
    }
  },
  mounted() {
    this.searchForm.orgid = this.orgid
  },
  methods: {
    onSubmit() {
      this.$emit('change', this.searchForm)
    },
    clearForm(formName) {
      this.searchForm.name = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.mobile = ''
    }
  }
}
</script> 


<style lang="scss">
.staff_manage{
    .staff_searchinfo{
        padding:10px 0;
        margin: 0 10px;
        border-bottom:1px dashed #ccc;
        .el-form-item{
            margin-bottom: 0;
        }
        
    }
    .staff_searchinfo--btn{
        float: right;
        margin-right: 0;
    }
}
@media screen and (max-width:1308px){
  .staff_manage {
      .staff_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .staff_searchinfo--btn{
          float: none;
      }
  }
}
</style>

