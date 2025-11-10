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
  Play,
  Clock,
  Repeat,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

// Types
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

interface WorkoutBlock {
  id: string;
  type: "volume" | "intensity" | "peaking";
  focus: "squat" | "bench" | "deadlift";
  duration: number; // weeks
  workouts: Workout[];
}

interface Workout {
  id: string;
  week: number;
  day: number;
  focus: "squat" | "bench" | "deadlift";
  mainLift: MainLiftSet[];
  accessories: AccessoryExercise[];
}

interface MainLiftSet {
  weight: number;
  reps: number;
  sets: number;
  percentage: number;
  rpe: number;
}

interface AccessoryExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

interface WorkoutBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBlock: (block: WorkoutBlock) => void;
  user: UserData;
}

// Workout Block Creation Modal
const WorkoutBlockModal: React.FC<WorkoutBlockModalProps> = ({ isOpen, onClose, onStartBlock, user }) => {
  const [blockType, setBlockType] = useState<"volume" | "intensity" | "peaking">("volume");
  const [focus, setFocus] = useState<"squat" | "bench" | "deadlift">("squat");
  const [duration, setDuration] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const generateWorkoutBlock = async () => {
    setIsGenerating(true);
    
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const workouts = generateWorkouts(blockType, focus, duration, user);
    
    const newBlock: WorkoutBlock = {
      id: Date.now().toString(),
      type: blockType,
      focus,
      duration,
      workouts,
    };
    
    setIsGenerating(false);
    onStartBlock(newBlock);
    onClose();
  };

  const getBlockDescription = (type: string) => {
    switch (type) {
      case "volume":
        return "Higher reps, moderate intensity. Builds muscle and work capacity.";
      case "intensity":
        return "Heavy weights, lower reps. Builds strength and neural adaptations.";
      case "peaking":
        return "Maximal loads, competition prep. Peak strength development.";
      default:
        return "";
    }
  };

  const getFocusIcon = (focus: string) => {
    switch (focus) {
      case "squat":
        return <Dumbbell className="w-6 h-6" />;
      case "bench":
        return <Weight className="w-6 h-6" />;
      case "deadlift":
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Dumbbell className="w-6 h-6" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-amber-400">Start New Workout Block</h3>
            <p className="text-sm text-neutral-400">Create a structured training program</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Block Type Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Block Type</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { type: "volume", label: "Volume", icon: Repeat },
              { type: "intensity", label: "Intensity", icon: Target },
              { type: "peaking", label: "Peaking", icon: Trophy },
            ].map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setBlockType(type as any)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  blockType === type
                    ? "border-amber-400 bg-amber-400/10 text-amber-400"
                    : "border-neutral-600 hover:border-amber-400/50 text-neutral-300"
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">{label}</p>
              </button>
            ))}
          </div>
          <p className="text-sm text-neutral-500 mt-2">{getBlockDescription(blockType)}</p>
        </div>

        {/* Focus Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Primary Focus</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { focus: "squat", label: "Squat", current: user.squat },
              { focus: "bench", label: "Bench", current: user.bench },
              { focus: "deadlift", label: "Deadlift", current: user.deadlift },
            ].map(({ focus: focusType, label, current }) => (
              <button
                key={focusType}
                onClick={() => setFocus(focusType as any)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  focus === focusType
                    ? "border-amber-400 bg-amber-400/10 text-amber-400"
                    : "border-neutral-600 hover:border-amber-400/50 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {getFocusIcon(focusType)}
                </div>
                <p className="font-medium">{label}</p>
                <p className="text-xs text-neutral-500">{current} kg</p>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-amber-400 mb-4">Duration</h4>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDuration(Math.max(2, duration - 1))}
              className="p-2 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-amber-400">{duration}</span>
              <span className="text-neutral-400 ml-2">weeks</span>
            </div>
            <button
              onClick={() => setDuration(Math.min(12, duration + 1))}
              className="p-2 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6 p-4 bg-neutral-700/50 rounded-xl">
          <h4 className="text-lg font-semibold text-amber-400 mb-2">Block Preview</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-400">Type:</span>
              <span className="text-amber-400 ml-2 capitalize">{blockType}</span>
            </div>
            <div>
              <span className="text-neutral-400">Focus:</span>
              <span className="text-amber-400 ml-2 capitalize">{focus}</span>
            </div>
            <div>
              <span className="text-neutral-400">Duration:</span>
              <span className="text-amber-400 ml-2">{duration} weeks</span>
            </div>
            <div>
              <span className="text-neutral-400">Workouts:</span>
              <span className="text-amber-400 ml-2">{duration * 3} sessions</span>
            </div>
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
            onClick={generateWorkoutBlock}
            disabled={isGenerating}
            className="flex-1 px-4 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Block
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Workout Generation Logic
const generateWorkouts = (
  blockType: "volume" | "intensity" | "peaking",
  focus: "squat" | "bench" | "deadlift",
  duration: number,
  user: UserData
): Workout[] => {
  const workouts: Workout[] = [];
  const maxWeight = user[focus];
  
  // Define block-specific parameters
  const blockParams = {
    volume: { minReps: 8, maxReps: 12, minPercent: 65, maxPercent: 80, rpe: 7 },
    intensity: { minReps: 3, maxReps: 6, minPercent: 80, maxPercent: 90, rpe: 8 },
    peaking: { minReps: 1, maxReps: 3, minPercent: 85, maxPercent: 95, rpe: 9 },
  };
  
  const params = blockParams[blockType];
  
  for (let week = 1; week <= duration; week++) {
    for (let day = 1; day <= 3; day++) {
      const workout: Workout = {
        id: `${week}-${day}`,
        week,
        day,
        focus,
        mainLift: generateMainLiftSets(week, day, focus, maxWeight, params),
        accessories: generateAccessories(focus, day),
      };
      workouts.push(workout);
    }
  }
  
  return workouts;
};

const generateMainLiftSets = (
  week: number,
  day: number,
  focus: string,
  maxWeight: number,
  params: any
): MainLiftSet[] => {
  const sets: MainLiftSet[] = [];
  const progression = (week - 1) / 4; // Linear progression over 4 weeks
  
  // Warm-up sets
  sets.push({
    weight: Math.round(maxWeight * 0.5),
    reps: 8,
    sets: 1,
    percentage: 50,
    rpe: 5,
  });
  
  sets.push({
    weight: Math.round(maxWeight * 0.7),
    reps: 5,
    sets: 1,
    percentage: 70,
    rpe: 6,
  });
  
  // Working sets
  const workingPercent = params.minPercent + (params.maxPercent - params.minPercent) * progression;
  const reps = Math.round(params.minReps + (params.maxReps - params.minReps) * (1 - progression));
  
  sets.push({
    weight: Math.round(maxWeight * (workingPercent / 100)),
    reps,
    sets: 3,
    percentage: workingPercent,
    rpe: params.rpe,
  });
  
  return sets;
};

const generateAccessories = (focus: string, day: number): AccessoryExercise[] => {
  const accessories: { [key: string]: AccessoryExercise[][] } = {
    squat: [
      [
        { name: "Romanian Deadlift", sets: 3, reps: 8, notes: "Focus on hamstring stretch" },
        { name: "Bulgarian Split Squats", sets: 3, reps: 10, notes: "Each leg" },
        { name: "Leg Press", sets: 3, reps: 12 },
      ],
      [
        { name: "Walking Lunges", sets: 3, reps: 12, notes: "Each leg" },
        { name: "Leg Curls", sets: 3, reps: 12 },
        { name: "Calf Raises", sets: 4, reps: 15 },
      ],
      [
        { name: "Front Squats", sets: 3, reps: 8 },
        { name: "Hip Thrusts", sets: 3, reps: 12 },
        { name: "Plank", sets: 3, reps: 30, notes: "seconds" },
      ],
    ],
    bench: [
      [
        { name: "Incline Dumbbell Press", sets: 3, reps: 10 },
        { name: "Dips", sets: 3, reps: 8 },
        { name: "Tricep Pushdowns", sets: 3, reps: 12 },
      ],
      [
        { name: "Overhead Press", sets: 3, reps: 8 },
        { name: "Lateral Raises", sets: 3, reps: 12 },
        { name: "Face Pulls", sets: 3, reps: 15 },
      ],
      [
        { name: "Close-Grip Bench Press", sets: 3, reps: 8 },
        { name: "Chest Flyes", sets: 3, reps: 12 },
        { name: "Hammer Curls", sets: 3, reps: 12 },
      ],
    ],
    deadlift: [
      [
        { name: "Barbell Rows", sets: 3, reps: 8 },
        { name: "Pull-ups", sets: 3, reps: 8 },
        { name: "Shrugs", sets: 3, reps: 12 },
      ],
      [
        { name: "Good Mornings", sets: 3, reps: 10 },
        { name: "Lat Pulldowns", sets: 3, reps: 10 },
        { name: "Bicep Curls", sets: 3, reps: 12 },
      ],
      [
        { name: "Rack Pulls", sets: 3, reps: 5 },
        { name: "Cable Rows", sets: 3, reps: 10 },
        { name: "Reverse Flyes", sets: 3, reps: 12 },
      ],
    ],
  };
  
  return accessories[focus][(day - 1) % 3];
};

// Main Workouts Page Component
interface WorkoutsPageProps {
  onNavigate?: (view: string) => void;
}

export default function WorkoutsPage({ onNavigate }: WorkoutsPageProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isCreateBlockModalOpen, setIsCreateBlockModalOpen] = useState(false);
  const [activeBlocks, setActiveBlocks] = useState<WorkoutBlock[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  const handleStartBlock = (block: WorkoutBlock) => {
    setActiveBlocks(prev => [...prev, block]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 font-semibold">Loading workouts...</p>
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
              <button 
                onClick={() => onNavigate?.("dashboard")}
                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-amber-400 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-amber-400 text-neutral-900 rounded-lg font-medium">
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
                <h2 className="text-2xl font-bold text-amber-400">Workout Blocks</h2>
                <p className="text-neutral-400">Create and manage your training programs</p>
              </div>
              <button
                onClick={() => setIsCreateBlockModalOpen(true)}
                className="px-6 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                New Block
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto custom-scrollbar" ref={containerRef}>
            {activeBlocks.length === 0 ? (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-400 mb-2">No Active Blocks</h3>
                <p className="text-neutral-500 mb-6">Start your first workout block to begin structured training</p>
                <button
                  onClick={() => setIsCreateBlockModalOpen(true)}
                  className="px-6 py-3 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create Your First Block
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeBlocks.map((block) => (
                  <div key={block.id} className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-amber-400 capitalize">
                          {block.type} Block - {block.focus}
                        </h3>
                        <p className="text-neutral-400">
                          {block.duration} weeks • {block.workouts.length} workouts
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-400/20 text-amber-400 text-sm rounded-full">
                          Week 1 of {block.duration}
                        </span>
                        <button className="p-2 text-neutral-400 hover:text-amber-400 transition-colors">
                          <Play className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Workout Preview */}
                    <div className="grid grid-cols-3 gap-4">
                      {block.workouts.slice(0, 3).map((workout) => (
                        <div key={workout.id} className="bg-neutral-700/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-medium text-neutral-300">
                              Week {workout.week}, Day {workout.day}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {workout.focus === "squat" && <Dumbbell className="w-4 h-4 text-amber-400" />}
                              {workout.focus === "bench" && <Weight className="w-4 h-4 text-amber-400" />}
                              {workout.focus === "deadlift" && <TrendingUp className="w-4 h-4 text-amber-400" />}
                              <span className="text-sm text-neutral-400 capitalize">{workout.focus}</span>
                            </div>
                            <div className="text-xs text-neutral-500">
                              {workout.mainLift.length} main sets • {workout.accessories.length} accessories
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Create Block Modal */}
      {user && (
        <WorkoutBlockModal
          isOpen={isCreateBlockModalOpen}
          onClose={() => setIsCreateBlockModalOpen(false)}
          onStartBlock={handleStartBlock}
          user={user}
        />
      )}
    </>
  );
}
