import React from "react";
import { Home, CreateDID, LoadDID } from "./pages";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateDID />} />
          <Route path="/load" element={<LoadDID />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
