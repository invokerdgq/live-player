import { createReducer } from "redux-create-reducer";

const initState = {
  flatGoods:[],
  storeGoods:[],
  name:'',
  face_url:'',
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
  ['liveGoods/setName'](state,action){
    return{
      ...state,
      name:action.payload
    }
  },
  ['liveGoods/setFace_url'](state,action){
    return{
      ...state,
      face_url: action.payload
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
  },
  ['liveGoods/addFlat'](state,action){
    let list = [action.payload,...state.flatGoods]
    return{
      ...state,
      flatGoods:list
    }
  },
  ['liveGoods/addStore'](state,action){
    let list = [action.payload,...state.storeGoods]
    return{
      ...state,
     storeGoods:list
    }
  },
  ['liveGoods/deleteFlat'](state,action){
    state.flatGoods.filter(item => {
      return item.item_id === action.item_id
    })
    return{
      ...state
    }
  },
  ['liveGoods/deleteStore'](state,action){
    state.storeGoods.filter(item => {
      return item.item_id === action.item_id
    })
    return{
      ...state
    }
  },
})
export default liveGoods
