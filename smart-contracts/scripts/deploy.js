const hre = require("hardhat");

async function main() {
  const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");
  const didRegistry = await DIDRegistry.deploy();

  await didRegistry.deployed();

  console.log("DIDRegistry deployed to:", didRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 