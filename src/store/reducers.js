import { combineReducers } from 'redux'
import cart from './cart'
import user from './user'
import address from './address'
import member from './member'
import tabBar from './tab-bar'
import colors from './colors'
import giftId from "./giftId"
import step from './step'
import passenger from "./is_passenger";
import liveConfig from "./live-config";
import roomConfig from "./room-config";

export default combineReducers({
  cart,
  user,
  address,
  member,
  tabBar,
  colors,
  giftId,
  step,
  passenger,
  liveConfig,
  roomConfig
})
