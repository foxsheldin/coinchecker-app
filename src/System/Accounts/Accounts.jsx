import React from 'react';
import AllMoneyComponent from '../common/AllMoney/AllMoneyComponent';
import ModalWindowContainer from './ModalWindow/ModalWindowContainer';

const AccountItem = (props) => {
    const numberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return (
        <div className="list-group-item">
            <div className="row">
                <div className="accountTitle col-4 text-center fs-6">{props.name}</div>
                <div className="amount col-4 text-center fs-6">{numberWithSpaces(props.amountMoney)}&nbsp;руб.</div>
                <div className="col-4">
                    <a href={"/system/accounts/edit/" + props.typeAccount + "/" + props.AccountId} 
                        className="btn btn-sm btn-outline-primary">Изменить</a>
                    <a className="btn btn-sm btn-outline-danger" 
                        onClick={() => props.deleteBtnOnClick(props.typeAccount, props.AccountId)}>Удалить</a>
                </div>
            </div>
        </div>
    );
}

const Accounts = (props) => {
    const accountElements = (nameAccount) => {
        return nameAccount.map(each => <AccountItem name={each.name} amountMoney={each.amountMoney}
            typeAccount={each.typeAccount} AccountId={each.id} deleteBtnOnClick={props.deleteBtnOnClick}/>)
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="balanceForm row my-2">
                            {props.accounts.cashData.length ? 
                            <div className="cashMoney row">
                                <h6>Наличные</h6>
                                <div className="list-group">
                                    {accountElements(props.accounts.cashData)}
                                </div>
                            </div>
                            : null}
                            {props.accounts.cardData.length ? 
                            <div className="cardMoney row my-2">
                                <h6>Карты</h6>
                                <div className="list-group">
                                    {accountElements(props.accounts.cardData)}
                                </div>
                            </div>
                            : null}
                            {props.accounts.creditData.length ? 
                            <div className="creditMoney row my-2">
                                <h6>Кредиты</h6>
                                <div className="list-group">
                                    {accountElements(props.accounts.creditData)}
                                </div>
                            </div>
                            : null}
                            {props.accounts.bankAccountData.length ? 
                            <div className="bankAccounts row my-2">
                                <h6>Банковские счета</h6>
                                <div className="list-group">
                                    {accountElements(props.accounts.bankAccountData)}
                                </div>
                            </div>
                            : null}
                            {props.accounts.depositData.length ?
                            <div className="depositMoney row my-2">
                                <h6>Вклады</h6>
                                <div className="list-group">
                                    {accountElements(props.accounts.depositData)}
                                </div>
                            </div>
                            : null}
                        </div>
                    </div>

                    <div className="col-4 my-3">
                        <div className="allMoney border-start border-end">
                            <div className="text mx-2 fs-5">
                                Всего средств
                            </div>
                            <div className="money mx-2">
                                <h3><AllMoneyComponent /></h3>
                            </div>
                        </div>
                        <div className="addAction my-4">
                            <h5>Добавить</h5>
                            <button className="btn my-1 btn-outline-primary my-2" data-bs-toggle="modal" data-bs-target="#addCash">Наличный счет</button>
                            <button className="btn my-1 btn-outline-primary my-2" data-bs-toggle="modal" data-bs-target="#addCard">Карту</button>
                            <button className="btn my-1 btn-outline-primary my-2" data-bs-toggle="modal" data-bs-target="#addCredit">Кредит</button>
                            <button className="btn my-1 btn-outline-primary my-2" data-bs-toggle="modal" data-bs-target="#addBankAccount">Банковский счёт</button>
                            <button className="btn my-1 btn-outline-primary my-2" data-bs-toggle="modal" data-bs-target="#addDeposit">Вклад</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <ModalWindowContainer />
        </div>

    );
}

export default Accounts;
