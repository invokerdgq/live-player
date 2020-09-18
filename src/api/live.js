import req from './req'
import Taro from '@tarojs/taro'

export function getRoomList(params) {
  return req.get('/live/room',params)
}
export function postInfo(params) {
  return req.post('/live/import/account',params)
}
export function changeUserStatus(params) {
  return req.post('/live/online/status',params)
}
export function getOnlineRoom(params) {
  return req.get('/live/online/list',params)
}
export function giveLike(params) {
  return req.post('/live/like',params)
}
export function attend(params) {
  return req.post('/live/subscribe',params)
}
export function getUserSig(params) {
  return req.get('/live/usersig',params)
}
export function addHistory(params) {
  return req.post('/live/history/add',params)
}
export function getFansList() {
  return req.get('/live/subscribe/list')
}
export function changeLiverStatus(params) {
  return req.get('/live/send/heartbeat',params)
}
export function getRoomFans(params) {
  return req.get('/live/fans/list',params)
}
export function getRankList(params) {
  return req.get('/live/like/list',params)
}
export function getLocationDetail(params) {
  return Taro.request({
    url:`https://apis.map.qq.com/ws/geocoder/v1/?location=${params.latitude},${params.longitude}&key=GMNBZ-XZ2CP-2EXD4-LXW4G-S54BE-FDBQP`,
    method:'GET',
    responseType:'text'
  })
}
export function getGiftList() {
  return req.get('/live/gift/list')
}
export function getDepositList() {
  return req.get('/live/gift/coin')
}
export function sendGift(params) {
  return req.post('/live/gift/send',params)
}
export function getGiftCoin() {
  return req.get('/live/gift/coin')
}
export function getCoinSurplus() {
  return req.get('/live/gift/coin/mine')
}
export function buyCoin(params) {
 return req.post('/live/gift/buy',params)
}
export function uploadImg(params,config) {
  return req.post('/espier/upload',params,config)
}
export function postConfig(params) {
  return req.post('/live/config',params)
}
export function getConfig() {
  return req.get('/live/config',{} ,{ showError: false })
}
