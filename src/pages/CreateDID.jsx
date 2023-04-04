import React, { useContext } from "react";
import DIDcontext from "../context/DIDcontext";
const CreateDID = () => {
  const {
    connectWallet,
    currentAccount,
    accountAddress,
    getAccountAddress,
    did,
    didDocument,
  } = useContext(DIDcontext);
  console.log(accountAddress);
  console.log(did);
  console.log(didDocument);
  return (
    <div className="flex justify-center items-center h-screen">
      {!currentAccount ? (
        <button onClick={connectWallet}>Connect wallet</button>
      ) : (
        <div>
          <p>Wallet connected</p>
          <button onClick={getAccountAddress}>Create a DID</button>
          {/* <form onSubmit={() => {}}>
            <input type="text" placeholder="Name:" className="border p-1" />
          </form> */}
        </div>
      )}
    </div>
  );
};

export default CreateDID;
