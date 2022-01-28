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
import Transaction from "./System/Transaction/Transaction";
import TransactionsBlockContainer from "./System/Transaction/TransactionsBlock/TransactionsBlockContainer";
import EditTransactionContainer from "./System/Transaction/EditTransaction/EditTransactionContainer";


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
          <Route exact path='transaction' element={<Transaction />} >
            <Route path='/system/transaction' element={<TransactionsBlockContainer />} />
            <Route path='/system/transaction/:transactionid' element={<EditTransactionContainer />} />
          </Route>
          {/* <Route path='reminder' element={<Auth />} />
          <Route path='reports' element={<Auth />} />
          <Route path='goals' element={<Auth />} /> */}
          <Route path='advisor' element={<Advisor />} />
          <Route path='accounts' element={<AccountsContainer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
