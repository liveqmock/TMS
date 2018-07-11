import fetch from '../../utils/fetch'

/**
 * 修改密码
 */
export function putChangeMyPassword(obj) {
  return fetch.put('/api-system/system/user/v1/updatePassword', obj)
}
