import Taro, { Component } from '@tarojs/taro'
import {View, Input, Text, Image, ScrollView, LivePusher,Button,Navigator,CoverView} from "@tarojs/components"
import OwnOpacity from "../../../components/own-opacity/own-opacity"
import {FilterBar, FloatMsg, Loading} from "../../../components";
import WatcherItem from "./coms/watcher-item";
import LiveGoodsItem from "./coms/goodsItem";
import OwnerModal from './coms/own-modal'
import './live.scss'
import {cdn} from "../../../consts";
import {withPager,WithTim} from "../../../hocs";
import api from '@/api'
import S from '@/spx'
import TLS from "./tls.min";
import {connect} from "@tarojs/redux";
import entry from "../../../utils/entry";


@connect(({liveGoods}) => ({
  storeGoods:liveGoods.storeGoods,
  flatGoods:liveGoods.flatGoods
}),(dispatch) =>({
  setFlat:(payload) => dispatch({type:'liveGoods/setFlat',payload}),
  setStore:(payload) => dispatch({type:'liveGoods/setStore',payload}),
  setName:(payload) => dispatch({type:'liveGoods/setName',payload}),
  setFace_url:(payload) => dispatch({type:'liveGoods/setFace_url',payload}),
}))
@WithTim
@withPager
export default class Live extends Component {
  static options = {
    addGlobalClass: true
  };
  config = {
    disableScroll: true
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      operator_id:'',
      form:{
        name:'',
        face_url:'',
        products:''
      },
      preViewUrl:'',
      owner: 1,
      location: '',
      likeCount: [],
      position:'front',
      beautify:0,
      fCurIndex:0,
      bCurIndex:0,
      filter:'standard',
      filterList: [
        {value: 'standard', label: '标准',url:`${cdn}/standard.png`},
        {value: 'pink', label: '粉嫩',url:`${cdn}/pink.png`},
        {value: 'nostalgia', label: '怀旧',url:`${cdn}/nostalgia.png`},
        {value: 'blues', label: '蓝调',url:`${cdn}/blues.png`},
        {value: 'romantic', label: '浪漫',url:`${cdn}/romantic.png`},
        {value: 'cool', label: '清凉',url:`${cdn}/cool.png`},
        {value: 'fresher', label: '清新',url:`${cdn}/fresher.png`},
        {value: 'solor', label: '日系',url:`${cdn}/solor.png`},
        {value: 'aestheticism', label: '唯美',url:`${cdn}/aestheticism.png`},
        {value: 'whitening', label: '美白',url:`${cdn}/whitening.png`},
        {value: 'cerisered', label: '樱红',url:`${cdn}/cerisered.png`},
      ],
      beautifyList:[
        {value:0,label:0},
        {value:0.1,label:1},
        {value:0.2,label:2},
        {value:0.3,label:3},
        {value:0.4,label:4},
        {value:0.5,label:5},
        {value:0.6,label:6},
        {value:0.7,label:7},
        {value:0.8,label:8},
        {value:0.9,label:9}
      ],
      timerLiver: null,
      showExitChoose: false,
      onlineNum: 0,
      im_id: '',
      numLimit: false,
      buyerNick: '',
      height: 0,
      current: '',
      showGift: false,
      is_subscribe: 0,
      loading: false,
      fans: '',
      likes: '',
      room_cover: '',
      timer: null,
      pushStreamLink: '',
      room_status: true,
      liverStatus: 'ON',
      type: '',
      inputMessage: '',
      msgList: [],
      watcherList: [],
      giftMsgList:[],
      onlineList: [],
      fansList: [],
      sourceIndex:0,
      sourceList:[{title:'苏心淘商品'},{title:'个人店铺商品'}],
      watcherType: 'line',
      setType:''
    }
    this.top = Taro.getStorageSync('top')
  }

