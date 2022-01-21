import React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../../redux/transaction-reducer';
import PreLoader from '../../common/PreLoader/PreLoader';
import TransactionsBlock from './TransactionsBlock';

class TransactionsBlockContainer extends React.Component {
    componentDidMount() {
        this.props.getTransactions(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getTransactions(pageNumber, this.props.pageSize)
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

export default connect(mapStateToProps, { getTransactions })(TransactionsBlockContainer)
