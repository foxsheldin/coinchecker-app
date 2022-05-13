import React from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUserData } from "../redux/auth-reducer";

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(["userID", "email"]);

    if (cookies["userID"] && cookies["email"]) {
      setCookie("userID", cookies["userID"], { path: "/", maxAge: 3600 });
      setCookie("email", cookies["email"], { path: "/", maxAge: 3600 });
      props.setAuthUserData(cookies["userID"], cookies["email"], true);
    }

    let navigate = useNavigate();
    if (!props.isAuth) navigate("/auth");
    return <Component {...props} />;
  };

  const mapStateToPropsForRedirect = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };
  const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect, {
    setAuthUserData,
  })(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
