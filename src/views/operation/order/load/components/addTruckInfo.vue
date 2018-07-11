<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addTruckPop" v-loading="loading">
    <template class="addTruckPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <el-form-item label="车牌号码" prop="truckIdNumber">
          <el-input v-model="form.truckIdNumber" maxlength="10" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="车辆来源" prop="truckSource">
          <SelectType v-model="form.truckSource" type="truck_source" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="车型" prop="truckType">
          <SelectType v-model="form.truckType" type="truck_type" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="可载重" prop="truckLoad">
          <el-input v-model.number="form.truckLoad" maxlength="18" auto-complete="off">
            <template slot="append">吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="可载体积" prop="truckVolume">
          <el-input v-model.number="form.truckVolume" maxlength="18" auto-complete="off">
            <template slot="append">方</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车长" prop="truckLength">
          <el-input v-model.number="form.truckLength" maxlength="18" auto-complete="off">
            <template slot="append">米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车宽" prop="truckWidth">
          <el-input v-model.number="form.truckWidth" maxlength="20" auto-complete="off">
            <template slot="append">米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车高" prop="truckHeight">
          <el-input v-model.number="form.truckHeight" maxlength="20" auto-complete="off">
            <template slot="append">米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="归属网点" prop="orgid">
          <SelectTree v-model="form.orgid" @change="getTreeOrgid" />
        </el-form-item>
        <el-form-item label="车辆品牌" prop="truckBrand">
          <el-input maxlength="20" v-model="form.truckBrand" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="车辆注册时间" prop="truckRegisterDate">
          <el-date-picker v-model="form.truckRegisterDate" align="right" type="date" :picker-options="pickOption2" placeholder="选择日期" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车辆报废时间" prop="truckScrapDate">
          <el-date-picker v-model="form.truckScrapDate" align="right" type="date" :picker-options="pickOption2" placeholder="选择日期" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="truckRemarks" label="备注" prop="truckRemarks">
          <el-input type="textarea" maxlength="125" v-model="form.truckRemarks"></el-input>
        </el-form-item>
        <!-- 个人信息 -->
        <div class="hr"></div>
        <el-form-item label="车辆单位" prop="truckUnit">
          <el-input v-model="form.truckUnit" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位电话" prop="truckUnitMobile">
          <el-input v-numberOnly v-model="form.truckUnitMobile" maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="司机" prop="driverId">
          <el-select v-model="form.driverId" filterable placeholder="请选择">
            <el-option v-for="item in DriverList" :key="item.id" :label="item.driverName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="司机电话" prop="driverMobile">
          <el-input maxlength="20" v-numberOnly v-model="form.driverMobile" auto-complete="off"></el-input>
        </el-form-item>
        <div class="hr"></div>
        <el-form-item class="clearfix uploadcard">
          <div class="idcard">
            <upload :title="'行驶证'" v-model="form.drivingLicense" />
          </div>
          <div class="drviercard">
            <upload :title="'营运执照'" v-model="form.operatingLicense" />
          </div>
          <div class="certcard">
            <upload title="车辆照片" v-model="form.vehiclePic" />
          </div>
        </el-form-item>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { postTrunk, putTrunk } from '@/api/company/trunkManage'
