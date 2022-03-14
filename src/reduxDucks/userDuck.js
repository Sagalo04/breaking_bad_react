import { loginWithGoogle, signOutGoogle } from "firebaseC";
// import { retreiveFavorites,logOutAction2 } from "./charsDuck";
/**
 * Constants
 */
const initialData = {
  loggedIn: false,
  fetching: false,
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOG_OUT = "LOG_OUT";

/**
 * Reducer
 */

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
      case LOG_OUT:
          return {...initialData}
    default:
      return state;
  }
};

export default reducer;

/**
 * Action (Action creators)
 */

export const logOutAction = () => (dispatch, getState) => {
    signOutGoogle()
    dispatch({
        type: LOG_OUT,
    })
    localStorage.removeItem('storage')
    // logOutAction2(dispatch,getState)
}

export const restoreSessionAction = () => (dispatch, getState) =>{
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if (storage && storage.user) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
}

export const doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displaynName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
    //   retreiveFavorites()(dispatch,getState)
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message,
      });
    });
};

/**
 * Aux Functions
 */

const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};
