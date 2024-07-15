"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, MenuItem, Select, TextField } from "@mui/material";

import { fetchStockSymbols } from "@/services/stockService";

export default function Alerts() {
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const symbolsData = await fetchStockSymbols();
        setSymbols(symbolsData);
      } catch (error) {
        console.error("Error fetching stock symbols:", error);
      }
    };
    fetchSymbols();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "alerts"), {
        userId: user.uid,
        symbol,
        price: parseFloat(price),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-12 flex flex-col mx-auto gap-6 h-full w-[400px]">
      <Select
        variant="outlined"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        label="Symbol"
      >
        {symbols.map((sym, index) => (
          <MenuItem key={sym.ticker + sym.name + index} value={sym.ticker}>
            {sym.ticker}({sym.name})
          </MenuItem>
        ))}
      </Select>
      <TextField
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price Threshold"
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Set Alert
      </Button>
    </div>
  );
}
