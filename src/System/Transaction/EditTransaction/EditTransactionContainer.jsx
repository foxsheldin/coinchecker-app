import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getEditTransaction } from '../../../redux/transaction-reducer'
import PreLoader from '../../common/PreLoader/PreLoader';
import { withTransactionID } from '../../../hoc/withTransactionID';
import EditTransaction from './EditTransaction'
import { withUserID } from '../../../hoc/withUserID';

class EditTransactionContainer extends Component {
    componentDidMount() {
        this.props.getEditTransaction(this.props.transactionid, this.props.userid)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <PreLoader /> : null}
                <EditTransaction transaction={this.props.editTransaction} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editTransaction: state.transactionPage.editTransaction
    }
}

export default compose(
    connect(mapStateToProps, { getEditTransaction }),
    withUserID,
    withTransactionID,
)(EditTransactionContainer)