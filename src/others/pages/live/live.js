import Taro, { Component } from '@tarojs/taro'
import {View,LivePlayer,Video,Input,Text,Image,ScrollView} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import WatcherItem from "./coms/watcher-item";
import GoodsItem from "./coms/goodsItem";
import './live.scss'
import {cdn} from "../../../consts";
import {withPager} from "../../../hocs";
import api from '@/api'
import entry from "../../../utils/entry";

// import TLS from 'im-live-sells'
import TLS from '../../../utils/tls.min'
import TIMJS from 'tim-js-sdk' //web环境
import TIM from './tim-wx.js'

let tls

@withPager
export default class Live extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      pullStreamLink:'',
      room_status:'',
      type:'',
      inputMessage:'',
      msgList:[
        {user_name:'555',user_message:'守护这片沙滩的是谁呢'},
      ],
      watcherList:[
        {
          userinfo:{user_name:'测试',grade_name:'至尊会员'},
          rank:1,
          giveLike: 10
        }
      ],
      onlineList:[],
      goodsList:[{goods_name:''},{goods_name:''},{goods_name:''},{goods_name:''},{goods_name:''},{goods_name:''}],
      watcherType:'com'

    }
    this.top = Taro.getStorageSync('top')
  }

 async componentDidMount() {
    // entry.entryLaunch(this.$router.params)
    const {appId,token} =this.$router.params
    this.initTim()
  }



initTim = async  () => {
  const  extraData  = Taro.getStorageSync('extraData')
  // Taro.setStorageSync('auth_token',extraData.token)
  this.setState({
    pullStreamLink:extraData.room_live_link,
    room_status:1
  })
   const {user_id = 1,userSig,url} = await api.live.getUserSig({owner:0})
  console.log(user_id)
  Taro.showLoading({
    title:'直播间环境准备中',
    // mask:true
  })

  tls = new TLS ({
    SDKAppID: '1400395128',
    // SDKAppID: '1400895128',
    roomID: '58662927',
    userSig: userSig,
    userName: user_id,
    TIM:TIM
  })
  tls.on(TLS.EVENT.SDK_READY,async () => {
    Taro.hideLoading()
    Taro.showToast({
      title:'环境准备好了~',
      icon:'success',
      duration:1500
    })
    try {
      console.log('info--------------')
      console.log(extraData.im_id)
      const {
        groupInfo,
        userInfo
      } = await tls.joinRoom({
        roomID:'58662927',
        getOwnerInfo:true
      })
      this.setState({
        userInfo,
        groupInfo,
        ownerInfo:groupInfo.ownerInfo
      })
      this.initMintor()
    }catch (e) {

      console.log(e)
    }
  })
  // this.state.userInfo = userInfo
  // this.state.groupInfo = groupInfo
  // this.state.ownerInfo = groupInfo.ownerInfo
  // this.state.noticeText = groupInfo.notification
}


initMintor() {
  //有人加群
  let formate = this.formate()
  tls.on(TLS.EVENT.JOIN_GROUP, async (data) => {
    console.log('已经加入了群聊', Math.random())
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '加入了群聊',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
    // const res = api.
  })

  //有人退群
  tls.on(TLS.EVENT.EXIT_GROUP, async (data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '退出了群聊',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
  })

  //有人发消息
  tls.on(TLS.EVENT.MESSAGE, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick,true),
      user_message: data.merge(),
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
  })

  //有人给主播点赞
  tls.on(TLS.EVENT.LIKE, async(data) => {
    console.log('点赞 成功-------------------------')
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '给主播点赞了',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
  })

  //有人关注了主播
  tls.on(TLS.EVENT.ATTENTION, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '关注了主播',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
    const a = await tls.getUserInfo()
  })

}

handleMsgLength(){
    let arr = [...this.state.msgList]
    if(this.state.msgList.length >=100){
      arr.shift()
      this.setState({
        msgList:arr
      })
    }
  return arr
  }

  formate(name,add=false){
    return name + add?':':''
  }

