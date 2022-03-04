import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import BalanceChart from './BalanceChart'
import { getBalanceForChart } from '../../../redux/account-reducer';

const getDaysArray = (start, end) => {
    let arr = [];
    for(let dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).toLocaleDateString());
    }
    return arr;
};

const BalanceChartContainer = (props) => {
    useEffect(() => {
        props.getBalanceForChart();
    },[]);
    
    const today = new Date();
    const dateArray = getDaysArray(new Date().setDate(today.getDate() - 30), today);

    const dataChart = {
        labels:
            dateArray,
        datasets: [{
            label: 'Фактический',
            data: props.balanceForChart??[0],
            backgroundColor: 'blue',
            borderColor: 'lightblue',
            borderWidth: 3,
        }]
    }
    
    return <BalanceChart dataChart={dataChart}/>
}

const mapStateToProps = (state) => {
    return {
        balanceForChart: state.account.balanceForChart,
    }
}

export default compose(
    connect(mapStateToProps, { getBalanceForChart }),
    withUserID
)(BalanceChartContainer)