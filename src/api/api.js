import axios from "axios";
import React from "react";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://server.cc.php/api/",
});

export const transactionsAPI = {
  getEditTransaction(transactionid, userid) {
    return instance
      .get(
        `transactions/transaction.php?userID=${userid}&transactionid=${transactionid}`
      )
      .then((response) => {
        return response.data;
      });
  },
  updateEditTransaction(data) {
    return instance
      .put(`transactions/transaction.php`, { data })
      .then((response) => {
        return response.data;
      });
  },
  getTransactions(
    currentPage,
    pageSize,
    userid,
    typeAccount = null,
    accountID = null
  ) {
    if (typeAccount && accountID) {
      return instance
        .get(
          `transactions/getTransactions.php?userID=${userid}&page=${currentPage}&count=${pageSize}&typeAccount=${typeAccount}&accountID=${accountID}`
        )
        .then((response) => {
          return response.data;
        });
    } else {
      return instance
        .get(
          `transactions/getTransactions.php?userID=${userid}&page=${currentPage}&count=${pageSize}`
        )
        .then((response) => {
          return response.data;
        });
    }
  },
  addNewTransaction(data) {
    return instance
      .post(`transactions/transaction.php`, { data })
      .then((response) => {
        return response.data;
      });
  },
  deleteTransaction(transactionid, userid) {
    return instance.delete(
      `transactions/transaction.php?userID=${userid}&transactionid=${transactionid}`
    );
  },
  getCategories(type) {
    return instance
      .get(`transactions/getCategories.php?type=${type}`)
      .then((response) => {
        return response.data;
      });
  },
  getReportCategories(userid) {
    return instance
      .get(`transactions/getReportCategories.php?userID=${userid}`)
      .then((response) => response.data);
  },
  getCashFlowForDoughnut(userid) {
    return instance
      .get(`transactions/getCashFlowForDoughnut.php?userID=${userid}`)
      .then((response) => response.data);
  },
};

export const accountsAPI = {
  getAccounts(userid) {
    return instance
      .get(`accounts/getAccounts.php?userID=${userid}`)
      .then((response) => {
        return response.data;
      });
  },
  getAllMoney(userid) {
    return instance
      .get(`accounts/getAllMoney.php?userID=${userid}`)
      .then((response) => {
        return response.data;
      });
  },
  getAccount(typeAccount, accountID, userid) {
    return instance
      .get(
        `accounts/account.php?typeAccount=${typeAccount}&changeID=${accountID}&userID=${userid}`
      )
      .then((response) => response.data);
  },
  addAccount(data, userid) {
    return instance
      .post(`accounts/account.php`, { data, userid })
      .then((response) => response.data);
  },
  updateAccount(data, typeAccount, accountID, userid) {
    return instance
      .put(`accounts/account.php`, { data, typeAccount, accountID, userid })
      .then((response) => response.data);
  },
  deleteAccount(typeAccount, accountID, userid) {
    return instance.delete(
      `accounts/account.php?typeAccount=${typeAccount}&accountID=${accountID}&userID=${userid}`
    );
  },
  getBalanceForChart(userid) {
    return instance
      .get(`accounts/getBalanceForChart.php?userID=${userid}`)
      .then((response) => response.data);
  },
};

export const authAPI = {
  login(email, password) {
    return instance
      .post("auth/auth.php", { email: email, password: password })
      .then((response) => {
        return response.data;
      });
  },
  logout(userid, email) {
    return null;
  },
  registration({ username, email, password, repassword }) {
    return instance.post("auth/registration.php", {
      username,
      email,
      password,
      repassword,
    });
  },
};

export const notifyAPI = {
  getNotification(userid) {
    return instance
      .get(`notification.php?userID=${userid}`)
      .then((response) => response.data);
  },
};
