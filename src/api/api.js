import axios from "axios";
import React from "react";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://server.cc.php/api/'
})

export const transactionsAPI = {
    getEditTransaction(transactionid) {
        return instance.get(`transactions/getTransaction.php?userID=1&transactionid=${transactionid}`)
        .then(response => {
            return response.data;
        })
    },
    getTransactions(currentPage, pageSize){
        return instance.get(`transactions/getTransactions.php?userID=1&page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
    }
}

export const accountsAPI = {
    getAccounts() {
        return instance.get('accounts/getAccounts.php?userID=1')
        .then(response => {
            return response.data;
        })
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
