import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import VotingDashboard from "./components/VotingDashboard";
import React from "react";

function App() {
  return (
    <EthProvider>
    <div id="App" >
      <div className="container">
        <VotingDashboard />
      </div>
    </div>
  </EthProvider>
  );
}

export default App;
