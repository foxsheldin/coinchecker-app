import { ArcElement, Chart, DoughnutController, Legend, Title, Tooltip } from 'chart.js'
import React, { useEffect } from 'react'
import CashFlow from './CashFlow'
import { getCashFlowForDoughnut } from '../../../redux/transaction-reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withUserID } from '../../../hoc/withUserID'

const CashFlowContainer = (props) => {
    Chart.register(ArcElement, DoughnutController, Legend, Tooltip, Title)

    useEffect(() => {
        props.getCashFlowForDoughnut(props.userid)
    }, [])

    const dataChart = {
        labels: ["Доход", "Расход"],
        datasets: [{
            data: [props.dataCashFlow.income??0, props.dataCashFlow.outcome??0],
            backgroundColor: ['#198754','#dc3545'],
            borderAlign: 'inner',
        }]
    }
    const optionsChart = {
        plugins: {
            title: {
                display: true,
                text: 'Движение денег (в руб.)'
            }
        }
    }

    return <CashFlow dataChart={dataChart} optionsChart={optionsChart}/>
}

const mapStateToProps = (state) => {
    return {
        dataCashFlow: state.transactionPage.dataCashFlow,
    }
}

export default compose(
    connect(mapStateToProps, { getCashFlowForDoughnut }),
    withUserID
)(CashFlowContainer)