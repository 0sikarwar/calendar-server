module.exports = {
  path: (obj, keys = []) => {
    if (!obj) return null;
    for (let i in keys) {
      if (obj[keys[i]]) {
        obj = obj[keys[i]]
      } else {
        obj = null;
        break;
      }
    }
    return obj
  }
}