import { getAllDriver } from '@/api/company/driverManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'
import SelectType from '@/components/selectType/index'

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
    orgid: {
      required: true
    },
    isModify: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    truckTypes: {
      type: Array,
      default: () => []
    },
    truckSources: {
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
    const _this = this
    const validateFormMobile = function(rule, value, callback) {
      if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    const createValidate = function(max, tip) {
      return function(rule, value, callback) {
        if (value > max) {
          callback(new Error(tip))
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        "driverMobile": "", // 司机电话 11
        "driverId": '', // 司机ID
        "orgid": '', // 所属机构
        "truckBrand": "", // 车辆品牌 20
        "truckHeight": '', // 车高
        // "truckId": 0, // 车辆ID
        "truckIdNumber": "", // 车牌号码 12
        "truckLength": '', // 车长
        "truckLoad": '', // 可载重
        "truckRegisterDate": "", // 车辆注册时间
        "truckRemarks": "", // 备注 50
        "truckScrapDate": "", // 车辆报废时间
        "truckSource": '', // 车牌来源
        "truckType": '', // 车型
        "truckUnit": "", // 车辆单位 50
        "truckUnitMobile": "", // 单位电话 11
        "truckVolume": '', // 可载体积
        "truckWidth": '', // 车宽
        "drivingLicense": '', //行驶证
        "operatingLicense": '', //营运执照
        "vehiclePic": '' //车辆照片
      },
      formLabelWidth: '100px',
      tooltip: false,
      rules: {
        truckIdNumber: [
          { required: true, message: '请输入车牌号码', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        driverMobile: [
          { message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
        ],
        truckLoad: [
          { validator: createValidate(1000, '吨数不能超过1000吨'), type: 'number' }
        ],
        truckVolume: [
          { validator: createValidate(1000, '体积不能超过1000方'), type: 'number' }
        ],
        truckLength: [
          { validator: createValidate(100, '车长不能超过100米'), type: 'number' }
        ],
        truckHeight: [
          { validator: createValidate(20, '车高不能超过20米'), type: 'number' }
        ],
        truckWidth: [
          { validator: createValidate(10, '车宽不能超过10米'), type: 'number' }
        ]
      },
      popTitle: '新增车辆',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,

      pickOption2: {
        firstDayOfWeek: 1
      },
      cacheDriverList: {},
      DriverList: []

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
    orgid(newVal, oldVal) {
      this.form.orgid = newVal
      if (oldVal !== newVal) {

      }
    },
    info() {
      if (this.isModify) {
        this.popTitle = '修改车辆'
        let data = Object.assign({}, this.info)
        for (let i in this.form) {
          this.form[i] = data[i]
        }
        this.form.truckId = data.truckId
      } else {
        this.popTitle = '新增车辆'
        for (let i in this.form) {
          this.form[i] = typeof this.form[i] === 'string' ? '' : ''
        }
        delete this.form.truckId
        this.form.orgid = this.orgid
      }
    }
  },
  methods: {
    getTreeOrgid(orgid) {
      // 切换组织了列表时更新司机列表信息
      this.getDriverList(orgid)
    },
    initInfo() {
      this.loading = false
      this.getTreeOrgid(this.orgid)
    },
    getOrgid(id) {
      this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = Object.assign({}, this.form)
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            promiseObj = putTrunk(data)
          } else {
            promiseObj = postTrunk(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            });
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    getDriverList(orgid) {
      if (this.cacheDriverList[orgid]) {
        this.DriverList = this.cacheDriverList[orgid]
      } else {
        getAllDriver({
          "currentPage": 1,
          "pageSize": 200,
          "vo": {
            "orgid": orgid
          }
        }).then(data => {
          this.DriverList = data.list
          this.cacheDriverList[orgid] = data.list
        })
      }
    }
  }
}

</script>
<style lang="scss">
.addTruckPop {
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 560px;
  max-width: 560px;

  .el-form--inline .el-form-item {
    margin-right: 0;
    width: 50%;
    float: left;
    display: flex;
  }

  .el-form--inline .uploadcard {
    width: 100%;
  }

  .el-form--inline .truckRemarks {
    width: 100%;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-form-item__label {
    font-size: 12px;
  }

  .el-form-item__content {
    flex: 1;
  }

  .select-tree {
    width: 100%;
  }

  .hr {
    clear: both;
    margin: 20px 0;
    border-top: 1px dashed #ccc;
    width: 100%;
    height: 0;
  }

  .drviercard,
  .certcard,
  .idcard {
    float: left;
    width: 254px;
    height: 136px;
    margin-bottom: 14px;
  }

  .upload-container {
    height: 100%;
  }

  .drviercard {
    float: right;
  }

  .licensePicture {
    height: 116px;
    line-height: 1.2;
  }

  .popRight-content {
    padding: 20px 10px 0;
    box-sizing: border-box;
  }

  .el-select .el-input__inner {
    padding-right: 15px;
  }
}

</style>
