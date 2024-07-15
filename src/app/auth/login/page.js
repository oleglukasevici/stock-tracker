"use client";

import { useState } from "react";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography } from "@mui/material";
import { PATHS } from "@/constants";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInResult = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(loggedInResult);
      router.push(PATHS.stock);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4">Please login</Typography>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2"
      />
      <Button onClick={handleLogin} variant="outlined">
        Login
      </Button>
      <Link href={PATHS.register}>
        <Typography className="text-sm underline">{`Go to register if you don't have account`}</Typography>
      </Link>
    </>
  );
}
