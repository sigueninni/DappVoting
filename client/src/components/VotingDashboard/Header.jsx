import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Header() {

  const { state: { accounts } } = useEth();
  
  return (
    <div className="Header">
      Votre address eth:
        <br />
        {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
    </div>
  );
}

export default Header;