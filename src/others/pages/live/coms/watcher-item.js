import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"

import './watcher-item.scss'
import {cdn} from "../../../../consts";
export default class WatcherItem extends Component{
  static options= {
    addGlobalClass:true
  }
  defaultProps = {
    info:{
      face:'',
      grade:1,
      nick:'',
      like:''
    },
    rank:'',
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {info,rank} = this.props
    let rankIcon ,grade_name
    switch (info?info.grade:'') {
      case '1':
        rankIcon = 'icon-putong';
        grade_name = '普通会员'
        break
      case '2':
        grade_name = '钻石会员'
        rankIcon = 'icon-zuanshi';
        break
      case '3':
        grade_name = '至尊会员'
        rankIcon = 'icon-zhizun';
        break
      case '4':
        grade_name = '王者身份'
        rankIcon = 'icon-wangzhe';
        break
      default :
        rankIcon = ''
    }
    return(
      <View className='watcher-item'>
        {
          rank != ''&&
            <View className={`watcher-item-rank${rank}`}>{rank}</View>
        }
        <View className='avatar'>
          <Image mode='widthFix' className='img' src={info.face}/>
        </View>
        <Text className='user-name'>{info.nick}</Text>
        <View className='sign'>
          <View className={`iconfont ${rankIcon}`}/><Text>{grade_name}</Text>
        </View>
        <View className='like'>{info.like}</View>
      </View>
    )
  }
}
