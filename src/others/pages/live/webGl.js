import Taro, { Component } from '@tarojs/taro'
import {View,Canvas} from "@tarojs/components"
import {createScopedThreejs} from 'threejs-miniprogram'

export default class WebGl extends Component{
  static options = {
    addGlobalClass:true
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
   Taro.createSelectorQuery().in(this.$scope)
      .select('#webgl')
      .node()
      .exec((res) => {
        console.log(res)
        const canvas = res[0].node
        // 创建一个与 canvas 绑定的 three.js
        const THREE = createScopedThreejs(canvas)
        // 传递并使用 THREE 变量
        console.log(THREE)
        this.initWebGl(THREE)
      })
  }
  initWebGl(THREE){
    let scene = new THREE.Scene()
    let geometry = new THREE.BoxGeometry(80,80,80)
    let material = new THREE.MeshLambertMaterial({
      color:'purple'
    })
    let mesh = new THREE.Mesh(geometry,material)
    // mesh.position.set(110,115,0)
    scene.add(mesh)


    // var point = new THREE.PointLight(0xffffff);
    // point.position.set(400, 200, 300); //点光源位置
    // scene.add(point); //点光源添加到场景中

    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    //创建相机对象
    var camera = new THREE.PerspectiveCamera(45,2,0.1,1000);
    camera.position.set(200,100,0); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xb9d3ff, 1);
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
  }

  render() {
    return(
      <View className='webGl-container' style={{marginTop:'100px'}}>
          <Canvas id='webgl' type='webgl'/>
      </View>
    )
  }
}