handleSendMessage =(e) =>{
    console.log('----------888--------------')
    console.log(this.state)
   tls.sendMessage(e.detail.value).then((res) => {
        let msg = this.handleMsgLength();
        msg.push({
          user_name: this.formate(this.state.userInfo.nick,true),
          user_message: e.detail.value,
        })
     this.setState({
       msgList:msg,
       inputMessage:''
     })
   })
}
  // fetch = async (params)=>{
  //   const {page_no,page_size} = params
  //   if(this.state.watcherType === 'com'){
  //     const option = {
  //       page:page_no,
  //       pageSize:page_size,
  //       type:this.state.watcherType
  //     }
  //     const {list,total_count} = api.live.getWatcherList(option)
  //     let total = total_count
  //     this.setState({
  //       watcherList:[...this.state.watcherList,...list]
  //     })
  //     return {total}
  //   }else{
  //     const option = {
  //       page:page_no,
  //       pageSize:page_size,
  //       type:this.state.watcherType
  //     }
  //     const {list,total_count} = api.live.getWatcherList(option)
  //     let total = total_count
  //     this.setState({
  //       onlineList:[...this.state.onlineList,...list]
  //     })
  //     return {total}
  //   }
  // }
  clickBack(){
    Taro.navigateBackMiniProgram()
  }
  showMoreDec(type,e){
    this.setState({
      type:type
    })
    if(type === 'cart-detail'){
      this.transFormPage(this.state.goodsList.length)
    }
    e.stopPropagation()
  }
  showData(){
    if(this.state.type !== ''){
      this.setState({
        type:''
      })
    }
  }
  stop(e){
    e.stopPropagation()
  }
  changeWatcher(type,e){
    this.setState({
      watcherType:type
    })
    let length
    if(type === 'com'){
      length = this.state.watcherList.length
    }else{
      length = this.state.onlineList.length
    }
    this.transFormPage(length)
    e.stopPropagation()
  }

  clickBtn(type){
    const extraData = Taro.getStorageSync('extraData')
    switch (type) {
      case 'like':
        tls.like().then(async function(data) {
          Taro.showToast({title:'点赞成功'})
           const res = await api.live.giveLike({room_id:extraData.im_id})
        })
        break
      case 'attend':
        Taro.showLoading({title:'处理中'})
        tls.attention().then((data) => {
          Taro.showToast({title:'关注成功'})
          Taro.hideLoading()
        }).catch(() => {
          Taro.hideLoading()
        })
    }
  }
  clearMessage(){
    this.setState({
      inputMessage:''
    })
  }
  render() {
    const {type,msgList,watcherList,watcherType,goodsList,pullStreamLink,room_status,inputMessage} = this.state
    return(
      <View>
         <View className='iconfont icon-arrow-left' style={{top:this.top+'px'}} onClick={this.clickBack}/>
        {
          room_status ==1&&
         <View className='live-view'>
           <LivePlayer className='live' src={pullStreamLink} autoplay={true}/>
         </View>
        }
        {
          room_status ==1&&
        <View className='data-view' onClick={this.showData.bind(this)}>
          <View className='live-header' style={{top:this.top +'px'}}>
             <View className='live-header-top'>
               <OwnOpacity
                 containerClass='contain-dec'
                 renderTrue={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img'/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name' onClick={this.showMoreDec.bind(this,'live-detail')}><Text>直播间名称...</Text></View>
                       <View className='room-dec-more'>
                         <Text onClick={this.showMoreDec.bind(this,'watcher-detail')}>999关注</Text> | <Text>地域</Text>
                       </View>
                     </View>
                     <View className='attend' onClick={this.clickBtn.bind(this,'attend')}>
                       <Text>+</Text>关注
                     </View>
                   </View>
                 }
                 renderHide={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img'/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name' onClick={this.showMoreDec.bind(this)}><Text>直播间名称...</Text></View>
                       <View className='room-dec-more'>
                         <Text>999关注</Text> | <Text>地域</Text>
                       </View>
                     </View>
                     <View className='attend'>
                       <Text>+</Text>关注
                     </View>
                   </View>
                 }
               />
             </View>
            <View className='live-header-bottom'>
              <OwnOpacity
              containerClass='contain-bottom'
              renderTrue = {
                <View className='bottom-contain'>
                 <Image mode='widthFix' className='img'/>
                 <Text className='attend-dec'>亲密度2</Text>
                </View>
              }
              renderHide = {
                <View className='bottom-contain'>
                  <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                  <Text className='attend-dec'>亲密度2</Text>
                </View>
              }
              />

            </View>
          </View>
          {type === ''&&
            <View className='live-footer-container'>
              <View className='live-footer'>
                <View className='live-footer-user'>
                  <View className='container'>
                    <View className='iconfont icon-gouwucheman'/>
                    <Text className='buy-dec'>XXXX正在去购买</Text>
                  </View>
                  <View className='content'>
                    <View className='iconfont icon-gouwucheman'/>
                    <Text className='buy-dec'>XXXX正在去购买</Text>
                  </View>
                </View>
                <View className='live-footer-message'>
                  {
                    msgList.map((item,index) => {
                      return (
                        <OwnOpacity
                          containerClass={'message'}
                          renderTrue={<View className={`true ${index === 0?'gradient-bg':''}`}>
                            <Text className={`user_name ${index === 0?'gradient-name':''}`}>{item.user_name}</Text><Text className={`user_message ${index === 0?'gradient-ms':''}`}>{item.user_message}</Text></View>}
                          renderHide={<View className='true'><Text className='user_name'>{item.user_name}:</Text><Text className='user_message'>{item.user_message}</Text></View>}>
                        </OwnOpacity>
                      )
                    })
                  }
                </View>
              </View>
            <View className='live-footer-feature'>
              <View className='opc'>
                <View className='send-message'/>
                <Input type='text' placeholder='说点什么...' className='input' placeholderClass='holder' onConfirm={this.handleSendMessage.bind(this)} value={inputMessage}/>
              </View>
              <View className='more'>
                <View className='more-item' onClick={this.showMoreDec.bind(this,'cart-detail')}>
                  <View className='container'/>
                  <View className='iconfont icon-gouwucheman'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-xinaixin' onClick={this.clickBtn.bind(this,'like')}/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-zhuanfa'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-close' onClick={this.clearMessge.bind(this)}/>
                </View>
              </View>
            </View>
          </View>
          }
          {
            type === 'live-detail'&&
              <View className='live-detail'>
                 <View className='live-detail-avatar'>
                   <Image mode='widthFix' className='img'/>
                 </View>
                <View className='live-detail-dec'>
                  <View className='user_name'>直播用户的用户名</View>
                  <View className='user_address'><View className='iconfont icon-dizhi'/><Text className='address'>地址</Text></View>
                  <View className='user_dec'>简介简介简介简介简介简介简介简介简介简介简介</View>
                  <View className='user_dec_more'>
                    <View className='user_dec_more_item'><Text className='dec-data'>9.9w</Text><Text className='dec-dec'>交易</Text></View>
                    <View className='user_dec_more_item'><Text className='dec-data'>20</Text><Text className='dec-dec'>粉丝</Text></View>
                    <View className='user_dec_more_item'><Text className='dec-data'>0</Text><Text className='dec-dec'>送出</Text></View>
                    <View className='user_dec_more_item'><Text className='dec-data'>1.2w</Text><Text className='dec-dec'>收到点赞</Text></View>
                  </View>
                </View>
                <View className='live-detail-footer'>
                  <View className='dec-attend'>关注</View>
                  <View className='store'>TA的店铺</View>
                  <View className='dec-main'>主页</View>
                </View>
              </View>
          }
          {
            type === 'watcher-detail'&&
              <View className='watcher-detail' onClick={this.stop}>
                <View className='watcher-detail-title'>
                  <View className={`change-type-com ${watcherType === 'com'?'choosed':''}`} onClick={this.changeWatcher.bind(this,'com')}>互动榜</View>
                  <View className={`change-type-line ${watcherType === 'line'?'choosed':''}`} onClick={this.changeWatcher.bind(this,'line')}>在线用户</View>
                </View>
                <View className='watcher-detail-dec'>
                  <Text>TOP100</Text><Text>点赞</Text>
                </View>
                <View className='watcher-detail-list'>
                  <ScrollView
                    scrollY
                    enableFlex={true}
                    className='watcher-scroll-list'
                    onScrollToLower={this.nextPage()}
                  >
                    <View className='item-list'>
                      {
                        watcherList.map((item,index) => {
                          return(
                            <WatcherItem
                              info={item.userinfo}
                              rank={index > 2?'':item.rank}
                              giveLike={item.giveLike}
                            />
                          )
                        })
                      }
                    </View>
                  </ScrollView>
                </View>
              </View>
          }
          {
            type === 'cart-detail'&&
              <View className='cart-detail'>
                <View className='cart-detail-title'>共xx件商品</View>
                <View className='cart-detail-list'>
                  <ScrollView
                  scrollY
                  enableFlex={true}
                  onScrollToLower={this.nextPage}
                  className='goods-scroll'
                  >
                    <View className='goods-scroll-list'>
                      {
                        goodsList.map((item,index) => {
                          return(
                            <GoodsItem/>
                          )
                        })
                      }
                    </View>
                  </ScrollView>
                </View>
              </View>
          }
        </View>
        }
        {
          room_status !=1&&
            <View className='out-line'>
              <View className='out-line-dec'>主播暂时不在线~</View>
            </View>
        }
      </View>
    )
  }
}
