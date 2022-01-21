import React from 'react'

const AddDeposit = (props) => {
    return (
        <div className="modal fade" id="addDeposit" tabIndex="-1" aria-labelledby="addDepositLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addDepositLabel">Добавление вклада</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="/system/php/addAccount.php" method="GET">
                        <div className="modal-body">
                            <input type="hidden" name="typeAccount" value="deposit" />
                            <label htmlFor="name">Название счета</label>
                            <input type="text" className="form-control" name="name" required />
                            <label htmlFor="isArchive">Статус счета</label>
                            <select className="form-control" name="isArchive">
                                <option selected="selected" value="false">Активный</option>
                                <option value="true">Закрытый</option>
                            </select>
                            <hr />
                            <label htmlFor="bankDepositAccount">Банк</label>
                            <input type="text" className="form-control" name="bankDepositAccount" />
                            <label htmlFor="numDepositAccount">Номер счета/карты</label>
                            <input type="text" className="form-control" name="numDepositAccount" />
                            <hr />
                            <label htmlFor="dateOfReceiptDepositAccount">Дата получения</label>
                            <input type="date" className="form-control" name="dateOfReceiptDepositAccount" required />
                            <label htmlFor="amountMoney">Сумма взноса</label>
                            <input type="number" step="any" className="form-control" name="amountMoney" required />
                            <label htmlFor="periodDepositAccount">Срок размещения</label>
                            <input type="date" className="form-control" name="periodDepositAccount" required />
                            {/* <!-- <div style={{display: 'inline'}}>
                                    <input type="number" className="form-control" name="periodDepositAccount" id="periodDepositAccount" width="75" />
                                    <select className="form-control">
                                        <option value="Mounth" selected="selected">месяцев</option>
                                        <option value="Year" selected="selected">лет</option>
                                    </select>
                                </div> --> */}
                            <div className="row">
                                <div className="col-11">
                                    <label htmlFor="interestRateDepositAccount">Процентная ставка</label>
                                    <input type="number" step="any" className="form-control" name="interestRateDepositAccount" required />
                                </div>
                                <div className="col-1">
                                    <label htmlFor="clear">&nbsp;</label>
                                    %
                                </div>
                            </div>
                            <hr />
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="capitalizationDepositAccount" />
                                <label className="form-check-label" htmlFor="capitalizationDepositAccount">Проценты прибавляются к сумме депозита (капитализируются)</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="addTransactionDepositAccount" checked="checked" />
                                <label className="form-check-label" htmlFor="addTransactionDepositAccount">Создать транзакции с начислением процентов</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                            <button type="submit" className="btn btn-primary">Добавить вклад</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDeposit
