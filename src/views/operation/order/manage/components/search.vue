<template>
  <!--label-width="80px"-->
  <el-form :inline="true" :size="btnsize" label-position="right" :model="searchForm"  class="staff_searchinfo clearfix">
      <el-form-item label="创建时间:">
        <div class="block">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            unlink-panels
          >
          </el-date-picker>
        </div>
          <!--<SelectTree v-model="searchForm.orgid" />-->
      </el-form-item>
    <el-form-item label="订单状态：">
      <SelectType v-model="searchForm.orderStatus" type="order_status" />
    </el-form-item>
    <el-form-item label="运单号:">
      <el-input
        v-numberOnly
        placeholder=""
        maxlength="11"
        v-model="searchForm.orderSn"
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
import SelectType from '@/components/selectType/index'
export default {
  components: {
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
  computed: {
  },
  data () {
    return {
      searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
      searchForm: {
        orderStatus: 213,
        orderSn: ''
      }
    }
  },
  watch: {
    orgid(newVal){
      // this.searchForm.orgid = newVal
    },

  },
  mounted (){
    this.loading = true
    this.searchForm.orgid = this.orgid
    this.onSubmit()
  },
  methods: {
    getOrgid (id){
      this.searchForm.orgid = id
    },
    onSubmit () {
      this.searchForm.createTime = this.searchCreatTime ? +this.searchCreatTime[0] : ''
      this.searchForm.endTime = this.searchCreatTime ? +this.searchCreatTime[1] : ''
      this.$emit('change', this.searchForm)
      // console.log(this.searchForm);
    },
    clearForm () {
      this.searchForm.createTime = ''
      this.searchForm.endTime = ''
      this.searchCreatTime = []
      this.searchForm.orderStatus = ''
      this.searchForm.orderSn = ''
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

