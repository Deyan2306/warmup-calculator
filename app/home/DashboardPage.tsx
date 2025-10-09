"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import {
  Dumbbell,
  User,
  Weight,
  BarChart3,
  Menu,
  X,
  Settings,
  LogOut,
  ChevronRight,
  Sun,
} from "lucide-react";
import Image from "next/image";

// --- Type Definitions (kept from original code) ---
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

// Custom Card Component using raw Tailwind for single-file mandate
interface StatCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  icon: Icon,
  children,
  className = "",
}) => (
  // Added 'no-underline' to the main container
  <div
    className={`p-4 md:p-6 bg-neutral-900/70 backdrop-blur-sm rounded-2xl border border-amber-400/20 shadow-xl transition-all hover:border-amber-400/50 no-underline ${className}`}
  >
    {/* Added 'no-underline' to the title container and h3 */}
    <div className="flex items-center gap-3 mb-3 text-amber-400 font-bold text-xl no-underline">
      <Icon className="w-6 h-6" />
      <h3 className="no-underline">{title}</h3>
    </div>
    {children}
  </div>
);

interface BodyweightChartProps {
  user: UserData;
  workouts: Workout[];
}

const BodyweightChart: React.FC<BodyweightChartProps> = ({
  user,
  workouts,
}) => {
  const chartRef = useRef<SVGSVGElement>(null);

  const chartData = useMemo(() => {
    // Mock bodyweight data for the chart, including current BW
    return [
      {
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        weight: user.bodyWeight - 2,
      },
      {
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        weight: user.bodyWeight - 1,
      },
      { date: new Date(), weight: user.bodyWeight },
    ].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [user.bodyWeight]);

  useEffect(() => {
    if (!chartRef.current || !chartData.length) return;

    const container = chartRef.current.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = 250; // Fixed height, responsive width
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svgEl = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svgEl.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const yDomainMin = d3.min(chartData, (d) => d.weight)! - 2;
    const yDomainMax = d3.max(chartData, (d) => d.weight)! + 2;

    const y = d3
      .scaleLinear()
      .domain([yDomainMin, yDomainMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Grid lines (Y-axis)
    svgEl
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat(() => "")
      )
      .selectAll("line")
      .attr("stroke", "#374151"); // Dark gray for grid

    // Line Path
    const line = d3
      .line<{ date: Date; weight: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.weight))
      .curve(d3.curveCardinal); // Smoother curve

    svgEl
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#f59e0b") // Amber line
      .attr("stroke-width", 4)
      .attr("d", line);

    // X-Axis
    svgEl
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeDay.every(7)) // Ticks every 7 days
          .tickFormat((d) => d3.timeFormat("%b %d")(d as Date))
      )
      .attr("color", "#a1a1aa"); // Neutral color for axis

    // Y-Axis
    svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("color", "#a1a1aa"); // Neutral color for axis

    // Circles (Data Points)
    svgEl
      .selectAll("circle")
      .data(chartData)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.weight))
      .attr("r", 6)
      .attr("fill", "#f59e0b") // Amber circles
      .attr("stroke", "#171717")
      .attr("stroke-width", 2);

    // X-Axis Label
    svgEl
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#a1a1aa")
      .style("font-size", "12px")
      .text("Date");

    // Y-Axis Label
    svgEl
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .attr("fill", "#a1a1aa")
      .style("font-size", "12px")
      .text("Bodyweight (kg)");
  }, [chartData]);

  return (
    <div className="w-full h-full p-2">
      <h3 className="text-neutral-200 font-semibold mb-4 text-center">
        Last 30 Days Trend
      </h3>
      <svg ref={chartRef} className="w-full"></svg>
    </div>
  );
};

