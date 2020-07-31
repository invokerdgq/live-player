import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image} from "@tarojs/components"
import OwnOpacity from "../../../../components/own-opacity/own-opacity";
import './goodsItem.scss'
import {cdn} from "../../../../consts";

export default class LiveGoodsItem extends Component{
  static options= {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {info,index} = this.props
    return(
      <View className='live-goods-item'>
        <View className='goods-img'>
          <Image mode='widthFix' className='img' src={info.img}/>
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
          <Text className='goods_name'>{info.title}</Text>
          {/*<View className='more'>规格卖点</View>*/}
          <View className='goods-footer'>
            <View className='goods-price'>￥{info.price}</View>
            <View className='buy'>马上抢</View>
          </View>
        </View>
      </View>
    )
  }
}
