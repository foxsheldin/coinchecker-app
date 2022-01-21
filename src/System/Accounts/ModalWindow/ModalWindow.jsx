import React from "react";
import AddBankAccount from "./AddBankAccount/AddBankAccount";
import AddCard from "./AddCard/AddCard";
import AddCashContainer from "./AddCash/AddCashContainer";
import AddCredit from "./AddCredit/AddCredit";
import AddDeposit from "./AddDeposit/AddDeposit";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const ModalWindow = () => {
    return (
        <div>
            <AddCashContainer />
            <AddCard />
            <AddCredit />
            <AddBankAccount />
            <AddDeposit />
            <DeleteAccount />
        </div>
    );
}

export default ModalWindow;