import { accountsAPI } from "../api/api";

const ADD_ACCOUNT = "ADD_ACCOUNT";
const SET_ACCOUNTS_DATA = "SET_ACCOUNTS_DATA";
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    accountsInfo: {
        cashData: [],
        cardData: [],
        creditData: [],
        bankAccountData: [],
        depositData: [],
    },
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
        case SET_ACCOUNTS_DATA:
            return { ...state, accountsInfo: action.accountsInfo }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        default:
            return state;
    }
}

export const addAccount = (typeAccount, newAccount) => ({ type: ADD_ACCOUNT, data: { typeAccount, newAccount } });
const setAccountsData = (accountsInfo) => ({type: SET_ACCOUNTS_DATA, accountsInfo})
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })


export const getAccounts = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        accountsAPI.getAccounts().then(data => {
            dispatch(setAccountsData(data.accountsInfo))
            dispatch(toggleIsFetching(false))
        })
    }
}

export default accountReducer;