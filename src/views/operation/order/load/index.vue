<template>
  <div class="load-steup">
    <!-- 新增配载 loadTypeId：38-短驳 39-干线 40-送货 -->
    <div class="load-steup-form" v-loading="loading">
      <el-collapse v-model="loadTruck">
        <el-collapse-item name="loadTruckOne">
          <template slot="title">
            车辆信息&nbsp; <b>{{loadTypeId===40?'送货':'发车'}}批次：{{truckMessage}} <span v-if="loadTypeId===39">合同编号：{{contractNo}}</span></b>
          </template>
          <div class=" loadFrom clearfix">
            <el-form :model="formModel" :size="mini" ref="formModel" class="demo-form-inline" label-width="110px" :rules="formModelRules">
              <div class="loadFrom-type">
                <el-checkbox v-if="loadTypeId === 39" v-model="isDirectDelivery" @change="changeDirect">直送</el-checkbox>
              </div>
              <!-- 基本信息 -->
              <el-row :gutter="4">
                <el-col :span="6">
                  <el-form-item label="送货费" prop="deliveryFee" v-if="loadTypeId===40">
                    <el-input size="mini" v-model="formModel.deliveryFee" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="短驳费" prop="shortFee" v-if="loadTypeId===38">
                    <el-input size="mini" v-model="formModel.shortFee" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="到达网点" prop="arriveOrgid" v-if="loadTypeId!==40">
                    <SelectTree v-model="formModel.arriveOrgid" clearable size="mini" :disabled="isDirectDelivery">
                    </SelectTree>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分摊方式" prop="apportionTypeId">
                    <selectType v-model="formModel.apportionTypeId" type="apportion_type" clearable size="mini"></selectType>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车牌号码" prop="truckIdNumber">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="handleSelectTruck">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addTruck')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.truckIdNumber }}</div>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机名称" prop="dirverName">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.dirverName" :fetch-suggestions="querySearch" placeholder="司机名称" size="mini" @select="handleSelect">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addDriver')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.driverName }}</div>
                        <span class="addr">{{ item.driverMobile? item.driverMobile : '无手机号码' }}</span>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机电话" prop="dirverMobile">
                    <el-input size="mini" v-model="formModel.dirverMobile" placeholder="司机电话">
                      <i slot="suffix" class="el-input__icon el-icon-plus" @click="doAction('addDriver')"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载重量" prop="truckLoad">
                    <el-input size="mini" v-model.number="formModel.truckLoad" placeholder="可载重量" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载体积" prop="truckVolume">
                    <el-input size="mini" v-model.number="formModel.truckVolume" placeholder="可载体积" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="loadTimeFormName">
                    <el-date-picker size="mini" v-model="formModel.loadTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="loadTimeFormName">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="要求到达日期">
                    <el-date-picker size="mini" v-model="formModel.requireArrivedTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="要求到达日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="18" v-if="loadTypeId !== 38">
                  <el-form-item label="备注">
                    <el-input size="mini" type="textarea" :rows="2" v-model="formModel.remark"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-else>
                  <el-form-item label="备注">
                    <el-input size="mini" type="textarea" :rows="2" v-model="formModel.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 费用参数 -->
            <el-form label-width="0px" :model="formFee" :rules="formFeeRules" ref="formFee" v-if="loadTypeId===39">
              <ul class="feeList">
                <li>
                  <p>现付运费</p>
                  <el-form-item prop="nowpayCarriage">
                    <el-input v-model="formFee.nowpayCarriage" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>现付油卡</p>
                  <el-form-item prop="nowpayOilCard">
                    <el-input v-model="formFee.nowpayOilCard" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>回付运费</p>
                  <el-form-item prop="backpayCarriage">
                    <el-input v-model="formFee.backpayCarriage" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>回付油卡</p>
                  <el-form-item prop="backpayOilCard">
                    <el-input v-model="formFee.backpayOilCard" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到付运费</p>
                  <el-form-item prop="arrivepayCarriage">
                    <el-input v-model="formFee.arrivepayCarriage" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到付油卡</p>
                  <el-form-item prop="arrivepayOilCard">
                    <el-input v-model="formFee.arrivepayOilCard" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>整车保险费</p>
                  <el-form-item prop="carloadInsuranceFee">
                    <el-input v-model="formFee.carloadInsuranceFee" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>发站装卸费</p>
                  <el-form-item prop="leaveHandlingFee">
                    <el-input v-model="formFee.leaveHandlingFee" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>发站其他费</p>
                  <el-form-item prop="leaveOtherFee">
                    <el-input v-model="formFee.leaveOtherFee" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到站装卸费</p>
                  <el-form-item prop="arriveHandlingFee">
                    <el-input v-model="formFee.arriveHandlingFee" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到站其他费</p>
                  <el-form-item prop="arriveOtherFee">
                    <el-input v-model="formFee.arriveOtherFee" maxlength="10" :size="mini"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 操作按钮区 -->
      <div class="load_btn_boxs">
        <el-button size="mini" icon="el-icon-sort" plain type="primary" @click="doAction('precent')">配载率</el-button>
        <el-button size="mini" icon="el-icon-edit-outline" plain type="primary" @click="doAction('finish')">完成配载</el-button>
        <el-button size="mini" icon="el-icon-circle-check-outline" plain type="primary" @click="doAction('finishTruck')" v-if='loadTypeId===40? false:true '>完成并发车</el-button>
      </div>
      <!-- 配载率 -->
      <loadChart :info="loadInfoPercent" :truckInfo="loadTruckInfo" :popVisible.sync="showRightTablePercent"></loadChart>
      <!-- 穿梭框 -->
      <dataTable @loadTable="getLoadTable" :setLoadTable="setLoadTableList" :isModify="isEdit" @change="getTableChange"></dataTable>
      <!-- 添加车辆信息 -->
      <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getBatchNo, getSelectAddLoadRepertoryList, postLoadInfo, getUpdateRepertoryLeft, getUpdateRepertoryRight, putLoadInfo } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getAllTrunk } from '@/api/company/trunkManage'
