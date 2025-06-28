import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardView from "./components/Views/Dashboard/DashboardView";
import ModelView from "./components/Views/Model/ModelView";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<ModelView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/model" element={<Navigate to="/" replace />} />

        {/* 404 - redirect to model view */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
