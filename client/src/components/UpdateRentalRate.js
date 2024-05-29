import React from "react";
import { ethers } from "ethers";

const UpdateRentalRate = ({ state, rentalRate, setRentalRate }) => {
  const updateRentalRateHandler = async (event) => {
    event.preventDefault();
    if (state && state.contract) {
      try {
        const rateInWei = ethers.utils.parseEther(rentalRate);
        const transaction = await state.contract.setRentalRate(rateInWei);
        await transaction.wait();
        alert("Rental rate set successfully!");
        setRentalRate("");
      } catch (error) {
        console.error("Error setting rental rate:", error);
        alert("Failed to set rental rate.");
      }
    }
  };
  return (
    <form
      onSubmit={updateRentalRateHandler}
      className="flex justify-between space-x-20"
    >
      <input
        type="text"
        className="border border-black rounded-sm px-3 py-1 outline-none w-[18rem]"
        value={rentalRate}
        onChange={(e) => setRentalRate(e.target.value)}
        placeholder="e.g 0.0000000002 eth"
      />
      <button
        type="submit"
        className="w-[8rem] border-2 border-black px-3 py-1 rounded-sm"
        disabled={rentalRate === "" || rentalRate === "0"}
      >
        Update Rent
      </button>
    </form>
  );
};

export default UpdateRentalRate;
