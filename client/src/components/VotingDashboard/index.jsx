import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Header from './Header';
import TimeLine from './TimeLine';
import Content from './Content';

function VotingDashboard() {
  const { state: { contract, accounts, owner } } = useEth();
  const [isOwner, setIsOwner] = useState(false);
  const [WorkflowStatus, setWorkflowStatus] = useState(0);
  //const [isVoter, setIsVoter] = useState(false);


  const refreshLocalContext = async () => {
    owner === accounts[0] ? setIsOwner(true) : setIsOwner(false);
    const WorkflowStatus = await contract.methods.workflowStatus().call({ from: accounts[0] });
    setWorkflowStatus(WorkflowStatus);
  }

  useEffect(() => {
    
    if (contract?.methods) {
      refreshLocalContext();
    }
  }, [contract]);


  return (
    <div id="VotingDashboard">
      <Header />
      {isOwner ? <div>Owner</div> : <div>Pas Owner</div>}
      <div id="VotingDashboard_main">
        <Content  isOwner={isOwner} WorkflowStatus = {WorkflowStatus}/>
        <TimeLine isOwner={isOwner}/>
      </div>

    </div>
  );
}

export default VotingDashboard;