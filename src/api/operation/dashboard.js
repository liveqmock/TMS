import fetch from '../../utils/fetch'

/**
 * 异常列表
 * @param {*} params
 * {"currentPage":1,
		"pageSize":10,
		"vo":{
	}
}
 */
export function PostGetAbnormalList(params) {
  return fetch.post('/api-order/order/abnormal/v1/getAbnormalList', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 根据id查看异常详情
 * @param {*} params
 * {"currentPage":1,
		"pageSize":10,
		"vo":{
	}
}
 */
export function GetLook(id) {
  return fetch.get('/api-order/order/abnormal/v1/' + id).then(res => {
                // console.log(res);
    return res.data || { }
  })
}

/**
 * 修改或处理异常
 * @param {*} params
{
  "abnormalAmount": 0,
  "abnormalDescribe": "string",
  "abnormalNo": "string",
  "abnormalPicture": "string",
  "abnormalStatus": 0,
  "abnormalType": 0,
  "childShipId": 0,
  "createTime": "2018-06-04T11:51:14.137Z",
  "disposeOpinion": "string",
  "disposeOrgId": 0,
  "disposePicture": "string",
  "disposeResult": 0,
  "disposeTime": "2018-06-04T11:51:14.137Z",
  "disposeUserId": 0,
  "dutyOrgId": 0,
  "id": 0,
  "orgId": 0,
  "registerFee": 0,
  "registerUserId": 0,
  "shipId": 0
}
 */
export function PutXiuGai(params) {
  return fetch.put('/api-order/order/abnormal/v1/', params)
}

/**
 * 新建异常
 * @param {*} params 参数
 {
  "abnormalAmount": 0,
  "abnormalDescribe": "string",
  "abnormalNo": "string",
  "abnormalPicture": "string",
  "abnormalStatus": 0,
  "abnormalType": 0,
  "childShipId": 0,
  "createTime": "2018-06-04T09:51:48.943Z",
  "disposeOpinion": "string",
  "disposeOrgId": 0,
  "disposePicture": "string",
  "disposeResult": 0,
  "disposeTime": "2018-06-04T09:51:48.943Z",
  "disposeUserId": 0,
  "dutyOrgId": 0,
  "orgId": 0,
  "registerFee": 0,
  "registerUserId": 0,
  "shipId": 0
}
 */
export function PostNewAbnormal(params) {
  return fetch.post('/api-order/order/abnormal/v1/', params)
}

/**
 * 控货列表
 * @param {*} params
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "createTime": "2018-06-01T11:23:05.335Z",
    "endTime": "string",
    "id": 0,
    "shipFromCityCode": "string",
    "shipFromOrgid": [
      "string"
    ],
    "shipId": 0,
    "shipSn": "string",
    "shipToCityCode": "string",
    "shipToOrgid": 0,
    "startTime": "string",
    "status": 0,
    "updateTime": "2018-06-01T11:23:05.335Z"
  }
}
 */
export function PostControlgoods(params) {
  return fetch.post('/api-order/order/controlgoods/v1/getLists', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 放货
 */

export function PutFh(id) {
  return fetch.put('/api-order/order/controlgoods/v1/' + id)
}
/**
 * 要传shipId
 * 控货
 */

export function GetControl(id) {
  return fetch.get('/api-order/order/controlgoods/v1/' + id)
}
/**
 * 根据公司id自动生成编号/order/abnormal/v1/getabnormalNo
 */
export function GetAbnormalNo() {
  return fetch.get('/api-order/order/abnormal/v1/getabnormalNo').then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 根据id删除/order/abnormal/v1/
 */
export function delAbnormal(id) {
  return fetch.delete('/api-order/order/abnormal/v1/' + id).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}
