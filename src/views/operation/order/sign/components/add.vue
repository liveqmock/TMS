<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content" :label-width="formLabelWidth">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="manage-add">
      <table class="table">
        <tr>
          <td>
            <el-form-item label="运单号:" prop="shipSn">
                <el-input maxlength="20" v-model="form.shipSn" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="开单日期:" prop="createTime">
                <el-input maxlength="20" v-model="form.createTime" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-table-column
              sortable
              width="120"
              label="开单日期">
              <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
            </el-table-column> -->
          </td>
          <td>
            <el-form-item label="回单号:" prop="shipReceiptSn">
                <el-input maxlength="20" v-model="form.shipReceiptSn" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="回单数:" prop="shipReceiptNum">
                <el-input maxlength="20" v-model="form.shipReceiptNum" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="发货人:" prop="sender_customer_name">
                <el-input maxlength="20" v-model="form.sender_customer_name" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="发货人电话:" prop="sender_customer_mobile">
                <el-input maxlength="20" v-model="form.sender_customer_mobile" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="收货人:" prop="receiver_customer_name"> 
                <el-input maxlength="20" v-model="form.receiver_customer_name" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="收货人电话:" prop="eceiver_customer_mobile">
              <el-input maxlength="20" v-model="form.eceiver_customer_mobile" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="签收时间:" prop="signTime" >
              <el-date-picker
                  v-model="searchCreatTime"
                  align="right"
                  type="date"
                  :picker-options="pickOption2"
                  placeholder="选择日期"
                  value-format="timestamp"
                  :disabled="isDbclick"
                  >
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="签收时间:" prop="signTime">
                <el-input maxlength="20" v-model="form.signTime" auto-complete="off"></el-input>
              </el-form-item> -->
          </td>
          <td>
            <el-form-item label="交接方式:" prop="shipDeliveryMethodName" >
              <SelectType v-model="form.shipDeliveryMethodName" type="ship_delivery_method" :disabled="true"/>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="到付款:" prop="shipArrivepayFee">
                <el-input maxlength="20" v-model="form.shipArrivepayFee" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="代收货款:" prop="agencyFund">
                <el-input maxlength="20" v-model="form.agencyFund" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="签收人:" prop="signName">
                <el-input maxlength="10" v-model="form.signName" auto-complete="off" :disabled="isDbclick ? true :false"></el-input>
              </el-form-item>
          </td>
          <td>
            <el-form-item label="签收证件:" prop="signCocumentTypeId" >
              <SelectType v-model="form.signCocumentTypeId" type="sign_cocument_type" :disabled="isDbclick"/>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="证件号码:" prop="documentNum">
              <el-input v-model="form.documentNum" auto-complete="off" :disabled="isDbclick"></el-input>
            </el-form-item>
          </td>
          <td>
           <el-form-item label="签收类型:" prop="signTypeId" >
              <SelectType v-model="form.signTypeId" type="sign_type" :disabled="isDbclick"/>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <!-- <td>备注</td> -->
          <td colspan="7" prop="remark" class="mark">
            <label class="label">备注</label>
            <input type="text" v-model.trim="form.remark" placeholder="备注最多输入250个字符" maxlength="250" :disabled="isDbclick"/></td>
        </tr>
        <tr style="height:152px">
          <!-- <td>签收凭证</td> -->
          <td colspan="7" class="imgshow mark">
            <div class="pz"><div>签收凭证<span class="ts">（最多可上传6张）</span></div></div>
            <div class="clearfix uploadcard">
              <upload :title="'本地上传'" :showFileList="true" :limit="6" listtype="picture"  v-model="form.signPic" :disabled="isDbclick"/>
            </div>
          </td>
        </tr> 
      </table>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer" v-if="isDbclick">
      <el-button @click="closeMe">关 闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button type="primary" @click="submitForm('ruleForm')" v-if="isPick">修改签收</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')" v-else>签 收</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { postPickuplist, postPickupSign, putXiugai, postSign } from '@/api/operation/sign'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'
