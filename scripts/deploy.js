const hre = require("hardhat");

async function getCarCount(carRental) {
  try {
    const carCount = await carRental.carCount();
    console.log("Car count:", carCount.toString());
  } catch (error) {
    console.error("Error adding car:", error.message);
  }
}

async function getRentalRatePerHour(carRental){
  try {
    const rentalRatePerHour = await carRental.rentalRatePerHour();
    console.log("rentalRatePerHour:", rentalRatePerHour.toString());
  } catch (error) {
    console.error("Error rentalRatePerHour:", error.message);
  }
}
async function addCar(carRental) {
  try {
    await carRental.addCar();
    const newCarCount = await carRental.carCount();
    console.log("New car count after adding a car:", newCarCount.toString());
  } catch (error) {
    console.error("Error adding car:", error.message);
  }
}

async function reserveCar(carRental, carId, value) {
  try {
    const reserveVehc = await carRental.reserveCar(carId, { value });
    await reserveVehc.wait();
    console.log("Car reserved");
  } catch (error) {
    console.error("Error reserving car:", error.message);
  }
}

async function returnCar(carRental, carId) {
  try {
    const returnVehc = await carRental.returnCar(carId);
    await returnVehc.wait();
    console.log("Car returned");
  } catch (error) {
    console.error("Error returning car:", error.message);
  }
}

async function setRentalRate(carRental, newRate) {
  try {
    const setRateVehc = await carRental.setRentalRate(newRate);
    await setRateVehc.wait();
    console.log("Rental rate set");
  } catch (error) {
    console.error("Error renting car:", error.message);
  }
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const CarRental = await ethers.getContractFactory("CarRenter");
  const initialRentalRatePerHour = hre.ethers.utils.parseEther("0.0000000001"); // 0.0000000001 ether per hour
  const carRental = await CarRental.deploy(initialRentalRatePerHour);
  await carRental.deployed();
  console.log("CarRenter contract deployed to:", carRental.address);


  await getRentalRatePerHour(carRental);
  await getCarCount(carRental);
  await addCar(carRental);
  await reserveCar(carRental, 1, initialRentalRatePerHour);
  await returnCar(carRental, 1);
  await addCar(carRental);
  await setRentalRate(carRental, hre.ethers.utils.parseEther("0.0000000002"));
  await reserveCar(carRental, 2, hre.ethers.utils.parseEther("0.0000000002"));
  await returnCar(carRental, 2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
