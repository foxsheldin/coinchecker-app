import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import accountReducer from "./account-reducer";
import authReducer from "./auth-reducer";
import notificationReducer from "./notification-reducer";
import transactionReducer from "./transaction-reducer";

const reducers = combineReducers({
  auth: authReducer,
  account: accountReducer,
  notification: notificationReducer,
  transactionPage: transactionReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
