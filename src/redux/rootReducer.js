// src/redux/rootReducer.js
import { combineReducers } from "redux";
import newsFeedReducer from './slices/newsFeed'

const rootReducer = combineReducers({
  newsFeed: newsFeedReducer,
});

export default rootReducer;
