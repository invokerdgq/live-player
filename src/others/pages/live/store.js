import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image,ScrollView} from "@tarojs/components"
import api from '@/api'
import NavGap from "../../../components/nav-gap/nav-gap";
import {withPager} from "../../../hocs";
import './store.scss'
@withPager
export default class Store extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      goodsList:[]
    }
  }
componentDidMount() {
    this.nextPage()
}

fetch =async (params) =>{
   const {page_no,page_size} = params
    const option = {
      page:page_no,
      pageSize:page_size
    }
    let total
    const {list,total_count} = await api.live.getGoodsList(option)
    this.setState({
      goodsList:[...this.state.goodsList,...list]
    })
  total = total_count
  return {total}
}
  render() {
    const {goodsList} = this.state
    return(
      <View className='store'>
        <NavGap title='店铺详情'/>
        <View className='store-content'>
           <View className='user-dec'>
             <View className='avatar-img'><Image  mode='widthFix' className='img'/></View><Text className='user-name'>用户名的微小店</Text>
           </View>
          <View className='dec'>
            <View className='recommend-num'>推荐20</View>
            <View className='iconfont icon-sousuo'/>
            <View className='iconfont icon-fenlei'/>
          </View>
           <View className='goodsList-content'>
             <View className='goods-sort'>
               <View className='sort-item'>综合排序</View>
               <View className='sort-item'>销量</View>
               <View className='sort-item'>上新时间</View>
               <View className='sort-item price'>价格 <View className='iconfont icon-sort'/></View>
             </View>
             <View className='goods-list'>
               <ScrollView
               scrollY
               enableFlex={true}
               onScrollToLower={this.nextPage}
               className='goods-scroll'
               >
                 <View className='list-container'>
                   {
                     goodsList.map((item,index) => {
                       return(
                         <View className='item-container'>
                           <View className='img-container'>
                             <Image mode='widthFix' className='img'/>
                           </View>
                           <View className='goods-dec'>
                             <View className='goods-name'>商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</View>
                             <View className='goods-price'>￥250.00</View>
                           </View>
                         </View>
                       )
                     })
                   }
                 </View>
               </ScrollView>
             </View>
           </View>
        </View>
      </View>
    )
  }
}
