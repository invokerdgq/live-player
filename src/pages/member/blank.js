import Taro, { Component } from '@tarojs/taro'
import {View} from "@tarojs/components";

export default class Blank extends Component{
  // componentDidShow() {
  //   Taro.navigateTo({url:'/others/pages/live/live'})
  // }
  render() {
    return(
      <View>直播专用小程序</View>
    )
  }
}
