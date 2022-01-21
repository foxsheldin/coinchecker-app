import React from 'react';
import $ from "jquery";
import stl from './css/Auth.module.css';
import './css/notification.css';
/* import './js/auth'; */


const Auth = () => {
  return (
    <main>
      <div className={[stl.wrapper, stl.fadeInDown]}>
        <div className={stl.formContent}>
          {/* <!-- Tabs Titles --> */}

          {/* <!-- Icon --> */}
          <div className={[stl.fadeIn, stl.first]}>
            <span className="fs-3">CoinChecker</span>
            {/* <!--
          <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        --> */}
          </div>

          {/* <!-- Login Form --> */}
          <div className={stl.form}>
            <input type="text" id="email" className={[stl.fadeIn, stl.second]} name="login" placeholder="Email" />
            <input type="password" id="password" className={[stl.fadeIn, stl.third]} name="password" placeholder="Пароль" />
            <input type="submit" className={[stl.fadeIn, stl.fourth]} id="submitBtn" value="Войти" />
          </div>

          {/* <!-- <form action="../system/transaction.html">
        <input type="text" id="email" className="fadeIn second" name="login" placeholder="Email" />
        <input type="text" id="password" className="fadeIn third" name="login" placeholder="Пароль" />
        <input type="submit" className="fadeIn fourth" value="Войти">
      </form> --> */}

          {/* <!-- Remind Passowrd --> */}
          <div className={stl.formFooter}>
            <a className={stl.underlineHover} href="#">Забыли пароль?</a>
          </div>

        </div>
      </div>
    </main>
  )
};

export default Auth;