
import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import Chip from '@mui/material/Chip';

function Proposals({ isVoter, proposalOldData, selectedVotedValue, setSelectedVotedValue }) {
    const { state: { contract, accounts, owner } } = useEth();
    const [proposalsOldData, setProposalsOldData] = useState([]);
    const [proposalDesc, setProposalsDesc] = useState([]);

    let proposals = [];
    useEffect(() => {


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
          
          
                setProposalsOldData(proposals);
             
        
        
        
        
              })();


            try {

                (async function () {
                    getProposalsDescriptions();
                })();
            }
            catch (err) {
                console.log(err);
            }
        }

    }, [contract, accounts, proposalOldData ]);


    const handleChange = (event) => {
        setSelectedVotedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedVotedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });


    const getProposalsDescriptions = async() => {
        if(isVoter) {
            let proposalsDesc = [];
            for(let i = 1; i <= proposalOldData.length; i++) {
                let proposal = await contract.methods.getOneProposal(i).call({from: accounts[0]});
                proposalsDesc.push({proposalId: ''+i, description: proposal.description});
            }
            setProposalsDesc(proposalsDesc);
            console.log(proposalsDesc);
        }
    }

    const getProposals = () => {
        let proposals = [...proposalDesc];
      //  let proposals2 = [...ProposalsOldData];
       // let proposalsDesc = [...proposalOldDataDesc];
       // let mergedProposals = [];

        return proposals.map((p, i) => {
            return (
                <div key={i} id="proposals_main_radiogroup">
                    {/* <FormControlLabel    control={<Checkbox color="secondary" />} label={p.proposalId} /> */}
                    <div><Radio {...controlProps(p.proposalId)} color="secondary"  /> <span>{p.proposalId} {p.description} </span></div>

                </div>
            );
        });
    };


    return (

        <div id="Content_main_proposals"  >
            {/*  Voters and Owner Cars if Owner  */}
            {contract && isVoter && <div >
                <div className='centered' id="proposals_main_radiogroup">
                <Chip  id="Content_main_proposals_chip" label="List of Proposals" color="secondary" variant="outlined" sx={{ m: '2rem' }}  />
                    {getProposals()}
                </div>


            </div>}


        </div>

    );
}

export default Proposals;
