export const handler = async (event) => {
    try {
      const body = JSON.parse(event.body);
      console.log(body.expression);
      const expression = body.expression;
      
      const tokens = expression.split(" ");
      let resultValue = parseInt(tokens[0]);
  
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseInt(tokens[i + 1]);
  
        switch (operator) {
          case "+":
            resultValue += nextNumber;
            break;
          case "-":
            resultValue -= nextNumber;
            break;
          case "*":
            resultValue *= nextNumber;
            break;
          case "/":
            resultValue /= nextNumber;
            break;
          default:
            throw new Error("Invalid operator");
        }
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ result: resultValue }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  };
  