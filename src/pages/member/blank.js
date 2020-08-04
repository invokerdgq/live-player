import Taro, { Component } from '@tarojs/taro'
import {View} from "@tarojs/components";
import NavGap from "../../components/nav-gap/nav-gap";
import {cdn} from "../../consts";
import './blank.scss'

export default class Blank extends Component{
  // componentDidShow() {
  //   Taro.navigateTo({url:'/others/pages/live/live'})
  // }
  handleNavigate(){
    Taro.navigateTo({
      url:'/others/pages/live/live?im_id=75377417&uid=GZ212W'
    })
  }
  render() {
    return(
      <View style={{backgroundUrl:`${cdn}/gf.png`}} className='blank'>
        <View className='to-kefu' onClick={this.handleNavigate.bind(this)}>进入苏心淘官方直播间</View>
      </View>
    )
  }
}
