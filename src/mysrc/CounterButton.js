import React, { useState } from "react";

function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        ur current count is {count}
      </button>
      {count > 5 ? "ur count more than 5" : "sad"}
      {count > 5 && "count moar thann 5"}
    </>
  );
}

export default CounterButton;
