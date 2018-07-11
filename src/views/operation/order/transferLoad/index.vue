<template>
  <div class="transferload-steup">
    <!-- 中转外发 -->
    <div class="transferload-steup-form" v-loading="loading">
      <el-collapse v-model="loadTruck">
        <el-collapse-item name="loadTruckOne">
          <template slot="title">
            中转信息&nbsp; <b>中转批次：{{formModel.transferBatchNo}}</b>
          </template>
          <div class="clearfix loadFrom">
            <el-form :model="formModel" ref="formModel" class="demo-form-inline" :inline="true" label-width="110px" :rules="formModelRules">
              <!-- 基本信息 -->
              <el-form-item label="承运商" class="addCarrierInput" prop="carrierId">
                <i class="el-icon-plus el-input__icon" @click="doAction('addTruck')"></i>
                <querySelect size="mini" show='select' search="carrierName" :name="carrierName" v-model="formModel.carrierId" type="carrier" valuekey="carrierId" :filterable="false" @change="getCarrier" >
                </querySelect>
              </el-form-item>
              <el-form-item prop="transferTime" label="中转日期">
                <el-date-picker size="mini" v-model="formModel.transferTime" value-format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="中转日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="承运商电话" prop="carrierMobile">
                <el-input size="mini" disabled v-model="formModel.carrierMobile" placeholder="承运商电话">
                </el-input>
              </el-form-item>
              <el-form-item label="到站电话" prop="arrivalMobile">
                <el-input size="mini" maxlength="13" v-model="formModel.arrivalMobile" v-number-only placeholder="到站电话">
                </el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input size="mini" maxlength="250" v-model="formModel.remark" placeholder="备注">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 操作按钮区 -->
      <div class="load_btn_boxs">
        <!-- <el-button size="mini" icon="el-icon-delete" plain type="warning" @click="doAction('reset')">全部清空</el-button> -->
        <el-button size="mini" icon="el-icon-sort" plain type="primary" @click="doAction('finish')">完成中转</el-button>
      </div>
      <!-- 穿梭框 -->
      <dataTable :leftData="leftData" :rightData="rightData"  @loadTable="getLoadTable"></dataTable>
    </div>
    <!-- 添加承运商信息 -->
      <addCraieer :orgid="otherinfo.orgid" :popVisible.sync="addCarrierVisible"></addCraieer>
  </div>
</template>
<script>
import { parseTime } from '@/utils/'
import * as transferManageApi from '@/api/operation/transfer'
import { getSystemTime } from '@/api/common'
import querySelect from '@/components/querySelect/index'
import addCraieer from '@/views/company/carrierManage/components/add'
import dataTable from './components/dataTable'

