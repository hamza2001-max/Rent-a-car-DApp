import React, { useState } from "react";

const CountCars = ({state}) => {
  const [count, setCount] = useState("");
  const countCars = async (event) => {
    event.preventDefault();
    if (state) {
      const transaction = await state.contract.carCount();
      setCount(transaction.toString());
    }
  };

  return (
    <form onSubmit={countCars}>
      <h3>The number of cars are: {count !== 0 && count}</h3>
      <button type="submit">Get Count</button>
    </form>
  );
};

export default CountCars;
