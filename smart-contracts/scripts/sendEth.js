const hre = require("hardhat");

async function main() {
  // Replace this with your MetaMask address
  const recipientAddress = "YOUR_METAMASK_ADDRESS";
  
  // Get the default signer (first account from Hardhat)
  const [signer] = await hre.ethers.getSigners();
  
  console.log("Sending ETH from:", signer.address);
  console.log("To:", recipientAddress);
  
  // Send 1 ETH (in wei)
  const amount = hre.ethers.parseEther("1.0");
  
  const tx = await signer.sendTransaction({
    to: recipientAddress,
    value: amount,
  });
  
  console.log("Transaction hash:", tx.hash);
  
  // Wait for the transaction to be mined
  await tx.wait();
  
  console.log("Transaction confirmed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 