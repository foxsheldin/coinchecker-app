import React from 'react';
import BalanceFormContainer from '../common/BalanceForm/BalanceFormContainer';
import AllMoneyComponent from '../common/AllMoney/AllMoneyComponent';
import { Link } from 'react-router-dom';
import BalanceChartContainer from './BalanceChart.js/BalanceChartContainer';
import OutcomeCategoryContainer from './BudgetMouth/OutcomeCategoryContainer';
import CashFlowContainer from './CashFlow/CashFlowContainer';

const Browse = (props) => {
    return (
        <div className="container">
            <div className="actionBlock row my-2">
                <div className="col-2">
                    <Link to="../transaction/1" className='link'>
                        Внести транзакции
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-3" style={{ marginTop: '1.1em' }}>
                    <div className="balance row my-2">
                        <div className="row">
                            <div className="col">
                                <h5>Мои счета</h5>
                            </div>
                            <div className="col">
                                <Link to="../accounts" className='link'>
                                    Добавить счет
                                </Link>
                            </div>
                        </div>
                        <div className="allBalance row">
                            <h3><AllMoneyComponent /></h3>
                            <h6 className="fst-italic">
                                Баланс
                            </h6>
                        </div>
                    </div>
                    <BalanceFormContainer />
                </div>

                <div className="col-9">
                    <div className="graph">
                        <h3>Баланс</h3>
                        <BalanceChartContainer />
                    </div>

                    <div className="budgetMouth">
                        
                        <h3>Статистика трат за месяц</h3>
                        <div className="row">
                            <OutcomeCategoryContainer />
                            <div className="col-4">
                                <CashFlowContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Browse;
