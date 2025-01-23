import React, { useState } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import InputURL from "./components/InputURL";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    console.log(url);
  };

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    console.log(lastCharacter);

    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  async function handleEqual() {
    if (url === "") { 
      setResult("Error: URL is empty");
      return;
    }
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;
  
    setDisplay("");
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: display }),
      });
      
      const resultValue = await response.json();
      console.log(resultValue['result'] ? resultValue['result'] : resultValue['error']);
      setResult(resultValue['result'] ? resultValue['result'] : resultValue['error']);
    } catch (error) {
      setDisplay("Error");
    }
  }

//   function calculate(expression) {
//     const tokens = expression.split(" ");
//     let resultValue = parseInt(tokens[0]);

//     for (let i = 1; i < tokens.length; i += 2) {
//       const operator = tokens[i];
//       const nextNumber = parseInt(tokens[i + 1]);

//       switch (operator) {
//         case "+":
//           resultValue += nextNumber;
//           break;
//         case "-":
//           resultValue -= nextNumber;
//           break;
//         case "*":
//           resultValue *= nextNumber;
//           break;
//         case "/":
//           resultValue /= nextNumber;
//           break;
//         default:
//           resultValue = "Error";
//       }
//     }
//     return resultValue;
//   }

  function clear() {
    setDisplay("");
    setResult("");
  }

  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <div className="container">
        <div className="url">

        </div>
        <div className="calculator">
          <DisplayContainer
            display={display}
            result={result}
            backspace={backspace}
            clear={clear}
          />
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
            isUrlEmpty={url === "" ? true : false}
          />
          <InputURL value={url} onChange={handleUrlChange}/>
          <p className="text-white">IGRUS - 1Day Class</p>
        </div>
      </div>
    </>
  );
}

export default App;