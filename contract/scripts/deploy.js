const hre = require("hardhat");

async function main() {
  const Dwitter = await hre.ethers.getContractFactory("Dwitter");
  const dwitter = await Dwitter.deploy();

  await dwitter.deployed();

  console.log("Dwitter deployed to:", dwitter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
