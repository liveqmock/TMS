<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="wzl_addAbnormalPop" v-loading="loading">
    <template class="wzl_addAbnormalPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <div class="box1">
          <div class="titles">运单信息</div>



          
          <!-- <el-form-item label="运单号" prop="shipSn" class="label">
            <el-input v-model="form.shipSn" @change="fetchShipInfo('shipSn')" maxlength="20" auto-complete="off" :disabled="isCheck || isDeal ? true : false"></el-input>
          </el-form-item> -->
          <el-form-item label="运单号" prop="shipSn">
              <!--<el-input v-model="formInline.shipSn"></el-input>-->
              <querySelect valuekey="shipSn" search="shipSn" type="order"  @change="getShipSn" :key="querykey" v-model="form.shipSn" :disabled="isCheck || isDeal ? true : false" />
            </el-form-item>
          <el-form-item label="货号" prop="shipGoodsSn">
            <querySelect valuekey="shipGoodsSn" search="shipGoodsSn" :key="querykey"  type="order"  @change="getShipSn"  v-model="form.shipGoodsSn" :disabled="isCheck || isDeal ? true : false"/>
            <!-- <el-input v-model="form.shipGoodsSn"  @change="fetchShipInfo('shipGoodsSn')" maxlength="20" auto-complete="off" :disabled="isCheck || isDeal ? true : false"></el-input> -->
          </el-form-item>
  
          <el-form-item label="开单时间" prop="createTime">
            <el-input :value="form.createTime" maxlength="20" auto-complete="off"  :disabled=" true"></el-input>
          </el-form-item>
          <el-form-item label="货品名" prop="cargoName">
            <el-input v-model="form.cargoName" maxlength="18" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="包装" prop="cargoPack">
            <el-input v-model="form.cargoPack" maxlength="20" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="cargoAmount">
            <el-input v-model="form.cargoAmount" maxlength="20" auto-complete="off" :disabled="true" ></el-input>
          </el-form-item>
        </div>
        <!--异常登记-->
        <div class="box1">
          <div class="titles">异常登记</div>
          <el-form-item label="异常编号" prop="abnormalNo">
          <el-input maxlength="20" v-model="form.abnormalNo" auto-complete="off"  :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="登记时间" prop="registerTime">
            <el-input :value="form.registerTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')" maxlength="20" auto-complete="off" :disabled="true" ></el-input>
            <!-- <template slot-scope="scope">{{ scope.row.registerTime | parseTime('{y}{m}{d}') }}</template> -->
          </el-form-item>
          <el-form-item label="登记网点" prop="orgId"  >
            <SelectTree v-model="form.orgId" :disabled="true"/>
          </el-form-item>
          <!-- <el-form-item label="登记人" prop="registerName" >
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.registerName"
              :fetch-suggestions="querySearch"
              @select="handleSelect" :disabled="isCheck || isDeal ? true : false">
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
              </template>
            </el-autocomplete>
          </el-form-item> -->
           <el-form-item label="登记人" prop="registerName"  >
            
             <el-input maxlength="10"  v-model="form.registerName" :disabled="true"></el-input>
           
            <!-- <querySelect search="name" label="name"  v-else @change="getUser" v-model="form.registerName" /> -->
            
          </el-form-item>
          <el-form-item label="异常类型" prop="abnormalType" class="label">
            <SelectType v-model="form.abnormalType" type="abnormal_type" :disabled="isCheck || isDeal ? true : false"/>
          </el-form-item>
          <el-form-item label="异常件数"  prop="abnormalAmount" >
            <el-input v-model="form.abnormalAmount" v-numberOnly maxlength="20" auto-complete="off" :disabled="isCheck || isDeal ? true : false"></el-input>
          </el-form-item>
          <el-form-item label="处理网点" prop="disposeOrgId" class="label">
            <SelectTree v-model="form.disposeOrgId" :disabled="isCheck || isDeal ? true : false"/>
          </el-form-item>
          <el-form-item label="异常金额" prop="registerFee" >
            <el-input v-model="form.registerFee"  v-number-only:point maxlength="5" auto-complete="off" :disabled="isCheck || isDeal ? true : false"></el-input>
          </el-form-item>
          <el-form-item label="责任网点" prop="dutyOrgId" >
            <SelectTree v-model="form.dutyOrgId" :disabled="isCheck || isDeal ? true : false"/>
          </el-form-item>
          <el-form-item class="driverRemarks label ms" label="异常描述" prop="abnormalDescribe" >
            <el-input type="textarea" maxlength="200" v-model.trim="form.abnormalDescribe" :disabled="isCheck || isDeal ? true : false"></el-input>
          </el-form-item>
            <p class="ts">注意：问题描述最多输入200字</p>
            <p class="wz"> <a>图片上传</a>注：最多可上传6张图片，每张图片不能大于5M</p>
            <!-- :class="{'disabledUpload': isCheck || isDeal}" -->
          <div class="clearfix uploadcard"  >
            <upload :title="'本地上传'" :showFileList="true" :limit="6" listtype="picture"  v-model="form.abnormalPicture" :disabled="isCheck || isDeal ? true : false"/>
          </div>
        </div>
        <!--异常处理-->
        <div class="box1 control" v-if="isDeal" style="height:400px">
          <div class="titles">
              <h4>异常处理</h4>
              <el-form-item label="处理结果：" prop="disposeResult" class="result">
                <SelectType v-model="form.disposeResult" type="dispose_result" :disabled="isCheck ? true : false"/>
              </el-form-item>
          </div>
          <el-form-item label="处理时间" prop="disposeTime">
            <el-input :value="form.disposeTime |parseTime('{y}-{m}-{d} {h}:{i}:{s}')" maxlength="20" auto-complete="off"  :disabled=" true"></el-input>
          </el-form-item>
          <el-form-item label="处理网点" prop="disposeOrgId" >
            <SelectTree v-model="form.disposeOrgId" :disabled=" true"/>
          </el-form-item>
          <el-form-item label="处理人" prop="disposeName" >
            <!-- <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.disposeName"
              :fetch-suggestions="querySearch"
              @select="handleSelect" :disabled=" true">
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
              </template>
            </el-autocomplete> -->
            <el-input maxlength="10"  v-model="form.disposeName"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="driverRemarks ms" label="处理意见" prop="disposeOpinion" >
            <el-input type="textarea" maxlength="125" v-model="form.disposeOpinion" :disabled="isCheck ? true : false"></el-input>
          </el-form-item>
            <p class="ts">注意：问题描述最多输入200字</p>
            <p class="wz"> <a>图片上传</a>注：最多可上传6张图片，每张图片不能大于5M</p>
            <!-- :class="{'disabledUpload': isCheck || isDeal}" -->
          <div class="clearfix uploadcard"  >
            <upload :title="'本地上传'" :showFileList="true" :limit="6" listtype="picture"  v-model="form.disposePicture" :disabled="isCheck ? true : false"/>
          </div>
        </div>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isCheck">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { GetAbnormalNo, PostNewAbnormal, PutXiuGai, GetLook } from '@/api/operation/dashboard'
