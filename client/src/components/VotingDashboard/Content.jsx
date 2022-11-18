import useEth from "../../contexts/EthContext/useEth";

function Content({ isOwner, WorkflowStatus }) {

  const { state: { contract, accounts, web3 } } = useEth();
  const startProposal = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
  };

  return (
    <div className="column Content">
      Content
      {isOwner ?
        <div>Owner <pre>  {WorkflowStatus} </pre>
          <button onClick={startProposal}>Start Proposal</button> </div>
        :
        <div>Pas Owner {WorkflowStatus}</div>}
    </div>
  );
}

export default Content;