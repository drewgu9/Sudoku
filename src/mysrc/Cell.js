import React from "react";

function Cell({ intVal, setIntVal }) {
  return (
    <input
      value={intVal == 0 ? "" : intVal.toString()}
      onChange={(e) => {
        let x = e.target.value;
        if (x.length == 0 || (x.length == 1 && x > 0 && x < 10)) {
          setIntVal(e.target.value);
        }
      }}
    />
  );
}

export default Cell;
