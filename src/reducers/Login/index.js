import * as types from '../../constatns/Booking/ActionTypes.js';
const initialState={
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  err:null,
  notfound:false,
  server_error:false,
  userProfle:null,
  isAdmin:false
};
  export const AuthReducer= (state = initialState, action)=>{
    switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return { ...state,currentUser:action.currentUser,isAuthenticated:true,isAdmin:true};
    case types.LOG_IN_FAILURE:
      return { ...state, err: action.errors };
    case types.LOG_OUT:
      return { ...state, currentUser:null, isAuthenticated: false,userProfle:null };
    case types.START_PROCESSING:
      return { ...state, isLoading: true };
    case types.LOAD_USER_PROFILE:
    return {...state,userProfle:action.userProfle};
    case types.UPDATE_PROFILE:
    return {...state,userProfle:action.user}
    case types.FINISH_PROCESSING:
      return { ...state, isLoading: false };
      case types.CLEAR_ERRORS:
      return { ...state, errors: {} };
    case types.NOT_FOUND:
    return {...state,notfound:true};
    case types.SERVER_ERROR:       
    console.log(action.err);
    return {...state,server_error:true,err:action.err};
    default:
      return state;
    }
  }