import { objectMerge2 } from '@/utils/index'
export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    repertoryId: [Object, Array, String],
    // dotInfo: [Object,Array],
    orgid: {
      required: true
    },
    id: {
      type: [Number, String]
    },
    isModify: {
      type: Boolean,
      default: false
    },
    isPick: {
      type: Boolean,
      default: false
    },
    isDelivery: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    issender: {
      type: Boolean,
      dafault: false
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
    const validateNum = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入证件号码'))
      } else if (value.length > 20) {
        callback(new Error('最多可输入20位'))
      } else if (REGEX.ONLY_NUMBER_AND_LETTER.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入字母和数字'))
      }
    }
    const validateNameSn = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入签收人'))
      } else if (value.length > 10) {
        callback(new Error('最多可以输入10位字符'))
      } else if (REGEX.USERNAME.test(value)) {
        callback()
      } else {
        callback(new Error('不可以输入特殊字符和空格'))
      }
    }
    const validateremark = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('请输入备注'))
      } else if (value.length > 250) {
        callback(new Error('最多可以输入250位字符'))
      } else if (REGEX.KONGE.test(value)) {
        callback()
      } else {
        callback(new Error('不可以输入空格'))
      }
    }
    return {
      senderList: [],
      receiverList: [],
      dataset: [],
      searchCreatTime: +new Date(),
      pickOption2: '',
      dataform: {},
      childShipId: '',
      disabled: false,
      // getrepertoryId:'',
      form: {
        'repertoryId': '',
        'signTime': '',
        'signName': '',
        'signCocumentTypeId': '96',
        'shipsignNameSn': '',
        'documentNum': '',
        'signTypeId': '99',
        'remark': '',
        'signPic': ''
      },
      obj: {
        'repertoryId': '',
        'signTime': '',
        'signName': '',
        'signCocumentTypeId': 96,
        'shipsignNameSn': '',
        'documentNum': '',
        'signTypeId': 99,
        'remark': '',
        'signPic': '',
        'signId': ''
      },
      devobj: {
        'childShipId': '' // 子运单id
      },
      rules: {
        signName: [
          { required: true, trigger: 'blur', validator: validateNameSn }
        ],
        signCocumentTypeId: [
          { required: true, message: '请选择签收证件', trigger: 'blur' }
        ],
        documentNum: [
          { required: true, trigger: 'blur', validator: validateNum }
        ],
        signTypeId: [
          { required: true, message: '请选择签收类型', trigger: 'blur' }
        ],
        remark: [
          // { required: true, message: '请输入签收备注', trigger: 'blur' },
           { required: true, trigger: 'blur', validator: validateremark }
        ],
        searchCreatTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px',
      tooltip: false,
      popTitle: '签收录入',
      loading: false,
      inited: false
    }
  },
  mounted() {
    this.form.signId = this.orgid
    if (!this.inited) {
      this.inited = true
      this.initInfo()
    }
  },
  watch: {
    // dotInfo (newVal) {
    //   this.getMentInfo = this.dotInfo
    // },
    repertoryId: {
      handler(newVal) {
        // this.setInfo()
        console.log('repertoryId:', this.form, newVal)
      },
      deep: true
    },

    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        // this.initInfo()
      }
      console.log('popVisible:', newVal, this.repertoryId)
      if (newVal) {
        this.setInfo()
      }
    },
    // repertoryId(){

    //     if(this.isPick){
    //       this.popTitle = '自提修改签收'
    //       console.log(this.isPick)
    //     }
    //     else if(this.isDbclick) {
    //       this.popTitle = '查看信息'
    //     }
    //     else{
    //       this.popTitle = '自提签收录入'
    //     }
    //     immediate: true
    // },
    orgid(newVal) {
      this.form.orgid = newVal
    },
    isDbclick: {
      handler(newVal) {
        this.setTitle()
        // this.DelModfiy()
      },
      immediate: true
    },
    isPick: {
      handler(newVal) {
        this.setTitle()
        // if(this.isPick){
        //   this.popTitle = '自提修改签收'
        //   console.log(this.isPick)
        // }
        // else{
        //   this.popTitle = '自提签收录入'
        // }
      },
      immediate: true
    },
    isDelivery: {
      handler(newVal) {
        this.setTitle()
        // console.log(this.isDelivery)
        // if(!this.isDelivery){
        //   this.popTitle = '送货修改签收'
        // }else{
        //   this.popTitle = '送货签收录入'
        // }
      }
    },
    immediate: true
  },
  methods: {
    setTitle() {
      // 查看信息1
      if (this.isDbclick) {
        this.popTitle = '查看信息'
      } else if (this.isPick) {
        this.popTitle = '修改签收'
      } else {
        this.popTitle = '签收录入'
      }
    },
    DelModfiy() {

      // if(this.isDelivery){
      //   this.popTitle = '送货签收录入'

      // }else{
      //   this.popTitle = '送货修改签收'
      // }
    },
    setInfo() {
      // this.$set('form', this.repertoryId)
      this.form = objectMerge2({}, this.form, this.repertoryId)
      this.obj.repertoryId = this.repertoryId.repertoryId
      this.obj.signTime = this.repertoryId.signTime
      this.obj.signCocumentTypeId = this.repertoryId.signCocumentTypeId
      this.obj.shipsignNameSn = this.repertoryId.shipsignNameSn
      this.obj.documentNum = this.repertoryId.documentNum
      this.obj.signTypeId = this.repertoryId.signTypeId
      this.obj.remark = this.repertoryId.remark
      this.obj.signPic = this.repertoryId.signPic
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    querySearchSender(name) {
      const _this = this
      return function(query, cb) {
        const data = _this.senderList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    pick() {
      return postPickuplist().then(res => {
          // this.form = res;
          // this.form.abnormalNo = res
        console.log(res)
          // console.log(res, "this.form.abnormalNo: ", this.form);
      })
    },
    handleSelectSender(res) {
      this.customSend.senderName = res.customerName
      this.customSend.companyName = res.companyName
      this.customSend.senderMobile = res.customerMobile
      this.customSend.detailedAddress = res.detailedAddress
      this.customSend.customerType = res.customerType
    },
    querySearchReceiver(name) {
      const _this = this
      return function(query, cb) {
        const data = _this.receiverList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    handleSelectReceiver(res) {

    },
    initInfo() {
      this.loading = false
      // getAllUser(this.orgid, '', '').then(res=>{
      //   this.resInfo = res.list
      // })
    },
    // getOrgid (id) {
    //   this.form.orgid = id
    // },
    submitForm(ruleForm) {
      this.form.signTime = this.searchCreatTime
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = objectMerge2({}, this.obj)
          for (const i in data) {
            data[i] = this.form[i]
          }
          data.childShipId = this.repertoryId.childShipId
          data.shipId = this.repertoryId.shipId
          let promiseObj
          if (this.isPick) {
            promiseObj = putXiugai(this.id, data)
            // console.log(data);
          } else if (this.isDelivery) {
            promiseObj = postSign(data)// 不批量
          } else {
            promiseObj = postPickupSign(data)// 不批量
          }
          promiseObj.then(res => {
            // console.log(res);
            this.$message({
              message: '签收成功~',
              type: 'success'
            })
            this.closeMe()
            this.$emit('success')
            // this.$alert('保存成功', '提示', {
              //   confirmButtonText: '确定',
              //   callback: action => {
              //     this.loading = false
              //     this.closeMe()
              //     this.$emit('success')
              //   }
              // })
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
    // submitForm1(ruleForm){
    //   this.form.signTime = this.searchCreatTime[0]
    //   this.$refs[ruleForm].validate((valid) => {
    //     if(valid){
    //       this.loading = true
    //       let data = Object.assign({},this.form)
    //       // data.repertoryId = this.repertoryId
    //       // console.log(this.form);
    //       let promiseObj
    //       promiseObj = postXiugai(data)//不批量
    //       promiseObj.then(res=>{
    //         if(res.status === 200){
    //           this.$alert('保存成功', '提示', {
    //             confirmButtonText: '确定',
    //             callback: action => {
    //               this.loading = false
    //               this.closeMe()
    //               this.$emit('success')
    //             }
    //           })
    //         } else {
    //           this.loading = false
    //           this.closeMe()
    //         }

    //       })
    //     }else{
    //       return false
    //     }
    //   })
    // },
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
  .selectListOption_lrl{
    clear:both;
    span{
      display: inline-block;
      width: 50%;
    }
    .addr{
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }
.addCustomerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 1130px;
  max-width:  1255px;
  .table{
    border-collapse :collapse ;
    color: #333333;
    // border-left:1px solid #ccc;
    tr{
      .mark .label{
        display: block;
        float:left;
        text-align:center;
        width:100px;
        height:50px;
        line-height:50px;
        background:#f2f2f2;
        border-right:1px solid #ccc;
      }
      .mark input{
        width:1000px;
        height:48px;
        line-height: 48px;
        padding-left: 20px;
      }
      .mark .pz{
        width:100px;
        height: 167px;
        // margin-top:30px;
        // line-height: 167px;
         border-right:1px solid #ccc;
        float:left;
        text-align: center;
        background: #f2f2f2;
        div{
          height: 167px;
          margin-top:50px;
         
        // line-height: 167px;
          .ts{
            display: block;
            color:#999999;
          }
        }
        
      }
      .upload-container[data-v-de7091b2]{
        margin-left: 40px;
      }
      td{
        // width:157px;
        height:50px;
        border :1px solid black;
        border-color: rgba(201, 201, 201, 1);
        font-size:14px;
        // text-align :center;
        // background: #f5f7fa;
        // label{
        //   background:#fff;
        // }
        label{
          border-right:1px solid #ccc;
        }
        input{
          height: 32px;
          line-height: 32px;
          border:none;
          padding-left:10px;
          background: #fff;
        }
        .el-form-item__label{
          background:#f2f2f2;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width:182px;
        }
        .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
          margin: 0px;
          
        }
        .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
          height:50px;
          line-height: 50px;
          text-align: center;
        }
      }
      .imgshow{
        .el-upload-list--picture .el-upload-list__item{
            overflow: hidden;
            z-index: 0;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-top: 10px;
            padding: 10px 10px 10px 90px;
            height: 92px;
            width: 100px;
            float: left;
        }
       
      }
      .el-input__prefix i{
        display: none;
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
      }
    }
  }
}

</style>

