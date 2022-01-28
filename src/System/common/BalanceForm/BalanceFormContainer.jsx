import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { withUserID } from '../../../hoc/withUserID';
import { getAccounts } from '../../../redux/account-reducer';
import PreLoader from '../PreLoader/PreLoader';
import BalanceForm from './BalanceForm';

class BalanceFormContainer extends React.Component {
    componentDidMount() {
        this.props.getAccounts(this.props.userid);
    }

    render() {
        return <>
            {this.props.isFetching ? <PreLoader /> : 
            <BalanceForm {...this.props}/>}
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accountsInfo,
    }
}

export default compose(
    connect(mapStateToProps, { getAccounts }),
    withAuthRedirect,
    withUserID
)(BalanceFormContainer);
