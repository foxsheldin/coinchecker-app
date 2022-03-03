//import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPageLayout from './StartPage/StartPageLayout';
import ContentSP from './StartPage/Content/contentSP';
import FooterSP from './StartPage/Footer/footerSP';
import Auth from './StartPage/Auth/Auth';
import SystemLayout from "./System/SystemLayout";
import Browse from "./System/Browse/Browse";
import AccountsContainer from "./System/Accounts/AccountsContainer";
import Advisor from "./System/Advisor/Advisor";
import TransactionPage from "./System/Transaction/TransactionPage";
import EditTransactionPage from "./System/EditTransactionPage/EditTransactionPage";
import EditAccountContainer from "./System/Accounts/EditAccount/EditAccountContainer";


const App = (props) => {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<StartPageLayout />}>
          <Route exact path='/' element={[<ContentSP />, <FooterSP />]} />
          <Route path='auth' element={<Auth />} />
        </Route>
        <Route path='system' element={<SystemLayout />}>
          <Route path='browse' element={<Browse />} />
          <Route path='/system/transaction/:page' element={<TransactionPage />} />
          <Route path='/system/transaction/filter/:typeAccount/:accountID/:page' element={<TransactionPage />} />
          <Route path='/system/transaction/edit/:transactionid' element={<EditTransactionPage />} />
          {/* <Route path='reminder' element={<Auth />} />
          <Route path='reports' element={<Auth />} />
          <Route path='goals' element={<Auth />} /> */}
          <Route path='advisor' element={<Advisor />} />
          <Route path='accounts' element={<AccountsContainer />} />
          <Route path="/system/accounts/edit/:typeAccount/:accountID" element={<EditAccountContainer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
