import TLS from './tls.min'
import TIM from './tim-wx'
import Taro from "@tarojs/taro";

let tls
export default function WithTim (component) {
  return class WithTimComponent extends component{
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        userInfo:'',
        groupInfo:'',
        ownerInfo:'',
        fans:0,
        likes:0,
      }
    }
    init = async (userSig,user_id,im_id,cb) => {
      Taro.showLoading({
        title:'直播间环境准备中',
        mask:true
      })

       tls = new TLS ({
        SDKAppID: '1400406635',
        userSig: userSig,
        userName: user_id,
        TIM:TIM
      })
      this.tls = tls
      this.watch()
      tls.on(TLS.EVENT.SDK_READY,async () => {
        Taro.hideLoading()
        Taro.showToast({
          title:'环境准备好了~',
          icon:'success',
          duration:1500
        })
        let {groupInfo, userInfo} = await tls.joinRoom({
          roomID: im_id,
          getOwnerInfo:true,
        })
        if(!groupInfo){
          groupInfo = await tls.getRoomInfo()
        }
       cb()
        this.setState({
          userInfo,
          groupInfo,
          ownerInfo:groupInfo.ownerInfo,
          fans:groupInfo.groupCustomField[0].value,
          likes:groupInfo.groupCustomField[1].value,
        })
      })
  }

  watch = async ()=>{
    tls.on(TLS.EVENT.ROOM_STATUS_CHANGE, async(data) => {
      this.handleWatchTim('RoomStatusChange',data)
    })

    tls.on(TLS.EVENT.JOIN_GROUP, async (data) => {
      this.handleWatchTim('JoinGroup',data)
    })


    tls.on(TLS.EVENT.EXIT_GROUP, async (data) => {
      this.handleWatchTim('ExitGroup',data)
    })


    tls.on(TLS.EVENT.BUY_GOODS,async (data) => {
      this.handleWatchTim('BuyGoods',data)
    })

    tls.on(TLS.EVENT.MESSAGE, async(data) => {
      this.handleWatchTim('Message',data)
    })


    tls.on(TLS.EVENT.LIKE, async(data) => {
      this.handleWatchTim('Like',data)
    })


    tls.on(TLS.EVENT.ATTENTION, async(data) => {
      this.handleWatchTim('Attention',data)
    })


    tls.on(TLS.EVENT.CANCELATTENTION, async(data) => {
      this.handleWatchTim('CancelAttention',data)
    })
  }

  }
}
