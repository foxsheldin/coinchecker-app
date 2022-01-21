import React from 'react';
import { connect } from 'react-redux';
import { addAccount } from '../../../../redux/account-reducer';
import AddCash from './AddCash';

const mapStateToProps = (state) => {
    return {
        state: state.account.addCash,
    }
}

/* const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: (newAccount) => {
            const action = addAccount(newAccount);
            dispatch(action);
        }
    }
}
 */
const AddCashContainer = connect(mapStateToProps, 
    {addAccount})(AddCash);

export default AddCashContainer;
