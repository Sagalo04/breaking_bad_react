import { URL } from "constants/constants";
import { getAllQuals, updateDB } from "firebaseC";

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

const GET_QUOTE = "GET_QUOTE";
const GET_QUOTE_SUCCESS = "GET_QUOTE_SUCCESS";
const GET_QUOTE_ERRROR = "GET_QUOTE_ERRROR";

const ADD_QUOTE_QUALIFICATION = "ADD_QUOTE_QUALIFICATION";

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
    return await (
      fetch(`${URL}quotes/${id}`)
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
        })
    );
  };

export const AddQualQouteAction =
  ({ qual = 0, opinion = "", id = 1 } = {}) =>
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

const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};
