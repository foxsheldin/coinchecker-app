import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

export const withUserID = (Component) => {
  const IntegratedComponent = (props) => {
    let navigate = useNavigate();
    if (props.userid == null) navigate("/auth");
    return <Component {...props} userid={props.userid} />;
  };

  const mapStateToProps = (state) => {
    return {
      userid: state.auth.userid,
    };
  };
  return connect(mapStateToProps)(IntegratedComponent);
};
