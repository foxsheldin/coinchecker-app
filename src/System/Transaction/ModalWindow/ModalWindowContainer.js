import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withUserID } from '../../../hoc/withUserID'
import ModalWindow from './ModalWindow'
import { getAccounts } from '../../../redux/account-reducer'
import { getCategories } from '../../../redux/transaction-reducer'

const ModalWindowContainer = (props) => {
    useEffect(() => {
        props.getCategories();
        props.getAccounts();
    }, [])

    const handleSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <ModalWindow accounts={props.accounts} categories={props.categories}
            handleSubmit={handleSubmit}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        accounts: state.account.accountsInfo,
        categories: state.transactionPage.categories,
    }
}

export default compose(
    connect(mapStateToProps, {getAccounts, getCategories}),
    withUserID
)(ModalWindowContainer)