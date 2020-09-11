import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { connect } from "@tarojs/redux";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { SpToast, Timer, NavBar, FormIdCollector, SpCheckbox } from '@/components'
import { classNames, isString, isArray } from '@/utils'
import S from '@/spx'
import api from '@/api'
import NavGap from "../../../components/nav-gap/nav-gap";

import './user-info.scss'

const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

@connect(( { user } ) => ({
  land_params: user.land_params
}), () => ({}))
export default class Reg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      info: {},
      isVisible: false,
      list: [],
      imgVisible: false,
      imgInfo: {},
      isHasValue: false,
      option_list: [],
      showCheckboxPanel: false,
      isHasData: true
    }
  }

  async componentDidMount () {
    const { memberInfo } = await api.member.memberInfo()
    memberInfo.mobile = ''
    this.setState({
      info:memberInfo
    })
  }

  handleSubmit = async () => {
    const {redirect_url} = this.$router.params
    const option = {
      operator_type:'supplier',
      mobile: this.state.info.mobile,
      login_name:this.state.info.username,
      username:this.state.info.username,
      user_id:this.state.info.user_id,
      head_portrait:this.state.info.avatar
    }
    const data = await api.store.openStore(option)
    if(!data.errMsg){
      Taro.setStorageSync('operator_id',data.operator_id)
      Taro.navigateTo({url:`${redirect_url}?id=${data.operator_id}`})
    }else{
      Taro.showToast({title:data.errMsg || '出现错误，请稍后重试',icon:'none'})
    }
  }


  handleClickAgreement = () => {
    Taro.navigateTo({
      url: '/pages/auth/reg-rule'
    })
  }


  handleGetPhoneNumber = async (e) => {
    const { code } = await Taro.login()
    const { errMsg, ...params } = e.detail
    if (errMsg.indexOf('fail') >= 0) {
      return
    }
    params.code = code
    const { phoneNumber } = await api.wx.decryptPhone(params)
    this.state.info.mobile = phoneNumber
    this.setState({
      isHasValue: true,
      info:this.state.info
    })
  }


  render () {
    const { info} = this.state

    return (
      <View>
        <NavGap title='注册'/>
        <View className='auth-reg'>
          <NavBar
            title='注册'
            leftIconType='chevron-left'
          />
          <AtForm
            onSubmit={this.handleSubmit}
          >
            <View className='sec auth-reg__form'>
              {process.env.TARO_ENV === 'weapp' && (
                <View className='at-input'>
                  <View className='at-input__container'>
                    <View className='at-input__title'>手机号码</View>
                    <View className='at-input__input'>{info.mobile}</View>
                    <View className='at-input__children'>
                      <AtButton
                        openType='getPhoneNumber'
                        onGetPhoneNumber={this.handleGetPhoneNumber}
                      >获取手机号码</AtButton>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <View className='btns'>
              {
                process.env.TARO_ENV === 'weapp'
                  ? <FormIdCollector
                    sync
                  >
                    <AtButton className='submit-btn' type='primary' formType='submit'>同意协议并开通店铺</AtButton>
                    <AtButton type='default' >暂不开通</AtButton>
                  </FormIdCollector>
                  : <AtButton type='primary' onClick={this.handleSubmit} formType='submit'>同意协议并开通</AtButton>
              }
              <View className='accountAgreement'>
                已阅读并同意
                <Text
                  className='accountAgreement__text'
                  onClick={this.handleClickAgreement.bind(this)}
                >
                  《用户协议》
                </Text>
              </View>
            </View>
          </AtForm>
          <SpToast />
        </View>
      </View>
    )
  }
}
