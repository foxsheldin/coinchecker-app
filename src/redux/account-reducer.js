import { accountsAPI } from "../api/api";

const ADD_ACCOUNT = "ADD_ACCOUNT";
const SET_ACCOUNTS_INFO = "SET_ACCOUNTS_INFO";
const SET_ACCOUNT_DATA = "SET_ACCOUNT_DATA";
const SET_ALL_MONEY = "SET_ALL_MONEY";
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    accountsInfo: {
        cashData: [],
        cardData: [],
        creditData: [],
        bankAccountData: [],
        depositData: [],
    },
    accountData: {},
    allMoney: 0,
    isFetching: false,
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACCOUNT:
            switch (action.data.typeAccount) {
                case "cash":
                    return {
                        ...state,
                        accountsInfo: {
                            ...state.accountsInfo,
                            cashData: [...state.accountsInfo.cashData, action.data.newAccount],
                        }
                    }
                case "card":
                    return {
                        ...state,
                        accountsInfo: {
                            ...state.accountsInfo,
                            cardData: [...state.accountsInfo.cardData, action.data.newAccount],
                        }
                    }
                case "credit":
                    return {
                        ...state,
                        accountsInfo: {
                            ...state.accountsInfo,
                            creditData: [...state.accountsInfo.creditData, action.data.newAccount],
                        }
                    }
                case "bankAccount":
                    return {
                        ...state,
                        accountsInfo: {
                            ...state.accountsInfo,
                            bankAccountData: [...state.accountsInfo.bankAccountData, action.data.newAccount],
                        }
                    }
                case "deposit":
                    return {
                        ...state,
                        accountsInfo: {
                            ...state.accountsInfo,
                            depositData: [...state.accountsInfo.depositData, action.data.newAccount],
                        }
                    }
                default:
                    return state;
            }
        
        case SET_ACCOUNTS_INFO:
            return { ...state, accountsInfo: action.accountsInfo }
        
        case SET_ACCOUNT_DATA:
            return { ...state, accountData: action.accountData }
        
        case SET_ALL_MONEY:
            return {...state, allMoney: action.allMoney}

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        default:
            return state;
    }
}

export const addAccount = (typeAccount, newAccount) => ({ type: ADD_ACCOUNT, data: { typeAccount, newAccount } });
const setAccountsInfo = (accountsInfo) => ({type: SET_ACCOUNTS_INFO, accountsInfo})
const setAccountData = (accountData) => ({type: SET_ACCOUNT_DATA, accountData})
const setAllMoney = (allMoney) => ({type: SET_ALL_MONEY, allMoney})
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })


export const getAccounts = (userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        accountsAPI.getAccounts(userid).then(data => {
            dispatch(setAccountsInfo(data.accountsInfo))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const getAllMoney = (userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        accountsAPI.getAllMoney(userid).then(data => {
            dispatch(setAllMoney(parseFloat(data.allMoney)))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const getAccount = (typeAccount, accountID, userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        accountsAPI.getAccount(typeAccount, accountID, userid).then(data => {
            dispatch(setAccountData(data.accountData))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const updateAccount = (data, typeAccount, accountID, userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        accountsAPI.updateAccount(data, typeAccount, accountID, userid).then(data => {
            dispatch(toggleIsFetching(false))
        })
    }
}

export default accountReducer;