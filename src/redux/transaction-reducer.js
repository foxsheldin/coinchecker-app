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
    categories: {
        outcome: [],
        income: [],
    },
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
            switch (action.typeCategories) {
                case 'income':
                    return {...state, categories: { ...state.categories, income: action.categories}};
                case 'outcome':
                    return {...state, categories: { ...state.categories, outcome: action.categories}}; 
                default: 
                    return state;
            }
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
const setCategories = (categories, typeCategories) => ({type:SET_CATEGORIES, categories, typeCategories})
const setTotalTransactionsCount = (totalCount) => ({type:SET_TOTAL_COUNT, totalCount})
const setCurrentPage = (currentPage) => ({type:SET_CURRENT_PAGE, currentPage})
const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
const setMessageError = (messageError) => ({type:SET_CURRENT_PAGE, messageError})

export const getTransactions = (currentPage, pageSize, userid, typeAccount=null, accountID=null) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        transactionsAPI.getTransactions(currentPage, pageSize, userid, typeAccount, accountID).then(data => {
            dispatch(setTransactions(data.items));
            dispatch(setTotalTransactionsCount(data.totalCount));
            dispatch(toggleIsFetching(false));
        });
    }
}

export const deleteTransaction = (transactionid, userid) => {
    return async (dispatch, getState) => {
        let response = await transactionsAPI.deleteTransaction(transactionid, userid);
        let transactions = getState().transactionPage.transactions;

        if (!response.data.resultCode) {
            dispatch(toggleIsFetching(true));
            dispatch(setTransactions(transactions.filter(transaction => transaction.transactionID != transactionid)))
            dispatch(toggleIsFetching(false));
        }
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
                    dispatch(setCategories(data.categories, 'income'));
                });
            }
            if (data.items.isOutcome) {
                transactionsAPI.getCategories("outcome").then(data => {
                    dispatch(setCategories(data.categories, 'outcome'));
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

export const addNewTransaction = (data) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        transactionsAPI.addNewTransaction(data).then(data => {
            if (data.resultCode) {
                dispatch(setMessageError(data.message))
            }
            dispatch(toggleIsFetching(false));
        });
    }
}

export const getCategories = (type) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        transactionsAPI.getCategories("income").then(data => {
            dispatch(setCategories(data.categories, 'income'));
        });
        transactionsAPI.getCategories("outcome").then(data => {
            dispatch(setCategories(data.categories, 'outcome'));
        });
        dispatch(toggleIsFetching(false));
    }
}

export default transactionReducer;