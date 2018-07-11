<template>
  <el-dialog
    title="个人设置"
    class="personalPopSetup"
    :visible="dialogVisiblePerson"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @open="getPersonalSetup"
    width="600px"
    :before-close="close">
    <el-form :model="form" label-width="100px" ref="ruleForm" :inline="true" label-position="right" size="mini">
     <el-collapse v-model="activeNames">
      <el-collapse-item name="setup1" title="运单默认值设置">
        <el-form-item>
          <el-checkbox true-label="1"  false-label="0" v-model="form.shipDefault.openOrderAndTransferInfo">开单页面附带中转信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipDefault.aloneWindow">开单页面独立窗口</el-checkbox>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item name="setup2" title="快捷键设置">
        <div @keydown.stop.prevent @keyup.stop.prevent @keypress.stop.prevent>
        <el-form-item label="清空">
          <el-input v-model="form.printKey.cleanKey" @keydown.stop.prevent.native="showkeycode('cleanKey', $event)" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="打印标签">
          <el-input v-model="form.printKey.printLibkey" placeholder="" @keydown.prevent.stop.native="showkeycode('printLibkey', $event)"></el-input>
        </el-form-item>
        <el-form-item label="打印运单">
          <el-input v-model="form.printKey.printShipKey" placeholder="" @keydown.prevent.stop.native="showkeycode('printShipKey', $event)"></el-input>
        </el-form-item>
        <el-form-item label="保存运单">
          <el-input v-model="form.printKey.saveShipKey" placeholder="" @keydown.prevent.stop.native="showkeycode('saveShipKey', $event)"></el-input>
        </el-form-item>
        <el-form-item label="保存并打印">
          <el-input v-model="form.printKey.savePrintKey" placeholder="" @keydown.prevent.stop.native="showkeycode('savePrintKey', $event)"></el-input>
        </el-form-item>
        </div>
      </el-collapse-item>
      <el-collapse-item name="setup3" title="运单默认值设置">
        <el-form-item label="交接方式">
          <SelectType type="ship_delivery_method" v-model="form.shipSetKey.handoverMode">
          </SelectType>
        </el-form-item>
        <el-form-item label="回单类型">
          <SelectType type="ship_receipt_require" v-model="form.shipSetKey.receiptType">
          </SelectType>
        </el-form-item>
        <el-form-item label="回单份数">
          <el-input v-model="form.shipSetKey.receiptNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <SelectType type="ship_pay_way" v-model="form.shipSetKey.paymentMode">
          </SelectType>
        </el-form-item>
        <el-form-item label="运输方式">
          <SelectType type="ship_shipping_type" v-model="form.shipSetKey.transportMode">
          </SelectType>
        </el-form-item>
        <el-form-item label="业务类型">
          <SelectType type="ship_business_type" v-model="form.shipSetKey.businessType">
          </SelectType>
        </el-form-item>
        
      </el-collapse-item>
    </el-collapse>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="resetSetup">恢复默认设置</el-button>
      <el-button size="mini" type="primary" @click="submitFeeSetup">确 定</el-button>
      <el-button size="mini" @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from  '@/api/operation/orderManage'
import SelectType from '@/components/selectType/index'
import hotkeys from '@/utils/hotkeys'

export default {
  components: {
    SelectType
  },
  props: {
    dialogVisiblePerson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      feeData: [],
      // 用来搜索项
      query: "",
      sortOption: {
        group:'item',
        sort: true,
        dataIdAttr: ''
      },
      activeNames: ['setup1','setup2','setup3','setup4'],
      form: {
        "shipDefault": {
            "openOrderAndTransferInfo": "0",
            "aloneWindow": "0"
        },
        "printKey": {
            "printLibkey": "",
            "savePrintKey": "",
            "saveShipKey": "",
            "cleanKey": "",
            "printShipKey": ""
        },
        "shipSetKey": {
            "receiptType": "",
            "receiptNum": "",
            "handoverMode": "",
            "paymentMode": "",
            "transportMode": "",
            "businessType": ""
        }
      },
      "userId": 1
    }
  },
  mounted () {
    this.userId = this.otherinfo.id
  },
  methods: {
    close(done){
      this.$emit('update:dialogVisiblePerson', false)
      this.$emit('close')
      if(typeof done === 'function'){
        done()
      }
    },
    // 当打开设置窗口时，从后台获取最新的设置
    getPersonalSetup() {
      return OrderApi.getPersonalSetup(this.userId).then(res => {
        this.form = res
      })
    },
    // 重置
    resetSetup () {
      return OrderApi.resetPersonalSetup(this.userId).then(res => {
        this.$message('重置成功！')
        this.getPersonalSetup(this.userId)
        //this.close()
      })
    },
    // 提交修改
    submitFeeSetup() {
      let data = Object.assign({}, this.form)
      data.userId = this.userId
      return OrderApi.putPersonalSetup(data).then(res => {
        this.$message("修改成功！")
        this.$emit('success')
        this.close()
      })
    },
    // 显示按键对应键名
    showkeycode (type, e) {
      e.preventDefault()
      e.stopPropagation()
      console.log('showkeycode:', e)
      this.$set(this.form.printKey, type, hotkeys.getPressedKey(e))
      return false
    }
  }
}
</script>
<style lang="scss">
.personalPopSetup{
  .el-dialog__header, .el-dialog__footer{
    background: #eee;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 10px;
    position: relative;
    min-height: 300px;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .el-switch__label{
    color: #999;
    font-size: 12px;
  }
  .el-switch__label.is-active{
    color: #409EFF;
  }

  

  .el-select{
    width: 178px;
  }

  .setup-info-fee{
    height: 258px;
    overflow: auto;
  }
  .dragArea{

  }
  .list-complete-item{
    clear: both;
    overflow: hidden;
    padding: 3px 0;
    border: 1px solid #fff;

    .el-checkbox{
      float: left;
      width: 186px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .switch-box{
      float: right;
      width: 70px;
    }
  }
  .searchinput,.tip-info{
    position: absolute;
    width: 100%;
    left: 0;
  }
  .searchinput{
    top: 5px;
    width: 90%;
    left: 5%;
  }
  .tip-info{
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 20px;
    bottom: 0;
  }
  .sortable-ghost{
    border:1px dashed #f00;
    background: #ffe;
  }
}
</style>

