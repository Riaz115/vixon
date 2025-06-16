import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Stats from "../Stats";
import { useState, useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

function Barcharts({ alltransactions, selectedPeriod, setSelectedPeriod, f }) {
  const { t } = useTranslation("barchart");

  const periods = [t("day"), t("week"), t("month"), t("year"), t("allTime")];

  const [filteredData, setFilteredData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  // const [selectedPeriod, setSelectedPeriod] = useState("Day"); // Default period

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
        startDate = moment(0); // Very early date
        break;
      default:
        startDate = today.clone().startOf("day");
    }

    // Filter transactions based on the selected date range
    const filteredTransactions = alltransactions?.filter((transaction) => {
      const transactionDate = moment(transaction.createdAt);
      return (
        transactionDate.isSameOrAfter(startDate) &&
        transactionDate.isSameOrBefore(today)
      );
    });

    // Prepare data for the chart based on the selected period
    let processedData = [];

    if (selectedPeriod === "Day") {
      // Group data by hour for the current day
      const visitsByHour = {};

      filteredTransactions?.forEach((transaction) => {
        const hourKey = moment(transaction.createdAt).format("YYYY-MM-DD HH"); // Format for each hour
        if (visitsByHour[hourKey]) {
          visitsByHour[hourKey] += 1; // Aggregate visits
        } else {
          visitsByHour[hourKey] = 1; // Initialize visits
        }
      });

      // Prepare data for the chart
      processedData = Object.keys(visitsByHour).map((hour) => ({
        name: hour, // The hour will be shown on the X-axis
        Visits: visitsByHour[hour], // Total visits for that hour
      }));
    } else {
      const visitsByDate = {};

      filteredTransactions.forEach((transaction) => {
        const dateKey = moment(transaction.createdAt).format("YYYY-MM-DD");
        if (visitsByDate[dateKey]) {
          visitsByDate[dateKey] += 1; // Aggregate visits
        } else {
          visitsByDate[dateKey] = 1; // Initialize visits
        }
      });

      // Prepare data for the chart
      processedData = Object.keys(visitsByDate).map((date) => ({
        name: date, // The date will be shown on the X-axis
        Visits: visitsByDate[date], // Total visits for that day
      }));
    }

    // Update chart data and total visits
    setFilteredData(processedData);
    const total = processedData.reduce((sum, item) => sum + item.Visits, 0);
    setTotalVisits(total);
  }, [alltransactions, selectedPeriod]);
  console.log(t("totalPurchaseAmount"), "this is data1");

  return (
    <div className="bg-white shadow box-border border border-gray-200 py-3 rounded">
      <div className="pl-4 pb-3">{new Date().toDateString()}</div>

      {/* Period Filter */}
      <div className="px-4 pb-3 flex justify-start">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          {periods.map((period) => (
            <option key={period} value={period}>
              {t(`${period}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="px-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 border-t border-gray-200">
        <div>
          <Stats
            heading={t("totalVisits")}
            amount={totalVisits}
            change={totalVisits}
            profit={"positive"}
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={filteredData}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickFormatter={(value) =>
                  selectedPeriod === "Day"
                    ? moment(value).format("YYYY-MM-DD HH:mm")
                    : moment(value).format("YYYY-MM-DD")
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={"Visits"} fill="#1DCD27" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Barcharts;
