  import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useState, useEffect } from "react";
import moment from "moment";

function TransactionLinechart({ alltransactions, selectedPeriod ,datatype}) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const today = moment();
    
    // Set start date based on the selected period
    let startDate;
    switch (selectedPeriod) {
      case "Day":
        startDate = today.clone().startOf("day");
        break;
      case "Week":
        startDate = today.clone().subtract(7, "days").startOf("day");
        break;
      case "Month":
        startDate = today.clone().subtract(30, "days").startOf("day");
        break;
      case "Year":
        startDate = today.clone().subtract(365, "days").startOf("day");
        break;
      case "All Time":
        startDate = moment(0);
        break;
      default:
        startDate = today.clone().startOf("day");
    }

    // Filter transactions based on the selected date range
    const filteredTransactions = alltransactions?.filter((transaction) => {
      const transactionDate = moment(transaction.createdAt);
      return transactionDate.isSameOrAfter(startDate) && transactionDate.isSameOrBefore(today);
    });

    // Prepare data for the chart based on the selected period
    let processedData = [];

    if (selectedPeriod === "Day") {
      // Group data by hour for the current day
      const visitsByHour = {};

      filteredTransactions?.forEach((transaction) => {
        const hourKey = moment(transaction.createdAt).format("YYYY-MM-DD HH"); // Format for each hour
        if (visitsByHour[hourKey]) {
          visitsByHour[hourKey] += 1|| 0; // Aggregate visits
        } else {
          visitsByHour[hourKey] = 1 || 0; // Initialize visits
        }
      });

      // Prepare data for the chart
      processedData = Object.keys(visitsByHour).map((hour) => ({
        name: hour, // The hour will be shown on the X-axis
        Transaction: visitsByHour[hour], // Total visits for that hour
      }));
    } else {
      const visitsByDate = {};

      filteredTransactions?.forEach((transaction) => {
        const dateKey = moment(transaction.createdAt).format("YYYY-MM-DD"); 
        if (visitsByDate[dateKey]) {
          visitsByDate[dateKey] += 1 || 0; // Aggregate visits
        } else {
          visitsByDate[dateKey] = 1 || 0; // Initialize visits
        }
      });

      // Prepare data for the chart
      processedData = Object.keys(visitsByDate).map((date) => ({
        name: date, // The date will be shown on the X-axis
        Transaction: visitsByDate[date], // Total visits for that day
      }));
    }

    // Update chart data
    setFilteredData(processedData);
  }, [alltransactions, selectedPeriod]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={filteredData}
        margin={{
          top: 0,
          right: 0,
          left: 60,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="blue" stopOpacity={0.5} />
            <stop offset="95%" stopColor="blue" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Transaction"
          stroke="blue"
          fillOpacity={1}
          fill="url(#colorVisits)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TransactionLinechart;
