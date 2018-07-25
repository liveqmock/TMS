<template>
  <div class="system-setup">
    <div class="system-setup-table">
      <el-form :model="form" ref="ruleForm" :inline="true" label-position="right" size="mini">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="setup1">
          <template slot="title">
            单号规则
          </template>
          <!-- 运单号规则 -->
          <div class="clearfix setup-table">
            <div class="setup-left">运单号规则</div>
            <div class="setup-right">
              <el-form-item>
                <el-radio label="1" v-model="shipNo">手工输入</el-radio>
              </el-form-item>
              <el-form-item>
                <el-radio label="2" v-model="shipNo">2位年+2位月+2位日+按公司单号顺序自增</el-radio>
                <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip1" tabindex="-1">
                  <div slot="content">运单号至少4位，最多8位。</div>
                  <el-input v-numberOnly :disabled="shipNo !== '2'" v-model.trim="form.shipNo.companyNumberAutoIncrementByTwoYMDValue" auto-complete="off" @focus="tooltip1 = true" placeholder="如：0001" @blur="tooltip1 = false"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-radio label="3" v-model="shipNo">2位年+2位月+按公司单号顺序自增</el-radio>
                <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip2" tabindex="-1">
                  <div slot="content">运单号至少4位，最多8位。</div>
                  <el-input v-numberOnly :disabled="shipNo !== '3'" v-model.trim="form.shipNo.companyNumberAutoIncrementByTwoYMValue" auto-complete="off" @focus="tooltip2 = true" placeholder="如：0001" @blur="tooltip2 = false"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-radio label="4" v-model="shipNo">按公司单号顺序自增</el-radio>
                <el-tooltip effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip3" tabindex="-1">
                  <div slot="content">运单号至少6位，最多7位。</div>
                  <el-input v-numberOnly :disabled="shipNo !== '4'" v-model.trim="form.shipNo.companyNumberAutoIncrementValue" auto-complete="off" @focus="tooltip3 = true" placeholder="如：0001" @blur="tooltip3 = false"></el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipNo.systemNumberImmutable">不允许修改系统生成的单号</el-checkbox>
              </el-form-item>
            </div>
          </div>
          <!-- 货号规则 -->
          <div class="clearfix setup-table">
            <div class="setup-left">货号规则</div>
            <div class="setup-right">
              <el-form-item>
                <el-radio label="1" v-model="cargoNo">手工输入</el-radio>
              </el-form-item>
              <el-form-item>
                <el-radio label="2" v-model="cargoNo">运单号+件数</el-radio>
              </el-form-item>
              <el-form-item>
                <el-radio label="3" v-model="cargoNo">网点代码+运单号后</el-radio>
                <el-input :disabled="cargoNo !== '3'" v-model="form.cargoNo.orgIdAndShipNoAndNumberOfUnitsValue" placeholder=""></el-input>位+件数
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.cargoNo.systemNumberNotAllowUpdate">不允许修改系统生成的单号</el-checkbox>
              </el-form-item>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="setup2" title="运费合计规则">
          <!-- 运费合计规则 -->
          <div class="clearfix setup-table">
            <div class="setup-left">运费合计</div>
            <div class="setup-right">
              <el-form-item>
                <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipFee.shipFee">基本运费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.brokerageFee">回扣</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.productPrice">声明价值</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.deliveryFee">送货费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.pickupFee">提货费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.goupstairsFee">上楼费</el-checkbox>
              </el-form-item><el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.insuranceFee">保险费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.handlingFee">装卸费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.packageFee">包装费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.forkliftCharge">叉车费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.customsFee">报关费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.commissionFee">代收款手续费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.taxes">税金</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.housingFee">入仓费</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.stampTax">印花税</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipFee.otherFee">其他费用</el-checkbox>
              </el-form-item>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="setup3" title="运单功能设置">
          <!-- 运单页面 -->
          <div class="clearfix setup-table">
            <div class="setup-left">运单页面</div>
            <div class="setup-right">
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipPageFunc.toCityByAdministrativeRegion">到达城市必须选择到行政区</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox true-label="1" false-label="0" v-model="form.shipPageFunc.shipFieldSign">运单字段设置</el-checkbox>
                <!-- <el-select :disabled="form.shipPageFunc.shipFieldSign !== '1'" v-model="value" multiple placeholder="请选择">
                  <el-option
                    v-for="(item, index) in shipField"
                    :key="item.key"
                    :label="item.name"
                    :class="{theSelectfirst: index === 0}"
                    :value="item.value">
                    <div class="selectHeader" v-if="index === 0"><span style="float: left">字典名称</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">必填</span></div>
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      <el-checkbox true-label="1" false-label="0" v-model="shipField[index][item.key]"></el-checkbox>
                    </span>
                  </el-option>
                </el-select> -->
                <el-select :disabled="form.shipPageFunc.shipFieldSign !== '1'" v-model="fieldSetup" collapse-tags multiple placeholder="请选择">
                  <el-option
                    v-for="(item, index) in shipField"
                    :key="item.key"
                    :label="item.name"
                    :class="{theSelectfirst: index === 0}"
                    :value="item.key">
                    <div class="selectHeader" @click.prevent.stop v-if="index === 0"><span style="float: left">字典名称</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">必填</span></div>
                    <span style="float: left">{{ item.name }}</span>
                  </el-option>
                </el-select>
                <!-- shipField -->
              </el-form-item>
              <el-form-item>
                开单时间规则
                <SelectType type="ship_time_rule" v-model="form.shipPageFunc.shipTimeRule">
                </SelectType>
              </el-form-item>
              <el-form-item>
                通知放货规则
                <SelectType type="notify_cargo_rule" v-model="form.shipPageFunc.notifyCargoRule" >
                </SelectType>
              </el-form-item>
            </div>
          </div>
          <!-- 运单权限 -->
          <div class="clearfix setup-table">
            <div class="setup-left">运单权限</div>
            
            <div class="setup-right">
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyUpdateOwnShip">只能修改自己开的运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyInvalidOwnShip">只能作废自己开的运单</el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-checkbox true-label="1" false-label="0" v-model="form.shipPermission.onlyDeleteOwnShip">只能删除自己开的运单</el-checkbox>
                </el-form-item>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="setup4" title="打印设置">
          <div class="clearfix setup-table">
            <div class="setup-left">打印设置</div>
            <div class="setup-right">
              <el-form-item>
                运单
                <el-input v-model="form.printSetting.ship" placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                标签
                <el-input v-model="form.printSetting.label" placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                清单
                <el-input v-model="form.printSetting.inventory" placeholder=""></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      </el-form>
    </div>
    <div class="system-setup-footer">
      <el-button type="primary" @click="saveData" :disabled="nochange">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getAllSetting, putSetting, putResetSetting } from '@/api/company/systemSetup'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    SelectType
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      // 表单项
      shipNo: '',
      cargoNo: '',
      nochange: true,
      tooltip1: false,
      tooltip2: false,
      tooltip3: false,
      fieldSetup: [],
      activeNames: ['setup1', 'setup2', 'setup3', 'setup4'],
      shipField: [
        {
          key: 'shipFromCityName',
          value: '0',
          name: '出发城市'
        },
        {
          key: 'shipToOrgid',
          value: '0',
          name: '目的网点'
        },
        {
          key: 'shipGoodsSn',
          value: '0',
          name: '货号'
        },
        {
          key: 'shipSenderId',
          value: '0',
          name: '发货方'
        },
        {
          key: 'shipSenderAddress',
          value: '0',
          name: '发货地址'
        },
        {
          key: 'shipReceiverId',
          value: '0',
          name: '收货方'
        },
        {
          key: 'shipReceiverAddress',
          value: '0',
          name: '收货地址'
        },
        {
          key: 'cargoWeight',
          value: '0',
          name: '重量'
        },
        {
          key: 'cargoVolume',
          value: '0',
          name: '体积'
        },
        {
          key: 'cargoPack',
          value: '0',
          name: '包装'
        },
        {
          key: 'brokerageFee',
          value: '0',
          name: '回扣'
        },
        {
          key: 'deliveryFee',
          value: '0',
          name: '送货费'
        },

        {
          key: 'productPrice',
          value: '0',
          name: '声明价值'
        },
        {
          key: 'insuranceFee',
          value: '0',
          name: '保险费'
        },
        {
          key: 'handlingFee',
          value: '0',
          name: '装卸费'
        },
        {
          key: 'packageFee',
          value: '0',
          name: '包装费'
        },
        {
          key: 'pickupFee',
          value: '0',
          name: '提货费'
        },
        {
          key: 'amountFee',
          value: '0',
          name: '件数单价'
        },
        {
          key: 'weightFee',
          value: '0',
          name: '重量单价'
        },
        {
          key: 'volumeFee',
          value: '0',
          name: '体积单价'
        },
        {
          key: 'shipReceiptSn',
          value: '0',
          name: '回单号'
        },
        {
          key: 'shipCustomerNumber',
          value: '0',
          name: '客户单号'
        },
        {
          key: 'shipUserid',
          value: '0',
          name: '制单员'
        }
      ],
      form: {
        'printSetting': {
          'ship': '0',
          'label': '0',
          'inventory': '0'
        },
        'shipNo': {
          'manualInput': '0',
          'companyNumberAutoIncrementSign': '0',
          'companyNumberAutoIncrementByTwoYMSign': '1',
          'companyNumberAutoIncrementByTwoYMDSign': '0',
          'systemNumberImmutable': '0',
          'companyNumberAutoIncrementValue': '',
          'companyNumberAutoIncrementByTwoYMValue': '',
          'companyNumberAutoIncrementByTwoYMDValue': ''
        },
        'shipPermission': {
          'onlyInvalidOwnShip': '0',
          'onlyUpdateOwnShip': '0',
          'onlyDeleteOwnShip': '0'
        },
        'module': 'order',
        'cargoNo': {
          'orgIdAndShipNoAndNumberOfUnitsSign': '0',
          'manualInput': '0',
          'systemNumberNotAllowUpdate': '0',
          'orgIdAndShipNoAndNumberOfUnitsValue': '',
          'shipNoAndNumberOfUnits': '1'
        },
        'shipFee': {
          'customsFee': '0',
          'commissionFee': '0',
          'handlingFee': '1',
          'otherFee': '0',
          'brokerageFee': '1',
          'goupstairsFee': '0',
          'taxes': '0',
          'shipFee': '1',
          'housingFee': '0',
          'deliveryFee': '1',
          'insuranceFee': '0',
          'forkliftCharge': '1',
          'pickupFee': '1',
          'stampTax': '0',
          'productPrice': '0',
          'packageFee': '0'
        },
        'shipPageFunc': {
          'shipFieldValue': {
            'cargoPack': '0',
            'shipReceiptSn': '0',
            'shipGoodsSn': '0',
            'amountFee': '0',
            'shipToOrgid': '0',
            'handlingFee': '0',
            'brokerageFee': '0',
            'volumeFee': '0',
            'weightFee': '0',
            'shipFromCityName': '0',
            'cargoVolume': '0',
            'shipCustomerNumber': '0',
            'shipSenderId': '0',
            'shipSenderAddress': '0',
            'shipUserid': '0',
            'deliveryFee': '0',
            'insuranceFee': '0',
            'shipReceiverId': '0',
            'cargoWeight': '0',
            'pickupFee': '0',
            'shipReceiverAddress': '0',
            'productPrice': '0',
            'packageFee': '0'
          },
          'toCityByAdministrativeRegion': '0',
          'notifyCargoRule': '',
          'shipTimeRule': '',
          'shipFieldSign': '0'
        },
        'orgid': 1
      }
    }
  },
  mounted() {
    this.getInfo('order').then(() => {
      this.setShipNo()
      this.setCargoNo()
      this.initField()
      // 加载好后才可以提交数据
      this.nochange = false
    })
  },
  methods: {
    getInfo(module, type = '') {
      return getAllSetting({
        orgid: this.otherinfo.orgid,
        type,
        module
      }).then(data => {
        this.form = data
        this.form.shipPageFunc.shipTimeRule = parseInt(this.form.shipPageFunc.shipTimeRule, 10)
        this.form.shipPageFunc.notifyCargoRule = parseInt(this.form.shipPageFunc.notifyCargoRule, 10)
      })
    },
    setShipNo() {
      if (this.form.shipNo.manualInput === '1') {
        this.shipNo = '1'
      }
      if (this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign === '1') {
        this.shipNo = '2'
      }
      if (this.form.shipNo.companyNumberAutoIncrementByTwoYMSign === '1') {
        this.shipNo = '3'
      }
      if (this.form.shipNo.companyNumberAutoIncrementSign === '1') {
        this.shipNo = '4'
      }
    },
    setCargoNo() {
      if (this.form.cargoNo.manualInput === '1') {
        this.cargoNo = '1'
      }
      if (this.form.cargoNo.shipNoAndNumberOfUnits === '1') {
        this.cargoNo = '2'
      }
      if (this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign === '1') {
        this.cargoNo = '3'
      }
    },
    resetShipNo() {
      this.form.shipNo.manualInput = '0'
      this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign = '0'
      this.form.shipNo.companyNumberAutoIncrementByTwoYMSign = '0'
      this.form.shipNo.companyNumberAutoIncrementSign = '0'
    },
    resetCargoNo() {
      this.form.cargoNo.manualInput = '0'
      this.form.cargoNo.shipNoAndNumberOfUnits = '0'
      this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign = '0'
    },
    saveData() {
      return putSetting(this.form).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    initField() {
      for (const i in this.form.shipPageFunc.shipFieldValue) {
        if (this.form.shipPageFunc.shipFieldValue[i] === '1') {
          this.fieldSetup.push(i)
        }
      }
    },
    setField() {
      for (const i in this.form.shipPageFunc.shipFieldValue) {
        if (this.fieldSetup.indexOf(i) !== -1) {
          this.form.shipPageFunc.shipFieldValue[i] = '1'
        } else {
          this.form.shipPageFunc.shipFieldValue[i] = '0'
        }
      }
    }
  },
  watch: {
    fieldSetup(newVal) {
      this.setField()
    },
    shipNo(newVal) {
      // 先重置
      this.resetShipNo()
      switch (newVal) {
        case '1':
          this.form.shipNo.manualInput = '1'
          break
        case '2':
          this.form.shipNo.companyNumberAutoIncrementByTwoYMDSign = '1'
          break
        case '3':
          this.form.shipNo.companyNumberAutoIncrementByTwoYMSign = '1'
          break
        case '4':
          this.form.shipNo.companyNumberAutoIncrementSign = '1'
          break
      }
    },
    cargoNo(newVal) {
      // 先重置
      this.resetCargoNo()
      switch (newVal) {
        case '1':
          this.form.cargoNo.manualInput = '1'
          break
        case '2':
          this.form.cargoNo.shipNoAndNumberOfUnits = '1'
          break
        case '3':
          this.form.cargoNo.orgIdAndShipNoAndNumberOfUnitsSign = '1'
          break
      }
    }
  }
}
</script>

