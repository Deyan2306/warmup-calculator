"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  User,
  Mail,
  MapPin,
  Weight,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface UserData {
  username: string;
  email: string;
  nationality: string;
  gender: string;
  bodyWeight: number;
  squat: number;
  bench: number;
  deadlift: number;
  joinDate: string;
  totalWorkouts: number;
  personalRecords: number;
}

interface ProfilePageProps {
  onNavigate?: (view: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserData>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
      joinDate: "2024-01-15",
      totalWorkouts: 127,
      personalRecords: 8,
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

  const handleEdit = () => {
    setEditData(user || {});
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      setUser({ ...user, ...editData });
      setIsEditing(false);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-400 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

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
            <Image
              src="/pumped-up-logo.webp"
              alt="PreppedUp"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-amber-400">Profile</h1>
              <p className="text-neutral-400 text-sm">Manage your athlete profile</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-amber-400">Athlete Profile</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-amber-400 text-neutral-900 font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 hover:scale-105"
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-neutral-600 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-all duration-300 hover:scale-105"
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-neutral-800 rounded-full border-4 border-amber-400/30 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-amber-400" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-amber-400 text-neutral-900 rounded-full hover:bg-amber-500 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-amber-400">{user.username}</h3>
                <p className="text-neutral-400">Powerlifter</p>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.username || user.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-amber-400 font-semibold">{user.username}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email || user.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-amber-400 font-semibold">{user.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">
                      Nationality
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.nationality || user.nationality}
                        onChange={(e) => setEditData({ ...editData, nationality: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-amber-400 font-semibold">{user.nationality}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={editData.gender || user.gender}
                        onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-amber-400 font-semibold capitalize">{user.gender}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">
                    Body Weight (kg)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.bodyWeight || user.bodyWeight}
                      onChange={(e) => setEditData({ ...editData, bodyWeight: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-amber-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  ) : (
                    <p className="text-amber-400 font-semibold">{user.bodyWeight} kg</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-amber-400">Personal Records</h3>
              </div>
              <p className="text-3xl font-bold text-amber-400">{user.personalRecords}</p>
              <p className="text-sm text-neutral-400">Total PRs achieved</p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-amber-400">Total Workouts</h3>
              </div>
              <p className="text-3xl font-bold text-amber-400">{user.totalWorkouts}</p>
              <p className="text-sm text-neutral-400">Sessions completed</p>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-amber-400">Member Since</h3>
              </div>
              <p className="text-3xl font-bold text-amber-400">
                {new Date(user.joinDate).getFullYear()}
              </p>
              <p className="text-sm text-neutral-400">
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Max Lifts */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-8">
            <h3 className="text-2xl font-bold text-amber-400 mb-6">Current Maxes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { lift: "Squat", value: user.squat, color: "border-red-400/50 bg-red-400/5" },
                { lift: "Bench", value: user.bench, color: "border-blue-400/50 bg-blue-400/5" },
                { lift: "Deadlift", value: user.deadlift, color: "border-green-400/50 bg-green-400/5" },
              ].map(({ lift, value, color }) => (
                <div
                  key={lift}
                  className={`p-6 rounded-xl border backdrop-blur-sm ${color} hover:scale-105 transition-all duration-300`}
                >
                  <h4 className="text-lg font-bold text-amber-400 mb-2">{lift}</h4>
                  <p className="text-3xl font-bold text-amber-400 mb-1">
                    {value} kg
                  </p>
                  <p className="text-sm text-neutral-400">
                    {(value / user.bodyWeight).toFixed(2)}x Body Weight
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
