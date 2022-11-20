
import * as React from 'react';
import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Proposals({ isVoter, proposalOldDataDesc }) {
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
                <div key={i}>
                    <FormControlLabel  control={<Checkbox color="secondary" />} label={p.proposalId} />
                </div>
            );
        });
    };


    return (

        <div id="Content_main_proposals" className="column50" >
            {/*  Voters and Owner Cars if Owner  */}
            {contract && isVoter && <div >
                <FormGroup className='centered'>
                    {getProposals()}
                </FormGroup>


            </div>}


        </div>

    );
}

export default Proposals;
