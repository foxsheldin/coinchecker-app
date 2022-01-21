import accountReducer from "./account-reducer";
import transactionReducer from "./transaction-reducer";

let store = {
    _state: {
        transactionPage: {
            transactions: [
                {
                    id: 1, date: "05 Oct 2021", category: "Зарплата", payer: "МГУ им. Н.П. Огарева",
                    comment: "Пополнение счета1", amountMoney: "4 000.00 руб.", colorBalance: "green", newAccount: "Наличный счёт 1"
                },
                {
                    id: 2, date: "05 Oct 2021", category: "Зарплата", payer: "МГУ им. Н.П. Огарева",
                    comment: "Пополнение счета2", amountMoney: "4 000.00 руб.", colorBalance: "green", newAccount: "Наличный счёт 1"
                },
                {
                    id: 3, date: "05 Oct 2021", category: "Категория", payer: "МГУ им. Н.П. Огарева",
                    comment: "Пополнение счета3", amountMoney: "5 000.00 руб.", colorBalance: "red", newAccount: "Наличный счёт 1"
                },
                {
                    id: 4, date: "05 Oct 2021", category: "Зарплата", payer: "МГУ им. Н.П. Огарева",
                    comment: "Пополнение счета4", amountMoney: "4 000.00 руб.", colorBalance: "green", newAccount: "Наличный счёт 1"
                },
                {
                    id: 5, date: "05 Oct 2021", category: "Категория", payer: "МГУ им. Н.П. Огарева",
                    comment: "Пополнение счета5", amountMoney: "5 000.00 руб.", colorBalance: "red", newAccount: "Наличный счёт 1"
                },
            ],
        },   
        account: {
            accountsInfo: {
                cashData: [
                    {
                        accountTitle: 'Наличный счёт 1', amountMoney: '1 000.00 руб.',
                        typeAccount: 'cash', AccountId: '1'
                    },
                    {
                        accountTitle: 'Наличный счёт 2', amountMoney: '300 000.00 руб.',
                        typeAccount: 'cash', AccountId: '2'
                    },
                ],
                cardData: [
                    {
                        accountTitle: 'Карта 1', amountMoney: '15 000.00 руб.',
                        typeAccount: 'card', AccountId: '1'
                    },
                ],
                creditData: [
                    {
                        accountTitle: 'Кредит', amountMoney: '1.00 руб.',
                        typeAccount: 'credit', AccountId: '1'
                    },
                ],
                bankAccountData: [
                    {
                        accountTitle: 'Банковский счёт', amountMoney: '1 000 000.00 руб.',
                        typeAccount: 'bankAccount', AccountId: '1'
                    },
                ],
                depositData: [
                    {
                        accountTitle: 'Вклад 1', amountMoney: '100 000.00 руб.',
                        typeAccount: 'deposit', AccountId: '1'
                    },
                ],
            },
            addCash: {
                 newName: "",
                 newAmountMoney: "",
            }
        }
    },
    _callSubscriber () {
        console.log("State changed");
    },

    subscribe (observer) {
        this._callSubscriber = observer;
    },
    getState () {
        return this._state;
    },

    dispatch(action) {
        this._state.transactionPage = transactionReducer(this._state.transactionPage, action);
        this._state.account = accountReducer(this._state.account, action);
        this._callSubscriber(this._state);
    }
}




export default store;