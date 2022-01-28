import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userid: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.data }
        default:
            return state;
    }
}

export const setAuthUserData = (userid, email, isAuth) => ({ type: SET_USER_DATA, data: { userid, email, isAuth } })


export const login = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then(response => {
            if (response.resultCode === 0) {
                let { userid, email } = response.data;
                dispatch(setAuthUserData(parseInt(userid), email, true))
            }
        })
}

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, false))
}

export default authReducer;