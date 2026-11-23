import { useState } from "react";
import "./App.css";
import { Saludo } from "./Saludo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Mi app</h1>
      <Saludo />
    </>
  );
}

export default App;
