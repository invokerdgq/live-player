import Taro, { Component } from '@tarojs/taro'
import {View, LivePlayer, Video, Input, Text, Image, ScrollView, LivePusher,Button,Navigator} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import WatcherItem from "./coms/watcher-item";
import LiveGoodsItem from "./coms/goodsItem";
import './live.scss'
import {cdn} from "../../../consts";
import {withPager} from "../../../hocs";
import api from '@/api'
import S from '@/spx'
import entry from "../../../utils/entry";


import TLS from './tls.min'
import TIM from './tim-wx'
import {Loading} from "../../../components";
import OwnerModal from './coms/own-modal'

let tls

@withPager
export default class Live extends Component{
  static options = {
    addGlobalClass:true
  }
  config = {
    disableScroll:true
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      timerLiver:null,
      showExitChoose:false,
      onlineNum:0,
      im_id:'',
      is_share:false,
      numLimit:false,
      buyerNick:'',
      height:0,
      giftList:[
        'ax','bbt','dz',
        'dz1','fd','hb',
        'hj','lw','nc',
        'qc','qkl','sd',
        'sdtg','xg','xx',
        'zs'
      ],
      current:'',
      showGift:false,
      is_subscribe:0,
      loading:false,
      fans:'',
      likes:'',
      room_cover:'',
      timer:null,
      pullStreamLink:'',
      pushStreamLink:'',
      room_status:true,
      liverStatus:'',
      type:'',
      inputMessage:'',
      msgList:[],
      watcherList:[],
      onlineList:[],
      fansList:[],
      goodsList:[],
      watcherType:'line'

    }
    this.top = Taro.getStorageSync('top')
  }

  componentDidMount() {
   Taro.setKeepScreenOn({
      keepScreenOn: true
    })
    entry.entryLaunch(this.$router.params)
    const  extraData  = Taro.getStorageSync('extraData')
    const im_id = Taro.getStorageSync('im_id')
      this.setState({
        im_id:im_id,
        owner:extraData?extraData.owner:0
      },() => {
        this.randomGift()
        this.initTim()
      })
  }
 componentDidShow(){
    if(this.state.owner == 1){
      tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE,'ON')
    }
 }
  componentWillUnmount(){
    clearInterval(this.state.timer)
    clearInterval(this.state.timerLiver)
    this.statusSend('off')
    if(this.state.owner){
      tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE,'END')
    }
    tls.exitRoom()
  }
  componentDidHide(){
    if(this.state.owner ==1){
      tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE,'PAUSE')
    }
  }

  postUserInfo = async ()=>{
    Taro.showLoading({
      title:'导入用户数据中',
      mask:true
    })
    const {memberInfo,vipgrade} = await api.member.memberInfo()
    this.setState({
      memberInfo,
      vipgrade
    })
    let ERR
    try{
      await api.live.postInfo({grade_id:Number(vipgrade.vip_grade_id)+1})
    }catch (e) {
      ERR= e
    }
    if(!ERR){
      Taro.hideLoading()
    }
  }
initTim = async  () => {
  if(!S.getAuthToken()){
    S.login(this)
    return
  }
  await this.postUserInfo()
  const extraData = Taro.getStorageSync('extraData')
  const {user_id = 1,userSig,url,products,is_subscribe,room_live_link,room_status} = await api.live.getUserSig({owner:this.state.owner,room_id:this.state.im_id})
  let list
  try{
    let newList =  JSON.parse(products)
   if( Array.isArray(newList)){
     list = newList
   }else {
     list = []
   }
  }catch (e) {
    list = []
  }
  this.setState({
    pullStreamLink:room_live_link,
    pushStreamLink:url,
    room_status:extraData.owner == 1?true:room_status!=0,
    // room_cover:extraData.room_cover,
    is_subscribe:extraData.owner != 1?is_subscribe !=0:1,
    devicePosition: extraData.devicePosition || '',
    beautify:extraData.beautify || '',
    filter:extraData.filter || '',
    goodsList:list
  })
  if(extraData.owner != 1){
    api.live.addHistory({
      room_id:this.state.im_id,
      source:Taro.getStorageSync('distribution_shop_id')
    })
  }

  Taro.showLoading({
    title:'直播间环境准备中',
    mask:true
  })

  tls = new TLS ({
    SDKAppID: '1400395128',
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
    if(this.state.ownerInfo) return
    try {
      let {groupInfo, userInfo} = await tls.joinRoom({
        roomID: this.state.im_id,
        getOwnerInfo:true
      })
      // 已经在房间中 再次进入 拿不到groupInfo
      if(!groupInfo){
        groupInfo = await tls.getRoomInfo()
      }
      this.nextPage()
      if(this.state.owner == 1)
      {
        this.liverStatusSend()
        tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE,'ON')
      }
      this.statusSend('on')
      this.setState({
        userInfo,
        groupInfo,
        ownerInfo:groupInfo.ownerInfo,
        fans:groupInfo.groupCustomField[1].value,
        likes:groupInfo.groupCustomField[0].value,
      },() => { this.initMintor()})
    }catch (e) {
      console.log(e)
    }
  })
}

