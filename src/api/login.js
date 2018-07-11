import fetch from '@/utils/fetch'
import { getRefreshToken } from '../utils/auth'

export function login(username, password, orgid) {
  var grant_type = 'password'
  var scope = 'webApp'
/*   return fetch.post('/uaa/oauth/token', {
    username,
    password,
    grant_type,
    orgid
    // scope,
  }, {
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  }) */
  console.log('login:', arguments, fetch.axios)
  return fetch.request({
    url: '/uaa/oauth/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    },
    params: {
      username,
      password,
      grant_type,
      orgid
      // scope,
    }
  })
}

export function getInfo(username, orgid) {
  return fetch.get('/api-system/system/user/v1/getCurrentUser')
}

export function logout() {
  return fetch.delete('/uaa/oauth/token', {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

export function refreshToken() {
  return fetch.put()
}
