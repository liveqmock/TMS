<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="_storagesPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <div class="batchTypeNo">
        批次：{{getBatchNo}}
      </div>
      <div class="storagesInfoPop_content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab-card">
          <el-tab-pane label="批次详情" name="first">
            <div class="_tabs-cont" v-loading="loading">
              <div class="info_form">
                <!--<el-form-item label="网点">-->
                <!--<SelectTree v-model="otherinfo.orgid" />-->
                <!--</el-form-item>-->
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="110px" class="sta_searchinfo clearfix" :model="formModel">
                  <el-form-item label="到达网点:">
                    <el-input v-model="formModel.arriveOrgName" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="车牌号码:">
                    <el-input v-model="formModel.truckIdNumber" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机姓名:">
                    <el-input v-model="formModel.dirverName" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机电话:">
                    <el-input v-model="formModel.dirverMobile" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载体积:">
                    <el-input v-model="formModel.truckVolume" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载重量:">
                    <el-input v-model="formModel.truckLoad" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="分摊方式:">
                    <el-input v-model="formModel.apportionTypeName" maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="配载日期:">
                    <el-input :value="formModel.loadTime " maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="要求到达日期:" class="art_arriveTime">
                    <!--<el-input :value="formModel.requireArrivedTime | parseTime('{y}/{m}/{d}')" maxlength="15" clearable disabled>-->
                    <el-input :value="formModel.requireArrivedTime " maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注:" class="art_remk">
                    <el-input v-model="formModel.remark" clearable maxlength="300" auto-complete="off" type="textarea" disabled>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="infos_table">
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="80px" class="sta_searchinfo clearfix">
                  <ul>
                    <li>
                      <p>现付运费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.nowpayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>现付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.nowpayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>回付运费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.backpayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>回付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.backpayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到付运费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.arrivepayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.arrivepayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>整车保险费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.carloadInsuranceFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>发站装卸费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.leaveHandlingFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>发站其他费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.leaveOtherFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到站装卸费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.arriveHandlingFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到站其他费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input maxlength="10" v-model="formModel.arriveOtherFee" disabled></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </el-form>
              </div>
              <div class="tab_info">
                <div class="btns_box_send">
                  <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain class="table_export">打印清单</el-button>
                  <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain class="table_import">导出清单</el-button>
                  <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
                </div>
                <div class="infos_tab">
                  <el-table ref="multipleTable" :data="usersArr" stripe border @row-click="clickDetails" @selection-change="getSelection" height="80%" tooltip-effect="dark" :default-sort="{prop: 'id', order: 'ascending'}" >
                    <el-table-column fixed sortable type="selection" width="50">
                    </el-table-column>
                    <el-table-column
                    fixed
                    sortable
                    label="序号"
                    width="100">
                      <template slot-scope="scope">{{  scope.$index + 1 }}</template>
                    </el-table-column>
                    <el-table-column fixed sortable prop="shipFromOrgName" width="120" label="开单网点" >
                    </el-table-column>
                    <el-table-column prop="shipSn" width="150" sortable label="运单号">
                    </el-table-column>
                    <el-table-column prop="childShipId" sortable width="180" label="子运单号">
                    </el-table-column>
                    <el-table-column prop="loadAmount" label="配载件数" width="120" sortable>
                    </el-table-column>
                    <el-table-column sortable prop="loadWeight" width="110" label="配载重量">
                    </el-table-column>
                    <el-table-column prop="loadVolume" label="配载体积" width="120" sortable>
                    </el-table-column>
                    <!--actualAmount-->
                    <el-table-column prop="loadAmount" sortable width="120" label="库存件数">
                    </el-table-column>
                    <!--actualWeight-->
                    <el-table-column sortable prop="loadWeight" width="120" label="库存重量">
                    </el-table-column>
                    <!--actualVolume-->
                    <el-table-column label="库存体积" width="120" prop="loadVolume" sortable>
                    </el-table-column>
                    <el-table-column prop="loadAmount" sortable width="120" label="运单件数">
                    </el-table-column>
                    <!--actualWeight-->
                    <el-table-column sortable prop="loadWeight" width="120" label="运单重量">
                    </el-table-column>
                    <!--actualVolume-->
                    <el-table-column label="运单体积" width="120" prop="loadVolume" sortable>
                    </el-table-column>
                    <el-table-column prop="shipFromCityName" label="出发城市" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="shipToCityName" label="到达城市" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="shipSenderName" label="发货人" width="100" sortable>
                    </el-table-column>
                    <el-table-column prop="shipSenderMobile" label="发货人电话" width="110" sortable>
                    </el-table-column>
                    <el-table-column prop="shipReceiverName" label="收货人" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="shipReceiverMobile" label="收货人电话" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="cargoName" label="货品名" width="100" sortable>
                    </el-table-column>
                    <el-table-column prop="shipGoodsSn" label="货号" width="130" sortable>
                    </el-table-column>
                    <el-table-column prop="shipRemarks" label="运单备注" width="120" sortable>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="deliveryinfo_box" v-loading="loading">
              <el-row class="stepItem_title">
                <el-col :span="5" class="tracktype">类型</el-col>
                <el-col :span="4">操作时间</el-col>
                <el-col :span="3">操作网点</el-col>
                <el-col :span="2">操作人</el-col>
                <el-col :span="6">操作信息</el-col>
              </el-row>
              <div class="stepinfo">
                <el-steps direction="vertical">
                  <el-step @mouseover.native="setThisActive" @mouseout.native="offThisActive" v-for="(item, index) in trackDetail" :key="index">
                    <span slot="icon" class="location"></span>
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="5">
                          <span class="typebox">{{item.loadStatus}}</span>
                          <template v-if="item.addStatus===1">
                            <span title="编辑" @click="editItem(item)" class="modifybtn"></span>
                            <span title="删除" @click="deleteTrack(item)" class="deletebtn"></span>
                          </template>
                        </el-col>
                        <el-col :span="4" class="textcenter">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
                        </el-col>
                        <el-col :span="3" class="textcenter">
                          <p>{{item.orgName}}</p>
                        </el-col>
                        <el-col :span="4">
                          <p>
                            <i class="track-human" v-if="item.addStatus===1"></i>
                            <i class="icon_blank" v-else></i> {{item.operatorUsername}}
                          </p>
                        </el-col>
                        <el-col :span="8">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <el-step>
                    <span slot="icon" class="location"></span>
                  </el-step>
                </el-steps>
              </div>
            </div>
            <!--  <div class="tab_box">
              <div class="tab_box_item">
                <el-row class="stepItem_title">
                  <el-col :span="4" :offset="4"><b>操作时间</b></el-col>
                  <el-col :span="3"><b>操作网点</b></el-col>
                  <el-col :span="2"><b>操作人</b></el-col>
                  <el-col :span="3"><b>操作信息</b></el-col>
                </el-row>
                <el-steps direction="vertical">
                  <el-step v-for="(item, index) in trackDetail" :key="item.key" icon="el-icon-location">
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="4">
                          <el-popover placement="right" width="50" trigger="hover" v-if="item.addStatus===1?true:false">
                            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                              <el-button type="text" icon="el-icon-edit-outline" @click="editItem(item)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                              <el-button type="text" icon="el-icon-delete" @click="deleteTrack(item)"></el-button>
                            </el-tooltip>
                            <el-button size="mini" slot="reference">{{item.loadStatus}}</el-button>
                          </el-popover>
                          <el-button size="mini" v-else>{{item.loadStatus}}</el-button>
                        </el-col>
                        <el-col :span="5">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
                        </el-col>
                        <el-col :span="3">
                          <p>{{item.orgName}}</p>
                        </el-col>
                        <el-col :span="3">
                          <p>
                            <i class="icon_man" v-if="item.addStatus===1?true:false"></i>
                            <i class="icon_blank" v-else></i> {{item.operatorUsername}}
                          </p>
                        </el-col>
                        <el-col :span="8">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <el-step icon="el-icon-location"></el-step>
                </el-steps>
              </div>
              <div class="tab_box_item">
              </div>
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="运输合同" name="third">
            <div class="pact">
              <el-form :model="formModel">
                <div class="pact_top">
                  <h3>货物运输合同</h3>
                  <!--<div class="top_num">-->
                  <!--<el-form-item label="合同模板">-->
                  <!--<el-input  placeholder="1" size="mini"></el-input>-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                  <div class="top_no">
                    <el-form-item label="NO.">
                      <el-input placeholder="1" size="mini" disabled v-model="formModel.contractNo"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="pact_content">
                  <div class="pact_title">
                    <span>委托方:</span>
                    <p style="">{{formModel.orgName}}</p>
                    <span>(以下简称甲方)</span>
                  </div>
                  <div class="pact_title">
                    <span>承运方:</span>
                    <p style="">{{formModel.dirverName}}</p>
                    <span>(以下简称乙方)</span>
                  </div>
                  <p class="p_salf">为确保本货物安全运输，根据互利原则，经双方共同协商，签订本运输合同：</p>
                  <div class="p_cont">
                    <p>一、乙方必须证件齐全、真实，车辆车况必须良好，且必须配备完整的防雨防盗设施，运输途中被水淋湿或被盗，乙方无条件地承担全部责任；</p>
                    <p>二、乙方承运途中各项费用开支全由自己承担，途中若因意外交通事故及其他原因造成货物损失、变质、短缺等责任由乙方承担，若甲方有带路人员，乙方 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要负担其伙食费；</p>
                    <p>三、车辆装货期间，甲乙双方必须当场清点核实数量，并负责将甲方有关票据带到个卸货点，运输途中不得把甲方货物转让给第三者承运，也不允许乙方途 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中私自增载非甲方的其他货物，否则甲方有权拒付运费；</p>
                    <p>四、乙方在承运途中，若遇交通事故，交通堵塞或车辆故障应及时向甲方反映真实情况，并在甲方允许的时间内排除车辆故障，否则甲方另行排除换装，乙 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方不得擅自做主叫车换货；</p>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="五、本车货物总为">
                      <el-input size="mini" disabled v-model="formModel.loadAmountall"></el-input>件
                      <el-input size="mini" disabled v-model="formModel.loadWeightall"></el-input>千克
                      <el-input size="mini" disabled v-model="formModel.loadVolumeall"></el-input>方,全程运费
                      <el-input size="mini" disabled v-model="formModel.shipFeeAmount"></el-input>元，甲乙双方不得任意减价或涨 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价，乙方不得收取其他劳务费，本车现付运费
                      <el-input size="mini" disabled v-model="formModel.nowpayCarriage"></el-input>元，现付油卡
                      <el-input size="mini" disabled v-model="formModel.nowpayOilCard"></el-input>元，到付运费
                      <el-input size="mini" disabled v-model="formModel.arrivepayCarriage"></el-input>，到付油 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卡
                      <el-input size="mini" disabled v-model="formModel.arrivepayOilCard"></el-input>元，回付运费
                      <el-input size="mini" disabled v-model="formModel.backpayCarriage"></el-input>元，回付油卡
                      <el-input size="mini" disabled v-model="formModel.backpayOilCard"></el-input>元，保险费
                      <el-input size="mini" disabled v-model="formModel.carloadInsuranceFee"></el-input>元 。乙方必须将货物安全 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完整及时运到本公司货运仓库，经双方验收无误后，甲方应一次性付清下次运费；
                    </el-form-item>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="六、本次发车时间为">
                      <el-input size="mini" disabled :value="formModel.departureTime | parseTime('{y}/{m}/{d}')"></el-input>，到达时间为
                      <el-input size="mini" disabled :value="formModel.planArrivedTime | parseTime('{y}/{m}/{d}')"></el-input>。
                    </el-form-item>
                    <p class="p_salf">司机在行驶途中手机不得关机，以便甲方跟进了解运输途中情况；</p>
                  </div>
                  <div class="p_cont">
                    <p>七、本合同一式两份，双方各执一份，未尽事宜，双方另行协商，签字后生效。</p>
                    <el-form-item label="关于本车:" class="p_textarea">
                      <el-input type="textarea" size="mini" v-model="formModel.remark"></el-input>
                    </el-form-item>
                    <!--<p class="p_about">关于本车：直送致兴和樵鸿</p>-->
                    <p class="p_about">附：驾驶员、车辆登记</p>
                  </div>
                  <div class="p_table">
                    <el-form-item label="司机名称:">
                      <el-input size="mini" disabled v-model="formModel.dirverName"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="家庭电话:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="车架号:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="配载人员:">
                      <el-input size="mini" disabled v-model="formModel.userName"></el-input>
                    </el-form-item>
                    <span>甲方签章:</span>
                  </div>
                  <div class="p_table">
                    <el-form-item label="身份证号:">
                      <el-input size="mini" disabled v-model="formModel.driverCardid "></el-input>
                    </el-form-item>
                    <el-form-item label="随车电话:">
                      <el-input size="mini" disabled v-model="formModel.dirverMobile"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号:">
                      <el-input size="mini" disabled v-model="formModel.truckIdNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="发动机号:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <span>乙方签章:</span>
                  </div>
                </div>
                <div class="pact_bottom"></div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <!--  <div slot="footer" class="dialog-footer stepFrom" v-if="isFootSecond">
      <el-form inline :model="formModel" :rules="ruleForm" label-width="80px" ref="formModel">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div slot="footer" class="stepinfo-footer stepFrom" v-if="isFootSecond">
      <el-form inline :model="formModel" :rules="ruleForm" ref="formModel">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model.trim="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
          <transition name="el-zoom-in-center">
            <el-button v-if="isCancelEdit" type="warning" @click="resetForm()" size="mini">取 消</el-button>
          </transition>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button @click="closeMe">关闭</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import selectType from '@/components/selectType/index'
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack, getSelectLoadList } from '@/api/operation/track'
import {postSelectLoadMainInfoList } from '@/api/operation/arteryDelivery'
import { getExportExcel } from '@/api/company/customerManage'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
import { objectMerge2, parseTime, closest } from '@/utils/'
export default {
  data() {
    return {
      getBatchNo: '',
      popTitle: '查看详情',
      activeName: 'first',
      trackDetail: [],
      ruleForm: {},
      loading: false,
      isFootEdit: false,
      isFootSecond: false,
      isFootOther: false,
      isCancelEdit: false,
      propsId: '',
      formModel: {},
      // formModel: {
      //   addStatus: 1,
      //   id: 0,
      //   loadId: 0,
      //   loadStatus: '',
      //   operatorInfo: '',
      //   operatorOrgid: 1,
      //   operatorTime: '',
      //   operatorUserid: 0
      // },
      btnsize: 'mini',
      usersArr: [],
      selected: [],
      //加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      // isModify: false,
      formMode1: {
        // arriveOrgName:'',//到达网点
        // truckIdNumber:'',//车牌号码
        // dirverName:'',//司机姓名
        // dirverMobile:'',//司机电话
        // truckVolume:'',//可载体积
        // truckLoad:'',//可载重量
        // apportionTypeName:'',//分摊方式
        // DateTimeFormat:'',//配载日期
        // requireArrivedTime:'',//要求到达日期：
        // remark:'',
        //  nowpayCarriage:'',//现付运费
        //  nowpayOilCard:'',//现付油卡
        //  backpayCarriage:'',//回付运费
        //  backpayOilCard:'',//回付油卡
        //  arrivepayCarriage:'',//到付运费
        //  arrivepayOilCard:'',//到付油卡
        //  carloadInsuranceFee:'',//整车保险费
        //  leaveHandlingFee:'',//发站装卸费
        //  leaveOtherFee:'',//发站其他费
        //  arriveHandlingFee:'',//到站装卸费
        //  arriveOtherFee:'',//到站其他费
        //   userName //配载人员
      },
      sendTypeId: {
        typeId: 54, //等于54为干线到车确认
      },
      sendModel: {
        "tmsOrderLoad": {
          "id": ""
        },
        tmsOrderLoadFee: {
          "id": "",
          "arriveHandlingFee": "",
          "arriveOtherFee": ""
        },
        tmsOrderLoadDetailsList: [
          // {
          //   id:'',
          //   actualAmount:'',
          //   actualWeight:'',
          //   actualVolume:''
          // }
        ]
      },
      searchQuery: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "loadId": 1
        }
      }
    }
  },
  components: {
    popRight,
    SelectTree,
    selectType

  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
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
    issender: {
      type: Boolean,
      dafault: false
    },
    id: {
      type: [String, Number],
      dafault: false
    }
  },
  watch: {

    info(newVal) {
      this.propsId = this.info.id
      this.getDetail()
      this.fetchAllCustomer()
      this.fetchSelectLoadMainInfoList()
      this.getBatchNo = this.info.batchNo
    },
    isModify(newVal) {
    },
    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
    },
  },
  mounted() {
    this.propsId = this.info.id
    if (this.popVisible) {
      this.getDetail()
      this.fetchAllCustomer()
      this.fetchSelectLoadMainInfoList()
    }
  },
  methods: {
    fetchSelectLoadMainInfoList() {
      this.loading = true
      let selectMainId = this.propsId
      this.searchQuery.vo.loadId = selectMainId
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.formModel = data.list[0]
        this.loading = false
      })

    },
    fetchAllCustomer() {
      this.loading = true
      let _id = this.propsId
      return getSelectLoadList(_id).then(data => {
        this.usersArr = data
        this.loading = false
        this.toggleAllRows()
      })

    },
    getDetail() {
      let id = this.propsId
      return getLoadDetail(id).then(data => {
        this.trackDetail = Object.assign([], data)
      })
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.usersArr.forEach((e, index) => {
          if (e.actualVolume === 0 && e.actualWeight === 0 && e.actualAmount === 0) {
            this.$refs.multipleTable.toggleRowSelection(e, false)
          } else {
            this.$refs.multipleTable.toggleRowSelection(e, true)
          }
        })
      })
    },
    handleClick(tab, event) {
      if (this.activeName === 'second') {
        this.isFootSecond = true
      } else {
        this.isFootSecond = false
      }
    },
    initInfo() {
      this.loading = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModel.id) {
            this.editTrack()
          } else {
            this.addTrack()
          }
        }
        this.closeMe()
      })
    },
    reset() {},
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) {
      console.log(item)
      return deleteTrack(item.id).then(data => {
        this.$message({ type: 'success', message: '删除成功' })
        this.getDetail()
      })
    },
    editItem(item) {
      this.resetForm()
      this.formModel = Object.assign({}, item)
      this.isCancelEdit = true
    },
    editTrack() {
      console.log('修改')
      this.formModel.transferId = 0
      return putUpdateTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    addTrack() {
      console.log('添加')
      this.formModel.loadId = this.id
      return postAddTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    resetForm() {
      this.$refs['formModel'].resetFields()
      this.isCancelEdit = false
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      if (type === 'import') {
        this.showImport()
        return false
      }
      // 判断是否有选中项
      if (!this.selected.length) {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
          // 导出数据
        case 'export':
          let ids2 = this.selected.map(el => {
            return el.customerId
          })
          getExportExcel(ids2.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: '即将自动下载!'
            })
          })
          break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    openAddCustomer() {
      this.AddCustomerVisible = true
    },
    closeAddCustomer() {
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    // 取消高亮样式
    offThisActive(e) {
      let p = closest(e.target, ".el-step")
      if (p) {
        p.classList.remove("trackactive")
      }
    },
    // 设置高亮样式
    setThisActive(e) {
      let p = closest(e.target, ".el-step")
      if (p) {
        p.classList.add("trackactive")
      }
    }
  }
  // }
}

