import React from "react";
import { Field, Form } from "react-final-form";

const EditCash = (props) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="addCashLabel">
          Изменение наличного счета
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <label htmlFor="name">Название счета</label>
        <Field
          component="input"
          type="text"
          name="name"
          className="form-control"
          required="required"
        />
        <label htmlFor="amountMoney">Начальный остаток</label>
        <Field
          component="input"
          type="number"
          name="amountMoney"
          step="any"
          className="form-control"
          required="required"
        />
        <label htmlFor="isArchive">Статус счета</label>
        <Field component="select" name="isArchive" className="form-control">
          <option value="0">Активный</option>
          <option value="1">Закрытый</option>
        </Field>
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
    </>
  );
};

const Condition = ({ when, is, children }) => {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
};

const EditCard = (props) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="addCardLabel">
          Изменение карты
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <label htmlFor="name">Название счета</label>
        <Field
          component="input"
          type="text"
          name="name"
          className="form-control"
          required="required"
        />
        <label htmlFor="isArchive">Статус счета</label>
        <Field component="select" name="isArchive" className="form-control">
          <option value="0">Активный</option>
          <option value="1">Закрытый</option>
        </Field>
        <hr />
        <label htmlFor="bankName">Банк</label>
        <Field
          component="input"
          type="text"
          name="bankName"
          className="form-control"
        />
        <label htmlFor="numCardAccount">Номер счета/карты</label>
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
          <label htmlFor="dateBankStatement">Дата банковской выписки</label>
          <Field
            component="select"
            name="dateBankStatement"
            className="form-control"
            required="required"
          >
            <option />
            <option value="1">1</option>
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
        <label htmlFor="creditLimit">Кредитный лимит</label>
        <Field
          component="input"
          type="number"
          step="any"
          name="creditLimit"
          className="form-control"
          required="required"
        />
        <label htmlFor="amountMoney">Начальный остаток</label>
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
          onClick={props.onCancel}
        >
          Отменить
        </button>
        <button type="submit" className="btn btn-primary">
          Изменить
        </button>
      </div>
    </>
  );
};

const EditCreditCard = (props) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="addCreditLabel">
          Изменение кредита
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <label htmlFor="name">Название счета</label>
        <Field
          component="input"
          type="text"
          name="name"
          className="form-control"
          required="required"
        />
        <label htmlFor="isArchive">Статус счета</label>
        <Field component="select" name="isArchive" className="form-control">
          <option value="0">Активный</option>
          <option value="1">Закрытый</option>
        </Field>
        <hr />
        <label htmlFor="bankName">Банк</label>
        <Field
          component="input"
          type="text"
          name="bankName"
          className="form-control"
        />
        <label htmlFor="numCreditAccount">Номер счета/карты</label>
        <Field
          component="input"
          type="text"
          name="numCreditAccount"
          className="form-control"
        />
        <hr />
        <label htmlFor="dateOfReceipt">Дата получения</label>
        <Field
          component="input"
          type="date"
          name="dateOfReceipt"
          className="form-control"
          required="required"
        />
        <label htmlFor="amountMoney">Сумма кредита</label>
        <Field
          component="input"
          type="number"
          step="any"
          name="amountMoney"
          className="form-control"
          required="required"
        />
        <label htmlFor="creditPeriod">Срок кредита</label>
        <Field
          component="input"
          type="date"
          name="creditPeriod"
          className="form-control"
          required="required"
        />
        <div className="row">
          <div className="col-11">
            <label htmlFor="interestRate">Процентная ставка</label>
            <Field
              component="input"
              type="number"
              step="0.1"
              name="interestRate"
              className="form-control"
              required="required"
            />
          </div>
          <div className="col-1">
            <label htmlFor="clear">&nbsp;</label>%
          </div>
        </div>
        <label htmlFor="paymentsCreditCard">Выплаты</label>
        <div className="form-check">
          <Field
            component="input"
            type="radio"
            name="paymentsCreditCardID"
            value={1}
            className="form-check-input"
            id="paymentsAnnuitant"
          />
          <label className="form-check-label" htmlFor="paymentsAnnuitant">
            Равными долями (аннуитетные)
          </label>
        </div>
        <div className="form-check">
          <Field
            component="input"
            type="radio"
            name="paymentsCreditCardID"
            value={2}
            className="form-check-input"
            id="paymentsDiff"
          />
          <label className="form-check-label" htmlFor="paymentsDiff">
            Дифференцированные
          </label>
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
    </>
  );
};

