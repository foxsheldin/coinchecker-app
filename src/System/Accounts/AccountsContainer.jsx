import React from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../../redux/account-reducer';
import PreLoader from '../common/PreLoader/PreLoader';
import Accounts from './Accounts';

class AccountsContainer extends React.Component {
    componentDidMount() {
        this.props.getAccounts();
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

export default connect(mapStateToProps, { getAccounts })(AccountsContainer);
