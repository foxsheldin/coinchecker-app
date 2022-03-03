import React from 'react'
import { Field, Form } from 'react-final-form'

const EditCash = (props) => {
    return <>
        <div class="modal-header">
            <h5 class="modal-title" id="addCashLabel">Изменение наличного счета</h5>
            <button type="button" class="btn-close" aria-label="Close" onClick={props.onCancel}></button>
        </div>
        <div class="modal-body">
            <label for="name">Название счета</label>
            <Field
                component='input'
                type='text'
                name='name'
                className='form-control'
                required='required'
            />
            <label for="amountMoney">Начальный остаток</label>
            <Field
                component='input'
                type='number'
                name='amountMoney'
                step='any'
                className='form-control'
                required='required'
            />
            <label for="isArchive">Статус счета</label>
            <Field
                component='select'
                name='isArchive'
                className='form-control'
            >
                <option value='0'>Активный</option>
                <option value='1'>Закрытый</option>
            </Field>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
            <button type="submit" class="btn btn-primary">Изменить</button>
        </div>
    </>
}

const EditCard = (props) => {
    return <>
        <div class="modal-header">
            <h5 class="modal-title" id="addCardLabel">Изменение карты</h5>
            <button type="button" class="btn-close" aria-label="Close" onClick={props.onCancel}></button>
        </div>
        <div class="modal-body">
            <label for="name">Название счета</label>
            <Field
                component='input'
                type='text'
                name='name'
                className='form-control'
                required='required'
            />
            <label for="isArchive">Статус счета</label>
            <Field
                component='select'
                name='isArchive'
                className='form-control'
            >
                <option value='0'>Активный</option>
                <option value='1'>Закрытый</option>
            </Field>
            <hr />
            <label for="bankName">Банк</label>
            <Field
                component='input'
                type='text'
                name='bankName'
                className='form-control'
            />
            <label for="numCardAccount">Номер счета/карты</label>
            <Field
                component='input'
                type='text'
                name='numCardAccount'
                className='form-control'
            />
            <hr />
            <label for="creditLimit">Кредитный лимит</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='creditLimit'
                className='form-control'
                required='required'
            />
            <label for="amountMoney">Начальный остаток</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='amountMoney'
                className='form-control'
                required='required'
            />
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
            <button type="submit" class="btn btn-primary">Изменить</button>
        </div>
    </>
}

const EditCreditCard = (props) => {
    return <>
        <div class="modal-header">
            <h5 class="modal-title" id="addCreditLabel">Изменение кредита</h5>
            <button type="button" class="btn-close" aria-label="Close" onClick={props.onCancel}></button>
        </div>
        <div class="modal-body">
            <label for="name">Название счета</label>
            <Field
                component='input'
                type='text'
                name='name'
                className='form-control'
                required='required'
            />
            <label for="isArchive">Статус счета</label>
            <Field
                component='select'
                name='isArchive'
                className='form-control'
            >
                <option value='0'>Активный</option>
                <option value='1'>Закрытый</option>
            </Field>
            <hr />
            <label for="bankName">Банк</label>
            <Field
                component='input'
                type='text'
                name='bankName'
                className='form-control'
            />
            <label for="numCreditAccount">Номер счета/карты</label>
            <Field
                component='input'
                type='text'
                name='numCreditAccount'
                className='form-control'
            />
            <hr />
            <label for="dateOfReceipt">Дата получения</label>
            <Field
                component='input'
                type='date'
                name='dateOfReceipt'
                className='form-control'
                required='required'
            />
            <label for="amountMoney">Сумма кредита</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='amountMoney'
                className='form-control'
                required='required'
            />
            <label for="creditPeriod">Срок кредита</label>
            <Field
                component='input'
                type='date'
                name='creditPeriod'
                className='form-control'
                required='required'
            />
            <div class="row">
                <div class="col-11">
                    <label for="interestRate">Процентная ставка</label>
                    <Field
                        component='input'
                        type='number'
                        step='0.1'
                        name='interestRate'
                        className='form-control'
                        required='required'
                    />
                </div>
                <div class="col-1">
                    <label for="clear">&nbsp;</label>
                    %
                </div>
            </div>
            <label for="paymentsCreditCard">Выплаты</label>
            <div class="form-check">
                <Field
                    component='input'
                    type='radio'
                    name='paymentsCreditCardID'
                    value={1}
                    id='paymentsAnnuitant'
                />
                <label class="form-check-label" for="paymentsAnnuitant">
                    Равными долями (аннуитетные)
                </label>
            </div>
            <div class="form-check">
                <Field
                    component='input'
                    type='radio'
                    name='paymentsCreditCardID'
                    value={2}
                    id='paymentsDiff'
                />
                <label class="form-check-label" for="paymentsDiff">
                    Дифференцированные
                </label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
            <button type="submit" class="btn btn-primary">Изменить</button>
        </div>
    </>
}

