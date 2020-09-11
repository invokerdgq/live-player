import { createReducer } from "redux-create-reducer";

const initState = {
  flatGoods:[],
  storeGoods:[]
}

const liveGoods = createReducer(initState,{
  ['liveGoods/setFlat'](state,action){
    return{
      ...state,
      flatGoods:action.payload
    }
  },
  ['liveGoods/setStore'](state,action){
    return{
      ...state,
      storeGoods:action.payload
    }
  },
  ['liveGoods/clearFlat'](state){
    return{
      ...state,
      flatGoods:[]
    }
  },
  ['liveGoods/clearStore'](state){
    return{
      ...state,
      storeGoods:[]
    }
  }
})
export default liveGoods
