import React from "react";
import { Field, Form } from "react-final-form";

const numberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
const accountElements = (nameAccount) => {
  return nameAccount.map((each) => (
    <option
      value={each.typeAccount + ", " + each.id}
      key={each.typeAccount + "," + each.id}
    >
      {each.name} - {numberWithSpaces(each.amountMoney)}&nbsp;руб.
    </option>
  ));
};

const categoriesElement = (categories) =>
  categories.map((each) => (
    <option value={each.id} key={each.nameCategory}>
      {each.nameCategory}
    </option>
  ));

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const selectAccount = (accounts, name) => {
  return (
    <Field
      component="select"
      className="form-control my-2"
      name={name}
      required="required"
    >
      <option defaultValue />
      {accounts?.cashData.length ? (
        <optgroup label="Наличные">
          {accountElements(accounts.cashData)}
        </optgroup>
      ) : null}
      {accounts?.cardData.length ? (
        <optgroup label="Карты">{accountElements(accounts.cardData)}</optgroup>
      ) : null}
      {accounts?.creditData.length ? (
        <optgroup label="Кредиты">
          {accountElements(accounts.creditData)}
        </optgroup>
      ) : null}
      {accounts?.bankAccountData.length ? (
        <optgroup label="Банковские счета">
          {accountElements(accounts.bankAccountData)}
        </optgroup>
      ) : null}
      {accounts?.depositData.length ? (
        <optgroup label="Вклады">
          {accountElements(accounts.depositData)}
        </optgroup>
      ) : null}
    </Field>
  );
};

const FormAddTransaction = (props) => {
  return (
    <Form
      onSubmit={props.handleSubmit}
      accounts={props.accounts}
      categories={props.categories}
      initialValues={props.initialValues}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="modal-body">
            <label htmlFor="date">Дата транзакции</label>
            <Field
              component="input"
              type="date"
              name="date"
              className="form-control"
              required="required"
            />
            <div className="btn-group my-2">
              <label className="btn btn-sm btn-outline-primary">
                <Field
                  component="input"
                  type="radio"
                  name="typeTransaction"
                  value="outcome"
                />
                Расход
              </label>
              <label className="btn btn-sm btn-outline-primary">
                <Field
                  component="input"
                  type="radio"
                  name="typeTransaction"
                  value="income"
                />
                Доход
              </label>
              <label className="btn btn-sm btn-outline-primary">
                <Field
                  component="input"
                  type="radio"
                  name="typeTransaction"
                  value="transfer"
                />
                Перевод
              </label>
            </div>
            <Condition when="typeTransaction" is="outcome">
              <div>
                <label htmlFor="money">Потрачено</label>
                <Field
                  component="input"
                  type="number"
                  step="any"
                  name="money"
                  min="0"
                  className="form-control"
                  required="required"
                />
                <label htmlFor="category">Категория</label>
                <Field
                  component="select"
                  name="category"
                  className="form-control my-2"
                  required="required"
                >
                  {categoriesElement(props.categories.outcome)}
                </Field>
                <label htmlFor="account">Счет</label>
                {selectAccount(props.accounts, "account")}
                <label htmlFor="payer">Получатель</label>
                <Field
                  component="input"
                  type="text"
                  name="payer"
                  placeholder="Получатель"
                  className="form-control my-2"
                />
                <label htmlFor="comment">Комментарий</label>
                <Field
                  component="input"
                  type="text"
                  name="comment"
                  placeholder="Комментарий"
                  className="form-control my-2"
                />
              </div>
            </Condition>
            <Condition when="typeTransaction" is="income">
              <div>
                <label htmlFor="money">Получено</label>
                <Field
                  component="input"
                  type="number"
                  step="any"
                  name="money"
                  min="0"
                  className="form-control"
                  required="required"
                />
                <label htmlFor="category">Категория</label>
                <Field
                  component="select"
                  name="category"
                  className="form-control my-2"
                  required="required"
                >
                  {categoriesElement(props.categories.income)}
                </Field>
                <label htmlFor="account">Счет</label>
                {selectAccount(props.accounts, "account")}
                <label htmlFor="payer">Плательщик</label>
                <Field
                  component="input"
                  type="text"
                  name="payer"
                  placeholder="Плательщик"
                  className="form-control my-2"
                />
                <label htmlFor="comment">Комментарий</label>
                <Field
                  component="input"
                  type="text"
                  name="comment"
                  placeholder="Комментарий"
                  className="form-control my-2"
                />
              </div>
            </Condition>
            <Condition when="typeTransaction" is="transfer">
              <div>
                <label htmlFor="money">Сумма перевода</label>
                <Field
                  component="input"
                  type="number"
                  step="any"
                  name="money"
                  min="0"
                  className="form-control"
                  required="required"
                />
                <label htmlFor="firstAccount">Со счета</label>
                {selectAccount(props.accounts, "firstAccount")}
                <label htmlFor="secondAccount">На счет</label>
                {selectAccount(props.accounts, "secondAccount")}
                <label htmlFor="comment">Комментарий</label>
                <Field
                  component="input"
                  type="text"
                  name="comment"
                  placeholder="Комментарий"
                  className="form-control my-2"
                />
              </div>
            </Condition>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить транзакцию
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

const ModalWindow = (props) => {
  return (
    <div
      className="modal fade"
      id="addTransaction"
      tabIndex="-1"
      aria-labelledby="addTransactionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addTransactionLabel">
              Добавление транзакции
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <FormAddTransaction {...props} />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
