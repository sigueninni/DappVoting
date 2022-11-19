import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RepeatIcon from '@mui/icons-material/Repeat';


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
          <Stack direction="row" spacing={2}>
            <Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={startProposalsRegistering}>start Proposals Registering</Button>
            <Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={addVoter}>add a Voter</Button>
          </Stack>
        </div>

      }

      {/* WorkflowStatus at  ProposalsRegistrationStarted */}
      {
        isOwner && WorkflowStatus == 1 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={endProposalsRegistering}>end Proposals Registering</Button> </div>
      }

      {/* WorkflowStatus at  ProposalsRegistrationEnded */}
      {
        isOwner && WorkflowStatus == 2 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={startVotingSession}>start Voting Session</Button> </div>
      }

      {/* WorkflowStatus at  VotingSessionStarted */}
      {
        isOwner && WorkflowStatus == 3 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={endVotingSession}>end Voting Session</Button> </div>
      }

      {/* WorkflowStatus at  VotingSessionEnded */}
      {
        isOwner && WorkflowStatus == 4 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={tallyVotes}>tally Votes</Button> </div>
      }


      {/*   *********************************************
      *************** Voter  *************************
      ********************************************* */}
      {/* WorkflowStatus at  ProposalsRegistrationStarted */}
      {isVoter && WorkflowStatus == 1 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={addProposal}>add a Proposal</Button> </div>
      }

      {isVoter && WorkflowStatus == 3 &&
        <div><Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={setVote}>Vote</Button> </div>
      }

    </div >
  );
}

export default Content;