import thunk from "redux-thunk";
import {AuthReducer} from "./reducer"
import {applyMiddleware, combineReducers, compose, createStore} from "redux"
const rootReducer = combineReducers({
    Auth:AuthReducer
})

export const store=createStore(
    rootReducer,
    compose(applyMiddleware(thunk)))