// Main App Component
export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard"); // State for view switching

  // Mock Data Fetch
  useEffect(() => {
    // Hardcoded user and workouts
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
        date: "2025-10-01T12:00:00Z",
        sets: [
          { weight: 120, reps: 5, targetRpe: 8, actualRpe: 8 },
          { weight: 130, reps: 3, targetRpe: 9, actualRpe: 9 },
        ],
      },
      {
        id: "2",
        exercise: "bench",
        date: "2025-10-02T12:00:00Z",
        sets: [
          { weight: 80, reps: 8, targetRpe: 7, actualRpe: 7 },
          { weight: 90, reps: 5, targetRpe: 8, actualRpe: 8 },
        ],
      },
      {
        id: "3",
        exercise: "deadlift",
        date: "2025-10-03T12:00:00Z",
        sets: [
          { weight: 160, reps: 3, targetRpe: 9, actualRpe: 9 },
          { weight: 170, reps: 2, targetRpe: 9, actualRpe: 9 },
        ],
      },
    ]);
  }, []);

  if (!user)
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-amber-400">
        Loading Athlete Profile...
      </div>
    );

  const exercises: ("squat" | "bench" | "deadlift")[] = [
    "squat",
    "bench",
    "deadlift",
  ];

  // Menu items for the sidebar
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Helper component for the mobile menu button
  const MobileMenuButton = () => (
    <button
      className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-amber-500 text-neutral-900 rounded-full shadow-lg hover:bg-amber-400 transition-all"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle Menu"
    >
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );

  // Helper component for the sidebar menu
  const SidebarMenu = () => (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 lg:hidden" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Menu Container (Fixed on right for desktop) */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 p-6 bg-neutral-900/95 backdrop-blur-lg border-l border-amber-400/20 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between items-center mb-10 mt-2 lg:mt-0">
          <Image
            src={"/pumped-up-logo.webp"}
            alt="logo"
            width={86}
            height={86}
          />
          <h2 className="text-3xl font-extrabold text-amber-500 tracking-wider">
            Prepped<span className="text-neutral-200">UP</span>
          </h2>
          <button
            className="lg:hidden text-amber-400"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setIsMenuOpen(false);
              }}
              className={`flex items-center w-full p-3 rounded-xl transition-colors duration-200 font-medium ${
                activeView === item.id
                  ? "bg-amber-500 text-neutral-900 shadow-md scale-[1.02]"
                  : "text-neutral-300 hover:bg-neutral-800/80 hover:text-amber-400"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {activeView === item.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 w-[calc(100%-3rem)] space-y-3">
          <button className="flex items-center w-full p-3 rounded-xl transition-colors duration-200 font-medium text-neutral-400 hover:bg-neutral-800/80 hover:text-neutral-200">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
          <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-500">v1.2.0</span>
            <Sun className="w-4 h-4 text-neutral-500" />
          </div>
        </div>
      </aside>
    </>
  );

  // Main Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Header and Welcome */}
      <header className="py-4 border-b border-amber-400/10 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-100">
          Welcome back, <span className="text-amber-400">{user.username}</span>!
        </h1>
        <p className="text-neutral-400 mt-1">
          Your powerlifting progress at a glance.
        </p>
      </header>

      {/* Top Stats: Profile, SBD, and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile/Quick Info */}
        <StatCard title="Athlete Profile" icon={User} className="lg:col-span-1">
          <div className="space-y-2 text-neutral-300 text-sm md:text-base">
            <p>
              <span className="font-semibold text-amber-300">Body Weight:</span>{" "}
              {user.bodyWeight} kg
            </p>
            <p>
              <span className="font-semibold text-amber-300">Nationality:</span>{" "}
              {user.nationality}
            </p>
            <p>
              <span className="font-semibold text-amber-300">Gender:</span>{" "}
              {user.gender}
            </p>
            <p>
              <span className="font-semibold text-amber-300">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        </StatCard>

        {/* SBD Stats */}
        <StatCard
          title="Max Lifts (1RM)"
          icon={Weight}
          className="lg:col-span-1"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            {["squat", "bench", "deadlift"].map((lift) => (
              <div
                key={lift}
                className="p-3 bg-neutral-800/60 rounded-xl border-t-2 border-amber-500/50 transition-transform duration-200 hover:scale-[1.03] hover:bg-neutral-800"
              >
                <p className="text-neutral-400 text-sm uppercase tracking-wider">
                  {lift}
                </p>
                <p className="text-amber-400 font-extrabold text-2xl mt-1">
                  {(user as any)[lift]}
                  <span className="text-neutral-500 text-sm font-normal">
                    {" "}
                    kg
                  </span>
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {((user as any)[lift] / user.bodyWeight).toFixed(2)}x BW
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-neutral-500 mt-4">
            Total: {user.squat + user.bench + user.deadlift} kg
          </p>
        </StatCard>

        {/* Bodyweight Chart */}
        <StatCard
          title="Bodyweight Trend"
          icon={BarChart3}
          className="lg:col-span-1 p-0"
        >
          <BodyweightChart user={user} workouts={workouts} />
        </StatCard>
      </div>

      {/* Warmups Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-neutral-200 mb-4 border-b border-neutral-700/50 pb-2">
          Recent Warmup Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[40vh] md:h-[50vh] min-h-[300px]">
          {exercises.map((exercise) => {
            const workout = workouts.find((w) => w.exercise === exercise);
            return (
              <StatCard
                key={exercise}
                title={exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                icon={Dumbbell}
                className="flex flex-col h-full overflow-hidden"
              >
                <div className="flex-grow space-y-2 text-sm overflow-y-auto pr-2 custom-scrollbar">
                  {workout?.sets.map((set, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:bg-neutral-700/60 transition-colors flex justify-between items-center"
                    >
                      <div>
                        <p className="text-xs text-neutral-400 font-medium">
                          Set {idx + 1}
                        </p>
                        <p className="text-amber-400 font-bold text-lg">
                          {set.weight} kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-400">
                          Reps:{" "}
                          <span className="text-neutral-200 font-semibold">
                            {set.reps}
                          </span>
                        </p>
                        <p className="text-xs text-neutral-400">
                          RPE:{" "}
                          <span className="text-neutral-200 font-semibold">
                            {set.actualRpe}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                  {!workout && (
                    <p className="text-neutral-400 text-center mt-4 p-4">
                      No recent warmups found for {exercise}.
                    </p>
                  )}
                </div>
                {/* Button is outside the scrollable area */}
                <button className="mt-4 w-full p-3 rounded-xl bg-amber-500 text-neutral-900 font-extrabold shadow-lg hover:bg-amber-400 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] focus:ring-4 focus:ring-amber-500/50">
                  Generate New Warmup
                </button>
              </StatCard>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Main Render Structure
  return (
    <div className="min-h-screen bg-neutral-950 font-sans antialiased text-neutral-200">
      <style jsx global>{`
        /* Load Inter font (using Tailwind's recommended approach) */
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
        body {
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
        }
        /* Custom scrollbar for better aesthetics in dark theme */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563; /* Gray-600 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #1f2937; /* Gray-800 */
        }
      `}</style>

      <MobileMenuButton />
      <SidebarMenu />

      <main className="min-h-screen p-6 transition-all duration-300 lg:mr-64">
        {/* Content based on active view */}
        {activeView === "dashboard" && <DashboardContent />}
        {activeView === "profile" && (
          <div className="pt-20 lg:pt-0 text-center">
            <h1 className="text-4xl text-amber-400">Profile View</h1>
            <p className="text-neutral-300 mt-2">
              This is where you would edit your athlete details.
            </p>
          </div>
        )}
        {activeView === "settings" && (
          <div className="pt-20 lg:pt-0 text-center">
            <h1 className="text-4xl text-amber-400">Settings</h1>
            <p className="text-neutral-300 mt-2">
              Manage app preferences and connections here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
