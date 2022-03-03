import React, { useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import ModalWindow from './ModalWindow'
import { addAccount } from '../../../redux/account-reducer';

const ModalWindowContainer = (props) => {
    const [initialValues] = useState({
        typeAccount: null,
        name: null,
        amountMoney: null,
        isArchive: 0,
        bankName: null,
        numCardAccount: null,
        addGracePeriod: false,
        dateBankStatement: null,
        creditLimit: null,
        dateOfReceipt: null,
        creditPeriod: null,
        interestRate: null,
        paymentsCreditCardID: null,
        addTransaction: false,
        openingDate: null,
        periodDeposit: null,
        capitalizationOfInterest: true,
    });

    const onSubmit = (formData) => {
        props.addAccount(formData, props.userid);
        window.location.reload();
    }
    
    return <ModalWindow onSubmit={onSubmit} initialValues={initialValues}/>
}

export default compose(
    connect(null, { addAccount }),
    withUserID,
)(ModalWindowContainer)