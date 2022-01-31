import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getEditTransaction, updateEditTransaction, getTransactions } from '../../../redux/transaction-reducer';
import { getAccounts, getAllMoney } from '../../../redux/account-reducer';
import PreLoader from '../../common/PreLoader/PreLoader';
import { withTransactionID } from '../../../hoc/withTransactionID';
import EditTransaction from './EditTransaction';
import { withUserID } from '../../../hoc/withUserID';
import { useNavigate } from 'react-router-dom'


const EditTransactionContainer = (props) => {
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        await props.updateEditTransaction(formData);
        await props.getTransactions(props.userid);
        await props.getAccounts(props.userid);
        await props.getAllMoney(props.userid);
        await navigate("../../transaction", {replace: true});
    }

    let [transaction, setTransaction] = useState({});
    
    useEffect(()=>{
        props.getEditTransaction(props.transactionid, props.userid);
        props.getAccounts(props.userid);
    }, []);

    useEffect(()=>{
        setTransaction(props.editTransaction)
    }, [props.editTransaction]);

    return (
        <>
            {props.isFetching ? <PreLoader /> : null}
            <EditTransaction 
                transaction={transaction} 
                categories={props.categories}
                accounts={props.accounts}
                onSubmit={onSubmit}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accountsInfo,
        editTransaction: state.transactionPage.editTransaction,
        categories: state.transactionPage.categories
    }
}

export default compose(
    connect(mapStateToProps, 
        { getEditTransaction, getAccounts, getAllMoney,
            updateEditTransaction, getTransactions }),
    withUserID,
    withTransactionID,
)(EditTransactionContainer)