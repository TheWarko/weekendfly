import { FETCH_SEARCH_REQUEST,FETCH_SEARCH_SUCCESS,FETCH_SEARCH_FAILURE } from '../actions/actionTypes'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SEARCH_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_SEARCH_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload
            }
        case FETCH_SEARCH_FAILURE:
            return{
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
    
        default: return state
    }
}

export default searchReducer