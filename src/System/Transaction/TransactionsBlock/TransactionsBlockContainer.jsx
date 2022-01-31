import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import { getTransactions } from '../../../redux/transaction-reducer';
import PreLoader from '../../common/PreLoader/PreLoader';
import TransactionsBlock from './TransactionsBlock';

const TransactionsBlockContainer = (props) => {
    let [currentPage, setCurrentPage] = useState(1);
    let [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        props.getTransactions(currentPage, pageSize, props.userid);
    }, []);

    useEffect(() => {
        setCurrentPage(props.currentPage);
    }, [props.currentPage]);

    useEffect(() => {
        setPageSize(props.pageSize);
    }, [props.pageSize]);

    const onPageChanged = (pageNumber) => {
        props.getTransactions(pageNumber, props.pageSize, props.userid)
    }

    console.log(props);
    return <>
        {!props.transactions ? <PreLoader /> :
            <TransactionsBlock
                currentPage={props.currentPage}
                onPageChanged={onPageChanged}
                pageSize={props.pageSize}
                transactions={props.transactions}
                totalTransactionsCount={props.totalTransactionsCount}
            />}

    </>
};

const mapStateToProps = (state) => {
    return {
        transactions: state.transactionPage.transactions,
        pageSize: state.transactionPage.pageSize,
        totalTransactionsCount: state.transactionPage.totalTransactionsCount,
        currentPage: state.transactionPage.currentPage,
        isFetching: state.transactionPage.isFetching
    }
}

export default compose(
    connect(mapStateToProps, { getTransactions }),
    withUserID
)(TransactionsBlockContainer)
