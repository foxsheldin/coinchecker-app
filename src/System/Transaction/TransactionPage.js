import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import AllMoneyComponent from '../common/AllMoney/AllMoneyComponent';
import BalanceFormContainer from '../common/BalanceForm/BalanceFormContainer';
import ModalWindowContainer from './ModalWindow/ModalWindowContainer';
import TransactionsBlockContainer from './TransactionsBlock/TransactionsBlockContainer';

const TransactionPage = (props) => {

    return (
        <div>
            <div className="container">
                <div className="headerBlock row my-2">
                    <h2>Наличные транзакции</h2>
                </div>
                <div className="row">
                    {/* <!--Transaction block--> */}
                    <div className="col-8">
                        <div className="transactionForm row border border-primary p-2">
                            <div className="col">
                                Добавить <a className="link" data-bs-toggle="modal" data-bs-target="#addTransaction">одну транзакцию</a>
                            </div>
                            {/* <!-- <div className="col">
                                Добавить <a href="#">одну транзакцию</a> или <a href="#">несколько транзакций</a>
                            </div> --> */}
                            {/* <!-- <div className="col" style="display: none;">
                                <a href="#">Актуализировать счета</a>
                            </div> --> */}
                        </div>
                        <TransactionsBlockContainer />
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

                        {/* <!-- <div class="row my-2" id="forecastForm">
                            <div class="forecastHeader my-1">
                                <div class="btn-group" style="width: 45%;">
                                    <a href="#" class="btn btn-sm btn-outline-primary active">Расход</a>
                                    <a href="#" class="btn btn-sm btn-outline-primary">Доход</a>
                                </div>
                                <div class="fst-italic" style="display: inline-block; width: 52%; text-align: end;">
                                    Прогноз баланса
                                </div>
                            </div>
                            <div class="forecast-progress">
                                <div class="mounth my-1">
                                    <div class="progress"> -->
                                        <!-- Вычисление процентов:
                                        2ой процент(серое значение) вычисляемый из средн.знач.в месяц/прогноз баланса*100
                                        1ый процент(цветное значение) вычисляется из ("потраченных/заработанных" средств/сред.знач.в месяц*100)*2ой процент/100
                                распределение процентов = от 2ого процента вычитаем 1ый -->
                                        <!-- <div class="progress-bar bg-warning" role="progressbar" style="width: 32.38%"
                                            aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div class="progress-bar bg-secondary" role="progressbar" style="width: 33.43%"
                                            aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span class="amount-type">
                                            <span class="amount">16&#160;420&#160;</span>
                                            <span class="total">
                                                из&#160;<span class="total_amount">33&#160;373</span>
                                            </span>
                                            <span class="desc">за&#160;месяц</span>
                                        </span>
                                        <span class="balance-completed">
                                            <span class="amount">50&#160;707&#160;</span> р.
                                        </span>
                                    </div> -->
                                    <!-- <div class="row">
                                        <div class="title col-7">
                                            <span class="amount">16&#160;420&#160;</span>за&#160;месяц
                                        </div>
                                        <div class="balance col">
                                            <span class="">50&#160;707&#160;р.</span>
                                        </div>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar bg-info row" role="progressbar" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> -->
                                    <!-- </div>
                                <div class="week my-1">
                                    <div class="progress">
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 3%"
                                            aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div class="progress-bar bg-secondary" role="progressbar" style="width: 15.2%"
                                            aria-valuenow="15.2" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span class="amount-type">
                                            <span class="amount">1&#160;420&#160;</span>
                                            <span class="total">
                                                из&#160;<span class="total_amount">8&#160;055</span>
                                            </span>
                                            <span class="desc">за&#160;неделю</span>
                                        </span>
                                        <span class="balance-completed">
                                            <span class="amount">44&#160;180&#160;</span> р.
                                        </span>
                                    </div>
                                </div>
                                <div class="day my-1">
                                    <div class="progress">
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 0%"
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div class="progress-bar bg-secondary" role="progressbar" style="width: 4.2%"
                                            aria-valuenow="4.2" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span class="amount-type">
                                            <span class="amount">0&#160;</span>
                                            <span class="total">
                                                из&#160;<span class="total_amount">800</span>
                                            </span>
                                            <span class="desc">за&#160;день</span>
                                        </span>
                                        <span class="balance-completed">
                                            <span class="amount">33&#160;737&#160;</span> р.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="periodForm row my-3 visually-hidden">
                            <div class="row fw-bold">За сегодня</div>
                            <div class="row">
                                <div class="col-7">
                                    Доход
                                </div>
                                <div class="col-5">
                                    0&#160;руб.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    Расход
                                </div>
                                <div class="col-5">
                                    0&#160;руб.
                                </div>
                            </div>
                        </div>
                        <div class="currentAccountDetails row my-4">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td width="49%">
                                            <span class="income" style="float:right">54&thinsp;500</span>
                                            <span>Доход&nbsp;</span>
                                        </td>
                                        <td width="2%"><span>&nbsp;|&nbsp;</span></td>
                                        <td width="49%">
                                            <span style="float:right">&nbsp;Расход</span>
                                            <span class="outcome">32&thinsp;173</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div> --> */}
                    </div>
                </div>
            </div>
            <ModalWindowContainer />
        </div>
    );
}

export default TransactionPage;
