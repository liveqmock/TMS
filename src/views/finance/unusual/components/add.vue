<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="Addunusual" v-loading="loading">
    <template class="Addunusual-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <div class="box1">
          <div class="titles">运单信息</div>
            <!-- <el-select v-model="form.shipSn" filterable multiple  placeholder="请输入关键词">
            </el-select> -->
          <el-form-item label="运单号" prop="shipSn">
              <querySelect valuekey="shipSn" search="shipSn" type="order"  @change="fetchShipInfo('shipSn')"  placeholder="请输入运单号" v-model="form.shipSn"/>
          </el-form-item>
          <el-form-item label="开单时间" prop="createTime">
            <el-input :value="form.createTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')" maxlength="20" auto-complete="off"  :disabled=" true"></el-input>
          </el-form-item>
          <el-form-item label="出发城市" prop="shipFromCityCode">
            <el-input v-model="form.shipFromCityCode"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="到达城市" prop="shipToCityCode">
            <el-input v-model="form.shipToCityCode"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
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
          <el-form-item label="运费合计" prop="shipGoodsSn">
            <el-input v-model="form.shipGoodsSn"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="shipPayWay">
            <el-input v-model="form.shipPayWay"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="现付" prop="nowPayFee">
            <el-input v-model="form.nowPayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="到付" prop="arrivePayFee">
            <el-input v-model="form.arrivePayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="月结" prop="monthPayFee">
            <el-input v-model="form.monthPayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="回单付" prop="receiptPayFee">
            <el-input v-model="form.receiptPayFee"  maxlength="20" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
  
        </div>
        <!--异动费用-->
        <div class="box1">
          <div class="titles">异动费用</div>
          <el-form-item label="异动费用" v-number-only:point prop="changeFee" >
            <el-input v-model="form.changeFee" maxlength="6" auto-complete="off" placeholder="请输入异动费用"></el-input>
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
          <el-form-item label="费用类型:">
            <el-select v-model="form.feeStatus">
              <el-option label="异动增款" :value="0"></el-option>
              <el-option label="异动减款" :value="1"></el-option>
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
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isCheck ? true : false">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
// import { REGEX } from '@/utils/validate'
import { GetAbnormalNo, PostNewAbnormal, PutXiuGai, GetLook } from '@/api/operation/dashboard'
import { getAllUser } from '@/api/company/employeeManage'
import orderManage from '@/api/operation/orderManage'
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
    },
    isDbclick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      searchCreatTime: +new Date(),

      form: {
        // 异动费用
        feeStatus: 0,
        fee: 400,
        shipLoadId: 1016875003519434752,
        incomePayType: '',
        remark: '',
        changeFee: '',
        // 运单信息
        shipSn: '',
        createTime: '',
        shipFromCityCode: '',
        shipToCityCode: '',
        cargoName: '',
        cargoAmount: '',
        cargoWeight: '',
        cargoVolume: '',
        shipGoodsSn: '',
        shipPayWay: '',
        nowPayFee: '',
        arrivePayFee: '',
        monthPayFee: '',
        receiptPayFee: ''
      },

      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        changeFee: [
          { required: true, message: '必填只能输入数字', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入异动备注', trigger: 'change' }
        ],
        shipSn: [
          // { required: true, trigger: 'blur', validator: validateshipSn}
          { required: true, message: '请输入运单号', trigger: 'change' }
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
    isModify: {
      handler(newVal) {
        this.setTitle()
      },
      immediate: true
    },
    isCheck: {
      handler(newVal) {
        this.setTitle()
      },
      immediate: true
    },

    isDeal: {
      handler(newVal) {
        this.setTitle()
        // if(this.isDeal){
        //   this.popTitle = '异常处理'
        //   GetLook(this.id).then(res => {
        //     this.form = res;
        //     this.form.disposeTime = new Date();
        //   })
        // }
      },
      immediate: true
    }

    // info () {
    //   if(this.isModify){
    //     this.popTitle = '异常修改'
    //     let data = Object.assign({},this.info)
    //     for(let i in this.form){
    //       this.form[i] = data[i]
    //     }
    //     this.form.id = data.id
    //   } else {
    //     this.popTitle = '异常登记'
    //     for(let i in this.form){
    //       this.form[i] = ''
    //     }
    //     delete this.form.id
    //     this.form.orgid = this.orgid
    //   }
    // }
  },
  methods: {
    // handleRemove(file, fileList) {
    //     console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    setTitle() {
      if (this.isModify) {
        this.popTitle = '异动修改'
        GetLook(this.id).then(res => {
          this.form = res
        })
      } else {
        this.popTitle = '异动登记'
        this.form.orgId = this.orgid
        // this.form.createTime = new Date()
        // this.dengji()
      }
    },
    // dengji() {
    //   return GetAbnormalNo().then(res => {
    //       // this.form = res;
    //     this.form.abnormalNo = res
    //     console.log(res, 'this.form.abnormalNo: ', this.form)
    //   })
    // },
    querySearch(queryString, cb) {
      var restaurants = this.resInfo
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
    // getShipSn(data){
        // if(data){
          // this.formInline.shipGoodsSn = order.shipGoodsSn
          // this.sendId.pickupId = order.id

        //   this.form.shipSn = data.shipSn
        //   this.form.shipGoodsSn = data.shipGoodsSn
        //   this.form.createTime = data.createTime
        //   this.form.cargoName = data.cargoName
        //   this.form.cargoPack = data.cargoPack
        //   this.form.cargoAmount = data.cargoAmount
        // }else{
        //   this.$message({
        //       message: '查无此信息~',
        //       type: 'warning'
        //     })
        // }
      // },
    fetchShipInfo(type) {
      const oldVal = this.form[type]
      orderManage.getFindByShipSnOrGoodSn({
        [type]: this.form[type]
      }).then(res => {
        const data = res.data
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
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = objectMerge2({}, this.form)
          // data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            promiseObj = PutXiuGai(data)
          } else {
            promiseObj = PostNewAbnormal(data)
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
            this.closeMe()
          })
        } else {
          return false
        }
      })
    },
    reset() {
      const oldVal = this.form.abnormalNo
      this.$refs['ruleForm'].resetFields()
      if (!this.isModify) {
        this.form.abnormalNo = oldVal
      }
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
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
      margin-bottom:5px;
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
    .el-input--prefix .el-input__inner {
        padding-right: 3px;
    }
    .el-textarea__inner{
        // width: 207%;
        min-width: 703px;
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

