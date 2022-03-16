import { URL } from "constants/constants";
import { getAllQuals, getAllFavs, updateDB, updateFavsDB } from "firebaseC";

const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
  myquals: [],
  allquals: [],
};

const GET_QUOTES = "GET_QUOTES";
const GET_QUOTES_SUCCESS = "GET_QUOTES_SUCCESS";
const GET_QUOTES_ERRROR = "GET_QUOTES_ERRROR";

const GET_QUALS = "GET_QUALS";
const GET_QUALS_SUCCESS = "GET_QUALS_SUCCESS";
const GET_QUALS_ERRROR = "GET_QUALS_ERRROR";

const GET_FAV_QUALS = "GET_FAV_QUALS";
const GET_FAV_QUALS_SUCCESS = "GET_FAV_QUALS_SUCCESS";
const GET_FAV_QUALS_ERRROR = "GET_FAV_QUALS_ERRROR";

const GET_FAV_QUALS2 = "GET_FAV_QUALS2";
const GET_FAV_QUALS_SUCCESS2 = "GET_FAV_QUALS_SUCCESS2";
const GET_FAV_QUALS_ERRROR2 = "GET_FAV_QUALS_ERRROR2";

const GET_QUOTE = "GET_QUOTE";
const GET_QUOTE_SUCCESS = "GET_QUOTE_SUCCESS";
const GET_QUOTE_ERRROR = "GET_QUOTE_ERRROR";

const ADD_QUOTE_QUALIFICATION = "ADD_QUOTE_QUALIFICATION";

const ADD_FAVORITE_QUOTE = "ADD_FAVORITE_QUOTE";

const LOG_OUT = "LOG_OUT";

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_QUOTES:
      return { ...state, fetching: true };
    case GET_QUOTES_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_QUOTES_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case ADD_QUOTE_QUALIFICATION:
      return { ...state, ...action.payload };
    case GET_QUOTE:
      return { ...state, fetching: false };
    case GET_QUOTE_SUCCESS:
      return { ...state, current: action.payload, fetching: false };
    case GET_QUOTE_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_QUALS:
      return { ...state, fetching: true };
    case GET_QUALS_SUCCESS:
      return { ...state, allquals: action.payload, fetching: false };
    case GET_QUALS_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_FAV_QUALS:
      return { ...state, fetching: true };
    case GET_FAV_QUALS_SUCCESS:
      return { ...state, favorites: action.payload, fetching: false };
    case GET_FAV_QUALS_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_FAV_QUALS2:
      return { ...state, fetching: true };
    case GET_FAV_QUALS_SUCCESS2:
      return {
        ...state,
        favorites: action.payload,
        array: action.payload,
        fetching: false,
      };
    case GET_FAV_QUALS_ERRROR2:
      return { ...state, fetching: false, error: action.payload };
    case ADD_FAVORITE_QUOTE:
      return { ...state, ...action.payload };
    case LOG_OUT:
      return { ...state, favorites: [] };
    default:
      return state;
  }
}

export const getQuotesAction =
  ({ author = "Walter+White" } = {}) =>
  (dispatch) => {
    dispatch({
      type: GET_QUOTES,
    });
    return fetch(`${URL}quote?author=${author}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_QUOTES_SUCCESS, payload: data });
      })
      .catch((err) =>
        dispatch({
          type: GET_QUOTES_ERRROR,
          payload: err,
        })
      );
  };

export const getSingleQuoteAction =
  ({ id = "1" } = {}) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_QUOTE,
    });
    return await fetch(`${URL}quotes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_QUOTE_SUCCESS,
          payload: data[0],
        });
        saveStorage(getState());
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_QUOTE_ERRROR,
          payload: err,
        });
      });
  };

export const AddQualQouteAction =
  ({ qual = 0, opinion = "" } = {}) =>
  (dispatch, getState) => {
    const { myquals, allquals, current } = getState().quotes;
    let { uid } = getState().user;
    console.log(current);
    const singlequal = {
      current: current,
      qual: qual,
      opinion: opinion,
      uid: uid,
    };
    allquals.push(singlequal);
    myquals.push(singlequal);
    console.log(allquals);
    updateDB(allquals, uid, myquals);
    dispatch({
      type: ADD_QUOTE_QUALIFICATION,
      payload: { myquals: [...myquals], allquals: [...allquals] },
    });
  };

export const AddFavoriteQualAction =
  ({ indexquote = 1 } = {}) =>
  (dispatch, getState) => {
    const { array, favorites } = getState().quotes;
    let { uid } = getState().user;
    // console.log(array[indexquote]);
    const singlequal = {
      quote: array[indexquote],
      uid: uid,
    };
    favorites.push(singlequal);
    updateFavsDB(uid, favorites);
    dispatch({
      type: ADD_FAVORITE_QUOTE,
      payload: { favorites: [...favorites] },
    });
  };

export const RemoveFavoriteQualAction =
  ({ indexquote = 1 } = {}) =>
  (dispatch, getState) => {
    const { array, favorites } = getState().quotes;
    let { uid } = getState().user;
    let auxFav = [];
    favorites.forEach((favorite) => {
      console.log(array[indexquote]);
      if (array[indexquote].quote_id) {
        console.log("aca1")
        if (favorite.quote.quote_id === array[indexquote].quote_id) {
        } else {
          auxFav.push(favorite);
        }
      } else {
        console.log("aca2")
        if (favorite.quote.quote_id === array[indexquote].quote.quote_id) {
        } else {
          auxFav.push(favorite);
        }
      }
    });
    console.log(auxFav);
    updateFavsDB(uid, auxFav);
    dispatch({
      type: ADD_FAVORITE_QUOTE,
      payload: { favorites: [...auxFav] },
    });
  };

export const retreiveAllQuals = () => (dispatch, getState) => {
  dispatch({
    type: GET_QUALS,
  });
  return getAllQuals()
    .then((calificaciones) => {
      dispatch({
        type: GET_QUALS_SUCCESS,
        payload: [...calificaciones],
      });
      saveStorage(getState());
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_QUALS_ERRROR,
        payload: e.message,
      });
    });
};

export const retreiveAllFavs = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAV_QUALS,
  });
  let { uid } = getState().user;
  return getAllFavs(uid)
    .then((favorites) => {
      dispatch({
        type: GET_FAV_QUALS_SUCCESS,
        payload: [...favorites],
      });
      saveStorage(getState());
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_FAV_QUALS_ERRROR,
        payload: e.message,
      });
    });
};

export const retreiveAllFavs2 = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAV_QUALS2,
  });
  let { uid } = getState().user;
  return getAllFavs(uid)
    .then((favorites) => {
      dispatch({
        type: GET_FAV_QUALS_SUCCESS2,
        payload: [...favorites],
      });
      saveStorage(getState());
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_FAV_QUALS_ERRROR2,
        payload: e.message,
      });
    });
};

export const logOutAction2 = (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("storage");
};

const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};