onShareAppMessage(obj) {
    return{
      title:'快来观看直播吧~',
      path:`/others/pages/live/live?im_id=${this.state.im_id}&uid=${this.state.memberInfo.user_card_code}`
    }
}

  randomGift = ()=>{
    let index = Math.floor(Math.random()*(this.state.giftList.length-1))
  this.setState({
    current:this.state.giftList[index]
  })
}
liverStatusSend(){
  let interval =  () =>{
    try{
      api.live.changeLiverStatus({room_id:this.state.im_id})
    }catch (e) {
      console.log(e)
    }
  }
  interval()
  let timerLiver = setInterval(interval,1000*60)
  this.setState({
    timerLiver
  })
}
statusSend(type){
  let interval =  () =>{
           try{
             api.live.changeUserStatus({room_id:this.state.im_id,status:type})
           }catch (e) {
             console.log(e)
           }
         }
         interval()
  if(type === 'on'){
    let timer = setInterval(interval,1000*60*3)
    this.setState({
      timer
    })
  }else{
    clearInterval(this.state.timer)
    try{
      api.live.changeUserStatus({room_id:this.state.im_id,status:type})
    }catch (e) {
      console.log(e)
    }
  }
}

initMintor() {
  let formate = this.formate
  // 测试时间
  tls.on(TLS.EVENT.ROOM_STATUS_CHANGE,async (res) => {
    console.log(res)
  })
    //房间状态发生改变 -----------------------------------------------
  tls.on(TLS.EVENT.ROOM_STATUS_CHANGE, async(data) => {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkk')
    console.log(data)
    let msg = this.handleMsgLength()
    switch (data.value) {
      case 'ON':
        msg.push({
          user_name: `主播 ${this.state.ownerInfo.nick}`,
          user_message: '加入了群聊',
          // id: `id${Date.now()}`
        })
        this.setState({
          msgList: msg,
          liverStatus: 'ON'
        })
        break
      case 'PAUSE':
        msg.push({
          user_name: `主播 ${this.state.ownerInfo.nick}`,
          user_message: '暂时离开',
        })
        this.setState({
          msgList: msg,
          liverStatus: 'PAUSE'
        })
        break
      default :
        msg.push({
          user_name: `主播 ${this.state.ownerInfo.nick}`,
          user_message: '已下线',
          // id: `id${Date.now()}`
        })
        this.setState({
          msgList: msg,
          liverStatus: 'END'
        })
    }
    })
  //有人加群-----------------------------------------------
  tls.on(TLS.EVENT.JOIN_GROUP, async (data) => {
    console.log('已经加入了群聊', Math.random())
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '加入了群聊',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg,
      onlineNum :this.state.onlineNum + 1
    })
    // const res = api.
  })

  //有人退群-----------------------------------------------
  tls.on(TLS.EVENT.EXIT_GROUP, async (data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '退出了群聊',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg,
      onlineNum :this.state.onlineNum - 1
    })
  })

  //有人购买东西---------------------------------------------
  tls.on(TLS.EVENT.BUY_GOODS,async (data) => {
    const {nick,avatar,value,userID} = data
    this.setState({
      buyerNick:nick
    })
  })
  //有人发消息-----------------------------------------------
  tls.on(TLS.EVENT.MESSAGE, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick,true),
      user_message: data.message,
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg
    })
  })

  //有人给主播点赞-----------------------------------------------
  tls.on(TLS.EVENT.LIKE, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '给主播点赞了',
      // id: `id${Date.now()}`
    })
    this.setState({
      // msgList: msg,
      likes:Number(this.state.likes) +1
    })
  })

  //有人关注了主播-----------------------------------------------
  tls.on(TLS.EVENT.ATTENTION, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '关注了主播',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg,
      fans:Number(this.state.fans) +1
    })
    const a = await tls.getUserInfo()
  })

  //取消关注-----------------------------------------------
  tls.on(TLS.EVENT.CANCELATTENTION, async(data) => {
    let msg = this.handleMsgLength()
    msg.push({
      user_name: formate(data.nick),
      user_message: '取消关注主播',
      // id: `id${Date.now()}`
    })
    this.setState({
      msgList: msg,
      fans:Number(this.state.fans) -1
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
  formate = (name,add=false)=>{
    return `${name}${add?' :':''}`
  }

handleSendMessage = async(e) =>{
    tls.sendMessage(e.detail.value).then((res) => {
     console.log(res)
        let msg = this.handleMsgLength();
        msg.push({
          user_name: this.formate(res.nick,true),
          user_message: e.detail.value,
        })
     this.setState({
       msgList:msg,
       inputMessage:''
     })
      console.log(this.state)
   })
}

  fetch = async (params)=>{
    const  extraData  = Taro.getStorageSync('extraData')
    const {page_no,page_size} = params
    if(this.state.watcherType === 'com'){
      const option = {
        page:page_no,
        pageSize:page_size,
        room_id:this.state.im_id
      }
      this.setState({
        loading:true
      })
      const {list,total_count} = await api.live.getRankList(option)
      this.setState({
        loading:false
      })
      let total = total_count
      this.setState({
        watcherList:[...this.state.watcherList,...list],
      })
      return {total}
    }else if(this.state.watcherType === 'line'){
      const option = {
        page:page_no,
        pageSize:page_size,
        room_id:this.state.im_id
      }
      this.setState({
        loading:true
      })
      const {list,total_count} = await api.live.getOnlineRoom(option)
      this.setState({
        loading:false
      })
      let total = total_count
      this.setState({
        onlineList:[...this.state.onlineList,...list],
        onlineNum:total
      },() => {
        console.log(this.state)
      })
      return {total}
    }else{
      const option = {
        page:page_no,
        pageSize:page_size,
        room_id:this.state.im_id
      }
      this.setState({
        loading:true
      })
      const {list,total_count} = await api.live.getRoomFans(option)
      this.setState({
        loading:false
      })
      let total = total_count
      this.setState({
        fansList:[...this.state.fansList,...list],
        fans:total
      },() => {
        console.log(this.state)
      })
      return {total}
    }
  }

  clickBack(){
    Taro.navigateBackMiniProgram()
  }
  showMoreDec(type,pType,e){
    this.setState({
      type:type
    })
    if(type === 'cart-detail'){
      this.nextPage()
      tls.sendCustomMsgAndEmitEvent(TLS.EVENT.BUY_GOODS,'BUY')
    }
    this.changeWatcher(pType)
    if(e)e.stopPropagation()
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
    },() => {
      if(type === 'com'){
        this.state.watcherList = []
      }else if(type === 'line'){
        this.state.onlineList = []
      }else{
        this.state.fansList = []
      }
      this.resetPage(() => { this.nextPage()})
    })
    if(e)e.stopPropagation()
  }

 async clickBtn(type){
    switch (type) {
      case 'like':
        this.randomGift()
        this.setState({
          showGift:true
        })
        try{
          const res = await api.live.giveLike({room_id:this.state.im_id})
        }catch (e) {
          this.setState({
              numLimit:true
            }
          )
          return
        }
        tls.like().then(async function(data) {})
        break
      case 'attend':
        Taro.showLoading({title:'处理中',mask:true})
        if(this.state.is_subscribe == 1){
          tls.cancelAttention().then(async ()=>{
            const res = await api.live.attend({room_id:this.state.im_id})
            this.setState({
              is_subscribe:!this.state.is_subscribe
            })
            Taro.hideLoading()
            Taro.showToast({title:`取消关注成功`})
          })
        }else{
          Taro.showLoading({title:'处理中',mask:true})
          tls.attention().then(async (data) => {
            const res = await api.live.attend({room_id:this.state.im_id})
            this.setState({
              is_subscribe:!this.state.is_subscribe
            })
            // Taro.showToast({title:`关注成功`})
            Taro.hideLoading()
          })
        }
        break
      default :
        Taro.showToast({
          title:'暂未开放',
          icon:'none'
        })
    }
  }
  clearMessge(){
    this.setState({
      inputMessage:''
    })
  }
  changeValue (e){
    this.setState({
      inputMessage:e.detail.value
    })
  }
  animationEnd(){
    this.setState({
      showGift:false
    })
  }
  changeHeight(e){
    this.setState({
      height:e.detail.height
    })
  }
  recoverHeight(){
    this.setState({
      height:0
    })
  }
  handleBuy(item){
    Taro.navigateTo({
     url: `/pages/item/espier-detail?id=${item.item_id}&room_id=${this.state.im_id}`
    })
  }
  handleEnd(){
    this.setState({
      buyerNick:''
    })
  }
  async comfireExit(){
   this.setState({
     showExitChoose:true
   })
  }
  handleOwnCancel(){
    console.log('cancel------------------------------')
    this.setState({
      showExitChoose:false
    })
  }
  handleOwnConfirm(){
    if(this.state.owner == '1'){
      this.statusSend('off')
      tls.exitRoom()
      tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE,'END')
    }else{
      this.statusSend('off')
      tls.exitRoom()
    }
  }
  render() {
    const {liverStatus,showExitChoose,backType,fansList,onlineNum,buyerNick,showGift,current,is_subscribe,loading,room_cover,fans,likes,groupInfo,ownerInfo,type,msgList,watcherList,onlineList,watcherType,goodsList,pullStreamLink,pushStreamLink,room_status,inputMessage} = this.state
    let newList
    let len = this.state.msgList.length
    if(watcherType === 'com'){
      newList = watcherList
    }else if(watcherType === 'line'){
      newList = onlineList
    }else{
      newList = fansList
    }

    return(
      <View>
        <OwnerModal
        title={`确认${this.state.owner == 1?'关闭直播间':'退出直播间'}`}
        isShown={showExitChoose}
        ownCancel={this.handleOwnCancel.bind(this)}
        ownConfirm={this.handleOwnConfirm.bind(this)}
        />
        <View onClick={this.comfireExit.bind(this)} className='back' style={{top:this.top+'px'}}  openType='exit' target='miniProgram'><View className='iconfont icon-arrow-left'/></View>
         <View className='live-view'>
           {
             pushStreamLink !== ''?
               <LivePusher className='live' autopush={true} url={pushStreamLink} beauty={this.state.beautify} filter={this.state.filter} devicePosition={this.state.devicePosition}/>:
               room_status == 1?
                liverStatus === 'ON'?
               <LivePlayer className='live' src={pullStreamLink} autoplay={true} objectFit='fillCrop'/>:
               liverStatus === 'PAUSE'?
                 <View className='outline-live'>主播暂时离开</View>:
                 <View className='outline-live'>主播已下线</View>:
                 <View className='outline-live'>主播还未开播</View>

           }
         </View>
        <View className='data-view' onClick={this.showData.bind(this)}>
          <View className='live-header' style={{top:this.top +'px'}}>
             <View className='live-header-top'>
               <OwnOpacity
                 containerClass='contain-dec'
                 renderTrue={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img' src={ownerInfo.avatar}/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name' onClick={this.showMoreDec.bind(this,'live-detail')}><Text>{groupInfo.name}</Text></View>
                       <View className='room-dec-more'>
                         <Text onClick={this.showMoreDec.bind(this,'watcher-detail','fans')}>{fans||0}关注</Text> | <Text onClick={this.showMoreDec.bind(this,'watcher-detail','line')}>{onlineNum}在线</Text>
                       </View>
                     </View>
                     <View className='attend' onClick={this.clickBtn.bind(this,'attend')}>
                       {
                        is_subscribe == 0?
                          <Text>+关注</Text> :
                          <Text>取消关注</Text>
                       }
                     </View>
                   </View>
                 }
                 renderHide={
                   <View className='header-contain'>
                     <View className='avatar'><Image mode='widthFix' className='img'/></View>
                     <View className='room-dec'>
                       <View className='room-dec-name' onClick={this.showMoreDec.bind(this)}><Text>{groupInfo.name}</Text></View>
                       <View className='room-dec-more'>
                         <Text onClick={this.showMoreDec.bind(this,'watcher-detail','fans')}>{fans||0}关注</Text> | <Text onClick={this.showMoreDec.bind(this,'watcher-detail','line')}>{onlineNum}在线</Text>
                       </View>
                     </View>
                     <View className='attend'>
                       {
                         is_subscribe == 0?
                           <Text>+关注</Text> :
                           <Text>取消关注</Text>
                       }
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
                 <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                 <Text className='attend-dec'>点赞{likes||0}</Text>
                </View>
              }
              renderHide = {
                <View className='bottom-contain'>
                  <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                  <Text className='attend-dec'>点赞{likes||0}</Text>
                </View>
              }
              />

            </View>
          </View>
          {type === ''&&
            <View className='live-footer-container'>
              <View className='live-footer'>
                { buyerNick != ''&&
                  <View className='live-footer-user' onClick={this.clickBtn.bind(this,'buy')} onAnimationEnd={this.handleEnd.bind(this)} >
                    <View className='container'>
                      <View className='iconfont icon-gouwucheman'/>
                      <Text className='buy-dec'><Text className='user-name'>{buyerNick}</Text>正在去购买</Text>
                    </View>
                    <View className='content'>
                      <View className='iconfont icon-gouwucheman'/>
                      <Text className='buy-dec'><Text className='user-name'>{buyerNick}</Text>正在去购买</Text>
                    </View>
                  </View>
                }
                <ScrollView
                scrollY
                scrollIntoView={`msg${len}`}
                enableFlex={true}
                className='message-scroll'
                >
                  {/*<View className='live-footer-message'>*/}
                    {
                      msgList.reverse().map((item,index) => {
                        return (
                          <View id={'msg' +(index +1)}>
                            <OwnOpacity
                              containerClass={'message'}
                              renderTrue={<View className={`true ${index === 0?'gradient-bg':''}`}>
                                <Text className={`user_name ${index === 0?'gradient-name':''}`}>{item.user_name}</Text><Text className={`user_message ${index === 0?'gradient-ms':''}`}>{item.user_message}</Text></View>}
                              renderHide={<View className='true'><Text className='user_name'>{item.user_name}:</Text><Text className='user_message'>{item.user_message}</Text></View>}>
                            </OwnOpacity>
                          </View>
                        )
                      })
                    }
                  {/*</View>*/}
                </ScrollView>
              </View>
            <View className='live-footer-feature'>
              <View className='opc' style={{position:'relative',top:`-${this.state.height}px`}}>
                <View className='send-message'/>
                <Input type='text' onFocus={this.changeHeight.bind(this)} onBlur={this.recoverHeight} placeholder='说点什么...' className='input' placeholderClass='holder' onConfirm={this.handleSendMessage.bind(this)} value={inputMessage} onInput={this.changeValue.bind(this)} adjustPosition={false} confirmType={'确认'}/>
              </View>
              <View className='more'>
                <View className='more-item' onClick={this.showMoreDec.bind(this,'cart-detail')}>
                  <View className='container'/>
                  <View className='iconfont icon-gouwucheman'/>
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <View className='iconfont icon-xinaixin' onClick={this.clickBtn.bind(this,'like')}/>
                  {showGift &&
                    <Image src={`${cdn}/${current}.png`} className='img' mode='widthFix' onAnimationEnd={this.animationEnd.bind(this)} style={{zIndex:'100000000'}}/>
                  }
                </View>
                <View className='more-item'>
                  <View className='container'/>
                  <Button className='iconfont icon-zhuanfa' openType='share'/>
                </View>
              </View>
            </View>
          </View>
          }
          {
            type === 'live-detail'&&
              <View className='live-detail' onClick={this.stop}>
                 <View className='live-detail-avatar'>
                   <Image mode='widthFix' className='img' src={ownerInfo.avatar}/>
                 </View>
                <View className='live-detail-dec'>
                  <View className='user_name'>{ownerInfo.nick}</View>
                  <View className='user_address'><View className='iconfont icon-dizhi'/><Text className='address'>{ownerInfo.location}</Text></View>
                  <View className='user_dec'>{ownerInfo.selfSignature}</View>
                  <View className='user_dec_more'>
                    <View className='user_dec_more_item'><Text className='dec-data'>暂未开放</Text><Text className='dec-dec'>交易</Text></View>
                    <View className='user_dec_more_item' onClick={this.showMoreDec.bind(this,'watcher-detail','fans')}><Text className='dec-data'>{fans}</Text><Text className='dec-dec'>粉丝</Text></View>
                    <View className='user_dec_more_item'><Text className='dec-data'>暂未开放</Text><Text className='dec-dec'>送出</Text></View>
                    <View className='user_dec_more_item'><Text className='dec-data'>{likes?likes:0}</Text><Text className='dec-dec'>收到点赞</Text></View>
                  </View>
                </View>
                <View className='live-detail-footer'>
                  <View className='dec-attend' onClick={this.clickBtn.bind(this,'attend')}>{is_subscribe == 0?'关注':'已关注'}</View>
                  <View className='store' onClick={this.clickBtn.bind(this,'store')}>TA的店铺</View>
                  <View className='dec-main' onClick={this.clickBtn.bind(this,'main')}>主页</View>
                </View>
              </View>
          }
          {
            type === 'watcher-detail'&&
              <View className='watcher-detail' onClick={this.stop}>
                <View className='watcher-detail-title'>
                  <View className={`change-type-com ${watcherType === 'com'?'choosed':''}`} onClick={this.changeWatcher.bind(this,'com')}>互动榜</View>
                  <View className={`change-type-fans ${watcherType === 'fans'?'choosed':''}`} onClick={this.changeWatcher.bind(this,'fans')}>粉丝</View>
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
                    onScrollToLower={this.nextPage}
                  >
                    <View className='item-list'>
                      {
                        loading&&
                          <Loading/>
                      }
                      {!loading && newList.length !=0 &&
                        newList.map((item, index) => {
                          return(
                            <WatcherItem
                              info={item}
                              rank={watcherType === 'com'?index +1:''}
                            />
                          )
                        })
                      }
                      {
                        !loading && newList.length == 0&&
                          <View className='item-list-none'>
                            暂时没有数据~
                          </View>
                      }
                    </View>
                  </ScrollView>
                </View>
              </View>
          }
          {
            type === 'cart-detail'&&
              <View className='cart-detail' onClick={this.stop}>
                <View className='cart-detail-title'>共{goodsList.length}件商品</View>
                <View className='cart-detail-list'>
                  <ScrollView
                  scrollY
                  enableFlex={true}
                  onScrollToLower={this.nextPage}
                  className='goods-scroll'
                  >
                    <View className='goods-scroll-list'>
                      {goodsList.length!==0&&
                        goodsList.map((item,index) => {
                          return(
                            <View onClick={this.handleBuy.bind(this,item)}>
                              <LiveGoodsItem
                                info={item}
                                index={index+1}
                              />
                            </View>
                          )
                        })
                      }
                      {
                        goodsList.length === 0&&
                          <View className='none-goods'>
                            主播懒得一批，暂时没有商品
                          </View>
                      }
                    </View>
                  </ScrollView>
                </View>
              </View>
          }
        </View>
      </View>
    )
  }
}
