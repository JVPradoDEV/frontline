import { useCurrentUserProfile } from "./hooks/useCurrentUserProfile";
import { useTokenRefresh } from "./hooks/useTokenRefresh";
import { Raizes } from "./routes";
import { EstiloGlobal } from "./styles/mainstyle";

function App() {
  useTokenRefresh();
  useCurrentUserProfile();

  return (
    <>
      <EstiloGlobal />
      <Raizes />
    </>
  );
}

export default App;
