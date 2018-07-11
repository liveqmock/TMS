import fetch from '../../utils/fetch'
/**
 * 自提签收列表
 * @returns {Promise<AxiosResponse<any>>}
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{
	}
}
*/
export function postPickuplist(params) {
  return fetch.post('/api-order/order/sign/v1/pickupList', params).then(res => {
    return res.data || {}
  })
}
/**
 * 自提取消签收,需要传递签收id,库存id
 * {
	"repertoryId":25,
	"signId":37
}
 */
export function postCancelPickupSign(id) {
  return fetch.post('/api-order/order/sign/v1/cancelPickupSign', id).then(res => {
    return res.data || {}
  })
}
/**
 * 自提签收,需要传递库存id
 * 提货签收
 * {
	"repertoryId":25,
	"signTime":"",
	"signName":"张三",
	"signCocumentTypeId":96,
	"documentNum":"4406543131654",
	"signTypeId":99,
	"remark":"备注",
	"signPic":"xxx,xxx,xxx"
}
 */
export function postPickupSign(id) {
  return fetch.post('/api-order/order/sign/v1/pickupSign', id)
}
/**
 * 修改签收
 * 根据ID修改运单签收信息
 */
export function putXiugai(id, params) {
  return fetch.post('/api-order/order/sign/v1/?id=' + id, params)
}

/**
 * 送货签收列表
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{
	}
}
 */
export function postDeliveryList(params) {
  return fetch.post('/api-order/order/sign/v1/deliveryList', params).then(res => {
    return res.data || {}
  })
}
/**
 * 取消送货签收,中转签收,需要传递运单id,签收id
 * {
	"signId":26,
	"shipId":32
}
 */
export function postCancelSign(id) {
  return fetch.post('/api-order/order/sign/v1/cancelSign', id).then(res => {
    return res.data || {}
  })
}
/**
 * 送货签收中转签收
 * 送货签收,中转签收,需要传递运单id,子运单id
 * {
	"shipId":31,
	"childShipId":"",//子运单id
	"signTime":"",
	"signName":"张三",
	"signCocumentTypeId":96,
	"documentNum":"4406543131654",
	"signTypeId":99,
	"remark":"备注",
	"signPic":"xxx,xxx,xxx"
}
 */
export function postSign(id) {
  return fetch.post('/api-order/order/sign/v1/sign', id).then(res => {
    return res.data || {}
  })
}
/**
 * 中转签收列表
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{	
	}
}
 */
export function postTransferList(params) {
  return fetch.post('/api-order/order/sign/v1/transferList', params).then(res => {
    return res.data || {}
  })
}
/**
 * 批量送货签收,中转签收,需要传递运单ids,子运单ids
 * {
	"shipIds":[25,26],
	"childShipIds":[null,null],
	"signTime":"",
	"signName":"张三",
	"signCocumentTypeId":96,
	"documentNum":"4406543131654",
	"signTypeId":99,
	"remark":"备注",
	"signPic":"xxx,xxx,xxx"

 */
export function postBatchSign(id) {
  return fetch.post('/api-order/order/sign/v1/batchSign', id)
}
/**
 * 批量提货签收
 * 自提批量签收,需要传递库存ids
 * {	
	"repertoryIds":[25,26],
	"signTime":"",
	"signName":"张三",
	"signCocumentTypeId":96,
	"documentNum":"4406543131654",
	"signTypeId":99,
	"remark":"备注",
	"signPic":"xxx,xxx,xxx"
}
 */
export function postPickupBatchSign(ids) {
  return fetch.post('/api-order/order/sign/v1/pickupBatchSign', ids)
}