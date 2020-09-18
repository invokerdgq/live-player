import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"
import OwnOpacity from "../../../../components/own-opacity/own-opacity";
import './goodsItem.scss'
import {cdn} from "../../../../consts";

export default class LiveGoodsItem extends Component{
  static options= {
    addGlobalClass:true
  }
  static defaultProps = {
    info:{
      img:'',
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {info,index} = this.props
    return(
      <View className='live-goods-item'>
        <View className='goods-img'>
          <Image mode='widthFix' className='img' src={info.img || info.pics[0]}/>
          <View className='order-contain'>
            <OwnOpacity
              contain-class={'contain-order'}
              true-class={'true-contain'}
              renderTrue={
                <Text className='order'>{index}</Text>
              }
              renderHide={
                <Text className='order'>{index}</Text>
              }
            />
          </View>
        </View>
        <View className='goods-dec'>
          <Text className='goods_name'>{info.title || info.item_name}</Text>
          <View className='goods-footer'>
            <View className='goods-price'>￥{info.img ?info.price:(Number(info.price)/100).toFixed(2)}</View>
            <View className='buy'>马上抢</View>
          </View>
        </View>
      </View>
    )
  }
}
