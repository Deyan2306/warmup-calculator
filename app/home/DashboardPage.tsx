"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Dumbbell,
  Weight,
  TrendingUp,
  Plus,
  Trophy,
  BarChart3,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Command,
  ArrowRight,
  Calendar,
  Target,
  Zap,
  X,
  Save,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Types
interface WorkoutSet {
  weight: number;
  reps: number;
  targetRpe: number;
  actualRpe: number;
}

interface Workout {
  id: string;
  exercise: "squat" | "bench" | "deadlift";
  date: string;
  sets: WorkoutSet[];
  focus: "squat" | "bench" | "deadlift";
}

interface UserData {
  username: string;
  email: string;
  nationality: string;
  gender: string;
  bodyWeight: number;
  squat: number;
  bench: number;
  deadlift: number;
}


// Main Dashboard Component
interface DashboardPageProps {
  onNavigate?: (view: string) => void;
}

// Command Palette Component
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    {
      id: "dashboard",
      title: "Go to Dashboard",
      description: "View your training overview",
      icon: BarChart3,
      action: () => onClose(),
    },
    {
      id: "profile",
      title: "Go to Profile",
      description: "Manage your athlete profile",
      icon: User,
      action: () => onNavigate("profile"),
    },
    {
      id: "settings",
      title: "Go to Settings",
      description: "Customize your experience",
      icon: Settings,
      action: () => onNavigate("settings"),
    },
    {
      id: "workouts",
      title: "Go to Workouts",
      description: "Manage your workout blocks",
      icon: Dumbbell,
      action: () => onNavigate("workouts"),
    },
    {
      id: "new-workout",
      title: "Start New Workout",
      description: "Begin a new training session",
      icon: Dumbbell,
      action: () => {
        onClose();
        // Navigate to workout creation
      },
    },
    {
      id: "log-max",
      title: "Log New Max",
      description: "Record a personal record",
      icon: Trophy,
      action: () => {
        onClose();
        // Navigate to max logging
      },
    },
    {
      id: "view-progress",
      title: "View Progress",
      description: "Check your training progress",
      icon: TrendingUp,
      action: () => {
        onClose();
        // Navigate to progress view
      },
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl w-full max-w-2xl mx-4">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-700">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-neutral-400 outline-none"
          />
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <kbd className="px-2 py-1 bg-neutral-700 rounded text-neutral-300">⌘</kbd>
            <kbd className="px-2 py-1 bg-neutral-700 rounded text-neutral-300">K</kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {filteredCommands.length > 0 ? (
            <div className="p-2">
              {filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? "bg-amber-400/20 text-amber-400"
                        : "text-neutral-300 hover:bg-neutral-700/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{command.title}</p>
                      <p className="text-sm text-neutral-500">{command.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No commands found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-700 text-xs text-neutral-500">
          <div className="flex items-center justify-between">
            <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
            <span>PreppedUp Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update Maxes Modal Component
interface UpdateMaxesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onUpdateMaxes: (maxes: { squat: number; bench: number; deadlift: number }) => void;
}

const UpdateMaxesModal: React.FC<UpdateMaxesModalProps> = ({ isOpen, onClose, user, onUpdateMaxes }) => {
  const [maxes, setMaxes] = useState({
    squat: user.squat,
    bench: user.bench,
    deadlift: user.deadlift,
  });
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onUpdateMaxes(maxes);
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (lift: keyof typeof maxes, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMaxes(prev => ({ ...prev, [lift]: numValue }));
  };

  const getLiftIcon = (lift: string) => {
    switch (lift) {
      case "squat":
        return <Dumbbell className="w-5 h-5" />;
      case "bench":
        return <Weight className="w-5 h-5" />;
      case "deadlift":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Dumbbell className="w-5 h-5" />;
    }
  };

  const getLiftColor = (lift: string) => {
    switch (lift) {
      case "squat":
        return "border-amber-400/30 bg-amber-400/5";
      case "bench":
        return "border-amber-400/30 bg-amber-400/5";
      case "deadlift":
        return "border-amber-400/30 bg-amber-400/5";
      default:
        return "border-amber-400/30 bg-amber-400/5";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-amber-400">Update Your Maxes</h3>
            <p className="text-sm text-neutral-400">Record your current 1RM for each lift</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Maxes Input */}
        <div className="space-y-4 mb-6">
          {[
            { key: "squat", label: "Squat", current: user.squat },
            { key: "bench", label: "Bench Press", current: user.bench },
            { key: "deadlift", label: "Deadlift", current: user.deadlift },
          ].map(({ key, label, current }) => (
            <div key={key} className={`p-4 rounded-xl border ${getLiftColor(key)}`}>
              <div className="flex items-center gap-3 mb-3">
                {getLiftIcon(key)}
                <div>
                  <h4 className="text-neutral-300 font-medium">{label}</h4>
                  <p className="text-xs text-neutral-500">Current: {current} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={maxes[key as keyof typeof maxes]}
                  onChange={(e) => handleInputChange(key as keyof typeof maxes, e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-amber-400 font-bold text-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
                <span className="text-neutral-400 font-medium">kg</span>
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                Bodyweight multiplier: {(maxes[key as keyof typeof maxes] / user.bodyWeight).toFixed(2)}x
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mb-6 p-4 bg-neutral-700/50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-neutral-300 font-medium">Total (SBD)</span>
            <span className="text-2xl font-bold text-amber-400">
              {maxes.squat + maxes.bench + maxes.deadlift} kg
            </span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Previous total: {user.squat + user.bench + user.deadlift} kg
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-neutral-700 text-neutral-300 font-semibold rounded-lg hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Maxes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUpdateMaxesModalOpen, setIsUpdateMaxesModalOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const maxLiftsRef = useRef<HTMLDivElement>(null);
  const bodyweightRef = useRef<HTMLDivElement>(null);
  const workoutsRef = useRef<HTMLDivElement>(null);

  // Mock Data
  useEffect(() => {
    setUser({
      username: "deyan2306",
      email: "strong@example.com",
      nationality: "USA",
      gender: "male",
      bodyWeight: 85,
      squat: 180,
      bench: 100,
      deadlift: 200,
    });

    setWorkouts([
      {
        id: "1",
        exercise: "squat",
        date: "2025-01-15T12:00:00Z",
        focus: "squat",
        sets: [
          { weight: 120, reps: 5, targetRpe: 8, actualRpe: 8 },
          { weight: 130, reps: 3, targetRpe: 9, actualRpe: 9 },
          { weight: 140, reps: 1, targetRpe: 10, actualRpe: 10 },
        ],
      },
      {
        id: "2",
        exercise: "bench",
        date: "2025-01-14T12:00:00Z",
        focus: "bench",
        sets: [
          { weight: 80, reps: 8, targetRpe: 7, actualRpe: 7 },
          { weight: 90, reps: 5, targetRpe: 8, actualRpe: 8 },
          { weight: 95, reps: 3, targetRpe: 9, actualRpe: 9 },
        ],
      },
      {
        id: "3",
        exercise: "deadlift",
        date: "2025-01-13T12:00:00Z",
        focus: "deadlift",
        sets: [
          { weight: 160, reps: 3, targetRpe: 9, actualRpe: 9 },
          { weight: 170, reps: 2, targetRpe: 9, actualRpe: 9 },
          { weight: 180, reps: 1, targetRpe: 10, actualRpe: 10 },
        ],
      },
    ]);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(
      maxLiftsRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    )
    .fromTo(
      bodyweightRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(
      workoutsRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  const handleUpdateMaxes = (maxes: { squat: number; bench: number; deadlift: number }) => {
    if (user) {
      setUser(prev => prev ? { ...prev, ...maxes } : null);
    }
  };

  const getLiftIcon = (lift: string) => {
    switch (lift) {
      case "squat":
        return <Dumbbell className="w-5 h-5" />;
      case "bench":
        return <Weight className="w-5 h-5" />;
      case "deadlift":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Dumbbell className="w-5 h-5" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 font-semibold">Loading your stats...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* neutral-700 */
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbf24; /* amber-400 */
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b; /* amber-500 */
        }
        
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #374151; /* neutral-700 */
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fbbf24 #374151;
        }
        
        /* Remove number input arrows */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="h-screen bg-neutral-900 overflow-hidden flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-neutral-800 border-r border-neutral-700 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-neutral-700">
          <div className="flex items-center gap-3">
            <Image
              src="/pumped-up-logo.webp"
              alt="PreppedUp"
              width={32}
              height={32}
              className="rounded"
            />
            <h1 className="text-xl font-bold text-amber-400">PreppedUp</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 custom-scrollbar overflow-y-auto">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-amber-400 text-neutral-900 rounded-lg font-medium">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate?.("workouts")}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <Dumbbell className="w-5 h-5" />
              Workouts
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors">
              <Weight className="w-5 h-5" />
              Maxes
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors">
              <TrendingUp className="w-5 h-5" />
              Progress
            </button>
          </div>

          <div className="mt-8 pt-4 border-t border-neutral-700">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">Account</p>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate?.("profile")}
                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button 
                onClick={() => onNavigate?.("settings")}
                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </nav>

        {/* Help Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-xl p-4 border border-neutral-600">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-sm text-neutral-300 mb-2">Need help?</p>
              <p className="text-xs text-neutral-400 mb-3">Check our docs</p>
              <button className="w-full px-3 py-2 bg-amber-400 text-neutral-900 text-xs font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-neutral-800 border-b border-neutral-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-amber-400">Welcome back, {user.username}</h2>
              <p className="text-neutral-400">Here's what's happening with your training today</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="w-64 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-300 hover:border-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors flex items-center justify-between"
                >
                  <span className="text-neutral-500">Search commands...</span>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <kbd className="px-2 py-1 bg-neutral-600 rounded text-neutral-300">⌘</kbd>
                    <kbd className="px-2 py-1 bg-neutral-600 rounded text-neutral-300">K</kbd>
                  </div>
                </button>
              </div>
              <button className="p-2 text-neutral-400 hover:text-amber-400 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar" ref={containerRef}>
          {/* Stats Cards Row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-400">Today's Training</p>
                  <p className="text-2xl font-bold text-amber-400">1 Session</p>
                </div>
                <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-amber-400">+100% from yesterday</p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-400">Total Volume</p>
                  <p className="text-2xl font-bold text-amber-400">2,400 kg</p>
                </div>
                <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                  <Weight className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-amber-400">+15% this week</p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-400">Personal Records</p>
                  <p className="text-2xl font-bold text-amber-400">3</p>
                </div>
                <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-neutral-500">-2 this month</p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-400">Body Weight</p>
                  <p className="text-2xl font-bold text-amber-400">{user.bodyWeight} kg</p>
                </div>
                <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-amber-400">+1.2% this month</p>
            </div>
          </div>

          {/* Main Content Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Welcome Card */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-lg font-bold text-amber-400 mb-2">Welcome Back</h3>
              <p className="text-2xl font-bold text-white mb-2">{user.username}</p>
              <p className="text-neutral-400 mb-4">Ready to crush some PRs today?</p>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Ready to train</span>
              </div>
            </div>

            {/* Max Lifts Card */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Your Big Three</h3>
              <div className="space-y-3">
                {[
                  { lift: "Squat", value: user.squat },
                  { lift: "Bench", value: user.bench },
                  { lift: "Deadlift", value: user.deadlift },
                ].map(({ lift, value }) => (
                  <div key={lift} className="flex items-center justify-between">
                    <span className="text-neutral-300">{lift}</span>
                    <span className="text-amber-400 font-bold">{value} kg</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsUpdateMaxesModalOpen(true)}
                className="w-full mt-4 px-4 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Update Maxes
              </button>
            </div>

            {/* Progress Card */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Training Progress</h3>
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto mb-2 relative">
                  <div className="w-20 h-20 rounded-full border-4 border-neutral-700 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-400">85%</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">This month's goal</p>
              </div>
              <p className="text-xs text-neutral-500 text-center">Based on consistency</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Volume Chart */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-amber-400">Training Volume</h3>
                <div className="text-right">
                  <span className="text-sm text-amber-400">(+12%) this week</span>
                  <p className="text-xs text-neutral-500">vs last week</p>
                </div>
              </div>
              
              {/* Chart Container */}
              <div className="h-48 bg-neutral-700/50 rounded-lg p-4 relative">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-xs text-neutral-500">
                  <span>5000kg</span>
                  <span>3750kg</span>
                  <span>2500kg</span>
                  <span>1250kg</span>
                  <span>0kg</span>
                </div>
                
                {/* Chart bars */}
                <div className="ml-12 h-full flex items-end justify-between gap-2">
                  {[
                    { day: 'Mon', volume: 3200, sets: 12 },
                    { day: 'Tue', volume: 2800, sets: 10 },
                    { day: 'Wed', volume: 0, sets: 0 },
                    { day: 'Thu', volume: 4200, sets: 15 },
                    { day: 'Fri', volume: 3800, sets: 14 },
                    { day: 'Sat', volume: 4500, sets: 16 },
                    { day: 'Sun', volume: 0, sets: 0 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center group">
                      {/* Bar */}
                      <div
                        className="bg-amber-400 rounded-t-lg transition-all duration-500 hover:scale-110 relative min-h-[4px] w-8"
                        style={{
                          height: `${(data.volume / 5000) * 100}%`,
                        }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-neutral-900 border border-neutral-600 rounded-lg p-2 text-xs whitespace-nowrap">
                            <p className="text-amber-400 font-bold">{data.volume.toLocaleString()}kg</p>
                            <p className="text-neutral-400">{data.sets} sets</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Day label */}
                      <span className="text-xs text-neutral-500 mt-2">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chart Summary */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-amber-400">18,500kg</p>
                  <p className="text-xs text-neutral-500">Total Volume</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">67</p>
                  <p className="text-xs text-neutral-500">Total Sets</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">3,700kg</p>
                  <p className="text-xs text-neutral-500">Avg/Day</p>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-amber-400">Recent Sessions</h3>
                <span className="text-sm text-amber-400">(+3) this week</span>
              </div>
              <div className="space-y-3">
                {workouts.slice(0, 4).map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getLiftIcon(workout.focus)}
                      <div>
                        <p className="text-neutral-300 font-medium capitalize">{workout.focus}</p>
                        <p className="text-xs text-neutral-500">
                          {new Date(workout.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold">{workout.sets[0]?.weight} kg</p>
                      <p className="text-xs text-neutral-500">{workout.sets[0]?.reps} reps</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Workout Plans */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Today's Plan</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                  <div>
                    <p className="text-neutral-300 font-medium">Squat Session</p>
                    <p className="text-xs text-neutral-500">5 sets planned</p>
                  </div>
                  <button className="px-3 py-1 bg-amber-400 text-neutral-900 text-xs font-semibold rounded">
                    Start
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                  <div>
                    <p className="text-neutral-300 font-medium">Accessory Work</p>
                    <p className="text-xs text-neutral-500">3 exercises</p>
                  </div>
                  <button className="px-3 py-1 bg-neutral-600 text-neutral-300 text-xs font-semibold rounded">
                    Later
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors text-center">
                  <Plus className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-300">New Workout</p>
                </button>
                <button className="p-4 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors text-center">
                  <Weight className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-300">Log Max</p>
                </button>
                <button className="p-4 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors text-center">
                  <TrendingUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-300">View Progress</p>
                </button>
                <button className="p-4 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors text-center">
                  <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-300">Achievements</p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={onNavigate || (() => {})}
      />
      
      {/* Update Maxes Modal */}
      {user && (
        <UpdateMaxesModal
          isOpen={isUpdateMaxesModalOpen}
          onClose={() => setIsUpdateMaxesModalOpen(false)}
          user={user}
          onUpdateMaxes={handleUpdateMaxes}
        />
      )}
    </div>
    </>
  );
}