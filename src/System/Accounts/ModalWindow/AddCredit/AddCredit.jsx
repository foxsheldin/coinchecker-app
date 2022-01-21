import React from 'react'

const AddCredit = (props) => {
    return (
        <div className="modal fade" id="addCredit" tabIndex="-1" aria-labelledby="addCreditLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addCreditLabel">Добавление кредита</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="/system/php/addAccount.php" method="GET">
                        <div className="modal-body">
                            <input type="hidden" name="typeAccount" value="credit" />
                            <label htmlFor="name">Название счета</label>
                            <input type="text" className="form-control" name="name" required />
                            <label htmlFor="isArchive">Статус счета</label>
                            <select className="form-control" name="isArchive">
                                <option selected="selected" value="false">Активный</option>
                                <option value="true">Закрытый</option>
                            </select>
                            <hr />
                            <label htmlFor="bankCreditAccount">Банк</label>
                            <input type="text" className="form-control" name="bankCreditAccount" />
                            <label htmlFor="numCreditAccount">Номер счета/карты</label>
                            <input type="text" className="form-control" name="numCreditAccount" />
                            <hr />
                            <label htmlFor="dateOfReceiptCreditAccount">Дата получения</label>
                            <input type="date" className="form-control" name="dateOfReceiptCreditAccount" required />
                            <label htmlFor="amountMoney">Сумма кредита</label>
                            <input type="number" step="any" className="form-control" name="amountMoney" required />
                            <label htmlFor="creditPeriodCreditAccount">Срок кредита</label>
                            <input type="date" className="form-control" name="creditPeriodCreditAccount" id="creditPeriodCreditAccount" />
                            {/* <!-- <div className="row">
                                    <div className="col">
                                        <label htmlFor="creditPeriodCreditAccount">Срок кредита</label>
                                        <input type="number" className="form-control" name="creditPeriodCreditAccount" id="creditPeriodCreditAccount" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="typeCreditPeriod">&nbsp;</label>
                                        <select className="form-control" name="typeCreditPeriod">
                                            <option value="Day">дней</option>
                                            <option value="Mounth" selected="selected">месяцев</option>
                                            <option value="Year">лет</option>
                                        </select>
                                    </div>
                                </div> --> */}
                            <div className="row">
                                <div className="col-11">
                                    <label htmlFor="interestRateCreditAccount">Процентная ставка</label>
                                    <input type="number" step="any" className="form-control" name="interestRateCreditAccount" required />
                                </div>
                                <div className="col-1">
                                    <label htmlFor="clear">&nbsp;</label>
                                    %
                                </div>
                            </div>
                            <label htmlFor="paymentsIDCreditAccount">Выплаты</label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="payments" id="paymentsAnnuitant" value="1" checked="checked" />
                                <label className="form-check-label" htmlFor="paymentsAnnuitant">Равными долями (аннуитетные)</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" name="payments" id="paymentsDiff" value="2" />
                                <label className="form-check-label" htmlFor="paymentsDiff">Дифференцированные</label>
                            </div>
                            <hr />
                            <div className="form-check">
                                <input type="checkbox" id="diff" className="form-check-input" name="addTransactionCreditAccount" checked="checked" />
                                <label className="form-check-label" htmlFor="addTransactionCreditAccount">Создать транзакции с выплатами по кредиту</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                            <button type="submit" className="btn btn-primary">Добавить кредит</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCredit
