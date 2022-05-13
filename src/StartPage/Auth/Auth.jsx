import React, { useEffect } from "react";
import "./css/Auth.css";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { login, setAuthUserData } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const AuthForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {(props) => (
        <form className="form" onSubmit={props.handleSubmit}>
          <div>
            <Field
              className="fadeIn second"
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <Field
              className="fadeIn third"
              name="password"
              component="input"
              type="password"
              placeholder="Пароль"
            />
          </div>
          <div className="fadeIn fourth">
            <button type="submit" id="submitBtn">
              Войти
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

const Auth = (props) => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userID", "email"]);

  useEffect(() => {
    if (props.auth.isAuth) {
      setCookie("userID", props.auth.userid, { path: "/", maxAge: 3600 });
      setCookie("email", props.auth.email, { path: "/", maxAge: 3600 });
      navigate("/system/transaction/1");
    }
  }, [props.auth]);

  if (cookies["userID"] && cookies["email"]) {
    setCookie("userID", cookies["userID"], { path: "/", maxAge: 3600 });
    setCookie("email", cookies["email"], { path: "/", maxAge: 3600 });
    props.setAuthUserData(cookies["userID"], cookies["email"], true);
  }

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password);
  };

  return (
    <div className="page-auth">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* <!-- Tabs Titles --> */}

          {/* <!-- Icon --> */}
          <div className="fadeIn first">
            <span className="fs-3">CoinChecker</span>
            {/* <!--
          <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        --> */}
          </div>

          {/* <!-- Login Form --> */}
          <AuthForm onSubmit={onSubmit} />

          {/* <!-- Remind Passowrd --> */}
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Забыли пароль?
            </a>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={30000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, setAuthUserData })(Auth);
