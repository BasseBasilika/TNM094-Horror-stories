import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Story from "./pages/story";
import Start from "./pages/start";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/home/skrack" element={<Home category="skrack" />} />
        <Route path="/home/barn" element={<Home category="barn" />} />
        <Route path="/story/:id" element={<Story />} />

      </Routes>
    </BrowserRouter>
  );
}