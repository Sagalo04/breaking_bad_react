import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import charsReducer from "reduxDucks/charsDuck";
import quotesReducer from "reduxDucks/quoteDuck";
import userReducer,{restoreSessionAction} from "reduxDucks/userDuck";

import thunk from "redux-thunk";

/**
 * Reducers
 */

let rootReducer = combineReducers({
  characters: charsReducer,
  quotes: quotesReducer,
  user: userReducer
});

/**
 * Devtools
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store
 */

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  restoreSessionAction()(store.dispatch)
  // getCharactersAction()(store.dispatch, store.getState);
  return store;
}
