<template>
  <div class="abnomal-content orderinfo-content">
    <el-table
      ref="multipleTable"
      :data="usersArr"
      stripe
      border
      height="100%"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="abnormalNo"
        label="异常编号"
        >
      </el-table-column>
      <el-table-column
        prop="abnormalTypeName"
        label="异常类型">
      </el-table-column>
      <el-table-column
        prop="abnormalStatusName"
        label="处理状态">
      </el-table-column>
      <el-table-column
        label="登记时间">
        <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
      </el-table-column>
      <el-table-column
        prop="disposeOrgName"
        label="登记网点">
      </el-table-column>
      <el-table-column
        prop="registerName"
        label="登记人">
      </el-table-column>
      <el-table-column
        prop="dutyOrgName"
        label="责任对象">
      </el-table-column>
      <el-table-column
        prop="abnormalDescribe"
        label="异常描述">
      </el-table-column>
      <el-table-column
        prop="disposeOpinion"
        label="处理意见">
      </el-table-column>
      <el-table-column
        label="异常图片"
        width="300"
        >
        <template slot-scope="scope">
           <div class="clickimglist">
            <span class="clickimg" v-for="(item, index) in (scope.row.abnormalPicture ? scope.row.abnormalPicture.split(',') : [])" :key="index">
            <img v-showPicture  :src="item" />
            </span>
            </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import orderManage from '@/api/operation/orderManage'

export default {
  props: {
    orderid: [String, Number]
  },
  data() {
    return {
      loading: false,
      usersArr: []
    }
  },
  watch: {
    orderid(newVal) {
      if (newVal !== '') {
        this.fetchData()
      } else {
        this.usersArr = []
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      return orderManage.getShipAbnormal(this.orderid).then(res => {
        this.usersArr = res
      })
    }
  }
}
</script>
<style lang="scss">
.abnomal-content{
  .clickimglist{
    width: 100%;
    overflow: auto;
    padding-bottom: 2px;
  }
  .cell .clickimg{
    border: 1px solid #ccc;
    padding: 2px;
    text-align: center;
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-left: 3px;
    line-height: 50px;

    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