componentWillMount() {
  this.context = Taro.createLivePusherContext()
  this.context.startPreview()
}

  componentDidShow () {
    if (!S.getAuthToken()) {
      S.login(this)
      return
    }
    if(this.context && this.state.im_id){this.context.start()}
    Taro.setKeepScreenOn({
      keepScreenOn: true
    })
    Taro.setStorageSync('is_owner',1)
     this.fetchMemberInfo()
  }
  async fetchMemberInfo(){
    const {memberInfo, vipgrade} = await api.member.memberInfo()
    this.setState({
      operatorsopen: memberInfo.operatorsopen,
      mobile: memberInfo.mobile,
    })
    Taro.setStorageSync('userinfo', {
      username: memberInfo.username,
      avatar: memberInfo.avatar,
      userId: memberInfo.user_id,
      user_card_code: memberInfo.user_card_code,
      inviter_id: memberInfo.inviter_id,
      is_vip: vipgrade.is_vip,
      grade_name: vipgrade.grade_name,
      operatorsopen: memberInfo.operatorsopen,
    })
    this.setState({
      memberInfo,
      vipgrade
    })
    if (!this.tls) {
      if(!this.state.im_id) return
      this.postUserInfo()
    } else {
      this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE, 'ON')
    }
  }
  componentDidMount() {
    if(S.getAuthToken()){
      this.fetchConfig()
    }
  }

  componentWillUnmount() {
    if(!this.state.im_id) return
    clearInterval(this.state.timer)
    clearInterval(this.state.timerLiver)
    this.statusSend('off')
    this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE, 'END')
    this.tls.exitRoom()
  }

  componentDidHide() {
    if(!this.state.im_id) return
    if (this.tls) {this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE, 'PAUSE')}
  }
  async fetchConfig(){
    const {GroupInfo,product} = await api.live.getConfig()
    // 兼容之前的数据结构
    let newProduct = {}
    try{
      let obj = JSON.parse(product)
      if(obj.flatGoods){
        newProduct.flatGoods = obj.flatGoods
        newProduct.storeGoods = obj.storeGoods
      }else{
        newProduct = {storeGoods:[],flatGoods:[]}
      }
    }catch (e) {
      newProduct = {storeGoods:[],flatGoods:[]}
    }
    let form = {
      name:GroupInfo[0].Name,
      face_url:GroupInfo[0].FaceUrl,
      products:newProduct
    }
    this.props.setStore(form.products.storeGoods)
    this.props.setFlat(form.products.flatGoods)
    this.props.setName(form.name)
    this.props.setFace_url(form.face_url)
    this.setState({
      form
    })
    try {
      const {operator_id} = await api.store.getOwnShopInfo()
      Taro.setStorageSync('operator_id', operator_id)
      this.setState({
        operator_id
      })
    } catch (e) {
      console.log(e)
    }
  }
  postUserInfo = async (cb) => {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    let ERR
    try {
      await api.live.postInfo({grade_id: Number(this.state.vipgrade.vip_grade_id) + 1})
    } catch (e) {
      ERR = e
    }
    if (!ERR) {
      Taro.hideLoading()
      this.initTim(cb)
    }
  };
  initTim = async (cb =()=>{}) => {
    const {user_id = 1, userSig, url, products} = await api.live.getUserSig({
      owner: 1,
      room_id: this.state.im_id
    })

    let list;
    try {
      let newList = JSON.parse(products)
      if (Array.isArray(newList)) {
        list = newList
      } else {
        list = []
      }
    } catch (e) {
      list = []
    }
    this.setState({
      pushStreamLink: url,
      room_status: 1,
      is_subscribe: 1,
      goodsList: list
    })
    this.init(userSig, user_id, this.state.im_id, () => {
      this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE, 'ON')
      this.nextPage()
      this.liverStatusSend('on')
      cb()
    })
    Taro.getLocation({
      success: (res) => {
        api.live.getLocationDetail(res).then((res) => {
          this.setState({
            location: res.data.result.address
          })
        })
      }
    })
  };

  onShareAppMessage(obj) {
    return {
      title: '快来观看直播吧~',
      path: `/others/pages/live/live-watcher?im_id=${this.state.im_id}&uid=${this.state.memberInfo.user_card_code}&user_id=${this.state.memberInfo.user_id}&operator_id=${this.state.operator_id}`,
      imageUrl: this.state.form.face_url
    }
  }

  liverStatusSend(type) {  //主播状态变更发送
    let interval = () => {
      try {
        api.live.changeLiverStatus({room_id: this.state.im_id,status:type})
      } catch (e) {
        console.log(e)
      }
    }
    interval()
    let timerLiver = setInterval(interval, 1000 * 60)
    this.setState({
      timerLiver
    })
  }

  handleWatchTim(type, data) {
    let formate = this.formate
    let msg = this.handleMsgLength()
    switch (type) {
      case 'RoomStatusChange':
        break
      case 'JoinGroup':
        if (data.nick === this.state.ownerInfo.nick || !data.nick) return
        msg.push({
          user_name: formate(data.nick),
          user_message: '加入了直播间',
        })
        this.setState({
          msgList: msg,
          onlineNum: this.state.onlineNum + 1
        })
        break
      case 'ExitGroup':
        msg.push({
          user_name: formate(data.nick),
          user_message: '退出了直播间',
        })
        this.setState({
          msgList: msg,
          onlineNum: this.state.onlineNum - 1
        })
        break
      case 'BuyGoods':
        const {nick} = data
        this.setState({
          buyerNick: nick
        })
        break
      case 'Message':
        msg.push({
          user_name: formate(data.nick, true),
          user_message: data.message,
        })
        this.setState({
          msgList: msg
        })
        break
      case 'Like':
        this.state.likes = Number(this.state.likes) + 1
        this.setState({
          likes:this.state.likes
        })
        break
      case 'Attention':
        msg.push({
          user_name: formate(data.nick),
          user_message: '关注了主播',
        })
        this.setState({
          msgList: msg,
          fans: Number(this.state.fans) + 1
        })
        break
      case 'CancelAttention':
        msg.push({
          user_name: formate(data.nick),
          user_message: '取消关注主播',
        })
        this.setState({
          msgList: msg,
          fans: Number(this.state.fans) - 1
        })
        break
      case 'SendGift':
        let obj = entry.parseUrlStr(data.value)
        let giftMsgItem = {
          giftName:obj.giftName,
          giftUrl:obj.giftUrl,
          resource:data.nick
        }
        this.setState({
          giftMsgList:[...this.state.giftMsgList,giftMsgItem]
        })
        break
      case 'AddGoods':
        msg.push({
          user_name:'',
          user_message:`你${data.value === 'add'?'添加了新的':'下架了'}商品`
        })
        this.setState({
          msgList:msg
        })
        break
      default :
        break
    }
  }

  handleMsgLength() {
    let arr = [...this.state.msgList]
    if (this.state.msgList.length >= 100) {
      arr.shift()
      this.setState({
        msgList: arr
      })
    }
    return arr
  }

  formate = (name, add = false) => {
    return `${name}${add ? ' :' : ''}`
  };

  handleSendMessage = async (e) => {
    this.tls.sendMessage(e.detail.value).then((res) => {
      let msg = this.handleMsgLength();
      msg.push({
        user_name: this.formate(res.nick, true),
        user_message: e.detail.value,
      })
      this.setState({
        msgList: msg,
        inputMessage: ''
      })
    })
  };

  fetch = async (params) => {
    const {page_no, page_size} = params
    if (this.state.watcherType === 'com') {
      const option = {
        page: page_no,
        pageSize: page_size,
        room_id: this.state.im_id
      }
      this.setState({
        loading: true
      })
      const {list, total_count} = await api.live.getRankList(option)
      this.setState({
        loading: false
      })
      let total = total_count
      this.setState({
        watcherList: [...this.state.watcherList, ...list],
      })
      return {total}
    } else if (this.state.watcherType === 'line') {
      const option = {
        page: page_no,
        pageSize: page_size,
        room_id: this.state.im_id
      }
      this.setState({
        loading: true
      })
      const {list, total_count} = await api.live.getOnlineRoom(option)
      this.setState({
        loading: false
      })
      let total = total_count
      this.setState({
        onlineList: [...this.state.onlineList, ...list],
        onlineNum: total
      }, () => {
        console.log(this.state)
      })
      return {total}
    } else {
      const option = {
        page: page_no,
        pageSize: page_size,
        room_id: this.state.im_id
      }
      this.setState({
        loading: true
      })
      const {list, total_count} = await api.live.getRoomFans(option)
      this.setState({
        loading: false
      })
      let total = total_count
      this.setState({
        fansList: [...this.state.fansList, ...list],
        fans: total
      }, () => {
        console.log(this.state)
      })
      return {total}
    }
  };

  showMoreDec(type, pType, e) {
    this.setState({
      type: type
    })
    if (type === 'cart-detail') {
      this.nextPage()
      this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.BUY_GOODS, 'BUY')
    }
    if (pType) this.changeWatcher(pType)
    if (e) e.stopPropagation()
  }

  showData() {
    if (this.state.type !== '') {
      this.setState({
        type: ''
      })
    }
  }

  stop(e) {
    e.stopPropagation()
  }
  handleLike(){
    this.setState({
      likeCount:[...this.state.likeCount,1]
    })
    this.clickBtn('like')
  }
  changeWatcher(type,e){
    if(this.state.page.isLoading) return
    this.setState({
      watcherType: type
    }, () => {
      if (type === 'com') {
        this.state.watcherList = []
      } else if (type === 'line') {
        this.state.onlineList = []
      } else {
        this.state.fansList = []
      }
      this.resetPage(() => {
        this.nextPage()
      })
    })
    if (e) e.stopPropagation()
  }

  async clickBtn(type) {
    switch (type) {
      case 'like':
        try {
          const res = await api.live.giveLike({room_id: this.state.im_id})
          if(res.status === 'ok'){
            this.tls.like().then(async function (data) {})
          }
        } catch (e) {
          this.setState({
              numLimit: true
            }
          )
        }
        break
      case 'attend':
        Taro.showLoading({title: '处理中', mask: true})
        if (this.state.is_subscribe == 1) {
          this.tls.cancelAttention().then(async () => {
            const res = await api.live.attend({room_id: this.state.im_id})
            this.setState({
              is_subscribe: !this.state.is_subscribe
            })
            Taro.hideLoading()
            Taro.showToast({title: `取消关注成功`})
          })
        } else {
          Taro.showLoading({title: '处理中', mask: true})
          this.tls.attention().then(async (data) => {
            const res = await api.live.attend({room_id: this.state.im_id})
            this.setState({
              is_subscribe: !this.state.is_subscribe
            })
            Taro.showToast({title: `关注成功`})
            Taro.hideLoading()
          })
        }
        break
      case 'gift':
        Taro.showToast({
          title: '不能给自己送礼',
          icon: 'none'
        })
        break
      default :
        Taro.showToast({
          title: '暂未开放',
          icon: 'none'
        })
    }
  }

  changeValue(e) {
    this.setState({
      inputMessage: e.detail.value
    })
  }

  animationEnd() {
    this.setState({
      showGift: false
    })
  }

  changeHeight(e) {
    this.setState({
      height: e.detail.height
    })
  }

  recoverHeight() {
    this.setState({
      height: 0
    })
  }

  handleBuy(item) {
    if(this.state.sourceIndex === 0){
      Taro.navigateTo({
        url: `/pages/item/espier-detail?id=${item.item_id}`
      })
      return
    }
      Taro.navigateTo({
        url: `/pages/item/espier-detail?id=${item.item_id}&operator_id=${this.state.operator_id}`
      })

  }

  handleEnd() {
    this.setState({
      buyerNick: ''
    })
  }

  async comfireExit() {
    this.setState({
      showExitChoose: true
    })
  }

  handleOwnCancel() {
    this.setState({
      showExitChoose: false
    })
  }

  handleOwnConfirm() {
    this.tls.sendCustomMsgAndEmitEvent(TLS.EVENT.ROOM_STATUS_CHANGE, 'END')
    this.liverStatusSend('off')
    this.tls.exitRoom()
  }

  handleLike() {
    this.setState({
      likeCount: [...this.state.likeCount, 1]
    })
    this.clickBtn('like')
  }

  handleLikeEnd(index) {
    if (this.state.likeCount.length === (index + 1)) {
      this.setState({
        likeCount: []
      })
    }
  }


  manageStore(type) {
    if(type === 'live'){
      Taro.navigateTo({url:'/others/pages/live/live-store'})
      return
    }
    if (this.state.operatorsopen != 1) {
      this.openStore('/marketing/pages/user-store/store-manage')
      return
    }
    Taro.navigateTo({url: '/marketing/pages/user-store/store-manage'})
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
  pusherConfigChange(index){
    if(this.state.setType === 'pusher/filter'){
      this.setState({
        fCurIndex:index
      })
    }else{
      this.setState({
        bCurIndex:index
      })
    }
  }
  changeConfig(type,e){
      if(type === 'reverse'){
        this.context.switchCamera({
          success: () => {
            console.log('切换成功')
          }
        })
      }else{
        this.setState({
          type:'live-setting',
          setType:type
        })
      }
      if(e) e.stopPropagation()
  }
  confirmLive(){
    if(!this.state.form.name){
      Taro.showToast({title:'名称不能为空',icon:'none'})
    }
    if(!this.state.form.face_url){
      Taro.showToast({title:'封面不能为空',icon:'none'})
    }
    let option = {}
    option.products = JSON.stringify({flatGoods:this.props.flatGoods,storeGoods:this.props.storeGoods})
    option.face_url = this.state.form.face_url
    option.name = this.state.form.name
    api.live.postConfig(option).then((res) => {
      Taro.showToast({
        title:'设置成功'
      })
      this.fetchConfig()
      this.setState({
        im_id:res.group_id
      },() => {
        this.postUserInfo(() => {
          this.context.stopPreview()
          this.context.start()
        })
      })
    }).catch(e => {
      Taro.showToast({
        title:e.errMsg||'发生错误'
      })
    })
  }
  handleUploadImg(){
    Taro.chooseImage({
      success:(res)=>{
        const path = res.tempFilePaths
        this.postImage(path[0])
      }
    })
  }
  async postImage(file){
    Taro.showLoading({
      title:'上传中'
    })
    Taro.uploadFile({
      url:'https://sxt-s.oioos.com/api/h5app/wxapp/espier/upload',
      filePath:file,
      name:'file',
      success:(res)=>{
        Taro.hideLoading()
        this.state.form.face_url = (JSON.parse(res.data)).data.url
        this.setState({
          form:this.state.form
        })
      }
    })
  }
  handleNameChange(e){
    this.state.form.name = e.detail.value
    this.setState({
      form:this.state.form
    })
  }
  handleSourceChange(e){
    this.setState({
      sourceIndex:e.current
    })
  }
  handleFloatEnd(){
    this.setState({
      giftMsgList:[]
    })
  }
  render() {
    const {giftMsgList,sourceList,sourceIndex,form,position,bCurIndex,fCurIndex,setType,im_id,location, likeCount, filterList,beautifyList, liverStatus, showExitChoose, backType, fansList, onlineNum, buyerNick, showGift, current, is_subscribe, loading, fans, likes, groupInfo, ownerInfo, type, msgList, watcherList, onlineList, watcherType,  pullStreamLink, pushStreamLink, room_status, inputMessage} = this.state
    let newList,setList,goodsList
    let len = this.state.msgList.length
    if (watcherType === 'com') {
      newList = watcherList
    } else if (watcherType === 'line') {
      newList = onlineList
    } else {
      newList = fansList
    }

    if(setType === 'pusher/filter'){
      setList = filterList
    }else if(setType === 'pusher/beautify'){
      setList = beautifyList
    }else{
      setList = []
    }
    if(sourceIndex === 0){
      goodsList = this.props.flatGoods
    }else{
      goodsList = this.props.storeGoods
    }
    return (
      <View>
        <OwnerModal
          title={`确认关闭直播间`}
          isShown={showExitChoose}
          ownCancel={this.handleOwnCancel.bind(this)}
          ownConfirm={this.handleOwnConfirm.bind(this)}
        />
        <View onClick={this.comfireExit.bind(this)} className='back' style={{top: this.top + 'px'}} openType='exit'
              target='miniProgram'><View className='iconfont icon-arrow-left'/></View>
        <View className='live-view'>
          <LivePusher className='live'  autopush={true} url={pushStreamLink} beauty={beautifyList[bCurIndex].value}
                      filter={filterList[fCurIndex].value} devicePosition={position}/>
        </View>
        <View className='data-view' onClick={this.showData.bind(this)}>
          {this.state.im_id ?
          <View className='live-header' style={{top: this.top + 'px'}}>
            <View className='live-header-top'>
              <OwnOpacity
                containerClass='contain-dec'
                renderTrue={
                  <View className='header-contain'>
                    <View className='avatar'><Image mode='widthFix' className='img' src={ownerInfo.avatar}/></View>
                    <View className='room-dec'>
                      <View className='room-dec-name'
                            onClick={this.showMoreDec.bind(this, 'live-detail')}><Text>{groupInfo.name}</Text></View>
                      <View className='room-dec-more'>
                        <Text
                          onClick={this.showMoreDec.bind(this, 'watcher-detail', 'fans')}>{fans || 0}关注</Text> | <Text
                        onClick={this.showMoreDec.bind(this, 'watcher-detail', 'line')}>{onlineNum}在线</Text>
                      </View>
                    </View>
                    <View className='attend' onClick={this.clickBtn.bind(this, 'attend')}>
                      {
                        is_subscribe == 0 ?
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
                      <View className='room-dec-name'
                            onClick={this.showMoreDec.bind(this)}><Text>{groupInfo.name}</Text></View>
                      <View className='room-dec-more'>
                        <Text
                          onClick={this.showMoreDec.bind(this, 'watcher-detail', 'fans')}>{fans || 0}关注</Text> | <Text
                        onClick={this.showMoreDec.bind(this, 'watcher-detail', 'line')}>{onlineNum}在线</Text>
                      </View>
                    </View>
                    <View className='attend'>
                      {
                        is_subscribe == 0 ?
                          <Text>+关注</Text> :
                          <Text>取消关注</Text>
                      }
                    </View>
                  </View>
                }
              />
            </View>
            <View className='live-header-bottom' onClick={this.showMoreDec.bind(this, 'watcher-detail', 'com')}>
              <OwnOpacity
                containerClass='contain-bottom'
                renderTrue={
                  <View className='bottom-contain'>
                    <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                    <Text className='attend-dec'>点赞{likes || 0}</Text>
                  </View>
                }
                renderHide={
                  <View className='bottom-contain'>
                    <Image mode='widthFix' className='img' src={`${cdn}/susisang.png`}/>
                    <Text className='attend-dec'>点赞{likes || 0}</Text>
                  </View>
                }
              />
            </View>
          </View>:
            <View className='set-config'>
              <View className='config-top'>
                <View className='opacity-bg'/>
                <View className='config-content'>
                  <View className='config-content-title'>苏心淘直播</View>
                  <View className='config-content-body'>
                    <View className='body-left'>
                      <View className='opacity-bg'/>
                      <View className='iconfont icon-jia' onClick={this.handleUploadImg.bind(this)}/>
                      <View className='upload-dec'><View className='iconfont icon-copy'/><Text className='change-cover'>更换封面</Text></View>
                      {
                        form.face_url&&
                        <Image src={form.face_url} mode='widthFix' className='cover-img'/>
                      }
                    </View>
                    <View className='body-right'>
                      <Input
                        value={form.name}
                        onInput={this.handleNameChange.bind(this)}
                        className='title-input'
                        placeholder='苏心淘直播，遇见你真好...'
                        placeholderClass='title-input-holder'
                      />
                    </View>
                  </View>
                </View>
              </View>
               <View className='config-bottom'>
                 <View className='feature-list'>
                   <View className='item' onClick={this.changeConfig.bind(this,'reverse')}><Image src={`${cdn}/reverse.png`} className='reverse-img'/><Text>翻转</Text></View>
                   <View className='item' onClick={this.changeConfig.bind(this,'pusher/beautify')}><View className='iconfont icon-beauty'/><Text>美颜</Text></View>
                   <View className='item' onClick={this.changeConfig.bind(this,'pusher/filter')}><View className='iconfont icon-filt'/><Text>滤镜</Text></View>
                   <View className='item' onClick={this.changeConfig.bind(this,'goods')}><View className='iconfont icon-gouwucheman'/><Text>商品</Text></View>
                 </View>
                 <View className='config-bottom-begin' onClick={this.confirmLive.bind(this)}>
                   开始直播
                 </View>
               </View>
            </View>
          }
          {type === '' && im_id &&
          <View className='live-footer-container'>
            <View className='live-footer'>
              {buyerNick != '' &&
              <View className='live-footer-user' onClick={this.clickBtn.bind(this, 'buy')}
                    onAnimationEnd={this.handleEnd.bind(this)}>
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
                  msgList.reverse().map((item, index) => {
                    return (
                      <View id={'msg' + (index + 1)}>
                        <OwnOpacity
                          containerClass={'message'}
                          renderTrue={<View className={`true ${index === 0 ? 'gradient-bg' : ''}`}>
                            <Text
                              className={`user_name ${index === 0 ? 'gradient-name' : ''}`}>{item.user_name}</Text><Text
                            className={`user_message ${index === 0 ? 'gradient-ms' : ''}`}>{item.user_message}</Text></View>}
                          renderHide={<View className='true'><Text className='user_name'>{item.user_name}:</Text><Text
                            className='user_message'>{item.user_message}</Text></View>}>
                        </OwnOpacity>
                      </View>
                    )
                  })
                }
                {/*</View>*/}
              </ScrollView>
            </View>
            <View className='live-footer-feature'>
              <View className='opc' style={{position: 'relative', top: `-${this.state.height}px`}}>
                <View className='send-message'/>
                <Input type='text' onFocus={this.changeHeight.bind(this)} onBlur={this.recoverHeight}
                       placeholder='说点什么...' className='input' placeholderClass='holder'
                       onConfirm={this.handleSendMessage.bind(this)} value={inputMessage}
                       onInput={this.changeValue.bind(this)} adjustPosition={false} confirmType={'确认'}/>
              </View>
              <View className='more'>
                <View className='more-item order-1' onClick={this.showMoreDec.bind(this, 'cart-detail')}>
                  <View className='container'/>
                  <View className='cart'><Image className='cart-img' src={`${cdn}/cart.png`} mode='widthFix'/></View>
                </View>
                <View className={`more-item ${this.state.owner == 0 ? 'order-3' : 'order-2'}`}>
                  <View className='container'/>
                  <View className='like' onClick={this.handleLike.bind(this, 'gift')}>
                    <Image src={`${cdn}/like.png`} mode='widthFix' className='like-img'/>
                  </View>
                </View>
                <View className={`more-item ${this.state.owner == 0 ? 'order-4' : 'order-3'}`}>
                  <View className='container'/>
                  <Button className='iconfont icon-zhuanfa' openType='share'/>
                </View>
                {
                  this.state.owner &&
                    <View className='more-item order-4'>
                      <View className='container'/>
                      <View className='iconfont icon-setting-copy'
                            onClick={this.changeConfig.bind(this,'goods')}/>
                    </View>
                }
              </View>
            </View>
          </View>
          }
          {
            type === 'live-detail' && im_id &&
            <View className='live-detail' onClick={this.stop}>
              <View className='live-detail-avatar'>
                <Image mode='widthFix' className='img' src={ownerInfo.avatar}/>
              </View>
              <View className='live-detail-dec'>
                <View className='user_name'>{ownerInfo.nick}</View>
                <View className='user_address'><View className='iconfont icon-dizhi'/><Text
                  className='address'>{location}</Text></View>
                <View className='user_dec'>{ownerInfo.selfSignature}</View>
                <View className='user_dec_more'>
                  <View className='user_dec_more_item'><Text className='dec-data'>暂未开放</Text><Text
                    className='dec-dec'>交易</Text></View>
                  <View className='user_dec_more_item'
                        onClick={this.showMoreDec.bind(this, 'watcher-detail', 'fans')}><Text
                    className='dec-data'>{fans}</Text><Text className='dec-dec'>粉丝</Text></View>
                  <View className='user_dec_more_item'><Text className='dec-data'>暂未开放</Text><Text
                    className='dec-dec'>送出</Text></View>
                  <View className='user_dec_more_item'><Text className='dec-data'>{likes ? likes : 0}</Text><Text
                    className='dec-dec'>收到点赞</Text></View>
                </View>
              </View>
              <View className='live-detail-footer'>
                <View className='dec-attend'
                      onClick={this.clickBtn.bind(this, 'attend')}>{is_subscribe == 0 ? '关注' : '已关注'}</View>
                <View className='store' onClick={this.clickBtn.bind(this, 'store')}>TA的店铺</View>
                <View className='dec-main' onClick={this.clickBtn.bind(this, 'main')}>主页</View>
              </View>
            </View>
          }
          {
            type === 'watcher-detail' && im_id &&
            <View className='watcher-detail' onClick={this.stop}>
              <View className='watcher-detail-title'>
                <View className={`change-type-com ${watcherType === 'com' ? 'choosed' : ''}`}
                      onClick={this.changeWatcher.bind(this, 'com')}>互动榜</View>
                <View className={`change-type-fans ${watcherType === 'fans' ? 'choosed' : ''}`}
                      onClick={this.changeWatcher.bind(this, 'fans')}>粉丝</View>
                <View className={`change-type-line ${watcherType === 'line' ? 'choosed' : ''}`}
                      onClick={this.changeWatcher.bind(this, 'line')}>在线用户</View>
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
                      loading &&
                      <Loading/>
                    }
                    {!loading && newList.length != 0 &&
                    newList.map((item, index) => {
                      return (
                        <WatcherItem
                          info={item}
                          rank={watcherType === 'com' ? index + 1 : ''}
                        />
                      )
                    })
                    }
                    {
                      !loading && newList.length == 0 &&
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
              <FilterBar
                className='goods-list__tabs'
                custom
                current={sourceIndex}
                list={sourceList}
                onChange={this.handleSourceChange.bind(this)}
              />
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
          {
            type === 'live-setting' &&
            setType === 'goods' &&
              <View className='goods-set-detail' onClick={this.stop}>
                <View className='setting-title'>商品添加</View>
                <View className='set-feature'>
                  <View onClick={this.manageStore.bind(this,'live')} className='f-item'><View className='iconfont icon-add-sy'/>直播店铺管理</View>
                  <View onClick={this.manageStore.bind(this,'personal')} className='f-item'><View className='iconfont icon-add-sy'/>个人小店管理</View>
                </View>
              </View>
          }
          { type === 'live-setting' &&
            (setType === 'pusher/filter' || setType === 'pusher/beautify')&&
              <View className='pusher-set-detail' onClick={this.stop}>
                <View className='pusher-set-title'><Text className='dec'>{setType === 'pusher/filter'?'滤镜' : '美颜'}</Text></View>
                <ScrollView
                  enableFlex={true}
                  scrollIntoView={`set-${setType === 'pusher/filter'?fCurIndex > 3?fCurIndex -3:0:bCurIndex > 3?bCurIndex -3:0}`}
                  scrollX
                  scrollWithAnimation={true}
                  className='scroll-list'
                >
                  <View className='item-list'>
                    {
                      setList.map((item,index) => {
                        return(
                          <View className='item' id={`set-${index}`}>
                            <View
                              className={`item-content ${setType === 'pusher/filter'?index === fCurIndex?'selected':'':index === bCurIndex?'selected':''}`}
                              onClick={this.pusherConfigChange.bind(this,index)}
                            >
                              {
                                setType === 'pusher/filter'?
                                  <Image mode='widthFix' className='filter-img' src={item.url}/>:
                                  <View className='bf-dec'>{item.label}</View>
                              }
                            </View>
                            <View className='item-dec'>{item.label}</View>
                          </View>
                        )
                      })
                    }
                  </View>
                </ScrollView>
              </View>
          }
          {
            im_id &&
              <View className='aside-set'>
                <View className='item' onClick={this.changeConfig.bind(this,'reverse')}><Image src={`${cdn}/reverse.png`} className='reverse-img'/><Text>翻转</Text></View>
                <View className='item' onClick={this.changeConfig.bind(this,'pusher/beautify')}><View className='iconfont icon-beauty'/><Text>美颜</Text></View>
                <View className='item' onClick={this.changeConfig.bind(this,'pusher/filter')}><View className='iconfont icon-filt'/><Text>滤镜</Text></View>
                <View className='item' onClick={this.changeConfig.bind(this,'goods')}><View className='iconfont icon-gouwucheman'/><Text>商品</Text></View>
              </View>
          }
          {
            giftMsgList.length!== 0 &&
            <View className='gift-msg-list-float'>
              <FloatMsg
                onFloatEnd={this.handleFloatEnd.bind(this)}
              >
                {
                  giftMsgList.map((item) => {
                    return(
                      <View className='msg-item'>
                        <Text>{item.resource}给主播送了一个</Text><Text className='gift-name'>{item.giftName}</Text>
                        <Image src={item.giftUrl} className='gift-url'/>
                      </View>
                    )
                  })
                }
              </FloatMsg>
            </View>
          }
        </View>
      </View>
    )
  }
};
