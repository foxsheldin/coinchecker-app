import React from 'react'
import { NavLink } from 'react-router-dom';

const TransactionItem = (props) => {
    const numberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    let colorBalance = "black";
    let date = new Date(props.dateTransaction);
    date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    if (props.isTransfer) {
        return (
            <div className="transaction" id={"transaction_" + props.transactionID}>
                <div className="transactionDatas row my-1">
                    <div className="date col-2">{date}</div>
                    <div className="info col-5">
                        <div className="titlle row">Перевод со счета "{props.nameAccount1}" на счет "{props.nameAccount2}"</div>
                        <div className="comment row">{props.comment}</div>
                    </div>
                    <div className="balance col-2">{numberWithSpaces(props.amountMoney)}&nbsp;руб.</div>
                    <div className="account col-3">{props.nameAccount1} -&gt; {props.nameAccount2}</div>
                    <div className="action col-12">
                        <div className="act1 row">
                            <div className="clear col-2">&nbsp;</div>
                            <NavLink to={'/system/transaction/edit/' + props.transactionID} className="link col-2">Редактировать</NavLink>
                            {/* <a href={"/system/php/deltransaction.php?transactionID=" + props.transactionID} className="delete col-3" onclick="return confirm('Точно удалить?');">Удалить</a> */}
                            <a className="delete col-3" onClick={() => props.onDeleteTransactionClick(props.transactionID)}>Удалить</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        if (props.isIncome)
            colorBalance = "green";
        else if (props.isOutcome)
            colorBalance = "red";

        return (
            <div className="transaction" id={"transaction_" + props.transactionID}>
                <div className="transactionDatas row my-1">
                    <div className="date col-2">{date}</div>
                    <div className="info col-5">
                        <div className="titlle row "><span><span style={{ fontWeight: 'bolder' }}>{props.nameCategory}</span>&nbsp;-&nbsp;{props.payer}</span></div>
                        <div className="comment row">{props.comment}</div>
                    </div>
                    <div className="balance col-2" style={{ color: colorBalance }}>{numberWithSpaces(props.amountMoney)}&nbsp;руб.</div>
                    <div className="account col-3">{props.nameAccount1}</div>
                    <div className="action col-12">
                        <div className="act1 row">
                            <div className="clear col-2">&nbsp;</div>
                            <NavLink to={'/system/transaction/edit/' + props.transactionID} className="link col-2">Редактировать</NavLink>
                            {/* <a href={"/system/php/deltransaction.php?transactionID=" + props.transactionID} className="delete col-3" onclick="return confirm('Точно удалить?');">Удалить</a> */}
                            <a className="delete col-3" onClick={() => props.onDeleteTransactionClick(props.transactionID)}>Удалить</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionItem
