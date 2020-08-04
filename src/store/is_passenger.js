import { createReducer } from 'redux-create-reducer'

const initState = {
  is_passenger:false
}

const passenger = createReducer(initState,{
  ['passenger'](state,action){
    const current = action.payload
    return {
      ...state,
      is_passenger: current
    }
  }
})

export default passenger
