import React from "react";

const AddCar = ({state}) => {
  const addCar = async (event) => {
    event.preventDefault();
    if (state && state.contract) {
      try {
        const transaction = await state.contract.addCar();
        await transaction.wait();
      } catch (error) {
        console.error("Error adding car:", error);
      }
    }
  };
  return (
    <form onSubmit={addCar} className="pt-[1rem]">
      <button type="submit" className="w-full border-2 border-black bg-black text-white px-3 py-2 rounded-md">Add a Car</button>
    </form>
  );
};

export default AddCar;