const EditBankAccount = (props) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="addBankAccountLabel">
          Изменение банковского счета
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <label htmlFor="name">Название счета</label>
        <Field
          component="input"
          type="text"
          name="name"
          className="form-control"
          required="required"
        />
        <label htmlFor="isArchive">Статус счета</label>
        <Field component="select" name="isArchive" className="form-control">
          <option value="0">Активный</option>
          <option value="1">Закрытый</option>
        </Field>
        <hr />
        <label htmlFor="bankName">Банк</label>
        <Field
          component="input"
          type="text"
          name="bankName"
          className="form-control"
        />
        <label htmlFor="numCreditAccount">Номер счета/карты</label>
        <Field
          component="input"
          type="text"
          name="numCreditAccount"
          className="form-control"
        />
        <hr />
        <label htmlFor="creditLimit">Кредитный лимит</label>
        <Field
          component="input"
          type="number"
          step="any"
          name="creditLimit"
          className="form-control"
          required="required"
        />
        <label htmlFor="amountMoney">Начальный остаток</label>
        <Field
          component="input"
          type="number"
          step="any"
          name="amountMoney"
          className="form-control"
          required="required"
        />
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
      </div>
    </>
  );
};

const EditDeposit = (props) => {
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="addDepositLabel">
          Изменение вклада
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <label htmlFor="name">Название счета</label>
        <Field
          component="input"
          type="text"
          name="name"
          className="form-control"
          required="required"
        />
        <label htmlFor="isArchive">Статус счета</label>
        <Field component="select" name="isArchive" className="form-control">
          <option value="0">Активный</option>
          <option value="1">Закрытый</option>
        </Field>
        <hr />
        <label htmlFor="bankName">Банк</label>
        <Field
          component="input"
          type="text"
          name="bankName"
          className="form-control"
        />
        <label htmlFor="numCreditAccount">Номер счета/карты</label>
        <Field
          component="input"
          type="text"
          name="numCreditAccount"
          className="form-control"
        />
        <hr />
        <label htmlFor="openingDate">Дата получения</label>
        <Field
          component="input"
          type="date"
          name="openingDate"
          className="form-control"
          required="required"
        />
        <label htmlFor="amountMoney">Сумма взноса</label>
        <Field
          component="input"
          type="number"
          step="any"
          name="amountMoney"
          className="form-control"
          required="required"
        />
        <label htmlFor="periodDeposit">Срок размещения</label>
        <Field
          component="input"
          type="date"
          name="periodDeposit"
          className="form-control"
          required="required"
        />
        <div className="row">
          <div className="col-11">
            <label htmlFor="interestRate">Процентная ставка</label>
            <Field
              component="input"
              type="number"
              step="0.1"
              name="interestRate"
              className="form-control"
              required="required"
            />
          </div>
          <div className="col-1">
            <label htmlFor="clear">&nbsp;</label>%
          </div>
        </div>
        <hr />
        <div className="form-check">
          <Field
            component="input"
            type="checkbox"
            name="capitalizationOfInterest"
            className="form-check-input"
          />
          <label
            className="form-check-label"
            htmlFor="capitalizationDepositAccount"
          >
            Проценты прибавляются к сумме депозита (капитализируются)
          </label>
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
    </>
  );
};

const EditAccount = (props) => {
  return (
    <div className="container">
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.accountData}
        typeAccount={props.typeAccount}
        onCancel={props.onCancel}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {props.typeAccount === "cash" ? <EditCash {...props} /> : null}
            {props.typeAccount === "card" ? <EditCard {...props} /> : null}
            {props.typeAccount === "creditCard" ? (
              <EditCreditCard {...props} />
            ) : null}
            {props.typeAccount === "bankAccount" ? (
              <EditBankAccount {...props} />
            ) : null}
            {props.typeAccount === "deposit" ? (
              <EditDeposit {...props} />
            ) : null}
          </form>
        )}
      </Form>
    </div>
  );
};

export default EditAccount;
