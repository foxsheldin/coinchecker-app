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

const TransferForm = (props) => {
  return (
    <Form
      onSubmit={props.onSubmit}
      initialValues={props.transaction}
      accounts={props.accounts}
      onCancel={props.onCancel}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className="modal-body">
            <label htmlFor="date">Дата транзакции</label>
            <Field
              className="form-control"
              name="dateTransaction"
              component="input"
              type="date"
              placeholder="Дата транзакции"
            />
            <label htmlFor="money">Сумма перевода</label>
            <Field
              className="form-control"
              name="amountMoney"
              component="input"
              type="number"
              placeholder="Сумма перевода"
              min="0"
              step="any"
            />
            <div className="formaddTransfer">
              <label htmlFor="firstAccountSelect">Со счета</label>
              <Field
                className="form-control my-2"
                name="firstAccountSelect"
                component="select"
              >
                {props.accounts?.cashData.length ? (
                  <optgroup label="Наличные">
                    {accountElements(props.accounts.cashData)}
                  </optgroup>
                ) : null}
                {props.accounts?.cardData.length ? (
                  <optgroup label="Карты">
                    {accountElements(props.accounts.cardData)}
                  </optgroup>
                ) : null}
                {props.accounts?.creditData.length ? (
                  <optgroup label="Кредиты">
                    {accountElements(props.accounts.creditData)}
                  </optgroup>
                ) : null}
                {props.accounts?.bankAccountData.length ? (
                  <optgroup label="Банковские счета">
                    {accountElements(props.accounts.bankAccountData)}
                  </optgroup>
                ) : null}
                {props.accounts?.depositData.length ? (
                  <optgroup label="Вклады">
                    {accountElements(props.accounts.depositData)}
                  </optgroup>
                ) : null}
              </Field>
              <label htmlFor="secondAccountSelect">На счет</label>
              <Field
                className="form-control my-2"
                name="secondAccountSelect"
                component="select"
              >
                {props.accounts?.cashData.length ? (
                  <optgroup label="Наличные">
                    {accountElements(props.accounts.cashData)}
                  </optgroup>
                ) : null}
                {props.accounts?.cardData.length ? (
                  <optgroup label="Карты">
                    {accountElements(props.accounts.cardData)}
                  </optgroup>
                ) : null}
                {props.accounts?.creditData.length ? (
                  <optgroup label="Кредиты">
                    {accountElements(props.accounts.creditData)}
                  </optgroup>
                ) : null}
                {props.accounts?.bankAccountData.length ? (
                  <optgroup label="Банковские счета">
                    {accountElements(props.accounts.bankAccountData)}
                  </optgroup>
                ) : null}
                {props.accounts?.depositData.length ? (
                  <optgroup label="Вклады">
                    {accountElements(props.accounts.depositData)}
                  </optgroup>
                ) : null}
              </Field>
              <label htmlFor="comment">Комментарий</label>
              <Field
                className="form-control my-2"
                name="comment"
                component="input"
                type="text"
                placeholder="Комментарий"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.onCancel}
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">
              Изменить
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

const IncomeOutcomeForm = (props) => {
  const categoriesElement = (categories) =>
    categories.map((each) => (
      <option value={each.id}>{each.nameCategory}</option>
    ));

  return (
    <Form
      onSubmit={props.onSubmit}
      initialValues={props.transaction}
      accounts={props.accounts}
      categories={props.categories}
      onCancel={props.onCancel}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <label htmlFor="date">Дата транзакции</label>
          <Field
            className="form-control"
            name="dateTransaction"
            component="input"
            type="date"
            placeholder="Дата транзакции"
          />
          <label htmlFor="money">
            {props.initialValues.isIncome ? "Получено" : "Потрачено"}
          </label>
          <Field
            className="form-control"
            name="amountMoney"
            component="input"
            type="number"
            placeholder="Сумма перевода"
            min="0"
            step="any"
          />
          <div className="formadd">
            <label htmlFor="category">Категория</label>
            <Field
              className="form-control my-2"
              name="categoryID"
              component="select"
            >
              {categoriesElement(
                props.initialValues.isIncome
                  ? props.categories.income
                  : props.categories.outcome
              )}
            </Field>
            <label htmlFor="firstAccountSelect">Счет</label>
            <Field
              className="form-control my-2"
              name="firstAccountSelect"
              component="select"
            >
              {props.accounts?.cashData.length ? (
                <optgroup label="Наличные">
                  {accountElements(props.accounts.cashData)}
                </optgroup>
              ) : null}
              {props.accounts?.cardData.length ? (
                <optgroup label="Карты">
                  {accountElements(props.accounts.cardData)}
                </optgroup>
              ) : null}
              {props.accounts?.creditData.length ? (
                <optgroup label="Кредиты">
                  {accountElements(props.accounts.creditData)}
                </optgroup>
              ) : null}
              {props.accounts?.bankAccountData.length ? (
                <optgroup label="Банковские счета">
                  {accountElements(props.accounts.bankAccountData)}
                </optgroup>
              ) : null}
              {props.accounts?.depositData.length ? (
                <optgroup label="Вклады">
                  {accountElements(props.accounts.depositData)}
                </optgroup>
              ) : null}
            </Field>
            <label htmlFor="payer">Плательщик</label>
            <Field
              className="form-control my-2"
              name="payer"
              component="input"
              type="text"
              placeholder="Плательщик"
            />
            <label htmlFor="comment">Комментарий</label>
            <Field
              className="form-control my-2"
              name="comment"
              component="input"
              type="text"
              placeholder="Комментарий"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.onCancel}
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">
              Изменить
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

const EditTransaction = (props) => {
  return (
    <div className="container">
      <div className="modal-header">
        <h5 className="modal-title" id="addIncomeLabel">
          Изменение транзакции
        </h5>
        <a className="btn-close" onClick={props.onCancel}></a>
      </div>
      {props.transaction.isTransfer ? (
        <TransferForm
          {...props}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
        />
      ) : (
        <IncomeOutcomeForm
          {...props}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
        />
      )}
    </div>
  );
};

export default EditTransaction;
