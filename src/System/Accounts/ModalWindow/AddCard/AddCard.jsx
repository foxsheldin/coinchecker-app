import React, { useState } from "react";
import { Field, Form } from "react-final-form";

const Condition = ({ when, is, children }) => {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
};

const AddCard = (props) => {
  const initialValues = {
    ...props.initialValues,
    typeAccount: "card",
  };

  return (
    <div
      className="modal fade"
      id="addCard"
      tabIndex="-1"
      aria-labelledby="addCardLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCardLabel">
              Добавление карты
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
                  <label for="numCardAccount">Номер счета/карты</label>
                  <Field
                    component="input"
                    type="text"
                    name="numCardAccount"
                    className="form-control"
                  />
                  <hr />
                  <div className="form-check">
                    <Field
                      component="input"
                      type="checkbox"
                      name="isGracePeriod"
                      className="form-check-input"
                      id="isGracePeriod"
                    />
                    <label className="form-check-label" htmlFor="isGracePeriod">
                      Беспроцентный период
                    </label>
                  </div>
                  <Condition when="isGracePeriod" is={true}>
                    <label htmlFor="dateBankStatement">
                      Дата банковской выписки
                    </label>
                    <Field
                      component="select"
                      name="dateBankStatement"
                      className="form-control"
                    >
                      <option selected="selected" value="1">
                        1
                      </option>
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
                    </Field>
                    <label htmlFor="countDaysGracePeriod">
                      Количество дней беспроцентного периода
                    </label>
                    <Field
                      component="input"
                      type="number"
                      name="countDaysGracePeriod"
                      step="1"
                      className="form-control"
                      required="required"
                    />
                    <label htmlFor="limitOverspendingCardAccount">
                      Предупреждение о перерасходе свыше:
                    </label>
                    <Field
                      component="input"
                      type="number"
                      name="limitOverspendingCardAccount"
                      step="1"
                      className="form-control"
                    />
                    <div className="row">
                      <div className="col-10">
                        <label htmlFor="countDaysOverspendingCardAccount">
                          Предупреждение о досрочном погащении через:
                        </label>
                        <Field
                          component="input"
                          type="number"
                          name="countDaysOverspendingCardAccount"
                          step="1"
                          className="form-control"
                        />
                      </div>
                      <div className="col-1">
                        <label htmlFor="clear">&nbsp;</label>
                        дней
                      </div>
                    </div>
                  </Condition>
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
                    Добавить карту
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

export default AddCard;
