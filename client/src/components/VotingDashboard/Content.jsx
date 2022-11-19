import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";


function Content({ isOwner, WorkflowStatus }) {


  const voters = [];
  const { state: { contract, accounts, web3 } } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  // *************************************************
  // *************    Owner actions    ***************
  // *************************************************
  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
  };
  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
  };
  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  };
  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  };
  const tallyVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
  };
  const addVoter = async (address) => {
    await contract.methods.addVoter(address).send({ from: accounts[0] });
  };

  // *************************************************
  // *************    Voter actions    ***************
  // *************************************************
  const addProposal = async (proposal) => {
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
  };

  const setVote = async (voteId) => {
    await contract.methods.setVote(voteId).send({ from: accounts[0] });
  };


  return (
    <div className="column Content">
      {isOwner ? <div>Owner</div> : <div>Pas Owner</div>}
      {WorkflowStatus == 1 ? <div>WorkflowStatus : {WorkflowStatus}</div> : <div>Pas WorkflowStatus</div>}

      {/*   *********************************************
      ***************Owner*************************
      ********************************************* */}
      {/* WorkflowStatus at  RegisteringVoters */}
      {isOwner && WorkflowStatus == 0 &&
        < div >
          <button onClick={startProposalsRegistering}>start Proposals Registering</button>
          <button onClick={addVoter}>add a Voter</button>
        </div>

      }

      {/* WorkflowStatus at  ProposalsRegistrationStarted */}
      {
        isOwner && WorkflowStatus == 1 &&
        <div><button onClick={endProposalsRegistering}>end Proposals Registering</button> </div>
      }

      {/* WorkflowStatus at  ProposalsRegistrationEnded */}
      {
        isOwner && WorkflowStatus == 2 &&
        <div><button onClick={startVotingSession}>start Voting Session</button> </div>
      }

      {/* WorkflowStatus at  VotingSessionStarted */}
      {
        isOwner && WorkflowStatus == 3 &&
        <div><button onClick={endVotingSession}>end Voting Session</button> </div>
      }

      {/* WorkflowStatus at  VotingSessionEnded */}
      {
        isOwner && WorkflowStatus == 4 &&
        <div><button onClick={tallyVotes}>tally Votes</button> </div>
      }


      {/*   *********************************************
      *************** Voter  *************************
      ********************************************* */}
         {/* WorkflowStatus at  ProposalsRegistrationStarted */}
         { isVoter && WorkflowStatus == 1 &&
        <div><button onClick={addProposal}>add a Proposal</button> </div>
      }
      
     { isVoter && WorkflowStatus == 3 &&
        <div><button onClick={setVote}>Vote</button> </div>
      }

    </div >
  );
}

export default Content;