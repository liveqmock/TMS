import fetch from '../../utils/fetch'

/**
 * /finance/tmsfinancefinancialway/v1/list
 查询收支方式管理分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postTmsFfinancialwayList(params) {
  return fetch.post('/api-finance/finance/tmsfinancefinancialway/v1/list/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 插入收支方式管理信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postAdd(params) {
  return fetch.post('/api-finance/finance/tmsfinancefinancialway/v1/add', params).then(res => {
    return res.data || {}
  })
}

/**
 * 根据ID修改收支方式管理信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function putUpdate(params) {
  return fetch.put('/api-finance/finance/tmsfinancefinancialway/v1/update', params).then(res => {
    return res.data || {}
  })
}

/**
 * ///finance/tmsfinancefinancialway/v1/stop/{id}
 // 根据ID停用收支方式管理
 * @param id
 * @returns {*}
 */
export function putStop(id) {
  return fetch.put('/api-finance/finance/tmsfinancefinancialway/v1/stop/' + id )
}

