import React from "react";
import { useParams } from "react-router-dom";

export const withTransactionID = (Component) => {
  const TransactionComponent = (props) => {
    const { transactionid } = useParams();
    return <Component {...props} transactionid={transactionid} />;
  };

  return TransactionComponent;
};
