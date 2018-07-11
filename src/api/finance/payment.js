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
export function postGoodsfundsList(params) {
  return fetch.post('/api-finance/finance/goodsfunds/v1/list', params).then(res => {
                // console.log(res);
    return res.data || { list: [], total: 0 }
  })
}

/**
 *回收
 * @param {*} params
 */
export function putUpdateGoodsFunds(params) {
  return fetch.put('/api-finance/finance/goodsfunds/v1/updateGoodsFunds', params)
}
/**
 * 取消
 * @param {*} params
 */
export function putUpdateCancelReceipt(params) {
  return fetch.put('/api-finance/finance/goodsfunds/v1/updateCancelReceipt/', params)
}
