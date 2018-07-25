import fetch from '../../utils/fetch'

/**
 /finance/customerdetail/v1/
 查询客户对账表分页信息
 查询收支方式管理分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCustomerdetailList(params) {
  return fetch.post('/api-finance/finance/customerdetail/v1/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * /finance/customerdetail/v1/{id}
 根据ID删除客户对账表信息
 * @param id
 * @returns {*}
 */
export function deleteCustomer(id) {
  return fetch.delete('/api-finance/finance/customerdetail/v1/' + id )
}

