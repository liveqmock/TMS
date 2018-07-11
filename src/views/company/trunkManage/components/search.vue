<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" class="trunk_searchinfo clearfix">
      <el-form-item label="网点">
          <SelectTree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item label="车辆来源">
          <el-select v-model="searchForm.truckSource" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in truckSources" :key="item.id" :label="item.dictName" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="车牌号">
          <el-input
              placeholder="请输入车牌号"
              maxlength="11"
              v-model="searchForm.truckIdNumber"
              clearable>
          </el-input>
      </el-form-item>
      <el-form-item class="trunk_searchinfo--btn">
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
    truckSources: {
      type: Array,
      default: () => []
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
        truckSource: '',
        truckIdNumber: ''
      },
      rules: {
        truckIdNumber: [{
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
      this.searchForm.truckSource = ''
      this.searchForm.orgid = this.orgid
      this.searchForm.truckIdNumber = ''
    }
  }
}
</script> 


<style lang="scss">

    .trunk_searchinfo{
        padding:10px 0;
        margin: 0 10px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
        }
        .trunk_searchinfo--btn{
          float: right;
          margin-right: 0;
        }
    }
    

@media screen and (max-width:1308px){
  .tab-content {
      .trunk_searchinfo{
          .el-form-item{
              margin-bottom: 10px;
          }
      }
      .trunk_searchinfo--btn{
          float: none;
      }
  }
}
</style>

