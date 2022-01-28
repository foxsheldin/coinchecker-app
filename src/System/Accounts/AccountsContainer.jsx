import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAccounts } from '../../redux/account-reducer';
import { withUserID } from '../../hoc/withUserID'
import PreLoader from '../common/PreLoader/PreLoader';
import Accounts from './Accounts';

class AccountsContainer extends React.Component {
    componentDidMount() {
        this.props.getAccounts(this.props.userid);
    }

    render() {
        return <>
            {this.props.isFetching ? <PreLoader /> : 
            <Accounts {...this.props}/>}
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accountsInfo
    }
}

export default compose(
    connect(mapStateToProps, { getAccounts }),
    withUserID
)(AccountsContainer);
