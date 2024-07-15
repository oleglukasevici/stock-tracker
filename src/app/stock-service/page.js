"use client";
import { useEffect, useState } from "react";
import { fetchStockIndices } from "@/services/stockService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment/moment";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = moment().format("YYYY-MM-DD");
        const oneMonthAgo = moment().subtract(1, "month").format("YYYY-MM-DD");
        const data = await fetchStockIndices("AAPL", oneMonthAgo, today); // Example symbol and date
        setStockData(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(theme);
  const chartData = {
    labels: stockData.map((data) => new Date(data.t).toLocaleDateString()),
    datasets: [
      {
        label: "Stock Index Value",
        data: stockData.map((data) => data.c), // Close price
        borderColor: theme?.palette?.primary?.main,
        fill: false,
      },
    ],
  };

  return (
    <div className="grid grid-rows-[auto_1fr] items-center gap-8 w-[calc(100%-32px)]">
      <Typography>Stock Indices in last month</Typography>
      <Line data={chartData} />
    </div>
  );
}
