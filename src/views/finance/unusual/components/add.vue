<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="Addunusual" v-loading="loading">
    <template class="Addunusual-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <div class="box1">
          <div class="titles">运单信息</div>
            <!-- <el-select v-model="form.shipSn" filterable multiple  placeholder="请输入关键词">
            </el-select> -->
          <el-form-item label="运单号" prop="shipSn">
            <!-- <el-input v-if="this.isDbClick" v-model="form.shipSn"  maxlength="20" auto-complete="off" :disabled="true"></el-input> -->
              <querySelect valuekey="shipSn" search="shipSn" :disabled="this.isDbClick"  type="order" :key="querykey"  @change="fetchShipInfo"  placeholder="请输入运单号" v-model="form.shipSn">
              </querySelect>
              <!-- <querySelect valuekey="shipSn" search="shipSn" type="order"  @change="fetchShipInfo"  v-model="form.shipSn" :disabled="isDbClick ? true : false" /> -->
          </el-form-item>
          <el-form-item label="开单时间" prop="createTime">
            <el-input :value="form.createTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')" maxlength="20" auto-complete="off"  :disabled=" true"></el-input>
          </el-form-item>
          <el-form-item label="出发城市" prop="shipFromCityName">
            <el-input v-model="form.shipFromCityName"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="到达城市" prop="shipToCityName">
            <el-input v-model="form.shipToCityName"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="货品名" prop="cargoName">
            <el-input v-model="form.cargoName" maxlength="18" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="cargoAmount">
            <el-input v-model="form.cargoAmount" maxlength="20" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="重量" prop="cargoWeight">
            <el-input v-model="form.cargoWeight"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="体积" prop="cargoVolume">
            <el-input v-model="form.cargoVolume"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="运费合计" prop="shipFee">
            <el-input v-model="form.shipFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="shipPayWayName">
            <el-input v-model="form.shipPayWayName"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="现付" prop="shipNowpayFee">
            <el-input v-model="form.shipNowpayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="到付" prop="shipArrivepayFee">
            <el-input v-model="form.shipArrivepayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="月结" prop="shipMonthpayFee">
            <el-input v-model="form.shipMonthpayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="回单付" prop="shipReceiptpayFee">
            <el-input v-model="form.shipReceiptpayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
  
        </div>
        <!--异动费用-->
        <div class="box1">
          <div class="titles">异动费用</div>
          <el-form-item label="异动费用" prop="fee" >
            <el-input v-model="form.fee" v-number-only:point maxlength="6" auto-complete="off" placeholder="请输入异动费用"></el-input>
          </el-form-item>
          <!-- <el-form-item label="费用类型" prop="value">
            <el-select v-model="form.feeTypeId" placeholder="请选择费用类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="费用类型:" prop="incomePayType">
            <el-select v-model="form.incomePayType">
              <el-option label="异动增款" value="RECEIVABLE"></el-option>
              <el-option label="异动减款" value="PAYABLE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="异动时间:" prop="createTime">
          <el-date-picker
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
          </el-form-item> 
          <el-form-item class="driverRemarks ms" label="异动备注" prop="remark" >
            <el-input type="textarea" maxlength="200" v-model="form.remark" placeholder="注：最多可输入200个字符"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbClick">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" v-if="isModify" @click="submitForm('ruleForm')" >修改</el-button>
      <el-button type="primary" v-else @click="submitForm('ruleForm')" >保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="isModify" @click="submitForm('ruleForm')" :disabled="isCheck ? true : false">修改</el-button>
      <el-button type="primary" v-else @click="submitForm('ruleForm')" :disabled="isCheck ? true : false">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div> -->
  </pop-right>
