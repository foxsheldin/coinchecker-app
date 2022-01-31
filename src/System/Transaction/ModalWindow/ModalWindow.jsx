import React from 'react'

const ModalWindow = () => {
    const transactionBtnClick = (transactionName) => {
        
    }

    return (
        <div>
            <div className="modal fade" id="addOutcome" tabIndex="-1" aria-labelledby="addOutcomeLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addOutcomeLabel">Добавление расхода</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="/system/php/addTransaction.php" method="GET">
                            <div className="modal-body">
                                <input type="hidden" name="type" value="outcome" />
                                <label htmlFor="date">Дата транзакции</label>
                                <input type="date" className="form-control" name="date" value={Date.now()} required="" />
                               {/*  <!-- <div className="btn-group my-2">
                                    <button className="btn btn-sm btn-outline-primary active" onClick={transactionBtnClick('outcome')}>Расход</button>
                                    <button className="btn btn-sm btn-outline-primary" onClick={transactionBtnClick('income')}>Доход</button>
                                    <button className="btn btn-sm btn-outline-primary" onClick={transactionBtnClick('transfer')}>Перевод</button>
                                </div> --> */}
                                <label htmlFor="money">Потрачено</label>
                                <input className="form-control" type="number" step="any" name="money" id="money" min="0" />
                                <div className="formaddOutcome">
                                    <label htmlFor="category">Категория</label>
                                    <select className="form-control my-2" name="category" id="category">
                                        <option value="1">Без категории</option>
                                        <option value="2">Дети</option>
                                        <option value="3">Забота о себе</option>
                                        <option value="5">Здоровье и фитнес</option>
                                        <option value="6">Кафе и рестораны</option>
                                        <option value="7">Корректировка</option>
                                        <option value="8">Машина</option>
                                        <option value="9">Образование</option>
                                        <option value="10">Отдых и развлечения</option>
                                        <option value="11">Платежи, комиссии</option>
                                        <option value="12">Подарки</option>
                                        <option value="13">Покупки: одежда, техника</option>
                                        <option value="14">Продукты</option>
                                        <option value="15">Проезд</option>
                                    </select>
                                    <label htmlFor="account">Счет</label>
                                    <select className="form-control my-2" name="account" id="account">
                                        <optgroup label="Наличные">
                                            <option value="1, 1">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
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
                                    <label htmlFor="payer">Получатель</label>
                                    <input className="form-control my-2" type="text" name="payer" id="payer" placeholder="Получатель" />
                                    <label htmlFor="comment">Комментарий</label>
                                    <input className="form-control my-2" type="text" name="comment" id="comment" placeholder="Комментарий" />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить расход</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="addIncome" tabIndex="-1" aria-labelledby="addIncomeLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addIncomeLabel">Добавление дохода</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="/system/php/addTransaction.php" method="GET">
                            <div className="modal-body">
                                <input type="hidden" name="type" value="income" />
                                <label htmlFor="date">Дата транзакции</label>
                                <input type="date" className="form-control" name="date" value="2021-12-25" required="" />
                                <label htmlFor="money">Получено</label>
                                <input className="form-control" type="number" step="any" name="money" id="money" min="0" />
                                <div className="formaddIncome">
                                    <label htmlFor="category">Категория</label>
                                    <select className="form-control my-2" name="category" id="category">
                                        <option value="1">Без категории</option>
                                        <option value="4">Зарплата</option>
                                        <option value="7">Корректировка</option>
                                        <option value="12">Подарки</option>
                                    </select>
                                    <label htmlFor="account">Счет</label>
                                    <select className="form-control my-2" name="account" id="account">
                                        <optgroup label="Наличные">
                                            <option value="1, 1">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
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
                                    <label htmlFor="payer">Плательщик</label>
                                    <input className="form-control my-2" type="text" name="payer" id="payer" placeholder="Плательщик" />
                                    <label htmlFor="comment">Комментарий</label>
                                    <input className="form-control my-2" type="text" name="comment" id="comment" placeholder="Комментарий" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить доход</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="addTransfer" tabIndex="-1" aria-labelledby="addTransferLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTransferLabel">Добавление перевода</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="/system/php/addTransaction.php" method="GET">
                            <div className="modal-body">
                                <input type="hidden" name="type" value="transfer" />
                                <label htmlFor="date">Дата транзакции</label>
                                <input type="date" className="form-control" name="date" value="2021-12-25" required="" />
                                <label htmlFor="money">Сумма перевода</label>
                                <input className="form-control" type="number" step="any" name="money" id="money" min="0" />
                                <div className="formaddTransfer">
                                    <label htmlFor="firstAccount">Со счета</label>
                                    <select className="form-control my-2" name="firstAccount" id="account">
                                        <optgroup label="Наличные">
                                            <option value="1, 1">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
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
                                    <label htmlFor="secondAccount">На счет</label>
                                    <select className="form-control my-2" name="secondAccount" id="account">
                                        <optgroup label="Наличные">
                                            <option value="1, 1">Наличный счёт 1&nbsp;-&nbsp;1&nbsp;000.00&nbsp;руб.</option>
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
                                    <label htmlFor="comment">Комментарий</label>
                                    <input className="form-control my-2" type="text" name="comment" id="comment" placeholder="Комментарий" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                <button type="submit" className="btn btn-primary">Добавить перевод</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow
