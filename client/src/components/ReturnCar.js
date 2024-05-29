import React, { useState } from "react";

const ReturnCar = ({ state }) => {
  const [carId, setCarId] = useState(0);
  const returnCar = async (event) => {
    event.preventDefault();
    if (state && state.contract) {
      try {
        const transaction = await state.contract.returnCar(carId);
        await transaction.wait();
        alert("Car returned successfully!");
      } catch (error) {
        console.error("Error returning car:", error);
        alert("Failed to return car.");
      }
    }
  };
  return (
    <form onSubmit={returnCar} className="flex justify-between space-x-20">
      <div>
        <input
          type="text"
          className="border border-black rounded-sm px-3 py-1 outline-none w-[18rem]"
          onChange={(e) => setCarId(e.target.value)}
          placeholder="Car ID"
          required
        />
      </div>
      <button
        type="submit"
        className="w-[8rem] border-2 border-black px-3 py-1 rounded-sm"
        disabled={carId === 0 || carId === "" || carId === "0"}
      >
        Return Car
      </button>
    </form>
  );
};

export default ReturnCar;
