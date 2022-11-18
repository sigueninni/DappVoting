import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import VotingDashboard from "./components/VotingDashboard";




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