import { getAllUser } from '@/api/company/employeeManage'
// import orderManage from '@/api/operation/orderManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage2'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'
import { objectMerge2 } from '@/utils/index'
// import { parseTime } from '@/utils/index'
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
    // const _this = this
    const validateNameSn = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入异常件数'))
      } else if (value.length > 5) {
        callback(new Error('最多可输入5位'))
      } else if (REGEX.ONLY_NUMBER_GT.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入数字从1开始'))
      }
    }
    const validatereg = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback()
      } else if (REGEX.ONLY_NUMBER.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入数字'))
      }
    }
    // const validateshipSn = function(rule, value, callback) {
    //   if (value === '' || value === null || !value || value === undefined) {
    //     callback(new Error('请输入运单号'))
    //   }else {
    //     callback()
    //   }
    // }
    return {
      querykey: '11',
      searchCreatTime: +new Date(),
      form: {
        'abnormalAmount': '',
        'abnormalDescribe': '',
        'abnormalNo': '',
        'abnormalPicture': '',
        'disposePicture': '',
        'abnormalStatus': '119',
        'abnormalType': '',
        'childShipId': '',
        'createTime': '',
        'disposeOpinion': '',
        'disposeOrgId': '',
        'disposeResult': '228',
        'disposeTime': '',
        'disposeName': '',
        'dutyOrgId': '',
        // 'dutyOrgName': '',
        'orgId': '',
        'registerFee': '',
        'registerName': '',
        'shipId': '',
        'shipSn': '',
        'shipGoodsSn': '',
        'cargoName': '',
        'cargoPack': '',
        'cargoAmount': '',
        'disposeUserId': ''
      },

      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        abnormalAmount: [
          { required: true, trigger: 'blur', validator: validateNameSn }
        ],
        abnormalType: [
          { required: true, message: '必选', trigger: 'blur' }
        ],
        registerFee: [
          { required: true, trigger: 'blur', validator: validatereg }
        ],
        abnormalDescribe: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        dutyOrgId: [
          { required: true, message: '请选择责任网点', trigger: 'blur' }
        ],
        disposeOrgId: [
          { required: true, message: '请选择处理网点', trigger: 'blur' }
        ],
        disposeOpinion: [
          { required: true, message: '必填', trigger: 'blur' }
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
      if (newVal) {
        this.getShipSn()
      }
    },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    // isModify: {
    //   handler(newVal)
    //  {
    //     this.setTitle()
    //   },
    //   immediate: true
    // },
    // isCheck: {
    //   handler(newVal) {
    //     this.setTitle()
    //   },
    //   immediate: true
    // },

    // isDeal: {
    //   handler(newVal) {
    //     // this.setTitle()
    //     if (this.isDeal) {
    //       this.popTitle = '异常处理'
    //       GetLook(this.id).then(res => {
    //         this.form = res
    //         this.form.disposeTime = new Date()
    //       })
    //       console.log(this.id)
    //       // const data = Object.assign({}, this.info)
    //       // for (const i in this.form) {
    //       //   this.form[i] = data[i]
    //       // }
    //     }
    //   },
    //   immediate: true
    // },

    info() {
      for (const i in this.form) {
        this.form[i] = ''
      }
      this.querykey = +new Date()
      if (this.isModify) {
        this.popTitle = '异常修改'
        const data = Object.assign({}, this.info)
        for (const i in this.form) {
          this.form[i] = data[i]
        }
        this.form.id = data.id
      } else if (this.isCheck) {
        this.popTitle = '查看明细'
        GetLook(this.info.id).then(res => {
          this.form = res
          this.form.disposeTime = new Date()
          this.form.disposeName = this.otherinfo.name
          console.log(res + '查看明细')
        })
      } else if (this.isDeal) {
        this.popTitle = '异常处理'
        console.log(this.isDeal + '异常处理')
        GetLook(this.info.id).then(res => {
          this.form = res
          this.form.disposeTime = new Date()
          this.form.disposeName = this.otherinfo.name
        })
      } else {
        this.dengji()
        this.popTitle = '异常登记'
        for (const i in this.form) {
          this.form[i] = ''
        }
        delete this.form.id
        // this.form.orgid = this.orgid
      }
    }
  },
  methods: {
    getUser(item) {
      if (item) {
        this.form.registerUserId = item.id
      }
    },
    // setTitle() {
    //   if (this.isDeal) {
    //     this.popTitle = '异常处理'
    //     GetLook(this.id).then(res => {
    //       this.form = res
    //       this.form.disposeTime = new Date()
    //       this.form.disposeName = this.otherinfo.name
    //     })
    //   } else if (this.isModify) {
    //     this.popTitle = '异常修改'
    //     // GetLook(this.id).then(res => {
    //     //   this.form = res
    //     // })
    //     this.form = this.info
    //     console.log(this.id + '修改')
    //     console.log(this.info)
    //   } else if (this.isCheck) {
    //     console.log(this.isDeal + '异常查看')
    //     this.popTitle = '查看明细'
    //     GetLook(this.id).then(res => {
    //       this.form = res
    //     })
    //   } else {
    //     this.popTitle = '异常登记'
    //     this.form.orgId = this.orgid
    //     this.form.registerName = this.otherinfo.name
    //     this.form.registerTime = this.searchCreatTime
    //     this.dengji()
    //   }
    // },
    dengji() {
      return GetAbnormalNo().then(res => {
          // this.form = res;
        this.form.abnormalNo = res
        this.form.registerName = this.otherinfo.name
        this.form.registerTime = this.searchCreatTime
        this.form.orgId = this.orgid
        console.log(res, 'this.form.abnormalNo: ', this.form)
      })
    },
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
    getShipSn(data) {
      if (data) {
        console.log('data:', data.createTime, data)
        // this.formInline.shipGoodsSn = data.shipGoodsSn
        // this.sendId.pickupId = data.id

        this.form.shipSn = data.shipSn
        this.form.shipGoodsSn = data.shipGoodsSn
        this.form.createTime = data.createTime
        this.form.cargoName = data.cargoName
        this.form.cargoPack = data.cargoPack
        this.form.cargoAmount = data.cargoAmount

        // this.form.shipSn = data.shipSn
        // this.form.shipGoodsSn = data.shipGoodsSn
        this.form.shipId = data.id
        this.form.abnormalDescribe = data.abnormalDescribe
        this.form.abnormalAmount = data.abnormalAmount
        this.form.disposeOrgId = data.disposeOrgId
        this.form.registerFee = data.registerFee
        this.form.dutyOrgId = data.dutyOrgId
        this.form.abnormalStatus = data.abnormalStatus
        this.form.disposeUserId = data.disposeUserId
        this.form.disposeOpinion = data.disposeOpinion

        // this.form.registerUserId = data.registerUserId
        // this.form.registerTime = +this.form.registerTime
        // this.form.createTime = +this.form.createTime
        // this.form.disposeTime = +this.form.disposeTime
      }/* else {
          this.$message({
            message: '查无此信息~',
            type: 'warning'
          })
        } */
    },
    // fetchShipInfo(type) {
    //   const oldVal = this.form[type]
    //   orderManage.getFindByShipSnOrGoodSn({
    //     [type]: this.form[type]
    //   }).then(res => {
    //     const data = res.data
    //     if (data) {
    //       this.form.shipSn = data.shipSn
    //       // this.form.shipGoodsSn = data.shipGoodsSn
    //       this.form.shipId = data.id
    //       this.form.createTime = data.createTime
    //       // this.form.cargoName = data.cargoName
    //       // this.form.cargoPack = data.cargoPack
    //       // this.form.cargoAmount = data.cargoAmount
    //       this.form.abnormalDescribe = data.abnormalDescribe
    //       this.form.abnormalAmount = data.abnormalAmount
    //       this.form.disposeOrgId = data.disposeOrgId
    //       this.form.registerFee = data.registerFee
    //       this.form.dutyOrgId = data.dutyOrgId
    //       this.form.abnormalStatus = data.abnormalStatus
    //       this.form.disposeUserId = data.disposeUserId
    //       this.form.disposeOpinion = data.disposeOpinion
    //       this.form.disposeOrgId = data.disposeOrgId
    //       // this.form.registerTime = data.registerTime
    //       // this.form.createTime = this.searchCreatTime ? parseTime(this.searchCreatTime) : ''
    //       this.form.registerTime = this.searchCreatTime ? parseTime(this.searchCreatTime) : ''
    //     } else {
    //       // this.$message({
    //       //     message: '查无此信息~',
    //       //     type: 'warning'
    //       //   })
    //       this.form.shipSn = ''
    //       this.form.shipGoodsSn = ''
    //       this.form.createTime = ''
    //       this.form.cargoName = ''
    //       this.form.cargoPack = ''
    //       this.form.cargoAmount = ''
    //       this.form[type] = oldVal
    //     }
    //   })
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          // this.form.registerTime = this.searchCreatTime ? parseTime(this.searchCreatTime) : ''
          const data = objectMerge2({}, this.form)
          data.registerTime = +new Date(data.registerTime)
          data.createTime = +new Date(data.createTime)
          data.disposeTime = +new Date(data.disposeTime)
          data.disposeUserId = this.otherinfo.userId

          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify || this.isDeal) {
            data.abnormalStatus = 119
            promiseObj = PutXiuGai(data) // 修改或处理异常
          } else {
            data.abnormalStatus = 118
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
            // this.closeMe()
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
      this.form.shipSn = ''
      this.form.shipGoodsSn = ''
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      // this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}
</script>
<style lang="scss">

.wzl_addAbnormalPop{
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
      min-width: 723px;
      width:100%;
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
    //上传图片
    .el-upload-list--picture-card .el-upload-list__item{
      width: 234px;
      height: 136px;
    }
    .el-upload-dragger{
      width: 234px;
      height: 136px;
    }
    .el-upload--picture-card{
      width:234px;
      height:136px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-top:8px;
    }
    //上传图片end
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
    .el-textarea{
      min-width: 722px;
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
        margin:0px;
        margin-right: 48px;
      }
    }
    .el-input--prefix .el-input__inner {
        padding-right: 3px;
    }
    .el-textarea__inner{
        // width: 207%;
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
  .uploadlist{
    width: 100%;
    margin-left:80px;
    li{
      float: left;
      width: 100px;
      margin-right: 10px;
    }
  }
  
  .uploadcard{
    padding:20px 20px 20px 90px;
  }
  .disabledUpload{
    .el-upload{
      display: none;
    }
  }
  .el-input--mini .el-input__inner{
    color: #3e9ff1;
  }
}
</style>

