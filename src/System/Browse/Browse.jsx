import React from 'react';
import BalanceFormContainer from '../common/BalanceForm/BalanceFormContainer';
import AllMoneyComponent from '../common/AllMoney/AllMoneyComponent';
import { Link } from 'react-router-dom';
import BalanceChartContainer from './BalanceChart.js/BalanceChartContainer';



const Browse = (props) => {
    return (
        <div className="container">
            <div className="actionBlock row my-2">
                <div className="col-2">
                    <Link to="../transaction" className='link'>
                        Внести транзакции
                    </Link>
                </div>
                {/* <div className="col-3">
                    <a href="reminder.html?addReminder" className="link">
                        Добавить регулярный платеж(тест)
                    </a>
                </div> */}
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
                        {/* <canvas id="balanceChart" style={{ display: 'block', boxSizing: 'border-box', height: '483px', width: '966px' }} width="1932" height="966"></canvas>
                        <Line options={{balanceChartOptions}} data={{balanceChartData}} /> */}
                        <BalanceChartContainer />
                    </div>

                    <div className="budgetMouth">
                        <h3>Статистика трат за месяц</h3>
                        <div className="row">

                            {/* <!-- Outcome in category --> */}
                            <div className="col-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ minWidth: '50%', width: 'auto' }}>
                                                &nbsp;
                                            </th>
                                            {/* <!-- */} <th style={{ minWidth: '15%', width: '15%' }}>
                                                Осталось
                                            </th> {/* --> */}
                                        </tr>
                                    </thead>
                                    <tbody><tr><td><h4>В этом месяце нет трат</h4></td></tr>
                                        {/* <!-- */}
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '65%' }}
                                                        aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                    <span className="amount-type">Расход</span>
                                                    <span className="balance-completed">
                                                        <span className="amount">1&#160;420&#160;</span>
                                                        <span className="total" style={{ display: 'inline-block' }}>
                                                            из&#160;<span className="total_amount">8&#160;055</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="amount">8&#160;505&#160;</span> р.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '33%' }}
                                                        aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                                                    <span className="amount-type">Всякие мелочи</span>
                                                    <span className="balance-completed">
                                                        <span className="amount">800&#160;</span>
                                                        <span className="total" style={{ display: 'inline-block' }}>
                                                            из&#160;<span className="total_amount">2&#160;800</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="amount">1&#160;000&#160;</span> р.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: '100%' }}
                                                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                    <span className="amount-type">Платежи, комиссии</span>
                                                    <span className="balance-completed">
                                                        <span className="amount">10&#160;055&#160;</span>
                                                        <span className="total" style={{ display: 'inline-block' }}>
                                                            из&#160;<span className="total_amount">8&#160;055</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="amount">-2&#160;000&#160;</span> р.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '100%' }}
                                                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                    <span className="amount-type">Продукты</span>
                                                    <span className="balance-completed">
                                                        <span className="amount">10&#160;000&#160;</span>
                                                        <span className="total" style={{ display: 'inline-block' }}>
                                                            из&#160;<span className="total_amount">10&#160;000</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="amount">0&#160;</span> р.
                                            </td>
                                        </tr> {/* --> */}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-4">
                                <canvas id="incomeOutcomeChart" style={{ display: 'block', boxSizing: 'border-box', height: '306px', width: '306px' }} width="612" height="612"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Browse;
