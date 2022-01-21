import React from 'react';
import "./css/materialdesignicons.min.css";
import "./css/tiny-slider.css";
import "./css/style.css";

/* import "./js/bundle";*/
/* import "./js/tiny-slider";*/
import NavBarSP from './NavBar/navbarSP';
import ModalWindowSP from './ModalWindow/modalWindowSP';
import {Outlet} from "react-router-dom";
// import "./js/app";

const StartPageLayout = () => {
    return (

            <div>
                <NavBarSP />
                <div>
                    <Outlet />
                </div>
                <ModalWindowSP />
            </div>
);
}

export default StartPageLayout;
