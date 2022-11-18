import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Header from './Header';
import TimeLine from './TimeLine';
import Content from './Content';

function VotingDashboard() {
  const { state: { contract, accounts, owner } } = useEth();
  const [isOwner, setIsOwner] = useState(false);
  //const [isVoter, setIsVoter] = useState(false);


  const setLocalContext = async () => {
    owner === accounts[0] ? setIsOwner(true) : setIsOwner(false);
  }

  useEffect(() => {
    if (contract?.methods) {
      setLocalContext();
      console.log("useEffect");
    }
  }, [contract]);


  return (
    <div id="VotingDashboard">
      <Header />
      {isOwner ? <div>Owner</div> : <div>Pas Owner</div>}
      <div id="VotingDashboard_main">
        <Content />
        {/* <TimeLine />  */}
      </div>

    </div>
  );
}

export default VotingDashboard;