</script>
<style lang="scss">
._tabs-cont {
  // height: calc(100%);
  display: flex;
  flex-direction: column;
  position: relative;

  .tab_info {

    padding: 0 10px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .btns_box_send {
      border-top: 2px dotted #dcdfe6;
      padding-top: 10px;
      margin-bottom: 10px;
      .el-button {
        margin-right: 0;
      }
      .table_setup {
        float: right;
        margin-right: 0;
      }
      .table_export {
        margin-left: 650px;
      }
    }
    .infos_tab {
      width: 100%;
      height: calc(100vh - 570px);
      flex-grow: 1;

      .el-table {
        table {
          th,
          td {
            text-align: center;
          }
        }
        .unauth {
          color: #f00;
        }
      }
      .el-table td,
      .el-table th {
        padding: 5px 0;
      }
    }
  }
  .infos_tab_footer {
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
  .info_form {
    margin-top: 85px;
    padding-bottom: 10px;
    .sta_searchinfo {
      .el-form-item {
        margin-right: 0;
        margin-bottom: 15px;
      }
      .el-form-item.art_remk{
        width: 100%;
        .el-form-item__content{
          width: 82%;
        }
      }
    }
  }
  .infos_table {
    padding: 0 10px 10px 10px;
    margin-top: 10px;
    border-color: #dcdfe6;
    .sta_searchinfo{
      border-left: 1px solid #d4d4d4;
      border-right: 1px solid #d4d4d4;
      ul {
        /*border-top: 2px dotted #bbbbbb;
          margin: 10px -10px -10px 0;
          padding: 5px 10px 10px 10px;
          /*background-color: #fbfbfb;*/
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        li:nth-of-type(1) {
          padding-left: 0;
        }
        li:last-of-type {
          border-right: none;
        }
        li {
          border: 1px solid #eee;
          width: 10%;
          border-bottom: none;
          border-left: none;
          p {
            font-size: 14px;
            text-align: center;
            line-height: 34px;
          }
        }
        .el-form-item {
          margin-bottom: 0;
          margin-right: 0;
        }
      }
    }

  }
}

.tabs-content {
  .info_form,
  .infos_table {
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
    }
  }
}


