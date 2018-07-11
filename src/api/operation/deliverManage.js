import fetch from '../../utils/fetch'

/**
 * 送货列表 39
 */

export function postSelectLoadMainInfoList(data) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 取消送货(批量)
 */
export function putDeliverLoad(data) {
  return fetch.put('/api-order/order/load/v1/cancelLoadTruck/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}

/**
 * 送货完成(批量)
 */
export function putCompleteDelivery(data) {
  return fetch.put('/api-order/order/load/v1/completeDelivery/?loadTypeId=' + data.loadTypeId + '&loadIds=' + data.loadIds)
}
/**
 * 送货签收(批量)
 */
export function postBatchSign(data) {
	return fetch.post('/api-order/order/sign/v1/batchSign/', data).then(res => {
		return res.data || {}
	})
}