</template>
<script>
// import { REGEX } from '@/utils/validate'
// import { GetAbnormalNo, PostNewAbnormal, putXiugai, GetLook } from '@/api/operation/dashboard'
import { postInsertAbnormal, putXiugai } from '@/api/finance/unusual'
import { getAllUser } from '@/api/company/employeeManage'
// import orderManage from '@/api/operation/orderManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'
import { objectMerge2 } from '@/utils/index'
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType,
    querySelect
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    isModify: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    isDeal: {
      type: Boolean,
      default: false
    },
    isDbClick: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String]
    },
    companyId: {
      type: [Number, String]
    },
    info: {
      type: Object,
      default: () => {}
    },
    licenseTypes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      querykey: '11',
      searchCreatTime: +new Date(),
      incomePayType: 'RECEIVABLE',
      form: {
        // 异动费用
        incomePayType: 'RECEIVABLE',
        fee: '',
        shipLoadId: '',
        remark: '',
        // 运单信息
        shipSn: '',
        createTime: '',
        shipFromCityName: '',
        shipToCityName: '',
        cargoName: '',
        cargoAmount: '',
        cargoWeight: '',
        cargoVolume: '',
        shipFee: '',
        shipPayWay: '',
        shipNowpayFee: '',
        shipArrivepayFee: '',
        shipMonthpayFee: '',
        shipReceiptpayFee: '',
        shipPayWayName: ''

      },
      obj: {
        fee: '',
        shipLoadId: '',
        incomePayType: '',
        remark: ''
      },
      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        fee: [
          { required: true, message: '必填只能输入数字', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入异动备注', trigger: 'blur' }
        ],
        shipSn: [
          // { required: true, trigger: 'blur', validator: validateshipSn}
          { required: true, message: '请输入运单号', trigger: 'change' }
        ],
        incomePayType: [
          { required: true, message: '请选择费用类型', trigger: 'change' }
        ]
      },
      // fileList2:[],
      disabled: false,
      popTitle: '',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,
      // disabled:'',
      resInfo: [],
      pickOption2: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      }

    }
  },
  mounted() {
    this.form.orgid = this.orgid
    if (!this.inited) {
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    // isModify: {
    //   handler(newVal) {
    //     this.setTitle()
    //   },
    //   immediate: true
    // },
    // isDbClick: {
    //   handler(newVal) {
    //     this.setTitle()
    //   },
    //   immediate: true
    // },

    info() {
      // this.setTitle()

      // if(this.isModify){
      //   this.popTitle = '异常修改'
      //   let data = Object.assign({},this.info)
      //   for(let i in this.form){
      //     this.form[i] = data[i]
      //   }
      //   this.form.id = data.id
      // } else {
      //   this.popTitle = '异常登记'
      //   for(let i in this.form){
      //     this.form[i] = ''
      //   }
      //   delete this.form.id
      //   this.form.orgid = this.orgid
      // }
      for (const i in this.form) {
        this.form[i] = ''
      }
      this.querykey = +new Date()

      if (this.isModify) {
        this.popTitle = '异动修改'
        this.fetchShipInfo(this.info)
        console.log(this.id + 'ppp')
      } else if (this.isDbClick) {
        this.popTitle = '异动查看'
        this.fetchShipInfo(this.info)

        // console.log(this.info.nowPayFee)
      } else {
        this.popTitle = '异动登记'
        this.form.orgId = this.orgid

        // this.fetchShipInfo(this.info)
        this.form.incomePayType = this.incomePayType
        this.form.shipSn = ''
        // this.form.createTime = new Date()
        // this.dengji()
      }
    }
  },
  methods: {
    // handleRemove(file, fileList) {
    //     console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },

    // setTitle() {
    //   if (this.isModify) {
    //     this.popTitle = '异动修改'
    //     this.fetchShipInfo(this.info)
    //   } else if (this.isDbClick) {
    //     this.popTitle = '异动查看'
    //     this.fetchShipInfo(this.info)
    //     console.log(this.isDbClick)
    //   } else {
    //     this.popTitle = '异动登记'
    //     this.form.orgId = this.orgid
    //     for (const i in this.form) {
    //       this.form[i] = ''
    //     }
    //     this.form.incomePayType = this.incomePayType
    //     // this.form.createTime = new Date()
    //     // this.dengji()
    //   }
    // },
    // dengji() {
    //   return GetAbnormalNo().then(res => {
    //       // this.form = res;
    //     this.form.abnormalNo = res
    //     console.log(res, 'this.form.abnormalNo: ', this.form)
    //   })
    // },
    querySearch(queryString, cb) {
      var restaurants = this.resInfo0
      var results = queryString ? restaurants.filter(item => {
        return item.name ? item.name.indexOf(queryString) !== -1 : false
      }) : restaurants
        // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.name.indexOf(queryString) !== -1
      }
    },
    handleSelect(item) {
      this.form.registerName = item.name
    },
    initInfo() {
      this.loading = false
      getAllUser(this.orgid, '', '').then(res => {
        this.resInfo = res.list
      })
    },
    getOrgid(id) {
      this.form.orgid = id
    },
    fetchShipInfo(data) {
      // const oldVal = this.form[type]

      if (data) {
        console.log('ship data:', data)
        if (this.isModify || this.isDbClick) {
          this.form.shipSn = data.shipSn
          this.form.shipFee = data.shipFee
          this.form.createTime = data.createTime
          this.form.cargoName = data.cargoName
          this.form.cargoPack = data.cargoPack
          this.form.cargoAmount = data.cargoAmount
          this.form.shipLoadId = data.shipId
          this.form.shipFromCityName = data.shipFromCityName
          this.form.shipToCityName = data.shipToCityName
          this.form.shipMonthpayFee = data.monthPayFee
          this.form.shipReceiptpayFee = data.receiptPayFee
          this.form.shipArrivepayFee = data.arrivePayFee

          this.form.shipNowpayFee = data.nowPayFee
          this.form.shipPayWayName = data.shipPayWay
          this.form.cargoWeight = data.cargoWeight
          this.form.cargoVolume = data.cargoVolume
          // this.form.shipFee = data.shipFee
          this.form.nowPayFee = data.nowPayFee

          this.form.fee = data.changeFee
          this.form.incomePayType = data.incomePayType
          this.form.shipCreateTime = data.shipCreateTime
          this.form.remark = data.remark
          this.form.shipLoadId = data.id
          this.form.shipPayWayName = data.shipPayWay

          this.form.shipPayWay = data.shipPayWay
        } else {
          this.form = Object.assign(this.form, data)
          this.form.shipLoadId = data.id
          this.form.shipNowpayFee = data.shipNowpayFee
          this.form.shipPayWayName = data.shipPayWayName
        }
      }
      //  else {
        // this.$message({
        //   message: '查无此信息~',
        //   type: 'warning'
        // })
        // this.form.shipSn = ''
        // this.form.shipGoodsSn = ''
        // this.form.createTime = ''
        // this.form.cargoName = ''
        // this.form.cargoPack = ''
        // this.form.cargoAmount = ''
        //   // this.form[type] = oldVal
        // this.form.shipLoadId = ''
      // }

      // return
      /* orderManage.getFindByShipSnOrGoodSn({
        [type]: this.form[type]
      }).then(res => {
        const data = res.data
        console.log(res.data.shipSn)
        if (data) {
          this.form.shipSn = data.shipSn
          this.form.shipGoodsSn = data.shipGoodsSn
          this.form.createTime = data.createTime
          this.form.cargoName = data.cargoName
          this.form.cargoPack = data.cargoPack
          this.form.cargoAmount = data.cargoAmount
        } else {
          // this.$message({
          //     message: '查无此信息~',
          //     type: 'warning'
          //   })
          this.form.shipSn = ''
          this.form.shipGoodsSn = ''
          this.form.createTime = ''
          this.form.cargoName = ''
          this.form.cargoPack = ''
          this.form.cargoAmount = ''
          this.form[type] = oldVal
        }
      }) */
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // this.loading = true
          this.obj.shipSn = this.form.shipSn
          this.obj.fee = this.form.fee
          this.obj.incomePayType = this.form.incomePayType
          this.obj.remark = this.form.remark
          this.obj.shipLoadId = this.form.shipLoadId
          this.obj.createTime = new Date(this.form.createTime).getTime()
          // this.obj.createTime = new Date(data.createTime).getTime()
          const data = objectMerge2({}, this.obj)
          // console.log(this.obj, this.form.createTime)

          // data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            promiseObj = putXiugai(this.id, data) // 修改
          } else {
            promiseObj = postInsertAbnormal(data) // 登记
          }

          promiseObj.then(res => {
            this.loading = false
            this.$message({
              message: '保存成功~',
              type: 'success'
            })
            this.closeMe()
            this.$emit('success')
          }).catch(res => {
            this.loading = false
            this.$message.warning(res.text)
            // this.closeMe()
          })
        } else {
          return false
        }
      })
    },
    reset() {
      // const oldVal = this.form.abnormalNo
      this.$refs['ruleForm'].resetFields()
      // if (!this.isModify) {
      //   this.form.abnormalNo = oldVal
      // }
      // this.form.shipSn = ''
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}
</script>
<style lang="scss">
  .uploadlist{
  width: 100%;
  margin-left:80px;
  li{
      float: left;
      width: 100px;
      margin-right: 10px;
    }
  }
  .disabledUpload{
    .el-upload{
      display: none;
    }

  }
