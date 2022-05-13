import React from "react";
import { Field, Form } from "react-final-form";

const AddBankAccount = (props) => {
  const initialValues = {
    ...props.initialValues,
    typeAccount: "bankAccount",
  };
  return (
    <div
      className="modal fade"
      id="addBankAccount"
      tabIndex="-1"
      aria-labelledby="addBankAccountLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addBankAccountLabel">
              Добавление банковского счета
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
                  <label for="creditLimit">Кредитный лимит</label>
                  <Field
                    component="input"
                    type="number"
                    step="any"
                    name="creditLimit"
                    className="form-control"
                    required="required"
                  />
                  <label for="amountMoney">Начальный остаток</label>
                  <Field
                    component="input"
                    type="number"
                    step="any"
                    name="amountMoney"
                    className="form-control"
                    required="required"
                  />
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
                    Добавить банковский счет
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

export default AddBankAccount;
