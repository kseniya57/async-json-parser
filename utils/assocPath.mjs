export default (path, val, obj) => {
  const len = path.length
  path.reduce((o, c, i) => {
    if (typeof o[c] !== 'object' || i === len - 1) {
      o[c] = i === len - 1 ? val : {}
    }
    return o[c]
  }, obj)
  return obj;
}
