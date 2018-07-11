import fetch from '../../utils/fetch'

/**
 * 获取异动费用列表
 * @param {*} params
 * {
	"currentPage":1,
	"pageSize":10,
	"vo":{
		"pageType":1
	}
}
 */
export function getAbnormalUnusual(params) {
  return fetch.get('/lingchiwing/finance/tmsfinancefeedetail/v1/abnormal/' + params)
}
