import Taro, { Component } from '@tarojs/taro'
import {View, LivePlayer, Input, Text, Image, ScrollView,Button} from "@tarojs/components"
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
import {Loading} from "../../../components";
import OwnerModal from './coms/own-modal'
import {connect} from "@tarojs/redux";
import WithTim from "../../../hocs/withTim";


@WithTim
@connect(({passenger}) => ({
  passenger
}),(dispatch) =>({
  changePassenger:(load) => dispatch({type:'passenger',payload:load})
}))
@withPager
export default class LiveWatcher extends Component{
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
      owner:0,
      location:'',
      likeCount:[],
      timerLiver:null,
      showExitChoose:false,
      onlineNum:0,
      im_id:'',
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
      liverStatus:'ON',
      type:'',
      inputMessage:'',
      msgList:[],
      watcherList:[],
      onlineList:[],
      fansList:[],
      goodsList:[],
      watcherType:'line',
    }
    this.top = Taro.getStorageSync('top')
  }
  componentWillMount(){
    this.randomGift()
  }
  componentDidShow() {
    Taro.setKeepScreenOn({
      keepScreenOn: true
    })
    entry.entryLaunch(this.$router.params)
    this.setState({
      im_id:this.$router.params.im_id,
      owner:0
    },() => {
      if(!this.tls){
        this.preLog()
      }
    })
  }
  componentDidMount() {
    this.context = Taro.createLivePusherContext()
  }

  componentWillUnmount(){
    clearInterval(this.state.timer)
    clearInterval(this.state.timerLiver)
    this.statusSend('off')
    this.tls.exitRoom()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(this.props.passenger.is_passenger && !nextProps.passenger.is_passenger && this.tls){
      this.tls.destroy()
    }
  }
  preLog(){
    if(!S.getAuthToken()){
      Taro.showModal({
        title:'登录发现更多精彩',
        cancelText:'暂不登录',
        confirmText:'去登陆',
        success:async (res) => {
          if(res.confirm){
            setTimeout(() => {
              S.login(this)
            },500)
          }else{
            const { code } = await Taro.login()
            const { token } = await api.wx.login({ code,guest:1 })
            Taro.setStorageSync('auth_token',token)
            this.props.changePassenger(true)
            this.initTim()
          }
        }
      })
      return
    }
    this.initTim()
  }
  postUserInfo = async ()=>{
    Taro.showLoading({
      title:'加载中',
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
  initTim = async()=>{
    await this.postUserInfo()
    const {user_id = 1,userSig,url,products,is_subscribe,room_live_link,room_status} = await api.live.getUserSig({owner:0,room_id:this.state.im_id})
    this.init(userSig,user_id,this.state.im_id,() => {
      this.statusSend('on')
      this.nextPage()
    })
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
      room_status:room_status,
      is_subscribe:is_subscribe,
      goodsList:list
    })
      api.live.addHistory({
        room_id:this.state.im_id,
        source:Taro.getStorageSync('distribution_shop_id')
      })
  }

  onShareAppMessage(obj) {
    return{
      title:'快来观看直播吧~',
      path:`/others/pages/live/live-watcher?im_id=${this.state.im_id}&uid=${this.state.memberInfo.user_card_code}`,
      imageUrl:this.state.groupInfo.avatar
    }
  }

  randomGift = ()=>{
    let index = Math.floor(Math.random()*(this.state.giftList.length-1))
    this.setState({
      current:this.state.giftList[index]
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

  handleWatchTim(type,data){
    let formate = this.formate
    let msg = this.handleMsgLength()
    switch (type) {
      case 'RoomStatusChange':
         this.setState({
           liverStatus:data
         })
        break
      case 'JoinGroup':
        if(data.nick === this.state.ownerInfo.nick) return
        msg.push({
          user_name: formate(data.nick),
          user_message: '加入了直播间',
        })
        this.setState({
          msgList: msg,
          onlineNum :this.state.onlineNum + 1
        })
        break
      case 'ExitGroup':
        msg.push({
          user_name: formate(data.nick),
          user_message: '退出了直播间',
        })
        this.setState({
          msgList: msg,
          onlineNum :this.state.onlineNum - 1
        })
        break
      case 'BuyGoods':
        const {nick} = data
        this.setState({
          buyerNick:nick
        })
        break
      case 'Message':
        msg.push({
          user_name: formate(data.nick,true),
          user_message: data.message,
        })
        this.setState({
          msgList: msg
        })
        break
      case 'Like':
        msg.push({
          user_name: formate(data.nick),
          user_message: '给主播点赞了',
        })
        this.setState({
          likes:Number(this.state.likes) +1
        })
        break
      case 'Attention':
        msg.push({
          user_name: formate(data.nick),
          user_message: '关注了主播',
        })
        this.setState({
          msgList: msg,
          fans:Number(this.state.fans) +1
        })
        break
      case 'CancelAttention':
        msg.push({
          user_name: formate(data.nick),
          user_message: '取消关注主播',
        })
        this.setState({
          msgList: msg,
          fans:Number(this.state.fans) -1
        })
        break
      default :
        break
    }
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
    this.tls.sendMessage(e.detail.value).then((res) => {
      let msg = this.handleMsgLength();
      msg.push({
        user_name: this.formate(res.nick,true),
        user_message: e.detail.value,
      })
      this.setState({
        msgList:msg,
        inputMessage:''
      })
    })
  }

  fetch = async (params)=>{
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

  showMoreDec(type,pType,e){
    this.setState({
      type:type
    })
    if(type === 'cart-detail'){
      this.nextPage()
      this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.BUY_GOODS,'BUY')
    }
    if(pType) this.changeWatcher(pType)
    if(e) e.stopPropagation()
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
        try{
          const res = await api.live.giveLike({room_id:this.state.im_id})
        }catch (e) {
          this.setState({
              numLimit:true
            }
          )
          return
        }
        this.tls.like().then(async function(data) {})
        break
      case 'attend':
        Taro.showLoading({title:'处理中',mask:true})
        if(this.state.is_subscribe == 1){
          this.tls.cancelAttention().then(async ()=>{
            const res = await api.live.attend({room_id:this.state.im_id})
            this.setState({
              is_subscribe:!this.state.is_subscribe
            })
            Taro.hideLoading()
            Taro.showToast({title:`取消关注成功`})
          })
        }else{
          Taro.showLoading({title:'处理中',mask:true})
          this.tls.attention().then(async (data) => {
            const res = await api.live.attend({room_id:this.state.im_id})
            this.setState({
              is_subscribe:!this.state.is_subscribe
            })
            Taro.showToast({title:`关注成功`})
            Taro.hideLoading()
          })
        }
        break
      case 'gift':
        Taro.showToast({
          title:'暂未开放',
          icon:'none'
        })
        break
      default :
        Taro.showToast({
          title:'暂未开放',
          icon:'none'
        })
    }
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
    if(this.props.passenger.is_passenger){
      Taro.showModal({
        title:'购买请先登录',
        cancelText:'放弃购买',
        confirmText:'去登陆',
        success:(res) => {
          if(res.confirm){
            S.login(this)
          }
        }
      })
      return
    }
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
    this.setState({
      showExitChoose:false
    })
  }
  handleOwnConfirm(){
      this.statusSend('off')
      this.tls.exitRoom()
  }
  handleLike(){
    this.setState({
      likeCount:[...this.state.likeCount,1]
    })
    this.clickBtn('like')
  }
  handleLikeEnd(index){
    if(this.state.likeCount.length === (index +1)){
      this.setState({
        likeCount:[]
      })
    }
  }
  handleToStore(){
    Taro.navigateTo({url:'/others/pages/live/store?setting=true'})
  }
  render() {
    const {location,likeCount,filterList,liverStatus,showExitChoose,backType,fansList,onlineNum,buyerNick,showGift,current,is_subscribe,loading,fans,likes,groupInfo,ownerInfo,type,msgList,watcherList,onlineList,watcherType,goodsList,pullStreamLink,pushStreamLink,room_status,inputMessage} = this.state
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
          title={`确认退出直播间`}
          isShown={showExitChoose}
          ownCancel={this.handleOwnCancel.bind(this)}
          ownConfirm={this.handleOwnConfirm.bind(this)}
        />
        <View onClick={this.comfireExit.bind(this)} className='back' style={{top:this.top+'px'}}  openType='exit' target='miniProgram'><View className='iconfont icon-arrow-left'/></View>
        <View className='live-view'>
          {room_status == 1?
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
            <View className='live-header-bottom' onClick={this.showMoreDec.bind(this,'watcher-detail','com')} >
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
              </ScrollView>
            </View>
            <View className='live-footer-feature'>
              <View className='opc' style={{position:'relative',top:`-${this.state.height}px`}}>
                <View className='send-message'/>
                <Input type='text' onFocus={this.changeHeight.bind(this)} onBlur={this.recoverHeight} placeholder='说点什么...' className='input' placeholderClass='holder' onConfirm={this.handleSendMessage.bind(this)} value={inputMessage} onInput={this.changeValue.bind(this)} adjustPosition={false} confirmType={'确认'}/>
              </View>
              <View className='more'>
                <View className='more-item order-1' onClick={this.showMoreDec.bind(this,'cart-detail')}>
                  <View className='container'/>
                  <View className='cart'><Image className='cart-img' src={`${cdn}/cart.png`} mode='widthFix'/></View>
                </View>
                <View className={`more-item order-3`}>
                  <View className='container'/>
                  <View className='like' onClick={this.clickBtn.bind(this,'gift')}><Image src={`${cdn}/like.png`} mode='widthFix' className='like-img'/></View>
                  {showGift &&
                  <Image src={`${cdn}/${current}.png`} className='img' mode='widthFix' onAnimationEnd={this.animationEnd.bind(this)} style={{zIndex:'100000000'}}/>
                  }
                </View>
                <View className={`more-item order-4`}>
                  <View className='container'/>
                  <Button className='iconfont icon-zhuanfa' openType='share'/>
                </View>
                <View className='more-item order-2' onClick={this.handleLike.bind(this)}>
                      <View className='container'/>
                      <View className='iconfont icon-xinaixin'/>
                      {
                        likeCount.length !== 0 && likeCount.map((item,index) => {
                          return  (
                            <Image src={`${cdn}/Like-ani.png`} mode='widthFix' className='img-like' onAnimationEnd={this.handleLikeEnd.bind(this,index)} key='like'/>
                          )
                        })
                      }
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
                <View className='user_address'><View className='iconfont icon-dizhi'/><Text className='address'>{location}</Text></View>
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
                        主播暂时没有选择商品
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
