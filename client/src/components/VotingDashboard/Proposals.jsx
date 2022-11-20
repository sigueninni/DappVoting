
import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';

function Proposals({ isVoter, proposalOldDataDesc ,selectedVotedValue, setSelectedVotedValue }) {
    const { state: { contract, accounts, owner } } = useEth();
    const [proposalOldData, setProposalOldData] = useState([]);
    const [proposalDesc, setProposalDesc] = useState([]);
    
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
                        proposal: proposalDesc
                    });

                });
                setProposalOldData(proposals);


            })();




        }

    }, [contract, proposalOldData, accounts]);


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


    const getOneProposal = async (_proposalId) => {
        const proposal = await contract.methods.getOneProposal(_proposalId).call({ from: accounts[0] });
        //  setProposalDesc(proposal.description);
        //setProposalDesc(proposalDesc => [...proposalDesc, { proposalId : _proposalId , proposal : proposal.description }]);
    };

    const getProposalsDes = async (proposals) => {
        // proposals = [...proposalOldData];
        for (const proposal of proposals) {
            const proposalBC = await contract.methods.getOneProposal(proposal.proposalId).call({ from: accounts[0] });
            proposal.proposal = proposalBC.description;
        }

    };
    const getProposals = () => {
        let proposals = [...proposalOldData];
        let proposalsDesc = [...proposalOldDataDesc];
        let mergedProposals = [];


        //const mergedProposals = proposalOldData.map(p => ({ ...p, ...proposalOldDataDesc.find(sp => sp.proposalId === p.proposalId) }));

        /*  proposals.forEach((p) => {
              getOneProposal(p.proposalId);
          })   */


        /* for (const proposal of proposals) {
            const proposal = await contract.methods.getOneProposal(_proposalId).call({ from: accounts[0] });
            console.log(contents);
          } */

        //getProposalsDes(proposals);
        return proposals.map((p, i) => {
            return (
                <div key={i}  id="proposals_main_radiogroup">
                    {/* <FormControlLabel    control={<Checkbox color="secondary" />} label={p.proposalId} /> */}
                    <div><Radio {...controlProps(p.proposalId)} color="secondary" size="medium" /> <span>{p.proposalId} </span></div>
                    
                </div>
            );
        });
    };


    return (

        <div id="Content_main_proposals"  >
            {/*  Voters and Owner Cars if Owner  */}
            {contract && isVoter && <div >
                <div className='centered' id="proposals_main_radiogroup">
                    {getProposals()}
                </div>


            </div>}


        </div>

    );
}

export default Proposals;
