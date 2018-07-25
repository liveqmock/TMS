import fetch from '../../utils/fetch'

/**************************************
 *             运单结算
 **************************************/
/**
 * 根据费用类型查询应付回扣,实际提货费,其他费用支出列表,不传费用类型查询全部
 * 费用类型查询:应付回扣(feeType:8),实际提货费(feeType:10),其他费用支出(feeType:13)
 * 不传费用类型查询全部
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindListByFeeType(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 查询应付中转费列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindTransferList(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 查询异常理赔列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindAbnormalList(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 查询异动费用列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindChangeList(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 结算保存
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postCreateloadSettlement(orgId, data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/create/'+ orgId, data).then(res => {
    return res.data
  })
}


/**************************************
 *             批次结算
 **************************************/
/**
 * 结算页面列表-汇总
 * 
 * 必填：orgid(短驳网点、送货网点、发车网点)、ascriptionOrgid(所属结算网点,当前网点可帮下属网点结算,这里传的是帮谁结算就传谁的网点)、sign、status
 * sign：1发车汇总 2到车汇总
 * 发车汇总：现付运费19,现付油卡20,回付运费21,回付油卡22,整车保险费25,发站装卸费26,发站其他费27
 * 到车汇总：到付运费23,到付油卡24,到站装卸费28,到站其他费29
 * status(NOSETTLEMENT:未结算,PARTSETTLEMENT:部分结算,ALLSETTLEMENT:已结算)
 * 
 */
export function postPayListBySummary(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 结算页面列表-单个费用
 * 
 * 必填：orgid(短驳网点、送货网点、发车网点)、ascriptionOrgid(所属结算网点,当前网点可帮下属网点结算,这里传的是帮谁结算就传谁的网点)、feeTypeId、status
 * feeTypeId参照tms_finance_fee_type表传id
 * status(NOSETTLEMENT:未结算,PARTSETTLEMENT:部分结算,ALLSETTLEMENT:已结算)
 * 如果为列表页面,则status只可传一个值，如果为结算的列表页面左边,status可传多个，如'NOSETTLEMENT,PARTSETTLEMENT'
 * 
 */
export function postPayListByOne(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 *  获得结算单号
 */
export function GetFeeInfo(orgId, paymentsType) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo/?orgId=' + orgId + '&paymentsType=' + paymentsType)
}
/**
 * 结算保存
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postLoadSettlement(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/loadSettlement/', data).then(res => {
    return res.data
  })
}