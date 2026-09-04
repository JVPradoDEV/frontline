import { BrowserRouter } from "react-router-dom";
import { Raizes } from "./routes";
import { EstiloGlobal } from "./styles/mainstyle";

function App() {
  return (
    <>
      <EstiloGlobal />
      <BrowserRouter>
        <Raizes />
      </BrowserRouter>
    </>
  );
}

export default App;
