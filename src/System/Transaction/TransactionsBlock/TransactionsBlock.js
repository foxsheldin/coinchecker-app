import React from "react";
import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem/TransactionItem";

const TransactionsBlock = React.memo((props) => {
  let pagesCount = Math.ceil(props.totalTransactionsCount / props.pageSize);
  let paginator = [];
  for (let i = 1; i <= pagesCount; i++) {
    paginator.push(i);
  }
  const transactionElements = props.transactions?.map((t) => (
    <TransactionItem
      {...t}
      key={t.transactionID}
      onDeleteTransactionClick={props.onDeleteTransactionClick}
    />
  ));

  let linkPagination = "";

  if (props.typeAccount && props.accountID)
    linkPagination = `/system/transaction/filter/${props.typeAccount}/${props.accountID}`;
  else linkPagination = "/system/transaction";

  return (
    <div className="transactionBlock row">
      <div className="data">{transactionElements}</div>
      <div className="d-flex justify-content-center">
        {paginator.map((p) => {
          let stylePaginator = "fs-6 link";
          if (props.currentPage === p) {
            stylePaginator = "fs-6 link-dark";
          }
          return (
            <Link
              to={`${linkPagination}/${p}`}
              className={stylePaginator}
              key={"page_" + p}
            >
              &nbsp;{p}&nbsp;
            </Link>
          );
        })}
      </div>
    </div>
  );
});

export default TransactionsBlock;
