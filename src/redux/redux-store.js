import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import accountReducer from "./account-reducer";
import authReducer from "./auth-reducer";
import transactionReducer from "./transaction-reducer";

const reducers = combineReducers({
    auth: authReducer,
    account: accountReducer,
    transactionPage: transactionReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;