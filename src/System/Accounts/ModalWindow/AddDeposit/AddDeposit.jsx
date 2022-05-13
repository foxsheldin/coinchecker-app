import React from "react";
import { Field, Form } from "react-final-form";

const AddDeposit = (props) => {
  const initialValues = {
    ...props.initialValues,
    typeAccount: "deposit",
  };
  return (
    <div
      className="modal fade"
      id="addDeposit"
      tabIndex="-1"
      aria-labelledby="addDepositLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addDepositLabel">
              Добавление вклада
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <Form onSubmit={props.onSubmit} initialValues={initialValues}>
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="modal-body">
                  <label for="name">Название счета</label>
                  <Field
                    component="input"
                    type="text"
                    name="name"
                    className="form-control"
                    required="required"
                  />
                  <label for="isArchive">Статус счета</label>
                  <Field
                    component="select"
                    name="isArchive"
                    className="form-control"
                  >
                    <option value="0">Активный</option>
                    <option value="1">Закрытый</option>
                  </Field>
                  <hr />
                  <label for="bankName">Банк</label>
                  <Field
                    component="input"
                    type="text"
                    name="bankName"
                    className="form-control"
                  />
                  <label for="numCreditAccount">Номер счета/карты</label>
                  <Field
                    component="input"
                    type="text"
                    name="numCreditAccount"
                    className="form-control"
                  />
                  <hr />
                  <label for="openingDate">Дата получения</label>
                  <Field
                    component="input"
                    type="date"
                    name="openingDate"
                    className="form-control"
                    required="required"
                  />
                  <label for="amountMoney">Сумма взноса</label>
                  <Field
                    component="input"
                    type="number"
                    step="any"
                    name="amountMoney"
                    className="form-control"
                    required="required"
                  />
                  <label for="periodDeposit">Срок размещения</label>
                  <Field
                    component="input"
                    type="date"
                    name="periodDeposit"
                    className="form-control"
                    required="required"
                  />
                  <div class="row">
                    <div class="col-11">
                      <label for="interestRate">Процентная ставка</label>
                      <Field
                        component="input"
                        type="number"
                        step="0.1"
                        name="interestRate"
                        className="form-control"
                        required="required"
                      />
                    </div>
                    <div class="col-1">
                      <label for="clear">&nbsp;</label>%
                    </div>
                  </div>
                  <hr />
                  <div class="form-check">
                    <Field
                      component="input"
                      type="checkbox"
                      name="capitalizationOfInterest"
                      className="form-check-input"
                    />
                    <label
                      class="form-check-label"
                      for="capitalizationOfInterest"
                    >
                      Проценты прибавляются к сумме депозита (капитализируются)
                    </label>
                  </div>
                  <div className="form-check">
                    <Field
                      component="input"
                      type="checkbox"
                      name="addTransaction"
                      className="form-check-input"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="addTransaction"
                    >
                      Создать транзакции с начислением процентов
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Отменить
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Добавить вклад
                  </button>
                </div>
              </form>
            )}
          </Form>
          <form action="/system/php/addAccount.php" method="GET"></form>
        </div>
      </div>
    </div>
  );
};

export default AddDeposit;
