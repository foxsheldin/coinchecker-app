import React from "react";

const AccountItem = (props) => {
  const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (
    props.AccountId === parseInt(props.currentAccountID) &&
    props.typeAccount === props.currentTypeAccount
  ) {
    return (
      <a
        href={"/system/transaction/1"}
        className="btn btn-sm btn-outline-primary active"
      >
        <div className="row">
          <div className="accountTitle col">{props.name}</div>
          <div className="amount col">
            {numberWithSpaces(props.amountMoney)}&nbsp;руб.
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <a
        href={
          "/system/transaction/filter/" +
          props.typeAccount +
          "/" +
          props.AccountId +
          "/1"
        }
        className="btn btn-sm btn-outline-primary"
      >
        <div className="row">
          <div className="accountTitle col">{props.name}</div>
          <div className="amount col">
            {numberWithSpaces(props.amountMoney)}&nbsp;руб.
          </div>
        </div>
      </a>
    );
  }
};

const BalanceForm = React.memo((props) => {
  const accountElements = (nameAccount) => {
    return nameAccount?.map((each) => (
      <AccountItem
        key={each.id}
        name={each.name}
        amountMoney={each.amountMoney}
        typeAccount={each.typeAccount}
        AccountId={each.id}
        currentTypeAccount={props.typeAccount}
        currentAccountID={props.accountID}
      />
    ));
  };

  return (
    <div className="balanceForm">
      {props.accounts?.cashData.length ? (
        <div className="cashMoney row my-2">
          <h5>Наличные</h5>
          {accountElements(props.accounts.cashData)}
        </div>
      ) : null}
      {props.accounts?.cardData.length ? (
        <div className="cardMoney row my-2">
          <h5>Карты</h5>
          {accountElements(props.accounts.cardData)}
        </div>
      ) : null}
      {props.accounts?.creditData.length ? (
        <div className="creditMoney row my-2">
          <h5>Кредиты</h5>
          {accountElements(props.accounts.creditData)}
        </div>
      ) : null}
      {props.accounts?.bankAccountData.length ? (
        <div className="bankAccountMoney row my-2">
          <h5>Банковские счёта</h5>
          {accountElements(props.accounts.bankAccountData)}
        </div>
      ) : null}
      {props.accounts?.depositData.length ? (
        <div className="depositMoney row my-2">
          <h5>Вклады</h5>
          {accountElements(props.accounts.depositData)}
        </div>
      ) : null}
      {/* <!-- <div className="incomeDebtors row">
                <h5>Мне должны</h5>
                <a href="#" className="btn btn-sm btn-outline-primary" style="float:left">
                    <div className="amount">2&#160;000&#160;000&#160;руб.</div>
                    <div className="accountTitle">Иван Иванович И.</div>
                </a>
                <a href="#" className="btn btn-sm btn-outline-primary" style="float:left">
                    <div className="amount">50&#160;000&#160;руб.</div>
                    <div className="accountTitle">Владимир Вадимович С.</div>
                </a>
            </div>
            <div className="outcomeDebtors row">
                <h5>Я должен</h5>
                <a href="#" className="btn btn-sm btn-outline-danger" style="float:left">
                    <div className="amount">-2&#160;000&#160;000&#160;руб.</div>
                    <div className="accountTitle">Иван Иванович И.</div>
                </a>
                <a href="#" className="btn btn-sm btn-outline-danger" style="float:left">
                    <div className="amount">-50&#160;000&#160;руб.</div>
                    <div className="accountTitle">Владимир Вадимович С.</div>
                </a>
            </div> --> */}
    </div>
  );
});

export default BalanceForm;
