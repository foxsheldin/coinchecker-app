import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/withAuthRedirect";
import { logout } from "../../../redux/auth-reducer";

const NavBarSystem = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/system/browse" className="nav-link">Обзор</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/system/transaction" className="nav-link">Транзакции</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/system/reminder" className="nav-link">Планируемые транзакции (т)</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/system/reports" className="nav-link">Отчёты (т)</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/system/goals" className="nav-link">Цели (т)</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/system/advisor" className="nav-link">Советник (т)</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/system/accounts" className="nav-link">Счета</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ещё
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/system/accounts" className="dropdown-item">Счета</Link>
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
                        <a href="notification.php" className="nav-link">Уведомления</a>
                        <a href="settings.php" className="nav-link">Настройки (т)</a>
                        <span className="nav-link" onClick={props.logout}>Выйти</span>
                    </form>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default compose(
    connect(mapStateToProps, { logout }),
    withAuthRedirect
)(NavBarSystem);