import React from "react";
import "./css/Auth.css";
import "./css/notification.css"; /* 
import "./js/auth"; */
import "./js/notification";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";

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
  if (props.isAuth) {
    navigate("/system/transaction/1");
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Auth);
