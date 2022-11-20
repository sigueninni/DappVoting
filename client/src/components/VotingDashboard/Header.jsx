import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';

function Header() {

  const { state: { accounts } } = useEth();

  return (
    <div id="Header_main">
      <div id="Header_main_hero"></div>
      <div id="Header_main_chip"> {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" icon={<PersonIcon />} />}
      </div></div>

  );
}

export default Header;