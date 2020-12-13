import React, { createContext, useState, useEffect } from "react";
import AddReport from "../contracts/AddReport.json";
import getWeb3 from "../getWeb3";

export const Web3Context = createContext();

function Web3ContextProvider(props) {
  const [web3, setweb3] = useState({});
  const [accts, setaccts] = useState({});
  const [ins, setins] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  async function web3Fetch() {
    const web3Instance = await getWeb3();
    const accounts = await web3Instance.eth.getAccounts();
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = AddReport.networks[networkId];
    const instance = new web3Instance.eth.Contract(
      AddReport.abi,
      deployedNetwork && deployedNetwork.address
    );
    const response = await instance.methods.voters(accounts[0]).call();
    setIsRegistered(response.isRegistered);
    setins(instance);
    setweb3(web3Instance);
    setaccts(accounts[0]);
  }

  useEffect(() => {
    web3Fetch();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, accts, ins, isRegistered }}>
      {props.children}
    </Web3Context.Provider>
  );
}

export default Web3ContextProvider;
