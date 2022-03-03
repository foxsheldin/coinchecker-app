import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import EditAccount from './EditAccount'
import { getAccount } from '../../../redux/account-reducer';
import { compose } from 'redux';
import { withUserID } from '../../../hoc/withUserID';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';

const EditAccountContainer = (props) => {
    const {typeAccount, accountID} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        props.getAccount(typeAccount, accountID, props.userid)
    },[typeAccount, accountID]);

    const onSubmit = (formData) => {
        console.log(formData)
    }

    const onCancel = () => {
        navigate(-1, {replace: true});
    }

    return <EditAccount accountData={props.accountData} typeAccount={typeAccount}
        onSubmit={onSubmit} onCancel={onCancel}
    />
}

const mapStateToProps = (state) => {
    return {
        accountData: state.account.accountData
    }
}

export default compose(
    connect(mapStateToProps, { getAccount }),
    withUserID,
    withAuthRedirect
)
(EditAccountContainer)