import fetch from '../../utils/fetch'

/**
 * 根据条件获取车辆列表
 * @param {object} params 参数列表
========必传参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "orgid": 0
  }
}
===== 其它vo可传参数
"vo": {
    "createTime": "2018-05-22T02:12:59.180Z",
    "dirverMobile": "string",
    "driverId": 0,
    "driverName": "string",
    "orgName": "string",
    "truckBrand": "string",
    "truckHeight": 0,
    "truckId": 0,
    "truckIdNumber": "string",
    "truckLength": 0,
    "truckLoad": 0,
    "truckRegisterDate": "2018-05-22T02:12:59.180Z",
    "truckRemarks": "string",
    "truckScrapDate": "2018-05-22T02:12:59.180Z",
    "truckSource": 0,
    "truckType": 0,
    "truckUnit": "string",
    "truckUnitMobile": "string",
    "truckVolume": 0,
    "truckWidth": 0,
    "updateTime": "2018-05-22T02:12:59.180Z"
  }
 */
export function getAllTrunk(params) {
  return fetch.post('/api-system/system/trunk/v1/list', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 获取车辆信息
 * @param {number} id 车辆id
 */
export function getTrunkInfo(id) {
  return fetch.get('/api-system/system/trunk/v1/' + id).then(res => {
    return res.data || {}
  })
}
/**
 * 获取车型
 * @param {*} orgid 网点id
 */
export function getTruckType(orgId) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'truck_type',
      orgId
    }
  }).then(res => {
    return res.data || []
  })
}
/**
 * 获取车辆来源
 * @param {*} orgid 网点id
 */
export function getTruckSource(orgId) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'truck_source',
      orgId
    }
  }).then(res => {
    return res.data || []
  })
}

/**
 * 根据车牌号获取车辆信息
 * @param {number} name 车辆name
 */
export function getTrunkInfoByName(name) {
  return fetch.get('/api-system/system/trunk/v1/name/' + name).then(res => {
    return res.data || {}
  })
}

/**
 * 删除车辆信息
 * @param {number} id 车辆id
 */
export function deleteTrunkInfo(id) {
  return fetch.delete('/api-system/system/trunk/v1/delete/' + id)
}
/**
 * 根据ids批量删除车辆
 * @param {array} ids 多个车辆id用数组处理
 */
export function deleteSomeTrunkInfo(ids) {
  return fetch.post('/api-system/system/trunk/v1/bathDelete/', ids)
}
/**
 * 根据选中的ids导出对应的excel文件
 * @param {array} ids 多个车辆id用数组
 */
export function getExportExcel(ids) {
  return fetch.post('/api-system/system/trunk/v1/exportTruck', ids)
}
/**
 * 添加车辆
 * @param {object} info 车辆信息
{
  "createTime": "2018-05-22T02:16:04.647Z", // 创建时间
  "dirverMobile": "string", // 司机电话
  "driverId": 0, // 司机ID
  "orgid": 0, // 所属机构
  "truckBrand": "string", // 车辆品牌
  "truckHeight": 0, // 车高
  "truckId": 0, // 车辆ID
  "truckIdNumber": "string", // 车牌号码
  "truckLength": 0, // 车长
  "truckLoad": 0, // 可载重
  "truckRegisterDate": "2018-05-22T02:16:04.647Z", // 车辆注册时间
  "truckRemarks": "string", // 备注
  "truckScrapDate": "2018-05-22T02:16:04.647Z", // 车辆报废时间
  "truckSource": 0, // 车牌来源
  "truckType": 0, // 车型
  "truckUnit": "string", // 车辆单位
  "truckUnitMobile": "string", // 单位电话
  "truckVolume": 0, // 可载体积
  "truckWidth": 0, // 车宽
  "updateTime": "2018-05-22T02:16:04.647Z" // 修改时间
  `drivingLicense` varchar(128) DEFAULT NULL COMMENT '行驶证',
  `operatingLicense` varchar(128) DEFAULT NULL COMMENT '营运执照',
  `vehiclePic` varchar(128) DEFAULT NULL COMMENT '车辆照片',
}
 */
export function postTrunk(info) {
  return fetch.post('/api-system/system/trunk/v1/add', info)
}
/**
 * 修改车辆
 * @param {object} info 车辆信息
{
  "createTime": "2018-05-22T02:16:23.399Z",
  "dirverMobile": "string",
  "driverId": 0,
  "orgid": 0,
  "truckBrand": "string",
  "truckHeight": 0,
  "truckId": 0,
  "truckIdNumber": "string",
  "truckLength": 0,
  "truckLoad": 0,
  "truckRegisterDate": "2018-05-22T02:16:23.399Z",
  "truckRemarks": "string",
  "truckScrapDate": "2018-05-22T02:16:23.399Z",
  "truckSource": 0,
  "truckType": 0,
  "truckUnit": "string",
  "truckUnitMobile": "string",
  "truckVolume": 0,
  "truckWidth": 0,
  "updateTime": "2018-05-22T02:16:23.399Z"
}
 */
export function putTrunk(info) {
  return fetch.put('/api-system/system/trunk/v1/update', info)
}
