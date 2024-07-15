import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

export const fetchStockIndices = async (symbol, oneMonthAgo, today) => {
  const BASE_URL = "https://api.polygon.io/v2/aggs/ticker";
  try {
    const response = await axios.get(
      `${BASE_URL}/${symbol}/range/1/day/${oneMonthAgo}/${today}`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching stock indices:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchStockSymbols = async () => {
  const BASE_URL = "https://api.polygon.io/v3/reference/tickers";
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching stock symbols:",
      error.response?.data || error.message
    );
    throw error;
  }
};