<style lang="scss">
.system-setup{
    display: flex;
    flex-direction:column;
    position: relative;
    height: 100%;

    .system-setup-table{
      flex-grow: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 10px 10px 0 10px;

      .el-collapse{
        border: 1px solid #E0E0E0;
      }

      .el-collapse-item__header{
        background: #E9F3FA;
        text-align: center;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        color: #333;
        position: relative;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .el-collapse-item__arrow{
        position: absolute;
        left: 32px;
        top: 0;
      }
      .el-collapse-item__content{
        padding-bottom: 0;
      }

      .el-form-item__content>.el-input{
        width: 100px;
      }

      .el-form-item--mini.el-form-item{
        margin-bottom: 5px;
      }

      .setup-table{
        margin: 0 0 10px;
        min-height: 64px;
        display: flex;

        .setup-left{
          width: 144px;
          text-align: center;
          background: #EBEBEB;
          padding-top: 20px;
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }

        .setup-right{
          padding: 16px;
          flex:1;
        }
      }
    }

    .system-setup-footer{
      height: 70px;
      text-align: center;
    }

    
}
.theSelectfirst{
  height: 70px;
}
.selectHeader{
  color: #999;
  clear: both;
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
  height: 34px;
}
.el-select-dropdown__item.selected{
  .selectHeader{
    font-weight: normal;
  }
}
</style>
