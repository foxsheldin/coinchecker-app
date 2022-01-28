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
    getTransactions(currentPage, pageSize, userid){
        userid=1
        return instance.get(`transactions/getTransactions.php?userID=${userid}&page=${currentPage}&count=${pageSize}`)
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
