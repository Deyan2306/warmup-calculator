"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = "",
}: StatCardProps) {
  return (
    <Card className={`bg-neutral-800/60 border-neutral-700 hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutral-400">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-amber-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-400">{value}</div>
        {description && (
          <p className="text-xs text-neutral-500 mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-neutral-500 ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
