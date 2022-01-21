import React from 'react';
import TransactionItem from './TransactionItem/TransactionItem'

function TransactionsBlock(props) {


    let pagesCount = Math.ceil(props.totalTransactionsCount / props.pageSize);
    let paginator = [];
    for (let i = 1; i <= pagesCount; i++) {
        paginator.push(i);
    }
    const transactionElements = props.transactions
        .map(t => <TransactionItem transactionID={t.transactionID}
            firstTypeAccountID={t.firstTypeAccountID} firstAccountID={t.firstAccountID}
            secondTypeAccountID={t.secondTypeAccountID} secondAccountID={t.secondAccountID}
            amountMoney={t.amountMoney} nameCategory={t.nameCategory}
            dateTransaction={t.dateTransaction} payer={t.payer} comment={t.comment}
            isIncome={t.isIncome} isOutcome={t.isOutcome} isTransfer={t.isTransfer}
            nameAccount1={t.nameAccount1} nameAccount2={t.nameAccount2}
        />);

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

    /* return (
        <div className='editTransaction row'>
                <EditTransaction onEditTransactionClick={props.onEditTransactionClick}/>
            </div>
    ); */
}

export default TransactionsBlock;
