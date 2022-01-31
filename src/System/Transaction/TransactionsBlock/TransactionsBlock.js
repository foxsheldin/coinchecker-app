import React from 'react';
import TransactionItem from './TransactionItem/TransactionItem'

const TransactionsBlock = (props) => {


    let pagesCount = Math.ceil(props.totalTransactionsCount / props.pageSize);
    let paginator = [];
    for (let i = 1; i <= pagesCount; i++) {
        paginator.push(i);
    }
    const transactionElements = props.transactions
        .map(t => <TransactionItem {...t} />);

    return (
        <div className="transactionBlock row">
            <div className="data">
                {transactionElements}
            </div>
            <div className="d-flex justify-content-center">
                {paginator.map(p => {
                    let stylePaginator = "fs-6 link";
                    if (props.currentPage === p) {
                        stylePaginator = "fs-6 link-dark";
                    }
                    return <a className={stylePaginator} onClick={() => props.onPageChanged(p)}>&nbsp;{p}&nbsp;</a>
                })}
            </div>
        </div>
    );
}

export default TransactionsBlock;
