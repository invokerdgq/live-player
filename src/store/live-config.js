import { createReducer } from "redux-create-reducer";

const initState = {
  devicePosition:'front',
  beautify:0,
  filter:'standard'
}
const liveConfig = createReducer(initState,{
  ['liveConfig/Position'] (state,action){
      return {
        ...state,
        devicePosition: action.payload
      }
  },
  ['liveConfig/Beautify'] (state,action){
    return{
      ...state,
      beautify: action.payload
    }
  },
  ['liveConfig/Filter'] (state,action){
    return{
      ...state,
      filter: action.payload
    }
  }
})
export default liveConfig
