import React from "react";
import AddBankAccount from "./AddBankAccount/AddBankAccount";
import AddCard from "./AddCard/AddCard";
import AddCash from "./AddCash/AddCash";
import AddCredit from "./AddCredit/AddCredit";
import AddDeposit from "./AddDeposit/AddDeposit";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

const ModalWindow = (props) => {
    return (
        <div>
            <AddCash {...props} />
            <AddCard {...props} />
            <AddCredit {...props} />
            <AddBankAccount {...props} />
            <AddDeposit {...props} />
            <DeleteAccount {...props} />
        </div>
    );
}

export default ModalWindow;