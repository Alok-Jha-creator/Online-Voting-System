import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IntroPage from "./components/IntroPage";
import Home from "./pages/Home";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route element={<Layout />}>
          <Route path="/home"    element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
