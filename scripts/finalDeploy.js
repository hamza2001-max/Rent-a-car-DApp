const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const CarRental = await ethers.getContractFactory("CarRenter");
  const initialRentalRatePerHour = hre.ethers.utils.parseEther("0.0000000001"); // 0.0000000001 ether per hour
  const carRental = await CarRental.deploy(initialRentalRatePerHour);
  await carRental.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
