import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import BalanceFormContainer from '../common/BalanceForm/BalanceFormContainer';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BalanceChart = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels:
                ["23 Nov '21", "25 Nov '21", "26 Nov '21", "27 Nov '21", "28 Nov '21", "29 Nov '21", "30 Nov '21", "01 Dec '21", "02 Dec '21", "03 Dec '21", "04 Dec '21", "05 Dec '21", "06 Dec '21", "07 Dec '21", "08 Dec '21", "09 Dec '21", "10 Dec '21", "11 Dec '21", "12 Dec '21", "13 Dec '21", "14 Dec '21", "15 Dec '21", "16 Dec '21", "17 Dec '21", "18 Dec '21", "19 Dec '21", "20 Dec '21", "21 Dec '21", "22 Dec '21", "23 Dec '21", "24 Dec '21"],
            datasets: [{
                label: 'Фактический',
                data:
                    [1412001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001],
                backgroundColor: 'blue',
                borderColor: 'lightblue',
                borderWidth: 3,
            }]
        }); 
    }

    useEffect(() => {
        chart()
    },[])

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
}


export const balanceChartData = {
    labels:
        ["23 Nov '21", "25 Nov '21", "26 Nov '21", "27 Nov '21", "28 Nov '21", "29 Nov '21", "30 Nov '21", "01 Dec '21", "02 Dec '21", "03 Dec '21", "04 Dec '21", "05 Dec '21", "06 Dec '21", "07 Dec '21", "08 Dec '21", "09 Dec '21", "10 Dec '21", "11 Dec '21", "12 Dec '21", "13 Dec '21", "14 Dec '21", "15 Dec '21", "16 Dec '21", "17 Dec '21", "18 Dec '21", "19 Dec '21", "20 Dec '21", "21 Dec '21", "22 Dec '21", "23 Dec '21", "24 Dec '21"],
    datasets: [{
        label: 'Фактический',
        data:
            [1412001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001],
        backgroundColor: 'blue',
        borderColor: 'lightblue',
        borderWidth: 3,
    }]
}

export const balanceChartOptions = {
    scales: {
        y: {
            beginAtZero: false
        }
    }
}

// const balanceChartForm = () => {
//     let ctx = document.getElementById('balanceChart').getContext('2d');
//     let balanceChart = new ChartJS(ctx, {
//         type: 'line',
//         data: {
//             labels: /* Utils.days({count:60}), */
//                 [
//                     "23 Nov '21", "25 Nov '21", "26 Nov '21", "27 Nov '21", "28 Nov '21", "29 Nov '21", "30 Nov '21", "01 Dec '21", "02 Dec '21", "03 Dec '21", "04 Dec '21", "05 Dec '21", "06 Dec '21", "07 Dec '21", "08 Dec '21", "09 Dec '21", "10 Dec '21", "11 Dec '21", "12 Dec '21", "13 Dec '21", "14 Dec '21", "15 Dec '21", "16 Dec '21", "17 Dec '21", "18 Dec '21", "19 Dec '21", "20 Dec '21", "21 Dec '21", "22 Dec '21", "23 Dec '21", "24 Dec '21"],
//             datasets: [{
//                 label: 'Фактический',
//                 data:
//                     [
//                         1412001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001, 1416001],
//                 backgroundColor: 'blue',
//                 borderColor: 'lightblue',
//                 borderWidth: 3,
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: false
//                 }
//             }
//         }
//     })
//     return balanceChart;
// }

// const incomeOutcomeChartForm = () => {
//     let gtx = document.getElementById('incomeOutcomeChart').getContext('2d');
//     let incomeOutcomeChart = new ChartJS(gtx, {
//         type: 'doughnut',
//         data: {
//             labels: /* Utils.days({count:60}), */
//                 ["Доход", "Расход"],
//             datasets: [{
//                 data:
//                     [0, 0],
//                 backgroundColor: ['#198754', '#dc3545'],
//                 borderAlign: 'inner',
//             }]
//         },
//         options: {
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Движение денег'
//                 }
//             }
//         }
//     })
//     return incomeOutcomeChart;
// }

const Browse = (props) => {
    return (
        <div className="container">
            <div className="actionBlock row my-2">
                <div className="col-2">
                    <a href="transaction.php" className="link">
                        Внести транзакции
                    </a>
                </div>
                <div className="col-3">
                    <a href="reminder.html?addReminder" className="link">
                        Добавить регулярный платеж(тест)
                    </a>
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
                                <a href="accounts.php" className="link">Добавить счет</a>
                            </div>
                        </div>
                        <div className="allBalance row">
                            <h3>1&nbsp;416&nbsp;001.00&nbsp;руб.</h3>
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
                        {/* <canvas id="balanceChart" style={{ display: 'block', boxSizing: 'border-box', height: '483px', width: '966px' }} width="1932" height="966"></canvas> */}
                        {/* <Line options={{balanceChartOptions}} data={{balanceChartData}} /> */}
                        {/* <BalanceChart /> */}
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
