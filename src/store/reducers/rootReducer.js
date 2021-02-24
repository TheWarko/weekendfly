import { combineReducers } from 'redux'
import searchReducer from './search.js'


const rootReducer = combineReducers({
    search: searchReducer
})

export default rootReducer