import selectType from '@/components/selectType/index'
import dataTable from './components/dataTable'
import SelectTree from '@/components/selectTree/index'
import addTruckInfo from './components/addTruckInfo'
import addDriverInfo from './components/addDriverInfo'
import loadChart from './components/loadChart'
import { objectMerge2, parseTime } from '@/utils/index'
import { getSystemTime } from '@/api/common'
export default {
  data() {
    const validateInt = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.ONLY_NUMBER_GT.test(value)) {
        callback()
      } else {
        callback(new Error('请输入整数'))
      }
    }
    const validateBigDecimal = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.FLOAT2ING.test(value)) {
        callback()
      } else {
        callback(new Error('请输入最多两位小数'))
      }
    }
    const validateFormMobile = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    const validateStringEight = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (value.length > 8) {
        callback(new Error('不能超过8个字符'))
      } else {
        callback()
      }
    }
    const validateStringTen = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (value.length > 10) {
        callback(new Error('不能超过10个字符'))
      } else {
        callback()
      }
    }
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      contractNo: '',
      formModel: {
        orgid: ''
      },
      isDirectDelivery: false,
      formFee: {},
      loadTruck: 'loadTruckOne',
      showRightTablePercent: false,
      loading: false,
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: [],
      loadTableInfo: [],
      loadInfoPercentOrg: [],
      mini: 'mini',
      loadInfo: {
        tmsOrderLoad: {},
        tmsOrderLoadDetailsList: [],
        tmsOrderLoadFee: {}
      },
      setLoadTableList: {
        left: [],
        right: []
      },
      // orgData: {},
      isEdit: false,
      isModify: false,
      addTruckVisible: false,
      truckSources: [],
      truckTypes: [],
      selectInfo: {},
      licenseTypes: [],
      isModifyDriver: false,
      selectInfoDriver: {},
      addDriverVisible: false,
      DriverList: [],
      TruckList: [],
      cacheDriverList: {},
      cacheTruckList: {},
      Drivers: [],
      Trucks: [],
      submitvalidate: false,
      // loadTypeId: 38,
      batchTypeIdFinish: 47,
      batchTypeIdFinishTruck: 48,
      inited: false,
      formModelRules: {
        // arriveOrgid: [{ required: true, trigger: 'change', message: '非直送不能为空' }],
        apportionTypeName: [{ required: true, trigger: 'change', message: '必选' }],
        truckIdNumber: [{ required: true, trigger: 'change', validator: validateStringEight }],
        dirverName: [{ required: true, trigger: 'change', validator: validateStringTen }],
        dirverMobile: [{ required: true, trigger: 'change', validator: validateFormMobile }]
      },
      formFeeRules: {
        nowpayCarriage: [{ required: true, trigger: 'change', validator: validateInt }],
        nowpayOilCard: [{ required: true, trigger: 'change', validator: validateInt }],
        backpayCarriage: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        backpayOilCard: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        arrivepayCarriage: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        arrivepayOilCard: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        carloadInsuranceFee: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        leaveHandlingFee: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        leaveOtherFee: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        arriveHandlingFee: [{ required: true, trigger: 'change', validator: validateBigDecimal }],
        arriveOtherFee: [{ required: true, trigger: 'change', validator: validateBigDecimal }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    arriveOrgid(newVal) {
      this.formModel.arriveOrgid = newVal
    },
    orgid() {},
    loadTruckInfo() {
      let data = Object.assign({}, this.formModel)
      if (!data.truckLoad) {
        this.$set(data, 'truckLoad', 0)
      }
      if (!data.truckVolume) {
        this.$set(data, 'truckVolume', 0)
      }
      return data
    },
    loadInfoPercent() {
      let data = Object.assign([], this.loadInfoPercentOrg)
      return data
    },
    loadTimeFormName() {
      return (this.loadTypeId === 38 ? '短驳' : (this.loadTypeId === 39 ? '配载' : '送货')) + '日期'
    },
    typeid() {
      return Number(this.$route.query.loadTypeId)
    },
    loadTypeId() {
      return Number(this.$route.query.loadTypeId)
    },
    orgData: {
      get() {
        console.log(this.$route)
        return this.$route.query.info
      },
      set() {}
    }
  },
  components: {
    selectType,
    dataTable,
    SelectTree,
    addTruckInfo,
    addDriverInfo,
    loadChart
  },
  created() {
    this.setLoadTypeId()
  },
  mounted() {

  },
  activated() {
    this.init()
    this.getSystemTime()
  },
  methods: {
    init() {

      this.formModel = {}
      this.$refs['formModel'].resetFields()
      this.setLoadTypeId()
      this.initIsEdit()

      this.formModel.orgid = this.orgid
      this.DriverList = this.Drivers
      this.TruckList = this.Trucks
      this.getSelectAddLoadRepertoryList()
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    getTableChange(obj) {
      this.loadInfoPercentOrg = objectMerge2([], obj)
      this.loadTableInfo = obj
    },
    /**
     * load_type_id：配载类型（字典表38-40）
     * batch_type_id：批次状态（字典表46-58，短驳和干线配载完就是已装车，短驳发车是短驳中，干线发车是在途中，送货为送货中）
     */
    setLoadTypeId() {
      let typeid = Number(this.$route.query.loadTypeId)
      if (typeid) {
        // this.loadTypeId = typeid
        switch (typeid) {
          case 38: // 短驳
            this.batchTypeIdFinish = 47 // 完成配载
            this.batchTypeIdFinishTruck = 48 // 配载并发车
            console.log('短驳38', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
          case 39: // 干线
            this.batchTypeIdFinish = 52
            this.batchTypeIdFinishTruck = 53
            console.log('干线39', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
          case 40: // 送货
            this.batchTypeIdFinish = 57
            this.batchTypeIdFinishTruck = 57
            console.log('送货40', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
            break
        }
      } else {
        this.loadTypeId = 38 // 默认是新增短驳
        this.batchTypeIdFinish = 47 // 完成配载
        this.batchTypeIdFinishTruck = 48 // 配载并发车
        console.log('默认38', this.loadTypeId, this.batchTypeIdFinish, this.batchTypeIdFinishTruck)
      }
    },
    initIsEdit() {
      // this.orgData = JSON.parse(JSON.stringify(this.$data.orgData))
      // this.formFee = JSON.parse(JSON.stringify(this.$data.formFee))
      this.orgData = objectMerge2({}, this.$options.data().orgData)
      this.formFee = objectMerge2({}, this.$options.data().orgData)

      if (this.$route.query.info) {
        this.orgData = this.$route.query.info
        this.isEdit = true
        this.truckMessage = this.orgData.batchNo
        this.contractNo = this.orgData.contractNo
        // formModel 数据
        let data = {}
        data.id = this.orgData.id
        data.orgid = this.orgData.orgid
        data.batchNo = this.orgData.batchNo
        data.arriveOrgid = this.orgData.orgid
        data.loadTypeId = this.loadTypeId
        data.batchTypeId = this.batchTypeIdFinish
        data.apportionTypeId = this.orgData.apportionTypeId
        data.truckIdNumber = this.orgData.truckIdNumber
        data.dirverName = this.orgData.dirverName
        data.dirverMobile = this.orgData.dirverMobile
        data.truckLoad = this.orgData.truckLoad
        data.truckVolume = this.orgData.truckVolume
        data.loadTime = this.orgData.loadTime
        data.shortFee = this.orgData.shortFee
        data.requireArrivedTime = this.orgData.requireArrivedTime
        data.remark = this.orgData.remark
        data.deliveryFee = this.orgData.deliveryFee // 送货费 40-送货管理修改的时候用
        this.formModel = objectMerge2({}, data)
        // formFee 数据
        let dataFee = {}
        dataFee.nowpayCarriage = this.orgData.nowpayCarriage
        dataFee.nowpayOilCard = this.orgData.nowpayOilCard
        dataFee.backpayCarriage = this.orgData.backpayCarriage
        dataFee.backpayOilCard = this.orgData.backpayOilCard
        dataFee.arrivepayCarriage = this.orgData.arrivepayCarriage
        dataFee.arrivepayOilCard = this.orgData.arrivepayOilCard
        dataFee.carloadInsuranceFee = this.orgData.carloadInsuranceFee
        dataFee.leaveHandlingFee = this.orgData.leaveHandlingFee
        dataFee.leaveOtherFee = this.orgData.leaveOtherFee
        dataFee.arriveHandlingFee = this.orgData.arriveHandlingFee
        dataFee.arriveOtherFee = this.orgData.arriveOtherFee
        this.formFee = objectMerge2({}, dataFee)

      } else {
        this.orgData = objectMerge2({}, this.$options.data().orgData)
        this.isEdit = false
        this.getLoadNo()
      }
    },
    getLoadNo() {
      getBatchNo(this.otherinfo.orgid, this.loadTypeId).then(data => {
        this.truckMessage = data.text // 批次号
        this.contractNo = data.text // 合同编号？？？？？
      })
    },
    getSystemTime() { // 获取系统时间
      if (!this.isEdit) {
        return getSystemTime().then(data => {
          console.log('systemTime', data)
          this.$nextTick(() => {
            this.formModel.requireArrivedTime = new Date(data.trim())
            this.formModel.loadTime = new Date(data.trim())
          })
        })
      }
    },
    getSelectAddLoadRepertoryList() {
      if (this.isEdit) {
        this.getUpdateRepertoryLeft()
        this.getUpdateRepertoryRight()
      } else {
        getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
          this.leftTable = data.data
          console.log('不修改 ')
        })
      }
    },
    changeTableKey() {
      this.tablekey = Math.random()
    },
    doAction(type) {
      switch (type) {
        case 'reset':
          this.$nextTick(() => {
            this.resetFieldsForm()
          })
          break
        case 'precent': // 设置配载率
          this.showPercent()
          break
        case 'finish': // 完成配载
          this.$confirm('此操作将完成配载, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.finishLoadInfo()
          })
          break
        case 'finishTruck': // 完成并发车
          this.$confirm('此操作将完成并发车, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.finishTruckInfo()
          })
          break
        case 'addTruck': // 添加车辆信息
          this.addTruck()
          break
        case 'addDriver': // 添加司机信息
          this.addDriver()
          break
      }
    },
    showPercent() {
      this.showRightTablePercent = true
    },
    formValidate() { // 判断表单验证
      console.log(this.formModel, this.formFee)
      this.$refs['formModel'].validate((valid) => {
        if (valid && this.loadTypeId === 39) {
          this.$refs['formFee'].validate((validFee) => {
            if (validFee) {
              if (this.loadTableInfo.length < 1) {
                this.submitvalidate = false
                this.$message({ type: 'warning', message: '右边数据表格不能为空' })
              } else {
                this.submitvalidate = true
              }
            } else {
              this.$message({ type: 'warning', message: '请填写完整费用表单' })
              this.submitvalidate = false
            }
          })
        } else if (valid && this.loadTypeId !== 39) {
          this.submitvalidate = true
        } else {
          this.$message({ type: 'warning', message: '请填写完整表单' })
          this.submitvalidate = false
        }
      })
    },
    gotoPage() { // 操作成功后跳转回到配载列表页面
      switch (this.loadTypeId) {
        case 38: // 短驳
          this.$router.push({ path: '././shortDepart' })
          break
        case 39: // 干线
          this.$router.push({ path: '././arteryDepart' })
          break
        case 40: // 送货
          this.$router.push({ path: '././deliverManage' })
          break
      }
    },
    finishLoadInfo() {
      this.formValidate() // 表单验证
      if (this.submitvalidate) {
        this.setData() // 处理数据
        this.$nextTick(() => {
          if (this.isEdit) {
            console.log('这里是编辑完成配载', this.loadInfo)
            putLoadInfo(this.loadInfo).then(data => {
              this.$message({ type: 'success', message: '修改配载信息成功' })
              this.resetFieldsForm()
              this.$nextTick(() => {
                this.gotoPage() // 操作成功后跳转到配载列表页面
              })
            })
          } else {
            console.log('这里是添加完成配载', this.loadInfo)
            postLoadInfo(this.loadInfo).then(data => { // 插入配载信息
              this.$message({ type: 'success', message: '插入配载信息成功' })
              this.resetFieldsForm()
              this.$nextTick(() => {
                this.gotoPage()
              })
            })
          }
        })
      }
    },
    finishTruckInfo() {
      this.formValidate() // 表单验证
      if (this.submitvalidate) {
        this.setDataFinishTruck() // 处理数据
        this.$nextTick(() => {
          postLoadInfo(this.loadInfo).then(data => { // 完成并发车
            this.$message({ type: 'success', message: '操作成功' })
            this.resetFieldsForm()
            this.$nextTick(() => {
              this.gotoPage() // 操作成功后跳转到配载列表页面
            })
          })
        })
      }
    },
    getLoadTable(obj) { // 获取穿梭框表格数据列表
      this.loadInfoPercentOrg = objectMerge2([], obj)
      this.loadTableInfo = obj
    },
    resetFieldsForm() { // resetFields表单验证
      const formName = ['formModel', 'formFee']
      const loadtypeid = this.loadTypeId
      objectMerge2(this.$data, this.$options.data())
      this.$nextTick(() => {
        if (loadtypeid === 39) { // 只有39-干线有表单formFee，38-短驳费 40-送货费
          formName.forEach(e => {
            this.$refs[e].resetFields()
          })
        } else {
          this.$refs[formName[0]].resetFields()
        }
      })
      if (loadtypeid) {
        this.$router.push({ path: '././load', query: { loadTypeId: loadtypeid } })
      } else {}
      this.init()
    },
    changeDirect(newVal) { // true-直送 false-不直送
      if (newVal) { // 如果直送就不用选择网点
        this.formModel.arriveOrgid = ''
      } else { // 不直送要判断网点
        if (this.isEdit) { // 编辑配载信息时
          this.formModel.arriveOrgid = this.orgData.orgid
        } else { // 添加配载信息时
          this.formModel.arriveOrgid = ''
        }
      }
      console.log(newVal, this.formModel.arriveOrgid)
    },
    setData() { // 完成配载 ：处理数据格式。。。
      this.setLoadTypeId()
      if (this.isEdit) { // 编辑配载信息时
        this.$set(this.formModel, 'orgid', this.orgData.orgid)
      } else { // 添加配载信息时
        this.$set(this.formModel, 'orgid', this.otherinfo.orgid)
      }
      this.$set(this.formModel, 'batchNo', this.truckMessage)
      this.$set(this.formModel, 'loadTypeId', this.loadTypeId)
      this.$set(this.formModel, 'batchTypeId', this.batchTypeIdFinish)
      this.loadInfo.tmsOrderLoadFee = objectMerge2({}, this.formFee)
      this.loadInfo.tmsOrderLoad = objectMerge2({}, this.formModel)
      this.loadInfo.tmsOrderLoadDetailsList = objectMerge2([], this.loadTableInfo)
      if (this.loadTypeId === 40) {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryFee', this.formModel.deliveryFee)
      } else {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'shortFee', this.formModel.shortFee)
      }

      // 时间处理
      this.loadInfo.tmsOrderLoad.loadTime = parseTime(this.loadInfo.tmsOrderLoad.loadTime)
      this.loadInfo.tmsOrderLoad.requireArrivedTime = parseTime(this.loadInfo.tmsOrderLoad.requireArrivedTime)
    },
    setDataFinishTruck() { // 完成并发车 ：处理数据格式。。。
      this.$set(this.formModel, 'batchNo', this.truckMessage)
      this.$set(this.formModel, 'orgid', this.otherinfo.orgid)
      this.$set(this.formModel, 'loadTypeId', this.loadTypeId) // 配载类型：38-短驳 39-干线 40-送货
      this.$set(this.formModel, 'batchTypeId', this.batchTypeIdFinishTruck) // 批次状态： 干线(52已装车,53在途中)
      this.loadInfo.tmsOrderLoadFee = objectMerge2({}, this.formFee)
      this.loadInfo.tmsOrderLoad = objectMerge2({}, this.formModel)
      this.loadInfo.tmsOrderLoadDetailsList = objectMerge2([], this.loadTableInfo)
      if (this.loadTypeId === 40) {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'deliveryFee', this.formModel.deliveryFee)
      } else {
        this.$set(this.loadInfo.tmsOrderLoadFee, 'shortFee', this.formModel.shortFee)
      }
      // console.log('短驳完成发车', this.loadInfo)
      // 时间处理
      this.loadInfo.tmsOrderLoad.loadTime = parseTime(this.loadInfo.tmsOrderLoad.loadTime)
      this.loadInfo.tmsOrderLoad.requireArrivedTime = parseTime(this.loadInfo.tmsOrderLoad.requireArrivedTime)
    },
    getUpdateRepertoryLeft() { // 修改时 左边的数据列表
      console.log('left', this.orgData.orgid)
      if (this.orgData.orgid) {
        getUpdateRepertoryLeft(this.orgData.orgid, this.orgData.loadId).then(data => {
          this.$set(this.setLoadTableList, 'left', data.data)
          // this.setLoadTableList.left = objectMerge2([], data.data)
          console.log('修改ing左边列表', this.setLoadTableList.left)
        })
      }
      return this.setLoadTableList
    },
    getUpdateRepertoryRight() { // 修改时 右边的数据列表
      console.log('right', this.orgData.orgid)
      if (this.orgData.orgid) {
        getUpdateRepertoryRight(this.orgData.orgid, this.orgData.loadId).then(data => {
          this.$set(this.setLoadTableList, 'right', data.data)
          // this.setLoadTableList.right = objectMerge2([], data.data)
          console.log('修改ing右边列表', this.setLoadTableList.right)
        })
      }
      return this.setLoadTableList
    },
    addTruck() { // 添加车辆信息
      this.addTruckVisible = true
    },
    addDriver() { // 添加司机信息
      this.infoDriver = {}
      this.addDriverVisible = true
    },
    fetchData() {},
    closeAddDriver() {
      this.addDriverVisible = false
    },
    closeAddTruckVisible() {
      this.addTruckVisible = false
    },
    initInfo() {
      this.loading = false
      this.getTreeOrgid(this.otherinfo.orgid)
    },
    getTreeOrgid(orgid) {
      // 切换组织了列表时更新司机列表信息
      this.getDrivers(orgid)
      this.getTrucks(orgid)
    },
    getDrivers(orgid) {
      if (this.cacheDriverList[orgid]) {
        this.Drivers = this.cacheDriverList[orgid]
      } else {
        getAllDriver({
          "currentPage": 1,
          "pageSize": 200,
          "vo": {
            "orgid": orgid
          }
        }).then(data => {
          this.Drivers = data.list
          this.cacheDriverList[orgid] = data.list
        })
      }
    },
    getTrucks(orgid) {
      if (this.cacheTruckList[orgid]) {
        this.Trucks = this.cacheTruckList[orgid]
      } else {
        getAllTrunk({
          "currentPage": 1,
          "pageSize": 200,
          "vo": {
            "orgid": orgid
          }
        }).then(data => {
          this.Trucks = data.list
          this.cacheTruckList[orgid] = data.list
        })
      }
    },
    handleSelect(item) {
      this.formModel.dirverMobile = item.driverMobile
      this.formModel.dirverName = item.driverName
    },
    handleSelectTruck(item) {
      this.formModel.truckIdNumber = item.truckIdNumber

    },
    querySearch(queryString, cb) {
      let driverList = this.Drivers
      let results = queryString ? driverList.filter(this.createFilter(queryString)) : driverList
      // 调用 callback 返回司机列表的数据
      cb(results)
    },
    querySearchTruck(queryString, cb) {
      let truckList = this.Trucks
      let results = queryString ? truckList.filter(this.createFilter(queryString)) : truckList
      // 调用 callback 返回车辆列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (data) => {
        return this.DriverList
      }
    }
  }
}

</script>
<style lang="scss">
.load-steup {
  height: calc(100%);
  display: flex;
  flex-direction: column;
  position: relative;
  .transferTable {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .load_btn_boxs {
    position: relative;
    top: 10px;
    z-index: 33;
    text-align: right;
    height: 0;
  }
  .load-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .loadFrom {
      padding: 0 10px 5px 0;
      .el-form-item {
        margin-bottom: 0px;
      }
      .loadFrom-type {
        position: absolute;
        z-index: 33;
        right: 40px;
        top: 20px;
      }
    }
    .el-collapse {
      border: 1px solid #E0E0E0;
    }
    .el-collapse-item__header {
      // background-color: #E9F3FA;
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
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
  margin: 5px -10px -10px 0;
  padding: 5px 10px 15px 10px;
  background-color: #fbfbfb;
  width: 100%;
  display: flex;
  flex-direction: row;
  .el-form-item__error {
    padding-top: 0px;
    top: 90%;
  }
  li {
    border-right: 1px solid #eeeeee;
    width: 10%;
    p {
      text-align: center;
      line-height: 18px;
      font-size: 14px;
    }
  }
}

</style>
