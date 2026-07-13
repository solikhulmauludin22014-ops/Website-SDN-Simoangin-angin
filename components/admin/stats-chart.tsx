"use client";

import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

type StatPoint = {
  month: string;
  views: number;
  downloads: number;
};

export function StatsChart({ data }: { data: StatPoint[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#1d4e89" radius={[6, 6, 0, 0]} />
          <Bar dataKey="downloads" fill="#cb9f52" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
