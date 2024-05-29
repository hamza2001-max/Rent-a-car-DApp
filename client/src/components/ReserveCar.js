import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const ReserveCar = ({ state, rentalRate }) => {
  const [carId, setCarId] = useState(0);
  const [count, setCount] = useState("");
  const upfrontPayment = rentalRate || "0.0000000001";

  useEffect(() => {
    const countCars = async () => {
      if (state && state.contract) {
        try {
          const transaction = await state.contract.carCount();
          setCount(transaction.toString());
        } catch (error) {
          console.error("Error fetching car count:", error);
        }
      } 
    };
    countCars();
  }, [state]);

  const reserveCar = async (event) => {
    event.preventDefault();
    if (state && state.contract) {
      try {
        const transaction = await state.contract.reserveCar(carId, {
          value: ethers.utils.parseEther(upfrontPayment),
        });
        await transaction.wait();
        alert("Car reserved successfully!");
      } catch (error) {
        console.error("Error reserving car:", error);
        alert("Failed to reserve car.");
      }
    }
  };

  return (
    <div>
      {count > 0 ? (
        <p className="font-semibold mb-5">
          Selectable Car ID Available from 1 to {count}
        </p>
      ) : (
        <p className="text-gray-400">No Cars Available</p>
      )}
      <form onSubmit={reserveCar} className="flex justify-between space-x-20">
        <input
          type="text"
          placeholder="Car ID"
          className="border border-black rounded-sm px-3 py-1 outline-none w-[18rem]"
          onChange={(e) => setCarId(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={count === 0 || carId === 0 || carId === "" || carId === "0"}
          className="w-[8rem] border-2 border-black px-3 py-1 rounded-sm"
        >
          Reserve Car
        </button>
      </form>
    </div>
  );
};

export default ReserveCar;
