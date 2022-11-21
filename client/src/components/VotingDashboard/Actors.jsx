
import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CardPerson from "./CardPerson";
import Stack from '@mui/material/Stack';

function Actors({ isOwner, isVoter , setIsVoter}) {
    const { state: { contract, accounts, owner } } = useEth();
  //  const [voterData, setVoterData] = useState("");
    const [voterOldData, setVoterOldData] = useState("");
    let voters = [];

    useEffect(() => {
       
    
        if (contract && contract?.methods) {
          (async function () {
    
    
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
           
          })();
    
    

          if ([...voterOldData].filter(v => v.address == accounts[0]).length > 0) {
            setIsVoter(true);
          } else { setIsVoter(false); }
        }
    
      }, [contract, voterOldData, accounts]);
    


    const getVoters = () => {
        let voters = [...voterOldData];
        return voters.map((v, i) => {
          return (
            <CardPerson key={i} address={v.address} />
          );
        });
      };


  return (
 
    <div id="Content_main_actors" className={ isOwner ?  "column50" : "column25" }>
    {/*  Voters and Owner Cars if Owner  */}
    {contract && isOwner && <div >
      <CardPerson address={owner} />
      {getVoters()}
    </div>}
    {/*  Proposals if Voter  */}
    {isVoter && <div >
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">
          Your are a<strong> Registered Voter!</strong>
        </Alert>

      </Stack>
    </div>}
    {/*  not Voter, Not Owner  */}
    {contract && !isVoter && !isOwner &&
      <div >
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Your are <strong>not a Registered Voter!</strong>
          </Alert>

        </Stack>
      </div>}
  </div>

  );
}

export default Actors;
