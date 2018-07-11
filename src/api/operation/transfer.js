import fetch, { checkStatus } from '@/utils/fetch'

/**
 * 新增中转外发时左边的库存列表
 * orgId 组织id
 */
export function getLeftRepetoryList(orgId) {
  return fetch.get('/api-order/order/load/v1/selectAddLoadRepertoryList/', {
    params: {
      orgId
    }
  }).then(checkStatus)
}

/**
 * 中转管理_插入
 * @param {*} data
{
	"transferBatchNo":"batchno",
	"carrierId":1,
	"carrierMobile":"cMobile",
	"arrivalMobile":"aMobile",
	"transferTime":"2018-06-06 12:00:00",
	"remark":"remark",
	"tmsOrderTransferDetails":[
		{
			"repertoryId":7,
			"shipId":7,
			"childShipId":null,
			"odd_numbers":"",
			"transferCharge":7,
			"deliveryExpense":7,
			"transferOtherFee":7,
			"totalCost":21,
			"paymentId":1
		},
		{
			"repertoryId":8,
			"shipId":8,
			"childShipId":null,
			"oddNumbers":"",
			"transferCharge":8,
			"deliveryExpense":8,
			"transferOtherFee":8,
			"totalCost":24,
			"paymentId":1
		}
	]
}
 */
export function postNewTransfer(data) {
  return fetch.post('/api-order/order/transfer/v1/insertTransfer', data).then(checkStatus)
}

export function getExportExcel() {
  return new Promise()
}

/**
 * 中转管理_修改
 * @param {*} data 同新建
 */
export function putModifyTransfer(data) {
  return fetch.put('/api-order/order/transfer/v1/updateTransfer', data).then(checkStatus)
}

/**
 * 修改中转外发时左边的库存列表
 * @param {*} orgId 组织id
 */
export function getUpdateLoadRepertoryList(orgId, batchNo) {
  return fetch.get('/api-order/order/transfer/v1/selectUpdateLoadRepertoryList', {
    params: {
      batchNo,
      orgId
    }
  }).then(checkStatus)
}
/**
 * 修改时中转信息及中转列表
 * @param {*} orgId 组织id
 */
export function getUpdateTransferDetail(orgId, batchNo) {
  return fetch.get('/api-order/order/transfer/v1/selectUpdateTransferDetailList', {
    params: {
      batchNo,
      orgId
    }
  }).then(checkStatus)
}
/**
 * 已中转运单列表
 * @param {*} data 请求参数
{
	"currentPage":1,
	"pageSize": 10,
	"vo": {
		"orgId":1,
		"transferTimeStart":"",
		"transferTimeEnd":"",
		"ydCreateTimeStart":"",
		"ydCreateTimeEnd":"",
		"carrierId":null,
		"shipFromCityName":"",
		"shipToCityName":""
	}
}
 */
export function getAlreadyTransferList(data) {
  return fetch.post('/api-order/order/transfer/v1/selectAlreadyTransferList', data).then(checkStatus).then(res => {
    return res.data || { list: [], total: 0 }
  })
}

/**
 * 中转批次列表
 * @param {*} data 请求参数
{
	"currentPage":1,
	"pageSize": 10,
	"vo":{
		"orgId":1,
		"transferTimeStart":"",
		"transferTimeEnd":"",
		"carrierId":null
	}
}
 */
export function getAlreadyTransferBatchList(data) {
  return fetch.post('/api-order/order/transfer/v1/selectTransferBatchList', data).then(checkStatus).then(res => {
    return res.data || { list: [], total: 0 }
  })
}

/**
 * 查看中转批次
 * @param {*} data 请求参数
{
	"orgId":1,
	"transferBatchNo":"batchno"
}
 */
export function getTransferBatchDetailsList(data) {
  return fetch.post('/api-order/order/transfer/v1/selectTransferBatchDetailsList', data).then(checkStatus).then(res => {
    return res.data || {}
  })
}

/**
 * 取消中转
 * @param {*} data 请求参数
{
	"orgId":1,
	"batchNos":"batchno, batchno2"
	"shipIds":"shipId, shipId2"
}
 */
export function deleteTransfer(orgId, batchNos, shipIds) {
  return fetch.delete('/api-order/order/transfer/v1/cancelTransfer?orgId=' + orgId + '&batchNos=' + batchNos + '&shipIds=' + shipIds).then(checkStatus)
}

/**
 * 获得中转批次号
 * @param {*} orgId 组织id
	"orgId":1
 */
export function getBatchNo(orgId) {
  return fetch.get('/api-order/order/transfer/v1/getBatchNo', {
    params: {
      orgId
    }
  }).then(checkStatus)
}
