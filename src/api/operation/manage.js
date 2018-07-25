import fetch from '../../utils/fetch'

/** 客户订单列表
 * getPostlist
 * @returns {Promise<AxiosResponse<any>>}
 */

export function getPostlist(params) {
  return fetch.post('/api-order/order/pre/v1/list', params).then(res => {
    return res.data || {}
  })
}
/**
 * 根据id查询订单
 * @param id
 */
export function getSearchOrder(id) {
  return fetch.get('/api-order/order/pre/v1/' + id)
}

/**
 * 拒绝按钮
 * @param ids
 * @returns {AxiosPromise<any>}
 */
export function putRefuse(params) {
  return fetch.put('/api-order/order/pre/v1/refuse', params).then(res => {
    return res.data || {}
  })
}

/**
 *  根据ids批量删除
 * @param ids
 * @returns {AxiosPromise<any>}
 *

 */
export function deletebatchDelete(ids) {
  return fetch.delete('/api-order/order/pre/v1/batchDelete/?ids=' + ids)
}

/**
 *  根据ids修改订单状态为作废
 * @param ids
 * @returns {AxiosPromise<any>}
 *

 */
export function putCancel(ids) {
  return fetch.put('/api-order/order/pre/v1/cancel/?ids=' + ids)
}

/**
 * http://localhost:7010/api-order/order/pre/v1/accept/?access_token={{access_token}}&ids=1,2,3
 * @param ids
 * @returns {*}
 */

export function putAccept(ids) {
  return fetch.put('/api-order/order/pre/v1/accept/?ids=' + ids)
}

/**
 * 插入客户订单
 * @param params
 * {
  "tmsOrderCargoList": [{
    "cargoName": "牙刷"
  }, {
    "cargoName": "牙膏"
  }],
  "customerList": [{
    "customerName": "安发",
    "customerType":1
  }, {
    "customerName": "前端",
    "customerType":2
  }],
  "tmsOrderPre":{"orderSn":"123213"}

}
 */
export function postAddOrder(params) {
  return fetch.post('/api-order/order/pre/v1/', params).then(res => {
    return res.data || {}
  })
}

/**
 * 修改客户订单
 *{
  "tmsOrderCargoList": [{
  	"id": 1,
    "cargoName": "牙刷"
  }],
  "customerList": [{
  	"customerId": 1,
    "customerName": "安发",
    "customerType": 1
  }, {
  	"customerId": 1,
    "customerName": "前端",
    "customerType": 2
  }],
  "tmsOrderPre":{
  	"id":1,
  	"orderSn":"123213"
  }
}
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */

export function postModifyOrder(params) {
  return fetch.post('/api-order/order/pre/v1/updateOrder', params).then(res => {
    return res.data || {}
  })
}


