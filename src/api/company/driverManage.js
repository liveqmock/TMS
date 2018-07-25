import fetch from '../../utils/fetch'

/**
 * 根据条件获取司机列表
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
    "bankCardNumber": "string",
    "bankName": "string",
    "certification": "string",
    "driverAddress": "string",
    "driverCardid": "string",
    "driverMobile": "string",
    "driverName": "string",
    "driverRemarks": "string",
    "drivingPicture": "string",
    "id": 0,
    "idcardPicture": "string",
    "licenseType": 0,
    "licenseTypeName": "string",
    "openBank": "string",
    "orgName": "string",
    "validityDate": "2018-05-22T02:01:00.995Z"
  }
 */
export function getAllDriver(params) {
  return fetch.post('/api-system/system/Driver/v1/DriverList', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 获取司机信息
 * @param {number} id 司机id
 */
export function getDriverInfo(id) {
  return fetch.get('/api-system/system/Driver/v1/' + id).then(res => {
    return res.data || {}
  })
}

/**
 * 获取司机驾照类型
 * @param {*} orgid 网点id
 */
export function getDriverLiceseType(orgId) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'driving_type',
      orgId
    }
  }).then(res => {
    return res.data || []
  })
}

/**
 * 删除司机信息
 * @param {number} id 司机id
 */
export function deleteDriverInfo(id) {
  return fetch.delete('/api-system/system/Driver/v1/' + id)
}
/**
 * 根据ids批量删除司机
 * @param {array} ids 多个司机id用逗号连接
 */
export function deleteSomeDriverInfo(ids) {
  return fetch.post('/api-system/system/Driver/v1/bathDelete/?ids=' + ids)
}
/**
 * 根据选中的ids导出对应的excel文件
 * @param {array} ids 多个司机id用逗号连接
 */
export function getExportExcel(ids) {
  return fetch.post('/api-system/system/Driver/v1/export', { ids })
}
/**
 * 添加司机
 * @param {object} info 司机信息
{
  "bankCardNumber": "", // 银行卡号 20
  "bankName": "", // 银行名称 20
  "certification": "", // 从业资格证图片地址 125
  "driverAddress": "", // 地址 50
  "driverCardid": "", // 身份证号码 18
  "driverMobile": "", // 手机号码 11
  "driverName": "", // 司机姓名 10
  "driverRemarks": "", // 备注 125
  "drivingPicture": "", // 驾驶证图片地址 125
  // "id": 0, // 司机ID 11
  "idcardPicture": "", // 身份证图片地址 125
  "licenseType": '', // 驾驶证类型 18
  "licenseTypeName": "",
  "openBank": "", // 开户行 20
  "validityDate": "", // 驾驶证有效期
  "orgid": 0 // 所属机构 11
}
 */
export function postDriver(info) {
  return fetch.post('/api-system/system/Driver/v1/save', info)
}
/**
 * 修改司机
 * @param {object} info 司机信息
{
  "bankCardNumber": "string",
  "bankName": "string",
  "certification": "string",
  "driverAddress": "string",
  "driverCardid": "string",
  "driverMobile": "string",
  "driverName": "string",
  "driverRemarks": "string",
  "drivingPicture": "string",
  "id": 0,
  "idcardPicture": "string",
  "licenseType": 0,
  "openBank": "string",
  "orgid": 0,
  "validityDate": "2018-05-22T02:05:56.310Z"
}
 */
export function putDriver(info) {
  return fetch.put('/api-system/system/Driver/v1/update', info)
}
