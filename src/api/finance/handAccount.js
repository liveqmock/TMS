import fetch from '@/utils/fetch'

/**
 * 根据运单ID修改员工对账明细信息
 * @param {*} data 对账信息
 {
  "createTime": "2018-07-09T06:48:59.921Z",
  "feeName": "string",
  "finishAccount": 0,
  "id": 0,
  "noSettlementFee": 0,
  "orgName": "string",
  "orgid": 0,
  "receiverCustomerName": "string",
  "receiverCustomerUnit": "string",
  "senderCustomerName": "string",
  "senderCustomerUnit": "string",
  "shipFromCityName": "string",
  "shipId": 0,
  "shipNowpayFee": 0,
  "shipSn": "string",
  "shipToCityName": "string",
  "status": "NOSETTLEMENT",
  "statusValue": "string",
  "userId": 0,
  "userName": "string"
 */
export function putModifyFee(data) {
  return fetch.put('/api-finance/finance/employeeaccount/v1', data)
}

export function getExportExcel(params) {
  return Promise.reslove('')
}

/**
 * 插入员工对账明细信息
 * @param {*} data 对账明细信息
 {
  "createTime": "2018-07-09T06:50:49.672Z",
  "feeName": "string",
  "finishAccount": 0,
  "id": 0,
  "noSettlementFee": 0,
  "orgName": "string",
  "orgid": 0,
  "receiverCustomerName": "string",
  "receiverCustomerUnit": "string",
  "senderCustomerName": "string",
  "senderCustomerUnit": "string",
  "shipFromCityName": "string",
  "shipId": 0,
  "shipNowpayFee": 0,
  "shipSn": "string",
  "shipToCityName": "string",
  "status": "NOSETTLEMENT",
  "statusValue": "string",
  "userId": 0,
  "userName": "string"
}
 */
export function postNewFee(data) {
  return fetch.post('/api-finance/finance/employeeaccount/v1', data)
}

/**
 * 根据ID查询员工对账明细信息
 * @param {*} id 员工id
 */
export function getFeeInfo(id) {
  return fetch.get('/api-finance/finance/employeeaccount/v1/' + id)
}

/**
 * 根据运单ID删除员工对账明细信息
 * @param {*} shipId 运单ID
 */
export function deleteFeeInfo(shipId) {
  return fetch.delete('/api-finance/finance/employeeaccount/v1/' + shipId)
}

/**
 * 查询员工对账明细分页信息
 * @param {*} data 查询参数
 {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "createTime": "2018-07-09T06:54:45.801Z",
    "endTime": "string",
    "finishAccount": 0,
    "id": 0,
    "orgid": 0,
    "shipId": 0,
    "startTime": "string",
    "status": "NOSETTLEMENT",
    "userId": 0,
    "userName": "string"
  }
}
 */
export function getFeeList(data) {
  return fetch.post('/api-finance/finance/employeeaccount/v1/getEmployeeList', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 查询员工交账汇总分页信息
 * @param {*} data 查询参数
 {
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "createTime": "2018-07-09T06:56:26.510Z",
    "endTime": "string",
    "finishAccount": 0,
    "id": 0,
    "orgid": 0,
    "shipId": 0,
    "startTime": "string",
    "status": "NOSETTLEMENT",
    "userId": 0,
    "userName": "string"
  }
}
 */
export function getSummaryFeeList(data) {
  return fetch.post('/api-finance/finance/employeeaccount/v1/getEmployeeSummarize', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
