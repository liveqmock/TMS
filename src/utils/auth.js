import Cookies from 'js-cookie'

const TokenKey = 'TMS-Token'
const UsernameKey = 'lastloginUsername'
const OrgIdKey = 'OrganizationId'
const RefreshTokenKey = 'TMS-refreshtoken'
const UserinfoKey = 'TMS-userinfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return localStorage.getItem(UsernameKey)
}

export function setUsername(name) {
  return localStorage.setItem(UsernameKey, name)
}

export function removeUsername() {
  return localStorage.removeItem(UsernameKey)
}

export function getOrgId() {
  return localStorage.getItem(OrgIdKey)
}

export function setOrgId(name) {
  return localStorage.setItem(OrgIdKey, name)
}

export function removeOrgId() {
  return localStorage.removeItem(OrgIdKey)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken(name) {
  return localStorage.setItem(RefreshTokenKey, name)
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshTokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserinfoKey))
}

export function setUserInfo(obj) {
  return localStorage.setItem(UserinfoKey, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserinfoKey)
}
