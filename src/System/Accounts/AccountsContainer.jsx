import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getAccounts, deleteAccount } from "../../redux/account-reducer";
import { withUserID } from "../../hoc/withUserID";
import PreLoader from "../common/PreLoader/PreLoader";
import Accounts from "./Accounts";

const AccountsContainer = (props) => {
  useEffect(() => {
    props.getAccounts(props.userid);
  }, []);

  const deleteBtnOnClick = (typeAccount, accountID) => {
    const conf = window.confirm(
      "При удалении счета будут удалены фактические и планируемые транзакции по этому счету.\n\nЧтобы сохранить транзакции, но 'спрятать' счет, измените статус счета на 'Закрытый'.\n\nУдалить счет вместе с транзакциями?"
    );

    if (conf) {
      props.deleteAccount(typeAccount, accountID, props.userid);
      window.location.reload();
    }
  };

  return (
    <>
      {props.isFetching ? (
        <PreLoader />
      ) : (
        <Accounts {...props} deleteBtnOnClick={deleteBtnOnClick} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.account.accountsInfo,
  };
};

export default compose(
  connect(mapStateToProps, { getAccounts, deleteAccount }),
  withUserID
)(AccountsContainer);
