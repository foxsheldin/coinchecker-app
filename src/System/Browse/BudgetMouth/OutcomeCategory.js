import React from "react";

const OutcomeCategoryItem = (props) => {
  return (
    <tr>
      <td>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: "100%" }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span className="amount-type">{props.categoryName}</span>
          <span className="balance-completed">
            <span className="amount">
              {Math.abs(props.outcomeMoney)}&nbsp;руб.
            </span>
          </span>
        </div>
      </td>
    </tr>
  );
};

const OutcomeCategory = (props) => {
  const outcomeCategoryElement = props.reportCategories.map((each, index) => (
    <OutcomeCategoryItem {...each} key={index} />
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ minWidth: "50%", width: "auto" }}>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.countReportCategories === 0 ? (
          <tr>
            <td>
              <h4>В этом месяце нет трат</h4>
            </td>
          </tr>
        ) : (
          outcomeCategoryElement
        )}
      </tbody>
    </table>
  );
};

export default OutcomeCategory;
