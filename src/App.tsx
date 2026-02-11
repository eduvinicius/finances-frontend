import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./features/Home";
import { Login } from "./features/auth/pages";

function AppContent() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;