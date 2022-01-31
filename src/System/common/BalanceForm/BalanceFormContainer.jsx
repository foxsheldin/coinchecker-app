import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { withUserID } from '../../../hoc/withUserID';
import { getAccounts } from '../../../redux/account-reducer';
import PreLoader from '../PreLoader/PreLoader';
import BalanceForm from './BalanceForm';

const BalanceFormContainer = (props) => {
    useEffect(() => {
        props.getAccounts(props.userid);
    }, [])

    return <>
        {props.isFetching ? <PreLoader /> :
            <BalanceForm {...props} />}
    </>
};

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accountsInfo,
        isFetching: state.account.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { getAccounts }),
    withAuthRedirect,
    withUserID
)(BalanceFormContainer);
