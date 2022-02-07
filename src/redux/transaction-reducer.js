import { transactionsAPI } from "../api/api";

const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_EDIT_TRANSACTION = 'SET_EDIT_TRANSACTION';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_MESSAGE_ERROR ='SET_MESSAGE_ERROR'

const initialState = {
    transactions: [],
    editTransaction: {},
    categories: [],
    pageSize: 10,
    totalTransactionsCount: 0,
    currentPage: 1,
    isFetching: false,
    messageError: null
}

const transactionReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TRANSACTIONS:
            return {...state, transactions: action.transactions}
        case SET_EDIT_TRANSACTION:
            return {...state, editTransaction: action.editTransaction}
        case SET_CATEGORIES:
            return {...state, categories: action.categories} 
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalTransactionsCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_MESSAGE_ERROR:
            return {...state, messageError: action.messageError}
        default:
            return state;
    }
} 

const setTransactions = (transactions) => ({type:SET_TRANSACTIONS, transactions})
const setEditTransaction = (editTransaction) => ({type:SET_EDIT_TRANSACTION, editTransaction})
const setCategories = (categories) => ({type:SET_CATEGORIES, categories})
const setTotalTransactionsCount = (totalCount) => ({type:SET_TOTAL_COUNT, totalCount})
const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE, currentPage})
const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
const setMessageError = (messageError) => ({type:SET_CURRENT_PAGE, messageError})

export const getTransactions = (currentPage, pageSize, userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        transactionsAPI.getTransactions(currentPage, pageSize, userid).then(data => {
            dispatch(setTransactions(data.items));
            dispatch(setTotalTransactionsCount(data.totalCount));
            dispatch(toggleIsFetching(false));
        });
    }
}

export const getEditTransaction = (transactionid, userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        transactionsAPI.getEditTransaction(transactionid, userid).then(data => {
            data.items = {...data.items, amountMoney: Math.abs(data.items.amountMoney)}
            dispatch(setEditTransaction(data.items));
            if (data.items.isIncome) {    
                transactionsAPI.getCategories("income").then(data => {
                    dispatch(setCategories(data.categories));
                });
            }
            if (data.items.isOutcome) {
                transactionsAPI.getCategories("outcome").then(data => {
                    dispatch(setCategories(data.categories));
                });
            }
            dispatch(toggleIsFetching(false));
        });
    }
}

export const updateEditTransaction = (data, userid) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        transactionsAPI.updateEditTransaction(data).then(data => {
            if (!data.resultCode) {
                dispatch(setMessageError(data.message))
            }
            else {
                
            }
            dispatch(toggleIsFetching(false));
        });
    }
}

export default transactionReducer;