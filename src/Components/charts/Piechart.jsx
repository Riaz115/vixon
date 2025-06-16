import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useTranslation } from "react-i18next";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Colors for each device type

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Piechart = ({ allcustomers }) => {
  const { t } = useTranslation("piechart");

  // Process all customers data to count device usage
  const deviceCounts = allcustomers?.reduce(
    (acc, customer) => {
      const device = customer?.cards?.[0]?.device;
      if (device) {
        acc[device] = (acc[device] || 0) + 1;
      }
      return acc;
    },
    { "google wallet": 0, "apple wallet": 0, pwa: 0 } // Default device types
  );

  // Prepare data for PieChart
  let data;
  if (allcustomers) {
    data = [
      { name: t("Google Wallet"), value: deviceCounts["google wallet"] },
      { name: t("Apple Wallet"), value: deviceCounts["apple wallet"] },
      { name: t("PWA"), value: deviceCounts?.pwa },
    ];
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Piechart;
