import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withUserID } from "../../../hoc/withUserID";
import ModalWindow from "./ModalWindow";
import { getAccounts } from "../../../redux/account-reducer";
import {
  getCategories,
  addNewTransaction,
} from "../../../redux/transaction-reducer";

const ModalWindowContainer = (props) => {
  const [initialValues] = useState({
    userID: props.userid ?? 1,
    typeTransaction: "outcome",
    date: new Date().toISOString().substring(0, 10),
    money: null,
    category: 1,
    account: null,
    firstAccount: null,
    secondAccount: null,
    payer: null,
    comment: null,
  });

  useEffect(() => {
    props.getCategories();
    props.getAccounts(props.userid);
  }, []);

  const handleSubmit = (formData) => {
    props.addNewTransaction(formData);
    window.location.reload();
  };

  return (
    <ModalWindow
      accounts={props.accounts}
      categories={props.categories}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.account.accountsInfo,
    categories: state.transactionPage.categories,
  };
};

export default compose(
  connect(mapStateToProps, { getAccounts, getCategories, addNewTransaction }),
  withUserID
)(ModalWindowContainer);
