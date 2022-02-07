import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import { getAllMoney } from '../../../redux/account-reducer';

const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const AllMoneyComponent = React.memo((props) => {
    let [allMoney, setAllmoney] = useState(0);
    
    useEffect(()=>{
        props.getAllMoney(props.userid)
    },[])

    useEffect(()=>{
        setAllmoney(props.allMoney)
    }, [props.allMoney]);

    return <>
        {numberWithSpaces(allMoney)}&nbsp;руб.
    </>;
});

const mapStateToProps = (state) => {
    return {
        allMoney: state.account.allMoney
    }
}

export default compose(
    connect(mapStateToProps, {getAllMoney}),
    withUserID
)(AllMoneyComponent);
