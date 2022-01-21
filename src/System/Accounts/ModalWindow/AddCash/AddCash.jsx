import React from 'react';


const AddCash = (props) => {
    /* const addAccount = () => {
        const newAccount = {
            title: nameAccount.current.value,
            amountMoney: amountMoney.current.value,
            type: "cash"
        }
        props.addAccount(newAccount);
    } */

    return (
        <div className="modal fade" id="addCash" tabIndex="-1" aria-labelledby="addCashLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addCashLabel">Добавление наличного счета</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {/* <form action="/system/php/addAccount.php" method="GET"> */}
                        <div className="modal-body">
                            {/* <input type="hidden" name="typeAccount" value="cash" /> */}
                            <label htmlFor="name">Название счета</label>
                            <input type="text" className="form-control" name="name" required />
                            <label htmlFor="amountMoney">Начальный остаток</label>
                            <input type="number" step="any" className="form-control" name="amountMoney" required />
                            <label htmlFor="isArchive">Статус счета</label>
                            <select className="form-control" name="isArchive">
                                <option selected="selected" value="false">Активный</option>
                                <option value="true">Закрытый</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                            <button type="submit" className="btn btn-primary">Добавить наличный счет</button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default AddCash
