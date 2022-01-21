import React from "react";
import {Link} from "react-router-dom"

const NavBarSP = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light sticky" >
            <div className="container">
                <div className="navbar-brand">
                    {/*  <!-- LOGO --> */}
                    <Link to='/'>
                        <div className="logo text-uppercase">
                            CoinChecker
                            {/* <!--<img src="images/logo-light.png" alt="" className="logo-light" height="20" />
                <img src="images/logo-dark.png" alt="" className="logo-dark" height="20" />
                --> */}
                        </div>
                    </Link>
                </div>
                <form className="d-flex">
                    <ul className="navbar-nav ml-auto navbar-center mt-lg-0 mt-2" id="navbar-navlist">
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/system">System</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link">
                                <Link to="/auth">Войти</Link>
                            </div>
                        </li>
                        <a className="btn btn-info btn-sm navbar-btn my-lg-0 my-2" data-bs-toggle="modal" data-bs-target="#addNewUser">Зарегистрироваться</a>
                    </ul>
                </form>
            </div>
        </nav>
        
    );
}

export default NavBarSP;