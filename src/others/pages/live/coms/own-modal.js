import Taro, { Component } from '@tarojs/taro'
import {View,Navigator} from "@tarojs/components"
import './own-modal.scss'

export default class OwnerModal extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props){
    super(props)
  }
  static defaultProps ={
    title:'',
    content:'',
    cancelText:'取消',
    confirmText:'确认',
    isShown:false,
    ownCancel:()=>{},
    ownConfirm:() =>{}
  }
  render(){
    const {isShown,title,content,cancelText,confirmText,ownCancel,ownConfirm} = this.props
    return(
      <View className='wx_dialog_container' style={{display:isShown?'block':'none'}}>
        <View className='wx-mask'></View>
        <View className='wx-dialog'>
          <View className='wx-dialog-title'>{title}</View>
          <View className='wx-dialog-content'>{content}</View>
          <View className='wx-dialog-footer'>
            <View className='wx-dialog-btn' onClick={ownCancel}>{cancelText}</View>
            <Navigator className='wx-dialog-btn'  onClick={ownConfirm} open-type="exit" target="miniProgram">{confirmText}</Navigator>
          </View>
        </View>
      </View>
    )
  }
}
