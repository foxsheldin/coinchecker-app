import React from 'react';
import AllMoneyComponent from '../common/AllMoney/AllMoneyComponent';
import BalanceFormContainer from '../common/BalanceForm/BalanceFormContainer';
import EditTransactionContainer from './EditTransaction/EditTransactionContainer';

const EditTransactionPage = (props) => {

    return (
        <div>
            <div className="container">
                <div className="headerBlock row my-2">
                    <h2>Наличные транзакции</h2>
                </div>
                <div className="row">
                    <div className="col-8">
                        <EditTransactionContainer />
                    </div>

                    <div className="col-4">
                        <div className="accountForm row my-2 p-3">
                            <div className="allMoney border-start border-end">
                                <div className="text mx-2">
                                    Всего средств
                                </div>
                                <div className="money mx-2">
                                    <h4><AllMoneyComponent /></h4>
                                </div>
                            </div>
                        </div>

                        <BalanceFormContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTransactionPage;
