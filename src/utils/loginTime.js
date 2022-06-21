const TIME_STAMP = 'time_stamp'
const TOKEN_TIMEOUT_VALUE = 3600 * 1000

export const getTimeStamp = () => {
  return sessionStorage.getItem(TIME_STAMP)
}
export const setTimeStamp = () => {
  sessionStorage.setItem(TIME_STAMP, Date.now())
}
export const isTimeOut = () => {
  return Date.now() - getTimeStamp() > TOKEN_TIMEOUT_VALUE
}
