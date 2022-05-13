import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import OutcomeCategory from "./OutcomeCategory";
import { getReportCategories } from "../../../redux/transaction-reducer";
import { withUserID } from "../../../hoc/withUserID";
import PreLoader from "../../common/PreLoader/PreLoader";

const OutcomeCategoryContainer = (props) => {
  useEffect(() => {
    props.getReportCategories(props.userid);
  }, []);

  return (
    <>
      {!props.reportCategories ? (
        <PreLoader />
      ) : (
        <OutcomeCategory
          reportCategories={props.reportCategories}
          countReportCategories={props.countReportCategories}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reportCategories: state.transactionPage.reportCategories,
    countReportCategories: state.transactionPage.countReportCategories,
  };
};

export default compose(
  connect(mapStateToProps, { getReportCategories }),
  withUserID
)(OutcomeCategoryContainer);
