import {createReducer} from "redux-create-reducer";

const initState = {
  name:'',
  face_url:'',
  products:[]
}

const roomConfig = createReducer(initState,{
   ['name/set'](state,action){
     return {
       ...state,
       name:action.payload
     }
   },
  ['face_url/set'](state,action){
     return{
       ...state,
       face_url:action.payload
     }
  },
  ['products/set'](state,action){
     return{
       ...state,
       products:action.payload
     }
  }
})
export default roomConfig
