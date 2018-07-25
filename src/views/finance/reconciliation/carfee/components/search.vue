<template>
  <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="90px" class="staff_searchinfo clearfix">
      <el-form-item label="创建时间:">
        <el-date-picker
          v-model="searchCreatTime"
          type="daterange"
          align="right"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="title+'网点:'">
          <SelectTree v-model="searchForm.orgId" />
      </el-form-item>
    <el-form-item label="车牌号码:">
      <el-input v-model="searchForm.memberName" auto-complete="off" maxlength="8"></el-input>
    </el-form-item>
    <el-form-item label="司机名称:">
      <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
    </el-form-item>
      <el-form-item label="对账状态
:">
        <el-select v-model="searchForm.checkStatus">
          <el-option label="未对账" :value="0"></el-option>
          <el-option label="已对账" :value="1"></el-option>
          <el-option label="全部"  value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="staff_searchinfo_tn art_marginTop" >
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clearForm" plain>清空</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { REGEX } from '@/utils/validate'
import { parseTime } from '@/utils/'
export default {
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
    },
    title: String
  },
  computed: {
    // title () {
    //
    // }
  },
  data () {
    let _this = this
    return {
      searchCreatTime: [new Date() - 60 * 24 * 60 * 60 * 1000, new Date()],
      pickOption: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 小于终止日
          return _this.form.tmsOrderPickup.arriveTime ? time.getTime() > _this.form.tmsOrderPickup.arriveTime : false
        }
      },
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          // 大于起始日
          return _this.form.tmsOrderPickup.outTime ? time.getTime() < _this.form.tmsOrderPickup.outTime : false
        }
      },
      searchForm: {
        orgId: '',
        checkStatus: '',//
        memberName: '',//status
        memberPerson: '',//status
        startTime: '',//
        endTime:''
      },
      rules: {

      }
    }
  },
  watch: {
    orgid(newVal){
      this.searchForm.orgid = newVal
    }
  },
  mounted () {
    this.searchForm.orgId = this.orgid
    this.onSubmit()
  },
  methods: {
    onSubmit () {
      this.searchForm.startTime = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d} ') + '00:00:00' : ''
      this.searchForm.endTime = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d} ') + '23:59:59' : ''
      this.$emit('change', this.searchForm)
    },
    clearForm () {
      this.searchForm.orgId = this.orgid
      this.searchForm.checkStatus = ''
      this.searchForm.memberName = ''
      this.searchForm.memberPerson = ''
      this.searchForm.startTime = ''
      this.searchForm.endTime = ''
      this.searchForm.searchCreatTime = []
    }
  }
}
</script>
<style type="text/css" lang="scss">
  .staff_searchinfo{
    .staff_searchinfo_tn.el-form-item:last-of-type{
      width: 10%;
      float: right;
    }
  }

</style>

