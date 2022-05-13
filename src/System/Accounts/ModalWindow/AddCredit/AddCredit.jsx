import React from "react";
import { Field, Form } from "react-final-form";

const AddCredit = (props) => {
  const initialValues = {
    ...props.initialValues,
    typeAccount: "creditCard",
  };
  return (
    <div
      className="modal fade"
      id="addCredit"
      tabIndex="-1"
      aria-labelledby="addCreditLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCreditLabel">
              Добавление кредита
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
                  <label for="dateOfReceipt">Дата получения</label>
                  <Field
                    component="input"
                    type="date"
                    name="dateOfReceipt"
                    className="form-control"
                    required="required"
                  />
                  <label for="amountMoney">Сумма кредита</label>
                  <Field
                    component="input"
                    type="number"
                    step="any"
                    name="amountMoney"
                    className="form-control"
                    required="required"
                  />
                  <label for="creditPeriod">Срок кредита</label>
                  <Field
                    component="input"
                    type="date"
                    name="creditPeriod"
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
                  <label htmlFor="paymentsIDCreditAccount">Выплаты</label>
                  <div class="form-check">
                    <Field
                      component="input"
                      type="radio"
                      name="paymentsCreditCardID"
                      value="1"
                      className="form-check-input"
                      id="paymentsAnnuitant"
                    />
                    <label class="form-check-label" for="paymentsAnnuitant">
                      Равными долями (аннуитетные)
                    </label>
                  </div>
                  <div class="form-check">
                    <Field
                      component="input"
                      type="radio"
                      name="paymentsCreditCardID"
                      value="2"
                      className="form-check-input"
                      id="paymentsDiff"
                    />
                    <label class="form-check-label" for="paymentsDiff">
                      Дифференцированные
                    </label>
                  </div>
                  <hr />
                  <div className="form-check">
                    <Field
                      component="input"
                      type="checkbox"
                      name="addTransaction"
                      className="form-check-input"
                      id="paymentsDiff"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="addTransaction"
                    >
                      Создать транзакции с выплатами по кредиту
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
                    Добавить кредит
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCredit;