.Addunusual{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 880px;
  max-width:  880px;

  .box1{
    border:1px solid #C6E2FF;
    border-top:none;
    margin:10px;
    .el-form--inline .el-form-item{
      margin-right: -17px;
      width: 50%;
      float: left;
      display: flex;
      .el-form-item{
        margin-right: -17px;
      }
    }

    
    .ms{
      width:100%;
      min-width:703px;
      font-size: 13px;
    }
    .el-form--inline .driverRemarks{
      width: 600px;
      // position:relative;
      
    }
    .wz{
        font-size:12px;
        color:orange;
        a{
          color: #606266;
          margin:0 15px;
        }
        
      }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }

    .el-form-item__label{
      font-size: 12px;
    }

    .el-form-item__content{
      flex:1;
    }

    .select-tree{
      width: 100%;
    }

    .drviercard,.certcard,.idcard{
      float: left;
      width: 100%;
      height: 136px;
      margin-bottom: 14px;
      margin-left:13%;
      position:absolute;
      right:111px;
      top:111px;
    }

    .upload-container{
      height: 100%;
    }

    .drviercard{
      float: right;
    }

    .licensePicture{
      height: 116px;
      line-height: 1.2;
    }

    .popRight-content{
      padding: 20px 10px 0;
      box-sizing: border-box;
    }

    .el-select .el-input__inner{
      padding-right: 15px;
    }
    .titles{
      font-size: 14px;
      height:33px;
      line-height: 33px;
      padding-left:15px;
      border-top:2px solid #333333;
      border-bottom:1px solid #C6E2FF;
      margin-bottom:20px;
      color:black;
      position: relative;
      background: #e9f3fa;
      h4{
        font-size: 14px;
        color:black;
        float:left;
       
      }
      .result{
        position:absolute;
        top:0px;
        right:0px;
      }
    }
    .el-input--mini .el-input__inner{
      color:#2ca3f1;
    }
    .el-input--prefix .el-input__inner {
        padding-right: 3px;
    }
    .el-textarea__inner{
        // width: 207%;
        min-width: 725px;
        height: 50%;
        line-height: 1.5;
    }
    .ts{
      color:orange;
      margin-left:77px;
      margin-bottom: 15px;
      font-size:12px;
    }
  }
  .label{
    label{
      color:red;
    }
    
  }
  // .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  //   margin-bottom: 6px;
  // }
}
</style>

