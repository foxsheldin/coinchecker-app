import React from 'react'
import { Field, Form } from 'react-final-form'

const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const accountElements = (nameAccount) => {
    return nameAccount.map(each => (
        <option value={each.typeAccount + ", " + each.id}>{each.name} - {numberWithSpaces(each.amountMoney)}&nbsp;руб.</option>)
    )
}

const TransferForm = (props) => {
    return <Form onSubmit={props.onSubmit} initialValues={props.transaction} 
        accounts={props.accounts} onCancel={props.onCancel}>
        {props => (
            <form onSubmit={props.handleSubmit}>
                <div class="modal-body">
                    <label for="date">Дата транзакции</label>
                    <Field
                        className='form-control'
                        name="dateTransaction"
                        component="input"
                        type="date"
                        placeholder="Дата транзакции"
                    />
                    <label for="money">Сумма перевода</label>
                    <Field
                        className='form-control'
                        name="amountMoney"
                        component="input"
                        type="number"
                        placeholder="Сумма перевода"
                        min="0"
                        step="any"
                    />
                    <div className='formaddTransfer'>
                        <label for="firstAccountSelect">Со счета</label>
                        <Field
                        className="form-control my-2"
                        name="firstAccountSelect"
                        component="select">
                        {props.accounts.cashData.length ?
                            <optgroup label="Наличные">
                                {accountElements(props.accounts.cashData)}
                            </optgroup>
                            : null}
                        {props.accounts.cardData.length ?
                            <optgroup label="Карты">
                                {accountElements(props.accounts.cardData)}
                            </optgroup>
                            : null}
                        {props.accounts.creditData.length ?
                            <optgroup label="Кредиты">
                                {accountElements(props.accounts.creditData)}
                            </optgroup>
                            : null}
                        {props.accounts.bankAccountData.length ?
                            <optgroup label="Банковские счета">
                                {accountElements(props.accounts.bankAccountData)}
                            </optgroup>
                            : null}
                        {props.accounts.depositData.length ?
                            <optgroup label="Вклады">
                                {accountElements(props.accounts.depositData)}
                            </optgroup>
                            : null}
                    </Field>
                        <label for="secondAccountSelect">На счет</label>
                        <Field
                        className="form-control my-2"
                        name="secondAccountSelect"
                        component="select">
                        {props.accounts.cashData.length ?
                            <optgroup label="Наличные">
                                {accountElements(props.accounts.cashData)}
                            </optgroup>
                            : null}
                        {props.accounts.cardData.length ?
                            <optgroup label="Карты">
                                {accountElements(props.accounts.cardData)}
                            </optgroup>
                            : null}
                        {props.accounts.creditData.length ?
                            <optgroup label="Кредиты">
                                {accountElements(props.accounts.creditData)}
                            </optgroup>
                            : null}
                        {props.accounts.bankAccountData.length ?
                            <optgroup label="Банковские счета">
                                {accountElements(props.accounts.bankAccountData)}
                            </optgroup>
                            : null}
                        {props.accounts.depositData.length ?
                            <optgroup label="Вклады">
                                {accountElements(props.accounts.depositData)}
                            </optgroup>
                            : null}
                    </Field>
                        <label for="comment">Комментарий</label>
                        <Field
                            className='form-control my-2'
                            name="comment"
                            component="input"
                            type="text"
                            placeholder="Комментарий"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type='button' class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
                    <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
            </form>
        )}
    </Form>
}


const IncomeOutcomeForm = (props) => {
    const categoriesElement = props.categories.map(each => (
        <option value={each.id}>{each.nameCategory}</option>
    ));

    return <Form onSubmit={props.onSubmit} initialValues={props.transaction} 
        accounts={props.accounts} onCancel={props.onCancel}>
        {props => (
            <form onSubmit={props.handleSubmit}>
                <label for="date">Дата транзакции</label>
                <Field
                    className='form-control'
                    name="dateTransaction"
                    component="input"
                    type="date"
                    placeholder="Дата транзакции"
                />
                <label for="money">{props.initialValues.isIncome ? "Получено" : "Потрачено"}</label>
                <Field
                    className='form-control'
                    name="amountMoney"
                    component="input"
                    type="number"
                    placeholder="Сумма перевода"
                    min="0"
                    step="any"
                />
                <div class="formadd">
                    <label for="category">Категория</label>
                    <Field
                        className="form-control my-2"
                        name="categoryID"
                        component="select">
                        {categoriesElement}
                    </Field>
                    <label for="firstAccountSelect">Счет</label>
                    <Field
                        className="form-control my-2"
                        name="firstAccountSelect"
                        component="select">
                        {props.accounts.cashData.length ?
                            <optgroup label="Наличные">
                                {accountElements(props.accounts.cashData)}
                            </optgroup>
                            : null}
                        {props.accounts.cardData.length ?
                            <optgroup label="Карты">
                                {accountElements(props.accounts.cardData)}
                            </optgroup>
                            : null}
                        {props.accounts.creditData.length ?
                            <optgroup label="Кредиты">
                                {accountElements(props.accounts.creditData)}
                            </optgroup>
                            : null}
                        {props.accounts.bankAccountData.length ?
                            <optgroup label="Банковские счета">
                                {accountElements(props.accounts.bankAccountData)}
                            </optgroup>
                            : null}
                        {props.accounts.depositData.length ?
                            <optgroup label="Вклады">
                                {accountElements(props.accounts.depositData)}
                            </optgroup>
                            : null}
                    </Field>
                    <label for="payer">Плательщик</label>
                    <Field
                        className='form-control my-2'
                        name="payer"
                        component="input"
                        type="text"
                        placeholder="Плательщик"
                    />
                    <label for="comment">Комментарий</label>
                    <Field
                        className='form-control my-2'
                        name="comment"
                        component="input"
                        type="text"
                        placeholder="Комментарий"
                    />
                </div>
                <div class="modal-footer">
                    <button type='button' class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
                    <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
            </form>
        )}
    </Form>
}

const EditTransaction = (props) => {
    return (
        <div class="container">
            <div class="modal-header">
                <h5 class="modal-title" id="addIncomeLabel">Изменение транзакции</h5>
                <a class="btn-close" onClick={props.onCancel}></a>
            </div>
            {props.transaction.isTransfer ?
                <TransferForm {...props} onSubmit={props.onSubmit} onCancel={props.onCancel}/> :
                <IncomeOutcomeForm {...props} onSubmit={props.onSubmit} onCancel={props.onCancel}/>}
        </div>
    );
}

export default EditTransaction
