import axios from "axios";
import React from "react";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://server.cc.php/api/'
})

export const transactionsAPI = {
    getEditTransaction(transactionid, userid) {
        userid=1
        return instance.get(`transactions/transaction.php?userID=${userid}&transactionid=${transactionid}`)
        .then(response => {
            return response.data;
        })
    },
    updateEditTransaction(data) {
        return instance.put(`transactions/transaction.php`, {data})
        .then(response => {
            return response.data;
        })
    },
    getTransactions(currentPage, pageSize, userid, typeAccount=null, accountID=null){
        userid=1
        if (typeAccount && accountID) {
            return instance.get(`transactions/getTransactions.php?userID=${userid}&page=${currentPage}&count=${pageSize}&typeAccount=${typeAccount}&accountID=${accountID}`)
            .then(response => {
                return response.data;
            })
        } else {
            return instance.get(`transactions/getTransactions.php?userID=${userid}&page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
        }
    },
    addNewTransaction(data){
        return instance.post(`transactions/transaction.php`, {data})
        .then(response => {
            return response.data;
        })
    },
    deleteTransaction(transactionid, userid) {
        userid=1
        return instance.delete(`transactions/transaction.php?userID=${userid}&transactionid=${transactionid}`)
    },
    getCategories(type) {
        return instance.get(`transactions/getCategories.php?type=${type}`)
        .then(response => {
            return response.data;
        })
    }
}

export const accountsAPI = {
    getAccounts(userid) {
        userid=1
        return instance.get(`accounts/getAccounts.php?userID=${userid}`)
        .then(response => {
            return response.data;
        })
    },
    getAllMoney(userid) {
        userid=1
        return instance.get(`accounts/getAllMoney.php?userID=${userid}`)
        .then(response=>{
            return response.data;
        })
    },
    getAccount(typeAccount, accountID, userid){
        userid=1
        return instance.get(`accounts/account.php?typeAccount=${typeAccount}&changeID=${accountID}&userID=${userid}`)
        .then(response => (response.data))
    },
    addAccount(data, userid){
        userid=1
        return instance.post(`accounts/account.php`, {data, userid})
        .then(response => (response.data))
    },
    updateAccount(data, typeAccount, accountID, userid) {
        userid=1
        return instance.put(`accounts/account.php`, {data, typeAccount, accountID, userid})
        .then(response => (response.data))
    },
    deleteAccount(typeAccount, accountID, userid) {
        userid=1
        return instance.delete(`accounts/account.php?typeAccount=${typeAccount}&accountID=${accountID}&userID=${userid}`)
    },
    getBalanceForChart(userid) {
        userid=1
        return instance.get(`accounts/getBalanceForChart.php?userID=${userid}`)
        .then( response => response.data)
    }
}

export const authAPI = {
    login(email, password) {
        return instance.post('auth/auth.php', {email: email, password: password})
        .then(response => {
            return response.data;
        })
    },
    logout(userid,email) {
        return null;
    }
}
