import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image,ScrollView,Radio} from '@tarojs/components'
import NavGap, {FilterBar} from "../../../components";
import api from '@/api'

import './live-store.scss'
import {connect} from "@tarojs/redux";
import {TLS, tls} from "../../../hocs/withTim";
@connect(({liveGoods}) => ({
  storeGoods:liveGoods.storeGoods,
  flatGoods:liveGoods.flatGoods,
  name:liveGoods.name,
  face_url:liveGoods.face_url
}),(dispatch) =>({
  setFlat:(payload) => dispatch({type:'liveGoods/setFlat',payload}),
  setStore:(payload) => dispatch({type:'liveGoods/setStore',payload})
}))
export default class LiveStore extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectAmount:0,
      fStatusList:[],
      sStatusList:[],
      sourceIndex:0,
      sourceList:[{title:'苏心淘商品'},{title:'个人店铺商品'}],
    }
  }
 componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.flatGoods.length > this.props.flatGoods || nextProps.storeGoods.length > this.props.storeGoods){
      this.updateStatus(nextProps)
    }
 }

  componentDidMount() {
    this.updateStatus()
  }
  updateStatus(props){
    let fList = [],sList = []
    if(props){
      if(props.flatGoods.length !== this.props.flatGoods.length){
        fList = [...this.state.fStatusList]
       let more = Array.from({length:props.flatGoods.length -this.props.flatGoods.length}).fill(false)
        this.setState({
          fStatusList:fList.concat(more)
        })
      }
      if(props.storeGoods.length !== this.props.storeGoods.length){
        sList = [...this.state.sStatusList]
        let more = Array.from({length:props.storeGoods.length -this.props.storeGoods.length}).fill(false)
        this.setState({
          sStatusList:sList.concat(more)
        })
      }
      return
    }
    this.props.flatGoods.forEach(() => {
      fList.push(false)
    })
    this.props.storeGoods.forEach(() => {
      sList.push(false)
    })
    this.setState({
      fStatusList:fList,
      sStatusList:sList,
    })
  }

  async handleMove(){
    if(this.state.selectAmount === 0) return
    let fList = this.props.flatGoods.filter((item,index) => {
      return !this.state.fStatusList[index]
    })
    let sList = this.props.storeGoods.filter((item,index) =>{
      return !this.state.sStatusList[index]
    })
    this.props.setFlat(fList)
    this.props.setStore(sList)
    this.setState({
      fStatusList:Array.from({length:fList.length}).fill(false),
      sStatusList:Array.from({length:sList.length}).fill(false),
      selectAmount:0
    })
    const res = await api.live.postConfig({
      name:this.props.name,
      face_url:this.props.face_url,
      products:JSON.stringify({flatGoods:this.props.flatGoods,storeGoods:this.props.storeGoods})
    })
    if(tls) tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ADD_GOODS,'delete')
  }
 signMove(index){
    if(this.state.sourceIndex === 0){
      if(!this.state.fStatusList[index]){
        this.state.selectAmount += 1
      }else{
        this.state.selectAmount -= 1
      }
      this.state.fStatusList[index] = !this.state.fStatusList[index]
      this.setState({
        fStatusList:this.state.fStatusList,
        selectAmount:this.state.selectAmount
      })
    }else{
      if(!this.state.sStatusList[index]){
        this.state.selectAmount += 1
      }else{
        this.state.selectAmount -= 1
      }
      this.state.sStatusList[index] = !this.state.sStatusList[index]
      this.setState({
        sStatusList:this.state.sStatusList,
        selectAmount:this.state.selectAmount
      })
    }
 }
  openStore(redirect) {
    Taro.showModal({
      title: '您还未开通店铺',
      content: '免费开通店铺，多种功能任你选',
      success: (res) => {
        if (res.confirm) {
          Taro.navigateTo({url: `/marketing/pages/member/user-info?redirect_url=${redirect}`})
        }
      }
    })
  }
  handleAdd(type){
    if(type === 'flat'){
      Taro.navigateTo({
        url:'/pages/item/list?is_live=true'
      })
    }else{
      let userInfo = Taro.getStorageSync('userinfo')
      let id = Taro.getStorageSync('operator_id')
       if(userInfo.operatorsopen != 1){
         this.openStore('/marketing/pages/user-store/visit-store')
       }else{
         Taro.navigateTo({url:`/marketing/pages/user-store/visit-store?id=${id}&is_live=true`})
       }
    }
  }
  handleSourceChange(e){
    this.setState({
      sourceIndex:e.current
    })
  }
  render() {
    const {selectAmount,sourceIndex,sourceList,fStatusList,sStatusList} = this.state
    let goodsList,statusList
    if(sourceIndex === 0){
      goodsList = this.props.flatGoods
      statusList = fStatusList
    }else{
      goodsList = this.props.storeGoods
      statusList = sStatusList
    }
    return(
      <View className='live-store'>
        <NavGap title='直播小店管理'/>
        <View className='live-store-content'>
          <View className='header'>
            <View className='header-left'>
              <View className='top'> 移除选中商品</View>
              <View className='dec'>
                {
                  selectAmount ===0 ?
                    <Text className='no-move'>全部商品 : {this.props.flatGoods.length + this.props.storeGoods.length}</Text>:
                    <Text className='has-move'>已选中<Text className='num'>{selectAmount}</Text>件商品</Text>
                }
              </View>
            </View>
            <View className={`header-right`} onClick={this.handleMove.bind(this)}><Text style={{color:`${selectAmount !==0?'#c0534e':''}`}}>移除</Text></View>
          </View>
          <View className='main'>
            <FilterBar
              className='goods-list__tabs'
              custom
              current={sourceIndex}
              list={sourceList}
              onChange={this.handleSourceChange.bind(this)}
            />
            <ScrollView
            className='live-goods-scroll'
            scrollY
            enableFlex={true}
            >
              {goodsList !== 0&&
                <View className='item-list'>
                  {
                    goodsList.map((item,index) => {
                      return(
                        <View className='live-item'>
                          <View className='radio-contain' onClick={this.signMove.bind(this,index)}><Radio checked={statusList[index]} color='#c0534e' className='radio'/></View>
                          <View className='goods-img'><Image className='img' src={item.img || item.pics[0]}/></View>
                          <View className='live-goods-dec'>
                            <View className='dec'>
                              <View className='main-dec'><View className={`store-tag ${item.img?'unvisible':''}`}>小店</View><Text className='goods-name'>{item.title || item.item_name}</Text></View>
                            </View>
                            <View className='price'>￥<Text className='inner'>{item.img?item.price:Number(item.price/100).toFixed(2)}</Text></View>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              }
                <View className='goods-none'>
                   没有更多了哦~
                </View>
            </ScrollView>
          </View>
          <View className='footer'>
            <View onClick={this.handleAdd.bind(this,'flat')} className='feature-item'><View className='iconfont icon-add-sy'/><View>添加平台商品</View></View>
            <View onClick={this.handleAdd.bind(this,'store')} className='feature-item'><View className='iconfont icon-add-sy'/><View>添加个人小店商品</View></View>
          </View>
        </View>
      </View>
    )
  }
}
