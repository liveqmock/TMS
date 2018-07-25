import fetch from '../../utils/fetch'

/**************************************
 *             资金流水汇总
 **************************************/
/**
 * 查询资金流水汇总列表
 */
export function postFindLowList(data) {
  return fetch.post('/api-finance/finance/tmsfinancecapitalflow/v1/list/', data).then(res => {
    return res.data
  })
}
/**
 * 查询记收入或支出-费用信息
 */
export function getFeeInfo(orgId, paymentsType) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId=' + orgId + '&paymentsType=' + paymentsType)
    .then(res => {
      return res.data
    })
}
/**
 * 记收入-运单信息
 */
export function getOrderShipList(orgId, incomePayType, paymentsType) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList/', {
      params: {
        orgId: orgId,
        paymentsType: paymentsType,
        incomePayType: incomePayType
      }
    })
    .then(res => {
      return res.data
    })
}
/**
 * 取消结算
 */
export function postCancelSettlement(data) {
  return fetch.post('/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement?flowId=' + data.flowId + '&detailFlowId=' + data.detailFlowId)
}
/**
 * 记收入支出
 */
export function postAddIncome(data){
	return fetch.post('/api-finance/finance/tmsfinancecapitalflow/v1/addIncome/', data).then(res => {
		return res.data
	})
}
/**************************************
 *             资金流水明细
 **************************************/
/**
 * 资金流水明细
 * shipOrderType 关联类型（1-运单/2-配载单/3-中转单）
 * 根据shipOrderType来显示数据表格视图
 */
export function postDetailList(data) {
  return fetch.post('/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/', data).then(res => {
    return res.data
  })
}
/**
 * 取消结算
 */
export function postDetailCancel(data) {
  return fetch.delete('/api-finance/finance/tmsfinancecapitalflowdetail/v1/cancel/' + data)
}
