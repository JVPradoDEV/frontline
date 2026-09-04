import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { Cadastro } from "./pages/Cadastro";
import { FeedPage } from "./pages/Feed";

export function Raizes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </>
  );
}
