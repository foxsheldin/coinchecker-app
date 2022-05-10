import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { logout } from "../../../redux/auth-reducer";
import { getNotification } from "../../../redux/notification-reducer";
import "react-toastify/dist/ReactToastify.css";

const NavBarSystem = (props) => {
  useEffect(() => {
    props.getNotification(props.userid);
  }, []);

  useEffect(() => {
    console.log(props.notification);
    props.notification?.default?.forEach((element) => {
      toast(`🦄 ${element.headerN}! ${element.textN}`, {
        position: "bottom-center",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    props.notification?.grace?.forEach((element) => {
      toast(`🦄 Настало время погасить долг по карте "${element.name}"`, {
        position: "bottom-center",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [props.notification]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/system/browse" className="nav-link">
                  Обзор
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/system/transaction/1" className="nav-link">
                  Транзакции
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/system/reminder" className="nav-link">Планируемые транзакции (т)</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/system/reports" className="nav-link">Отчёты (т)</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/system/goals" className="nav-link">Цели (т)</NavLink>
            </li> */}
              <li className="nav-item">
                <NavLink to="/system/advisor" className="nav-link">
                  Советник (т)
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/system/accounts" className="nav-link">
                  Счета
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ещё
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <NavLink to="/system/accounts" className="dropdown-item">Счета</NavLink>
                    </li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li> */}
              {/* <!-- <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        ещё
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="accounts.php">Счета</a>
                        <a className="dropdown-item" href="categories.php">Категории</a>
                    </div>
                </li> --> */}
            </ul>
            <form className="d-flex">
              <a href="notification.php" className="nav-link">
                Уведомления
              </a>
              <a href="settings.php" className="nav-link">
                Настройки (т)
              </a>
              <span className="nav-link" onClick={props.logout}>
                Выйти
              </span>
            </form>
          </div>
        </div>
      </nav>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  notification: state.notification.notification,
});

export default compose(
  connect(mapStateToProps, { getNotification, logout }),
  withAuthRedirect
)(NavBarSystem);
