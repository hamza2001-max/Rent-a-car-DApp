// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarRenter {
    address payable public owner;
    uint256 public rentalRatePerHour; // in wei

    struct Rental {
        address payable renter;
        uint256 startTime;
        uint256 upfrontPayment;
        bool isActive;
    }

    mapping(uint256 => Rental) public rentals; // carId to Rental
    uint256 public carCount;

    event CarReserved(uint256 carId, address renter, uint256 upfrontPayment);
    event CarReturned(uint256 carId, uint256 totalCost, uint256 refund);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _rentalRatePerHour) {
        owner = payable(msg.sender);
        rentalRatePerHour = _rentalRatePerHour;
        carCount = 0;
    }

    function addCar() external onlyOwner {
        carCount++;
    }

    function reserveCar(uint256 carId) external payable {
        require(carId > 0 && carId <= carCount, "Invalid carId");
        require(msg.value > 0, "Upfront payment is required");
        require(!rentals[carId].isActive, "Car is already rented");

        rentals[carId] = Rental({
            renter: payable(msg.sender),
            startTime: block.timestamp,
            upfrontPayment: msg.value,
            isActive: true
        });

        emit CarReserved(carId, msg.sender, msg.value);
    }

    function returnCar(uint256 carId) external {
        require(carId > 0 && carId <= carCount, "Invalid carId");
        Rental storage rental = rentals[carId];
        require(rental.isActive, "Car is not rented");
        require(msg.sender == rental.renter, "Only the renter can return the car");

        uint256 rentalDuration = block.timestamp - rental.startTime;
        uint256 totalCost = (rentalDuration / 1 hours) * rentalRatePerHour;
        rental.isActive = false;

        if (totalCost > rental.upfrontPayment) {
            uint256 additionalPayment = totalCost - rental.upfrontPayment;
            require(msg.sender.balance >= additionalPayment, "Insufficient funds for additional payment");
            rental.renter.transfer(additionalPayment);
        } else {
            uint256 refund = rental.upfrontPayment - totalCost;
            rental.renter.transfer(refund);
            emit CarReturned(carId, totalCost, refund);
        }

        owner.transfer(totalCost);
    }

    function setRentalRate(uint256 _rentalRatePerHour) external onlyOwner {
        rentalRatePerHour = _rentalRatePerHour;
    }
}