export default {
  components: {
    dataTable,
    addCraieer,
    querySelect
  },
  data() {
    return {
      // 左边数据
      leftData: [],
      // 右边数据
      rightData: [],
      // 被选中数据
      loadTableInfo: [],
      // 顶部表单
      formModel: {
        'transferBatchNo': '',
        'carrierId': '',
        'carrierMobile': '',
        'arrivalMobile': '',
        'transferTime': '',
        'remark': ''
      },
      formModelRules: {
        transferTime: [{ required: true, trigger: 'blur', message: '请输入中转日期' }],
        transferBatchNo: [{ required: true, trigger: 'blur' }]
      },
      loadTruck: 'loadTruckOne',
      isModify: false,
      addCarrierVisible: false,
      loading: false,
      carrierName: '',
      // 缓存数据
      dataCache: {},
      cache: {}
    }
  },
  mounted() {
    console.log('transferId:', this.$route)
    this.init()
  },
  methods: {
    init() {
      const transferId = this.$route.query.transferId
      this.reset()
      if (typeof transferId !== 'undefined') {
        // 表示进来修改
        this.isModify = true
        this.formModel.transferBatchNo = transferId
        // 获取批次信息
        this.getUpdateTransferDetail()
      } else {
        // 表示进来新增
        this.isModify = false
        // 先获取批次号
        this.gettransferBatchNo()
        // 设置为当前日期
        getSystemTime().then(time => {
          this.formModel.transferTime = parseTime(new Date(time))
        })
      }
      this.getSelectAddLoadRepertoryList()
    },
    // 获取中转批次号码
    gettransferBatchNo() {
      if (this.cache.transferBatchNo) {
        this.formModel.transferBatchNo = this.cache.transferBatchNo
      } else {
        return transferManageApi.getBatchNo(this.otherinfo.orgid).then(res => {
          this.cache.transferBatchNo = res.data
          this.formModel.transferBatchNo = res.data
        })
      }
    },
    // 获取左边列表信息
    getSelectAddLoadRepertoryList() {
      if (this.isModify) {
        return transferManageApi.getUpdateLoadRepertoryList(this.otherinfo.orgid, this.formModel.transferBatchNo).then(data => {
          this.leftData = data.data
        })
      } else {
        return transferManageApi.getLeftRepetoryList(this.otherinfo.orgid).then(data => {
          this.leftData = data.data
        })
      }
    },
    goTransferList() {
      // 跳转到中转管理页面
      this.eventBus.$emit('replaceCurrentView', '/operation/order/transfer')
    },
    // 获取批次详细信息
    getUpdateTransferDetail() {
      const key = this.otherinfo.orgid + ':' + this.formModel.transferBatchNo
      if (this.dataCache[key]) {
        this.setTransferDetail(this.dataCache[key])
        return true
      }
      return transferManageApi.getUpdateTransferDetail(this.otherinfo.orgid, this.formModel.transferBatchNo).then(res => {
        const data = res.data
        if (!data.transferBatchNo) {
          // 当这个批次号不能获取到信息时，提示用户
          this.$alert('当前批次号不存在', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.goTransferList()
            }
          })
        } else {
          this.dataCache[key] = data
          this.setTransferDetail(data)
        }
      }).catch(errRes => {
        // 当这个批次号不能获取到信息时，提示用户
        this.$alert('当前批次号不存在', '提示', {
          confirmButtonText: '确定',
          callback: action => {
              // 跳转到中转管理页面
            this.goTransferList()
          }
        })
      })
    },
    setTransferDetail(data) {
      for (const i in this.formModel) {
        this.formModel[i] = data[i]
      }
      this.formModel.transferTime = parseTime(new Date(this.formModel.transferTime))
      this.rightData = data.tmsOrderTransferDetails || []
      this.loadTableInfo = this.rightData
      this.carrierName = data.carrierName
    },
    doAction(type) {
      switch (type) {
        case 'reset':
          this.resetFieldsForm('formModel')
          break
        case 'finish': // 完成配载
          this.finishLoadInfo()
          break
        case 'addTruck': // 添加承运商信息
          this.addCarrier()
          break
      }
    },
    finishLoadInfo() {
      this.$refs['formModel'].validate((valid) => {
        if (valid) {
          if (this.loadTableInfo.length < 1) {
            this.$message({ type: 'warning', message: '右边数据表格不能为空' })
          } else {
            // 判断是修改还是新增
            let PromiseObj
            // 处理提交数据
            const data = Object.assign({}, this.formModel)
            data.tmsOrderTransferDetails = this.loadTableInfo.map(el => {
              const item = {
                'repertoryId': el.repertoryId,
                'shipId': el.shipId,
                'childShipId': el.childShipId,
                'oddNumbers': el.oddNumbers,
                'transferCharge': el.transferCharge,
                'deliveryExpense': el.deliveryExpense,
                'transferOtherFee': el.transferOtherFee,
                'totalCost': el.totalCost,
                'paymentId': el.paymentId
              }
              // 有Id，就是修改，无Id就是新增
              if (el.id) {
                item.id = el.id
              }
              return item
            })
            if (this.isModify) {
              PromiseObj = transferManageApi.putModifyTransfer(data)
            } else {
              PromiseObj = transferManageApi.postNewTransfer(data)
            }
            PromiseObj.then(res => {
              if (this.isModify) {
                // this.reset()
              }

              this.$message.success('操作成功！')
              this.eventBus.$emit('replaceCurrentView', '/operation/order/transfer')
            }).catch(err => {
              this.$message.error(err.text || '未知错误')
            })
          }
        } else {
          this.$message({ type: 'warning', message: '请填写完整表单' })
        }
      })
    },
    reset() {
      this.resetFieldsForm('formModel')
      this.getSelectAddLoadRepertoryList()
      this.carrierName = ''
      this.rightData = []
      this.loadTableInfo = []
    },
    getLoadTable(obj) { // 获取穿梭框表格数据列表
      this.loadTableInfo = obj || []
    },
    // 重置
    resetFieldsForm(formName) { // 5秒后resetFields表单验证
      this.$refs[formName].resetFields()
    },
    // 获取选中的承运商
    getCarrier(item) {
      this.formModel.carrierMobile = item.carrierMobile
    },
    // 显示新增承运商
    addCarrier() {
      this.addCarrierVisible = true
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.init()
  }
}

</script>
<style lang="scss">
.transferload-steup {
  height: calc(100%);
  display: flex;
  flex-direction: column;
  position: relative;

  .transferTable{
    flex:1;
    display: flex;
    flex-direction: column;
  }

  .transferTable .transferTable_content{

  }

  .el-collapse{
  }

  .load_btn_boxs {
      position: relative;
      top: 10px;
      z-index: 33;
      text-align: right;
      height: 0;
    }

  .transferload-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    
    .loadFrom {
      padding: 0 20px 10px 0;
      .el-form-item {
        margin-bottom: 10px;
      }
      .loadFrom-type {
        position: absolute;
        z-index: 33;
        right: 40px;
        top: 20px;
      }
    }
    .addCarrierInput{
      .el-form-item__content{
        position: relative;
      }
      .el-icon-plus{
        position: absolute;
        right: 5px;
        top: 8px;
        height: 26px;
        z-index: 2;
        color: #666;
        background: #fff;
        line-height: 26px;
        cursor: pointer;

      }
    }
    .el-collapse {
      border: 1px solid #E0E0E0;
    }
    .el-collapse-item__header {
      background-color: #E9F3FA;
      padding: 2px 0 0 60px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 20px;
      top: 5px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
      .el-form-item__content>.el-input {
        width: 99%;
      }
    }
    .el-form-item--mini.el-form-item {
      margin-bottom: 5px;
    }
  }
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

ul.feeList {
  border-top: 2px dotted #bbbbbb;
  margin: 10px -10px -10px 0;
  padding: 5px 10px 10px 10px;
  background-color: #fbfbfb;
  width: 100%;
  display: flex;
  flex-direction: row;
  li {
    border-right: 1px solid #eeeeee;
    width: 10%;
    p {
      text-align: center;
      line-height: 36px;
      font-size: 14px;
    }
  }
}

</style>
