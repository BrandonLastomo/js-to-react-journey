import { useState } from "react";
import Button from "./components/Button.jsx";

function App() {
  const [number, setNumber] = useState(0);
  function handleClick(operator) {
    setNumber((num) => {
      if (operator == "+") {
        if (num + 1 == 10) {
          return "done";
        }
        return num + 1;
      } else if (operator == "-") {
        if (num - 1 == 0) {
          return "done";
        }
        return num - 1;
      } else if (operator == "reset") {
        return 0;
      }
      return num;
    });
  }

  function checkNumber(num, operator) {
    if (num === "done" && operator !== "reset") return true;
    return false;
  }

  return (
    <>
      <h1>Counter with React</h1>
      <Button
        operator="-"
        onClick={() => handleClick("-")}
        isDisabled={checkNumber(number, "-")}
      />
      {number}
      <Button
        operator="+"
        onClick={() => handleClick("+")}
        isDisabled={checkNumber(number, "+")}
      />
      <br />
      <Button
        operator="reset"
        onClick={() => handleClick("reset")}
        isDisabled={checkNumber(number, "reset")}
      />
    </>
  );
}

export default App;
