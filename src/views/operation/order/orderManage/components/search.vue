<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="开单时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="开单网点:">
        <select-tree v-model="searchForm.orgid" />
      </el-form-item>
      <el-form-item class="searchinfo--order">
        <el-select v-model="searchForm.type">
          <el-option label="运单号" value="shipSn"></el-option>
          <el-option label="发货人" value="senderCustomerName"></el-option>
          <el-option label="发货人手机" value="senderCustomerMobile"></el-option>
          <el-option label="收货人" value="receiverCustomerName"></el-option>
          <el-option label="收货人手机" value="receiverCustomerMobile"></el-option>
          <el-option label="货物名称" value="cargoName"></el-option>
          <el-option label="货号" value="shipGoodsSn"></el-option>
        </el-select>
        <el-input
            v-model="searchForm.value"
            maxlength="15"
            @change="onSubmit"
            clearable>
        </el-input>
      </el-form-item>
    <el-form-item label="订单状态：">
      <select-type v-model="searchForm.shipStatus" type="ship_status" >
        <el-option slot="head" label="全部" value=""></el-option>
      </select-type>
    </el-form-item>
      <el-form-item class="staff_searchinfo--btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import { pickerOptions2, parseTime } from '@/utils/'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'

export default {
  name: 'order-manage-search',
  components: {
    SelectTree,
    SelectType
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
  data() {
    return {
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      searchForm: {
        orgid: '',
        value: '',
        type: 'shipSn',
        shipStatus: ''
      },
      rules: {
        mobile: [{
          // validator: validateFormMobile, trigger: 'blur'
         // validator: validateFormNumber, trigger: 'change'
        }]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
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
    const key = this.$route.query.key
    const value = this.$route.query.value
    if (key && value) {
      console.log('search ship list:', key, value)
      this.searchForm.type = key
      this.searchForm.value = value
    }
    this.searchCreatTime = this.defaultTime
    this.onSubmit()
  },
  methods: {
    onSubmit() {
      const searchObj = {}
      console.log('this.searchCreatTime:', this.searchCreatTime)
      searchObj.shipFromOrgid = this.searchForm.orgid
      searchObj.shipStatus = this.searchForm.shipStatus
      searchObj.startTime = this.searchCreatTime ? this.searchCreatTime[0] + ' 00:00:00' : ''
      searchObj.endTime = this.searchCreatTime ? this.searchCreatTime[1] + ' 23:59:59' : ''
      searchObj[this.searchForm.type] = this.searchForm.value

      this.$emit('change', searchObj)
    },
    clearForm() {
      this.searchCreatTime = []
      this.searchForm.shipStatus = ''
      this.searchForm.shipFromOrgid = this.orgid
      this.searchForm.value = ''
      this.searchForm.type = 'shipSn'
    }
  }
}
</script>


<style lang="scss">
.tab-content{
    .staff_searchinfo{
        padding:10px 0;
        margin: 0 10px;
        border-bottom:1px dashed #999;
        .el-form-item{
            margin-bottom: 0;
        }
      .el-date-editor--daterange.el-input__inner{
        width: 200px;
      }
    }
    .searchinfo--order{
      .el-select{
        width: 100px;
      }
      .el-form-item__content>.el-input{
        width: 200px;
      }
    }
    .staff_searchinfo--btn{
        float: right;
        margin-right: 0;
    }
}
@media screen and (max-width:1308px){
  .tab-content {
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

