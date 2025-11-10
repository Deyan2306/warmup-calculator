"use client";

import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import WorkoutsPage from "./WorkoutsPage";

const HomePage = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage onNavigate={setActiveView} />;
      case "workouts":
        return <WorkoutsPage onNavigate={setActiveView} />;
      case "profile":
        return <ProfilePage onNavigate={setActiveView} />;
      case "settings":
        return <SettingsPage onNavigate={setActiveView} />;
      default:
        return <DashboardPage onNavigate={setActiveView} />;
    }
  };

  return renderView();
};

export default HomePage;
