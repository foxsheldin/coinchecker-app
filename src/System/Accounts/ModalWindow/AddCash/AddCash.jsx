import React from 'react';
import { Field, Form } from 'react-final-form';

const AddCash = (props) => {
    const initialValues = {
        ...props.initialValues,
        typeAccount: 'cash'
    }
    return (
        <div className="modal fade" id="addCash" tabIndex="-1" aria-labelledby="addCashLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Form onSubmit={props.onSubmit} initialValues={initialValues}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addCashLabel">Добавление наличного счета</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
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
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                                    <button type="submit" className="btn btn-primary">Добавить наличный счет</button>
                                </div>
                            </form>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AddCash
