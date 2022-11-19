import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';

function Header() {

  const { state: { accounts } } = useEth();

  return (
    <div id="Header">
       {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" icon={<PersonIcon />} />}
        <br />
        {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
    </div>
  );
}

export default Header;