import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import AllMoneyComponent from "../common/AllMoney/AllMoneyComponent";
import BalanceFormContainer from "../common/BalanceForm/BalanceFormContainer";
import ModalWindowContainer from "./ModalWindow/ModalWindowContainer";
import TransactionsBlockContainer from "./TransactionsBlock/TransactionsBlockContainer";

const TransactionPage = (props) => {
  return (
    <div>
      <div className="container">
        <div className="headerBlock row my-2">
          <h2>Наличные транзакции</h2>
        </div>
        <div className="row">
          {/* <!--Transaction block--> */}
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="transactionForm row border border-primary p-2">
              <div className="col">
                Добавить{" "}
                <a
                  className="link"
                  data-bs-toggle="modal"
                  data-bs-target="#addTransaction"
                >
                  одну транзакцию
                </a>
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

          <div className="col-lg-4 order-1 order-lg-2">
            <div className="accountForm row my-2 p-3">
              <div className="allMoney border-start border-end">
                <div className="text mx-2">Всего средств</div>
                <div className="money mx-2">
                  <h4>
                    <AllMoneyComponent />
                  </h4>
                </div>
              </div>
            </div>
            <BalanceFormContainer />

            {/* <!-- <div className="row my-2" id="forecastForm">
                            <div className="forecastHeader my-1">
                                <div className="btn-group" style="width: 45%;">
                                    <a href="#" className="btn btn-sm btn-outline-primary active">Расход</a>
                                    <a href="#" className="btn btn-sm btn-outline-primary">Доход</a>
                                </div>
                                <div className="fst-italic" style="display: inline-block; width: 52%; text-align: end;">
                                    Прогноз баланса
                                </div>
                            </div>
                            <div className="forecast-progress">
                                <div className="mounth my-1">
                                    <div className="progress"> -->
                                        <!-- Вычисление процентов:
                                        2ой процент(серое значение) вычисляемый из средн.знач.в месяц/прогноз баланса*100
                                        1ый процент(цветное значение) вычисляется из ("потраченных/заработанных" средств/сред.знач.в месяц*100)*2ой процент/100
                                распределение процентов = от 2ого процента вычитаем 1ый -->
                                        <!-- <div className="progress-bar bg-warning" role="progressbar" style="width: 32.38%"
                                            aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar bg-secondary" role="progressbar" style="width: 33.43%"
                                            aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span className="amount-type">
                                            <span className="amount">16&#160;420&#160;</span>
                                            <span className="total">
                                                из&#160;<span className="total_amount">33&#160;373</span>
                                            </span>
                                            <span className="desc">за&#160;месяц</span>
                                        </span>
                                        <span className="balance-completed">
                                            <span className="amount">50&#160;707&#160;</span> р.
                                        </span>
                                    </div> -->
                                    <!-- <div className="row">
                                        <div className="title col-7">
                                            <span className="amount">16&#160;420&#160;</span>за&#160;месяц
                                        </div>
                                        <div className="balance col">
                                            <span className="">50&#160;707&#160;р.</span>
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar bg-info row" role="progressbar" style="width: 20%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div> -->
                                    <!-- </div>
                                <div className="week my-1">
                                    <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style="width: 3%"
                                            aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar bg-secondary" role="progressbar" style="width: 15.2%"
                                            aria-valuenow="15.2" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span className="amount-type">
                                            <span className="amount">1&#160;420&#160;</span>
                                            <span className="total">
                                                из&#160;<span className="total_amount">8&#160;055</span>
                                            </span>
                                            <span className="desc">за&#160;неделю</span>
                                        </span>
                                        <span className="balance-completed">
                                            <span className="amount">44&#160;180&#160;</span> р.
                                        </span>
                                    </div>
                                </div>
                                <div className="day my-1">
                                    <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style="width: 0%"
                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar bg-secondary" role="progressbar" style="width: 4.2%"
                                            aria-valuenow="4.2" aria-valuemin="0" aria-valuemax="100"></div>
                                        <span className="amount-type">
                                            <span className="amount">0&#160;</span>
                                            <span className="total">
                                                из&#160;<span className="total_amount">800</span>
                                            </span>
                                            <span className="desc">за&#160;день</span>
                                        </span>
                                        <span className="balance-completed">
                                            <span className="amount">33&#160;737&#160;</span> р.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="periodForm row my-3 visually-hidden">
                            <div className="row fw-bold">За сегодня</div>
                            <div className="row">
                                <div className="col-7">
                                    Доход
                                </div>
                                <div className="col-5">
                                    0&#160;руб.
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-7">
                                    Расход
                                </div>
                                <div className="col-5">
                                    0&#160;руб.
                                </div>
                            </div>
                        </div>
                        <div className="currentAccountDetails row my-4">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td width="49%">
                                            <span className="income" style="float:right">54&thinsp;500</span>
                                            <span>Доход&nbsp;</span>
                                        </td>
                                        <td width="2%"><span>&nbsp;|&nbsp;</span></td>
                                        <td width="49%">
                                            <span style="float:right">&nbsp;Расход</span>
                                            <span className="outcome">32&thinsp;173</span>
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
};

export default TransactionPage;
