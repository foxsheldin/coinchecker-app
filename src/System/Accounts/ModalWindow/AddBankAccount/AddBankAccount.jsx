import React from 'react'

const AddBankAccount = (props) => {
    return (
        <div className="modal fade" id="addBankAccount" tabIndex="-1" aria-labelledby="addBankAccountLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addBankAccountLabel">Добавление банковского счета</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="/system/php/addAccount.php" method="GET">
                        <div className="modal-body">
                            <input type="hidden" name="typeAccount" value="bankAccount" />
                            <label htmlFor="name">Название счета</label>
                            <input type="text" className="form-control" name="name" required />
                            <label htmlFor="isArchive">Статус счета</label>
                            <select className="form-control" name="isArchive">
                                <option selected="selected" value="false">Активный</option>
                                <option value="true">Закрытый</option>
                            </select>
                            <hr />
                            <label htmlFor="bankBankAccount">Банк</label>
                            <input type="text" className="form-control" name="bankBankAccount" />
                            <label htmlFor="numBankAccount">Номер счета/карты</label>
                            <input type="text" className="form-control" name="numBankAccount" />
                            <hr />
                            <label htmlFor="creditLimitBankAccount">Кредитный лимит</label>
                            <input type="number" step="any" className="form-control" name="creditLimitBankAccount" required />
                            <label htmlFor="amountMoney">Начальный остаток</label>
                            <input type="number" step="any" className="form-control" name="amountMoney" required />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                            <button type="submit" className="btn btn-primary">Добавить банковский счет</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBankAccount
