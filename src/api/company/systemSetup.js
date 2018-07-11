import fetch from '../../utils/fetch'

/**
 * 根据条件获取系统设置列表
 * @param {object} params 参数列表
========必传参数
{
  "orgid": 0,
  "module ": 0,
  "type": ''
}
module:模块	order:运单设置,base:基础设置

type:	shipNo:运单号规则,cargoNo:货号规则,shipFee:运费合计规则,shipPageFunc:运单页面功能设置,shipPermission:运单权限设置
 */
export function getAllSetting(params) {
  return fetch.get('/api-system/system/setting/v1/', {
    params
  }).then(res => {
    return res.data || {}
  })
}
/**
 * 修改系统设置
 * @param {object} info 系统设置信息
{
    "printSetting": {
        "ship": "0",
        "label": "0",
        "inventory": "0"
    },
    "shipNo": {
        "manualInput": "0",
        "companyNumberAutoIncrementSign": "0",
        "companyNumberAutoIncrementByTwoYMSign": "1",
        "companyNumberAutoIncrementByTwoYMDSign": "0",
        "systemNumberImmutable": "0",
        "companyNumberAutoIncrementValue": "000001",
        "companyNumberAutoIncrementByTwoYMValue": "0001",
        "companyNumberAutoIncrementByTwoYMDValue": "0001"
    },
    "shipPermission": {
        "onlyInvalidOwnShip": "0",
        "onlyUpdateOwnShip": "0",
        "onlyDeleteOwnShip": "0"
    },
    "module": "order",
    "cargoNo": {
        "orgIdAndShipNoAndNumberOfUnitsSign": "0",
        "manualInput": "0",
        "systemNumberNotAllowUpdate": "0",
        "orgIdAndShipNoAndNumberOfUnitsValue": "",
        "shipNoAndNumberOfUnits": "1"
    },
    "shipFee": {
        "customsFee": "0",
        "commissionFee": "0",
        "handlingFee": "1",
        "otherFee": "0",
        "brokerageFee": "1",
        "goupstairsFee": "0",
        "taxes": "0",
        "shipFee": "1",
        "housingFee": "0",
        "deliveryFee": "1",
        "insuranceFee": "0",
        "forkliftCharge": "1",
        "pickupFee": "1",
        "stampTax": "0",
        "productPrice": "0",
        "packageFee": "0"
    },
    "shipPageFunc": {
        "shipFieldValue": "",
        "toCityByAdministrativeRegion": "0",
        "notifyCargoRule": "37",
        "shipTimeRule": "33",
        "shipFieldSign": "0"
    },
    "orgid": 1
}
 */
export function putSetting(info) {
  return fetch.put('/api-system/system/setting/v1/', info)
}
/**
 * 重置指定组织的系统设置
 * @param {number} orgid 组织id
 */
export function putResetSetting(orgid) {
  return fetch.put('/api-system/system/setting/v1/resetSystemSetting', { orgid })
}