const EditBankAccount = (props) => {
    return <>
        <div class="modal-header">
            <h5 class="modal-title" id="addBankAccountLabel">Изменение банковского счета</h5>
            <button type="button" class="btn-close" aria-label="Close" onClick={props.onCancel}></button>
        </div>
        <div class="modal-body">
            <label for="name">Название счета</label>
            <Field
                component='input'
                type='text'
                name='name'
                className='form-control'
                required='required'
            />
            <label for="isArchive">Статус счета</label>
            <Field
                component='select'
                name='isArchive'
                className='form-control'
            >
                <option value='0'>Активный</option>
                <option value='1'>Закрытый</option>
            </Field>
            <hr />
            <label for="bankName">Банк</label>
            <Field
                component='input'
                type='text'
                name='bankName'
                className='form-control'
            />
            <label for="numCreditAccount">Номер счета/карты</label>
            <Field
                component='input'
                type='text'
                name='numCreditAccount'
                className='form-control'
            />
            <hr />
            <label for="creditLimit">Кредитный лимит</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='creditLimit'
                className='form-control'
                required='required'
            />
            <label for="amountMoney">Начальный остаток</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='amountMoney'
                className='form-control'
                required='required'
            />
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
                <button type="submit" class="btn btn-primary">Изменить</button>
            </div>
        </div>
    </>
}

const EditDeposit = (props) => {
    return <>
        <div class="modal-header">
            <h5 class="modal-title" id="addDepositLabel">Изменение вклада</h5>
            <button type="button" class="btn-close" aria-label="Close" onClick={props.onCancel}></button>
        </div>
        <div class="modal-body">
            <label for="name">Название счета</label>
            <Field
                component='input'
                type='text'
                name='name'
                className='form-control'
                required='required'
            />
            <label for="isArchive">Статус счета</label>
            <Field
                component='select'
                name='isArchive'
                className='form-control'
            >
                <option value='0'>Активный</option>
                <option value='1'>Закрытый</option>
            </Field>
            <hr />
            <label for="bankName">Банк</label>
            <Field
                component='input'
                type='text'
                name='bankName'
                className='form-control'
            />
            <label for="numCreditAccount">Номер счета/карты</label>
            <Field
                component='input'
                type='text'
                name='numCreditAccount'
                className='form-control'
            />
            <hr />
            <label for="openingDate">Дата получения</label>
            <Field
                component='input'
                type='date'
                name='openingDate'
                className='form-control'
                required='required'
            />
            <label for="amountMoney">Сумма взноса</label>
            <Field
                component='input'
                type='number'
                step='any'
                name='amountMoney'
                className='form-control'
                required='required'
            />
            <label for="periodDeposit">Срок размещения</label>
            <Field
                component='input'
                type='date'
                name='periodDeposit'
                className='form-control'
                required='required'
            />
            <div class="row">
                <div class="col-11">
                    <label for="interestRate">Процентная ставка</label>
                    <Field
                        component='input'
                        type='number'
                        step='0.1'
                        name='interestRate'
                        className='form-control'
                        required='required'
                    />
                </div>
                <div class="col-1">
                    <label for="clear">&nbsp;</label>
                    %
                </div>
            </div>
            <hr />
            <div class="form-check">
                <Field
                    component='input'
                    type='checkbox'
                    name='capitalizationOfInterest'
                    className='form-check-input'
                />
                <label class="form-check-label" for="capitalizationDepositAccount">Проценты прибавляются к сумме депозита (капитализируются)</label>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={props.onCancel}>Отменить</button>
            <button type="submit" class="btn btn-primary">Изменить</button>
        </div>
    </>
}

const EditAccount = (props) => {
    return (
        <div className='container'>
            <Form onSubmit={props.onSubmit} initialValues={props.accountData} typeAccount={props.typeAccount}
                onCancel={props.onCancel}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        {props.typeAccount === 'cash' ? <EditCash {...props} /> : null}
                        {props.typeAccount === 'card' ? <EditCard {...props} /> : null}
                        {props.typeAccount === 'creditCard' ? <EditCreditCard {...props} /> : null}
                        {props.typeAccount === 'bankAccount' ? <EditBankAccount {...props} /> : null}
                        {props.typeAccount === 'deposit' ? <EditDeposit {...props} /> : null}
                    </form>
                )}
            </Form>
        </div>
    )
}

export default EditAccount