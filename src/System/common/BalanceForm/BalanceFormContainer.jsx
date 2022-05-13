import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { withUserID } from "../../../hoc/withUserID";
import { getAccounts } from "../../../redux/account-reducer";
import PreLoader from "../PreLoader/PreLoader";
import BalanceForm from "./BalanceForm";

const BalanceFormContainer = (props) => {
  const { typeAccount, accountID } = useParams();
  useEffect(() => {
    props.getAccounts(props.userid);
  }, []);

  return (
    <>
      {props.isFetching ? (
        <PreLoader />
      ) : (
        <BalanceForm
          {...props}
          typeAccount={typeAccount}
          accountID={accountID}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.account.accountsInfo,
    isFetching: state.account.isFetching,
  };
};

export default compose(
  connect(mapStateToProps, { getAccounts }),
  withAuthRedirect,
  withUserID
)(BalanceFormContainer);
