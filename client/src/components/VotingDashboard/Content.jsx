import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RepeatIcon from '@mui/icons-material/Repeat';
import CardPerson from "./CardPerson";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';


function Content({ isOwner, WorkflowStatus, onChangeWorkflowStatus }) {

  //const [WorkflowStatus, setWorkflowStatus] = useState(0);

  let voters = [];
  let proposals = [];

  const { state: { contract, accounts, owner } } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [inputVoterAddress, setInputVoterAddress] = useState("");
  const [stateSb, setStateSb] = React.useState({
    messageSb: '',
    openSb: false,
  });
  const {   openSb,messageSb } = stateSb;


  // *************************************************
  // *************    Events Handling    *************
  // *************************************************  
  /*  const [EventVoterRegistered, setVoterRegistered] = useState("");
   const [oldVoterRegisteredEvents, setOldVoterRegisteredEvents] = useState();
   const [EventValue, setEventValue] = useState("");
   const [oldEvents, setOldEvents] = useState(); */
  const [voterData, setVoterData] = useState("");
  const [voterOldData, setVoterOldData] = useState("");

  useEffect(() => {
    (async function () {

      if (contract && contract?.methods) {
        let oldEvents = await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });

        oldEvents.forEach(event => {
          voters.push({
            address: event.returnValues.voterAddress,
            isVoter: true
          });

        });
        setVoterOldData(voters);

        await contract.events.VoterRegistered({ fromBlock: "earliest" })
          .on('data', event => {
            let _voterAddress = event.returnValues.voterAddress;
            handleClickSb({
              messageSb: 'Voter Registered',
            })

            setVoterData(_voterAddress);

          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))
      }

    })();
  }, [contract,voterOldData]);



  const handleClickSb = (newState) => () => {
    setStateSb({ open: true, ...newState });
  };

  const handleCloseSb = () => {
    setStateSb({ ...stateSb, open: false });
  };



  const handleOpenAddVoter = () => {
    setOpen(true);
  };

  const handleCloseAddVoter = () => {
    setOpen(false);
  };


  const onAddNewVoter = () => {
    debugger;
    if (inputVoterAddress !== '') {
      const newVoter = { address: inputVoterAddress };
      voters.push(newVoter);
      addVoter(inputVoterAddress);
    }
    handleCloseAddVoter();
  };

  /*   const handleInputVoterAddressChange = async e => {
      debugger;
      setInputVoterAddress(this.refs.myField.getValue());
    }; */


  const refreshWFStatus = async () => {
    onChangeWorkflowStatus();
  };


  const getVoters = () => {
    let voters = [...voterOldData];
    return voters.map((v, i) => {
      return (
        <CardPerson address={v.address} />
      );
    });
  };

  // *************************************************
  // *************    Owner actions    ***************
  // *************************************************
  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    refreshWFStatus();
  };
  const endProposalsRegistering = async () => {
    await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
    refreshWFStatus();
  };
  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
    refreshWFStatus();
  };
  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
    refreshWFStatus();
  };
  const tallyVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
    refreshWFStatus();
  };
  const addVoter = async (address) => {
    setOpen(true);
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
    <div id="Content_main" className="column70">

  

      <Dialog maxWidth="xl" open={open} onClose={handleCloseAddVoter}>
        <DialogTitle>Register a new Voter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Voter Metamask Address here, you canno't add yourself!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Voter Address ->"
            type="text"
            fullWidth
            variant="standard"
            value={inputVoterAddress}
            onChange={e => {
              setInputVoterAddress(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddVoter}>Cancel</Button>
          <Button onClick={onAddNewVoter}>Add</Button>
        </DialogActions>
      </Dialog>



      <Snackbar
        open={openSb}
        autoHideDuration={2000}
        onClose={handleCloseSb}
        message={messageSb} />

      {/*   <pre>{EventValue}</pre> 
     <pre>{EventValue}</pre>  */}


      <div id="Content_main_actions" className="column50">
        {/*   *********************************************
      ***************Owner*************************
      ********************************************* */}
        {/* WorkflowStatus at  RegisteringVoters */}
        {isOwner && WorkflowStatus == 0 &&
          < div >
            <Stack direction="row" spacing={2}>
              <Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={startProposalsRegistering}>start Proposals Registering</Button>
              <Button color="secondary" variant="contained" endIcon={<RepeatIcon />} onClick={handleOpenAddVoter}>add a Voter</Button>
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
      </div>


      <div id="Content_main_actors" className="column50" >
        {/*  Voters and Owner Cars if Owner  */}
        {isOwner && <div >
          <CardPerson address={owner} />
          {getVoters()}
        </div>}
        {/*  Proposals if Voter  */}
        {isVoter && <div >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your are a<strong>Registered Voter!</strong>
            </Alert>

          </Stack>
        </div>}
        {/*  not Voter, Not Owner  */}
        {!isVoter && !isOwner &&
          <div >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Your are <strong>not Registered Voter!</strong>
              </Alert>

            </Stack>
          </div>}
      </div>

    </div >
  );
}

export default Content;