import React, { useState } from "react";
import Cell from "./Cell";
import { shuffle } from "./utils";

const GRID_HEIGHT = 9;
const GRID_WIDTH = 9;

//TODO: Initialize game function(make grid of numbers, erase a few)
//TODO: Implement Reset button
//Implement verify function and submit button (print something)
//TODO: Monday by 8PM

function Sudoku() {
  const [grid, setGrid] = useState(new Array(GRID_WIDTH * GRID_HEIGHT).fill(0));

  const isValid = (value, index, grid) => {
    if (value == 0) return true;

    var theRow = Math.floor(index / GRID_WIDTH);
    var skipRows = theRow * GRID_WIDTH;
    var theColumn = index % GRID_WIDTH;

    for (let i = skipRows; i < skipRows + GRID_WIDTH; i++) {
      if (grid[i] == value && i != index) {
        return false;
      }
    }

    for (let i = 0; i < GRID_HEIGHT; i++) {
      let cur = theColumn + i * GRID_WIDTH;
      if (grid[cur] == value && cur != index) {
        return false;
      }
    }

    var theSquareRow = Math.floor(theRow / 3) * 3;
    var theSquareColumn = Math.floor(theColumn / 3) * 3;
    for (let i = theSquareRow; i < theSquareRow + 3; i++) {
      for (let j = theSquareColumn; j < theSquareColumn + 3; j++) {
        let temp = i * GRID_WIDTH + j;
        if (grid[temp] == value && temp != index) {
          return false;
        }
      }
    }

    return true;
  };

  // function solveGrid(theGrid, gridIndex) {
  //   if (gridIndex == theGrid.length) {
  //     return [[...theGrid]];
  //   }
  //   var res = [];

  //   if (theGrid[gridIndex] == 0) {
  //     for (let j = 1; j < 10; j++) {
  //       if (isValid(j, gridIndex, theGrid)) {
  //         theGrid[gridIndex] = j;
  //         res.concat(solveGrid(theGrid, gridIndex + 1));
  //         theGrid[gridIndex] = 0;

  //         if (res.length > 1) {
  //           return res;
  //         }
  //       }
  //     }
  //   } else {
  //     res.concat(solveGrid(theGrid, gridIndex + 1));
  //   }
  //   return res;
  // }

  var numbers19 = Array.from({ length: 9 }, (_, i) => i + 1);
  var numbers080 = Array.from({ length: 81 }, (_, i) => i);

  function solveGrid(theGrid, gridIndex, solve) {
    if (gridIndex == theGrid.length) {
      return 1;
    }

    var res = 0;
    var lastSolve = -1;

    if (theGrid[gridIndex] != 0) {
      res += solveGrid(theGrid, gridIndex + 1, solve);
      return res;
    }

    //TODO: replace for loop with randoms 1-9
    //Shuffle array from 1-9 then loop over array by 3PM
    shuffle(numbers19);

    for (let j = 0; j < 9; j++) {
      let num = numbers19[j];
      if (isValid(num, gridIndex, theGrid)) {
        theGrid[gridIndex] = num;
        let t = solveGrid(theGrid, gridIndex + 1, solve);
        theGrid[gridIndex] = 0;
        res += t;
        if (t > 0) lastSolve = num;

        if (res > 1) break;
      }
    }

    if (lastSolve == -1) return 0;
    if (solve) theGrid[gridIndex] = lastSolve;
    return Math.min(res, 2);
  }

  var solutionGrid = new Array(GRID_HEIGHT * GRID_WIDTH).fill(0);
  var NUMBER_OF_REMOVED = 0;

  return (
    <>
      {grid.map((cur, i) => (
        <Cell
          intVal={cur}
          setIntVal={(x) => {
            let newGrid = [...grid];
            newGrid[i] = x;
            setGrid(newGrid);
          }}
        />
      ))}

      <button
        onClick={() => {
          // solutionGrid.fill(0);
          // console.log(solutionGrid.toString());
          // shuffle(numbers080);
          // console.log("starting");
          // let i = 0;
          // while (solveGrid(solutionGrid, 0, false) > 1) {
          //   console.log(i);
          //   console.log("ran");
          //   solutionGrid[numbers080[i % 81]] = randomNumber(1, 9);

          //   if (solveGrid(solutionGrid, 0, false) == 0) {
          //     solutionGrid[numbers080[i]] = 0;
          //   }
          //   i++;
          // }

          // console.log("ended");
          // setGrid([...solutionGrid]);
          // console.log(solutionGrid.toString());
          // solveGrid(solutionGrid, 0, true);
          // console.log(solutionGrid.toString());

          solutionGrid.fill(0);
          solveGrid(solutionGrid, 0, true);

          shuffle(numbers080);
          let tempGrid = [...solutionGrid];
          let count = 0;
          let i = 0;
          let original = 0;
          while (i < 81 || count < NUMBER_OF_REMOVED) {
            if (i > 80) {
              shuffle(numbers080);
              i = 0;
            }
            original = tempGrid[numbers080[i]];
            let temp = solveGrid(tempGrid, 0, false);
            tempGrid[numbers080[i]] = 0;

            if (solveGrid(tempGrid, 0, false) > 1) {
              tempGrid[numbers080[i]] = original;
              console.log(solveGrid(tempGrid, 0, false));
              console.log(temp);
            } else {
              count++;
            }
            i++;
            //console.log(solveGrid(tempGrid, 0, false));
          }

          setGrid(tempGrid);

          // console.log(
          //   solveGrid(tempGrid, 0, false) == 1 ? "it works" : "shit gamer"
          // );
        }}
      >
        Start New Game
      </button>
    </>
  );
}

export default Sudoku;
