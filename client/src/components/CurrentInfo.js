import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
const CurrentInfo = ({ state }) => {
  const [count, setCount] = useState("");
  const [rentalRate, setRentalRate] = useState("");

  useEffect(() => {
    const countCars = async () => {
      if (state && state.contract) {
        try {
          const transaction = await state.contract.carCount();
          setCount(transaction.toString());
          const rent = await state.contract.rentalRatePerHour();
          const formattedRent = ethers.utils.formatEther(rent);
          setRentalRate(formattedRent);
        } catch (error) {
          console.error("Error fetching car count:", error);
        }
      }
    };
    countCars();
  }, [state]);

  return (
    <div className="border border-black px-10 py-7 space-y-3 rounded-md">
      <h2 className="text-lg">Statistics</h2>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-400">Current Rental Rate</h3>
          <h3 className="text-2xl">{rentalRate} eth</h3>
        </div>
        <div className="space-y-1">
          <h3 className="text-gray-400">Number of Cars</h3>
          <h3 className="text-2xl text-center">{count}</h3>
        </div>
      </div>
    </div>
  );
};

export default CurrentInfo;
