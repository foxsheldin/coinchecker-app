import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import { getTransactions } from '../../../redux/transaction-reducer';
import PreLoader from '../../common/PreLoader/PreLoader';
import TransactionsBlock from './TransactionsBlock';

class TransactionsBlockContainer extends React.Component {
    componentDidMount() {
        this.props.getTransactions(this.props.currentPage, this.props.pageSize, this.props.userid);
    }

    onPageChanged = (pageNumber) => {
        this.props.getTransactions(pageNumber, this.props.pageSize, this.props.userid)
    }

    render() {
        return <>
            {this.props.isFetching ? <PreLoader /> : 
            <TransactionsBlock
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                pageSize={this.props.pageSize}
                transactions={this.props.transactions}
                totalTransactionsCount={this.props.totalTransactionsCount}
            />}
            
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactionPage.transactions,
        pageSize: state.transactionPage.pageSize,
        totalTransactionsCount: state.transactionPage.totalTransactionsCount,
        currentPage: state.transactionPage.currentPage
    }
} 

export default compose(
    connect(mapStateToProps, { getTransactions }),
    withUserID
)(TransactionsBlockContainer)
