import Taro, { Component } from '@tarojs/taro'
import {View} from "@tarojs/components";
import {cdn} from "../../consts";
import './blank.scss'

export default class Blank extends Component{
  handleNavigate(){
    Taro.navigateTo({
      url:'/others/pages/live/live-watcher?im_id=72853168&uid=GZ212W'
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
