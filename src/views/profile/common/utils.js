// 获取最小高度
export const getMinHeight = obj => {
  return Math.min(...Object.values(obj))
}
// 获取最小高度列
export const getMinColumn = obj => {
  const min = getMinHeight(obj)
  return Object.keys(obj).find(k => obj[k] == min)
}
// 获取最大高度
export const getMaxColumn = obj => {
  return Math.max(...Object.values(obj))
}
