import { URL } from "constants/constants";

const initialData = {
  fetching: false,
  array: [],
  current: {},
};

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERRROR = "GET_CHARACTERS_ERRROR";

const GET_CHARACTER = "GET_CHARACTER";
const GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS";
const GET_CHARACTER_ERRROR = "GET_CHARACTER_ERRROR";

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_CHARACTERS_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_CHARACTER:
      return { ...state, fetching: true };
    case GET_CHARACTER_SUCCESS:
      return { ...state, current: action.payload, fetching: false };
    case GET_CHARACTER_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

/**
 * Actions (thunk)
 */

export const getCharactersAction =
  ({ page = 0 } = {}) =>
  (dispatch) => {
    dispatch({
      type: GET_CHARACTERS,
    });
    return (
      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `${URL}characters?limit=5&offset=${page * 5}`
        )}`
      )
        // .then((response) => {
        //   if (response.ok) return response.json();
        //   throw new Error("Network response was not ok.");
        // })
        // .then((data) => {
        //   console.warn(data.contents)
        //   dispatch({
        //     type: GET_CHARACTERS_SUCCESS,
        //     payload: data.contents,
        //   });
        // })

        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: GET_CHARACTERS_SUCCESS,
            payload: JSON.parse(data.contents),
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: GET_CHARACTERS_ERRROR,
            payload: err,
          });
        })
    );
  };

export const getSingleCharacterAction =
  ({ id = 1 } = {}) =>
  (dispatch,getState) => {
    dispatch({
      type: GET_CHARACTER,
    });
    return fetch(`${URL}characters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_CHARACTER_SUCCESS,
          payload: data[0],
        });
        saveStorage(getState())
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_CHARACTER_ERRROR,
          payload: err,
        });
      });
  };


  /**
 * Aux Functions
 */
const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};