import React from 'react'

const AddCard = () => {

    return (
        <div className="modal fade" id="addCard" tabIndex="-1" aria-labelledby="addCardLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addCardLabel">Добавление карты</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {/* <form action="/system/php/addAccount.php" method="GET"> */}
                        <div className="modal-body">
                            <input type="hidden" name="typeAccount" value="card" />
                            <label htmlFor="name">Название счета</label>
                            <input type="text" className="form-control" name="name" required />
                            <label htmlFor="isArchive">Статус счета</label>
                            <select className="form-control" name="isArchive">
                                <option selected="selected" value="false">Активный</option>
                                <option value="true">Закрытый</option>
                            </select>
                            <hr />
                            <label htmlFor="bankCardAccount">Банк</label>
                            <input type="text" className="form-control" name="bankCardAccount" />
                            <label htmlFor="numCardAccount">Номер счета/карты</label>
                            <input type="text" className="form-control" name="numCardAccount" />
                            <hr />
                            <div className="form-check">
                                <input type="checkbox" id="diff" className="form-check-input" name="addGracePeriod" checked="checked" />
                                <label className="form-check-label" htmlFor="addGracePeriod">Беспроцентный период</label>
                            </div>
                            <label htmlFor="dateBankStatement">Дата банковской выписки</label>
                            <select className="form-control" name="dateBankStatement">
                                <option selected="selected" value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <label htmlFor="limitCardAccount">Кредитный лимит</label>
                            <input type="number" step="any" className="form-control" name="limitCardAccount" required />
                            <label htmlFor="countDaysGracePeriod">Количество дней беспроцентного периода</label>
                            <input type="number" step="1" className="form-control" name="countDaysGracePeriod" required />
                            <label htmlFor="limitOverspendingCardAccount">Предупреждение о перерасходе свыше:</label>
                            <input type="number" step="any" className="form-control" name="limitOverspendingCardAccount" />
                            <div className="row">
                                <div className="col-10">
                                    <label htmlFor="countDaysOverspendingCardAccount">Предупреждение о досрочном погащении через:</label>
                                    <input type="number" step="1" className="form-control" name="countDaysOverspendingCardAccount" />
                                </div>
                                <div className="col-1">
                                    <label htmlFor="clear">&nbsp;</label>
                                    дней
                                </div>
                            </div>
                            <label htmlFor="amountMoney">Начальный остаток</label>
                            <input type="number" step="1" className="form-control" name="amountMoney" required />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                            <button type="submit" className="btn btn-primary" >Добавить карту</button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default AddCard
