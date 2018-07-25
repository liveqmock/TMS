import fetch from '../../utils/fetch'

/**
 /finance/customerdetail/v1/
 查询对账表分页信息
 1.短驳 loadTypeId对应值：38
 2.干线 loadTypeId对应值：39
 3.送货 loadTypeId对应值：40
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfShortDetailList(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/carFeePagelist/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 /finance/customerdetail/v1/
 车费对账创建对账单
 1.短驳 loadTypeId对应值：38
 2.干线 loadTypeId对应值：39
 3.送货 loadTypeId对应值：40
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfBillCheckCarBaseInfo(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/getBillCheckCarBaseInfo/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 /finance/customerdetail/v1/
 车费创建对账单应付 已付
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfBillCheckCarInitList(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarInitList', params).then(res => {
    return res.data
  })
}

/**
 http://localhost:7010/tmsfinanceservice/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo?access_token={{access_token}}
 {"orgId": 1, "checkBillCode": "DZ1805210004","payDetailList":[{"arrSendPay":100},{"arrSendPay":10}],"hadPayDetailList":[{"arrSendPay":101},{"arrSendPay":10}]}
 车费创建对账单应付 已付
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCreateBillCheckCarInfo(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo', params).then(res => {
    return res.data
  })
}

/**
 车费对账修改对账单 查询基本信息方法名
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfDtoById(id) {
  return fetch.get('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/getDtoById/' + id)
}

/**
 车费对账修改对账单  应付 已付
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfBillCheckCarUpdateList(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheckcardetail/v1/getBillCheckCarUpdateList', params).then(res => {
    return res.data
  })
}

/**
 * /finance/tmsfinancebillcheckcardetail/v1/{id}
 根据ID删除财务车费对账信息
 * @param id
 * @returns {*}
 */
export function deleteCarShort(id) {
  return fetch.delete('/api-finance/finance/tmsfinancebillcheck/v1/' + id )
}
