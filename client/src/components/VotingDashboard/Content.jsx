import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CardPerson from "./CardPerson";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Actors from './Actors';
import Proposals from './Proposals';
import Slide from '@mui/material/Slide';

function Content({ isOwner, WorkflowStatus, onChangeWorkflowStatus }) {

  //const [WorkflowStatus, setWorkflowStatus] = useState(0);

  let voters = [];
  let proposals = [];

  const { state: { contract, accounts, owner } } = useEth();
  const [isVoter, setIsVoter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openProposal, setOpenProposal] = React.useState(false);
  const [inputVoterAddress, setInputVoterAddress] = useState("");
  const [inputProposal, setInputProposal] = useState("");
  const [selectedVotedValue, setSelectedVotedValue] = React.useState(0);
  const [proposalOldData, setProposalOldData] = useState([]);
  const [winningProposal,setWinningProposal] = useState("");
  const [stateSb, setStateSb] = React.useState({
    messageSb: '',
    openSb: false,
  });
  const { openSb, messageSb } = stateSb;
  const [voterOldData, setVoterOldData] = useState("");
  const [voterData, setVoterData] = useState("");

  // *************************************************
  // *************    Events Handling    *************
  // *************************************************  

  const [proposalData, setProposalData] = useState("");
  const [proposalOldDataDesc, setProposalOldDataDesc] = useState("");
  const [wfEventData, setWfEventData] = useState("");

  useEffect(() => {
    const wfText = ['Registering Voters', 'Proposals Registration Started', 'Proposals Registration Ended', 'Voting Session Started', 'Voting SessionEnded', 'Votes Tallied'];

    if (contract && contract?.methods) {
      (async function () {



        let oldEventsProposals = await contract.getPastEvents('ProposalRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
      });

      oldEventsProposals.forEach(event => {
          // getOneProposal(event.returnValues.proposalId);

          proposals.push({
              proposalId: event.returnValues.proposalId,
          
          });

      });


      setProposalOldData(proposals);



        /*  let oldEvents = await contract.getPastEvents('VoterRegistered', {
              fromBlock: 0,
              toBlock: 'latest'
            });
    
            oldEvents.forEach(event => {
              voters.push({
                address: event.returnValues.voterAddress,
                isVoter: true
              });
    
            });
            setVoterOldData(voters);  */

        await contract.events.ProposalRegistered({ fromBlock: "earliest" })
          .on('data', event => {
            let _voterAddress = event.returnValues.voterAddress;
            //setVoterData(_voterAddress);
            setStateSb({
              openSb: true, messageSb: 'Proposal Registered'
            });

          });


        await contract.events.VoterRegistered({ fromBlock: "earliest" })
          .on('data', event => {
            let _voterAddress = event.returnValues.voterAddress;
            //setVoterData(_voterAddress);
            setStateSb({
              openSb: true, messageSb: 'Voter Registered'
            });

          });

        await contract.events.Voted({ fromBlock: "earliest" })
          .on('data', event => {
            setStateSb({
              openSb: true, messageSb: 'Has Voted!'
            });

          });


        await contract.events.WorkflowStatusChange({ fromBlock: "earliest" })
          .on('data', event => {
            let _WorkflowStatus = event.returnValues.newStatus;
            setWfEventData(wfText[_WorkflowStatus]);
            setStateSb({
              openSb: true, messageSb: wfText[_WorkflowStatus]
            });
          });
        //here other events to be catched





      })();

      //Setting isVoter
      /*  if ([...voterOldData].filter(v => v.address == accounts[0]).length > 0) {
         setIsVoter(true);
       } else { setIsVoter(false); } */
    }

  }, [contract, accounts]); //voterOldData,


  const [openW, setOpenW] = React.useState(false);

  const handleClickOpenW = () => {
    setOpenW(true);
  };

  const handleCloseW = () => {
    setOpenW(false);
  };


  const handleClickSb = (newState) => () => {
    setStateSb({ open: true, ...newState });
  };

  const handleCloseSb = () => {
    setStateSb({
      messageSb: '',
      openSb: false,
    });


  };

  const handleOpenAddVoter = () => {
    setOpen(true);
  };

  const handleCloseAddVoter = () => {
    setOpen(false);
  };


  const handleOpenProposal = () => {
    setOpenProposal(true);
  };

  const handleCloseProposal = () => {
    setOpenProposal(false);
  };


  const onAddNewVoter = () => {
    debugger;
    if (inputVoterAddress !== '') {
      const newVoter = { address: inputVoterAddress };
      //voters.push(newVoter);
      addVoter(inputVoterAddress);
    }
    handleCloseAddVoter();
  };

  const onAddNewProposal = () => {
    let proposalLegth = 0;
    if (inputProposal !== '') {
      const newProposal = { proposal: inputProposal };
      proposalLegth = proposalOldDataDesc.length + 1;

      setProposalOldDataDesc(proposalOldDataDesc => [...proposalOldDataDesc, { proposalId: proposalLegth, address: accounts[0], proposal: inputProposal }]);


      addProposal(inputProposal);
    }
    handleCloseProposal();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  const refreshWFStatus = async () => {
    onChangeWorkflowStatus();
  };

  const getVoters = () => {
    let voters = [...voterOldData];
    return voters.map((v, i) => {
      return (
        <CardPerson key={i} address={v.address} />
      );
    });
  };


  const getWinningProposalID = async () => {
    const WinningProposalID = await contract.methods.winningProposalID().call({ from: accounts[0] });
    const WinningProposal = await contract.methods.getOneProposal(WinningProposalID).call({from: accounts[0]});
    setWinningProposal(WinningProposal.description);
    handleClickOpenW();
  };

  // *************************************************
  // *************    Owner actions    ***************
  // *************************************************
  const startProposalsRegistering = async () => {
    try {
      await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
      refreshWFStatus();
    } catch (err) {
      console.log(err);
    }
  };
  const endProposalsRegistering = async () => {
    try {
      await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
      refreshWFStatus();
    } catch (err) {
      console.log(err);
    }
  };
  const startVotingSession = async () => {
    try {
      await contract.methods.startVotingSession().send({ from: accounts[0] });
      refreshWFStatus();
    } catch (err) {
      console.log(err);
    }
  };
  const endVotingSession = async () => {
    try {
      await contract.methods.endVotingSession().send({ from: accounts[0] });
      refreshWFStatus();
    } catch (err) {
      console.log(err);
    }
  };
  const tallyVotes = async () => {
    try {
      await contract.methods.tallyVotes().send({ from: accounts[0] });
      refreshWFStatus();
    } catch (err) {
      console.log(err);
    }
  };
  const addVoter = async (address) => {
    try {
      setOpen(true);
      await contract.methods.addVoter(address).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };

  // *************************************************
  // *************    Voter actions    ***************
  // *************************************************
  const addProposal = async (proposal) => {
    try {
      await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };

  const setVote = async () => {
    try {
      await contract.methods.setVote(selectedVotedValue).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
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
            label="Voter Address"
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


      <Dialog maxWidth="xl" open={openProposal} onClose={handleCloseProposal}>
        <DialogTitle>Give a proposal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add your proposal here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="proposal"
            label="Proposal"
            type="text"
            fullWidth
            multiline
            variant="standard"
            value={inputProposal}
            onChange={e => {
              setInputProposal(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProposal}>Cancel</Button>
          <Button onClick={onAddNewProposal}>Add</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openW}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseW}
        aria-describedby="alert-dialog-slide-description"
      >
      <DialogTitle>The winning Proposal Id is :</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {winningProposal}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseW}>Close</Button>
        </DialogActions>
      </Dialog>


      <Snackbar open={openSb} autoHideDuration={5000} onClose={handleCloseSb}>
        <Alert onClose={handleCloseSb} severity="info" sx={{ width: '100%' }}>
          {messageSb}
        </Alert>
      </Snackbar>

      <div id="Content_main_actions" className="column25">
        {/*   *********************************************
      ***************Owner*************************
      ********************************************* */}
        {/* WorkflowStatus at  RegisteringVoters */}
        {isOwner && WorkflowStatus == 0 &&
          < div >
            <Stack direction="row" spacing={2}>
              <Button color="secondary" variant="contained" endIcon={<PlayCircleFilledIcon />} onClick={startProposalsRegistering}>start Proposals Registering</Button>
              <Button color="secondary" variant="contained" endIcon={<PersonAddIcon />} onClick={handleOpenAddVoter}>add a Voter</Button>
            </Stack>
          </div>

        }


        {/* WorkflowStatus at  ProposalsRegistrationStarted */}
        {
          isOwner && WorkflowStatus == 1 &&
          <div><Button color="secondary" variant="contained" endIcon={<StopCircleIcon />} onClick={endProposalsRegistering}>end Proposals Registering</Button> </div>
        }

        {/* WorkflowStatus at  ProposalsRegistrationEnded */}
        {
          isOwner && WorkflowStatus == 2 &&
          <div><Button color="secondary" variant="contained" endIcon={<PlayCircleFilledIcon />} onClick={startVotingSession}>start Voting Session</Button> </div>
        }

        {/* WorkflowStatus at  VotingSessionStarted */}
        {
          isOwner && WorkflowStatus == 3 &&
          <div><Button color="secondary" variant="contained" endIcon={<StopCircleIcon />} onClick={endVotingSession}>end Voting Session</Button> </div>
        }

        {/* WorkflowStatus at  VotingSessionEnded */}
        {
          isOwner && WorkflowStatus == 4 &&
          <div><Button color="secondary" variant="contained" endIcon={<AddCircleIcon />} onClick={tallyVotes}>tally Votes</Button> </div>
        }

      {/*   {
          isOwner && WorkflowStatus == 5 &&
          <div><Button color="secondary" variant="contained" endIcon={<EmojiEventsIcon />} onClick={getWinningProposalID}>get Winning Proposal</Button> </div>
        } */}


        {/*   *********************************************
      *************** Voter  *************************
      ********************************************* */}
        {/* WorkflowStatus at  ProposalsRegistrationStarted */}
        {isVoter && WorkflowStatus == 1 &&
          <div><Button color="secondary" variant="contained" endIcon={<PlaylistAddCircleIcon />} onClick={handleOpenProposal}>add a Proposal</Button> </div>
        }

        {isVoter && WorkflowStatus == 3 &&
          <div><Button color="secondary" variant="contained" endIcon={<HowToRegIcon />} onClick={setVote}>Vote</Button> </div>
        }
      

      {
        isVoter && WorkflowStatus == 5 &&
        <div><Button color="secondary" variant="contained" endIcon={<EmojiEventsIcon />} onClick={getWinningProposalID}>get Winning Proposal</Button> </div>
      }
</div>
      <Actors isOwner={isOwner} isVoter={isVoter} setIsVoter={setIsVoter} />
      <Proposals isVoter={isVoter}  proposalOldData={proposalOldData} selectedVotedValue={selectedVotedValue} setSelectedVotedValue={setSelectedVotedValue} />

    </div >
  );
}

export default Content;