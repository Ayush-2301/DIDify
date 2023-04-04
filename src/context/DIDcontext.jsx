import { React, createContext, useState, useEffect } from "react";
import Web3 from "web3";

export const DIDcontext = createContext();
const { ethereum } = window;

export const DIDprovider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [did, setDid] = useState("");
  const [didDocument, setDidDocument] = useState({});

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("wallet not connected");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
      console.log("wallet connected");
    } catch (error) {
      console.log(error);
    }
  };

  const checkifWalletisConnected = async () => {
    try {
      if (!ethereum) return alert("wallet not connected");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccountAddress = async () => {
    const web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();
    setAccountAddress(accounts[0]);
    setDid(`did:ethr:${accounts[0]}`);
    await createDIDDocument();
  };

  const createDIDDocument = async () => {
    const created = new Date().toISOString();
    const updated = created;
    const verificationMethod = [
      {
        id: `${did}#owner`,
        type: "Secp256k1VerificationKey2018",
        ethereumAddress: accountAddress,
      },
    ];
    const proof = {
      type: "Secp256k1Signature2018",
      created: created,
      verificationMethod: `${did}#owner`,
      proofPurpose: "authentication",
    };
    const didDocument = {
      "@context": "https://w3id.org/did/v1",
      id: did,
      created: created,
      updated: updated,
      verificationMethod: verificationMethod,
      authentication: [
        {
          type: "Secp256k1SignatureAuthentication2018",
          publicKey: `${did}#owner`,
        },
      ],
      proof: proof,
    };
    const web3 = new Web3(ethereum);
    const signature = await web3.eth.personal.sign(
      JSON.stringify(didDocument),
      accountAddress,
      ""
    );
    proof["signatureValue"] = signature;
    setDidDocument(didDocument);
  };

  useEffect(() => {
    checkifWalletisConnected();
    if (accountAddress) getAccountAddress();
  }, [currentAccount]);

  return (
    <DIDcontext.Provider
      value={{
        connectWallet,
        currentAccount,
        accountAddress,
        getAccountAddress,
        did,
        didDocument,
      }}
    >
      {children}
    </DIDcontext.Provider>
  );
};

export default DIDcontext;
