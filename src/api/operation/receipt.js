import fetch from '../../utils/fetch'

/**
 * 获取回单列表
 * @param {*} params
 * {
  "currentPage":1,
  "pageSize":10,
  "vo":{
    "pageType":1
  }
}
 */
export function postReceipt(params) {
  return fetch.post('/api-order/order/receipt/v1/list', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 *回收
 * @param {*} params
 */
export function putUpdateReceipt(params) {
  return fetch.put('/api-order/order/receipt/v1/updateReceipt', params)
}
/**
 * 取消回单
 * @param {*} params
 */
export function putUpdateCancelReceipt(params) {
  return fetch.put('/api-order/order/receipt/v1/updateCancelReceipt/',params)
}
