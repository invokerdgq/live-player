import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView } from '@tarojs/components'

import './float-msg.scss'
export default class FloatMsg extends Component{
  static options = {
    addGlobalClass:true
  }
  static defaultProps = {
    speed:120, //  per second distance (rpx)
    onFloatStart:()=>{},
    onFloatEnd:() =>{},
  }
  constructor(props) {
    super(props);
    this.state = {
      left:0,
      timer:null
    }
  }
  componentDidMount() {
    this.startAnimation()
  }
  startAnimation(){
    let circle  =  ()=> {
       this.setState({
         left:this.state.left+this.props.speed/100
       })
    }
    this.props.onFloatStart()
    let timer = setInterval(circle,10)
    this.setState({
      timer
    })
  }
  handleEnd(){
    this.props.onFloatEnd()
    clearInterval(this.state.timer)
  }
  render() {
    const {left} = this.state
    return(
      <View className='float-msg-content'>
        <ScrollView
         scrollX
         scrollLeft={`${left}rpx`}
         onScrollToLower={this.handleEnd.bind(this)}
         enableFlex={true}
         className='msg-scroll-list'
        >
          <View className='content-list'>
            <View className='blank-pos'/>
            {
              this.props.children
            }
            <View className='blank-pos'/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
