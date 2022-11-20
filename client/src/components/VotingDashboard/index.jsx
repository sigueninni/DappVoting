import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Header from './Header';
import VotingTimeLine from './VotingTimeLine';
import Content from './Content';

function VotingDashboard() {
  const { state: { contract, accounts, owner } } = useEth();
  const [isOwner, setIsOwner] = useState(false);
  const [WorkflowStatus, setWorkflowStatus] = useState(0);
  //const [isVoter, setIsVoter] = useState(false);
  let currentAddress ;


  useEffect(() => {
    
    if (contract?.methods) {
      refreshLocalContext();
      console.log("refresh du context");
    }
    
  }, [contract,currentAddress,WorkflowStatus]);

  const refreshLocalContext = async () => {
    currentAddress = accounts[0] ;
    owner === accounts[0] ? setIsOwner(true) : setIsOwner(false);
    let WorkflowStatus = await contract.methods.workflowStatus().call({ from: accounts[0] });
    setWorkflowStatus(WorkflowStatus);
  }


  const onChangeWorkflowStatus = async () => {
    let WorkflowStatus = await contract.methods.workflowStatus().call({ from: accounts[0] });
    setWorkflowStatus(WorkflowStatus);
  };

  return (
    <div id="VotingDashboard_main">
      <Header />
      {/* {isOwner ? <div>Owner</div> : <div>Pas Owner</div>} */}
      <div id="VotingDashboard_content">
        <Content  isOwner={isOwner} WorkflowStatus = {WorkflowStatus} onChangeWorkflowStatus={onChangeWorkflowStatus}/>
        <VotingTimeLine isOwner={isOwner} WorkflowStatus = {WorkflowStatus} />
      </div>

    </div>
  );
}

export default VotingDashboard;