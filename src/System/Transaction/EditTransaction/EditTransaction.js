import React from 'react'
import { Field, Form } from 'react-final-form'
import { Link } from 'react-router-dom'

const TransferForm = (props) => {
    return <Form onSubmit={props.onSubmit} initialValues={props.transaction}>
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
                        <label for="firstAccount">Со счета</label>
                        <select class="form-control my-2" name="firstAccount" id="account">
                            <optgroup label="Наличные">
                                <option value="1, 1" selected="selected">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
                                <option value="1, 2">Наличный счёт 2&nbsp;-&nbsp;300&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Карты">
                                <option value="2, 1">Карта 1&nbsp;-&nbsp;15&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Кредиты">
                                <option value="3, 1">Кредит&nbsp;-&nbsp;1.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Банковские счета">
                                <option value="4, 1">Банковский счёт&nbsp;-&nbsp;1&nbsp;000&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Вклады">
                                <option value="5, 1">Вклад 1&nbsp;-&nbsp;100&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                        </select>
                        <label for="secondAccount">На счет</label>
                        <select class="form-control my-2" name="secondAccount" id="account">
                            <optgroup label="Наличные">
                                <option value="1, 1">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
                                <option value="1, 2" selected="selected">Наличный счёт 2&nbsp;-&nbsp;300&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Карты">
                                <option value="2, 1">Карта 1&nbsp;-&nbsp;15&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Кредиты">
                                <option value="3, 1">Кредит&nbsp;-&nbsp;1.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Банковские счета">
                                <option value="4, 1">Банковский счёт&nbsp;-&nbsp;1&nbsp;000&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                            <optgroup label="Вклады">
                                <option value="5, 1">Вклад 1&nbsp;-&nbsp;100&nbsp;000.00&nbsp;руб.</option>
                            </optgroup>
                        </select>
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
                    <Link to={"/system/transaction"} class="btn btn-secondary" >Отменить</Link>
                    <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
            </form>
        )}
    </Form>
}

const IncomeOutcomeForm = (props) => {
    return <Form onSubmit={props.onSubmit} initialValues={props.transaction}>
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
                <label for="money">{props.initialValues.isIncome === "1" ? "Получено" : "Потрачено"}</label>
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
                    <select class="form-control my-2" name="category" id="category">
                        <option value="1">Без категории</option>
                        <option value="4" selected="selected">Зарплата</option>
                        <option value="7">Корректировка</option>
                        <option value="12">Подарки</option>
                    </select>
                    <label for="account">Счет</label>
                    <select class="form-control my-2" name="account" id="account">
                        <optgroup label="Наличные">
                            <option value="1, 1" selected="selected">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
                            <option value="1, 2">Наличный счёт 2&nbsp;-&nbsp;300&nbsp;000.00&nbsp;руб.</option>
                        </optgroup>
                        <optgroup label="Карты">
                            <option value="2, 1">Карта 1&nbsp;-&nbsp;15&nbsp;000.00&nbsp;руб.</option>
                        </optgroup>
                        <optgroup label="Кредиты">
                            <option value="3, 1">Кредит&nbsp;-&nbsp;1.00&nbsp;руб.</option>
                        </optgroup>
                        <optgroup label="Банковские счета">
                            <option value="4, 1">Банковский счёт&nbsp;-&nbsp;1&nbsp;000&nbsp;000.00&nbsp;руб.</option>
                        </optgroup>
                        <optgroup label="Вклады">
                            <option value="5, 1">Вклад 1&nbsp;-&nbsp;100&nbsp;000.00&nbsp;руб.</option>
                        </optgroup>
                    </select>
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
                    <Link to={"/system/transaction"} class="btn btn-secondary" >Отменить</Link>
                    <button type="submit" class="btn btn-primary">Изменить</button>
                </div>
            </form>
        )}
    </Form>
}

const EditTransaction = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div class="container">
            <div class="modal-header">
                <h5 class="modal-title" id="addIncomeLabel">Изменение транзакции</h5>
                <Link to={"/system/transaction"} class="btn-close"></Link>
            </div>
            {props.transaction.isTransfer === "1" ?
                <TransferForm {...props} onSubmit={onSubmit} /> :
                <IncomeOutcomeForm {...props} onSubmit={onSubmit} />}
        </div>
    );
}

export default EditTransaction
