import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withUserID } from "../../../hoc/withUserID";
import { getAccounts } from "../../../redux/account-reducer";
import {
  getTransactions,
  deleteTransaction,
} from "../../../redux/transaction-reducer";
import PreLoader from "../../common/PreLoader/PreLoader";
import TransactionsBlock from "./TransactionsBlock";

const TransactionsBlockContainer = (props) => {
  let { typeAccount, accountID, page } = useParams();
  let [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    props.getTransactions(
      page ?? 1,
      pageSize,
      props.userid,
      typeAccount,
      accountID
    );
  }, [page]);

  useEffect(() => {
    setPageSize(props.pageSize);
  }, [props.pageSize]);

  const onDeleteTransactionClick = (transactionid) => {
    const conf = window.confirm(`Точно удалить?`);

    if (conf) {
      props.deleteTransaction(transactionid, props.userid);
    }
  };

  return (
    <>
      {!props.transactions && !props.totalTransactionsCount ? (
        <PreLoader />
      ) : (
        <TransactionsBlock
          currentPage={page}
          pageSize={props.pageSize}
          transactions={props.transactions}
          totalTransactionsCount={props.totalTransactionsCount}
          onDeleteTransactionClick={onDeleteTransactionClick}
          typeAccount={typeAccount}
          accountID={accountID}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactionPage.transactions,
    pageSize: state.transactionPage.pageSize,
    totalTransactionsCount: state.transactionPage.totalTransactionsCount,
    currentPage: state.transactionPage.currentPage,
    isFetching: state.transactionPage.isFetching,
  };
};

export default compose(
  connect(mapStateToProps, { getTransactions, getAccounts, deleteTransaction }),
  withUserID
)(TransactionsBlockContainer);
