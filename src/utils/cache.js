window.TMS_DATA_CACHE = {}
const cache_OBJ = {
  get(key) {
    return window.TMS_DATA_CACHE[key] || ''
  },
  set(key, val) {
    window.TMS_DATA_CACHE[key] = val
    return val
  }
}

export default cache_OBJ
