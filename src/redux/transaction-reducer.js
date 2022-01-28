import { transactionsAPI } from "../api/api";

const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_EDIT_TRANSACTION = 'SET_EDIT_TRANSACTION';

const initialState = {
    transactions: [],
    editTransaction: {},
    pageSize: 10,
    totalTransactionsCount: 0,
    currentPage: 1,
    isFetching: false,
}

const transactionReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_TRANSACTIONS:
            return {...state, transactions: action.transactions}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalTransactionsCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_EDIT_TRANSACTION:
            return {...state, editTransaction: action.editTransaction}
        default:
            return state;
    }
} 

const setTransactions = (transactions) => ({type:SET_TRANSACTIONS, transactions})
const setEditTransaction = (editTransaction) => ({type:SET_EDIT_TRANSACTION, editTransaction})
const setTotalTransactionsCount = (totalCount) => ({type:SET_TOTAL_COUNT, totalCount})
const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE, currentPage})
const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})

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
            dispatch(setEditTransaction(data.items));
            dispatch(toggleIsFetching(false));
        });
    }
}

export default transactionReducer;