"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Check,
  X,
} from "lucide-react";

interface SettingsData {
  theme: "light" | "dark" | "auto";
  notifications: {
    email: boolean;
    push: boolean;
    workout: boolean;
    achievements: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showStats: boolean;
    showWorkouts: boolean;
  };
  units: {
    weight: "kg" | "lbs";
    distance: "km" | "miles";
  };
  sound: {
    enabled: boolean;
    volume: number;
  };
}

interface SettingsPageProps {
  onNavigate?: (view: string) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState<SettingsData>({
    theme: "dark",
    notifications: {
      email: true,
      push: true,
      workout: true,
      achievements: false,
    },
    privacy: {
      profilePublic: false,
      showStats: true,
      showWorkouts: false,
    },
    units: {
      weight: "kg",
      distance: "km",
    },
    sound: {
      enabled: true,
      volume: 70,
    },
  });

  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  const handleSettingChange = (category: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    setHasChanges(false);
    // Show success message
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate?.("dashboard")}
              className="p-2 text-neutral-400 hover:text-amber-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-amber-400">Settings</h1>
              <p className="text-neutral-400 text-sm">Customize your PreppedUp experience</p>
            </div>
          </div>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save Changes
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6" ref={containerRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-amber-400 text-neutral-900"
                            : "text-neutral-400 hover:text-amber-400 hover:bg-neutral-800/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div
                ref={contentRef}
                className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-8"
              >
                {/* General Settings */}
                {activeTab === "general" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-6">General Settings</h2>
                    
                    {/* Units */}
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-4">Units</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Weight Unit
                          </label>
                          <select
                            value={settings.units.weight}
                            onChange={(e) => handleSettingChange("units", "weight", e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                          >
                            <option value="kg">Kilograms (kg)</option>
                            <option value="lbs">Pounds (lbs)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Distance Unit
                          </label>
                          <select
                            value={settings.units.distance}
                            onChange={(e) => handleSettingChange("units", "distance", e.target.value)}
                            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                          >
                            <option value="km">Kilometers (km)</option>
                            <option value="miles">Miles</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Sound */}
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-4">Sound</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {settings.sound.enabled ? (
                              <Volume2 className="w-5 h-5 text-amber-400" />
                            ) : (
                              <VolumeX className="w-5 h-5 text-neutral-400" />
                            )}
                            <span className="text-neutral-300">Enable Sound</span>
                          </div>
                          <button
                            onClick={() => handleSettingChange("sound", "enabled", !settings.sound.enabled)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.sound.enabled ? "bg-amber-400" : "bg-neutral-600"
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.sound.enabled ? "translate-x-7" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        
                        {settings.sound.enabled && (
                          <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">
                              Volume: {settings.sound.volume}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={settings.sound.volume}
                              onChange={(e) => handleSettingChange("sound", "volume", Number(e.target.value))}
                              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === "notifications" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-6">Notifications</h2>
                    
                    <div className="space-y-6">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h4 className="text-neutral-300 font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {key === "email" && "Receive email notifications"}
                              {key === "push" && "Receive push notifications"}
                              {key === "workout" && "Get notified about workout reminders"}
                              {key === "achievements" && "Get notified about new achievements"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingChange("notifications", key, !value)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              value ? "bg-amber-400" : "bg-neutral-600"
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                value ? "translate-x-7" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy */}
                {activeTab === "privacy" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-6">Privacy & Security</h2>
                    
                    <div className="space-y-6">
                      {Object.entries(settings.privacy).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h4 className="text-neutral-300 font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {key === "profilePublic" && "Make your profile visible to other users"}
                              {key === "showStats" && "Show your statistics publicly"}
                              {key === "showWorkouts" && "Share your workout history"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingChange("privacy", key, !value)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              value ? "bg-amber-400" : "bg-neutral-600"
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                value ? "translate-x-7" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeTab === "appearance" && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-amber-400 mb-6">Appearance</h2>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-4">Theme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: "light", label: "Light", icon: Sun },
                          { value: "dark", label: "Dark", icon: Moon },
                          { value: "auto", label: "Auto", icon: Settings },
                        ].map(({ value, label, icon: Icon }) => (
                          <button
                            key={value}
                            onClick={() => handleSettingChange("theme", "theme", value)}
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              settings.theme === value
                                ? "border-amber-400 bg-amber-400/10"
                                : "border-neutral-600 hover:border-amber-400/50"
                            }`}
                          >
                            <Icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <p className="text-neutral-300 font-medium">{label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          border: 2px solid #1f2937;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          border: 2px solid #1f2937;
        }
      `}</style>
    </div>
  );
}
