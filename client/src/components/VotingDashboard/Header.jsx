import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function Header() {

  const { state: { accounts, contract, owner } } = useEth();
  const [inputNewOwnerAddress, setInputNewOwnerAddress] = useState("");
  const [open, setOpen] = React.useState(false);


  const transferOwnership = async (inputNewOwnerAddress) => {
    try {
      await contract.methods.transferOwnership(inputNewOwnerAddress).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };


  const handleOpenNewOwnerAddress = () => {
    setOpen(true);
  };

  const handleCloseNewOwnerAddress = () => {
    setOpen(false);
  };

  const onTransferOwnership = () => {
    debugger;
    if (inputNewOwnerAddress !== '') {

      transferOwnership(inputNewOwnerAddress);
    }
    handleCloseNewOwnerAddress();
  };

  return (
    <div id="Header_main" >
      <div id="Header_main_hero" ></div>
      <div id="Header_main_chip"> {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" icon={<PersonIcon />} />}
      </div>{accounts && owner === accounts[0] && <div className="centered"> <Button color="secondary" variant="contained" endIcon={<ChangeCircleIcon />} onClick={handleOpenNewOwnerAddress}>transfer Ownership</Button></div>}

      <Dialog maxWidth="xl" open={open} onClose={handleCloseNewOwnerAddress}>
        <DialogTitle>Transfer Ownership of contract</DialogTitle>
        <DialogContent>
          {/*         <DialogContentText>
            Add Voter Metamask Address here, you canno't add yourself!
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="New owner Address"
            type="text"
            fullWidth
            variant="standard"
            value={inputNewOwnerAddress}
            onChange={e => {
              setInputNewOwnerAddress(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewOwnerAddress}>Cancel</Button>
          <Button onClick={onTransferOwnership}>Transfer</Button>
        </DialogActions>
      </Dialog>

    </div>

  );
}

export default Header;