/*批次详情*/

._storagesPop {
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 1000px;
  max-width: 1000px;
  .sta_searchinfo{
    .el-input.is-disabled {
      .el-input__inner{
        color: #3e9ff1;
        background-color: transparent;

        /*text-align: center;*/
      }
    }
    .el-textarea.is-disabled{
      .el-textarea__inner {
        color: #3e9ff1;
        background-color: transparent;
      }
    }
  }


  .infos_table{
    .el-input.is-disabled{
      .el-input__inner{
        border-radius: 0;
        text-align: center;
      }
    }
  }
}

.batchTypeNo {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: rgb(223, 233, 245);
  padding-left: 15px;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 34;
}

.icon_blank {
  background-size: 15px;
  display: inline-block;
  width: 14px;
  height: 16px;
  vertical-align: middle;
}

.content_head {
  background-color: #E9F3FA;
  line-height: 36px;
  height: 36px;
  padding: 0 10px;
}

.stepFrom {
  background-color: #f2f2f2;
  box-shadow: -1px -1px 10px #bbb;
  text-align: left;
  padding: 0 10px;
  .el-form-item__content {
    vertical-align: middle;
  }
}

.storagesInfoPop_content {
  .tab-card {
    .el-tabs__content {
      padding: 0 !important;
    }
  }
  .tab_descript {}
  .el-tabs__header {
    position: fixed;
    z-index: 34;
    top: 66px;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
  }
  .info {
    background-color: rgb(238, 241, 246);
    margin-top: -30px;
    padding: 10px;
  }
  .info p {
    font-weight: 900;
    font-size: 16px;
    margin-bottom: 0px;
  }
  .info-content {
    margin-top: 10px;
    padding: 20px 10px 10px;
    background-color: #FFF;
    border: 2px dotted rgb(238, 241, 246);
  }
  .itemRecharge {
    background-color: rgb(238, 241, 246);
    padding: 10px;
  }
  .deliveryinfo_box {
    margin: 76px 10px 0 10px;
    display: flex;
    flex-direction: column;
    /* 覆盖ele样式 */
    .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
    .el-step.is-vertical .el-step__head {
      width: 18px;
      position: relative;
      top: 0px;
    }
    .el-step.is-vertical .el-step__line {
      left: 8px;
    }
    .el-step__icon.is-text {
      border-color: transparent;
      border: 0;
      width: 18px;
      height: 18px;
    }
    .el-steps--vertical {
      height: auto;
    }
    .el-step__main {
      padding-bottom: 10px;
    }
    .el-step__description {
      padding-right: 0;
      font-size: 14px;
      color: #333;
    }

    .textcenter {
      text-align: center;
    }
    .typebox {
      background: url("../../../../../assets/png/track-bg.png") no-repeat;
      width: 118px;
      height: 24px;
      padding-left: 16px;
      text-align: center;
      color: #333;
      display: inline-block;
      line-height: 24px;
    }
    .location {
      background: url("../../../../../assets/png/unactive-icon.png") no-repeat;
      width: 18px;
      height: 18px;
      display: inline-block;
    }
    .modifybtn,
    .deletebtn {
      display: inline-block;
      display: none;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-right: 3px;
      background: url("../../../../../assets/png/delete-icon.png") no-repeat;

      &:hover {}
    }
    /* 鼠标划过样式 */
    .trackactive {
      .modifybtn,
      .deletebtn {
        display: inline-block;
      }
      .typebox {
        background: url("../../../../../assets/png/track-active.png") no-repeat;
        color: #fff;
      }
      .location {
        background: url("../../../../../assets/png/active-point.png") no-repeat;
      }
      .el-step__line {
        background-color: #3e9ff1;
      }
    }
    .modifybtn {
      margin-left: 10px;
      background: url("../../../../../assets/png/edit-icon.png") no-repeat;
      margin-right: 8px;
    }
    .steptitle {
      font-size: 14px;
      color: #333;
      height: 34px;
    }
    .stepItem_title {
      color: #333;
      margin-top: 10px;
      padding-left: 34px;
      height: 34px;
      .el-col {
        text-align: center;
      }
      .tracktype {
        text-align: left;
        text-indent: 20px;
      }
    }

    .stepItem {
      /* 解决当出现空值项造成高度为0，使得样式坍塌的异常 */
      .el-col>p {
        min-width: 1px;
        min-height: 1px;
      }
    }
    .stepinfo {
      flex: 1;
      overflow: auto;
    }
    .stepinfo-footer {
      border-top: 1px solid #d8d8d8;
      height: 70px;
      padding-top: 30px;
    }
  }

  .stepFrom {
    background-color: #f2f2f2;
    box-shadow: -1px -1px 10px #bbb;
    text-align: left;
    padding: 0 10px;
    .el-form-item__content {
      vertical-align: middle;
    }
  }

  /*货物运输合同*/
  .pact {
    margin-top:85px;
    padding-left: 20px;
    .pact_top {
      position: relative;
      height: 40px;
      margin-bottom: 10px;
      h3 {
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      .top_num {
        position: absolute;
        right: 10px;
        top: -18px;
        .el-form-item {
          display: flex;
        }
      }
      .top_no {
        position: absolute;
        right: 10px;
        top: -5px;
        .el-form-item {
          display: flex;
          .el-form-item__content {
            .el-input.is-disabled {
              .el-input__inner {
                background-color: #fff;
                border-color: #fff;
              }
            }
          }
        }
      }
    }
    .cont_styles {
      color: #606266;
      font-size: 14px;
    }
    .pact_content {
      .pact_title {
        color: #606266;
        font-size: 14px;
        margin: 10px 0 0 25px;
        p {
          display: inline-block;
          width: 250px;
          border-bottom: 1px solid;
          padding-left: 10px;
        }
      }
      .p_cont,
      .p_input {
        color: #606266;
        font-size: 14px;
      }
      .p_cont {
        .p_textarea.el-form-item {
          display: inline-flex;
          padding-left: 25px;
          margin-bottom: 0;
          .el-textarea {
            width: 250%;
          }
        }
        p.p_about {
          padding-left: 25px;
          margin: 5px 0 5px 0;
        }
        p {
          margin-bottom: 2px;
        }
      }
      p.p_salf {
        color: #606266;
        font-size: 14px;
        padding-left: 25px;
        margin: 5px 0 10px 0;
      }
      .p_input {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            padding: 0;
            line-height: 28px
          }
          .el-form-item__content {
            line-height: 30px;
            .el-input.el-input--mini.is-disabled {
              width: 13%;
              .el-input__inner {
                background: #fff;
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
              }
            }
          }
        }
      }
      .p_table {
        float: left;
        padding-left: 80px;
        width: 400px;
        margin-bottom: 150px;
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__content {
            line-height: 30px;
            .el-input.el-input--mini.is-disabled {
              width: 59%;

              .el-input__inner {
                width: 200px;
                background-color: #fff;
                color:#000 ;
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
              }
            }
            .el-input.el-input--mini {
              width: 59%;
              input.el-input__inner {
                width: 200px;
              }
            }

            /*.el-input.el-input--mini.is-disabled{*/
            /*width: 20%*/
            /*}*/
          }
        }
        .el-form-item:last-of-type {
          margin-bottom: 20px;
        }
      }
      .p_table:last-of-type {
        /*<!--top:-204px;-->*/
        /*left: 550px;*/
        float: right;
        padding-left: 0;
        /*padding-left: 300px;*/
        .el-form-item:last-of-type {
          margin-bottom: 50px;
        }
        span {
          margin-bottom: 100px;
        }
      }
    }



    .pact_bottom {}
  }
}

.cont_rules .el-input--mini .el-input__inner {
  background: #409eff;
}

.p_table .el-input--mini .el-input__inner {
  width: 200px;
}

</style>
