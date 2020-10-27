import React from "react";
import {
  updateDeposit,
  newDeposit,
  BankContractAddress,
  Testnet,
} from "./bank.js";
import { Route, Switch } from 'react-router-dom';

import {
  registerDomain,
  lookupAddress,
  bid,
  DnsContractAddress
} from "./dns.js"
import HomePage from "./HomePage.js";
import AuctionPage from "./AuctionPage.js";
import AuctionStatus from "./AuctionStatus.js";




// example from doc: https://reactjs.org/docs/forms.html#controlled-components
class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/auction/status" exact component={AuctionStatus} />

          <Route path="/auction" exact component={AuctionPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>

      </div>
    )
  }
}

export default App;